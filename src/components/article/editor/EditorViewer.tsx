import DOMPurify from "dompurify";

interface EditorViewerProps {
  content: string;
}

export default function EditorViewer({ content }: EditorViewerProps) {
  const safeContentHTML = DOMPurify.sanitize(content ?? "");
  return (
    <div className="flex-1 border bg-white p-4">
      <div dangerouslySetInnerHTML={{ __html: safeContentHTML }} />
    </div>
  );
}
