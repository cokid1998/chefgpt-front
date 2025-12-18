import { Button } from "@/components/ui/button";
import { Plus, Refrigerator } from "lucide-react";
import Chatbot from "@/components/refrigerator/Chatbot";
import useGetAllFood from "@/hooks/API/food/GET/useGetAllFood";
import { useOpenModal } from "@/store/modalStore";
import CreateFoodModal from "@/components/modal/refrigerator/CreateFoodModal";
import { useState } from "react";
import FoodList from "@/components/refrigerator/foodList/FoodList";
import FoodCount from "@/components/refrigerator/foodCount/FoodCount";
import FoodSearchBar from "@/components/refrigerator/foodSearchBar/FoodSearchBar";

function RefrigeratorPage() {
  const openModal = useOpenModal();
  const [selectCategory, setSelectCategory] = useState("전체");
  const [search, setSearch] = useState("");

  const { data: foodIds = [], isLoading: isFoodsLoading } = useGetAllFood(
    selectCategory,
    search,
  );

  const handleCategoryClick = (category: string) => {
    setSelectCategory(category);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
  };

  return (
    <>
      <title>ChefGPT | 내 냉장고</title>
      <div className="flex flex-col">
        <div className="bg-green-gradient">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-12">
            <div className="flex flex-col">
              <div className="mb-3 flex gap-3">
                <Refrigerator size={40} color="white" />
                <h1 className="text-4xl font-bold text-white">내 냉장고</h1>
              </div>
              <p className="text-xl text-white">
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

        <div className="mx-auto flex w-full max-w-7xl justify-between gap-8 px-8 py-8">
          <div className="flex w-full flex-col gap-8">
            <FoodCount />

            <FoodSearchBar
              selectCategory={selectCategory}
              onSearchKeyDown={handleSearchKeyDown}
              onCategoryClick={handleCategoryClick}
            />

            <FoodList foodIds={foodIds} isFoodsLoading={isFoodsLoading} />
          </div>

          <Chatbot />
        </div>
      </div>
    </>
  );
}

export default RefrigeratorPage;
