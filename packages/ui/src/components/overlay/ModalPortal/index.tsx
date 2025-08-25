import { createContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from 'src/utils';
import useToastMessageStore, { TOAST_MESSAGE_DURATION } from '../ToastMessage/store';

export const ModalPortalContext = createContext<{
  close: () => void;
}>({
  close: () => {},
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
};

const Wrapper = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRender(true);
    } else {
      setTimeout(() => {
        setIsRender(false);
      }, 200);
    }
  }, [isOpen]);

  return (
    <div className="relative flex flex-center">
      <div
        className={cn([
          'z-10 transition-all duration-200 will-change-transform [&>div]:backdrop-blur-none',
          { 'opacity-0 -translate-y-2': !isOpen },
          { 'opacity-100 translate-y-0': isOpen },
        ])}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {isRender && children}
      </div>
      {isOpen && <div className="absolute z-0 w-[100%] h-[100%] backdrop-blur-xl rounded-xl"></div>}
    </div>
  );
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEscClose?: boolean;
  isDirectClose?: boolean;
  zIndex?: number;
  children: React.ReactNode;
}
export default function ModalContainer({
  isOpen,
  onClose,
  isEscClose = true,
  isDirectClose = true,
  zIndex = 60,
  children,
}: Props) {
  const isCloseTryRef = useRef<boolean>(false);
  const isCloseTryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const createToastMessage = useToastMessageStore((state) => state.create);

  useEffect(() => {
    if (isEscClose && isDirectClose) {
      const handleEscClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      if (isOpen) {
        window.addEventListener('keydown', handleEscClose);
      } else {
        window.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isOpen, isEscClose, isDirectClose]);

  const handleClose = () => {
    if (isDirectClose) {
      onClose();
      return;
    }

    if (isCloseTryRef.current && isCloseTryTimerRef.current) {
      isCloseTryRef.current = false;
      clearTimeout(isCloseTryTimerRef.current);
      isCloseTryTimerRef.current = null;
      onClose();
      return;
    }

    createToastMessage('닫을려면 한번 더 눌러주세요.');
    isCloseTryRef.current = true;
    isCloseTryTimerRef.current = setTimeout(() => {
      isCloseTryRef.current = false;
      isCloseTryTimerRef.current = null;
      onClose();
    }, TOAST_MESSAGE_DURATION);
  };

  return (
    <ModalPortalContext.Provider
      value={{
        close: onClose,
      }}
    >
      <Layout>
        <div
          className={cn(['fixed inset-0 flex flex-center w-screen h-dvh', { 'pointer-events-none': !isOpen }])}
          style={{ zIndex }}
        >
          <div
            onClick={() => handleClose()}
            className={cn([
              'absolute inset-0 z-0',
              'flex flex-center bg-black/20 w-screen h-dvh',
              { 'opacity-0': !isOpen },
              'transition-all duration-200',
            ])}
          />
          <Wrapper isOpen={isOpen}>{children}</Wrapper>
        </div>
      </Layout>
    </ModalPortalContext.Provider>
  );
}
