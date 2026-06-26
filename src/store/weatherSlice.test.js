import { describe, it, expect, beforeEach } from "vitest"
import reducer, { setSelectedCity, fetchForecast } from "./weatherSlice"

beforeEach(() => {
  localStorage.clear()
})

const baseState = {
  selectedCity: null,
  current: null,
  daily: [],
  lastTheme: null,
  status: "idle",
  error: null
}

describe("weatherSlice reducer", () => {
  it("setSelectedCity beállítja a várost", () => {
    const city = { id: 1, name: "Budapest", latitude: 47.5, longitude: 19.04 }
    const state = reducer(baseState, setSelectedCity(city))
    expect(state.selectedCity).toEqual(city)
  })

  it("fetchForecast.pending betöltési állapotba vált", () => {
    const state = reducer(baseState, { type: fetchForecast.pending.type })
    expect(state.status).toBe("loading")
    expect(state.error).toBeNull()
  })

  it("fetchForecast.fulfilled feltölti az adatokat és témát", () => {
    const payload = {
      current: { temperature: 20, weatherCode: 1, isDay: true },
      daily: [{ date: "2026-06-22", weatherCode: 1 }]
    }
    const state = reducer(baseState, {
      type: fetchForecast.fulfilled.type,
      payload
    })
    expect(state.status).toBe("succeeded")
    expect(state.current).toEqual(payload.current)
    expect(state.daily).toEqual(payload.daily)
    expect(state.lastTheme).toEqual({ weatherCode: 1, isDay: true })
  })

  it("fetchForecast.rejected hibát állít be", () => {
    const state = reducer(baseState, {
      type: fetchForecast.rejected.type,
      error: { message: "Hálózati hiba" }
    })
    expect(state.status).toBe("failed")
    expect(state.error).toBe("Hálózati hiba")
  })
})
