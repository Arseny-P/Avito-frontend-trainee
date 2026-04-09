import { useQuery } from "@tanstack/react-query";
import { postsApi } from "@/services/api/postsApi";
import type { FilterType } from "@/services/types/FilterType.type";

export function useGetPosts(params: FilterType) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: ({ signal }) => postsApi.getPosts(params, signal),
  });
}
