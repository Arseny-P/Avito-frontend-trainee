import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { specType } from "../../../services/types/SpecType.type";

type specsType = {
  existingSpecs: specType[];
  missingSpecsName: string[];
};

const initialSpecsState: specsType = {
  existingSpecs: [],
  missingSpecsName: [],
};

export const ItemSpecsSLice = createSlice({
  name: "itemSpecs",
  initialState: initialSpecsState,
  selectors: {
    getExistingSpecs: (state: specsType) => state.existingSpecs,
    getMissingSpecsName: (state: specsType) => state.missingSpecsName,
  },
  reducers: {
    setAllSpecs: (
      state,
      action: PayloadAction<{ existing: specType[]; missing: string[] }>,
    ) => {
      state.existingSpecs = action.payload.existing;
      state.missingSpecsName = action.payload.missing;
    },
  },
});
