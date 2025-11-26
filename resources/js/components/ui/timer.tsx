import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const timerVariants = cva(
  'inline-flex items-center justify-center text-xs font-medium transition-colors border border-white/40 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-accent rounded-sm align-middle',
  {
    variants: {
      variant: {
        default:
          'bg-[#473C77] text-primary-foreground ml-2',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground ml-2',
        subtle:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-6 px-3',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    }
  }
);

export interface TimerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timerVariants> {}

function Timer({
    className,
    variant,
    size,
    ...props
}: TimerProps) {
  return (
    <div
      className={cn(timerVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Timer };