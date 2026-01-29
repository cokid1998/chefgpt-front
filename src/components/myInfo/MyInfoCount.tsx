import useGetMyInfoBannerData from "@/hooks/API/myInfo/useGetMyInfoBannerData";
import { ChefHat, TrendingUp, Heart, CheckCircle2 } from "lucide-react";

export default function MyInfoCount() {
  const { data: myInfoCount } = useGetMyInfoBannerData();

  return (
    <div className="-mt-8 grid w-full grid-cols-4 gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-orange-100 p-3">
            <ChefHat className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">내 레시피</p>
            <p className="text-2xl font-bold text-gray-900">
              {myInfoCount?.recipeCount}개
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">총 조회수 (레시피, 아티클)</p>
            <p className="text-2xl font-bold text-gray-900">
              {myInfoCount?.totalViewCount}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-red-100 p-3">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">총 좋아요 (레시피, 아티클)</p>
            <p className="text-2xl font-bold text-gray-900">
              {myInfoCount?.totalLike}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-purple-100 p-3">
            <CheckCircle2 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">참여한 투표</p>
            <p className="text-2xl font-bold text-gray-900">
              {myInfoCount?.votePulls}개
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
