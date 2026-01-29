import { UPDATE_USER_INFO } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useUpdateProfile } from "@/store/authStore";
import { useCloseModal } from "@/store/modalStore";
import type { Profile } from "@/types/userType";
import { useMutation } from "@tanstack/react-query";

interface UserInfoPatchReq {
  nickname?: string;
  thumbnailImageFile?: File | null;
  password?: string;
}

const usePatchUserInfo = () => {
  const updateProfile = useUpdateProfile();
  const closeModal = useCloseModal();

  return useMutation({
    mutationFn: (payload: UserInfoPatchReq) => {
      const formData = new FormData();

      if (payload.nickname) {
        formData.append("nickname", payload.nickname);
      }

      if (payload.password) {
        formData.append("password", payload.password);
      }

      if (payload.thumbnailImageFile) {
        formData.append("thumbnailImageFile", payload.thumbnailImageFile);
      }

      return API.patch<Profile>(UPDATE_USER_INFO, formData);
    },

    onSuccess: (data) => {
      updateProfile(data.data);
      closeModal();
    },
  });
};

export default usePatchUserInfo;
