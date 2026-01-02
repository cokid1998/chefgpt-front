import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "@/components/article/editor/Toolbar";

interface EditorProps {
  handleSetForm: (
    key: "category" | "summary" | "title" | "content",
    value: string,
  ) => void;
}

export default function Editor({ handleSetForm }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
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
