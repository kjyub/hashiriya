import { useEffect, useRef } from 'react';
import { ButtonPrimary } from '../../inputs';
import { Modal } from '../Modal';
import type { SystemMessage } from './store';

export default function Alert({ message, onConfirm }: { message: SystemMessage; onConfirm: () => void }) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, []);

  return (
    <Modal closeButton={false} title={message.title ?? '알림'}>
      <div className="w-full text-white">{message.content}</div>
      <div className="flex justify-center">
        <ButtonPrimary ref={confirmButtonRef} onClick={onConfirm}>
          확인
        </ButtonPrimary>
      </div>
    </Modal>
  );
}
