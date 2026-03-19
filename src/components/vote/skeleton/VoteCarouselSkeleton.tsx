import VoteCardSkeleton from "@/components/vote/skeleton/VoteCardSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VoteCarouselSkeleton() {
  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 -left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 text-gray-500 shadow hover:shadow-lg md:-left-3 md:p-2">
        <ChevronLeft className="size-5" />
      </div>
      <div className="absolute top-1/2 -right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 text-gray-500 shadow hover:shadow-lg md:-right-3 md:p-2">
        <ChevronRight className="size-5" />
      </div>

      <div className="mx-4 overflow-hidden md:mx-8">
        <div className="flex flex-col gap-2 md:flex-row">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-full md:w-1/3">
              <VoteCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        <div className="h-2 w-5 animate-pulse rounded-full bg-gray-300" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-200" />
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
