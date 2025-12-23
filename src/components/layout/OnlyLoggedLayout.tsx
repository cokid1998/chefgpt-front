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
      // Todo: nav(-1)을 사용하게 되면 full page reload가 되는데 이유를 찾아야함.
      // 일단 차선책으로 무조건 index경로로 리다이렉트하도록 구현
      // nav(-1);
      nav(HOME, { replace: true });
    }
  }, [isLogged, openModal, nav]);

  return isLogged ? <Outlet /> : null;
}

/**
 * 1. 로그인하지않으면 로그인이 필요하다고 모달이 뜸
 * 2. 페이지 이동이 안돼야함
 * 3. 원래 가려고 했던 페이지를 기억해야함
 * 4. 모달에서 로그인하기를 누르면 로그인페이지로 감
 * 5. 인증이 완료되면 원래 가려고 했던 페이지로 가야함
 *
 * Case 1: Sidebar에서 클릭해서 페이지가 전환
 * Case 2: 주소창에 직접 주소를 입력할 때
 *
 * 로그인한 상태에서 /refrigerator에서 로그아웃하면 '/'로 이동은 잘 되지만 모달이 나옴
 */
