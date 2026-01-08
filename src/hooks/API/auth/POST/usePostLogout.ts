import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";
import { logoutUrl } from "@/constants/APIUrl";
import { useDelAuth } from "@/store/authStore";

const usePostLogout = () => {
  const delAuth = useDelAuth();

  return useMutation({
    mutationFn: () => API.post(logoutUrl),
    onSuccess: () => {
      delAuth();
    },
  });
};

export default usePostLogout;
