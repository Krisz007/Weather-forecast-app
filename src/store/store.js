import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "@/store/weatherSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer
  }
})
