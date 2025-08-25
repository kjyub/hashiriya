import { cn } from '../../../utils';

type Color = 'blue' | 'yellow';

export default function FocusMarker({
  isFocus,
  color = 'blue',
  children,
}: {
  isFocus: boolean;
  color?: Color;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-center size-full overflow-hidden">
      {children}
      <div
        className={cn([
          'absolute bottom-0 right-0 size-5 bg-gradient-to-tl to-50% pointer-events-none',
          '[clip-path:polygon(100%_0,0_100%,100%_100%)]',
          'transition-all duration-300',
          !isFocus && 'translate-x-4 translate-y-4',
          color === 'blue' && 'from-blue-500 to-blue-400/30',
          color === 'yellow' && 'from-yellow-500 to-yellow-400/30',
        ])}
      />
    </div>
  );
}
