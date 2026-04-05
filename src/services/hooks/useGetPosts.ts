import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api/postsApi";
import type { FilterType } from "../types/FilterType.type";

export function useGetPosts(params: FilterType) {
    return useQuery({
        queryKey: ["posts", params],
        queryFn: ({signal}) => postsApi.getPosts(params, signal),
    })
}