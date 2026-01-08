import { Button } from "@/components/ui/button";
import { ARTICLE } from "@/constants/Url";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import ArticleEditorContent from "@/components/article/ArticleEditorContent";
import { useState } from "react";
import EditorViewer from "@/components/article/editor/EditorViewer";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import type { JSONContent } from "@tiptap/react";
import usePostArticle from "@/hooks/API/article/POST/usePostArticle";

export interface ArticleFormType {
  title: string;
  summary: string;
  category: null | string;
  contentJSON: null | JSONContent;
  tags: string[];
}

export default function CreateArticlePage() {
  const nav = useNavigate();
  const [form, setForm] = useState<ArticleFormType>({
    title: "",
    summary: "",
    category: null,
    contentJSON: null,
    tags: [],
  });
  const { mutate: articleSubmit } = usePostArticle();

  const handleSetForm = (
    key: keyof typeof form,
    value: string | JSONContent,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "pl-4 min-h-96 [&_li_p]:inline list-disc",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "pl-4 min-h-96 [&_li_p]:inline list-decimal",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "내용을 입력해주세요",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:float-left before:text-[#adb5bd] before:h-0 before:pointer-events-none",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none p-4 min-h-96",
      },
    },

    onUpdate: ({ editor }) => {
      handleSetForm("contentJSON", editor.getJSON());
    },
  });

  const handleArticleSubmit = () => {
    const formatArticle = {
      ...form,
      contentJSON: JSON.stringify(form.contentJSON),
      categoryId: Number(form.category),
      tags: [],
      contentText: editor.getText(),
    };

    articleSubmit(formatArticle);
  };

  return (
    <>
      <title>ChefGPT | 아티클 작성</title>
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
            <ArticleEditorContent
              form={form}
              editor={editor}
              handleSetForm={handleSetForm}
            />

            <EditorViewer content={form.contentJSON} />
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
              // disabled={createMutation.isPending}
              className="h-12 bg-linear-to-r from-green-500 to-emerald-500 px-8 hover:from-green-600 hover:to-emerald-600"
              onClick={handleArticleSubmit}
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
    </>
  );
}
