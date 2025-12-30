export const QUERY_KEYS = {
  profile: {
    all: ["profile"],
  },

  category: {
    all: ["category"],
    food: ["category", "food"],
    article: ["category", "article"],
  },

  food: {
    all: ["food"],
    list: (category: string = "", search: string = "") => [
      "food",
      category,
      search,
    ],
    byId: (foodId: number) => ["food", foodId],
  },

  count: {
    all: ["count"],
    food: ["count", "food"],
    vote: ["count", "vote"],
  },

  vote: {
    all: ["vote"],
    list: (status: "active" | "close") => ["vote", "list", status],
  },

  article: {
    all: ["article"],
    list: () => ["article"],
  },
} as const;
