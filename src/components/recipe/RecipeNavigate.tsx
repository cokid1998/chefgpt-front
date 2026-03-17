import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DotIndicator from "@/components/common/DotIndicator";

interface RecipeNavigateProps {
  totalLength: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  hasIntro?: boolean;
}

export default function RecipeNavigate({
  totalLength,
  currentStep,
  setCurrentStep,
  hasIntro = false,
}: RecipeNavigateProps) {
  const minStep = hasIntro ? 0 : 1;

  const nextStep = () => {
    if (currentStep < totalLength) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > minStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={prevStep}
        disabled={currentStep === minStep}
        size="lg"
        className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
        이전
      </Button>

      <div className="text-center">
        <div className="mb-1 text-sm opacity-70">
          {hasIntro && currentStep === 0
            ? "시작하기"
            : `${currentStep} / ${totalLength}`}
        </div>
        <DotIndicator
          totalLength={hasIntro ? totalLength + 1 : totalLength}
          activeStep={currentStep}
          hasIntro={hasIntro}
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
