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
  },

  article: {
    all: ["article"],
    list: (category: string = "", search: string = "") => [
      "article",
      category,
      search,
    ],
    byId: (articleId: number) => ["article", articleId],
  },

  recipe: {
    all: ["recipe"],
    byUrl: (recipeUrl: string) => ["recipe", recipeUrl],
    list: () => ["recipe", "list"],
  },
} as const;
