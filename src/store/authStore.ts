import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import type { Profile } from "@/types/userType";

// 굳이 zustand와 persist를 이용해서 로컬스토리지를 사용하는 이유는
// localStorage API만을 쓰면 리렌더링 트리거를 하지않기 때문

// 로컬스토리지에 저장되는 데이터는
// 1. accessToken
// 2. 유저정보
// 3. 로그인 여부

type Auth = {
  accessToken: string | null;
  profile: Profile | null;
  isLogged: boolean;
};

export interface SetAuthParameter {
  accessToken: string;
  profile: Profile;
}

const initState = {
  accessToken: null,
  profile: null,
  isLogged: false,
} as Auth;

export const useAuthStore = create(
  persist(
    combine(initState, (set) => ({
      actions: {
        setAuth: ({ accessToken, profile }: SetAuthParameter) => {
          set({ accessToken, profile, isLogged: true });
        },
        delAuth: () => {
          set({ accessToken: null, profile: null, isLogged: false });
          localStorage.removeItem("auth");
        },
      },
    })),
    {
      name: "auth",
      partialize: (store) => ({
        accessToken: store.accessToken,
        profile: store.profile,
        isLogged: store.isLogged,
      }),
    },
  ),
);

export const useSetAuth = () => {
  return useAuthStore((store) => store.actions.setAuth);
};

export const useDelAuth = () => {
  return useAuthStore((store) => store.actions.delAuth);
};

export const useIsLogged = () => {
  return useAuthStore((store) => store.isLogged);
};

export const useProfile = () => {
  return useAuthStore((store) => store.profile);
};
