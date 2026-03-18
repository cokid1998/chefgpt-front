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
    myInfo: ["count", "myInfo"],
  },

  vote: {
    all: ["vote"],
    list: (status: "active" | "close") => ["vote", "list", status],
    my: (page: number) => ["vote", "my", page],
    voted: (page: number) => ["vote", "voted", page],
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
    my: (page: number = 1) => ["article", "my", page],
    liked: (page: number = 1) => ["article", "liked", page],
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
    my: (page: number = 1) => ["recipe", "my", page],
    liked: (page: number = 1) => ["recipe", "liked", page],
  },
} as const;
