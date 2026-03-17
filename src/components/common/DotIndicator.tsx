interface DotIndicatorProps {
  totalLength: number;
  activeIndex: number;
}

export default function DotIndicator({
  totalLength,
  activeIndex,
}: DotIndicatorProps) {
  return (
    <div className="flex gap-1">
      {[...Array(totalLength)].map((_, i) => {
        return (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i + 1 === activeIndex ? "w-8 bg-green-500" : "w-2 bg-black/30"
            }`}
          />
        );
      })}
    </div>
  );
}
