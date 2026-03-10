import {
  Youtube,
  Sparkles,
  ArrowRight,
  Loader2,
  CookingPot,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useGetYoutubeRecipe from "@/hooks/API/recipe/GET/useGetYoutubeRecipe";
import { useOpenModal } from "@/store/modalStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import YoutubeRecipeModal from "@/components/modal/recipe/YoutubeRecipeModal";

export default function YoutubeRecipeForm() {
  const openModal = useOpenModal();
  const [youtubeUrl, setYoutubeUrl] = useState(
    "https://www.youtube.com/shorts/2KoUycJinko",
  );

  const {
    data: recipeInfo,
    refetch: recipeInfoFetch,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
  } = useGetYoutubeRecipe(youtubeUrl);

  /*
    You Might Not Need an Effect
    리팩토링 관련 공식문서 : https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers
    리팩토링 관련 블로그 : https://velog.io/@cokid/useEffect%EB%8A%94-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%95%B8%EB%93%A4%EB%9F%AC%EA%B0%80-%EC%95%84%EB%8B%88%EB%8B%A4

    모달 오픈용 effect
    useEffect(() => {
      if (recipeInfo && !isFetching && !isError) {
        openModal(
          <CreateRecipeModal recipeInfo={recipeInfo} youtubeUrl={youtubeUrl} />,
        );
      }
    }, [recipeInfo, isFetching]);

    캐시 삭제용 effect - dependency분리를 위한 별도 코드
    useEffect(() => {
      return () => {
        queryClient.removeQueries({
          queryKey: QUERY_KEYS.recipe.byUrl(youtubeUrl),
        });
      };
    }, []);
  */

  const handleOnclick = async () => {
    const recipeInfo = await recipeInfoFetch();

    if (recipeInfo.data && !isFetching && !isError) {
      openModal(
        <YoutubeRecipeModal
          recipeInfo={recipeInfo.data}
          youtubeUrl={youtubeUrl}
        />,
      );
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-3xl border-none bg-white shadow-2xl md:min-w-3xl">
        <div className="bg-linear-to-br from-green-400 to-emerald-500 p-4 text-white md:p-8">
          <div className="flex items-center gap-3 text-lg md:text-2xl">
            <Youtube className="h-8 w-8" />
            레시피 생성하기
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-700">
                유튜브 영상 URL
              </label>
              <div className="relative">
                <Youtube className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="h-14 rounded-xl border-gray-200 pl-12 text-base focus:border-green-400 focus:ring-green-400"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                예: https://www.youtube.com/shorts/2KoUycJinko
              </p>
            </div>

            {/* Todo: 에러 케이스 서버에서 구현 */}
            {isError && (
              <Alert
                variant="destructive"
                className="rounded-xl border-red-500"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  알수없는 에러가 발생했습니다. 다시 시도해주세요
                </AlertDescription>
              </Alert>
            )}

            {isFetching && (
              <Alert className="rounded-xl border-green-200 bg-green-50">
                <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                <AlertDescription className="text-green-800">
                  AI가 영상을 분석하고 있습니다...
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-2xl border border-green-100 bg-linear-to-br from-green-50 to-emerald-50 p-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                <Sparkles className="h-5 w-5 text-green-500" />
                AI가 자동으로 분석하는 내용
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  레시피 제목과 설명
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  카테고리, 조리 시간, 난이도
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  필요한 재료 목록
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  단계별 요리 순서와 팁
                </li>
              </ul>
            </div>

            <Button
              disabled={isFetching || !youtubeUrl}
              className="bg-green-gradient h-14 w-full rounded-xl text-lg font-semibold text-white shadow-lg transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-xl"
              onClick={handleOnclick}
            >
              {isFetching ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  생성 중...
                </>
              ) : (
                <>
                  <CookingPot className="mr-2 h-5 w-5" />
                  레시피 생성하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
