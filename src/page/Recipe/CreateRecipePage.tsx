import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Youtube,
  Sparkles,
  ArrowRight,
  Loader2,
  CookingPot,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useGetRecipeScript from "@/hooks/API/recipe/useGetRecipeScript";
import { useOpenModal } from "@/store/modalStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CreateRecipeModal from "@/components/modal/recipe/CreateRecipeModal";

export default function CreateRecipePage() {
  const openModal = useOpenModal();
  const [youtubeUrl, setYoutubeUrl] = useState(
    "https://www.youtube.com/shorts/2KoUycJinko",
  );

  const {
    data: recipeScript,
    refetch: recipeScriptFetch,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
  } = useGetRecipeScript(youtubeUrl);

  useEffect(() => {
    if (recipeScript && !isFetching) {
      openModal(
        <CreateRecipeModal
          recipeScript={recipeScript}
          youtubeUrl={youtubeUrl}
        />,
      );
    }
  }, [recipeScript, isFetching]);

  return (
    <>
      <title>ChefGPT | 레시피 생성</title>
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-green-50 to-white p-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <Badge className="mb-4 bg-green-200 px-4 py-2 text-green-600">
            <Bot className="size-4!" />
            <span className="text-sm font-medium text-green-600">
              AI기반 레시피 생성
            </span>
          </Badge>

          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            유튜브로 레시피 만들기
          </h1>

          <p className="mb-12 text-lg text-gray-600">
            유튜브 영상 URL을 입력하면 AI가 자동으로 단계별 레시피로
            변환해드립니다
          </p>

          <div className="min-w-3xl overflow-hidden rounded-3xl border-none bg-white shadow-2xl">
            <div className="bg-linear-to-br from-green-400 to-emerald-500 p-8 text-white">
              <div className="flex items-center gap-3 text-2xl">
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
                      // disabled={isProcessing}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    예: https://www.youtube.com/watch?v=dQw4w9WgXcQ
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
                  onClick={() => recipeScriptFetch()}
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
        </div>
      </div>
    </>
  );
}
