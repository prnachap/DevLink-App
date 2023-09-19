import { FormValues } from "@/global";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FormValues = {
  linksList: [],
};

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    onSave: (state, action: PayloadAction<FormValues>) => {
      state.linksList = action.payload.linksList;
    },
  },
});

export const { onSave } = linkSlice.actions;
export default linkSlice.reducer;
