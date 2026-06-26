import { describe, it, expect } from "vitest"
import { getWeather, getWindDirection, getWeatherColor } from "./weatherCodes"

describe("getWeather", () => {
  it("ismert kódhoz a megfelelő megnevezést adja", () => {
    expect(getWeather(0).label).toBe("Tiszta idő")
    expect(getWeather(95).label).toBe("Zivatar")
  })

  it("ismeretlen kódhoz a tartalék értéket adja", () => {
    expect(getWeather(1234).label).toBe("Ismeretlen")
  })

  it("mindig ad ikon komponenst", () => {
    expect(typeof getWeather(0).icon).toBe("function")
    expect(typeof getWeather(9999).icon).toBe("function")
  })
})

describe("getWindDirection", () => {
  it("a fokot a megfelelő égtájra alakítja", () => {
    expect(getWindDirection(0)).toBe("É")
    expect(getWindDirection(90)).toBe("K")
    expect(getWindDirection(180)).toBe("D")
    expect(getWindDirection(270)).toBe("Ny")
  })

  it("360 fokot visszaköröz É-ra", () => {
    expect(getWindDirection(360)).toBe("É")
  })

  it("a legközelebbi égtájra kerekít", () => {
    expect(getWindDirection(44)).toBe("ÉK")
  })
})

describe("getWeatherColor", () => {
  it("tiszta időhöz napsárgát ad", () => {
    expect(getWeatherColor(0)).toBe("#ffd66b")
  })

  it("esőhöz kék árnyalatot ad", () => {
    expect(getWeatherColor(63)).toBe("#9fd4ff")
  })

  it("hóhoz világoskéket ad", () => {
    expect(getWeatherColor(73)).toBe("#cfeaff")
  })

  it("zivatarhoz szürkét ad", () => {
    expect(getWeatherColor(95)).toBe("#c5c5c5")
  })

  it("egyéb kódhoz fehéret ad", () => {
    expect(getWeatherColor(2)).toBe("#ffffff")
  })
})
