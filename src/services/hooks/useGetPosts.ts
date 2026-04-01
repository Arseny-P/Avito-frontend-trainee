import { useQuery } from "@tanstack/react-query";
import { postsApi } from "../api/postsApi";

export function useGetPosts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: () => postsApi.getPosts(),
    })
}