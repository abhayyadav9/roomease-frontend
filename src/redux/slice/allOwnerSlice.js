import { createSlice } from "@reduxjs/toolkit";

export const allOwnerSlice = createSlice({
  name: "allOwner",
  initialState: {
    allOwnerData: null,  
  },
  reducers: {
    setAllOwnerData: (state, action) => {
      state.allOwnerData = action.payload;
    },
  },
});

export const { setAllOwnerData } = allOwnerSlice.actions; // Corrected export name
export default allOwnerSlice.reducer;
