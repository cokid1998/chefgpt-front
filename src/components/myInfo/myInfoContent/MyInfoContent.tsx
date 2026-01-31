import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChefHat,
  Trophy,
  Settings,
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import youtubeDefaultImage from "@/assets/image/youtube_default.jpg";
import MyInfoRecipeTab from "@/components/myInfo/myInfoContent/Tab/MyInfoRecipeTab";
import MyInfoVoteTab from "@/components/myInfo/myInfoContent/Tab/MyInfoVoteTab";
import MyInfoArticleTab from "@/components/myInfo/myInfoContent/Tab/MyInfoArticleTab";

export default function MyInfoContent() {
  return (
    <>
      <Tabs defaultValue="my-recipe" className="space-y-6">
        <TabsList className="border border-green-100 bg-white p-1">
          <TabsTrigger
            value="my-recipe"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <ChefHat className="mr-2 h-4 w-4" />내 레시피
          </TabsTrigger>
          <TabsTrigger
            value="my-vote"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />내 투표
          </TabsTrigger>
          <TabsTrigger
            value="my-article"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />내 요리 정보
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-recipe" className="space-y-6">
          <MyInfoRecipeTab />
        </TabsContent>

        <TabsContent value="my-vote" className="space-y-6">
          <MyInfoVoteTab />
        </TabsContent>

        <TabsContent value="my-article" className="space-y-6">
          <MyInfoArticleTab />
        </TabsContent>
      </Tabs>
    </>
  );
}
