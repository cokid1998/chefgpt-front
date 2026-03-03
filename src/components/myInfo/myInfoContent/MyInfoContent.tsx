import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, CheckCircle2 } from "lucide-react";
import MyInfoRecipeTab from "@/components/myInfo/myInfoContent/Tab/MyInfoRecipeTab";
import MyInfoVoteTab from "@/components/myInfo/myInfoContent/Tab/MyInfoVoteTab";
import MyInfoArticleTab from "@/components/myInfo/myInfoContent/Tab/MyInfoArticleTab";
import { useSearchParams } from "react-router";

const MY_INFO_TAB = {
  RECIPE: "recipe",
  VOTE: "vote",
  ARTICLE: "article",
} as const;

export default function MyInfoContent() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 보여줄 탭
  const curTab = searchParams.get("tab") ?? MY_INFO_TAB.RECIPE;

  // 탭 변경 핸들러
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <Tabs value={curTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList className="border bg-white p-1 shadow-xs">
        <TabsTrigger
          value={MY_INFO_TAB.RECIPE}
          className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
        >
          <ChefHat className="mr-2 h-4 w-4" />내 레시피
        </TabsTrigger>
        <TabsTrigger
          value={MY_INFO_TAB.VOTE}
          className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />내 투표
        </TabsTrigger>
        <TabsTrigger
          value={MY_INFO_TAB.ARTICLE}
          className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />내 요리 정보
        </TabsTrigger>
      </TabsList>

      <TabsContent value={MY_INFO_TAB.RECIPE} className="space-y-6">
        <MyInfoRecipeTab />
      </TabsContent>

      <TabsContent value={MY_INFO_TAB.VOTE} className="space-y-6">
        <MyInfoVoteTab curTab={curTab} />
      </TabsContent>

      <TabsContent value={MY_INFO_TAB.ARTICLE} className="space-y-6">
        <MyInfoArticleTab />
      </TabsContent>
    </Tabs>
  );
}
