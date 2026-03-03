import useGetMyCreateVote from "@/hooks/API/vote/GET/useGetMyCreateVote";
import useGetMyVoted from "@/hooks/API/vote/GET/useGetMyVoted";
import dayjs from "dayjs";

export default function MyInfoVoteTab() {
  const { data: createdVote } = useGetMyCreateVote();
  const { data: voted } = useGetMyVoted();
  console.log(voted);

  //Todo: Skeleton UI

  return (
    <div className="rounded-lg border-none bg-white shadow-lg">
      {/* Todo: 내가 만든 투표 리스트도 보여줘야함 */}
      <div className="flex flex-col space-y-1.5 p-6 leading-none font-semibold tracking-tight">
        내가 만든 투표 ({createdVote?.length}개)
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-4">
          {createdVote?.map((vote) => {
            return (
              <div
                key={vote.id}
                className="rounded-xl border p-4 transition-all hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {vote.title}
                    </h3>
                    <p className="text-sm text-gray-600">{vote.description}</p>
                  </div>
                </div>

                {/* 옵션 A */}
                <div className="mb-3">
                  <div className="mb-1 flex justify-between text-sm font-medium text-gray-700">
                    <span>{vote.optionA}</span>
                    <span>{vote.optionACount}표</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-green-400 transition-all"
                      style={{
                        width: `${
                          vote.participantsCount === 0 ||
                          !vote.participantsCount
                            ? 0
                            : (vote.optionACount / vote.participantsCount) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* 옵션 B */}
                <div className="mb-4">
                  <div className="mb-1 flex justify-between text-sm font-medium text-gray-700">
                    <span>{vote.optionB}</span>
                    <span>{vote.optionBCount}표</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-blue-400 transition-all"
                      style={{
                        width: `${
                          vote.participantsCount === 0 ||
                          !vote.participantsCount
                            ? 0
                            : (vote.optionBCount / vote.participantsCount) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* 하단 정보 */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>총 {vote.participantsCount}명 참여</span>
                  <span>
                    {dayjs(vote?.startDate).format("YYYY년 MM월 DD일")}
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
