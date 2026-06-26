import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { searchCities, fetchForecast } from "./weatherApi"

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const okResponse = data => ({ ok: true, json: async () => data })

describe("searchCities", () => {
  it("csak a lakott helyeket (PPL) adja vissza", async () => {
    fetch.mockResolvedValue(
      okResponse({
        results: [
          { id: 1, name: "Budapest", feature_code: "PPLC" },
          { id: 2, name: "Magyarország", feature_code: "PCLI" },
          { id: 3, name: "Pest", feature_code: "ADM1" }
        ]
      })
    )

    const result = await searchCities("bp")
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe("Budapest")
  })

  it("üres találat esetén üres tömböt ad", async () => {
    fetch.mockResolvedValue(okResponse({}))
    expect(await searchCities("xyz")).toEqual([])
  })

  it("hibás válasz esetén hibát dob", async () => {
    fetch.mockResolvedValue({ ok: false })
    await expect(searchCities("bp")).rejects.toThrow(
      "Hiba történt a városkeresés során."
    )
  })
})

describe("fetchForecast", () => {
  const rawData = {
    current: {
      temperature_2m: 21.6,
      apparent_temperature: 20.1,
      weather_code: 1,
      relative_humidity_2m: 55.4,
      wind_speed_10m: 12.7,
      wind_direction_10m: 180,
      precipitation: 0,
      surface_pressure: 1013.6,
      cloud_cover: 30.2,
      is_day: 1
    },
    daily: {
      time: ["2026-06-22", "2026-06-23"],
      weather_code: [1, 3],
      temperature_2m_max: [25.4, 22.8],
      temperature_2m_min: [14.1, 12.9],
      precipitation_probability_max: [10, null],
      uv_index_max: [6.3, 5.1],
      sunrise: ["2026-06-22T05:12", "2026-06-23T05:13"],
      sunset: ["2026-06-22T20:45", "2026-06-23T20:45"]
    }
  }

  it("a nyers választ normalizálja és kerekíti", async () => {
    fetch.mockResolvedValue(okResponse(rawData))

    const { current, daily } = await fetchForecast(47.5, 19.04)

    expect(current.temperature).toBe(22)
    expect(current.weatherCode).toBe(1)
    expect(current.isDay).toBe(true)
    expect(current.uvIndex).toBe(6)
    expect(current.sunrise).toBe("2026-06-22T05:12")

    expect(daily).toHaveLength(2)
    expect(daily[0]).toEqual({
      date: "2026-06-22",
      weatherCode: 1,
      tempMax: 25,
      tempMin: 14,
      precipProb: 10
    })
    // null csapadékvalószínűség 0-ra esik vissza
    expect(daily[1].precipProb).toBe(0)
  })

  it("hibás válasz esetén hibát dob", async () => {
    fetch.mockResolvedValue({ ok: false })
    await expect(fetchForecast(47.5, 19.04)).rejects.toThrow(
      "Hiba történt az időjárás-adatok lekérése során."
    )
  })
})
