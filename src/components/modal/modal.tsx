import { useCloseModal, useIsModal, useModalContent } from "@/store/modalStore";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useEffect, useRef } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

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

  // 모달이 열렸을 때 esc를 들으면 모달이 닫히도록
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // overlay영역을 클릭하면 모달이 닫히도록
  useEffect(() => {
    const handleClickOverlay = (e: MouseEvent) => {
      // Select Portal 영역 클릭 시 무시
      const target = e.target as Node;

      // data-radix-popper-content-wrapper는 Shadcn Select Portal의 wrapper
      const isInsidePortal = document
        .querySelector("[data-radix-popper-content-wrapper]")
        ?.contains(target);

      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        !isInsidePortal
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOverlay);
    return () => document.removeEventListener("mousedown", handleClickOverlay);
  }, []);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          // onClick={() => closeModal()}
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
            ref={modalRef}
          >
            {ModalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
