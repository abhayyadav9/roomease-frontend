import { createSlice } from "@reduxjs/toolkit";

export const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    data: null,
  },
  reducers: {
    setTenant: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTenant } = tenantSlice.actions;  // Fixed: Correct slice name
export default tenantSlice.reducer;
