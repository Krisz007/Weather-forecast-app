import { describe, it, expect } from "vitest"
import { getDayName, getShortDay, getTime } from "./formatDate"

describe("getDayName", () => {
  it("teljes, nagy kezdőbetűs magyar napnevet ad", () => {
    // 2026-06-22 hétfő
    expect(getDayName("2026-06-22")).toBe("Hétfő")
  })
})

describe("getShortDay", () => {
  it("rövid, nagy kezdőbetűs napnevet ad", () => {
    const result = getShortDay("2026-06-22")
    expect(result[0]).toBe(result[0].toUpperCase())
    expect(result.length).toBeGreaterThan(0)
  })
})

describe("getTime", () => {
  it("óra:perc formátumban ad időt", () => {
    expect(getTime("2026-06-22T05:12:00")).toMatch(/^\d{2}:\d{2}$/)
  })
})
