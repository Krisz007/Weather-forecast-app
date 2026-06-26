import { describe, it, expect, beforeEach } from "vitest"
import {
  loadCity,
  saveCity,
  loadThemeMode,
  saveThemeMode,
  loadLastTheme,
  saveLastTheme
} from "./storage"

beforeEach(() => {
  localStorage.clear()
})

describe("city tárolás", () => {
  it("ha nincs mentett város, null-t ad", () => {
    expect(loadCity()).toBeNull()
  })

  it("a mentett várost visszaolvassa", () => {
    const city = { id: 1, name: "Budapest", latitude: 47.5, longitude: 19.04 }
    saveCity(city)
    expect(loadCity()).toEqual(city)
  })

  it("hibás JSON esetén null-t ad", () => {
    localStorage.setItem("weather.selectedCity", "{nem-json")
    expect(loadCity()).toBeNull()
  })
})

describe("téma mód tárolás", () => {
  it("alapból null", () => {
    expect(loadThemeMode()).toBeNull()
  })

  it("a mentett módot visszaadja", () => {
    saveThemeMode("night")
    expect(loadThemeMode()).toBe("night")
  })
})

describe("utolsó téma tárolás", () => {
  it("alapból null", () => {
    expect(loadLastTheme()).toBeNull()
  })

  it("a mentett témát visszaolvassa", () => {
    const theme = { weatherCode: 0, isDay: true }
    saveLastTheme(theme)
    expect(loadLastTheme()).toEqual(theme)
  })
})
