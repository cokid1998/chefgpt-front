import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/provider/modalProvider";
import RootRouter from "@/route";
import useScrollToTop from "@/hooks/useScrollToTop";

function App() {
  useScrollToTop(); // 페이지 전환시 스크롤을 초기화

  return (
    <ModalProvider>
      <RootRouter />
      <Toaster />
    </ModalProvider>
  );
}

export default App;
