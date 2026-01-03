import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/react";
import { useEffect } from "react";

interface EditorViewerProps {
  content: JSONContent | null;
}

export default function EditorViewer({ content }: EditorViewerProps) {
  const viewer = useEditor({
    editable: false,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4 min-h-96",
      },
    },
  });

  useEffect(() => {
    if (viewer && content) {
      viewer.commands.setContent(content);
    }
  }, [content, viewer]);

  return (
    <div className="flex-1 rounded-lg border bg-white p-4">
      <EditorContent editor={viewer} />
    </div>
  );
}
