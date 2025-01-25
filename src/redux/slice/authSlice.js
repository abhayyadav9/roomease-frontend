import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading,logout } = authSlice.actions;
export default authSlice.reducer;