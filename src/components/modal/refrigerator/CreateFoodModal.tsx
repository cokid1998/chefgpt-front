import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { type FoodType } from "@/types/refrigeratorType";
import useGetCategory from "@/hooks/API/food/GET/useGetCategory";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCloseModal } from "@/store/modalStore";
import { switchLocationName } from "@/page/RefrigeratorPage";

const location: FoodType["location"][] = ["COLD", "FROZEN", "ROOM_TEMP"];

export default function CreateFoodModal() {
  const closeModal = useCloseModal();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expirationDate: "",
    location: "COLD",
    memo: "",
  });

  const { data: foodsCategory } = useGetCategory();

  return (
    <div className="w-xl rounded-sm bg-white p-6">
      <div className="flex items-center gap-2 text-2xl">
        <Plus className="h-6 w-6 text-green-500" />
        식재료 추가
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
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {foodsCategory?.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
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
              onValueChange={(value) =>
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
              id="quantity"
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
              id="unit"
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
            value={formData.expirationDate}
            onChange={(e) =>
              setFormData({ ...formData, expirationDate: e.target.value })
            }
            className="mt-2 h-12"
          />
        </div>

        <div>
          <div className="text-base font-semibold">메모</div>
          <Textarea
            id="memo"
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
            // disabled={createMutation.isLoading}
          >
            취소
          </Button>
          <Button
            type="submit"
            // disabled={createMutation.isLoading}
            className="bg-green-gradient"
          >
            식재료 추가
            {/* {createMutation.isLoading ? "추가 중..." : "식재료 추가"} */}
          </Button>
        </div>
      </div>
    </div>
  );
}
