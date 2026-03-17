import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DotIndicator from "@/components/common/DotIndicator";

interface RecipeStepNavigateProps {
  totalLength: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isRecipeIntro?: boolean;
}

export default function RecipeIndicator({
  totalLength,
  currentStep,
  setCurrentStep,
  isRecipeIntro = false,
}: RecipeStepNavigateProps) {
  const startStep = isRecipeIntro ? 0 : 1;

  const nextStep = () => {
    if (currentStep < totalLength) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > startStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={prevStep}
        disabled={currentStep === startStep}
        size="lg"
        className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
        이전
      </Button>

      <div className="text-center">
        <div className="mb-1 text-sm opacity-70">
          {isRecipeIntro && currentStep === 0
            ? "시작하기"
            : `${currentStep} / ${totalLength}`}
        </div>
        <DotIndicator
          totalLength={isRecipeIntro ? totalLength + 1 : totalLength}
          activeIndex={isRecipeIntro ? currentStep + 1 : currentStep}
        />
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
