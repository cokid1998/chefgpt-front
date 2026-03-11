import { Badge } from "@/components/ui/badge";
import type {
  StepType,
  YoutubeStepType,
  RecipeSource,
} from "@/types/recipeType";
import { Lightbulb } from "lucide-react";
import YouTube from "react-youtube";
import { extractVideoId } from "@/components/recipe/RecipeIntro/RecipeHeader";
import defaultImage from "@/assets/image/default_recipe_thumbnail.png";

interface RecipeStepSlideProps {
  step: StepType | YoutubeStepType;
  currentStep: number;
  recipeSource?: RecipeSource;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  className?: string;
  youtubeId?: string | null;
}

export default function RecipeStepSlide({
  step,
  currentStep,
  youtubeUrl,
  thumbnailUrl,
  className,
  recipeSource,
  youtubeId,
}: RecipeStepSlideProps) {
  return (
    <div
      className={`flex h-full w-full flex-col justify-between gap-2 rounded-xl bg-gray-100 p-4 md:h-143 md:p-8 ${className}`}
    >
      <div className="grid grid-cols-1 gap-3 md:h-1/2 md:grid-cols-2">
        <div className="space-y-4 md:space-y-6">
          <Badge className="rounded-sm border-0 bg-green-500 text-sm text-white md:text-lg">
            단계 {currentStep}
          </Badge>

          <h1 className="mb-4 text-lg leading-tight font-bold md:mb-6 md:text-3xl">
            {step.stepTitle}
          </h1>

          <p className="text-base leading-relaxed text-gray-600 md:text-xl">
            {step.description}
          </p>
        </div>

        {youtubeUrl ? (
          // 레시피를 저장하기 전 모달에서 보여주는 UI
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <YouTube
              videoId={extractVideoId(youtubeUrl)}
              className="h-full w-full"
              iframeClassName="w-full h-full"
            />
          </div>
        ) : recipeSource === "YOUTUBE" && youtubeId !== null ? (
          // 유튜브를 통해 만들어진 레시피 상세페이지에서 보여주는 UI
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <YouTube
              videoId={youtubeId}
              className="h-full w-full"
              iframeClassName="w-full h-full"
            />
          </div>
        ) : (
          // 직접입력으로 만들어진 레시피 상세페이지에서 보여주는 UI
          <img
            src={thumbnailUrl || defaultImage}
            className="aspect-video rounded-sm border object-cover"
          />
        )}
      </div>

      <TipBox tip={step.tip} />
    </div>
  );
}

function TipBox({ tip }: { tip: string }) {
  return (
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-3 md:p-6">
      <div className="flex items-start gap-3">
        <div>
          <h3 className="mb-2 flex items-center gap-1.5 font-semibold">
            <Lightbulb className="text-yellow-500" />
            <span className="text-sm md:text-lg">팁</span>
          </h3>
          <p className="leading-relaxed text-gray-600">{tip}</p>
        </div>
      </div>
    </div>
  );
}
