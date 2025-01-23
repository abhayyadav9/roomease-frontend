import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import ownerReducer from "./slice/ownerSlice"




export const store = configureStore({
    reducer: {
      auth: authReducer,
      owner: ownerReducer
    },
  })