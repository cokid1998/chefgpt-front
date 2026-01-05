import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/react";
import { useEffect } from "react";

interface EditorViewerProps {
  content: JSONContent | null | string;
}

export default function EditorViewer({ content }: EditorViewerProps) {
  const viewer = useEditor({
    editable: false,
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
    ],
    editorProps: {
      attributes: {
        class: "p-4 min-h-96",
      },
    },
  });

  useEffect(() => {
    if (viewer && content) {
      // 생성페이지와 상세페이지에서 받아오는 content타입에 따라 파싱
      const parsedContent =
        typeof content === "string" ? JSON.parse(content) : content;
      viewer.commands.setContent(parsedContent);
    }
  }, [content, viewer]);

  return (
    <div className="flex-1 rounded-lg border bg-white p-4">
      <EditorContent editor={viewer} />
    </div>
  );
}
