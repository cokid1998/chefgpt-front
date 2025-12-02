import { PROFILE_API_URL } from "@/constants/APIUrl";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import API from "@/hooks/API/API";
import { useQuery } from "@tanstack/react-query";

interface GetProfileRes {
  id: number;
  email: string;
  createdAt: Date;
  name: string;
  thumbnail: string;
}

const getProfile = (userId: number) => {
  return API.get<GetProfileRes>(PROFILE_API_URL(userId));
};

const useGetProfile = (userId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.profileById(userId),
    queryFn: () => getProfile(userId),
    enabled: !!userId,
    select: (data) => data.data,
    staleTime: 5 * 60 * 60 * 1000,
    gcTime: 5 * 60 * 60 * 1000, // Todo: gcTime의 적절한 시간은?
  });
};

export default useGetProfile;
