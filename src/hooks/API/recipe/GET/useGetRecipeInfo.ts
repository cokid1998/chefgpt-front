import { GET_YOUTUBE_RECIPE_SCRIPT } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { RecipeInfoType } from "@/types/recipeType";

const useGetRecipeInfo = (youtubeUrl: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.byUrl(youtubeUrl),
    queryFn: () =>
      API.get<RecipeInfoType>(GET_YOUTUBE_RECIPE_SCRIPT, {
        params: {
          youtubeUrl: youtubeUrl,
        },
      }),
    enabled: false,
    select: (data) => data.data,
  });
};

export default useGetRecipeInfo;
