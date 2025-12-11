import Modal from "@/components/modal/modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(<Modal />, document.body)}
      {children}
    </>
  );
}
