import { Button } from "@/components/ui/button";
import { ARTICLE } from "@/constants/Url";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import ArticleEditorContent from "@/components/article/ArticleEditorContent";
import { useState } from "react";
import EditorViewer from "@/components/article/editor/EditorViewer";

export default function CreateArticlePage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    summary: "",
    category: null,
    content: "",
  });

  const handleSetForm = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      <div className="mx-auto flex-col p-6">
        <Button
          variant="ghost"
          onClick={() => nav(ARTICLE)}
          className="mb-6 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로
        </Button>

        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-200 px-4 py-2">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              요리 정보 작성
            </span>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            새 아티클 작성
          </h1>
          <p className="text-gray-600">
            요리와 관련된 유익한 정보를 공유해보세요
          </p>
        </div>

        <div className="flex gap-3">
          <ArticleEditorContent handleSetForm={handleSetForm} />

          <EditorViewer content={form.content} />
        </div>

        <div className="flex justify-end gap-3 pt-8">
          <Button
            type="button"
            variant="outline"
            // onClick={() => navigate(createPageUrl("Articles"))}
            // disabled={createMutation.isPending}
            className="h-12 px-6"
          >
            취소
          </Button>
          <Button
            type="submit"
            // disabled={createMutation.isPending}
            className="h-12 bg-linear-to-r from-green-500 to-emerald-500 px-8 hover:from-green-600 hover:to-emerald-600"
          >
            {/* {createMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                아티클 작성
              </>
            )} */}
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              아티클 작성
            </>
          </Button>
        </div>
      </div>
    </div>
  );
}
