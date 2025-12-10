// auth
export const loginUrl = "/auth/login";
export const signupAPIURL = "/auth/signup";
export const logoutUrl = "/auth/logout";

// user
export const PROFILE_API_URL = (userId: number) => `/profile/${userId}`;

// foods
export const FOODS_API_URL = (userId: number) => `/food/${userId}`;
export const FOODS_CATEGORY_API_URL = "/food/category";
