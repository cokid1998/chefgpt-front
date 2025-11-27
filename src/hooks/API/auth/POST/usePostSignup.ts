import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { signupAPIURL } from "@/constants/APIUrl";

interface PostSignupReq {
  email: string;
  password: string;
}

const postSignup = (payload: PostSignupReq) => {
  return API.post(signupAPIURL, payload);
};

const usePostSignup = () => {
  return useMutation({
    mutationFn: (payload: PostSignupReq) => postSignup(payload),
  });
};

export default usePostSignup;
