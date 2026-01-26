import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/StatusBadge';
import { PointsBadge } from '@/components/PointsBadge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Phone, Mail, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface WeeklyRequest {
  id: string;
  content: string;
  created_at: string;
  is_active: boolean;
  profile: {
    id: string;
    name: string;
    phone: string;
    email: string;
    trade: { name: string };
  };
  responded?: boolean;
}

export default function Dashboard() {
  const { profile, refreshProfile, loading: authLoading } = useAuth();
  const [requests, setRequests] = useState<WeeklyRequest[]>([]);
  const [myRequest, setMyRequest] = useState<string>('');
  const [newRequestContent, setNewRequestContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [respondedRequests, setRespondedRequests] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchRequests = async () => {
    if (!profile) return;

    const { data: requestsData } = await supabase
      .from('weekly_requests')
      .select(`
        id,
        content,
        created_at,
        is_active,
        profile:profiles!weekly_requests_profile_id_fkey (
          id,
          name,
          phone,
          email,
          trade:trades!profiles_trade_id_fkey (name)
        )
      `)
      .eq('zone_id', profile.zone_id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (requestsData) {
      const { data: responsesData } = await supabase
        .from('request_responses')
        .select('request_id')
        .eq('responder_id', profile.id);

      const respondedIds = new Set(responsesData?.map(r => r.request_id) || []);
      setRespondedRequests(respondedIds);
      setRequests(requestsData as unknown as WeeklyRequest[]);
    }

    const { data: myActiveRequest } = await supabase
      .from('weekly_requests')
      .select('content')
      .eq('profile_id', profile.id)
      .eq('is_active', true)
      .maybeSingle();

    if (myActiveRequest) {
      setMyRequest(myActiveRequest.content);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchRequests();
    }
  }, [profile]);

  const handlePublishRequest = async () => {
    if (!profile || !newRequestContent.trim()) return;

    setSubmitting(true);

    await supabase
      .from('weekly_requests')
      .update({ is_active: false, archived_at: new Date().toISOString() })
      .eq('profile_id', profile.id)
      .eq('is_active', true);

    const { error } = await supabase.from('weekly_requests').insert({
      profile_id: profile.id,
      zone_id: profile.zone_id,
      content: newRequestContent.trim(),
    });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo publicar la solicitud.',
      });
    } else {
      toast({
        title: 'Solicitud publicada',
        description: 'Tu solicitud semanal está activa.',
      });
      setNewRequestContent('');
      setMyRequest(newRequestContent.trim());
      fetchRequests();
    }

    setSubmitting(false);
  };

  const handleRespond = async (request: WeeklyRequest) => {
    if (!profile) return;

    const { error } = await supabase.from('request_responses').insert({
      request_id: request.id,
      responder_id: profile.id,
    });

    if (error) {
      if (error.code === '23505') {
        toast({
          variant: 'destructive',
          title: 'Ya respondiste',
          description: 'Ya has respondido a esta solicitud.',
        });
      }
      return;
    }

    await supabase
      .from('profiles')
      .update({ points: profile.points + 3 })
      .eq('id', profile.id);

    await refreshProfile();
    setRespondedRequests(new Set([...respondedRequests, request.id]));
    toast({
      title: '¡Respondiste!',
      description: `Contacto: ${request.profile.phone}. +3 puntos ganados.`,
    });
  };

  if (authLoading) {
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
  const otherRequests = requests.filter(r => r.profile.id !== profile.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="font-display text-xl">Mi Estado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estado:</span>
                  <div className="flex gap-2">
                    <StatusBadge status={profile.status} />
                    {showReviewBadge && <StatusBadge status="review" />}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Puntos:</span>
                  <PointsBadge points={profile.points} />
                </div>
                {profile.status === 'pending' && (
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                    Tu solicitud está pendiente de aprobación por un administrador.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="font-display text-xl">Mi Solicitud Semanal</CardTitle>
                <CardDescription>
                  Publica lo que necesitas esta semana
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myRequest && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">Solicitud activa:</p>
                    <p className="text-sm text-muted-foreground">{myRequest}</p>
                  </div>
                )}
                <Textarea
                  placeholder="Busco [oficio] para [necesidad]..."
                  value={newRequestContent}
                  onChange={(e) => setNewRequestContent(e.target.value)}
                  rows={3}
                  maxLength={300}
                  disabled={profile.status !== 'titular' && profile.status !== 'suplente'}
                />
                <Button
                  onClick={handlePublishRequest}
                  disabled={submitting || !newRequestContent.trim() || (profile.status !== 'titular' && profile.status !== 'suplente')}
                  className="w-full"
                >
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Send className="mr-2 h-4 w-4" />
                  {myRequest ? 'Reemplazar solicitud' : 'Publicar solicitud'}
                </Button>
                {(profile.status !== 'titular' && profile.status !== 'suplente') && (
                  <p className="text-xs text-muted-foreground text-center">
                    Solo titulares y suplentes pueden publicar solicitudes.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="font-display text-xl">Solicitudes de mi Zona</CardTitle>
                <CardDescription>
                  Responde para ver el contacto y ganar +3 puntos
                </CardDescription>
              </CardHeader>
              <CardContent>
                {otherRequests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No hay solicitudes activas en tu zona.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {otherRequests.map((request) => {
                      const hasResponded = respondedRequests.has(request.id);
                      return (
                        <div
                          key={request.id}
                          className="p-4 border border-border rounded-lg space-y-3"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="font-medium">{request.profile.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {request.profile.trade.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(request.created_at), {
                                addSuffix: true,
                                locale: es,
                              })}
                            </div>
                          </div>
                          <p className="text-sm">{request.content}</p>
                          {hasResponded ? (
                            <div className="flex items-center gap-4 text-sm bg-muted p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>{request.profile.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>{request.profile.email}</span>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRespond(request)}
                              disabled={profile.status !== 'titular' && profile.status !== 'suplente'}
                            >
                              Responder (+3 pts)
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
