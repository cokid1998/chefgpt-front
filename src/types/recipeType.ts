export type RecipeSource = "MANUAL" | "YOUTUBE";

export interface YoutubeIngredientType {
  name: string;
  amount: string;
}

export interface YoutubeStepType {
  stepTitle: string;
  description: string;
  tip: string;
}

export interface YoutubeRecipeType {
  category: string;
  title: string;
  description: string;
  cookingTime: string;
  steps: YoutubeStepType[];
  ingredients: YoutubeIngredientType[];
}

export interface StepType {
  id: number;
  stepNumber: number;
  stepTitle: string;
  description: string;
  tip: string;
  recipeId: number;
}

export interface IngredientType {
  id: number;
  name: string;
  amount: string;
  recipeId: number;
}

export interface RecipeType {
  category: RecipeCategoryType;
  cookingTime: string;
  description: string;
  id: number;
  title: string;
  viewCount: number;
  thumbnailUrl: string;
  recipeSteps: StepType[];
  recipeIngredients: IngredientType[];
  recipeSource: RecipeSource;
  youtubeVideoId: string | null;
  likeCount: number;
  liked: boolean;
}

export interface RecipeCategoryType {
  id: number;
  name: string;
}
