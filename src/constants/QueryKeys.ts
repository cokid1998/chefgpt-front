export const QUERY_KEYS = {
  profile: ["profile"],
  profileById: (userId: number) => ["profile", userId],

  foods: ["foods"],
  foodsCategory: ["foods", "category"],
};
