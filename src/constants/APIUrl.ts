// auth
export const loginUrl = "/auth/login";
export const signupAPIURL = "/auth/signup";
export const logoutUrl = "/auth/logout";

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
export const GET_ACTIVE_VOTE_API_URL = "/vote/active";
export const GET_CLOSE_VOTE_API_URL = "/vote/close";
export const CREATE_VOTE_API_URL = "/vote";
export const GET_VOTE_COUNT_API_URL = "/vote/count";
export const CREATE_VOTE_SUBMIT_API_URL = (voteId: number) =>
  `/vote/${voteId}/submit`;
