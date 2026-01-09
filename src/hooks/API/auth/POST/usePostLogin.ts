import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { loginUrl } from "@/constants/APIUrl";
import { useSetAuth } from "@/store/authStore";
import { useNavigate } from "react-router";
import type { Profile } from "@/types/userType";
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
  const nav = useNavigate();

  return useMutation({
    mutationFn: (payload: PostLoginReq) => postLogin(payload),
    onSuccess: (res) => {
      setAuth(res.data);
      nav(-1);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message); // Todo: 에러타입정의
    },
  });
};

export default usePostLogin;
