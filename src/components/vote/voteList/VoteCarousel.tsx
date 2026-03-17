import { useState } from "react";
import DotIndicator from "@/components/common/DotIndicator";
import VoteCard from "@/components/vote/voteList/VoteCard";
import type { VoteType } from "@/types/voteType";

interface VoteCarouselProps {
  data: VoteType[];
}

export default function VoteCarousel({ data }: VoteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);

  const visibleCount = 3;
  const totalLength = Math.ceil(data.length / visibleCount);
  const maxIndex = data.length - visibleCount;

  const handlePrev = () => {
    if (currentIndex === 1) return;

    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (currentIndex === totalLength) {
      setCurrentIndex(1);
      return;
    }

    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 1}
        className={`absolute top-1/2 -left-3 z-10 -translate-y-1/2 rounded-full bg-white px-3 py-2 shadow ${
          currentIndex === 1
            ? "cursor-default text-gray-200"
            : "cursor-pointer text-gray-500 shadow hover:shadow-lg"
        }`}
      >
        ◀
      </button>

      <button
        onClick={handleNext}
        className={`absolute top-1/2 -right-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white px-3 py-2 text-gray-500 shadow hover:shadow-lg`}
      >
        ▶
      </button>

      <div className="mx-8 overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {data.map((item) => (
            <div key={item.id} className="min-w-[33.3333%] p-2">
              <VoteCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <DotIndicator totalLength={totalLength} activeIndex={currentIndex} />
      </div>
    </div>
  );
}
