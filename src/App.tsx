import ModalProvider from "@/provider/modalProvider";
import RootRouter from "@/route";

function App() {
  return (
    <ModalProvider>
      <RootRouter />
    </ModalProvider>
  );
}

export default App;
