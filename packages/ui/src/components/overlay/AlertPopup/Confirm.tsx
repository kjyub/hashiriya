import { useEffect, useRef } from 'react';
import { Button, ButtonPrimary } from 'src/components/inputs';
import { Modal } from '../Modal';
import { SystemMessage } from './store';

export default function Confirm({
  message,
  onConfirm,
  onCancel,
}: {
  message: SystemMessage;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, []);

  return (
    <Modal closeButton={false} title={message.title ?? '확인'}>
      <div className="w-full text-white">{message.content}</div>
      <div className="grid grid-cols-2 gap-2">
        <Button ref={cancelButtonRef} onClick={onCancel} className="w-32">
          취소
        </Button>
        <ButtonPrimary ref={confirmButtonRef} onClick={onConfirm} className="w-32">
          확인
        </ButtonPrimary>
      </div>
    </Modal>
  );
}
