import { LOGIN_URL } from "@/constants/Url";
import { useIsLogged } from "@/store/authStore";
import { Navigate, Outlet } from "react-router";

export default function OnlyLoggedLayout() {
  const isLogged = useIsLogged();
  if (!isLogged) return <Navigate to={LOGIN_URL} />;
  return <Outlet />;
}
