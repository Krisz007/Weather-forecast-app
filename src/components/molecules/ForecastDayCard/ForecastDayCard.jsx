import { WiRaindrop } from "react-icons/wi"
import { WeatherIcon } from "@/components/atoms/WeatherIcon/WeatherIcon"
import { getDayName } from "@/utils/formatDate"
import "./ForecastDayCard.scss"

export const ForecastDayCard = ({ day, weekMin, weekMax }) => {
  const range = weekMax - weekMin || 1
  const offset = ((day.tempMin - weekMin) / range) * 100
  const width = ((day.tempMax - day.tempMin) / range) * 100

  return (
    <div className="forecast-day">
      <span className="forecast-day__name">{getDayName(day.date)}</span>
      <span className="forecast-day__icon">
        <WeatherIcon code={day.weatherCode} size={34} />
      </span>
      <span className="forecast-day__precip">
        <WiRaindrop size={18} />
        {day.precipProb}%
      </span>
      <span className="forecast-day__min">{day.tempMin}°</span>
      <span className="forecast-day__bar">
        <span
          className="forecast-day__bar-fill"
          style={{ marginLeft: `${offset}%`, width: `${width}%` }}
        />
      </span>
      <span className="forecast-day__max">{day.tempMax}°</span>
    </div>
  )
}
