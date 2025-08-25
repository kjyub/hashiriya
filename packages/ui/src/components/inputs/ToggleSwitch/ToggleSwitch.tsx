import { cva } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import { cn } from 'src/utils';

export interface ToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

const variants = cva(
  [
    'relative z-10 w-16 h-8 p-1',
    'rounded-full bg-slate-300/15 peer-hover:bg-slate-300/20 peer-active:bg-slate-300/30',
    'cursor-pointer pointer-events-none overflow-hidden',
    '[&_.slide]:translate-x-[calc(-100%+24px)] peer-checked:[&_.slide]:translate-x-0',
  ],
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function ToggleSwitch({ className, ...props }: ToggleSwitchProps) {
  return (
    <label className="relative w-fit">
      <input type="checkbox" {...props} className="peer absolute size-full opacity-0 cursor-pointer" />
      <div className={cn(variants({ variant: 'default' }), className)}>
        <div className="relative size-full rounded-full overflow-hidden">
          <div className="slide absolute flex justify-end size-[calc(100%)] rounded-full bg-blue-500/50 transition-all duration-200">
            <div className="ball h-full aspect-square rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </label>
  );
}
