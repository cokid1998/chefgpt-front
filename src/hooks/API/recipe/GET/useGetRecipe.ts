import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";
import { GET_RECIPE } from "@/constants/APIUrl";
import type { RecipeType } from "@/types/recipeType";

const useGetRecipe = (categoryId: number, search: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.recipe.list(categoryId, search),
    queryFn: async () => {
      return API.get<RecipeType[]>(GET_RECIPE, {
        params: {
          // categoryId가 0이면 쿼리스트링에 categoryId가 포함안되게 구현
          // axios에서 쿼리스트링이 undefined면 url에서 아예 제외시킴
          categoryId: categoryId === 0 ? undefined : categoryId,
          search,
        },
      });
    },
    select: (data) => data.data,
  });
};

export default useGetRecipe;
