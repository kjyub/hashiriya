import { cva } from 'class-variance-authority';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../../utils';
import './style.css';

export interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

const variants = cva(
  [
    'relative z-10 w-8 h-8 p-1',
    'bg-slate-300/15',
    'peer-not-checked:peer-hover:[&_.ds-checkbox-gradient]:translate-y-[-30%] peer-not-checked:peer-active:[&_.ds-checkbox-gradient]:translate-y-[-35%]',
    'peer-checked:peer-hover:[&_.ds-checkbox-gradient]:translate-y-[-44%] peer-checked:peer-active:[&_.ds-checkbox-gradient]:translate-y-[-42%]',
    'peer-checked:[&_.ds-checkbox-gradient]:translate-y-[-40%] peer-checked:[&_.check-icon]:opacity-100 peer-checked:[&_.check-icon]:translate-y-0',
    'cursor-pointer pointer-events-none overflow-hidden',
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

export function CheckBox({ className, ...props }: CheckBoxProps) {
  return (
    <label className="relative w-fit">
      <input type="checkbox" {...props} className="peer absolute size-full opacity-0 cursor-pointer" />
      <div className={cn(variants({ variant: 'default' }), className)}>
        <div className="ds-checkbox-gradient absolute z-0 inset-0 w-full h-[200%] transition-transform pointer-events-none"></div>
        <div className="check-icon absolute z-10 inset-0 flex flex-center size-full pointer-events-none opacity-0 translate-y-0.5 text-white/90 transition-all">
          <i className="fa-solid fa-check text-xl"></i>
        </div>
      </div>
    </label>
  );
}
