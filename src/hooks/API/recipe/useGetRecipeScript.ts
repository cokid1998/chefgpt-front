import { GET_RECIPE_SCRIPT } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";

const useGetRecipeScript = (youtubeUrl: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.byUrl(youtubeUrl),
    queryFn: () =>
      API.get(GET_RECIPE_SCRIPT, {
        params: {
          youtubeUrl: youtubeUrl,
        },
      }),
    enabled: false,
    select: (data) => data.data,
  });
};

export default useGetRecipeScript;
