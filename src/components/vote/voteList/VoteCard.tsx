import { CheckCircle2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { VoteType } from "@/types/voteType";
import dayjs from "dayjs";

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
  title,
  description,
  optionA,
  optionB,
  startDate,
  endDate,
}: VoteType) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow transition-all hover:border-green-300 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
          {title}
        </h3>
        <Badge className="rounded-md bg-green-500">{formatDday(endDate)}</Badge>
      </div>
      <p className="mb-4 line-clamp-2 text-sm text-gray-500">{description}</p>

      <div className="mb-4 space-y-3">
        <button className="relative w-full cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50 transition-all hover:border-green-400 hover:bg-green-50">
          <div
            className="absolute inset-y-0 left-0 bg-green-200"
            // style={{ width: `${option.A.ratio}%` }}
          />
          <div className="relative flex items-center justify-between p-4">
            <span className="font-medium text-gray-900">{optionA}</span>
            <Badge className="rounded-md bg-green-500">
              {/* {option.A.ratio}% */}
              3%
            </Badge>
          </div>
        </button>

        <button className="relative w-full overflow-hidden rounded-xl border-2 border-green-500 bg-green-50 transition-all">
          <div
            className="absolute inset-y-0 left-0 bg-green-200"
            // style={{ width: `${option.B.ratio}%` }}
          />

          <div className="relative flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <span className="font-medium text-gray-900">{optionB}</span>
            </div>
            <Badge className="rounded-md bg-green-500">
              {/* {option.B.ratio}% */}
              3%
            </Badge>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1">
        <Users className="size-4 text-gray-500" />
        <span className="text-sm text-gray-500">0 명 참여</span>
      </div>
    </div>
  );
}
