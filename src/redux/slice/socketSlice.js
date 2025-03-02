import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socket: null,
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connectSocket: (state, action) => {
      state.socket = action.payload;
      state.isConnected = true;
    },
    disconnectSocket: (state) => {
      state.socket = null;
      state.isConnected = false;
    },
    updateConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    }
  },
});

export const { connectSocket, disconnectSocket, updateConnectionStatus } = socketSlice.actions;
export default socketSlice.reducer;