import { Button } from "@/components/ui/button";
import { LOGIN_URL } from "@/constants/Url";
import { useCloseModal } from "@/store/modalStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

export default function LoggedModal() {
  const nav = useNavigate();
  const closeModal = useCloseModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const handleLoginModal = () => {
    closeModal();
    nav(LOGIN_URL);
  };

  return (
    <div className="flex w-xl flex-col rounded-sm bg-white p-6">
      <h1 className="mb-8 flex justify-between text-2xl font-bold">
        로그인이 필요한 페이지입니다.
        <X onClick={handleCloseModal} className="cursor-pointer" />
      </h1>

      <div className="mb-8">
        로그인을 원하지 않는경우
        <br />
        '돌아가기' 버튼을 눌러주세요.
      </div>

      <div className="flex justify-end gap-4">
        <Button variant={"outline"} onClick={handleCloseModal}>
          돌아가기
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-500/90"
          onClick={handleLoginModal}
        >
          로그인하기
        </Button>
      </div>
    </div>
  );
}
