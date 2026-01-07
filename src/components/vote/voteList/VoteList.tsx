import VoteCard from "@/components/vote/voteList/VoteCard";
import VoteCardSkeleton from "@/components/vote/skeleton/VoteCardSkeleton";
import useGetAllVote from "@/hooks/API/vote/GET/useGetAllVote";

export default function VoteList() {
  const { data: activeVoteList, isLoading: activeVoteListLoading } =
    useGetAllVote("active");
  const { data: closeVoteList, isLoading: closeVoteListLoading } =
    useGetAllVote("close");

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          진행 중인 투표
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {activeVoteListLoading
            ? [...Array(3)].map((_, i) => <VoteCardSkeleton key={i} />)
            : activeVoteList?.map((item) => (
                <VoteCard key={item.title} {...item} />
              ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">지난 투표</h2>

        <div className="grid grid-cols-3 gap-6">
          {closeVoteListLoading
            ? [...Array(3)].map((_, i) => <VoteCardSkeleton key={i} />)
            : closeVoteList?.map((item) => (
                <VoteCard key={item.title} {...item} />
              ))}
        </div>
      </div>
    </div>
  );
}
