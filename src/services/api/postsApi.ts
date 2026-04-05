import { api } from "./api";
import { type ItemsGetOut } from "../types/PostsList.type";
import type { FilterType } from "../types/FilterType.type";
import type { SingleItemGetOut } from "../types/SinglePost.type";

const buildQueryParams = (filters: FilterType): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '' || value === false){
        return;
    }

    if (key === 'categories' && Array.isArray(value)) {
      if (value.length > 0) {
        params.append(key, value.join(','));
      }
      return;
    }

    params.append(key, value.toString());
  });

  return params.toString();
};

export const postsApi = {
    getPosts: async (params: FilterType, signal: AbortSignal) => {
        const { data } : {data: ItemsGetOut} = await api.get("/items", { params: params, signal, paramsSerializer: { serialize: buildQueryParams } });
        return data;
    },
    getSinglePost: async(id: string, signal: AbortSignal) => {
        const { data } : {data: SingleItemGetOut} = await api.get(`/items/${id}`, {signal});
        return data;
    }
}