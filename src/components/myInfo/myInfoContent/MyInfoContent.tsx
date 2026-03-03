import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, BookOpen, Vote } from "lucide-react";
import MyInfoRecipeTab from "@/components/myInfo/myInfoContent/Tab/MyInfoRecipeTab";
import MyInfoVoteTab from "@/components/myInfo/myInfoContent/Tab/MyInfoVoteTab";
import MyInfoArticleTab from "@/components/myInfo/myInfoContent/Tab/MyInfoArticleTab";
import { useSearchParams } from "react-router";
import { Separator } from "@/components/ui/separator";

const MY_INFO_TAB = {
  RECIPE: { LABEL: "내 레시피", VALUE: "recipe" },
  VOTE: { LABEL: "내 투표", VALUE: "vote" },
  ARTICLE: { LABEL: "내 요리정보", VALUE: "article" },
} as const;

export default function MyInfoContent() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 보여줄 탭
  const curTab = searchParams.get("tab") ?? MY_INFO_TAB.RECIPE.VALUE;

  // 탭 변경 핸들러
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <Tabs value={curTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList className="border bg-white p-1 shadow-xs">
        <TabsTrigger
          value={MY_INFO_TAB.RECIPE.VALUE}
          className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
        >
          <ChefHat className="mr-2 h-4 w-4" />
          {MY_INFO_TAB.RECIPE.LABEL}
        </TabsTrigger>

        <Separator orientation="vertical" className="mx-2" />

        <TabsTrigger
          value={MY_INFO_TAB.VOTE.VALUE}
          className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
        >
          <Vote className="mr-2 h-4 w-4" />
          {MY_INFO_TAB.VOTE.LABEL}
        </TabsTrigger>

        <Separator orientation="vertical" className="mx-2" />

        <TabsTrigger
          value={MY_INFO_TAB.ARTICLE.VALUE}
          className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          {MY_INFO_TAB.ARTICLE.LABEL}
        </TabsTrigger>
      </TabsList>

      <TabsContent value={MY_INFO_TAB.RECIPE.VALUE} className="space-y-6">
        <MyInfoRecipeTab curTab={curTab} />
      </TabsContent>

      <TabsContent value={MY_INFO_TAB.VOTE.VALUE} className="space-y-6">
        <MyInfoVoteTab curTab={curTab} />
      </TabsContent>

      <TabsContent value={MY_INFO_TAB.ARTICLE.VALUE} className="space-y-6">
        <MyInfoArticleTab />
      </TabsContent>
    </Tabs>
  );
}
