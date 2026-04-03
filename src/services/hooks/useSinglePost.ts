import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api/postsApi";

export function useGetSinglePost(id: string) {
    return useQuery({
        queryKey: ["posts", id],
        queryFn: () => postsApi.getSinglePost(id),
    })
}