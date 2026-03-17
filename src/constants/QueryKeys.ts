export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
  },

  category: {
    all: ["category"],
    food: ["category", "food"],
    article: ["category", "article"],
    recipe: ["category", "recipe"],
  },

  food: {
    all: ["food"],
    list: (category: string = "", search: string = "", expire: string = "") => [
      "food",
      category,
      search,
      expire,
    ],
    byId: (foodId: number) => ["food", foodId],
  },

  count: {
    all: ["count"],
    food: ["count", "food"],
    vote: ["count", "vote"],
    article: ["count", "article"],
    myInfo: ["count", "myInfo"],
  },

  vote: {
    all: ["vote"],
    list: (status: "active" | "close") => ["vote", "list", status],
    my: ["vote", "my"],
    voted: ["vote", "voted"],
  },

  article: {
    all: ["article"],
    list: (category: string = "", search: string = "", page: number = 1) => [
      "article",
      category,
      search,
      page,
    ],
    byId: (articleId: number) => ["article", articleId],
    my: ["article", "my"],
    liked: ["article", "liked"],
  },

  recipe: {
    all: ["recipe"],
    byYoutubeUrl: (recipeUrl: string) => ["recipe", recipeUrl],
    list: (categoryId: number, search: string = "", page: number = 1) => [
      "recipe",
      categoryId,
      search,
      page,
    ],
    byId: (recipeId: number) => ["recipe", recipeId],
    my: ["recipe", "my"],
    liked: ["recipe", "liked"],
  },
} as const;
