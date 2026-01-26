import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PointsBadgeProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PointsBadge({ points, size = 'md', className }: PointsBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <div className={cn(
      'inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary font-semibold',
      sizeClasses[size],
      className
    )}>
      <Star size={iconSizes[size]} className="fill-current" />
      <span>{points} pts</span>
    </div>
  );
}
