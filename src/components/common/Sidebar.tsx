import {
  ChefHat,
  House,
  Plus,
  Users,
  BookOpen,
  Refrigerator,
  LogOut,
  LogIn,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  HOME,
  CREATE_RECIPE,
  REFRIGERATOR,
  VOTE,
  ARTICLE,
  LOGIN_URL,
  ARTICLE_CREATE_URL,
  MY_INFO,
} from "@/constants/Url";
import { useIsLogged, useProfile } from "@/store/authStore";
import usePostLogout from "@/hooks/API/auth/POST/usePostLogout";
import { useOpenModal } from "@/store/modalStore";
import LoggedModal from "@/components/modal/auth/LoggedModal";

const MENU = [
  {
    title: "홈",
    link: HOME,
    icon: <House size={16} />,
    auth: false,
  },
  {
    title: "레시피 생성",
    link: CREATE_RECIPE,
    icon: <Plus size={16} />,
    auth: false,
  },
  {
    title: "내 냉장고",
    link: REFRIGERATOR,
    icon: <Refrigerator size={16} />,
    auth: true,
  },
  {
    title: "투표",
    link: VOTE,
    icon: <Users size={16} />,
    auth: false,
  },
  {
    title: "요리 정보",
    link: ARTICLE,
    icon: <BookOpen size={16} />,
    auth: false,
    child: [
      {
        link: ARTICLE_CREATE_URL,
      },
    ],
  },
];

const isActiveMenu = (menu: (typeof MENU)[number], pathname: string) => {
  if (menu.link === pathname) return true;

  if (!menu.link) return false;

  return menu.child?.some((child) => child.link === pathname);
};

function DefaultThumbnail() {
  const profile = useProfile();

  return (
    <div className="bg-green-gradient flex size-10 items-center justify-center rounded-full text-white">
      {profile?.thumbnail || profile?.nickname.slice(0, 1)}
    </div>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const isLogged = useIsLogged();
  const profile = useProfile();
  const userId = profile?.id;
  const openModal = useOpenModal();
  const nav = useNavigate();

  const { mutate: logOut } = usePostLogout();

  const handleLogout = () => {
    if (!userId) return;

    logOut();
  };

  return (
    <aside className="fixed z-10 flex max-h-screen min-h-screen w-(--sidebar-width) flex-col border-r bg-white">
      <div className="flex items-center gap-3 border-b p-6">
        <Link
          to={HOME}
          className="flex w-full items-center gap-3 transition-transform hover:scale-105"
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
          {MENU.map((menu) => {
            const isActive = isActiveMenu(menu, pathname);

            return (
              <li
                key={menu.link}
                className={`rounded-md text-sm font-medium transition-all duration-200 hover:bg-green-50 hover:text-green-600 ${isActive ? "bg-linear-to-r from-green-400 to-emerald-500 text-white [&_a]:hover:text-black" : "text-gray-700"} `}
              >
                <Link
                  to={menu.link}
                  className="flex w-full items-center gap-2 px-4 py-3"
                  onClick={(e) => {
                    /**
                     * Todo: 현재 Sidebar의 메뉴를 눌렀을 때(지금 함수)와 주소창에 입력했을 때(OnlyLoggedLayout.tsx)를
                     * 분리해서 처리하고있는데 통합할수있는 방법은 없을까?
                     */
                    if (menu.auth && !isLogged) {
                      e.preventDefault(); // 페이지 이동 방지
                      openModal(<LoggedModal />);
                    }
                  }}
                >
                  {menu.icon}
                  {menu.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`border-t ${isLogged ? "h-[121px] p-4" : "flex h-fit items-center"}`}
      >
        {isLogged ? (
          <Link
            to={MY_INFO}
            className="flex items-center gap-3 rounded-md p-1 transition-colors duration-200 hover:bg-green-50"
          >
            {profile?.thumbnail ? null : <DefaultThumbnail />}

            <div>
              <div className="truncate text-sm font-medium text-gray-900">
                {profile?.nickname}
              </div>
              <div className="truncate text-xs text-gray-500">
                {profile?.email}
              </div>
            </div>
          </Link>
        ) : null}

        <button
          onClick={isLogged ? handleLogout : () => nav(LOGIN_URL)}
          className={`mt-3 flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-green-50 hover:text-green-600 ${isLogged ? "" : "m-4"}`}
        >
          {isLogged ? (
            <>
              <LogOut size={16} />
              로그아웃
            </>
          ) : (
            <>
              <LogIn size={16} />
              로그인
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
