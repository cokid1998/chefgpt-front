import { useCloseModal } from "@/store/modalStore";
import { Vote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateVoteModal() {
  const closeModal = useCloseModal();

  return (
    <div className="w-xl rounded-sm bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl">
          <Vote className="h-6 w-6 text-green-500" />새 투표 만들기
        </div>
        <Button
          onClick={closeModal}
          variant="outline"
          size="icon-sm"
          className="rounded-full"
        >
          <X />
        </Button>
      </div>

      <div className="space-y-5 pt-4">
        <div>
          <div className="font-semibold">투표 제목 *</div>
          <Input className="mt-2 h-12" placeholder="예: MSG는 몸에 나쁘다?" />
        </div>

        <div>
          <div className="font-semibold">설명 (선택)</div>
          <Textarea
            className="mt-2 resize-none"
            placeholder="투표에 대한 설명을 입력하세요"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">옵션 A *</div>
            <Input className="mt-2 h-12" placeholder="예: 그렇다" />
          </div>

          <div>
            <div className="font-semibold">옵션 B *</div>
            <Input className="mt-2 h-12" placeholder="예: 아니다" />
          </div>
        </div>

        <div>
          <div className="font-semibold">
            종료일 (선택하지않으면 7일로 설정)
          </div>
          <Input type="date" className="mt-2 h-12" />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            // disabled
          >
            취소
          </Button>
          <Button
            type="button"
            className="bg-green-gradient"
            // onClick={}
            // disabled
          >
            투표 만들기
          </Button>
        </div>
      </div>
    </div>
  );
}
