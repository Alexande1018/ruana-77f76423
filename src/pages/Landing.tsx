import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Heart, Play, Sprout, ArrowRight } from 'lucide-react';
import heroImg from '@/assets/ruana-hero.png';
import step1 from '@/assets/step-1.png';
import step2 from '@/assets/step-2.png';
import step3 from '@/assets/step-3.png';
import step4 from '@/assets/step-4.png';

const steps = [
  { n: 1, img: step1, title: 'Crea tu cuenta', desc: 'Es fácil y rápido.' },
  { n: 2, img: step2, title: 'Comparte o pide', desc: 'Publica lo que tienes o lo que necesitas.' },
  { n: 3, img: step3, title: 'Conecta', desc: 'Habla con personas de tu comunidad.' },
  { n: 4, img: step4, title: 'Intercambia y transforma', desc: 'Juntos creamos una comunidad más solidaria y consciente.' },
];

export default function Landing() {
  return (
    <Layout>
      <div className="font-sketch text-ink">
        {/* HERO */}
        <section className="border-b-2 border-dashed border-ink/30">
          <div className="container mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-sketch text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
                Conecta.<br />Comparte.<br />Transforma.
              </h1>
              <p className="text-lg md:text-xl text-ink/80 max-w-md mb-8 leading-relaxed">
                RUANA es una plataforma para compartir lo que tienes,
                pedir lo que necesitas y construir comunidad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="sketch-btn sketch-btn-primary inline-flex items-center gap-2 px-6 py-3 text-base"
                >
                  Únete a la comunidad
                </Link>
                <Link
                  to="/login"
                  className="sketch-btn inline-flex items-center gap-2 px-6 py-3 text-base"
                >
                  <Play className="h-4 w-4" /> Cómo funciona
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={heroImg}
                alt="Dos personas intercambiando un objeto, ilustración a lápiz"
                width={1280}
                height={960}
                className="w-full max-w-xl h-auto"
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="font-sketch text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="opacity-60">≋</span> ¿Cómo funciona RUANA? <span className="opacity-60">≋</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-start">
              {steps.map((s, i) => (
                <div key={s.n} className="relative flex flex-col items-center text-center px-2">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full border-2 border-ink/70 flex items-center justify-center bg-paper">
                      <img src={s.img} alt={s.title} width={512} height={512} loading="lazy" className="w-24 h-24 object-contain" />
                    </div>
                    <span className="absolute -top-1 -left-1 w-8 h-8 rounded-full border-2 border-ink/70 bg-paper flex items-center justify-center text-sm font-bold">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="font-sketch font-bold text-xl mb-2">{s.title}</h3>
                  <p className="text-ink/70 text-sm max-w-[14rem]">{s.desc}</p>

                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-14 -right-3 h-6 w-6 text-ink/50" strokeWidth={1.5} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TAGLINE */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl border-2 border-ink/70 rounded-full px-8 py-4 flex items-center justify-center gap-4 bg-paper">
              <Heart className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              <p className="text-center text-base md:text-lg">
                Menos desperdicio, más comunidad, más bienestar para todos.
              </p>
              <Sprout className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
