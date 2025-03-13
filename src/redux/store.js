import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import ownerReducer from "./slice/ownerSlice";
import roomReducer from "./slice/roomSlice";
import tenantReducer from "./slice/tenantSlice";
import requirementReducer from "./slice/requirementSlice";
import themeReducer from "./slice/themeSlice";
import allOwnerReducer from "./slice/allOwnerSlice"; // Corrected import path
import allTenantReducer from "./slice/allTenantSlice";
import notificationReducer from "./slice/notificationSlice";
import socketSlice from "./slice/socketSlice";
import messageReducer from "./slice/messageSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "redux";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "owner",
    "room",
    "tenant",
    "requirement",
    "theme",
    "allOwner", // Corrected the persisted state name
    "allTenant",
    "notifications", // Ensure key matches the reducer key below
    "message", 
    // "socketio" removed to avoid serialization issues
  ],
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
  owner: ownerReducer,
  room: roomReducer,
  tenant: tenantReducer,
  requirement: requirementReducer, // Ensures the requirement slice is persisted
  theme: themeReducer,
  allOwner: allOwnerReducer, // Added correct allOwner reducer
  allTenant: allTenantReducer, 
  notifications: notificationReducer, // Note key is "notifications"
  socketio: socketSlice,
  message: messageReducer, 
});

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist to bypass serializable checks
    }),
});

// Persistor for rehydration
export const persistor = persistStore(store);
