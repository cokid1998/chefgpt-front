import { Input } from "@/components/ui/input";
import { Plus, Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { type LocationType } from "@/types/refrigeratorType";
import useGetCategory from "@/hooks/API/food/GET/useGetCategory";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCloseModal } from "@/store/modalStore";
import { switchLocationName } from "@/components/refrigerator/foodList/FoodCard";
import usePatchFood from "@/hooks/API/food/PATCH/usePatchFood";
import { toast } from "sonner";
import useGetOneFood from "@/hooks/API/food/GET/useGetOneFood";
import dayjs from "dayjs";

const location: LocationType[] = ["COLD", "FROZEN", "ROOM_TEMP"];

/**
 * Todo: API를 요청해서 초기값을 세팅하지말고
 * 내 냉장고 페이지에서 캐싱한 food데이터를 활용하는방법을 찾기
 * keyword: 쿼리키 정규화?
 *
 * Todo: CreateFoodModal 컴포넌트와 합칠수 있는 방법은 없을까
 */
export default function UpdateFoodModal({ foodId }: { foodId: number }) {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    quantity: "",
    unit: "",
    expiration_date: "",
    location: "COLD" as LocationType,
    memo: "",
  });
  const closeModal = useCloseModal();

  const { data: food, isLoading } = useGetOneFood(foodId);
  const { data: foodsCategory } = useGetCategory();
  const { mutate: updateFood, isPending } = usePatchFood();

  useEffect(() => {
    if (food) {
      const {
        name,
        category,
        quantity,
        unit,
        expiration_date,
        location,
        memo,
      } = food;

      setFormData({
        name: name,
        categoryId: String(category.id),
        quantity: String(quantity),
        unit: unit ?? "",
        expiration_date: dayjs(expiration_date).format("YYYY-MM-DD") ?? "",
        location: location ?? "COLD",
        memo: memo ?? "",
      });
    }
  }, [food]);

  const handleUpdateFood = () => {
    if (!food) return;

    if (!formData.name || !formData.categoryId) {
      toast.error("이름 또는 카테고리는 필수 입력값입니다.");
      return;
    }

    const formatPayload = {
      ...formData,
      quantity: Number(formData.quantity),
      categoryId: Number(formData.categoryId),
      expiration_date: new Date(formData.expiration_date),
    };
    updateFood({ foodId: food?.id, payload: formatPayload });
  };

  if (isLoading) return null;

  return (
    <div className="w-xl rounded-sm bg-white p-6">
      <div className="flex items-center gap-2 text-2xl">
        <Plus className="h-6 w-6 text-green-500" />
        식재료 수정
      </div>

      <div className="space-y-5 pt-4">
        <div>
          <div className="text-base font-semibold">식재료 이름 *</div>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="예: 양배추"
            className="mt-2 h-12"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-base font-semibold">카테고리 *</div>
            <Select
              value={formData.categoryId}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: value })
              }
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {foodsCategory?.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="text-base font-semibold">보관 위치</div>
            <Select
              value={formData.location}
              onValueChange={(value: LocationType) =>
                setFormData({ ...formData, location: value })
              }
            >
              <SelectTrigger className="mt-2 h-12 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {location.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {switchLocationName(loc)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-base font-semibold">수량</div>
            <Input
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="예: 1"
              className="mt-2 h-12"
            />
          </div>

          <div>
            <div className="text-base font-semibold">단위</div>
            <Input
              value={formData.unit}
              onChange={(e) =>
                setFormData({ ...formData, unit: e.target.value })
              }
              placeholder="예: 개, kg, g"
              className="mt-2 h-12"
            />
          </div>
        </div>
        <div>
          <div className="text-base font-semibold">유통기한</div>
          <Input
            type="date"
            value={formData.expiration_date}
            onChange={(e) =>
              setFormData({ ...formData, expiration_date: e.target.value })
            }
            className="mt-2 h-12"
          />
        </div>

        <div>
          <div className="text-base font-semibold">메모</div>
          <Textarea
            value={formData.memo}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            placeholder="추가 메모사항"
            className="mt-2 h-20 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => closeModal()}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-green-gradient"
            onClick={handleUpdateFood}
          >
            {isPending && <Loader className="animate-spin" />}
            {isPending ? "추가 중..." : "식재료 수정"}
          </Button>
        </div>
      </div>
    </div>
  );
}
