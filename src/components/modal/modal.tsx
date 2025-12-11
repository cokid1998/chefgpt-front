import { useCloseModal, useIsModal, useModalContent } from "@/store/modalStore";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useEffect } from "react";

const overlayAniVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const modalContentAniVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

export default function Modal() {
  const isModalOpen = useIsModal();
  const ModalContent = useModalContent();
  const closeModal = useCloseModal();

  /**
   * 모달이 열렸을 때 세로스크롤 때문에 일어나는 Layout Shift방지
   */
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          onClick={() => closeModal()}
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/80"
          variants={overlayAniVariants}
          initial={"hidden"}
          animate={"visible"}
          exit={"exit"}
        >
          <motion.div
            variants={modalContentAniVariants}
            initial={"hidden"}
            animate={"visible"}
            exit={"exit"}
            onClick={(e) => e.stopPropagation()}
          >
            {ModalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
