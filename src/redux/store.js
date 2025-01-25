import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import ownerReducer from "./slice/ownerSlice";
import roomReducer from "./slice/roomSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { combineReducers } from "redux";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "owner", "room"], // Only persist these slices
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
  owner: ownerReducer,
  room: roomReducer,
});

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);
