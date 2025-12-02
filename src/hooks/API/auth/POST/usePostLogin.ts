import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUrl } from "@/constants/APIUrl";
import { useSetAuth } from "@/store/authStore";
import { useNavigate } from "react-router";
import type { Profile } from "@/types/user";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { toast } from "sonner";

interface PostLoginReq {
  email: string;
  password: string;
}

interface PostLoginRes {
  accessToken: string;
  profile: Profile;
}

const postLogin = (payload: PostLoginReq) => {
  return API.post<PostLoginRes>(loginUrl, payload);
};

const usePostLogin = () => {
  const setAuth = useSetAuth();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: (payload: PostLoginReq) => postLogin(payload),
    onSuccess: (res) => {
      const profile = res.data.profile;
      setAuth(res.data);
      nav("/");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message); // Todo: 에러타입정의
    },
  });
};

export default usePostLogin;
