import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { LandingNavbar, LandingFooter } from "@/components/LandingChrome";
import { BG, GREEN, GREEN_BTN, PAPER, TITLE_SHADOW } from "@/lib/landingTheme";
import {
  buildPasarEncargoMessage,
  buildPasarEncargoWhatsAppUrl,
  pasarEncargoCompleto,
} from "@/lib/pasarEncargo";

const TITLE = "Pasa un encargo a un colega · RUANA";
const PAGE_URL = "https://ruana.app/pasar-encargo";

const fieldClass =
  "mt-2 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-base text-white " +
  "placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ED400]";

/** La página comparte index.html con la portada: ajusta título y canonical solo mientras está abierta. */
function usePageMeta() {
  useEffect(() => {
    const previousTitle = document.title;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    const previousCanonical = canonical?.getAttribute("href");
    const previousOgUrl = ogUrl?.getAttribute("content");

    document.title = TITLE;
    canonical?.setAttribute("href", PAGE_URL);
    ogUrl?.setAttribute("content", PAGE_URL);

    return () => {
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.setAttribute("href", previousCanonical);
      if (ogUrl && previousOgUrl) ogUrl.setAttribute("content", previousOgUrl);
    };
  }, []);
}

export default function PasarEncargo() {
  usePageMeta();
  // Solo en memoria: no se guarda nada ni se envía a ningún servidor.
  const [oficio, setOficio] = useState("");
  const [zona, setZona] = useState("");
  const [linea, setLinea] = useState("");

  const datos = { oficio, zona, linea };
  const listo = pasarEncargoCompleto(datos);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BG }}>
      <LandingNavbar />

      <main className="max-w-2xl mx-auto px-5 md:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <h1
          className="text-[32px] md:text-[48px] leading-[1.08] font-normal tracking-tight text-balance"
          style={{ fontFamily: "Instrument Serif, Georgia, serif", color: PAPER, textShadow: TITLE_SHADOW }}
        >
          ¿Te ha salido un encargo que no puedes coger?
        </h1>
        <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed">
          Pásaselo a un colega. Cuéntanos de qué es y te dejamos el mensaje listo para mandarlo por WhatsApp.
          No hace falta estar registrado y no guardamos nada.
        </p>

        <form className="mt-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="oficio" className="text-sm font-medium text-white/90">
              Oficio
            </label>
            <input
              id="oficio"
              type="text"
              autoComplete="off"
              maxLength={60}
              placeholder="fontanero, electricista, pintor…"
              value={oficio}
              onChange={(e) => setOficio(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="zona" className="text-sm font-medium text-white/90">
              Zona
            </label>
            <input
              id="zona"
              type="text"
              autoComplete="off"
              maxLength={60}
              placeholder="barrio, pueblo o código postal"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="linea" className="text-sm font-medium text-white/90">
              El encargo, en una línea
            </label>
            <input
              id="linea"
              type="text"
              autoComplete="off"
              maxLength={160}
              placeholder="cambiar un grifo y revisar una fuga bajo el fregadero"
              value={linea}
              onChange={(e) => setLinea(e.target.value)}
              className={fieldClass}
            />
            <p className="mt-2 text-sm text-white/55">
              No pongas nombres, teléfonos ni direcciones de tu cliente.
            </p>
          </div>

          {listo && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/55">Así saldrá tu mensaje:</p>
              <p className="mt-2 text-base text-white/90 leading-relaxed">{buildPasarEncargoMessage(datos)}</p>
            </div>
          )}

          {listo ? (
            <a
              href={buildPasarEncargoWhatsAppUrl(datos)}
              target="_blank"
              rel="noopener noreferrer"
              className="landing-cta inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg px-7 py-4 text-base md:text-lg font-semibold transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ED400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117]"
              style={{ backgroundColor: GREEN_BTN, color: "#111111" }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Mandar por WhatsApp
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg px-7 py-4 text-base md:text-lg font-semibold opacity-50 cursor-not-allowed"
              style={{ backgroundColor: GREEN_BTN, color: "#111111" }}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Mandar por WhatsApp
            </button>
          )}
          {!listo && <p className="text-sm text-white/55">Rellena los tres campos para ver el mensaje.</p>}
        </form>

        <p className="mt-10 text-sm" style={{ color: GREEN }}>
          Hoy pasas tú, mañana te pasan a ti.
        </p>
      </main>

      <LandingFooter />
    </div>
  );
}
