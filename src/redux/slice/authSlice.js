import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // loading: false,
    selectedUser:null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // setLoading: (state, action) => {
    //   state.loading = action.payload;
    // },
    setSelectedUser: (state, action) =>{
      state.selectedUser = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading,logout , setSelectedUser} = authSlice.actions;
export default authSlice.reducer;