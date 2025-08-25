import { cva } from 'class-variance-authority';
import { useRef, type ButtonHTMLAttributes, type ReactNode, type RefObject } from 'react';
import { cn } from '../../../utils';
import FocusMarker from '../FocusMarker';
import useFocusMarker from '../FocusMarker/useFocusMarker';
import './style.css';

export interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ref?: RefObject<HTMLButtonElement | null>;
}

const variants = cva(
  [
    'relative flex flex-center w-48 h-10',
    'txt-light font-light text-white disabled:text-white/50',
    'gradient',
    '[&_.active-gradient]:translate-x-0 hover:[&_.active-gradient]:translate-x-[42%] active:[&_.active-gradient]:translate-x-[44%]',
    'hover:[&_.light]:w-[120%] active:[&_.light]:w-[125%] disabled:[&_.light]:opacity-0',
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

export function ButtonPrimary({ children, className, ref: externalRef, ...props }: ButtonPrimaryProps) {
  const ref = externalRef ?? useRef<HTMLButtonElement>(null);
  const isFocus = useFocusMarker<HTMLButtonElement>(ref);

  return (
    <button ref={ref} {...props} className={cn(variants({ variant: 'default' }), 'input-container', className)}>
      <FocusMarker isFocus={isFocus} color="yellow">
        <div className="absolute z-10 flex flex-center size-full p-2">{children}</div>

        {/* 스타일 효과 */}
        <div
          className={cn([
            'light absolute z-0 flex justify-between items-center size-full transition-all duration-200',
            '[&>div]:w-full [&>div]:h-12 [&>div]:scale-x-200',
            '[&>div]:bg-gradient-to-t [&>div]:from-white/30 [&>div]:to-transparent',
          ])}
        >
          {/* left */}
          <div className="rotate-[110deg]" />
          {/* right */}
          <div className="rotate-[290deg]" />
        </div>
      </FocusMarker>
    </button>
  );
}
