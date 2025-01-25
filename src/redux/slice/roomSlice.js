import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    room: [], // Make sure it's an array to store multiple rooms
    selectedRoom: null // Store a single selected room object
  },
  reducers: {
    setRoom(state, action) {
      state.room = action.payload.room || []; // Store array in `room`
    },
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload; // Store single room object in `selectedRoom`
    }
  },
});

// Action creators
export const { setRoom, setSelectedRoom } = roomSlice.actions;
export default roomSlice.reducer;