import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
      if(state.unreadCount > 0){
        state.unreadCount -= 1;
      }
      }
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        read: true,
      }));
      state.unreadCount = 0;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      // state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
