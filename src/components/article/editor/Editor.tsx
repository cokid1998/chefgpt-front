import { type Editor as EditorType, EditorContent } from "@tiptap/react";
import Toolbar from "@/components/article/editor/Toolbar";

interface EditorProps {
  editor: EditorType;
}

export default function Editor({ editor }: EditorProps) {
  return (
    <div className="border bg-white md:w-1/2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="h-96 overflow-y-auto" />
    </div>
  );
}
