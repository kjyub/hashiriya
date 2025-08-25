import { cva } from 'class-variance-authority';

import { cn } from 'src/utils';

import type { ReactNode } from 'react';

interface Props {
  label?: string;
  className?: string;
  variant?: 'default' | 'no-border';
  children: ReactNode;
}
const variants = cva(
  [
    'flex items-center p-2 gap-1',
    'bg-slate-300/15 hover:bg-slate-300/30 active:bg-slate-300/30',
    'text-sm text-white/80',
    'transition-all duration-200',
    '[&>input]:w-full [&>textarea]:w-full',
    '[&>button]:text-white/50 [&>button]:hover:text-white/80',
  ],
  {
    variants: {
      variant: {
        default: 'shadow-[inset_0_-2px_0_0] shadow-cyan-400 focus-within:shadow-amber-400',
        'no-border': '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function InputContainer({ label, className, variant = 'default', children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm text-white font-light">{label}</span>}
      <div className={cn(variants({ variant }), [className])}>{children}</div>
    </div>
  );
}
