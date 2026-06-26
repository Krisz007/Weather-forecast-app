import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { WeatherStat } from "./WeatherStat"
import { statColors } from "@/styles/colors"

const DummyIcon = () => <svg data-testid="icon" />

describe("WeatherStat", () => {
  it("megjeleníti az értéket és a címkét", () => {
    render(<WeatherStat icon={DummyIcon} label="Páratartalom" value="55%" />)
    expect(screen.getByText("55%")).toBeInTheDocument()
    expect(screen.getByText("Páratartalom")).toBeInTheDocument()
  })

  it("kirajzolja az átadott ikont", () => {
    render(<WeatherStat icon={DummyIcon} label="Szél" value="12 km/h" />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("alkalmazza a megadott színt az ikonra", () => {
    const { container } = render(
      <WeatherStat
        icon={DummyIcon}
        label="UV-index"
        value="6"
        color={statColors.uv}
      />
    )
    const iconWrapper = container.querySelector(".weather-stat__icon")
    expect(iconWrapper).toHaveStyle({ color: statColors.uv })
  })
})
