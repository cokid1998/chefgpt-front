import { Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/page/auth/LoginPage";
import IndexPage from "@/page/IndexPage";
import SignupPage from "@/page/auth/SignupPage";
import RecipePage from "@/page/RecipePage";
import RefrigeratorPage from "@/page/Refrigerator/RefrigeratorPage";
import VotePage from "@/page/Vote/VotePage";
import ArticlePage from "@/page/Article/ArticlePage";
import NotFoundPage from "@/page/404";
import {
  VOTE,
  HOME,
  ARTICLE,
  LOGIN_URL,
  RECIPE,
  REFRIGERATOR,
  SIGNUP_URL,
  KAKAO_AUTH_CALLBACK_URL,
  ARTICLE_DETAIL_URL,
} from "@/constants/Url";
import OnlyLoggedLayout from "@/components/layout/OnlyLoggedLayout";
import KAKAOAuthCallbackPage from "@/page/auth/KAKAOAuthCallbackPage";
import ArticleDetailPage from "@/page/Article/ArticleDetailPage";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={HOME} element={<IndexPage />} />
        <Route path={RECIPE} element={<RecipePage />} />
        <Route path={VOTE} element={<VotePage />} />
        <Route path={ARTICLE} element={<ArticlePage />} />
        <Route path={ARTICLE_DETAIL_URL} element={<ArticleDetailPage />} />

        {/* 로그인한 사용자만 볼 수 있는 페이지 */}
        <Route element={<OnlyLoggedLayout />}>
          <Route path={REFRIGERATOR} element={<RefrigeratorPage />} />
        </Route>
      </Route>

      <Route path={LOGIN_URL} element={<LoginPage />} />
      <Route path={SIGNUP_URL} element={<SignupPage />} />
      <Route
        path={KAKAO_AUTH_CALLBACK_URL}
        element={<KAKAOAuthCallbackPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
