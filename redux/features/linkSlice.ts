import { type FormValues } from "@/global";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FormValues & { isFormChanged: boolean } = {
  linksList: [],
  isFormChanged: false,
};

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    onSave: (state, action: PayloadAction<FormValues>) => {
      state.linksList = action.payload.linksList;
    },
    onFormChange: (state, action: PayloadAction<{ isDirty: boolean }>) => {
      state.isFormChanged = action.payload.isDirty;
    },
  },
});

export const { onSave, onFormChange } = linkSlice.actions;
export default linkSlice.reducer;
