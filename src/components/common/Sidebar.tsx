import {
  ChefHat,
  House,
  Plus,
  Users,
  BookOpen,
  Refrigerator,
  User,
  LogOut,
} from "lucide-react";
import { Link } from "react-router";
import { HOME, RECIPE, REFRIGERATOR, COMMUNITY, INFO } from "@/constants/Url";
import useGetProfile from "@/hooks/API/user/GET/useGetProfile";
import { useIsLogged, useProfile } from "@/store/authStore";
import { useQueryClient } from "@tanstack/react-query";

const MENU = [
  {
    title: "홈",
    link: HOME,
    icon: <House size={16} />,
  },
  {
    title: "레시피 생성",
    link: RECIPE,
    icon: <Plus size={16} />,
  },
  {
    title: "내 냉장고",
    link: REFRIGERATOR,
    icon: <Refrigerator size={16} />,
  },
  {
    title: "커뮤니티",
    link: COMMUNITY,
    icon: <Users size={16} />,
  },
  {
    title: "요리 정보",
    link: INFO,
    icon: <BookOpen size={16} />,
  },
];

export default function Sidebar() {
  const isLogged = useIsLogged();


  return (
    <aside className="fixed z-10 flex max-h-screen min-h-screen w-(--sidebar-width) flex-col border-r bg-white">
      <div className="flex items-center gap-3 border-b p-6">
        <Link
          to={HOME}
          className="bg-green-gradient flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg transition-transform hover:scale-105"
        >
          <ChefHat color="white" size={28} />
        </Link>
        <div className="flex flex-col">
          <div className="text-xl font-bold text-gray-900">ChefGPT</div>
          <div className="text-xs text-gray-500">AI 단계별 요리 가이드</div>
        </div>
      </div>

      <div className="flex-1 p-2">
        <ul>
          {MENU.map((menu) => (
            <li
              key={menu.link}
              className="rounded-md text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
            >
              <Link
                to={menu.link}
                className="flex w-full items-center gap-2 px-4 py-3"
              >
                {menu.icon}
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-[121px] border-t p-4">
        <div className="flex items-center gap-3">
          <User
            className="bg-green-gradient rounded-full bg-slate-300 p-2"
            size={40}
            color="white"
          />
          <div>
            <div className="truncate text-sm font-medium text-gray-900">
              {profile?.name}
            </div>
            <div className="truncate text-xs text-gray-500">
              {profile?.email}
            </div>
          </div>
        </div>

        <button className="mt-3 flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
          <LogOut size={16} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
