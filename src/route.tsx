import { Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/page/auth/Login-Page";
import HomePage from "@/page/Main-Page";
import SignupPage from "@/page/auth/Signup-Page";
import CreateRecipePage from "@/page/Recipe/CreateRecipe-Page";
import RefrigeratorPage from "@/page/Refrigerator/Refrigerator-Page";
import VotePage from "@/page/Vote/Vote-Page";
import ArticlePage from "@/page/Article/Article-Page";
import NotFoundPage from "@/page/404";
import {
  VOTE,
  HOME,
  ARTICLE,
  LOGIN_URL,
  CREATE_RECIPE,
  REFRIGERATOR,
  SIGNUP_URL,
  KAKAO_AUTH_CALLBACK_URL,
  ARTICLE_DETAIL_URL,
  ARTICLE_CREATE_URL,
  MY_INFO,
  RECIPE_DETAIL,
} from "@/constants/Url";
import OnlyLoggedLayout from "@/components/layout/OnlyLoggedLayout";
import KAKAOAuthCallbackPage from "@/page/auth/KAKAOAuthCallback-Page";
import ArticleDetailPage from "@/page/Article/ArticleDetail-Page";
import CreateArticlePage from "@/page/Article/CreateArticle-Page";
import MyInfoPage from "@/page/MyInfo/MyInfo-Page";
import RecipeDetailPage from "@/page/Recipe/RecipeDetail-Page";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={HOME} element={<HomePage />} />
        <Route path={CREATE_RECIPE} element={<CreateRecipePage />} />
        <Route path={RECIPE_DETAIL} element={<RecipeDetailPage />} />
        <Route path={VOTE} element={<VotePage />} />
        <Route path={ARTICLE} element={<ArticlePage />} />
        <Route path={ARTICLE_DETAIL_URL} element={<ArticleDetailPage />} />

        {/* 로그인한 사용자만 볼 수 있는 페이지 */}
        <Route element={<OnlyLoggedLayout />}>
          <Route path={REFRIGERATOR} element={<RefrigeratorPage />} />
          <Route path={ARTICLE_CREATE_URL} element={<CreateArticlePage />} />
          <Route path={MY_INFO} element={<MyInfoPage />} />
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
