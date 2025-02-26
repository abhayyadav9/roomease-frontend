import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    room: [],
    selectedRoom: null,
    searchQuery:null
  
  },
  reducers: {
    setRoom(state, action) {
      state.room = action.payload.room || [];
    },
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    }
  },
});

export const { setRoom, setSelectedRoom,setSearchQuery } = roomSlice.actions;
export default roomSlice.reducer;
