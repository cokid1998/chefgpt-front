import recipeGuideImage from "@/assets/image/recipe-guide.png";
import { useCloseModal } from "@/store/modalStore";
import { Youtube, X } from "lucide-react";

export default function YoutubeRecipeGuideModal() {
  const closeModal = useCloseModal();
  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="flex items-center justify-between bg-linear-to-br from-green-400 to-emerald-500 p-4 text-white">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Youtube className="h-6 w-6" />
          자막이 있는 영상만 가능해요!
        </div>
        <button onClick={closeModal}>
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4 p-6">
        <p className="text-sm text-gray-600">
          AI가 유튜브 영상의{" "}
          <span className="font-semibold text-green-600">자막을 분석</span>
          하여 레시피를 생성합니다. 자막이 없는 영상은 분석이 불가능해요 😭
        </p>

        <div className="overflow-hidden rounded-2xl border border-green-100">
          <img
            src={recipeGuideImage}
            alt="유튜브 자막 확인 방법"
            className="w-full object-cover"
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          유튜브 영상의 자막(CC) 버튼을 확인해주세요!
        </p>

        <button
          onClick={closeModal}
          className="w-full rounded-xl bg-linear-to-br from-green-400 to-emerald-500 py-3 font-semibold text-white shadow-lg transition-all hover:from-green-500 hover:to-emerald-600"
        >
          확인했어요!
        </button>
      </div>
    </div>
  );
}
