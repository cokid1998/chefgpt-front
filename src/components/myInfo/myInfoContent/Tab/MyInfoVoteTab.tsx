import useGetMyCreateVote, {
  type MyCreatedVote,
} from "@/hooks/API/vote/GET/useGetMyCreateVote";
import useGetMyVoted, {
  type MyVotedType,
} from "@/hooks/API/vote/GET/useGetMyVoted";
import dayjs from "dayjs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router";
import {
  CreatedVoteItemSkeleton,
  VotedItemSkeleton,
} from "@/components/myInfo/skeleton/vote/MyInfoVoteTabSkeleton";

const MY_INFO_VOTE_TYPE = {
  CREATED: { LABEL: "내 투표", VALUE: "created" },
  VOTED: { LABEL: "참여한 투표", VALUE: "voted" },
} as const;

interface MyInfoVoteTabProps {
  curTab: string;
}

export default function MyInfoVoteTab({ curTab }: MyInfoVoteTabProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curSelect =
    searchParams.get("select") ?? MY_INFO_VOTE_TYPE.CREATED.VALUE;
  const { data: createdVoteList = [], isLoading: myCreatedVoteListIsLoading } =
    useGetMyCreateVote();
  const { data: votedList = [], isLoading: myVotedListIsLoading } =
    useGetMyVoted(curSelect === MY_INFO_VOTE_TYPE.VOTED.VALUE);

  const handleSelectChange = (value: string) => {
    setSearchParams({ tab: curTab, select: value });
  };

  return (
    <div className="rounded-lg border-none bg-white shadow-lg">
      <div className="flex justify-between space-y-1.5 p-6 leading-none font-semibold tracking-tight">
        {curSelect === MY_INFO_VOTE_TYPE.CREATED.VALUE
          ? MY_INFO_VOTE_TYPE.CREATED.LABEL
          : MY_INFO_VOTE_TYPE.VOTED.LABEL}
        ({createdVoteList?.length}개)
        <Select
          value={curSelect}
          onValueChange={(value) => handleSelectChange(value)}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={MY_INFO_VOTE_TYPE.CREATED.VALUE}>
              {MY_INFO_VOTE_TYPE.CREATED.LABEL}
            </SelectItem>
            <SelectItem value={MY_INFO_VOTE_TYPE.VOTED.VALUE}>
              {MY_INFO_VOTE_TYPE.VOTED.LABEL}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-4">
          {curSelect === MY_INFO_VOTE_TYPE.CREATED.VALUE
            ? myCreatedVoteListIsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CreatedVoteItemSkeleton key={i} />
                ))
              : createdVoteList.map((vote) => (
                  <CreatedVoteItem key={vote.id} vote={vote} />
                ))
            : myVotedListIsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <VotedItemSkeleton key={i} />
                ))
              : votedList.map((vote) => (
                  <VotedItem key={vote.id} vote={vote} />
                ))}
        </div>
      </div>
    </div>
  );
}

function CreatedVoteItem({ vote }: { vote: MyCreatedVote }) {
  return (
    <div className="rounded-xl border p-4 transition-all hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 font-semibold text-gray-900">{vote.title}</h3>
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
                vote.participantsCount === 0 || !vote.participantsCount
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
                vote.participantsCount === 0 || !vote.participantsCount
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
        <span>{dayjs(vote?.startDate).format("YYYY년 MM월 DD일")}</span>
      </div>
    </div>
  );
}

function VotedItem({ vote }: { vote: MyVotedType }) {
  return (
    <div className="rounded-xl border p-4 transition-all hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 font-semibold text-gray-900">{vote.title}</h3>
          <p className="text-sm text-gray-600">{vote.description}</p>
        </div>
        <Badge
          className={
            vote.selectedOption === "A" ? "bg-green-500" : "bg-blue-500"
          }
        >
          {vote.selectedOptionName}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>총 {vote.participantsCount}표</span>
        <span>•</span>
        <span>{dayjs(vote?.startDate).format("YYYY년 MM월 DD일")}</span>
      </div>
    </div>
  );
}
