import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { PartyPopper, X } from "lucide-react";
import { INAUGURAL_PHASE_ACTIVE, FUNDADOR_APP_URL, FUNDADOR_CODE } from "@/lib/inauguralPhase";
import { GREEN, GREEN_DARK, BG_ALT } from "@/lib/landingTheme";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onBeforeOpen?: () => void;
};

export function RequestAccessButton({ children, className, style, onBeforeOpen }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!INAUGURAL_PHASE_ACTIVE) return; // let Link navigate normally
      e.preventDefault();
      onBeforeOpen?.();
      setOpen(true);
    },
    [onBeforeOpen]
  );

  return (
    <>
      <Link to="/register" className={className} style={style} onClick={handleClick}>
        {children}
      </Link>
      {open && <InauguralPhaseModal onClose={() => setOpen(false)} />}
    </>
  );
}

function InauguralPhaseModal({ onClose }: { onClose: () => void }) {
  const goToApp = () => {
    onClose();
    window.open(FUNDADOR_APP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inaugural-title"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 animate-in fade-in duration-200"
      style={{ backgroundColor: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border shadow-2xl text-white animate-in zoom-in-95 duration-200"
        style={{
          backgroundColor: BG_ALT,
          borderColor: "rgba(0,230,118,0.35)",
          boxShadow: "0 24px 80px rgba(0,230,118,0.18), 0 0 0 1px rgba(0,230,118,0.15)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-7 md:p-9">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{
              borderColor: "rgba(0,230,118,0.4)",
              backgroundColor: "rgba(0,230,118,0.08)",
              color: GREEN,
            }}
          >
            <PartyPopper className="h-3.5 w-3.5" /> Fase Inaugural · Acceso exclusivo
          </div>

          <h2 id="inaugural-title" className="text-2xl md:text-[28px] font-bold leading-tight tracking-tight">
            Estás invitado a formar parte de los{" "}
            <span style={{ color: GREEN }}>Aliados Fundadores</span> de RUANA
          </h2>

          <div className="mt-5 space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Durante la Fase Inaugural, no es necesario solicitar un código ni entrar en lista de espera.
            </p>
            <p>
              De forma exclusiva puedes registrarte como Aliado Fundador utilizando el código de acceso:
            </p>

            <div
              className="rounded-xl px-5 py-4 text-center border-2"
              style={{ backgroundColor: GREEN_DARK, borderColor: GREEN }}
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1">
                Código de acceso
              </div>
              <div
                className="text-3xl md:text-4xl font-extrabold tracking-[0.25em]"
                style={{ color: GREEN }}
              >
                {FUNDADOR_CODE}
              </div>
            </div>

            <p>
              Haz clic en <span className="text-white font-semibold">"Ya tengo un código"</span>,
              introduce el código <span className="font-semibold" style={{ color: GREEN }}>{FUNDADOR_CODE}</span> y completa tu registro directamente.
            </p>
            <p className="text-white/60 text-sm">
              Aprovecha esta oportunidad antes de que finalice la Fase Inaugural.
            </p>
          </div>

          <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white hover:bg-white/[0.06] transition"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={goToApp}
              className="px-5 py-3 rounded-lg font-semibold text-sm text-black transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,230,118,0.45)]"
              style={{ backgroundColor: GREEN }}
            >
              Ir a "Ya tengo un código"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
