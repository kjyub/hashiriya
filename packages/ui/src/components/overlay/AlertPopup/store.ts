import { create } from 'zustand';

export interface SystemMessageRequest {
  type: 'alert' | 'confirm';
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  content: string | React.ReactNode;
}

export interface SystemMessage extends SystemMessageRequest {
  key: number;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

interface ISystemMessageStore {
  messages: SystemMessage[];
  message: SystemMessage | null;
  create: (data: SystemMessageRequest) => Promise<boolean>;
  delete: (key: number) => void;
}
const useAlertPopupStore = create<ISystemMessageStore>((set) => ({
  messages: [],
  message: null,
  create: async (data: SystemMessageRequest) =>
    new Promise<boolean>((resolve) => {
      const timestamp = new Date().getTime();

      const message: SystemMessage = {
        key: timestamp,
        resolve,
        ...data,
      };

      set((state) => ({
        messages: [...state.messages.filter((m) => m.key !== message.key), message],
      }));

      return new Promise<boolean>(() => message.resolve);
    }),
  delete: (key: number) => {
    set((state) => ({
      messages: state.messages.filter((m) => m.key !== key),
    }));
  },
}));

export default useAlertPopupStore;
