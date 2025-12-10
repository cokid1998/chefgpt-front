import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FoodType } from "@/types/refrigeratorType";
import { Bot, Sparkles, User, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";

interface ChatbotProps {
  foods: FoodType[];
}

export default function Chatbot({ foods }: ChatbotProps) {
  const [input, setInput] = useState("");
  const [chatContent, setChatContent] = useState([
    {
      role: "bot",
      message:
        "안녕하세요! 냉장고 속 식재료로 만들 수 있는 레시피를 추천해드릴게요. 무엇을 만들고 싶으신가요?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "간단한 요리 추천해줘",
    "30분 안에 만들 수 있는 요리",
    "한식 레시피 추천",
    "다이어트 요리",
  ];

  // Todo: handleSend, handleQuickPromptSend 로직 통합
  const handleSend = () => {
    const userMessage = input;

    // 1. input상태 초기화
    setInput("");
    // 2. chatContent에 추가
    setChatContent((prev) => [...prev, { role: "user", message: userMessage }]);
    // 3. isLoading을 true로
    setIsLoading(true);
    // Todo: setTimeout 삭제해야함
    setTimeout(() => {
      setChatContent((prev) => [
        ...prev,
        { role: "bot", message: "현재 UI 만 구현함" },
      ]);
      setIsLoading(false);
    }, 500);
    // 4. Todo: API처리
  };

  // Todo: handleSend, handleQuickPromptSend 로직 통합
  const handleQuickPromptSend = (prompt: string) => {
    // 1. input상태 초기화
    setInput("");
    // 2. chatContent에 추가
    setChatContent((prev) => [...prev, { role: "user", message: prompt }]);
    // 3. isLoading을 true로
    setIsLoading(true);
    // Todo: setTimeout 삭제해야하
    setTimeout(() => {
      setChatContent((prev) => [
        ...prev,
        { role: "bot", message: "현재 UI 만 구현함" },
      ]);
      setIsLoading(false);
    }, 500);
    // 4. Todo: API처리
  };

  const onPressKeyDownSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      handleSend();
    }
  };

  return (
    <div className="top-4 flex h-[calc(100vh-120px)] min-w-96 flex-col overflow-hidden rounded-xl border shadow-lg">
      {/* Header */}
      <div className="flex flex-col border-b p-6 pb-4">
        <div className="mb-1.5 flex items-center gap-2 text-xl font-semibold tracking-tight">
          <div className="bg-green-gradient rounded-lg p-2">
            <Sparkles color="white" size={20} />
          </div>
          AI 레시피 추천
        </div>
        <p className="mt-2 text-sm text-gray-500">
          현재 냉장고에 있는 5개 식재료로 만들 수 있는 요리를 추천받으세요
        </p>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex h-[467px] flex-1 flex-col gap-4 p-4">
        {chatContent.map((content) => {
          const isUser = content.role === "user";

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={content.message}
              className={`flex justify-start gap-3 ${isUser ? "flex-row-reverse" : ""} mt-4`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isUser ? "bg-gray-300" : "bg-green-gradient"}`}
              >
                {isUser ? (
                  <User size={20} className="text-gray-600" />
                ) : (
                  <Bot size={20} color="white" />
                )}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl bg-gray-100 px-4 py-3 text-gray-900 ${isUser ? "bg-green-gradient" : "bg-gray-100"}`}
              >
                <p
                  className={`text-sm leading-relaxed whitespace-pre-wrap ${isUser ? "text-white" : ""}`}
                >
                  {content.message}
                </p>
              </div>
            </motion.div>
          );
        })}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex gap-3"
          >
            <div className="bg-green-gradient flex h-8 w-8 items-center justify-center rounded-full">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="rounded-2xl bg-gray-100 px-4 py-3">
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            </div>
          </motion.div>
        )}
      </ScrollArea>

      {/* Quick Propmt */}
      <AnimatePresence>
        {chatContent.length <= 1 && (
          <motion.div className="border-t px-4 pb-3" exit={{ y: 150 }}>
            <p className="mt-3 mb-2 text-xs text-gray-500">빠른 질문:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <motion.div
                  key={prompt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleQuickPromptSend(prompt)}
                >
                  <Button
                    variant={"outline"}
                    className="border-green-200 text-xs text-gray-700 hover:border-green-400 hover:bg-green-50"
                    size={"sm"}
                  >
                    {prompt}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="z-1 border-t bg-white p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="예: 냉장고 재료로 저녁 메뉴 추천해줘"
            // Todo: disabled
            onKeyDown={onPressKeyDownSend}
          />
          <Button
            size={"icon"}
            className="bg-green-gradient hover:from-green-500 hover:to-emerald-600"
            onClick={handleSend}
          >
            <Send className="h-5 w-5" />
            {/* {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )} */}
          </Button>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          💡 냉장고 식재료:{" "}
          {foods
            .slice(0, 5)
            .map((i) => i.name)
            .join(", ")}
          {foods.length > 5 && ` 외 ${foods.length - 5}개`}
        </p>
      </div>
    </div>
  );
}
