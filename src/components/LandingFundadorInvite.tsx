import { motion } from 'framer-motion';
import { ArrowRight, KeyRound } from 'lucide-react';
import { FUNDADOR_APP_URL, FUNDADOR_CODE } from '@/lib/inauguralPhase';
import { BG, GREEN, GREEN_DARK } from '@/lib/landingTheme';

export function LandingFundadorInvite() {
  return (
    <motion.section
      id="fundador"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-14 md:py-20 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,230,118,0.14), transparent 65%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-5 md:px-8">
        <div
          className="relative rounded-2xl border p-8 md:p-10 lg:p-12 overflow-hidden"
          style={{
            borderColor: 'rgba(0,230,118,0.35)',
            background: `linear-gradient(145deg, rgba(0,230,118,0.09) 0%, ${BG} 48%, rgba(0,230,118,0.04) 100%)`,
            boxShadow:
              '0 0 0 1px rgba(0,230,118,0.08), 0 24px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none landing-fundador-shimmer opacity-40"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45 mb-5">
                <KeyRound className="h-3.5 w-3.5" style={{ color: GREEN }} />
                Invitación privada
              </div>

              <h2 className="text-2xl md:text-[34px] font-semibold leading-[1.12] tracking-tight">
                ¿Tienes un Código Fundador?
              </h2>
              <p className="mt-4 text-lg md:text-xl text-white/85 leading-relaxed">
                Puede que tengas una de las primeras puertas de entrada a RUANA.
              </p>
              <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
                El Código Fundador es solo para los primeros 100 aliados. Los que entren ahora
                ayudarán a construir la red de su zona desde el principio.
              </p>
              <p className="mt-3 text-base md:text-lg text-white/50 leading-relaxed max-w-xl">
                Después, solo entras si alguien de la red te invita.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-stretch sm:items-center gap-5 lg:min-w-[240px]">
              <div
                className="rounded-xl px-6 py-5 text-center border"
                style={{
                  backgroundColor: GREEN_DARK,
                  borderColor: 'rgba(0,230,118,0.45)',
                }}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-2">
                  Tu código
                </p>
                <p
                  className="text-2xl md:text-3xl font-bold font-mono tracking-[0.22em]"
                  style={{ color: GREEN }}
                >
                  {FUNDADOR_CODE}
                </p>
              </div>

              <a
                href={FUNDADOR_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm text-black transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,230,118,0.5)] hover:-translate-y-0.5"
                style={{ backgroundColor: GREEN }}
              >
                Entrar con mi código
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
