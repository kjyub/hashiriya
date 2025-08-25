import { createPortal } from 'react-dom';
import { ToastMessage } from './Message';
import useToastMessageStore, { type ToastMessageType } from './store';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
};

export const ToastContainer = () => {
  const messages = useToastMessageStore((state) => state.messages);

  return (
    <Layout>
      <div className="fixed top-14 left-0 z-100 flex justify-center w-full pt-3 pointer-events-none">
        <div className="relative flex flex-col items-center max-w-[70vw] w-full duration-300">
          {messages.map((message: ToastMessageType) => (
            <ToastMessage key={message.key} message={message} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
