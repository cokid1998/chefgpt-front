import { Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/page/auth/LoginPage";
import IndexPage from "@/page/IndexPage";
import SignupPage from "@/page/auth/SignupPage";
import RecipePage from "@/page/RecipePage";
import RefrigeratorPage from "@/page/Refrigerator/RefrigeratorPage";
import CommunityPage from "@/page/CommunityPage";
import InfoPage from "@/page/InfoPage";
import NotFoundPage from "@/page/404";
import {
  COMMUNITY,
  HOME,
  INFO,
  LOGIN_URL,
  RECIPE,
  REFRIGERATOR,
  SIGNUP_URL,
} from "@/constants/Url";
import OnlyLoggedLayout from "@/components/layout/OnlyLoggedLayout";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={HOME} element={<IndexPage />} />
        <Route path={RECIPE} element={<RecipePage />} />
        <Route path={COMMUNITY} element={<CommunityPage />} />
        <Route path={INFO} element={<InfoPage />} />

        {/* 로그인한 사용자만 볼 수 있는 페이지 */}
        <Route element={<OnlyLoggedLayout />}>
          <Route path={REFRIGERATOR} element={<RefrigeratorPage />} />
        </Route>
      </Route>

      <Route path={LOGIN_URL} element={<LoginPage />} />
      <Route path={SIGNUP_URL} element={<SignupPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
