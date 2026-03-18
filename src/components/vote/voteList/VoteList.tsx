import VoteCard from "@/components/vote/voteList/VoteCard";
import VoteCardSkeleton from "@/components/vote/skeleton/VoteCardSkeleton";
import useGetAllVote from "@/hooks/API/vote/GET/useGetAllVote";
import VoteCarousel from "@/components/vote/voteList/VoteCarousel";

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
          <div className="w-ful flex">
            {[...Array(3)].map((_, i) => (
              <VoteCardSkeleton key={i} />
            ))}
          </div>
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
          <div className="w-ful flex">
            {[...Array(3)].map((_, i) => (
              <VoteCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <VoteCarousel data={closeVoteList} />
        )}
      </div>
    </div>
  );
}
