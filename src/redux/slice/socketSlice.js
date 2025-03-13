// redux/slice/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketio",
  initialState: {
    socket: null,
    isConnected: false,
  },
  reducers: {
    setSocket(state, action) {
      // Expect action.payload to have the shape: { socket, isConnected }
      state.socket = action.payload.socket;
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
