import { api } from "./api";
import { type ItemsGetOut } from "../types/PostsList.type";

export const postsApi = {
    getPosts: async () => {
        const { data } : {data: ItemsGetOut} = await api.get("/items");
        return data;
    },
}