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
import MyInfoOverviewTab from "@/components/myInfo/myInfoContent/MyInfoOverviewTab";
import MyInfoMyRecipeTab from "@/components/myInfo/myInfoContent/MyInfoMyRecipeTab";
import MyInfoVoteHistoryTab from "@/components/myInfo/myInfoContent/MyInfoVoteHistoryTab";

export default function MyInfoContent() {
  return (
    <>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="border border-green-100 bg-white p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <Trophy className="mr-2 h-4 w-4" />
            개요
          </TabsTrigger>
          <TabsTrigger
            value="recipes"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <ChefHat className="mr-2 h-4 w-4" />내 레시피
          </TabsTrigger>
          <TabsTrigger
            value="votes"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            투표 기록
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MyInfoOverviewTab />
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <MyInfoMyRecipeTab />
        </TabsContent>

        <TabsContent value="votes" className="space-y-6">
          <MyInfoVoteHistoryTab />
        </TabsContent>
      </Tabs>
    </>
  );
}
