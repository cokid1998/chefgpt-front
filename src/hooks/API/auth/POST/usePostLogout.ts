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
      nav(HOME);
      delAuth();
    },
  });
};

export default usePostLogout;
