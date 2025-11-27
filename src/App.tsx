import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/provider/modalProvider";
import RootRouter from "@/route";

function App() {
  return (
    <ModalProvider>
      <RootRouter />
      <Toaster />
    </ModalProvider>
  );
}

export default App;
