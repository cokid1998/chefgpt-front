import { Users, Plus } from "lucide-react";
import VoteCount from "@/components/vote/voteCount/VoteCount";
import { Button } from "@/components/ui/button";
import VoteList from "@/components/vote/voteList/VoteList";
import { useOpenModal } from "@/store/modalStore";
import CreateVoteModal from "@/components/modal/vote/CreateVoteModal";

export default function VotePage() {
  const openModal = useOpenModal();

  return (
    <>
      <title>ChefGPT | 투표</title>
      <div className="bg-soft-green flex flex-col">
        <div className="bg-green-gradient">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:gap-0 md:px-8 md:py-16">
            <div className="flex flex-col">
              <div className="mb-3 flex items-center gap-3">
                <Users size={40} color="white" />
                <h1 className="text-2xl font-bold text-white md:text-4xl">
                  요리 투표
                </h1>
              </div>
              <p className="text-lg text-white md:text-xl">
                요리에 대한 여러분의 생각을 공유하고 투표해보세요
              </p>
            </div>
            <Button
              variant="outline"
              size={"lg"}
              className="w-full text-green-600 hover:text-green-600 md:w-auto"
              onClick={() => openModal(<CreateVoteModal />)}
            >
              <Plus />
              투표 만들기
            </Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-8 md:px-8">
          <VoteCount />

          <VoteList />
        </div>
      </div>
    </>
  );
}
