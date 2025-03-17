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
    },
    updateRoomStatus: (state, action) => {
      const room = state.room.find(r => r._id === action.payload.roomId);
      if (room) {
        room.status = action.payload.status;
      }
    },
    updateRoomAvailability: (state, action) => {
      const room = state.room.find(r => r._id === action.payload.roomId);
      if (room) {
        room.availability = action.payload.status;
      }
    }
  },
});

export const { setRoom, setSelectedRoom,setSearchQuery,updateRoomStatus ,updateRoomAvailability} = roomSlice.actions;
export default roomSlice.reducer;
