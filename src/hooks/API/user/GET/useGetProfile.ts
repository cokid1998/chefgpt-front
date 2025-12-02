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
    queryKey: QUERY_KEYS.profile,
    queryFn: () => getProfile(userId),
    select: (data) => data.data,
  });
};

export default useGetProfile;
