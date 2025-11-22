import type { ReactNode } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";

interface ModalStore {
  isOpen: boolean;
  ModalContent: ReactNode | null;
}

const init: ModalStore = {
  isOpen: false,
  ModalContent: null,
};

const modalStore = create(
  combine(init, (set, get) => {
    return {
      actions: {
        openModal: (ModalContent: ReactNode) => {
          set({ isOpen: true, ModalContent });
        },
        closeModal: () => {
          set({ isOpen: false });
        },
      },
    };
  })
);

export const useIsModal = () => {
  return modalStore((store) => store.isOpen);
};

export const useModalContent = () => {
  return modalStore((store) => store.ModalContent);
};

export const useOpenModal = () => {
  return modalStore((store) => store.actions.openModal);
};

export const useCloseModal = () => {
  return modalStore((store) => store.actions.closeModal);
};
