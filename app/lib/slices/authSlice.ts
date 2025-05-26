import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state
interface AuthState {
  isAuthenticated: boolean;
  user: any | null; // Replace `any` with your User type if you have one
  token: string | null;
  loading: boolean;
}

// Initial state with proper typing
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
