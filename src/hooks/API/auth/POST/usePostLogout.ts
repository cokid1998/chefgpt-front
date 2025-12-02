import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { logoutUrl } from "@/constants/APIUrl";

const postLogout = () => {
  return API.post(logoutUrl);
};

const usePostLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  });
};

export default usePostLogout;
