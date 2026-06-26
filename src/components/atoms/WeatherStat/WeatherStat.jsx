import "./WeatherStat.scss"

export const WeatherStat = ({ icon: Icon, label, value, color }) => (
  <div className="weather-stat">
    <span className="weather-stat__icon" style={color ? { color } : undefined}>
      <Icon size={26} />
    </span>
    <span className="weather-stat__value">{value}</span>
    <span className="weather-stat__label">{label}</span>
  </div>
)
