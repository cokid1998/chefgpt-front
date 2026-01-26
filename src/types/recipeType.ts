export interface StepType {
  stepTitle: string;
  description: string;
  tip: string;
}

export interface RecipeInfoType {
  title: string;
  description: string;
  cookingTime: string;
  steps: StepType[];
}
