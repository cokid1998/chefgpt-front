import { Badge } from "@/components/ui/badge";
import {
  ChefHat,
  Sparkles,
  Clock,
  Users,
  SearchIcon,
  Plus,
  Funnel,
  CookingPot,
  Eye,
  Heart,
} from "lucide-react";
import { Link } from "react-router";
import { RECIPE, COMMUNITY } from "@/constants/Url";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import youtubeDefaultImage from "@/assets/image/youtube_default.jpg";

const CATEGORY = [
  "전체",
  "한식",
  "양식",
  "중식",
  "일식",
  "디저트",
  "베이킹",
  "간식",
  "음료",
  "기타",
];

export default function IndexPage() {
  return (
    <div className="flex flex-col scroll-auto">
      <div className="bg-green-gradient flex flex-col items-center justify-center px-8 py-28">
        <Badge className="mb-6 flex gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
          <Sparkles />
          AI 기반 요리 가이드
        </Badge>

        <h1 className="mb-6 text-center text-6xl leading-tight font-bold text-white">
          유튜브 레시피를 <br /> 단계별로 쉽게
        </h1>

        <p className="mx-auto mb-8 text-center text-xl leading-relaxed text-white/90">
          유튜브 영상을 입력하면 AI가 자동으로 요리 순서를 분석하고 <br />
          슬라이드 형식으로 정리해드립니다
        </p>

        <div className="flex justify-center gap-4">
          <Link
            className="flex h-14 items-center gap-2 rounded-xl bg-white px-8 transition-all duration-200 hover:bg-green-50 hover:text-green-500"
            to={RECIPE}
          >
            <ChefHat size={20} />
            레시피 만들기
          </Link>

          <Link
            className="flex h-14 items-center rounded-xl bg-white px-8 transition-all duration-200 hover:bg-green-50 hover:text-green-500"
            to={COMMUNITY}
          >
            커뮤니티 둘러보기
          </Link>
        </div>
      </div>

      <div className="mx-auto min-w-7xl px-4 py-12">
        <div className="mb-12 grid grid-cols-3 gap-6">
          <div className="flex gap-4 rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <Clock
              className="rounded-lg bg-green-100 p-3 text-green-500"
              size={48}
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">평균 조리시간</span>
              <span className="text-2xl font-bold text-gray-900">30분</span>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <Users
              className="rounded-lg bg-green-100 p-3 text-green-500"
              size={48}
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">누적 레시피</span>
              <span className="text-2xl font-bold text-gray-900">2</span>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <Clock
              className="rounded-lg bg-green-100 p-3 text-green-500"
              size={48}
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">이번 주 신규</span>
              <span className="text-2xl font-bold text-gray-900">12개</span>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between">
          <InputGroup className="h-12 max-w-2xl">
            <InputGroupInput placeholder="레시피 검색..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <Button className="bg-green-gradient h-12" asChild>
            <Link to={RECIPE}>
              <Plus />
              레시피 생성
            </Link>
          </Button>
        </div>

        <div className="mb-8 flex items-center gap-3 text-sm font-medium text-gray-600">
          <Popover>
            <PopoverTrigger className="flex shrink-0 cursor-pointer items-center gap-2 border-r border-gray-200 pr-2 whitespace-nowrap">
              <Funnel size={14} />
              <span>카테고리</span>
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col items-center gap-2">
              <span>카테고리</span>
              <span>유튜버</span>
            </PopoverContent>
          </Popover>

          {CATEGORY.map((category) => (
            <Badge
              key={category}
              className="cursor-pointer border-green-100 bg-white px-5 py-2 text-sm font-medium text-gray-600 hover:border-green-400 hover:bg-green-50"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div>
          <h1 className="mb-6 flex items-center gap-2">
            <CookingPot className="text-green-500" />
            <span className="text-2xl font-bold text-gray-900">
              모든 레시피
            </span>
            <span className="text-sm text-gray-500">(2개)</span>
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Link
            to={"/id"}
            className="group h-fit overflow-hidden rounded-2xl border shadow transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={youtubeDefaultImage}
                className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
              />
              <Badge className="absolute top-3 left-3 rounded-md bg-green-500">
                쉬움
              </Badge>
              <Badge className="absolute top-3 right-3 rounded-md bg-white text-green-500">
                한식
              </Badge>
            </div>
            <div className="p-5">
              <h1 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-400 group-hover:text-green-500">
                김치찌개 만들기
              </h1>
              <span className="mb-4 line-clamp-2 text-sm text-gray-500">
                매콤하고 깊은 맛의 김치찌개 레시피입니다.
              </span>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={16} /> 30분
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1">
                    <Eye size={16} />6
                  </button>
                  <button className="flex items-center gap-1">
                    <Heart size={16} /> 1
                  </button>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to={"/id"}
            className="group h-fit overflow-hidden rounded-2xl border shadow transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={youtubeDefaultImage}
                className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
              />
              <Badge className="absolute top-3 left-3 rounded-md bg-green-500">
                쉬움
              </Badge>
              <Badge className="absolute top-3 right-3 rounded-md bg-white text-green-500">
                한식
              </Badge>
            </div>
            <div className="p-5">
              <h1 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-400 group-hover:text-green-500">
                김치찌개 만들기
              </h1>
              <span className="mb-4 line-clamp-2 text-sm text-gray-500">
                매콤하고 깊은 맛의 김치찌개 레시피입니다.
              </span>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={16} /> 30분
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1">
                    <Eye size={16} />6
                  </button>
                  <button className="flex items-center gap-1">
                    <Heart size={16} /> 1
                  </button>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to={"/id"}
            className="group h-fit overflow-hidden rounded-2xl border shadow transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={youtubeDefaultImage}
                className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
              />
              <Badge className="absolute top-3 left-3 rounded-md bg-green-500">
                쉬움
              </Badge>
              <Badge className="absolute top-3 right-3 rounded-md bg-white text-green-500">
                한식
              </Badge>
            </div>
            <div className="p-5">
              <h1 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-400 group-hover:text-green-500">
                김치찌개 만들기
              </h1>
              <span className="mb-4 line-clamp-2 text-sm text-gray-500">
                매콤하고 깊은 맛의 김치찌개 레시피입니다.
              </span>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock size={16} /> 30분
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1">
                    <Eye size={16} />6
                  </button>
                  <button className="flex items-center gap-1">
                    <Heart size={16} /> 1
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
