import API from "@/hooks/API";
import { useQuery } from "@tanstack/react-query";

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getPost = () => {
  return API.get<PostType[]>("https://jsonplaceholder.typicode.com/posts");
};

export const useGetPost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
    select: (data) => data.data,
  });
};
