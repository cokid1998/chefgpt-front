interface DotIndicatorProps {
  hasIntro?: boolean;
  totalLength: number;
  activeStep: number;
}

export default function DotIndicator({
  hasIntro,
  totalLength,
  activeStep,
}: DotIndicatorProps) {
  return (
    <div className="flex gap-1">
      {[...Array(totalLength)].map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all ${
            (hasIntro ? i === activeStep : i + 1 === activeStep)
              ? "w-8 bg-green-500"
              : "w-2 bg-black/30"
          }`}
        />
      ))}
    </div>
  );
}
