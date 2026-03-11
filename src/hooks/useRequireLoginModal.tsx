import LoggedModal from "@/components/modal/auth/LoggedModal";
import { useIsLogged } from "@/store/authStore";
import { useOpenModal } from "@/store/modalStore";
import { useEffect } from "react";

const useRequireLoginModal = (deps: React.DependencyList = []) => {
  const isLogged = useIsLogged();
  const openModal = useOpenModal();

  useEffect(() => {
    if (!isLogged) {
      openModal(<LoggedModal />);
    }
  }, deps);
};

export default useRequireLoginModal;
