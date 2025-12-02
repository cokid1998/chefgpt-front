import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { loginUrl } from "@/constants/APIUrl";
import { useSetAuth } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface PostLoginReq {
  email: string;
  password: string;
}

interface PostLoginRes {
  accessToken: string;
  user: {
    // Todo: 타입분리
    id: number;
    createdAt: Date;
    email: string;
    name: string;
    password: string;
    thumbnail: string;
  };
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
      const { accessToken, user: profile } = res.data;
      setAuth(accessToken);
      queryClient.setQueryData(["profile"], profile);
      nav("/");
    },
  });
};

export default usePostLogin;
