import { UPDATE_USER_INFO } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useMutation } from "@tanstack/react-query";

interface UserInfoPatchReq {
  nickname?: string;
  thumbnail?: File | null;
}

const usePatchUserInfo = () => {
  return useMutation({
    mutationFn: (payload: UserInfoPatchReq) =>
      API.patch(UPDATE_USER_INFO, payload),
  });
};

export default usePatchUserInfo;
