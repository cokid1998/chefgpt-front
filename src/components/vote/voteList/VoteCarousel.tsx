import { useState } from "react";
import DotIndicator from "@/components/common/DotIndicator";
import VoteCard from "@/components/vote/voteList/VoteCard";
import type { VoteType } from "@/types/voteType";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VoteCarouselProps {
  data: VoteType[];
}

export default function VoteCarousel({ data }: VoteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 3;
  const totalLength = Math.ceil(data.length / visibleCount);
  const maxGroupIndex = totalLength - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxGroupIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxGroupIndex ? 0 : prev + 1));
  };

  // Todo: 날짜 손봐야함

  return (
    <div className="relative w-full">
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -left-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 text-gray-500 shadow hover:shadow-lg"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 -right-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 text-gray-500 shadow hover:shadow-lg"
      >
        <ChevronRight />
      </button>

      <div className="mx-8 overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {data.map((item, index) => (
            <div key={item.id} className="min-w-1/3 p-2">
              <VoteCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <DotIndicator
          totalLength={totalLength}
          activeIndex={currentIndex + 1}
        />
      </div>
    </div>
  );
}
