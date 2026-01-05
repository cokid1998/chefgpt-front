// auth
export const loginUrl = "/auth/login";
export const signupAPIURL = "/auth/signup";
export const logoutUrl = "/auth/logout";
export const KAKAO_API_URL = "/auth/kakao";

// user
export const PROFILE_API_URL = "/profile";

// foods
export const FOODS_API_URL = "/food";
export const FOODS_CATEGORY_API_URL = "/food/category";
export const CREATE_FOOD_API_URL = "/food";
export const UPDATE_FOOD_API_URL = (foodId: number) => `/food/${foodId}`;
export const GET_ONE_FOOD_URL = (foodId: number) => `/food/${foodId}`;
export const GET_FOODS_COUNT_API_URL = "/food/count";
export const DELETE_FOOD_API_URL = (foodId: number) => `/food/${foodId}`;

// vote
export const GET_VOTE_API_URL = "/vote";
export const CREATE_VOTE_API_URL = "/vote";
export const GET_VOTE_COUNT_API_URL = "/vote/count";
export const CREATE_VOTE_SUBMIT_API_URL = (voteId: number) =>
  `/vote/${voteId}/submit`;

// article
export const GET_ARTICLE_CATEOGRY_API_URL = "/article/category";
export const GET_ARTICLE = "/article";
export const GET_ARTICLE_COUNT = "/article/count";
export const GET_ONE_ARTICLE = (articleId: number) => `/article/${articleId}`;
export const POST_ARTICLE = "/article";
export const PATCH_ARTICLE_VIEWCOUNT = (articleId: number) =>
  `/article/${articleId}`;
