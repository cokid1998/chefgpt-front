import { Outlet, useMatch } from "react-router";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";

export default function layout() {
  const isRecipeDetailPage = useMatch("/recipe/:id");

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="ml-(--sidebar-width) flex flex-1 flex-col">
        <section className={`${isRecipeDetailPage ? "h-full" : "min-h-lvh"}`}>
          <Outlet />
        </section>
        <Footer />
      </main>
    </div>
  );
}
