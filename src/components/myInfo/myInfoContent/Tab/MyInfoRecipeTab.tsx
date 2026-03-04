import { ChefHat, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useGetMyRecipe from "@/hooks/API/recipe/GET/useGetMyRecipe";
import { CREATE_RECIPE } from "@/constants/Url";
import MyInfoRecipeTabSkeleton from "@/components/myInfo/skeleton/MyInfoRecipeTabSkeleton";
import RecipeCard from "@/components/recipe/RecipeCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetLikedRecipe from "@/hooks/API/recipe/GET/useGetLikedRecipe";

const MY_RECIPE_TYPE = {
  MY: { LABEL: "내 레시피", VALUE: "my" },
  LIKED: { LABEL: "좋아요 누른 레시피", VALUE: "liked" },
} as const;

interface MyInfoRecipeTabProps {
  curTab: string;
}

export default function MyInfoRecipeTab({ curTab }: MyInfoRecipeTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curSelect = searchParams.get("select") ?? MY_RECIPE_TYPE.MY.VALUE;
  const isMyRecipe = curSelect === MY_RECIPE_TYPE.MY.VALUE;

  const { data: myRecipeIdList, isLoading: isMyRecipeLoading } =
    useGetMyRecipe();
  const { data: likedRecipeIdList, isLoading: isLikedRecipeLoading } =
    useGetLikedRecipe(curSelect === MY_RECIPE_TYPE.LIKED.VALUE);

  const handleSelectChange = (value: string) => {
    setSearchParams({ tab: curTab, select: value });
  };

  const curLabel = isMyRecipe
    ? MY_RECIPE_TYPE.MY.LABEL
    : MY_RECIPE_TYPE.LIKED.LABEL;
  const curList = isMyRecipe ? myRecipeIdList : likedRecipeIdList;
  const isLoading = isMyRecipe ? isMyRecipeLoading : isLikedRecipeLoading;

  if (isLoading) return <MyInfoRecipeTabSkeleton />;

  return (
    <div className="rounded-lg border-none bg-white shadow-lg">
      <div className="flex justify-between space-y-1.5 p-6 leading-none font-semibold tracking-tight">
        {curLabel}({curList?.length}개)
        <Select
          value={curSelect}
          onValueChange={(value) => handleSelectChange(value)}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={MY_RECIPE_TYPE.MY.VALUE}>
              {MY_RECIPE_TYPE.MY.LABEL}
            </SelectItem>
            <SelectItem value={MY_RECIPE_TYPE.LIKED.VALUE}>
              {MY_RECIPE_TYPE.LIKED.LABEL}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-6 pt-0">
        {!isLoading && curList?.length === 0 ? (
          <EmptyRecipe isMyRecipe={isMyRecipe} />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {curList?.map((recipeId) => (
              <RecipeCard key={recipeId} recipeId={recipeId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyRecipe({ isMyRecipe }: { isMyRecipe: boolean }) {
  return (
    <div className="py-12 text-center">
      {isMyRecipe ? (
        <ChefHat className="mx-auto mb-4 h-16 w-16 text-gray-300" />
      ) : (
        <Heart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
      )}

      <p className="mb-4 text-gray-500">
        {isMyRecipe
          ? "작성한 레시피가 없습니다."
          : "좋아요를 누른 레시피가 없습니다."}
      </p>
      {isMyRecipe ? (
        <Link
          to={CREATE_RECIPE}
          className="text-primary-foreground inline-flex h-9 items-center justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium hover:bg-green-600"
        >
          레시피 만들기
        </Link>
      ) : null}
    </div>
  );
}
