import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const dummy = [
  {
    title: "김치찌개에 설탕을 넣는다?",
    desc: "김치찌개 맛의 비결",
    count: 81,
    time: "2025년 12월 26일",
    vote: "A",
  },
  {
    title: "김치찌개에 설탕을 넣는다?",
    desc: "김치찌개 맛의 비결",
    count: 81,
    time: "2025년 12월 26일",
    vote: "B",
  },
  {
    title: "김치찌개에 설탕을 넣는다?",
    desc: "김치찌개 맛의 비결",
    count: 81,
    time: "2025년 12월 26일",
    vote: "A",
  },
  {
    title: "김치찌개에 설탕을 넣는다?",
    desc: "김치찌개 맛의 비결",
    count: 81,
    time: "2025년 12월 26일",
    vote: "B",
  },
  {
    title: "김치찌개에 설탕을 넣는다?",
    desc: "김치찌개 맛의 비결",
    count: 81,
    time: "2025년 12월 26일",
    vote: "A",
  },
];

export default function MyInfoVoteTab() {
  return (
    <div className="border-none shadow-lg">
      {/* Todo: 내가 만든 투표 리스트도 보여줘야함 */}
      내가 만든 투표 리스트도 보여줘야함
      <div>
        <div>내 투표 기록 (4444개)</div>
      </div>
      <div>
        <div className="py-12 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <p className="text-gray-500">아직 참여한 투표가 없습니다</p>
        </div>

        <div className="space-y-4">
          {dummy.map((poll, index) => {
            // const myVote = votes.find((v) => v.poll_id === poll.id);
            return (
              <div
                key={index}
                className="rounded-xl border border-green-100 p-4 transition-all hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {poll.title}
                    </h3>
                    <p className="text-sm text-gray-600">{poll.title}</p>
                  </div>
                  <Badge
                    className={
                      poll?.vote === "A" ? "bg-green-500" : "bg-blue-500"
                    }
                  >
                    {poll.vote}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>총 {poll.count}표</span>
                  <span>•</span>
                  <span>
                    {/* {format(new Date(myVote?.created_date), "PPP", {
                        locale: ko,
                      })} */}
                    {poll.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
