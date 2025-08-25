import { cva } from 'class-variance-authority';
import { use, type HTMLAttributes } from 'react';
import { cn } from 'src/utils';
import { Button } from '../../inputs/Button';
import { ModalPortalContext } from '../ModalPortal';
import './style.css';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  closeButton?: boolean;
  children?: React.ReactNode;
}

const variants = cva(
  [
    'relative',
    'flex flex-col p-5 gap-5',
    'backdrop-blur-xl backdrop-filter',
    'shadow-[4px_4px_16px_0px_rgba(0,0,0,0.25)]',
    'bg-gradient-to-t from-slate-800/40 to-slate-500/40',
    'modal-gradient-border',
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

export function Modal({ title = 'Modal Title', children, className, closeButton = true, ...props }: ModalProps) {
  const { close } = use(ModalPortalContext);

  return (
    <div className={cn(variants({ variant: 'default' }), className)} {...props}>
      <div className="flex justify-between items-center">
        <h2 className="text-amber-100 text-shadow-light text-shadow-white/30 text-xl font-medium">{title}</h2>
        {closeButton && (
          <Button variant="transparent" className="w-16 h-8" focusMarker={false} onClick={close}>
            닫기
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
