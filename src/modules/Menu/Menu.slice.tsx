import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type menuState = {
    needsRevision: boolean,
    categories: string[]
}

const initialMenuState: menuState = {
    needsRevision: false,
    categories: []
}

export const MenuSlice = createSlice({
    name: "menu",
    initialState: initialMenuState,
    selectors: {
        getCategories: (state: menuState) => state.categories
    },
    reducers: {
        setNeedsRevision: (state: menuState, action: PayloadAction<boolean>) => {
            state.needsRevision = action.payload;
        },

        setCategory: (state: menuState, action: PayloadAction<string>) => {
            state.categories.push(action.payload);
        },
        delCategory: (state: menuState, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(category => category !== action.payload);
        },

        clearCategories: (state: menuState) => {
            state.categories = [];
            
        }
    },
});