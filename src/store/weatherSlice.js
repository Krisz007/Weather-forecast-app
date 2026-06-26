import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchForecast as fetchForecastApi } from "@/services/weatherApi"
import {
  loadCity,
  loadLastTheme,
  saveCity,
  saveLastTheme
} from "@/utils/storage"

// Az előrejelzés aszinkron lekérése a kiválasztott város koordinátái alapján
export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async city => {
    return fetchForecastApi(city.latitude, city.longitude)
  }
)

const initialState = {
  selectedCity: loadCity(), // { id, name, latitude, longitude, country, admin1 } | null
  current: null, // { temperature, weatherCode }
  daily: [], // [{ date, weatherCode, tempMax, tempMin, precipProb }]
  lastTheme: loadLastTheme(), // { weatherCode, isDay } | null – induláskori háttérhez
  status: "idle", // idle | loading | succeeded | failed
  error: null
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload
      saveCity(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchForecast.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.current = action.payload.current
        state.daily = action.payload.daily
        const theme = {
          weatherCode: action.payload.current.weatherCode,
          isDay: action.payload.current.isDay
        }
        state.lastTheme = theme
        saveLastTheme(theme)
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  }
})

export const { setSelectedCity } = weatherSlice.actions
export default weatherSlice.reducer
