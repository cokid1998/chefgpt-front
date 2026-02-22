export interface StepType {
  id: number;
  stepNumber: number;
  stepTitle: string;
  description: string;
  tip: string;
  recipeId: number;
}

export interface IngredientType {
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
  ingredients: IngredientType[];
}

export interface RecipeType {
  category: { id: number; name: string };
  cookingTime: string;
  description: string;
  id: number;
  title: string;
  viewCount: number;
  thumbnailUrl: string;
  recipeSteps: StepType[];
}

export interface RecipeCategoryType {
  id: number;
  name: string;
}
