import { useSearchParams } from "react-router";

const useListParams = () => {
  const [params, setParams] = useSearchParams();
  const categoryName = params.get("category") ?? "전체";
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? 1);

  return { params, setParams, categoryName, search, page };
};

export default useListParams;
