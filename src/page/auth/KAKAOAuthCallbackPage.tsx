import { KAKAO_API_URL } from "@/constants/APIUrl";
import API from "@/hooks/API/API";
import { useSetAuth } from "@/store/authStore";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

interface TempRes {
  profile: {
    email: string;
    nickname: string;
    thumbnail: string;
  };
  accessToken: string;
}

export default function KAKAOAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const setAuth = useSetAuth();
  useEffect(() => {
    const fetchKAKAOLogin = async () => {
      const res = await API.post<TempRes>(KAKAO_API_URL, {
        code,
      });

      // Todo: 로그인 정보 가져오고 후처리
      console.log(res.data);
      // setAuth(res.data)
    };

    fetchKAKAOLogin();
  }, []);

  return <div>카카오 로그인 처리중</div>;
}
