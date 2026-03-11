import useRequireLoginModal from "@/hooks/useRequireLoginModal";
import { useIsLogged } from "@/store/authStore";
import { Outlet } from "react-router";

export default function OnlyLoggedLayout() {
  const isLogged = useIsLogged();
  useRequireLoginModal();

  return isLogged ? <Outlet /> : null;
}
