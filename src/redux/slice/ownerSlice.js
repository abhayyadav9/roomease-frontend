import { createSlice } from "@reduxjs/toolkit";

export const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    data: null,  // ✅ Renamed from "owner" to "data" for clarity
    loading: false,
    error: null, // ✅ Added error state for better debugging
  },
  reducers: {
    setOwner: (state, action) => {
      state.data = action.payload;
      state.loading = false; // ✅ Ensure loading is false after setting data
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => { // ✅ Added an error state for better tracking
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setOwner, setLoading, setError } = ownerSlice.actions;
export default ownerSlice.reducer;
