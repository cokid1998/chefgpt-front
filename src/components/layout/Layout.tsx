import { Outlet } from "react-router";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";

export default function layout() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="ml-(--sidebar-width) flex flex-1 flex-col">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
