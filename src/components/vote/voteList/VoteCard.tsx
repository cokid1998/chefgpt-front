import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VoteOption, VoteType } from "@/types/voteType";
import dayjs from "dayjs";
import usePostSubmitVote from "@/hooks/API/vote/POST/usePostSubmitVote";
import VoteButton from "@/components/vote/voteList/VoteButton";
import utc from "dayjs/plugin/utc";

const formatDday = (endDate: string) => {
  dayjs.extend(utc);
  const formatEndDate = dayjs.utc(endDate).startOf("day");
  const diff = formatEndDate.diff(dayjs.utc().startOf("day"), "day");

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

  return (
    <div className="px-2 md:px-0">
      <div
        className={`flex flex-col rounded-xl border p-3 shadow transition-all md:min-h-[310px] md:p-6 ${
          isEndVote
            ? "bg-gray-50"
            : "bg-white hover:border-green-300 hover:shadow-xl"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="mb-1 line-clamp-2 text-sm font-bold text-gray-900 md:mb-2 md:text-lg">
            {title}
          </h3>
          <Badge
            className={`shrink-0 rounded-md text-xs md:text-sm ${
              isEndVote ? "bg-gray-500" : "bg-green-500"
            }`}
          >
            {formatDday(endDate)}
          </Badge>
        </div>

        <p className="mb-3 line-clamp-2 text-xs text-gray-500 md:text-sm">
          {description}
        </p>

        <div className="mb-3 space-y-2 md:mb-4 md:space-y-3">
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

        <div className="mt-auto flex items-center gap-1">
          <Users className="size-3 text-gray-500 md:size-4" />
          <span className="text-xs text-gray-500 md:text-sm">
            {participantsCount} 명 참여
          </span>
        </div>
      </div>
    </div>
  );
}
