import { useState } from "react";
import { Outlet, useMatch } from "react-router";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { RECIPE_DETAIL } from "@/constants/Url";
import { PanelLeft, ChefHat } from "lucide-react";

export default function layout() {
  const isRecipeDetailPage = useMatch(RECIPE_DETAIL);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* 사이드바 */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main className="flex flex-1 flex-col overflow-x-auto md:ml-(--sidebar-width)">
        {/* 모바일 헤더 */}
        <MobileHeader
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        />

        <section className={`${isRecipeDetailPage ? "h-full" : "min-h-lvh"}`}>
          <Outlet />
        </section>
        <Footer />
      </main>
    </div>
  );
}

interface MobileHeaderProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MobileHeader({ isOpen, onOpen, onClose }: MobileHeaderProps) {
  return (
    <div className="md:hidden">
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/50" onClick={onClose} />
      )}
      <header className="flex h-14 items-center gap-3 border-b bg-white px-4">
        <button onClick={onOpen} className="cursor-pointer">
          <PanelLeft size={24} />
        </button>

        <div className="flex items-center gap-1">
          <ChefHat className="h-6 w-6 text-green-500" />
          <h1 className="text-lg font-bold text-gray-900">ChefGPT</h1>
        </div>
      </header>
    </div>
  );
}
