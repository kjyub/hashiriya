import { useEffect } from 'react';
import ModalContainer from '../ModalPortal';
import Alert from './Alert';
import Confirm from './Confirm';
import useAlertPopupStore, { type SystemMessage } from './store';

const AlertPopupContainer = () => {
  const messages = useAlertPopupStore((state) => state.messages);
  const deleteMessage = useAlertPopupStore((state) => state.delete);

  const handleClose = () => {
    if (messages.length === 0) return;
    deleteMessage(messages[0].key);
  };

  return (
    <ModalContainer isOpen={messages.length > 0} onClose={handleClose} zIndex={70}>
      {messages.length > 0 && (
        <div className="z-20">
          <Container message={messages[0]} />
        </div>
      )}
      {messages.slice(1, 3).map((message, index) => (
        <div
          key={message.key}
          className="absolute translate-y-[-100%]"
          style={{
            zIndex: 0 - (index + 1),
            transform: `translateX(${(index + 1) * 10}px) translateY(${(index + 1) * -10}px)`,
          }}
        >
          <Container message={message} />
        </div>
      ))}
    </ModalContainer>
  );
};
export default AlertPopupContainer;

const Container = ({ message }: { message: SystemMessage }) => {
  const deleteMessage = useAlertPopupStore((state) => state.delete);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const handleConfirm = () => {
    message.onConfirm?.();
    message.resolve(true);
    deleteMessage(message.key);
  };
  const handleCancel = () => {
    if (message.type === 'alert') return;

    message.onCancel?.();
    message.resolve(false);
    deleteMessage(message.key);
  };

  if (message.type === 'alert') {
    return <Alert message={message} onConfirm={handleConfirm} />;
  } else if (message.type === 'confirm') {
    return <Confirm message={message} onConfirm={handleConfirm} onCancel={handleCancel} />;
  } else {
    return null;
  }
};
