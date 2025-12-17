export const QUERY_KEYS = {
  profile: ["profile"],

  foodsCategory: ["foods", "category"],

  foods: (category: string, search: string) => ["foods", category, search],
  foodsById: (foodId: number) => ["foods", foodId],
};
