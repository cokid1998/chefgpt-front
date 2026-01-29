import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChefHat,
  Trophy,
  Settings,
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
import MyInfoOverviewTab from "@/components/myInfo/myInfoContent/MyInfoOverviewTab";

export default function MyInfoMyRecipeTab() {
  return (
    <TabsContent value="recipes" className="space-y-6">
      <div className="border-none shadow-lg">
        <div>
          <div>내가 만든 레시피 (444개)</div>
        </div>
        <div>
          {/* {recipes.length === 0 ? (
            <div className="py-12 text-center">
              <ChefHat className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <p className="mb-4 text-gray-500">
                아직 작성한 레시피가 없습니다
              </p>
              <Button className="bg-green-500 hover:bg-green-600">
                레시피 만들기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )} */}
          {[Array(3)].map(() => (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          ))}
        </div>
      </div>
    </TabsContent>
  );
}
