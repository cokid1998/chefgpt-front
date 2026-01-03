import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/react";
import { useEffect } from "react";
import { Placeholder } from "@tiptap/extensions";

interface EditorViewerProps {
  content: JSONContent | null;
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
      viewer.commands.setContent(content);
    }
  }, [content, viewer]);

  return (
    <div className="flex-1 rounded-lg border bg-white p-4">
      <EditorContent editor={viewer} />
    </div>
  );
}
