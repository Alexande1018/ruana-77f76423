import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/StatusBadge';
import { PointsBadge } from '@/components/PointsBadge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, Briefcase, Star, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

interface ProfileData {
  id: string;
  name: string;
  photo_url: string | null;
  description: string | null;
  status: 'pending' | 'titular' | 'suplente' | 'suspended' | 'rejected';
  points: number;
  zone_id: string;
  zone: { name: string };
  trade: { name: string };
}

interface Recommendation {
  id: string;
  content: string;
  created_at: string;
  from_profile: {
    name: string;
    trade: { name: string };
  };
}

export default function ProfessionalProfile() {
  const { id } = useParams<{ id: string }>();
  const { profile: currentProfile, refreshProfile } = useAuth();
  const [professional, setProfessional] = useState<ProfileData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [recommendationContent, setRecommendationContent] = useState('');
  const [canRecommend, setCanRecommend] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    if (!id) return;

    const { data: profileData } = await supabase
      .from('profiles')
      .select(`
        id,
        name,
        photo_url,
        description,
        status,
        points,
        zone_id,
        zone:zones!profiles_zone_id_fkey (name),
        trade:trades!profiles_trade_id_fkey (name)
      `)
      .eq('id', id)
      .single();

    if (profileData) {
      setProfessional(profileData as unknown as ProfileData);

      const { data: recsData } = await supabase
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
        .eq('to_profile_id', id)
        .order('created_at', { ascending: false });

      if (recsData) {
        setRecommendations(recsData as unknown as Recommendation[]);
      }

      if (currentProfile && currentProfile.id !== id && currentProfile.zone_id === profileData.zone_id) {
        const thirtyDaysAgo = subDays(new Date(), 30).toISOString();
        const { data: recentRec } = await supabase
          .from('recommendations')
          .select('id')
          .eq('from_profile_id', currentProfile.id)
          .eq('to_profile_id', id)
          .gte('created_at', thirtyDaysAgo)
          .maybeSingle();

        setCanRecommend(!recentRec);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id, currentProfile]);

  const handleRecommend = async () => {
    if (!currentProfile || !professional || !recommendationContent.trim()) return;

    setSubmitting(true);

    const { error } = await supabase.from('recommendations').insert({
      from_profile_id: currentProfile.id,
      to_profile_id: professional.id,
      content: recommendationContent.trim(),
    });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo enviar la recomendación.',
      });
    } else {
      await supabase
        .from('profiles')
        .update({ points: professional.points + 10 })
        .eq('id', professional.id);

      await supabase
        .from('profiles')
        .update({ points: currentProfile.points + 5 })
        .eq('id', currentProfile.id);

      await refreshProfile();
      toast({
        title: 'Recomendación enviada',
        description: '+5 puntos para ti, +10 para el recomendado.',
      });
      setRecommendationContent('');
      setCanRecommend(false);
      fetchData();
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!professional) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Profesional no encontrado.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const showReviewBadge = professional.status === 'titular' && professional.points < 50;
  const isOwnProfile = currentProfile?.id === professional.id;
  const isSameZone = currentProfile?.zone_id === professional.zone_id;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="card-elevated">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={professional.photo_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl font-display">
                    {professional.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="font-display text-2xl font-bold">{professional.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <StatusBadge status={professional.status} />
                      {showReviewBadge && <StatusBadge status="review" />}
                      <PointsBadge points={professional.points} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{professional.trade.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Zona {professional.zone.name}</span>
                    </div>
                  </div>
                  {professional.description && (
                    <p className="text-sm text-muted-foreground">{professional.description}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {!isOwnProfile && isSameZone && canRecommend && currentProfile && (
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  Recomendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Escribe tu recomendación..."
                  value={recommendationContent}
                  onChange={(e) => setRecommendationContent(e.target.value)}
                  rows={3}
                  maxLength={300}
                />
                <Button
                  onClick={handleRecommend}
                  disabled={submitting || !recommendationContent.trim()}
                >
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar Recomendación
                </Button>
                <p className="text-xs text-muted-foreground">
                  Puedes recomendar a cada profesional una vez cada 30 días. +5 pts para ti, +10 pts para el recomendado.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Recomendaciones ({recommendations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Este profesional aún no tiene recomendaciones.
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
