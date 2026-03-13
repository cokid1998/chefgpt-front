import { useSearchParams } from "react-router";

const usePagination = () => {
  const [params, setParams] = useSearchParams();
  const categoryName = params.get("category") ?? "전체";
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? 1);
  const take = Number(params.get("take") ?? 9);
};
