import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "@/components/article/editor/Toolbar";
import { Placeholder } from "@tiptap/extensions";

interface EditorProps {
  handleSetForm: (
    key: "category" | "summary" | "title" | "content",
    value: string,
  ) => void;
}

export default function Editor({ handleSetForm }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "내용을 입력해주세요",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:float-left before:text-[#adb5bd] before:h-0 before:pointer-events-none",
      }),
    ],
    onUpdate: ({ editor }) => {
      handleSetForm("content", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 min-h-96",
      },
    },
  });

  return (
    <div className="border bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
