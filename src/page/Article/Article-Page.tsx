import { Plus, BookAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleSearchBar from "@/components/article/ArticleSearchBar";
import ArticleList from "@/components/article/ArticleList";
import { useNavigate } from "react-router";
import { ARTICLE_CREATE_URL } from "@/constants/Url";
import { useState } from "react";
import useGetAllArticle from "@/hooks/API/article/GET/useGetAllArticle";

export default function ArticlePage() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [selectCategory, setSelectCategory] = useState("전체");

  const { data: articleIds = [], isLoading: isArticleLoading } =
    useGetAllArticle(selectCategory, search);

  const handleCategoryClick = (category: string) => {
    setSelectCategory(category);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
  };

  return (
    <>
      <title>ChefGPT | 요리 정보</title>
      <div className="bg-soft-green flex flex-col">
        <div className="bg-green-gradient">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:gap-0 md:px-8 md:py-16">
            <div className="flex flex-col">
              <div className="mb-3 flex items-center gap-3">
                <BookAlert size={40} color="white" />
                <h1 className="text-2xl font-bold text-white md:text-4xl">
                  요리 정보
                </h1>
              </div>
              <p className="text-lg text-white md:text-xl">
                요리에 도움이 되는 다양한 정보와 팁을 확인하세요
              </p>
            </div>

            <Button
              variant="outline"
              size={"lg"}
              className="w-full text-green-600 hover:text-green-600 md:w-auto"
              onClick={() => nav(ARTICLE_CREATE_URL)}
            >
              <Plus />글 작성
            </Button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl justify-between gap-8 px-4 py-8 md:px-8">
          <div className="flex w-full flex-col gap-8">
            <ArticleSearchBar
              selectCategory={selectCategory}
              onSearchKeyDown={handleSearchKeyDown}
              onCategoryClick={handleCategoryClick}
            />

            <ArticleList
              selectCategory={selectCategory}
              articleIds={articleIds}
              isArticleLoading={isArticleLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
