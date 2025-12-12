import { Button } from "@/components/ui/button";
import { Plus, Refrigerator } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Chatbot from "@/components/refrigerator/Chatbot";
import useGetFoods from "@/hooks/API/food/GET/useGetFoods";
import { useProfile } from "@/store/authStore";
import useGetCategory from "@/hooks/API/food/GET/useGetCategory";
import { useOpenModal } from "@/store/modalStore";
import CreateFoodModal from "@/components/modal/refrigerator/CreateFoodModal";
import FoodCard from "@/components/refrigerator/FoodCard";

function RefrigeratorPage() {
  const profile = useProfile();
  const { data: foodsData, isLoading } = useGetFoods(profile?.id!); // Todo: !를 써도 괜찮은걸까??
  const { data: foodsCategory } = useGetCategory();
  const openModal = useOpenModal();

  if (!foodsData || isLoading || !foodsCategory) return null; // Todo: 로딩처리

  return (
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
          <div className="grid grid-cols-4 gap-4">
            {foodsData.countConfig.map((count) => (
              <div
                key={count.key}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <p className="mb-1 text-sm text-gray-500">{count.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {count.value}개
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border p-6 shadow-sm">
            <InputGroup className="mb-4 h-12">
              <InputGroupInput placeholder="식재료 검색..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {foodsCategory?.map((category) => (
                <Badge
                  key={category.id}
                  variant={"outline"}
                  className="w-14 cursor-pointer border-green-200 px-3 py-1 text-sm font-medium text-gray-600 hover:border-green-400 hover:bg-green-50"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {foodsData?.foods.map((food) => (
              <FoodCard food={food} />
            ))}
          </div>
        </div>

        <Chatbot foods={foodsData.foods} />
      </div>
    </div>
  );
}

export default RefrigeratorPage;

/**
 * Todo:
 * 유통기한 필터링 하는 UI
 * 식재료 추가 모달
 * 식재료 수정 모달
 * queryKey 정규화
 * 분리시켜야할 컴포넌트의 기준을 정하고 분리
 */
