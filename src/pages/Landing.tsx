import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { Users, Star, Shield, Handshake } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Shield,
      title: 'Exclusividad por Zona',
      description: 'Solo un titular y un suplente por oficio en cada zona. Garantiza oportunidades únicas.',
    },
    {
      icon: Star,
      title: 'Sistema de Puntos',
      description: 'Gana puntos por recomendaciones, respuestas y actividad. Mantén tu posición activa.',
    },
    {
      icon: Handshake,
      title: 'Recomendaciones',
      description: 'Construye tu reputación con recomendaciones de otros profesionales de tu zona.',
    },
    {
      icon: Users,
      title: 'Solicitudes Semanales',
      description: 'Publica lo que necesitas cada semana. Conecta con profesionales de tu zona.',
    },
  ];

  return (
    <Layout>
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">RUANA</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-display">
              Red Unificada de Alianza de Negocios Aliados
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Una red privada de profesionales locales con exclusividad por oficio y zona. 
              Conecta, recomienda y crece junto a colegas de confianza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/register">Solicitar Acceso</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/login">Ya soy miembro</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-elevated animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            ¿Listo para unirte?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Solicita acceso y un administrador revisará tu solicitud. 
            Si hay disponibilidad en tu zona y oficio, serás aprobado como titular o suplente.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Solicitar Acceso Ahora</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
