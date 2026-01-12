import { LOGIN_URL } from "@/constants/Url";
import { useAuthStore } from "@/store/authStore";
import type { Profile } from "@/types/userType";
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

// refresh 요청을 캐싱할 변수
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    // refresh로직 성공시 유저 정보 zustand에 업로드시키는 함수
    const setAuth = useAuthStore.getState().actions.setAuth;
    // refresh로직 실패시 유저 정보 zustand에서 삭제 시키는 함수
    const delAuth = useAuthStore.getState().actions.delAuth;
    // 보내려했던 요청
    const originalReq = error.config;

    if (error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        if (isRefreshing && refreshPromise) {
          console.log("refresh가 이미 실행중");
          const newAccessToken = await refreshPromise;
          originalReq.headers.Authorization = `Bearer ${newAccessToken}`;
          return API.request(originalReq);
        }

        isRefreshing = true;
        refreshPromise = (async () => {
          const { data } = await API.post<{
            accessToken: string;
            profile: Profile;
          }>(`${import.meta.env.VITE_API_URL}/auth/refresh`);

          setAuth({
            accessToken: data.accessToken,
            profile: data.profile,
          });

          return data.accessToken;
        })();

        const newAccessToken = await refreshPromise;
        isRefreshing = false;
        refreshPromise = null;

        originalReq.headers.Authorization = `Bearer ${newAccessToken}`;

        return API.request(originalReq);
      } catch (error) {
        delAuth();
        window.location.href = LOGIN_URL;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
