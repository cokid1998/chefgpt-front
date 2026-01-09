import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { logoutUrl } from "@/constants/APIUrl";
import { useDelAuth } from "@/store/authStore";
import { useNavigate } from "react-router";
import { HOME } from "@/constants/Url";

const usePostLogout = () => {
  const delAuth = useDelAuth();
  const nav = useNavigate();

  return useMutation({
    mutationFn: () => API.post(logoutUrl),
    onSuccess: () => {
      // 사용자가 의도한 로그아웃을 식별하기 위해 fromLogout이라는 값을 location에 넣음
      nav(HOME, { replace: true, state: { fromLogout: true } });

      // Todo: race condition을 해결하기 위한 임시방편 setTimeout추후 리팩토링 필수
      setTimeout(() => {
        delAuth();
      }, 100);
    },
  });
};

export default usePostLogout;
