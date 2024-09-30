'use client';

import React from 'react';
import { create } from 'zustand';

interface DialogState {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  setDialog: (dialogState: Partial<DialogState>) => void;
}

const useDialog = create<DialogState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  title: '',
  description: null,
  children: null,
  setDialog: (dialogState) => set((state) => ({ ...state, ...dialogState })),
}));

export default useDialog;
