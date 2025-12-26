import { CheckCircle2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VoteOption, VoteType } from "@/types/voteType";
import dayjs from "dayjs";
import usePostSubmitVote from "@/hooks/API/vote/POST/usePostSubmitVote";
import VoteButton from "@/components/vote/voteList/VoteButton";

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

/**
 * Todo: Skeleton UI
 */
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
        <VoteButton
          selectedOptions={selectedOptions}
          optionType="A"
          isEndVote={isEndVote}
          optionRatio={optionARatio}
          optionTitle={optionA}
          onClick={() => handleSubmitVote(id, "A")}
        />

        <VoteButton
          selectedOptions={selectedOptions}
          optionType="B"
          isEndVote={isEndVote}
          optionRatio={optionBRatio}
          optionTitle={optionB}
          onClick={() => handleSubmitVote(id, "B")}
        />
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
