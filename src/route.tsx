import { Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/page/LoginPage";
import IndexPage from "@/page/IndexPage";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
