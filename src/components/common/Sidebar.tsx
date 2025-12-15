import {
  ChefHat,
  House,
  Plus,
  Users,
  BookOpen,
  Refrigerator,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import {
  HOME,
  RECIPE,
  REFRIGERATOR,
  COMMUNITY,
  INFO,
  LOGIN_URL,
} from "@/constants/Url";
import { useIsLogged, useProfile, useDelAuth } from "@/store/authStore";
import usePostLogout from "@/hooks/API/auth/POST/usePostLogout";
import { useState } from "react";
import useGetProfile from "@/hooks/API/user/GET/useGetProfile";

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
  const { pathname } = useLocation();
  const [curMenu, setCurMenu] = useState(pathname);

  const isLogged = useIsLogged();
  const profile = useProfile();
  const userId = profile?.id;
  const delAuth = useDelAuth();

  const { mutate: logOut } = usePostLogout();
  // const { data } = useGetProfile(); Todo: useGetProfile함수를 어디서 써야하는거지?

  const handleLogout = () => {
    if (!userId) return;

    // 1. 로컬스토리지 데이터 삭제, zustand에서 데이터삭제
    // 2. 쿠키에 refreshToken삭제
    delAuth();
    logOut();
  };

  return (
    <aside className="fixed z-10 flex max-h-screen min-h-screen w-(--sidebar-width) flex-col border-r bg-white">
      <div className="flex items-center gap-3 border-b p-6">
        <Link
          to={HOME}
          className="flex w-full items-center gap-3 transition-transform hover:scale-105"
          // Todo: curMenu리렌더링 트리거를 onClick이 아니라 useEffect로 url path로 하는게 나을려나?
          onClick={() => setCurMenu("/")}
        >
          <div className="bg-green-gradient flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg">
            <ChefHat color="white" size={28} />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold text-gray-900">ChefGPT</div>
            <div className="text-xs text-gray-500">AI 단계별 요리 가이드</div>
          </div>
        </Link>
      </div>

      <div className="flex-1 p-2">
        <ul>
          {MENU.map((menu) => (
            <li
              key={menu.link}
              className={`rounded-md text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-600 ${curMenu === menu.link ? "bg-linear-to-r from-green-400 to-emerald-500 text-white [&_a]:hover:text-black" : "text-gray-700"} `}
              onClick={() => setCurMenu(menu.link)}
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

      <div
        className={`border-t ${isLogged ? "h-[121px] p-4" : "flex h-fit items-center"}`}
      >
        {isLogged ? (
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
        ) : null}

        <button
          onClick={isLogged ? handleLogout : () => {}}
          className={`mt-3 flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-green-50 hover:text-green-600 ${isLogged ? "" : "m-4"}`}
        >
          {isLogged ? (
            <>
              <LogOut size={16} />
              로그아웃
            </>
          ) : (
            <Link
              to={LOGIN_URL}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-md text-sm text-gray-600 transition-colors duration-200 hover:bg-green-50 hover:text-green-600 ${isLogged ? "" : ""}`}
            >
              <LogIn size={16} />
              로그인
            </Link>
          )}
        </button>
      </div>
    </aside>
  );
}
