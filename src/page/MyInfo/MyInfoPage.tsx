import { Users, Plus, Pencil } from "lucide-react";
import VoteCount from "@/components/vote/voteCount/VoteCount";
import { Button } from "@/components/ui/button";
import VoteList from "@/components/vote/voteList/VoteList";
import { useOpenModal } from "@/store/modalStore";
import CreateVoteModal from "@/components/modal/vote/CreateVoteModal";
import { Badge } from "@/components/ui/badge";

export default function MyInfoPage() {
  return (
    <>
      <title>ChefGPT | 내 정보</title>

      <div className="bg-soft-green flex flex-col">
        <div className="bg-green-gradient">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-16">
            <div className="flex gap-6">
              <div className="size-28 rounded-3xl bg-red-200 shadow-2xl" />

              <div className="text-white/90">
                <h1 className="mb-2 text-4xl font-bold">이태관</h1>
                <p className="mb-4 text-lg">cokid98@gmail.com</p>
                <Badge className="rounded-md border-0 bg-white/20 px-4 py-1 text-xs font-semibold text-white shadow">
                  초보 요리사
                </Badge>
              </div>
            </div>

            <Button
              variant="outline"
              size={"lg"}
              className="text-green-600 hover:text-green-600"
              // onClick={() => openModal(<CreateVoteModal />)}
            >
              <Pencil />
              프로필 수정
            </Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-8 pb-8">
          {/* <VoteCount />

          <VoteList /> */}
        </div>
      </div>
    </>
  );
}
