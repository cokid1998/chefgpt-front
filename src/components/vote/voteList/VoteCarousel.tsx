import { useState, useRef } from "react";
import DotIndicator from "@/components/common/DotIndicator";
import VoteCard from "@/components/vote/voteList/VoteCard";
import type { VoteType } from "@/types/voteType";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VoteCarouselProps {
  data: VoteType[];
}

export default function VoteCarousel({ data }: VoteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const visibleCount = 3;
  const totalLength = Math.ceil(data.length / visibleCount);
  const maxGroupIndex = totalLength - 1;

  const groupedData = Array.from({ length: totalLength }, (_, i) =>
    data.slice(i * visibleCount, i * visibleCount + visibleCount),
  );

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? maxGroupIndex : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === maxGroupIndex ? 0 : prev + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? handleNext() : handlePrev();
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 text-gray-500 shadow hover:shadow-lg md:-left-3 md:p-2"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 -right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 text-gray-500 shadow hover:shadow-lg md:-right-3 md:p-2"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* 슬라이드 */}
      <div
        className="mx-4 overflow-hidden md:mx-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {groupedData.map((group, groupIndex) => (
            <div key={groupIndex} className="min-w-full">
              <div className="flex flex-col gap-2 md:flex-row">
                {group.map((item) => (
                  <div key={item.id} className="w-full md:w-1/3">
                    <VoteCard {...item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <DotIndicator
          totalLength={totalLength}
          activeIndex={currentIndex + 1}
        />
      </div>
    </div>
  );
}
