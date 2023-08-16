import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  error: null,
  success: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onSuccess: (state, action: PayloadAction<{ success: string | null }>) => {
      state.success = action.payload.success;
      state.error = null;
    },
    onError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.success = null;
      state.error = action.payload.error;
    },
  },
});

export const { onError, onSuccess } = authSlice.actions;
export default authSlice.reducer;
