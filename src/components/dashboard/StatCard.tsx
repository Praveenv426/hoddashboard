
import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statCardVariants = cva(
  "stat-card",
  {
    variants: {
      variant: {
        default: "border-border/30",
        success: "border-l-4 border-l-adminhub-success",
        warning: "border-l-4 border-l-yellow-500",
        error: "border-l-4 border-l-adminhub-error",
        info: "border-l-4 border-l-adminhub-accent",
      }
    },
    defaultVariants: {
      variant: "default",
    }
  }
);

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  variant, 
  className 
}: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-adminhub-secondary-text text-sm font-medium">{title}</h3>
        {icon && <div className="text-adminhub-accent">{icon}</div>}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {trend && (
        <div className={cn(
          "text-xs font-medium flex items-center",
          trend.isPositive ? "text-adminhub-success" : "text-adminhub-error"
        )}>
          <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
          <span className="ml-1 text-adminhub-secondary-text">vs last month</span>
        </div>
      )}
    </div>
  );
}
