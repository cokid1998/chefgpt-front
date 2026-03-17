import VoteCard from "@/components/vote/voteList/VoteCard";
import VoteCardSkeleton from "@/components/vote/skeleton/VoteCardSkeleton";
import useGetAllVote from "@/hooks/API/vote/GET/useGetAllVote";
import VoteCarousel from "@/components/vote/voteList/VoteCarousel";

export default function VoteList() {
  const { data: activeVoteList = [], isLoading: isActiveVoteLoading } =
    useGetAllVote("active");
  const { data: closeVoteList, isLoading: closeVoteListLoading } =
    useGetAllVote("close");

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          진행 중인 투표
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
        <h2 className="mb-6 text-2xl font-bold text-gray-900">지난 투표</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {closeVoteListLoading
            ? [...Array(3)].map((_, i) => <VoteCardSkeleton key={i} />)
            : closeVoteList?.map((item) => (
                <VoteCard key={item.id} {...item} />
              ))}
        </div>
      </div>
    </div>
  );
}
