import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import YouTube from "react-youtube";

interface RecipeHeaderProps {
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
}

export const extractVideoId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );

  if (!match) {
    throw new Error("Invalid YouTube URL");
  }

  return match[1];
};

export default function RecipeHeader({
  title,
  description,
  youtubeUrl,
  category,
}: RecipeHeaderProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <Badge className="mb-3 rounded-md bg-green-500">{category}</Badge>

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

      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <YouTube
          videoId={extractVideoId(youtubeUrl)}
          className="h-full w-full"
          iframeClassName="w-full h-full"
        />
      </div>
    </div>
  );
}
