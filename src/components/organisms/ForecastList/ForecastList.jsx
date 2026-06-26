import { ForecastDayCard } from "@/components/molecules/ForecastDayCard/ForecastDayCard"
import "./ForecastList.scss"

export const ForecastList = ({ days }) => {
  const weekMin = Math.min(...days.map(day => day.tempMin))
  const weekMax = Math.max(...days.map(day => day.tempMax))

  return (
    <section className="forecast-list card">
      <h2 className="forecast-list__title">7 napos előrejelzés</h2>
      <div className="forecast-list__rows">
        {days.map(day => (
          <ForecastDayCard
            key={day.date}
            day={day}
            weekMin={weekMin}
            weekMax={weekMax}
          />
        ))}
      </div>
    </section>
  )
}
