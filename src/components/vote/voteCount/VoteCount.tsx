import { Users, Vote, TrendingUp } from "lucide-react";
import useGetVoteCount from "@/hooks/API/vote/GET/useGetVoteCount";

/**
 * Todo: 로딩처리
 */
export default function VoteCount() {
  const { data: voteCount, isLoading } = useGetVoteCount();

  return (
    <div className="-mt-8 grid w-full grid-cols-3 gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-orange-100 p-3">
            <Vote className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">전체 투표</p>
            <p className="text-2xl font-bold text-gray-900">
              {voteCount?.totalVoteCount}개
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-green-100 p-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">진행 중</p>
            <p className="text-2xl font-bold text-gray-900">
              {voteCount?.activeVoteCount}개
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-purple-100 p-3">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">총 참여</p>
            <p className="text-2xl font-bold text-gray-900">
              {voteCount?.totalParticipants}명
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
