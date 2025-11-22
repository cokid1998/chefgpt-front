import Logo from "@/assets/Logo.png";
import Google from "@/assets/svg/Google.svg";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useState } from "react";
import usePostLogin from "@/hooks/auth/POST/usePostLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginWithPassword } = usePostLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="flex w-full max-w-md flex-col items-center rounded-xl bg-white p-8 shadow-2xl">
        <img
          src={Logo}
          className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24"
        />

        <div className="mt-4 text-3xl font-bold">Welcome to ChefGPT</div>

        <div className="mt-3 text-sm font-medium text-slate-500">
          로그인을 해주세요!
        </div>

        <button className="mt-5 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-200 px-5 py-3.5 text-[16px] font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm">
          <Google className="size-6" />
          구글 로그인
        </button>

        <div className="relative my-6 w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full shrink-0 bg-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 font-medium tracking-wider text-slate-400">
              or
            </span>
          </div>
        </div>

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
              placeholder="••••••••"
              id="password"
              required
            />
            <Lock
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
              size={16}
            />
          </div>
        </div>

        <Button
          onClick={() => loginWithPassword({ email, password })}
          className="mt-4 h-11 w-full"
        >
          로그인
        </Button>

        <Link
          to="/"
          className="my-3 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
        >
          회원가입
        </Link>
        <Link
          className="text-sm text-slate-500 transition-colors hover:text-slate-700"
          to="/"
        >
          비밀번호를 잊어버리셨나요?
        </Link>
      </div>
    </div>
  );
}
