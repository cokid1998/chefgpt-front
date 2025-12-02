import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { loginUrl } from "@/constants/APIUrl";
import { useSetAuth } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { Profile } from "@/types/user";
import { QUERY_KEYS } from "@/constants/QueryKeys";

interface PostLoginReq {
  email: string;
  password: string;
}

interface PostLoginRes {
  accessToken: string;
  profile: Profile;
}

const postLogin = (payload: PostLoginReq) => {
  return API.post<PostLoginRes>(
    `${import.meta.env.VITE_API_URL}${loginUrl}`,
    payload,
  );
};

const usePostLogin = () => {
  const setAuth = useSetAuth();
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation({
    mutationFn: (payload: PostLoginReq) => postLogin(payload),
    onSuccess: (res) => {
      setAuth(res.data);
      nav("/");
      // profile key로 유저정보 캐싱
      queryClient.setQueryData(QUERY_KEYS.profile, res.data);
    },
  });
};

export default usePostLogin;
