import { create } from 'zustand';

// const TOAST_MESSAGE_MARGIN = 8;
export const TOAST_MESSAGE_DURATION = 5000;
export const TOAST_MESSAGE_ANIMATION_DURATION = 300;

export interface ToastMessageType {
  key: number;
  content: string | React.ReactNode;
}

interface ToastMessageStore {
  messages: ToastMessageType[];
  create: (content: string | React.ReactNode) => void;
  delete: (key: number) => void;
}
const useToastMessageStore = create<ToastMessageStore>((set) => ({
  messages: [],
  create: (content: string | React.ReactNode) => {
    const timestamp = new Date().getTime();

    const message: ToastMessageType = {
      key: timestamp,
      content,
    };

    // 메세지 추가
    set((state) => ({
      messages: [message, ...state.messages.filter((m: ToastMessageType) => m.key !== message.key)],
    }));

    // 시간 경과 후 메시지 삭제
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.filter((m: ToastMessageType) => m.key !== message.key),
      }));
    }, TOAST_MESSAGE_DURATION + TOAST_MESSAGE_ANIMATION_DURATION);
  },
  delete: (key: number) => {
    set((state) => ({
      messages: state.messages.filter((m: ToastMessageType) => m.key !== key),
    }));
  },
}));
export default useToastMessageStore;
