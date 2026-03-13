import { Badge } from "@/components/ui/badge";
import { ChefHat, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";
import { CREATE_RECIPE, VOTE } from "@/constants/Url";
import { useLocation, useSearchParams } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import RecipeSearchBar from "@/components/home/RecipeSearchBar";
import RecipeList from "@/components/home/RecipeList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useGetAllRecipe from "@/hooks/API/recipe/GET/useGetAllRecipe";
import useGetRecipeCategory from "@/hooks/API/recipe/GET/useGetRecipeCategory";

export default function HomePage() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const categoryName = params.get("category") ?? "전체";
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? 1);

  const { data: categories = [] } = useGetRecipeCategory();
  const categoryId =
    categories.find((cate) => cate.name === categoryName)?.id ?? 0;

  const { data: recipeData, isLoading: recipeListLoading } = useGetAllRecipe(
    categoryId,
    search,
    page,
  );

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

  return (
    <>
      <title>ChefGPT | 홈</title>
      <div className="bg-soft-green flex flex-col overflow-x-hidden scroll-auto">
        <div className="bg-green-gradient flex flex-col items-center justify-center px-4 py-14 md:px-8 md:py-28">
          <Badge className="mb-6 flex gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Sparkles />
            AI 기반 요리 가이드
          </Badge>

          <h1 className="mb-6 text-center text-3xl leading-tight font-bold text-white md:text-6xl">
            유튜브 레시피를 <br /> 단계별로 쉽게
          </h1>

          <p className="mx-auto mb-8 text-center text-sm leading-relaxed text-white/90 md:text-xl">
            유튜브 영상을 입력하면 AI가 자동으로 요리 순서를 분석하고 <br />
            슬라이드 형식으로 정리해드립니다
          </p>

          <div className="flex justify-center gap-4 text-xs md:text-base">
            <Link
              className="flex h-12 items-center gap-2 rounded-xl bg-white px-8 transition-all duration-200 hover:bg-green-50 hover:text-green-500 md:h-14"
              to={CREATE_RECIPE}
            >
              <ChefHat size={20} />
              레시피 만들기
            </Link>

            <Link
              className="flex h-12 items-center gap-2 rounded-xl bg-white px-8 transition-all duration-200 hover:bg-green-50 hover:text-green-500 md:h-14"
              to={VOTE}
            >
              <Users size={20} />
              요리투표해보기
            </Link>
          </div>
        </div>

        <div className="max-w-7xl px-4 py-12 md:mx-auto md:min-w-7xl">
          <RecipeSearchBar />

          <RecipeList />

          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {[...Array(recipeData?.totalPage || 1)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#">{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={page === recipeData?.totalPage}
                  className={
                    page === recipeData?.totalPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
