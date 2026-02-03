import { Badge } from "@/components/ui/badge";
import { Bot, Youtube, PenLine } from "lucide-react";
import AIRecipeForm from "@/components/recipe/RecipeCreateForm/AIRecipeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManualRecipeForm from "@/components/recipe/RecipeCreateForm/ManualRecipeForm";
import { useState } from "react";

export default function CreateRecipePage() {
  const [mode, setMode] = useState("manual");

  return (
    <>
      <title>ChefGPT | 레시피 생성</title>
      <div className="flex items-center justify-center bg-linear-to-b from-green-50 to-white py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          {mode === "youtube" ? <YoutubeModeHeader /> : <ManualModeHeader />}

          <Tabs
            value={mode}
            className="w-full"
            onValueChange={(mode) => setMode(mode)}
          >
            <TabsList className="mb-8 grid w-full grid-cols-2">
              <TabsTrigger
                value="youtube"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <Youtube className="mr-2 h-4 w-4" />
                유튜브로 생성
              </TabsTrigger>
              <TabsTrigger
                value="manual"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <PenLine className="mr-2 h-4 w-4" />
                직접 작성
              </TabsTrigger>
            </TabsList>

            <TabsContent value="youtube">
              <AIRecipeForm />
            </TabsContent>

            <TabsContent value="manual">
              <ManualRecipeForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

function YoutubeModeHeader() {
  return (
    <>
      <Badge className="mb-4 bg-green-200 px-4 py-2 text-green-600">
        <Bot className="size-4!" />
        <span className="text-sm font-medium text-green-600">
          AI기반 레시피 생성
        </span>
      </Badge>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        유튜브로 레시피 만들기
      </h1>

      <p className="mb-12 text-lg text-gray-600">
        유튜브 영상 URL을 입력하면 AI가 자동으로 단계별 레시피로 변환해드립니다
      </p>
    </>
  );
}

function ManualModeHeader() {
  return (
    <>
      <Badge className="mb-4 bg-green-200 px-4 py-2 text-green-600">
        <PenLine className="size-4!" />
        <span className="text-sm font-medium text-green-600">
          직접 레시피 작성하기
        </span>
      </Badge>
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        나만의 레시피 만들기
      </h1>

      <p className="mb-12 text-lg text-gray-600">
        당신만의 특별한 레시피를 직접 작성하고 다른 사람들과 공유해보세요
      </p>
    </>
  );
}
