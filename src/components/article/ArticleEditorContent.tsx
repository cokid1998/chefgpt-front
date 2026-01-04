import { BookOpen, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useGetArticleCategory from "@/hooks/API/article/GET/useGetArticleCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Editor from "@/components/article/editor/Editor";
import { type Editor as EditorType, type JSONContent } from "@tiptap/react";
import { Badge } from "@/components/ui/badge";
import type { ArticleFormType } from "@/page/Article/CreateArticlePage";

interface ArticleEditorContentProps {
  form: ArticleFormType;
  handleSetForm: (
    key: keyof ArticleFormType,
    value: string | JSONContent,
  ) => void;
  editor: EditorType;
}

export default function ArticleEditorContent({
  form,
  handleSetForm,
  editor,
}: ArticleEditorContentProps) {
  const { data: categories } = useGetArticleCategory();

  const handleRemoveTag = (targetTag: string) => {
    const removeTag = form.tags.filter((tag) => tag !== targetTag);

    handleSetForm("tags", removeTag);
  };

  return (
    <div className="w-1/2 space-y-6">
      <Accordion type="single" collapsible defaultValue="article-item">
        <AccordionItem value="article-item" className="rounded-xl shadow-xl">
          <AccordionTrigger className="cursor-pointer rounded-none bg-linear-to-br from-green-400 to-emerald-500 p-6 text-white">
            <h1 className="flex items-center gap-2 text-base leading-none font-semibold tracking-tight">
              <BookOpen className="h-6 w-6" />
              아티클 정보
            </h1>
          </AccordionTrigger>

          <AccordionContent className="space-y-6 bg-white p-6">
            <div>
              <div className="text-base font-semibold">제목 *</div>
              <Input
                placeholder="아티클 제목을 입력하세요"
                className="mt-2 h-12"
                required
                onChange={(e) => handleSetForm("title", e.target.value)}
              />
            </div>

            <div>
              <div className="text-base font-semibold">요약</div>
              <Textarea
                placeholder="아티클의 간단한 요약을 입력하세요 (2-3문장)"
                className="mt-2 h-24 resize-none"
                required
                onChange={(e) => handleSetForm("summary", e.target.value)}
              />
            </div>

            <div>
              <div className="text-base font-semibold">카테고리 *</div>
              <Select
                onValueChange={(value) => handleSetForm("category", value)}
              >
                <SelectTrigger className="mt-2 h-12 w-full">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="text-base font-semibold">태그</div>
              <Input
                className="mt-2 w-1/2"
                placeholder="태그를 입력하세요"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    handleSetForm("tags", [
                      ...form.tags,
                      e.currentTarget.value,
                    ]);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>

            <div className="flex gap-1">
              {form?.tags?.map((tag) => (
                <div
                  key={tag}
                  className="group relative cursor-pointer transition-all"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <Badge className="bg-green-100 px-2.5 font-semibold text-green-600 shadow">
                    {tag}
                  </Badge>

                  <X className="borde absolute -top-1 -right-1 size-3.5 rounded-full bg-rose-500 text-[10px] text-white opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Editor editor={editor} />
    </div>
  );
}
