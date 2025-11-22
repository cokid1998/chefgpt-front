import { useModalContent } from "@/store/modalStore";

export default function Modal() {
  const ModalContent = useModalContent();

  return <>{ModalContent}</>;
}
