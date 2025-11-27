import Logo from "@/assets/Logo.png";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="flex w-full max-w-md flex-col items-center rounded-xl bg-white p-8 shadow-2xl">
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

        <div className="mt-4 flex w-full flex-col space-y-1.5 text-center text-slate-700">
          <label htmlFor="password">Confirm Password</label>
          <div className="relative">
            <Input
              onChange={(e) => setCheckPassword(e.target.value)}
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
          onClick={() => console.log({ email, password, checkPassword })}
          className="mt-4 h-11 w-full"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
