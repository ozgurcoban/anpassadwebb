import { ReactNode } from 'react';

import { create } from 'zustand';

type ModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode | null;
  setDialog: (props: Partial<Omit<ModalProps, 'setDialog'>>) => void;
};

const useDialog = create<ModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => {
    set((state) => ({ ...state, isOpen: false }));
  },
  title: '',
  description: '',
  children: null,
  setDialog: (props) => {
    set((state) => ({ ...state, ...props }));
  },
}));

export default useDialog;
