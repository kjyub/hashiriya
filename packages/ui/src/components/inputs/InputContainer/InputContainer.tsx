import type { ReactNode } from 'react';
import { cn } from 'src/utils';

interface Props {
  label?: string;
  className?: string;
  children: ReactNode;
}

export function InputContainer({ label, className, children }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm text-white font-light">{label}</span>}
      <div
        className={cn([
          className,
          'flex p-2 bg-slate-300/15 hover:bg-slate-300/30 active:bg-slate-300/30 shadow-[inset_0_-2px_0_0] shadow-cyan-400 focus-within:shadow-amber-400',
          'text-sm text-white/80',
          'transition-all duration-200',
          '[&>*]:w-full',
        ])}
      >
        {children}
      </div>
    </div>
  );
}
