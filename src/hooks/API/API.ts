import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  /**
   * const accessToken = useAuthStore((store) => store.accessToken);
   * 위 방식은 작동하지 않음 React컴포넌트나 custom hook안에서 호출해야하는 방식이기 때문
   * zustand는 hook방식과 non-hook 두 가지 접근 방법을 제공함 아래가 non-hook 방식으로 접근하는 방법
   */
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default API;
