import { KAKAO_API_URL } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useSetAuth } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import type { SetAuthParameter } from "@/store/authStore";
import { HOME, LOGIN_URL } from "@/constants/Url";
import { toast } from "sonner";

export default function KAKAOAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const setAuth = useSetAuth();
  const nav = useNavigate();

  useEffect(() => {
    const fetchKAKAOLogin = async () => {
      try {
        const res = await API.post<SetAuthParameter>(KAKAO_API_URL, {
          code,
        });

        // localStorage에 accessToken, Profile 저장
        setAuth(res.data);
        // 홈으로 리다이렉트
        nav(HOME, { replace: true });
      } catch (error) {
        toast.error("로그인 실패, 다시 시도해 주세요");
        nav(LOGIN_URL, { replace: true });
      }
    };

    fetchKAKAOLogin();
  }, [code, setAuth, nav]);

  return <></>;
}
