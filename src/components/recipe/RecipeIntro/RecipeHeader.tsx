import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface RecipeHeaderProps {
  title: string;
  description: string;
}

export default function RecipeHeader({
  title,
  description,
}: RecipeHeaderProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <Badge className="mb-3 rounded-md bg-green-500">양식</Badge>

          <h1 className="mb-4 text-4xl leading-tight font-bold">{title}</h1>
          <p className="text-lg leading-relaxed">{description}</p>
        </div>

        <div className="rounded-xl bg-black p-4">
          <div className="mb-1 flex items-center gap-2 text-green-400">
            <Clock className="size-4" />
            <span className="text-sm font-medium">조리 시간</span>
          </div>
          <p className="font-semibold text-white">20분</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="https://img.youtube.com/vi/sMFjET_qDLc/maxresdefault.jpg"
          alt="스파게티 알리오 올리오"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>
    </div>
  );
}
