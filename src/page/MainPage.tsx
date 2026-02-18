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
import { CREATE_RECIPE, VOTE } from "@/constants/Url";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RecipeCard from "@/components/recipe/RecipeCard";
import useGetRecipe from "@/hooks/API/recipe/GET/useGetRecipe";
import useGetRecipeCategory from "@/hooks/API/recipe/GET/useGetRecipeCategory";

export default function HomePage() {
  const location = useLocation();
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const [search, setSearch] = useState("");

  const handleCategoryClick = (categoryId: number) => {
    setSelectCategoryId(categoryId);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
  };

  const { data: recipeData } = useGetRecipe(selectCategoryId, search);
  const { data: categories } = useGetRecipeCategory();

  useEffect(() => {
    // 여기서 location.state를 통해 페이지 접근불가 이유 분기처리
    if (location.state?.fromLogout) {
      toast.success("로그아웃 완료.");
      window.history.replaceState({}, document.title);
    }
    // if (location.state?.Unauthorized) {
    //   toast.error("세션만료");
    //   window.history.replaceState({}, document.title);
    // }
  }, [location]);

  // Todo: searchBar 컴포넌트로 분리
  // 로딩 UI구현
  if (!categories) return null;

  return (
    <>
      <title>ChefGPT | 홈</title>
      <div className="bg-soft-green flex flex-col scroll-auto">
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
              to={CREATE_RECIPE}
            >
              <ChefHat size={20} />
              레시피 만들기
            </Link>

            <Link
              className="flex h-14 items-center rounded-xl bg-white px-8 transition-all duration-200 hover:bg-green-50 hover:text-green-500"
              to={VOTE}
            >
              커뮤니티 둘러보기
            </Link>
          </div>
        </div>

        <div className="mx-auto min-w-7xl px-4 py-12">
          <div className="mb-6 flex justify-between">
            <InputGroup className="h-12 max-w-2xl bg-white">
              <InputGroupInput
                placeholder="레시피 검색..."
                onKeyDown={handleSearchKeyDown}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <Button className="bg-green-gradient h-12" asChild>
              <Link to={CREATE_RECIPE}>
                <Plus />
                레시피 생성
              </Link>
            </Button>
          </div>

          <div className="mb-8 flex items-center gap-3 text-sm font-medium text-gray-600">
            {[{ id: 0, name: "전체" }, ...categories]?.map((category) => (
              <Badge
                key={category.id}
                className={`cursor-pointer bg-white px-5 py-2 text-sm font-medium text-gray-600 ${
                  selectCategoryId === category.id
                    ? "bg-green-gradient border-none text-white shadow-md hover:shadow-lg"
                    : "border-green-200 hover:border-green-400 hover:bg-green-50"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>

          <div>
            <h1 className="mb-6 flex items-center gap-2">
              <CookingPot className="text-green-500" />
              <span className="text-2xl font-bold text-gray-900">
                모든 레시피
              </span>
              <span className="text-sm text-gray-500">
                ({recipeData?.length}개)
              </span>
            </h1>
          </div>

          <div className="grid min-h-[346px] w-full grid-cols-3 gap-6">
            {recipeData?.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
