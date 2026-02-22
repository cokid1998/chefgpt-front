import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type React from "react";

interface RecipeDetailNavigateProps {
  totalLength: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

// Todo: RecipeModalNavigate와 통합
export default function RecipeDetailNavigate({
  totalLength,
  currentStep,
  setCurrentStep,
}: RecipeDetailNavigateProps) {
  const nextStep = () => {
    if (currentStep < totalLength) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={prevStep}
        disabled={currentStep === 1}
        size="lg"
        className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
        이전
      </Button>

      <div className="text-center">
        <div className="mb-1 text-sm opacity-70">
          {currentStep} / {totalLength}
        </div>
        <div className="flex gap-1">
          {[...Array(totalLength)].map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i + 1 === currentStep ? "w-8 bg-green-500" : "w-2 bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>

      <Button
        onClick={nextStep}
        disabled={currentStep >= totalLength}
        size="lg"
        className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-30"
      >
        다음
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
