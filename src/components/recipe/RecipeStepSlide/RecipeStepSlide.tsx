import { Badge } from "@/components/ui/badge";
import type { StepType, YoutubeStepType } from "@/types/recipeType";
import { Lightbulb } from "lucide-react";
import YouTube from "react-youtube";
import { extractVideoId } from "@/components/recipe/RecipeIntro/RecipeHeader";
import defaultImage from "@/assets/image/default_recipe_thumbnail.png";

interface RecipeStepSlideProps {
  step: StepType | YoutubeStepType;
  currentStep: number;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  className?: string;
}

export default function RecipeStepSlide({
  step,
  currentStep,
  youtubeUrl,
  thumbnailUrl,
  className,
}: RecipeStepSlideProps) {
  return (
    <div
      className={`flex h-143 w-full flex-col justify-between rounded-xl border bg-gray-100 p-8 ${className}`}
    >
      <div className="grid h-1/2 grid-cols-2 gap-3">
        <div className="space-y-6">
          <Badge className="rounded-sm border-0 bg-green-500 text-lg text-white">
            단계 {currentStep}
          </Badge>

          <h1 className="mb-6 text-3xl leading-tight font-bold">
            {step.stepTitle}
          </h1>

          <p className="text-xl leading-relaxed text-gray-600">
            {step.description}
          </p>
        </div>

        {youtubeUrl ? (
          <YouTube
            videoId={extractVideoId(youtubeUrl)}
            className="h-full w-full"
            iframeClassName="w-full h-full"
          />
        ) : (
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
    <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6">
      <div className="flex items-start gap-3">
        <div>
          <h3 className="mb-2 flex items-center gap-1.5 font-semibold">
            <Lightbulb className="text-yellow-500" />
            <span className="text-lg">팁</span>
          </h3>
          <p className="leading-relaxed text-gray-600">{tip}</p>
        </div>
      </div>
    </div>
  );
}
