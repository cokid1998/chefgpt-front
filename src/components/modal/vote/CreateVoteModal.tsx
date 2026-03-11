import { useCloseModal, useOpenModal } from "@/store/modalStore";
import { Vote, X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import usePostVote from "@/hooks/API/vote/POST/usePostVote";
import { useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";

/**
 * 이 모달은 로그인한 사용자만 나와야함
 */
export default function CreateVoteModal() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    optionA: "",
    optionB: "",
    endDate: "",
  });
  const closeModal = useCloseModal();

  const { mutate: createVote, isPending } = usePostVote();

  const handleCreateVote = () => {
    const { title, optionA, optionB, endDate } = formData;
    const now = dayjs();

    if (!title) {
      toast.error("투표 제목을 입력해주세요");
      return;
    } else if (!optionA || !optionB) {
      toast.error("옵션을 모두 입력해주세요");
      return;
    }

    const formatFormData = {
      ...formData,
      startDate: now.format("YYYY-MM-DD"),
      endDate: !endDate ? now.add(7, "day").format("YYYY-MM-DD") : endDate,
    };

    createVote(formatFormData);
  };

  return (
    <div className="w-96 max-w-xl rounded-sm bg-white p-4 md:mx-0 md:w-full md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg md:text-2xl">
          <Vote className="size-5 text-green-500 md:size-6" />새 투표 만들기
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

      <div className="space-y-4 pt-4 md:space-y-5">
        <div>
          <div className="text-sm font-semibold md:text-base">투표 제목 *</div>
          <Input
            className="mt-2 h-12"
            placeholder="예: MSG는 몸에 나쁘다?"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div>
          <div className="text-sm font-semibold md:text-base">설명 (선택)</div>
          <Textarea
            className="mt-2 resize-none"
            placeholder="투표에 대한 설명을 입력하세요"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-semibold md:text-base">옵션 A *</div>
            <Input
              className="mt-2 h-12"
              placeholder="예: 그렇다"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, optionA: e.target.value }))
              }
            />
          </div>

          <div>
            <div className="text-sm font-semibold md:text-base">옵션 B *</div>
            <Input
              className="mt-2 h-12"
              placeholder="예: 아니다"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, optionB: e.target.value }))
              }
            />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold md:text-base">
            종료일 (선택하지않으면 7일로 설정)
          </div>
          <Input
            type="date"
            className="mt-2 h-12 md:h-12"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            type="button"
            className="bg-green-gradient"
            onClick={handleCreateVote}
            disabled={isPending}
          >
            {isPending && <Loader className="animate-spin" />}
            {isPending ? "추가 중..." : "투표 만들기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
