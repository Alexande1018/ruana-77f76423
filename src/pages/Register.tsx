import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle2 } from 'lucide-react';
import { LandingNavbar, LandingFooter, BG, BG_ALT, GREEN, GREEN_DARK } from '@/components/LandingChrome';

interface FormState {
  name: string;
  email: string;
  phone: string;
  trade: string;
  zip: string;
  source: string;
  about: string;
}

const initialState: FormState = {
  name: '', email: '', phone: '', trade: '', zip: '', source: '', about: '',
};

export default function Register() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Este campo es obligatorio';
    if (!form.email.trim()) e.email = 'Este campo es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo no válido';
    if (!form.trade.trim()) e.trade = 'Este campo es obligatorio';
    if (!form.zip.trim()) e.zip = 'Este campo es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const subject = `Solicitud de acceso RUANA — ${form.name} — ${form.trade}`;
    const bodyLines = [
      `Nombre completo: ${form.name}`,
      `Correo electrónico: ${form.email}`,
      `Teléfono / WhatsApp: ${form.phone || '-'}`,
      `Oficio o profesión: ${form.trade}`,
      `Código postal: ${form.zip}`,
      `¿Cómo conoció RUANA?: ${form.source || '-'}`,
      ``,
      `Sobre su trabajo:`,
      `${form.about || '-'}`,
    ];
    const mailto = `mailto:teamruana@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    setSent(true);
  };

  const inputCls = "w-full px-4 py-3 rounded-lg text-white placeholder-white/40 border outline-none transition-all duration-200 focus:border-[#00E676] focus:shadow-[0_0_0_3px_rgba(0,230,118,0.15)]";
  const inputStyle = { backgroundColor: BG_ALT, borderColor: 'rgba(255,255,255,0.08)' } as React.CSSProperties;
  const labelCls = "block text-sm text-white/70 mb-2";
  const errCls = "mt-1 text-xs text-red-400";

  return (
    <div className="min-h-screen flex flex-col text-white" style={{ backgroundColor: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <LandingNavbar />

      <main className="flex-1">
        <div className="max-w-lg mx-auto px-5 pt-32 pb-24">
          {sent ? (
            <div className="rounded-2xl p-8 text-center border"
              style={{ backgroundColor: GREEN_DARK, borderColor: GREEN }}>
              <CheckCircle2 className="mx-auto h-14 w-14 mb-4" style={{ color: GREEN }} />
              <h2 className="text-2xl font-bold mb-3">¡Solicitud enviada!</h2>
              <p className="text-white/80 leading-relaxed">
                El equipo de RUANA revisará tu perfil y te contactará pronto. Revisa tu bandeja de enviados para confirmar que el mensaje se envió correctamente.
              </p>
              <Link to="/"
                className="inline-block mt-8 px-6 py-3 rounded-lg font-semibold border transition-all duration-200 hover:bg-white/5"
                style={{ borderColor: GREEN, color: GREEN }}>
                Volver al inicio
              </Link>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm mb-6 border"
                style={{ borderColor: 'rgba(0,230,118,0.35)', backgroundColor: 'rgba(0,230,118,0.08)', color: GREEN }}>
                <Lock className="h-3.5 w-3.5" /> Red privada · Solo por solicitud
              </div>
              <h1 className="text-[36px] font-bold leading-tight tracking-tight">
                Solicita tu acceso a RUANA
              </h1>
              <p className="mt-4 text-base text-white/70 leading-relaxed">
                Completa el formulario y el equipo de RUANA revisará tu solicitud. Si hay plaza disponible en tu zona y oficio, te contactaremos con tu código de acceso.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
                <div>
                  <label className={labelCls} htmlFor="name">Nombre completo *</label>
                  <input id="name" className={inputCls} style={inputStyle}
                    value={form.name} onChange={(e) => update('name', e.target.value)} />
                  {errors.name && <p className={errCls}>{errors.name}</p>}
                </div>

                <div>
                  <label className={labelCls} htmlFor="email">Correo electrónico *</label>
                  <input id="email" type="email" className={inputCls} style={inputStyle}
                    value={form.email} onChange={(e) => update('email', e.target.value)} />
                  {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>

                <div>
                  <label className={labelCls} htmlFor="phone">Teléfono / WhatsApp</label>
                  <input id="phone" type="tel" className={inputCls} style={inputStyle}
                    value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>

                <div>
                  <label className={labelCls} htmlFor="trade">Oficio o profesión *</label>
                  <input id="trade" className={inputCls} style={inputStyle}
                    placeholder="Ej: Fontanero, Electricista, Diseñador..."
                    value={form.trade} onChange={(e) => update('trade', e.target.value)} />
                  {errors.trade && <p className={errCls}>{errors.trade}</p>}
                </div>

                <div>
                  <label className={labelCls} htmlFor="zip">Código postal de tu zona *</label>
                  <input id="zip" className={inputCls} style={inputStyle}
                    value={form.zip} onChange={(e) => update('zip', e.target.value)} />
                  {errors.zip && <p className={errCls}>{errors.zip}</p>}
                </div>

                <div>
                  <label className={labelCls} htmlFor="source">¿Cómo conociste RUANA?</label>
                  <select id="source" className={inputCls} style={inputStyle}
                    value={form.source} onChange={(e) => update('source', e.target.value)}>
                    <option value="">Selecciona una opción</option>
                    <option value="Un aliado me invitó">Un aliado me invitó</option>
                    <option value="Redes sociales">Redes sociales</option>
                    <option value="Búsqueda en internet">Búsqueda en internet</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls} htmlFor="about">Cuéntanos brevemente sobre tu trabajo</label>
                  <textarea id="about" rows={3} className={inputCls} style={inputStyle}
                    value={form.about} onChange={(e) => update('about', e.target.value)} />
                </div>

                <button type="submit"
                  className="w-full py-4 rounded-lg font-bold text-base text-black transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,230,118,0.4)]"
                  style={{ backgroundColor: GREEN }}>
                  Enviar solicitud de acceso
                </button>
              </form>
            </>
          )}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
