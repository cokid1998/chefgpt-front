import { Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/page/auth/LoginPage";
import IndexPage from "@/page/IndexPage";
import SignupPage from "@/page/auth/SignupPage";
import RecipePage from "@/page/RecipePage";
import RefrigeratorPage from "@/page/RefrigeratorPage";
import CommunityPage from "@/page/CommunityPage";
import InfoPage from "@/page/InfoPage";
import {
  COMMUNITY,
  HOME,
  INFO,
  LOGIN_URL,
  RECIPE,
  REFRIGERATOR,
  SIGNUP_URL,
} from "@/constants/Url";
import UseQueryStudyPage from "@/page/UseQueryStudyPage";
import UseMutationStudyVer1 from "@/page/UseMutationStudyVer1";
import UseMutationStudyVer2 from "@/page/UseMutationStudyVer2";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={HOME} element={<IndexPage />} />
        <Route path={RECIPE} element={<RecipePage />} />
        <Route path={REFRIGERATOR} element={<RefrigeratorPage />} />
        <Route path={COMMUNITY} element={<CommunityPage />} />
        <Route path={INFO} element={<InfoPage />} />
      </Route>

      <Route path={LOGIN_URL} element={<LoginPage />} />
      <Route path={SIGNUP_URL} element={<SignupPage />} />

      <Route path={"/useQueryTest"} element={<UseQueryStudyPage />} />
      <Route path={"/test2"} element={<UseMutationStudyVer1 />} />
      <Route path={"/test1"} element={<UseMutationStudyVer2 />} />
    </Routes>
  );
}
