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
