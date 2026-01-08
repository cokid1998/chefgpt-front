import { Github, PenLine } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Footer() {
  const [isXScroll, setIsXScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const hasScroll =
        document.documentElement.scrollWidth > window.innerWidth;
      setIsXScroll(hasScroll);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <footer
      style={{ paddingBottom: isXScroll ? `8px` : `23px` }}
      className="flex flex-col items-start border-t p-4 text-gray-500"
    >
      <div className="flex w-full gap-3 border-b pb-4">
        <Tooltip>
          <TooltipTrigger>
            <a href="https://github.com/cokid1998" target="_blank">
              <Github />
            </a>
          </TooltipTrigger>
          <TooltipContent>Github</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <a href="https://velog.io/@cokid/posts" target="_blank">
              <PenLine />
            </a>
          </TooltipTrigger>
          <TooltipContent>블로그</TooltipContent>
        </Tooltip>
      </div>

      <div className="mt-4 flex flex-col">
        <span>이메일: cokid@gmail.com</span>
      </div>
    </footer>
  );
}
