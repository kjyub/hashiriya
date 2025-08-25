import { useEffect, useState } from 'react';

import { cn } from 'src/utils';

import useToastMessageStore, {
  TOAST_MESSAGE_ANIMATION_DURATION,
  TOAST_MESSAGE_DURATION,
  type ToastMessageType,
} from './store';

export const ToastMessage = ({ message }: { message: ToastMessageType }) => {
  const deleteMessage = useToastMessageStore((state) => state.delete);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isHide, setIsHide] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true);
    }, 50);
    setTimeout(() => {
      setIsHide(true);
    }, TOAST_MESSAGE_DURATION);
    setTimeout(() => {
      deleteMessage(message.key);
    }, TOAST_MESSAGE_DURATION + TOAST_MESSAGE_ANIMATION_DURATION);
  }, []);

  const handleClose = () => {
    setIsHide(true);
    setTimeout(() => {
      deleteMessage(message.key);
    }, TOAST_MESSAGE_ANIMATION_DURATION);
  };

  return (
    <div
      className={cn([
        'will-change-transform pointer-events-auto',
        { '-translate-y-10 opacity-0': !isShow },
        { 'translate-y-0 opacity-100 mb-2': isShow },
        { 'opacity-100': !isHide },
        { 'opacity-0 translate-x-36': isHide },
      ])}
      style={{ maxHeight: isShow ? '36px' : '0', transitionDuration: `${TOAST_MESSAGE_ANIMATION_DURATION}ms` }} // tailwind 변수 테스트
    >
      <div
        className={cn([
          'relative flex flex-center min-w-48 h-8',
          'bg-gradient-to-r from-slate-700/70 to-slate-400/30 backdrop-blur-sm',
          'text-slate-200/80',
        ])}
      >
        <div className="flex-1 pl-3 pr-15">{message.content}</div>
        <button
          className="absolute top-0 right-0 flex flex-center w-14 h-full [&>div]:bg-slate-500/50 [&>div]:text-slate-700 hover:[&>div]:bg-slate-500/70 transition-colors"
          onClick={handleClose}
          type="button"
        >
          <div className="aspect-square h-full [clip-path:polygon(100%_0,40%_100%,100%_100%)]" />
          <div className="flex flex-center size-full"></div>
          <i className="absolute right-2 fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
};
