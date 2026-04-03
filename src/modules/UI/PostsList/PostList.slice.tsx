import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type postListState = {
    needsRevision: boolean,
    categories: string[],
    page: number,
    search: string,
    sortColumn: 'title' | 'createdAt' | 'price',
    sortDirection: 'asc' | 'desc',
    vision: 'table' | 'list',
}

const initialpostListState: postListState = {
    needsRevision: false,
    categories: [],
    page: 0,
    search: '',
    sortColumn: 'createdAt',
    sortDirection: 'asc',
    vision: 'table',
}

export const PostListSlice = createSlice({
    name: "postList",
    initialState: initialpostListState,
    selectors: {
        getCategories: (state: postListState) => state.categories,
        getNeedsRevision: (state: postListState) => state.needsRevision,
        getpage: (state: postListState) => state.page,
        getSearch: (state: postListState) => state.search,
        getSortColumn: (state: postListState) => state.sortColumn,
        getSortDirection: (state: postListState) => state.sortDirection,
        getVision: (state: postListState) => state.vision
    },
    reducers: {
        setNeedsRevision: (state: postListState, action: PayloadAction<boolean>) => {
            state.needsRevision = action.payload;
        },

        setCategory: (state: postListState, action: PayloadAction<string>) => {
            state.categories.push(action.payload);
        },
        delCategory: (state: postListState, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(category => category !== action.payload);
        },

        clearCategories: (state: postListState) => {
            state.categories = [];   
        },

        setPage: (state: postListState, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        setSearch: (state: postListState, action: PayloadAction<string>) => {
            state.search = action.payload;
        },

        setSortColumn: (state: postListState, action: PayloadAction<'title' | 'createdAt' | 'price'>) => {
            state.sortColumn = action.payload;
        },

        setSortDirection: (state: postListState, action: PayloadAction<'asc' | 'desc'>) => {
            state.sortDirection = action.payload;
        },

        setVision: (state: postListState, action: PayloadAction<'table' | 'list'>) => {
            state.vision = action.payload;
        },
    },
});