import { createSlice } from "@reduxjs/toolkit";

export const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    data: null,
    loading: false,
    error: null,
    bookmarks:[]

  },

  reducers: {
    setTenant: (state, action) => {
      state.data = action.payload;
    },
    setTenantLoading: (state, action) => {
      state.loading = action.payload;

    },
    setTenantError: (state, action) => {
      state.error = action.payload;
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload || [];

    }
  },
});

export const { setTenant, setBookmarks, setTenantError, setTenantLoading } = tenantSlice.actions;  // Fixed: Correct slice name
export default tenantSlice.reducer;
