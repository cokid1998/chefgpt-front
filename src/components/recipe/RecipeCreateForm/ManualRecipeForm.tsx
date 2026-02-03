import { Input } from "@/components/ui/input";
import { PenLine } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useGetRecipeCategory from "@/hooks/API/recipe/useGetRecipeCategory";

export default function ManualRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    cookingTime: "",
    ingredients: [{ name: "", amount: "" }],
    steps: [{ stepNumber: 1, stepTitle: "", tip: "", description: "" }],
  });

  const handleChangeFormData = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addIngredientField = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: "" }],
    }));
  };

  const delIngredientField = (index: number) => {
    console.log(index);
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (
    index: number,
    field: "name" | "amount",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient,
      ),
    }));
  };

  const addStepField = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          stepNumber: prev.steps.length + 1,
          stepTitle: "",
          tip: "",
          description: "",
        },
      ],
    }));
  };

  const delStepField = (index: number) => {
    const newSteps = formData.steps
      .filter((_, i) => i !== index)
      .map((step, i) => ({ ...step, stepNumber: i + 1 }));
    setFormData({ ...formData, steps: newSteps });
  };

  const updateStep = (
    index: number,
    field: "stepTitle" | "tip" | "description",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step,
      ),
    }));
  };

  const { data: categories } = useGetRecipeCategory();

  return (
    <div className="min-w-3xl overflow-hidden rounded-3xl border-none bg-white shadow-2xl">
      <div className="bg-linear-to-br from-green-400 to-emerald-500 p-8 text-white">
        <div className="flex items-center gap-3 text-2xl">
          <PenLine className="h-8 w-8" />
          직접 레시피 작성하기
        </div>
      </div>

      <div className="space-y-8 p-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              레시피 제목
            </label>
            <Input
              placeholder="예: 김치찌개"
              onChange={(e) => handleChangeFormData("title", e.target.value)}
              value={formData.title}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              설명
            </label>
            <Input
              placeholder="레시피에 대한 간단한 설명"
              onChange={(e) =>
                handleChangeFormData("description", e.target.value)
              }
              value={formData.description}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                카테고리
              </label>
              <Select
                onValueChange={(value) =>
                  handleChangeFormData("category", value)
                }
              >
                <SelectTrigger className="h-9! w-full">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>

                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                조리 시간
              </label>
              <Input
                placeholder="예: 30분"
                value={formData.cookingTime}
                onChange={(e) =>
                  handleChangeFormData("cookingTime", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">재료</h3>
            <Button
              onClick={addIngredientField}
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              + 재료 추가
            </Button>
          </div>
          <div className="space-y-3">
            {formData.ingredients.map((ingredient, index) => (
              <div className="flex gap-3" key={ingredient.name + index}>
                <>
                  <Input
                    placeholder="재료명"
                    className="flex-1"
                    value={ingredient.name}
                    onChange={(e) =>
                      updateIngredient(index, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="양"
                    className="w-32"
                    value={ingredient.amount}
                    onChange={(e) =>
                      updateIngredient(index, "amount", e.target.value)
                    }
                  />
                  {formData.ingredients.length > 1 && (
                    <Button
                      onClick={() => delIngredientField(index)}
                      variant="outline"
                      size="icon"
                    >
                      ✕
                    </Button>
                  )}
                </>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">조리 단계</h3>
            <Button
              onClick={addStepField}
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              + 단계 추가
            </Button>
          </div>

          <div className="space-y-6">
            {formData.steps.map((step, index) => (
              <div
                key={step.stepNumber}
                className="space-y-3 rounded-xl bg-gray-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-600">
                    단계 {step.stepNumber}
                  </span>
                  {formData.steps.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => delStepField(index)}
                      className="h-6"
                    >
                      삭제
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="단계 제목"
                  value={step.stepTitle}
                  onChange={(e) =>
                    updateStep(index, "stepTitle", e.target.value)
                  }
                />
                <Input
                  placeholder="자세한 설명"
                  value={step.description}
                  onChange={(e) =>
                    updateStep(index, "description", e.target.value)
                  }
                />
                <Input
                  placeholder="팁 (선택사항)"
                  value={step.tip}
                  onChange={(e) => updateStep(index, "tip", e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
