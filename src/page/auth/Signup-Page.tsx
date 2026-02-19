import Logo from "@/assets/Logo.png";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import usePostSignup from "@/hooks/API/auth/POST/usePostSignup";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { LOGIN_URL } from "@/constants/Url";
import { toast } from "sonner";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const { mutate: signUpWithEmail } = usePostSignup();

  const handleSignup = () => {
    if (!email || !password || !checkPassword) {
      toast.error("입력란을 모두 채워주세요");
      return;
    }
    if (password !== checkPassword) {
      toast.error("비밀번호를 확인해주세요");
      return;
    }

    signUpWithEmail({
      email,
      password,
    });
  };

  const onPressKeyDownLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <>
      <title>ChefGPT | 회원가입</title>
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
        <div className="flex w-full max-w-md flex-col items-center rounded-xl bg-white p-8 shadow-2xl">
          <Link
            to={LOGIN_URL}
            className="flex w-full items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
          >
            <ArrowLeft size={20} />
            로그인하기
          </Link>

          <img
            src={Logo}
            className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24"
          />
          <div className="mt-4 mb-5 text-3xl font-bold">ChefGPT 회원가입</div>
          <div className="flex w-full flex-col space-y-1.5 text-center text-slate-700">
            <label htmlFor="email">Email</label>
            <div className="relative">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="h-12 pl-10 placeholder:text-slate-400"
                placeholder="you@example.com"
                id="email"
                required
                onKeyDown={onPressKeyDownLogin}
              />
              <Mail
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col space-y-1.5 text-center text-slate-700">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="h-12 pl-10 placeholder:text-slate-400"
                placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"
                id="password"
                required
                onKeyDown={onPressKeyDownLogin}
              />
              <Lock
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col space-y-1.5 text-center text-slate-700">
            <label htmlFor="password">Confirm Password</label>
            <div className="relative">
              <Input
                onChange={(e) => setCheckPassword(e.target.value)}
                type="password"
                className="h-12 pl-10 placeholder:text-slate-400"
                placeholder="비밀번호 재입력"
                id="password"
                required
                onKeyDown={onPressKeyDownLogin}
              />
              <Lock
                className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                size={16}
              />
            </div>
          </div>
          <Button onClick={handleSignup} className="mt-4 h-11 w-full">
            회원가입
          </Button>
        </div>
      </div>
    </>
  );
}
