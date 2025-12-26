import type { VoteOption } from "@/types/voteType";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VoteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selectedOptions: VoteOption;
  optionType: VoteOption;
  isEndVote: boolean;
  optionRatio: number;
  optionTitle: string;
}

export default function VoteButton({
  selectedOptions,
  optionType,
  isEndVote,
  optionRatio,
  optionTitle,
  ...props
}: VoteButtonProps) {
  return (
    <button
      className={`relative w-full overflow-hidden rounded-xl border-2 transition-all hover:border-green-400 hover:bg-green-50 ${
        optionType === selectedOptions
          ? "border-green-500 bg-green-50"
          : "border-gray-200 bg-gray-50"
      } ${isEndVote ? "pointer-events-none border-gray-200! bg-gray-50!" : "cursor-pointer"}`}
      {...props}
    >
      <div
        className={`absolute inset-y-0 left-0 ${
          isEndVote ? "bg-gray-200" : "bg-green-200"
        }`}
        style={{ width: `${optionRatio}%` }}
      />
      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {selectedOptions === optionType && !isEndVote && (
            <CheckCircle2 className={`size-5 text-green-600`} />
          )}

          <span className="font-medium text-gray-900">{optionTitle}</span>
        </div>
        <Badge
          className={`rounded-md ${isEndVote ? "bg-gray-500" : "bg-green-500"}`}
        >
          {optionRatio}%
        </Badge>
      </div>
    </button>
  );
}
