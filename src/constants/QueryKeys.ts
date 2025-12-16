export const QUERY_KEYS = {
  profile: ["profile"],

  foodsCategory: ["foods", "category"],

  foods: ["foods"],
  foodsById: (foodId: number) => ["foods", foodId],
};
