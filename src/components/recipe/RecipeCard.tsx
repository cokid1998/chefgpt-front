import { Link } from "react-router";
import type { RecipeType } from "@/types/recipeType";
import youtubeDefaultImage from "@/assets/image/youtube_default.jpg";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Heart } from "lucide-react";

export default function RecipeCard({ recipe }: { recipe: RecipeType }) {
  console.log(recipe);
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="group max-w-100 overflow-hidden rounded-2xl border shadow transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.thumbnailUrl || youtubeDefaultImage}
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 rounded-md bg-white text-green-500">
          {recipe.category.name}
        </Badge>
      </div>
      <div className="p-5">
        <h1 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors duration-400 group-hover:text-green-500">
          {recipe.title}
        </h1>
        <span className="mb-4 line-clamp-2 text-sm text-gray-500">
          {recipe.description}
        </span>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} /> {recipe.cookingTime}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1">
              <Eye size={16} />
              {recipe.viewCount}
            </button>
            <button className="flex items-center gap-1">
              <Heart size={16} /> Todo: 1
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
