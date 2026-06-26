import { getWeather, getWeatherColor } from "@/utils/weatherCodes"
import "./WeatherIcon.scss"

export const WeatherIcon = ({ code, size = 32, className = "" }) => {
  const { label, icon: Icon } = getWeather(code)
  const color = getWeatherColor(code)

  return (
    <span
      className={`weather-icon ${className}`.trim()}
      title={label}
      style={{ color }}
    >
      <Icon size={size} aria-label={label} role="img" />
    </span>
  )
}
