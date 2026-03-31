import { GET_YOUTUBE_RECIPE_SCRIPT } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { YoutubeRecipeType } from "@/types/recipeType";
import { AxiosError, type AxiosResponse } from "axios";

interface ApiError {
  code: string;
  message: string;
}

const useGetYoutubeRecipe = (youtubeUrl: string) => {
  return useQuery<
    AxiosResponse<YoutubeRecipeType>,
    AxiosError<ApiError>,
    YoutubeRecipeType
  >({
    queryKey: QUERY_KEYS.recipe.youtube,
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
