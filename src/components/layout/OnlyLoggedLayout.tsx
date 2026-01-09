import LoggedModal from "@/components/modal/auth/LoggedModal";
import { loginUrl } from "@/constants/APIUrl";
import { LOGIN_URL } from "@/constants/Url";
import { useIsLogged } from "@/store/authStore";
import { useOpenModal } from "@/store/modalStore";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { HOME } from "@/constants/Url";

export default function OnlyLoggedLayout() {
  const isLogged = useIsLogged();
  const openModal = useOpenModal();
  const nav = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      openModal(<LoggedModal />);
      nav(-1);
    }
  }, [isLogged, openModal, nav]);

  return isLogged ? <Outlet /> : null;
}
