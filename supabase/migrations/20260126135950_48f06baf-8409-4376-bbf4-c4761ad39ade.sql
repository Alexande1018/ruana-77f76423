-- Enum para roles de usuario
CREATE TYPE public.app_role AS ENUM ('admin', 'professional');

-- Enum para estados de profesional
CREATE TYPE public.professional_status AS ENUM ('pending', 'titular', 'suplente', 'suspended', 'rejected');

-- Tabla de zonas
CREATE TABLE public.zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de oficios
CREATE TABLE public.trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de perfiles de profesionales
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    description TEXT,
    photo_url TEXT,
    zone_id UUID NOT NULL REFERENCES public.zones(id),
    trade_id UUID NOT NULL REFERENCES public.trades(id),
    status public.professional_status NOT NULL DEFAULT 'pending',
    points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabla de roles de usuario (separada de profiles para seguridad)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.app_role NOT NULL,
    UNIQUE(user_id, role)
);

-- Tabla de solicitudes semanales
CREATE TABLE public.weekly_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    zone_id UUID NOT NULL REFERENCES public.zones(id),
    content TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    archived_at TIMESTAMPTZ
);

-- Tabla de respuestas a solicitudes
CREATE TABLE public.request_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.weekly_requests(id) ON DELETE CASCADE,
    responder_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(request_id, responder_id)
);

-- Tabla de recomendaciones
CREATE TABLE public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    to_profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT no_self_recommendation CHECK (from_profile_id != to_profile_id)
);

-- Índices para performance
CREATE INDEX idx_profiles_zone ON public.profiles(zone_id);
CREATE INDEX idx_profiles_trade ON public.profiles(trade_id);
CREATE INDEX idx_profiles_status ON public.profiles(status);
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_weekly_requests_zone ON public.weekly_requests(zone_id);
CREATE INDEX idx_weekly_requests_active ON public.weekly_requests(is_active);
CREATE INDEX idx_recommendations_to ON public.recommendations(to_profile_id);
CREATE INDEX idx_recommendations_from ON public.recommendations(from_profile_id);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Función para verificar rol
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    )
$$;

-- Función para obtener el profile_id del usuario actual
CREATE OR REPLACE FUNCTION public.get_current_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1
$$;

-- Función para obtener la zona del usuario actual
CREATE OR REPLACE FUNCTION public.get_current_zone_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT zone_id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1
$$;

-- Políticas RLS para zones (públicas para lectura)
CREATE POLICY "Zones are viewable by everyone" ON public.zones FOR SELECT USING (true);
CREATE POLICY "Zones are manageable by admins" ON public.zones FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para trades (públicas para lectura)
CREATE POLICY "Trades are viewable by everyone" ON public.trades FOR SELECT USING (true);
CREATE POLICY "Trades are manageable by admins" ON public.trades FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para profiles
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles 
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles 
FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.profiles 
FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all profiles" ON public.profiles 
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles 
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can manage roles" ON public.user_roles 
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para weekly_requests
CREATE POLICY "Requests viewable by same zone members" ON public.weekly_requests 
FOR SELECT TO authenticated USING (
    zone_id = public.get_current_zone_id() OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can create their own requests" ON public.weekly_requests 
FOR INSERT TO authenticated WITH CHECK (
    profile_id = public.get_current_profile_id()
);

CREATE POLICY "Users can update their own requests" ON public.weekly_requests 
FOR UPDATE TO authenticated USING (profile_id = public.get_current_profile_id());

CREATE POLICY "Admins can manage all requests" ON public.weekly_requests 
FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para request_responses
CREATE POLICY "Responses viewable by request owner and responder" ON public.request_responses 
FOR SELECT TO authenticated USING (
    responder_id = public.get_current_profile_id() OR
    request_id IN (SELECT id FROM public.weekly_requests WHERE profile_id = public.get_current_profile_id()) OR
    public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can create responses" ON public.request_responses 
FOR INSERT TO authenticated WITH CHECK (responder_id = public.get_current_profile_id());

-- Políticas RLS para recommendations
CREATE POLICY "Recommendations are viewable by authenticated users" ON public.recommendations 
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create recommendations in same zone" ON public.recommendations 
FOR INSERT TO authenticated WITH CHECK (
    from_profile_id = public.get_current_profile_id() AND
    EXISTS (
        SELECT 1 FROM public.profiles p1, public.profiles p2
        WHERE p1.id = from_profile_id 
        AND p2.id = to_profile_id 
        AND p1.zone_id = p2.zone_id
    )
);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Datos iniciales: Zonas
INSERT INTO public.zones (name) VALUES 
    ('Centro'),
    ('Norte'),
    ('Sur'),
    ('Este'),
    ('Oeste');

-- Datos iniciales: Oficios
INSERT INTO public.trades (name) VALUES 
    ('Abogado'),
    ('Arquitecto'),
    ('Contador'),
    ('Diseñador'),
    ('Electricista'),
    ('Fontanero'),
    ('Médico'),
    ('Mecánico'),
    ('Programador'),
    ('Veterinario');