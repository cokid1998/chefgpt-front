import API from "@/hooks/API/API";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupAPIURL } from "@/constants/APIUrl";
import type { Profile } from "@/types/userType";
import { useNavigate } from "react-router";
import { useSetAuth } from "@/store/authStore";
import { QUERY_KEYS } from "@/constants/QueryKeys";

interface PostSignupReq {
  email: string;
  password: string;
}

interface PostSignupRes {
  profile: Profile;
  accessToken: string;
}

const postSignup = (payload: PostSignupReq) => {
  return API.post<PostSignupRes>(signupAPIURL, payload);
};

const usePostSignup = () => {
  const setAuth = useSetAuth();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: (payload: PostSignupReq) => postSignup(payload),
    onSuccess: (res) => {
      const profile = res.data.profile;
      nav("/");
      setAuth(res.data);
    },
  });
};

export default usePostSignup;
