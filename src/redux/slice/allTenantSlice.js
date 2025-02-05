import { createSlice } from "@reduxjs/toolkit";

export const allTenantSlice = createSlice({
  name: "allTenant",
  initialState: {
    allTenantData: null,  
  },
  reducers: {
    setAllTenantData: (state, action) => {
      state.allTenantData = action.payload;
    },
  },
});

export const { setAllTenantData } = allTenantSlice.actions; // Corrected export name
export default allTenantSlice.reducer;
