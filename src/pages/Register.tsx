import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
}

interface Trade {
  id: string;
  name: string;
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [tradeId, setTradeId] = useState('');
  const [zones, setZones] = useState<Zone[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const [zonesResult, tradesResult] = await Promise.all([
        supabase.from('zones').select('*').order('name'),
        supabase.from('trades').select('*').order('name'),
      ]);
      if (zonesResult.data) setZones(zonesResult.data);
      if (tradesResult.data) setTrades(tradesResult.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zoneId || !tradeId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Selecciona zona y oficio.',
      });
      return;
    }

    setLoading(true);

    const { error: signUpError, user } = await signUp(email, password);

    if (signUpError || !user) {
      toast({
        variant: 'destructive',
        title: 'Error al registrar',
        description: signUpError?.message || 'No se pudo crear la cuenta.',
      });
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      user_id: user.id,
      name,
      email,
      phone,
      description,
      zone_id: zoneId,
      trade_id: tradeId,
      status: 'pending',
      points: 0,
    });

    if (profileError) {
      toast({
        variant: 'destructive',
        title: 'Error al crear perfil',
        description: profileError.message,
      });
    } else {
      toast({
        title: 'Solicitud enviada',
        description: 'Un administrador revisará tu solicitud.',
      });
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto card-elevated">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Solicitar Acceso</CardTitle>
            <CardDescription>
              Completa el formulario para unirte a RUANA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  maxLength={20}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Zona</Label>
                  <Select value={zoneId} onValueChange={setZoneId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Oficio</Label>
                  <Select value={tradeId} onValueChange={setTradeId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {trades.map((trade) => (
                        <SelectItem key={trade.id} value={trade.id}>
                          {trade.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción breve</Label>
                <Textarea
                  id="description"
                  placeholder="Cuéntanos sobre tu experiencia y servicios..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  maxLength={500}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar Solicitud
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
