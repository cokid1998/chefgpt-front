import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecipeNavigate() {
  return (
    <div className="mt-8 flex items-center justify-between">
      <Button
        // onClick={prevStep}
        // disabled={currentStep === 0}
        size="lg"
        className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-30"
        // disabled
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        이전
      </Button>

      <div className="text-center">
        <div className="mb-1 text-sm opacity-70">
          {/* {currentStep === 0 ? "시작하기" : `${currentStep} / ${totalSteps}`} */}
          시작하기
        </div>
        <div className="flex gap-1">
          {/* {[...Array(totalSteps + 1)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        i === currentStep ? "w-8 bg-orange-500" : "w-1 bg-white/30"
                      }`}
                    />
                  ))} */}
          {[...Array(3 + 1)].map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === 1 ? "w-8 bg-green-500" : "w-1 bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>

      <Button
        // onClick={nextStep}
        // disabled={currentStep >= totalSteps}
        size="lg"
        className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-30"
        // disabled
      >
        다음
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
