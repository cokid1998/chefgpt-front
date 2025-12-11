import Modal from "@/components/modal/modal";
import { useIsModal } from "@/store/modalStore";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  const isModalOpen = useIsModal();
  return (
    <>
      {isModalOpen && createPortal(<Modal />, document.body)}
      {children}
    </>
  );
}
