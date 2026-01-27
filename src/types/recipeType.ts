export interface StepType {
  stepTitle: string;
  description: string;
  tip: string;
}

export interface IngredientType {
  name: string;
  amount: string;
}

export interface RecipeInfoType {
  category: string;
  title: string;
  description: string;
  cookingTime: string;
  steps: StepType[];
  ingredients: IngredientType[];
}
