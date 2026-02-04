import { GET_RECIPE_CATEGORY } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import type { RecipeCategoryType } from "@/types/recipeType";

const useGetRecipeCategory = () => {
  return useQuery({
    queryKey: QUERY_KEYS.category.recipe,
    queryFn: () => API.get<RecipeCategoryType[]>(GET_RECIPE_CATEGORY),
    select: (data) => data.data,
    staleTime: 1 * 60 * 60 * 1000,
    gcTime: 1 * 60 * 60 * 1000,
  });
};

export default useGetRecipeCategory;
