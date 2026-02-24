import { Link } from "react-router";
import defaultImage from "@/assets/image/default_recipe_thumbnail.png";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Heart } from "lucide-react";
import useGetOneRecipe from "@/hooks/API/recipe/GET/useGetOneRecipe";
import usePatchRecipeViewCount from "@/hooks/API/recipe/PATCH/usePatchRecipeViewCount";

export default function RecipeCard({ recipeId }: { recipeId: number }) {
  const { mutate: recipeViewCountIncrement } = usePatchRecipeViewCount();

  const { data: recipe } = useGetOneRecipe(recipeId);

  return (
    <Link
      to={`/recipe/${recipeId}`}
      className="group flex max-w-100 cursor-pointer flex-col overflow-hidden rounded-2xl border shadow transition-all duration-300 hover:shadow-xl"
      onClick={() => recipeViewCountIncrement(recipeId)}
    >
      <div className="relative h-48 overflow-hidden border-b">
        <img
          src={recipe?.thumbnailUrl || defaultImage}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 rounded-md bg-white text-green-500">
          {recipe?.category.name}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h1 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-400 group-hover:text-green-500">
            {recipe?.title}
          </h1>
          <span className="mb-4 line-clamp-2 text-sm text-gray-500">
            {recipe?.description}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} /> {recipe?.cookingTime}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={16} />
              {recipe?.viewCount}
            </div>

            <div className="flex cursor-pointer items-center gap-1">
              <Heart size={16} /> Todo: 1
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
