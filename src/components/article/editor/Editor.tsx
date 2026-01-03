import { type Editor as EditorType, EditorContent } from "@tiptap/react";
import Toolbar from "@/components/article/editor/Toolbar";

interface EditorProps {
  editor: EditorType;
}

export default function Editor({ editor }: EditorProps) {
  return (
    <div className="border bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
