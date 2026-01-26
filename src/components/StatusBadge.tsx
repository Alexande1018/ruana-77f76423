import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Status = 'pending' | 'titular' | 'suplente' | 'suspended' | 'rejected' | 'review' | 'opportunity';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  titular: { label: 'Titular', className: 'badge-titular' },
  suplente: { label: 'Suplente', className: 'badge-suplente' },
  pending: { label: 'Pendiente', className: 'badge-pending' },
  review: { label: 'En Revisión', className: 'badge-review' },
  opportunity: { label: 'Oportunidad Disponible', className: 'badge-opportunity' },
  suspended: { label: 'Suspendido', className: 'badge-suspended' },
  rejected: { label: 'Rechazado', className: 'badge-rejected' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={cn(config.className, 'font-medium', className)}>
      {config.label}
    </Badge>
  );
}
