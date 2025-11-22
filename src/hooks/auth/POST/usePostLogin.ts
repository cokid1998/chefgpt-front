import API from "@/hooks/API";
import { useMutation } from "@tanstack/react-query";
import { loginUrl } from "@/constants/APIUrl";

interface PostLoginReq {
  email: string;
  password: string;
}

const postLogin = (payload: PostLoginReq) => {
  return API.post(`${import.meta.env.VITE_API_URL}${loginUrl}`, payload);
};

const usePostLogin = () => {
  return useMutation({
    mutationFn: (payload: PostLoginReq) => postLogin(payload),
  });
};

export default usePostLogin;
