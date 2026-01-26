import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/StatusBadge';
import { PointsBadge } from '@/components/PointsBadge';
import { Loader2, MapPin, Briefcase, Phone, Mail, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Recommendation {
  id: string;
  content: string;
  created_at: string;
  from_profile: {
    name: string;
    trade: { name: string };
  };
}

interface ZoneInfo {
  name: string;
}

interface TradeInfo {
  name: string;
}

export default function Profile() {
  const { profile, loading: authLoading } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [zone, setZone] = useState<ZoneInfo | null>(null);
  const [trade, setTrade] = useState<TradeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;

      const [recsResult, zoneResult, tradeResult] = await Promise.all([
        supabase
          .from('recommendations')
          .select(`
            id,
            content,
            created_at,
            from_profile:profiles!recommendations_from_profile_id_fkey (
              name,
              trade:trades!profiles_trade_id_fkey (name)
            )
          `)
          .eq('to_profile_id', profile.id)
          .order('created_at', { ascending: false }),
        supabase.from('zones').select('name').eq('id', profile.zone_id).single(),
        supabase.from('trades').select('name').eq('id', profile.trade_id).single(),
      ]);

      if (recsResult.data) setRecommendations(recsResult.data as unknown as Recommendation[]);
      if (zoneResult.data) setZone(zoneResult.data);
      if (tradeResult.data) setTrade(tradeResult.data);
      setLoading(false);
    };

    if (profile) {
      fetchData();
    }
  }, [profile]);

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

  const showReviewBadge = profile.status === 'titular' && profile.points < 50;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="card-elevated">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.photo_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-display">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="font-display text-2xl font-bold">{profile.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <StatusBadge status={profile.status} />
                      {showReviewBadge && <StatusBadge status="review" />}
                      <PointsBadge points={profile.points} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{trade?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Zona {zone?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{profile.email}</span>
                    </div>
                  </div>
                  {profile.description && (
                    <p className="text-sm text-muted-foreground">{profile.description}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Recomendaciones Recibidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Aún no has recibido recomendaciones.
                </p>
              ) : (
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <p className="font-medium">{rec.from_profile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {rec.from_profile.trade.name}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(rec.created_at), {
                            addSuffix: true,
                            locale: es,
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{rec.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
