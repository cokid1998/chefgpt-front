import useGetAllVote from "@/hooks/API/vote/GET/useGetAllVote";
import VoteCarousel from "@/components/vote/voteList/VoteCarousel";
import VoteCarouselSkeleton from "@/components/vote/skeleton/VoteCarouselSkeleton";

export default function VoteList() {
  const { data: activeVoteList = [], isLoading: isActiveVoteLoading } =
    useGetAllVote("active");
  const { data: closeVoteList = [], isLoading: isCloseVoteLoading } =
    useGetAllVote("close");

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          진행 중인 투표
          <span className="ml-2 text-sm text-gray-500">
            ({activeVoteList.length}개)
          </span>
        </h2>

        {isActiveVoteLoading ? (
          <VoteCarouselSkeleton />
        ) : (
          <VoteCarousel data={activeVoteList} />
        )}
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          지난 투표
          <span className="ml-2 text-sm text-gray-500">
            ({closeVoteList.length}개)
          </span>
        </h2>

        {isCloseVoteLoading ? (
          <VoteCarouselSkeleton />
        ) : (
          <VoteCarousel data={closeVoteList} />
        )}
      </div>
    </div>
  );
}
