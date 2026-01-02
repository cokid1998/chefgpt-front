import type { Editor as EditorType } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Toolbar({ editor }: { editor: EditorType }) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,

        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
      };
    },
  });
  const commonButtonStyle =
    "rounded-sm p-1 hover:bg-gray-200 transition-all cursor-pointer";

  const activeButtonStyle = "bg-gray-200";

  return (
    <div className="flex h-12.5 items-center justify-center gap-3 border-b p-2">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${commonButtonStyle} ${editorState.isHeading1 ? activeButtonStyle : ""}`}
      >
        <Heading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${commonButtonStyle} ${editorState.isHeading2 ? activeButtonStyle : ""}`}
      >
        <Heading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${commonButtonStyle} ${editorState.isHeading3 ? activeButtonStyle : ""}`}
      >
        <Heading3 />
      </button>

      <Separator orientation="vertical" />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${commonButtonStyle} ${editor.isActive("bold") ? activeButtonStyle : ""}`}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${commonButtonStyle} ${editor.isActive("italic") ? activeButtonStyle : ""}`}
      >
        <Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${commonButtonStyle} ${editor.isActive("strike") ? activeButtonStyle : ""}`}
      >
        <Strikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${commonButtonStyle} ${editor.isActive("underline") ? activeButtonStyle : ""}`}
      >
        <Underline />
      </button>

      <Separator orientation="vertical" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${commonButtonStyle} ${editor.isActive("bulletList") ? activeButtonStyle : ""}`}
      >
        <List />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${commonButtonStyle} ${editor.isActive("orderedList") ? activeButtonStyle : ""}`}
      >
        <ListOrdered />
      </button>
    </div>
  );
}
