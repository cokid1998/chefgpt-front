import { GET_YOUTUBE_RECIPE_SCRIPT } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { YoutubeRecipeType } from "@/types/recipeType";

const useGetYoutubeRecipe = (youtubeUrl: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.byYoutubeUrl(youtubeUrl),
    queryFn: () =>
      API.get<YoutubeRecipeType>(GET_YOUTUBE_RECIPE_SCRIPT, {
        params: {
          youtubeUrl: youtubeUrl,
        },
      }),
    enabled: false,
    select: (data) => data.data,
  });
};

export default useGetYoutubeRecipe;
