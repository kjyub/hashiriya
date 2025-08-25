import { cva } from 'class-variance-authority';
import { useRef, type ButtonHTMLAttributes, type ReactNode, type RefObject } from 'react';

import { cn } from '../../../utils';
import FocusMarker from '../FocusMarker';
import useFocusMarker from '../FocusMarker/useFocusMarker';
import './style.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'transparent';
  focusMarker?: boolean;
  ref?: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
}

const variants = cva(
  [
    'relative flex flex-center w-32 h-10',
    'text-shadow-lg text-shadow-black font-light text-white disabled:text-white/50',
    'bg-gray-700/40',
    '[&_.ds-button-gradient]:translate-x-0 hover:[&_.ds-button-gradient]:translate-x-[42%] active:[&_.ds-button-gradient]:translate-x-[44%]',
  ],
  {
    variants: {
      variant: {
        default: '',
        transparent: 'bg-transparent [&_.ds-button-gradient]:duration-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function Button({
  children,
  className,
  variant = 'default',
  focusMarker = true,
  ref: externalRef,
  ...props
}: ButtonProps) {
  const ref = externalRef ?? useRef<HTMLButtonElement>(null);
  const isFocus = useFocusMarker<HTMLButtonElement>(ref);

  return (
    <button ref={externalRef} {...props} className={cn(variants({ variant }), 'input-container', className)}>
      <FocusMarker isFocus={isFocus && focusMarker}>
        <div className="absolute z-10 flex flex-center size-full text-shadow-lg text-shadow-black/20">{children}</div>

        {/* 스타일 효과 */}
        <div className="absolute z-0 right-0 top-0 w-[200%] h-full ds-button-gradient transition-transform pointer-events-none" />
      </FocusMarker>
    </button>
  );
}
