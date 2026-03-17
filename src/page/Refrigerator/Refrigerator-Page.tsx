import { Button } from "@/components/ui/button";
import { Plus, Refrigerator } from "lucide-react";
import Chatbot from "@/components/refrigerator/Chatbot";
import { useOpenModal } from "@/store/modalStore";
import CreateFoodModal from "@/components/modal/refrigerator/CreateFoodModal";
import FoodList from "@/components/refrigerator/foodList/FoodList";
import FoodCount from "@/components/refrigerator/foodCount/FoodCount";
import FoodSearchBar from "@/components/refrigerator/foodSearchBar/FoodSearchBar";

function RefrigeratorPage() {
  const openModal = useOpenModal();

  return (
    <>
      <title>ChefGPT | 내 냉장고</title>
      <div className="bg-soft-green flex flex-col">
        <div className="bg-green-gradient">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-8 md:flex-row md:items-center md:gap-0 md:px-8 md:py-16">
            <div className="flex flex-col">
              <div className="mb-3 flex items-center gap-3">
                <Refrigerator size={40} color="white" />
                <h1 className="text-2xl font-bold text-white md:text-4xl">
                  내 냉장고
                </h1>
              </div>
              <p className="text-lg text-white md:text-xl">
                냉장고 속 식재료를 관리하고 AI에게 레시피를 추천받으세요
              </p>
            </div>

            <Button
              variant="outline"
              size={"lg"}
              className="text-green-600 hover:text-green-600"
              onClick={() => openModal(<CreateFoodModal />)}
            >
              <Plus />
              식재료 추가
            </Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row md:justify-between md:px-8">
          <div className="flex w-full flex-col gap-8">
            <FoodCount />

            <FoodSearchBar />

            <FoodList />
          </div>
          <Chatbot />
        </div>
      </div>
    </>
  );
}

export default RefrigeratorPage;
