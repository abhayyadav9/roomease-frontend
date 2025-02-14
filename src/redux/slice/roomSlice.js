import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    room: [],
    selectedRoom: null,
  
  },
  reducers: {
    setRoom(state, action) {
      state.room = action.payload.room || [];
    },
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload;
    }
  },
});

export const { setRoom, setSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;
