import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

// 로컬스토리지에는 accessToken만 넣음
// 굳이 zustand와 persist를 이용해서 로컬스토리지를 사용하는 이유는
// localStorage API만을 쓰면 리렌더링 트리거를 하지않기 때문

type Auth = {
  accessToken: string | null;
};

const initState = {
  accessToken: null,
} as Auth;

const useAuthStore = create(
  persist(
    combine(initState, (set) => ({
      actions: {
        setAuth: (accessToken: string) => {
          set({ accessToken });
        },
        delAuth: () => {
          set({ accessToken: null });
        },
      },
    })),
    {
      name: "auth",
    },
  ),
);

export const useSetAuth = () => {
  return useAuthStore((store) => store.actions.setAuth);
};
