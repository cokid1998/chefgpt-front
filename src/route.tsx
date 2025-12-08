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
import UseQueryTestPage from "@/page/UseQueryTestPage";
import TestPage1 from "@/page/TestPage1";
import TestPage2 from "@/page/TestPage2";

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

      <Route path={"/useQueryTest"} element={<UseQueryTestPage />} />
      <Route path={"/test1"} element={<TestPage1 />} />
      <Route path={"/test2"} element={<TestPage2 />} />
    </Routes>
  );
}
