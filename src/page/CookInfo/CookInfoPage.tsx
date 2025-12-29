import { Plus, BookAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOpenModal } from "@/store/modalStore";
// import CookInfoSerachBar from "@/components/cook-info/CookInfoSerachBar";

export default function CookInfoPage() {
  const openModal = useOpenModal();

  return (
    <>
      <title>ChefGPT | 요리 정보</title>
      <div className="flex flex-col">
        <div className="bg-green-gradient">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-12">
            <div className="flex flex-col">
              <div className="mb-3 flex gap-3">
                <BookAlert size={40} color="white" />
                <h1 className="text-4xl font-bold text-white">요리 정보</h1>
              </div>
              <p className="text-xl text-white">
                요리에 도움이 되는 다양한 정보와 팁을 확인하세요
              </p>
            </div>

            <Button
              variant="outline"
              size={"lg"}
              className="text-green-600 hover:text-green-600"
              // onClick={() => openModal(<CreateFoodModal />)}
            >
              <Plus />글 작성
            </Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl justify-between gap-8 px-8 py-8">
          {/* <CookInfoSerachBar /> */}
        </div>
      </div>
    </>
  );
}
