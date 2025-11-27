import { Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";
import LoginPage from "@/page/auth/LoginPage";
import IndexPage from "@/page/IndexPage";
import SignupPage from "@/page/auth/SignupPage";

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<IndexPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
