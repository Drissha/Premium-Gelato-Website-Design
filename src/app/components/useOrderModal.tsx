// hooks/useOrderModal.ts

import { create } from "zustand";

interface OrderModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useOrderModal = create<OrderModalStore>(
  (set) => ({
    isOpen: false,

    openModal: () =>
      set({
        isOpen: true,
      }),

    closeModal: () =>
      set({
        isOpen: false,
      }),
  })
);