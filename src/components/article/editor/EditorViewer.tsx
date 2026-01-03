import DOMPurify from "dompurify";

interface EditorViewerProps {
  content: string;
}

export default function EditorViewer({ content }: EditorViewerProps) {
  const safeContentHTML = DOMPurify.sanitize(content ?? "");

  const isEmpty =
    !safeContentHTML ||
    safeContentHTML === "<p></p>" ||
    safeContentHTML === "<p><br></p>";
  return (
    <div className="flex-1 border bg-white p-4">
      {isEmpty && (
        <div className="pointer-events-none float-left h-0 text-[#adb5bd]">
          내용을 입력해주세요
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: safeContentHTML }} className="" />
    </div>
  );
}
