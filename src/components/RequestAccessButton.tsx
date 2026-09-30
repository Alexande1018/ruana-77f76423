import { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { INAUGURAL_PHASE_ACTIVE, PUBLIC_ACCESS_CODE } from "@/lib/inauguralPhase";
import { useRegisterUrl } from "@/lib/registerUrl";
import { GREEN, GREEN_DARK, BG_ALT } from "@/lib/landingTheme";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onBeforeOpen?: () => void;
};

export function RequestAccessButton({ children, className, style, onBeforeOpen }: Props) {
  const href = useRegisterUrl();
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onBeforeOpen?.();
      if (!INAUGURAL_PHASE_ACTIVE) return;
      e.preventDefault();
      setOpen(true);
    },
    [onBeforeOpen]
  );

  return (
    <>
      <a
        href={href}
        className={className}
        style={style}
        onClick={handleClick}
        aria-haspopup={INAUGURAL_PHASE_ACTIVE ? "dialog" : undefined}
      >
        {children}
      </a>
      {INAUGURAL_PHASE_ACTIVE && open && <InauguralPhaseModal onClose={() => setOpen(false)} />}
    </>
  );
}

function InauguralPhaseModal({ onClose }: { onClose: () => void }) {
  const href = useRegisterUrl();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

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
          <p
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-5 border"
            style={{
              borderColor: "rgba(0,230,118,0.4)",
              backgroundColor: "rgba(0,230,118,0.08)",
              color: GREEN,
            }}
          >
            Por invitación
          </p>

          <h2 id="inaugural-title" className="text-2xl md:text-[28px] font-bold leading-tight tracking-tight">
            Esta fase no está abierta a cualquiera.
          </h2>

          <div className="mt-5 space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Las plazas van por invitación y son pocas. Si has llegado hasta aquí, puedes ocupar la de tu oficio en tu zona.
            </p>
            <p>Este es el código. Va en el registro.</p>

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
                {PUBLIC_ACCESS_CODE}
              </div>
            </div>

            <p className="text-white/60 text-sm">Apuntarse no tiene cuota.</p>
          </div>

          <div className="mt-7 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg font-semibold text-sm border border-white/20 text-white hover:bg-white/[0.06] transition"
            >
              Cerrar
            </button>
            <a
              href={href}
              className="px-5 py-3 rounded-lg font-semibold text-sm text-black text-center transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,230,118,0.45)]"
              style={{ backgroundColor: GREEN }}
            >
              Apuntarme con {PUBLIC_ACCESS_CODE}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
