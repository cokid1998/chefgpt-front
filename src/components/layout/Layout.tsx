import { useState } from "react";
import { Link, Outlet, useMatch } from "react-router";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { HOME, RECIPE_DETAIL } from "@/constants/Url";
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
    <div className="pt-14 md:hidden">
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/50" onClick={onClose} />
      )}
      <header className="fixed top-0 z-10 flex h-14 w-full items-center border-b bg-white px-4">
        <button onClick={onOpen} className="cursor-pointer">
          <PanelLeft size={24} />
        </button>
        <Link
          to={HOME}
          className="pointer-events-none absolute inset-x-0 flex items-center justify-center"
        >
          <h1 className="pointer-events-auto text-2xl font-bold text-green-500">
            ChefGPT
          </h1>
        </Link>
      </header>
    </div>
  );
}
