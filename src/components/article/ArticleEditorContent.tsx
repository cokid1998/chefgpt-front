import { BookOpen } from "lucide-react";
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

interface ArticleEditorContentProps {
  handleSetForm: (
    key: "category" | "summary" | "title" | "content",
    value: string,
  ) => void;
}

export default function ArticleEditorContent({
  handleSetForm,
}: ArticleEditorContentProps) {
  const { data: categories } = useGetArticleCategory();

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
              <Input className="mt-2 w-1/2" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Editor handleSetForm={handleSetForm} />
    </div>
  );
}
