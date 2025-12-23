import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DUMMY } from "@/components/vote/voteList/VoteList";

type VoteCardProps = (typeof DUMMY)[number];

export default function VoteCard({ title, desc, option }: VoteCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow transition-all hover:border-green-300 hover:shadow-xl">
      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900">
        {title}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm text-gray-500">{desc}</p>

      <div className="mb-4 space-y-3">
        <button className="relative w-full cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50 transition-all hover:border-green-400 hover:bg-green-50">
          <div
            className="absolute inset-y-0 left-0 bg-green-200"
            style={{ width: `${option.A.ratio}%` }}
          />
          <div className="relative flex items-center justify-between p-4">
            <span className="font-medium text-gray-900">{option.A.title}</span>
            <Badge className="rounded-md bg-green-500 text-white">
              {option.A.ratio}%
            </Badge>
          </div>
        </button>

        <button className="relative w-full overflow-hidden rounded-xl border-2 border-green-500 bg-green-50 transition-all">
          <div
            className="absolute inset-y-0 left-0 bg-green-200"
            style={{ width: `${option.B.ratio}%` }}
          />

          <div className="relative flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <span className="font-medium text-gray-900">
                {option.B.title}
              </span>
            </div>
            <Badge className="rounded-md bg-green-500 text-white">
              {option.B.ratio}%
            </Badge>
          </div>
        </button>
      </div>
    </div>
  );
}
