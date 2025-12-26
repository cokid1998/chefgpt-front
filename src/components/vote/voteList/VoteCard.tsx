import { CheckCircle2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VoteOption, VoteType } from "@/types/voteType";
import dayjs from "dayjs";
import usePostSubmitVote from "@/hooks/API/vote/POST/usePostSubmitVote";

const formatDday = (endDate: string) => {
  const formatEndDate = dayjs(endDate).startOf("day");
  const diff = formatEndDate.diff(dayjs().startOf("day"), "day");

  if (diff === 0) {
    return "오늘";
  } else if (diff < 0) {
    return "종료";
  } else {
    return `D-${diff}`;
  }
};

export default function VoteCard({
  id,
  title,
  description,
  optionA,
  optionB,
  startDate,
  endDate,
  selectedOptions,
  participantsCount,
  optionARatio,
  optionBRatio,
}: VoteType) {
  const { mutate: submitVote } = usePostSubmitVote();

  const handleSubmitVote = (voteId: number, optionName: VoteOption) => {
    if (!optionName) return;

    submitVote({ voteId, optionName });
  };

  const now = dayjs();
  const isEndVote = dayjs(endDate).isBefore(now);
  console.log(optionARatio);
  console.log(optionBRatio);

  return (
    <div
      className={`rounded-xl border p-6 shadow transition-all ${
        isEndVote
          ? "bg-gray-50"
          : "bg-white hover:border-green-300 hover:shadow-xl"
      }`}
    >
      <div className="flex items-start justify-between">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
          {title}
        </h3>
        <Badge
          className={`rounded-md ${isEndVote ? "bg-gray-500" : "bg-green-500"}`}
        >
          {formatDday(endDate)}
        </Badge>
      </div>
      <p className="mb-4 line-clamp-2 text-sm text-gray-500">{description}</p>

      <div className="mb-4 space-y-3">
        <button
          onClick={() => handleSubmitVote(id, "A")}
          className={`relative w-full overflow-hidden rounded-xl border-2 transition-all hover:border-green-400 hover:bg-green-50 ${
            selectedOptions === "A"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-gray-50"
          } ${isEndVote ? "pointer-events-none border-gray-200! bg-gray-50!" : "cursor-pointer"}`}
        >
          <div
            className={`absolute inset-y-0 left-0 ${
              isEndVote ? "bg-gray-200" : "bg-green-200"
            }`}
            style={{ width: `${optionARatio}%` }}
          />
          <div className="relative flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              {selectedOptions === "A" && !isEndVote && (
                <CheckCircle2
                  className={`size-5 ${selectedOptions === "A" ? "text-green-600" : ""}`}
                />
              )}

              <span className="font-medium text-gray-900">{optionA}</span>
            </div>
            <Badge
              className={`rounded-md ${
                isEndVote ? "bg-gray-500" : "bg-green-500"
              }`}
            >
              {optionARatio}%
            </Badge>
          </div>
        </button>

        <button
          onClick={() => handleSubmitVote(id, "B")}
          className={`relative w-full cursor-pointer overflow-hidden rounded-xl border-2 transition-all hover:border-green-400 hover:bg-green-50 ${
            selectedOptions === "B"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-gray-50"
          } ${isEndVote ? "pointer-events-none border-gray-200! bg-gray-50!" : ""}`}
        >
          <div
            className={`absolute inset-y-0 left-0 ${
              isEndVote ? "bg-gray-200" : "bg-green-200"
            }`}
            style={{ width: `${optionBRatio}%` }}
          />

          <div className="relative flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              {selectedOptions === "B" && !isEndVote && (
                <CheckCircle2
                  className={`size-5 ${selectedOptions === "B" ? "text-green-600" : ""}`}
                />
              )}

              <span className="font-medium text-gray-900">{optionB}</span>
            </div>
            <Badge
              className={`rounded-md ${
                isEndVote ? "bg-gray-500" : "bg-green-500"
              }`}
            >
              {optionBRatio}%
            </Badge>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1">
        <Users className="size-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          {participantsCount} 명 참여
        </span>
      </div>
    </div>
  );
}
