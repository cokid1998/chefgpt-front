import { Pencil } from "lucide-react";
import VoteCount from "@/components/vote/voteCount/VoteCount";
import { Button } from "@/components/ui/button";
import VoteList from "@/components/vote/voteList/VoteList";
import { useOpenModal } from "@/store/modalStore";
import UpdateMyInfoModal from "@/components/modal/myinfo/UpdateMyInfoModal";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/store/authStore";

function DefaultThumbnail() {
  const profile = useProfile();

  return (
    <div className="flex size-28 items-center justify-center rounded-3xl bg-white shadow-2xl">
      <span className="text-5xl font-bold text-green-500">
        {profile?.thumbnail || profile?.nickname.slice(0, 1)}
      </span>
    </div>
  );
}

export default function MyInfoPage() {
  const openModal = useOpenModal();
  const profile = useProfile();

  return (
    <>
      <title>ChefGPT | 내 정보</title>

      <div className="bg-soft-green flex flex-col">
        <div className="bg-green-gradient">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-16">
            <div className="flex gap-6">
              {profile?.thumbnail ? null : <DefaultThumbnail />}

              <div className="flex flex-col justify-between text-white/90">
                <h1 className="text-4xl font-bold">{profile?.nickname}</h1>
                <p className="text-lg">{profile?.email}</p>
                <Badge className="rounded-md border-0 bg-white/20 px-4 py-1 text-xs font-semibold text-white shadow">
                  초보 요리사
                </Badge>
              </div>
            </div>

            <Button
              variant="outline"
              size={"lg"}
              className="text-green-600 hover:text-green-600"
              onClick={() => openModal(<UpdateMyInfoModal />)}
            >
              <Pencil />
              프로필 수정
            </Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-8 pb-8">
          <VoteCount />

          <VoteList />
        </div>
      </div>
    </>
  );
}
