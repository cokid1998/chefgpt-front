import { GET_FOODS_COUNT_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";

interface GetFooodCountRes {
  total: number;
  cold: number;
  frozen: number;
  roomTemp: number;
}

const useGetFoodCount = () =>
  useQuery({
    queryKey: QUERY_KEYS.foodsCount,
    queryFn: () => API.get<GetFooodCountRes>(GET_FOODS_COUNT_API_URL),
    select: (data) => {
      const count = data.data;

      const countConfig = [
        {
          key: "totalCount",
          label: "🛒 전체 식재료",
          value: count.total,
        },
        {
          key: "coldCount",
          label: "❄️ 냉장",
          value: count.cold,
        },
        {
          key: "frozenCount",
          label: "🧊 냉동",
          value: count.frozen,
        },
        {
          key: "RoomTempCount",
          label: "🌡️ 실온",
          value: count.roomTemp,
        },
      ];

      return countConfig;
    },
  });

export default useGetFoodCount;
