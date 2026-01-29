import {
  ChefHat,
  Trophy,
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import youtubeDefaultImage from "@/assets/image/youtube_default.jpg";

export default function MyInfoOverviewTab() {
  return (
    <>
      {/* 개요 탭 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="border-none shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              요리 정보
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-sm text-gray-500">요리 실력</p>
                <p className="font-semibold text-gray-900">
                  {/* {user.cooking_level || '설정 안됨'} */}
                  설정 안됨
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-500">선호 요리</p>
                <p className="font-semibold text-gray-900">
                  {/* {user.favorite_cuisine || '설정 안됨'} */}
                  설정 안됨
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-500">식단 제한</p>
                <p className="font-semibold text-gray-900">
                  {/* {user.dietary_restrictions || '없음'} */}
                  없음
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-500">보유 식재료</p>
                <p className="font-semibold text-gray-900">
                  {/* {ingredients.length}개 */}
                  3개
                </p>
              </div>
            </div>
            <Button
              // onClick={() => setShowEditCooking(true)}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              요리 정보 수정
            </Button>
          </div>
        </div>

        <div className="border-none shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              활동 요약
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
              <div className="flex items-center gap-3">
                <ChefHat className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium">레시피 작성</span>
              </div>
              <Badge className="bg-orange-500">
                {/* {recipes.length}개 */}
                3개
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">투표 참여</span>
              </div>
              <Badge className="bg-purple-500">
                {/* {votes.length}회 */}
                3회
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">식재료 관리</span>
              </div>
              <Badge className="bg-green-500">
                {/* {ingredients.length}개 */}
                3개
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">평균 레시피 조회</span>
              </div>
              <Badge className="bg-blue-500">
                {/* {recipes.length > 0
                    ? Math.round(totalViews / recipes.length)
                    : 0} */}
                333333
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 레시피 */}
      <div className="border-none shadow-lg">
        <div>
          <div>최근 레시피</div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[Array(2)].map((recipe) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
