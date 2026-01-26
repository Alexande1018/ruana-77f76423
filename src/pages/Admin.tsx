import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/StatusBadge';
import { PointsBadge } from '@/components/PointsBadge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, X, UserCog, AlertTriangle, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'titular' | 'suplente' | 'suspended' | 'rejected';
  points: number;
  zone: { name: string };
  trade: { name: string };
}

export default function Admin() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<AdminProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [pointsAdjust, setPointsAdjust] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    const { data } = await supabase
      .from('profiles')
      .select(`
        id,
        name,
        email,
        phone,
        status,
        points,
        zone:zones!profiles_zone_id_fkey (name),
        trade:trades!profiles_trade_id_fkey (name)
      `)
      .order('created_at', { ascending: false });

    if (data) {
      setProfiles(data as unknown as AdminProfile[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProfiles();
    }
  }, [isAdmin]);

  const handleApprove = async (profile: AdminProfile, status: 'titular' | 'suplente') => {
    setSubmitting(true);
    const points = status === 'titular' ? 100 : 50;

    const { error } = await supabase
      .from('profiles')
      .update({ status, points })
      .eq('id', profile.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Aprobado', description: `${profile.name} es ahora ${status}.` });
      fetchProfiles();
    }
    setSubmitting(false);
  };

  const handleReject = async (profile: AdminProfile) => {
    setSubmitting(true);
    const { error } = await supabase
      .from('profiles')
      .update({ status: 'rejected' })
      .eq('id', profile.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Rechazado', description: `${profile.name} fue rechazado.` });
      fetchProfiles();
    }
    setSubmitting(false);
  };

  const openManageDialog = (profile: AdminProfile) => {
    setSelectedProfile(profile);
    setNewStatus(profile.status);
    setPointsAdjust(profile.points.toString());
    setDialogOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedProfile) return;
    setSubmitting(true);

    type ProfileStatus = 'pending' | 'titular' | 'suplente' | 'suspended' | 'rejected';
    const updates: { status?: ProfileStatus; points?: number } = {};
    if (newStatus !== selectedProfile.status) {
      updates.status = newStatus as ProfileStatus;
    }
    const newPoints = parseInt(pointsAdjust);
    if (!isNaN(newPoints) && newPoints !== selectedProfile.points) {
      updates.points = newPoints;
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', selectedProfile.id);

      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
      } else {
        toast({ title: 'Actualizado', description: `${selectedProfile.name} fue actualizado.` });
        fetchProfiles();
      }
    }

    setDialogOpen(false);
    setSubmitting(false);
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No tienes acceso al panel de administración.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const pendingProfiles = profiles.filter((p) => p.status === 'pending');
  const activeProfiles = profiles.filter((p) => p.status === 'titular' || p.status === 'suplente');
  const lowPointsTitulars = profiles.filter((p) => p.status === 'titular' && p.points < 50);

  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.trade.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold mb-6">Panel de Administración</h1>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="relative">
              Pendientes
              {pendingProfiles.length > 0 && (
                <span className="ml-2 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                  {pendingProfiles.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="members">Todos los Miembros</TabsTrigger>
            <TabsTrigger value="alerts" className="relative">
              Alertas
              {lowPointsTitulars.length > 0 && (
                <span className="ml-2 bg-warning text-warning-foreground text-xs px-2 py-0.5 rounded-full">
                  {lowPointsTitulars.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Solicitudes Pendientes</CardTitle>
                <CardDescription>Aprueba o rechaza nuevos miembros</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingProfiles.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No hay solicitudes pendientes.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {pendingProfiles.map((p) => (
                      <div
                        key={p.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {p.trade.name} • Zona {p.zone.name}
                          </p>
                          <p className="text-sm text-muted-foreground">{p.email}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(p, 'titular')}
                            disabled={submitting}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Titular
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleApprove(p, 'suplente')}
                            disabled={submitting}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Suplente
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(p)}
                            disabled={submitting}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Rechazar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Todos los Miembros</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, email u oficio..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredProfiles.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {p.trade.name} • Zona {p.zone.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={p.status} className="text-xs" />
                        <PointsBadge points={p.points} size="sm" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openManageDialog(p)}
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Titulares con menos de 50 puntos
                </CardTitle>
                <CardDescription>Estos titulares están en revisión</CardDescription>
              </CardHeader>
              <CardContent>
                {lowPointsTitulars.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No hay titulares en revisión.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {lowPointsTitulars.map((p) => (
                      <div
                        key={p.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border border-warning/50 rounded-lg bg-warning/5"
                      >
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {p.trade.name} • Zona {p.zone.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status="review" className="text-xs" />
                          <PointsBadge points={p.points} size="sm" />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openManageDialog(p)}
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Gestionar: {selectedProfile?.name}</DialogTitle>
              <DialogDescription>
                Cambia el estado o ajusta los puntos del profesional.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="titular">Titular</SelectItem>
                    <SelectItem value="suplente">Suplente</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                    <SelectItem value="rejected">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Puntos</label>
                <Input
                  type="number"
                  value={pointsAdjust}
                  onChange={(e) => setPointsAdjust(e.target.value)}
                  min={0}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveChanges} disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
