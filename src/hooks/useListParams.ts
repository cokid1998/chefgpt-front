import { useSearchParams } from "react-router";
import { MY_INFO_TAB } from "@/components/myInfo/myInfoContent/MyInfoContent";
import { MY_RECIPE_TYPE } from "@/components/myInfo/myInfoContent/Tab/MyInfoRecipeTab";

const useListParams = () => {
  const [params, setParams] = useSearchParams();
  // 공통으로 쓰는 param
  const page = Number(params.get("page") ?? 1);

  // 레시피, 아티클에서 쓰는 param
  const categoryName = params.get("category") ?? "전체";
  const search = params.get("search") ?? "";

  // 내정보 Tab에서 쓰는 param
  const tab = params.get("tab") ?? MY_INFO_TAB.RECIPE.VALUE;
  const select = params.get("select") ?? MY_RECIPE_TYPE.MY.VALUE;

  return { params, setParams, categoryName, search, page, tab, select };
};

export default useListParams;
