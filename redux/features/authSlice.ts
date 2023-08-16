import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onSuccess: (state, action: PayloadAction<{ success: boolean }>) => {
      state.success = action.payload.success;
      state.error = null;
    },
    onError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.success = false;
      state.error = action.payload.error;
    },
  },
});

export const { onError, onSuccess } = authSlice.actions;
export default authSlice.reducer;
