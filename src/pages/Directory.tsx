import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/StatusBadge';
import { PointsBadge } from '@/components/PointsBadge';
import { Loader2, Search } from 'lucide-react';

interface DirectoryProfile {
  id: string;
  name: string;
  photo_url: string | null;
  status: 'pending' | 'titular' | 'suplente' | 'suspended' | 'rejected';
  points: number;
  trade: { name: string };
}

export default function Directory() {
  const { profile, loading: authLoading } = useAuth();
  const [professionals, setProfessionals] = useState<DirectoryProfile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      if (!profile) return;

      const { data } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          photo_url,
          status,
          points,
          trade:trades!profiles_trade_id_fkey (name)
        `)
        .eq('zone_id', profile.zone_id)
        .in('status', ['titular', 'suplente'])
        .order('status')
        .order('name');

      if (data) {
        setProfessionals(data as unknown as DirectoryProfile[]);
      }
      setLoading(false);
    };

    if (profile) {
      fetchProfessionals();
    }
  }, [profile]);

  const filteredProfessionals = professionals.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.trade.name.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No tienes perfil registrado.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Directorio de mi Zona</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre u oficio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredProfessionals.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No se encontraron profesionales.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProfessionals.map((p) => {
                  const showReviewBadge = p.status === 'titular' && p.points < 50;
                  const hasSuplente = professionals.some(
                    (other) =>
                      other.trade.name === p.trade.name &&
                      other.status === 'suplente'
                  );
                  const showOpportunity =
                    p.status === 'suplente' &&
                    professionals.some(
                      (other) =>
                        other.trade.name === p.trade.name &&
                        other.status === 'titular' &&
                        other.points < 50
                    );

                  return (
                    <Link
                      key={p.id}
                      to={`/professional/${p.id}`}
                      className="block p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={p.photo_url || undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary font-display">
                            {p.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{p.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {p.trade.name}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <StatusBadge status={p.status} className="text-xs" />
                            {showReviewBadge && (
                              <StatusBadge status="review" className="text-xs" />
                            )}
                            {showOpportunity && (
                              <StatusBadge status="opportunity" className="text-xs" />
                            )}
                          </div>
                          <PointsBadge points={p.points} size="sm" className="mt-2" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
