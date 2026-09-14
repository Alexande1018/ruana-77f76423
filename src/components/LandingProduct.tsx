import { LandingScreenshot } from '@/components/LandingScreenshot';

export function LandingProduct() {
  return (
    <div>
      <div className="max-w-xl mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">El grupo, en la aplicación</h2>
        <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed">
          No es un listado abierto. Es el espacio del grupo: oficio, código postal y las personas
          con las que puedes recomendarte trabajo.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <LandingScreenshot
          src="/landing/08-perfil-aliado.png"
          alt="Perfil de un profesional en RUANA, con oficio y código postal"
          caption="Oficio y código postal en el perfil. La red se organiza por zona, no calle a calle."
        />
        <LandingScreenshot
          src="/landing/07-directorio-red.png"
          alt="Directorio del grupo en RUANA"
          caption="Directorio del grupo: se busca por nombre, oficio o zona. Solo quien ya forma parte lo ve."
        />
      </div>
      <p className="mt-5 text-xs text-white/40 leading-relaxed">
        Capturas de la aplicación real. El directorio aparece vacío cuando el grupo de esa cuenta
        aún se está formando.
      </p>
    </div>
  );
}
