import {
  WiBarometer,
  WiCloudy,
  WiDaySunny,
  WiHumidity,
  WiRaindrop,
  WiStrongWind,
  WiSunrise,
  WiSunset
} from "react-icons/wi"
import { FiMapPin } from "react-icons/fi"
import { WeatherIcon } from "@/components/atoms/WeatherIcon/WeatherIcon"
import { WeatherStat } from "@/components/atoms/WeatherStat/WeatherStat"
import { getWeather, getWindDirection } from "@/utils/weatherCodes"
import { getTime } from "@/utils/formatDate"
import { statColors } from "@/styles/colors"
import "./CurrentWeather.scss"

export const CurrentWeather = ({ city, current, onCityClick }) => {
  const condition = current ? getWeather(current.weatherCode).label : ""

  return (
    <section className="current card">
      <button type="button" className="current__city" onClick={onCityClick}>
        <FiMapPin size={16} />
        <span>{city ? city.name : "Város kiválasztása"}</span>
      </button>

      <div className="current__hero">
        <div className="current__icon">
          {current && <WeatherIcon code={current.weatherCode} size={120} />}
        </div>
        <div className="current__main">
          <div className="current__temp">
            {current ? `${current.temperature}°` : "—"}
          </div>
          <div className="current__condition">{condition}</div>
          {current && (
            <div className="current__feels">
              Hőérzet {current.apparentTemperature}°C
            </div>
          )}
        </div>
      </div>

      {current && (
        <div className="current__stats">
          <WeatherStat
            icon={WiHumidity}
            label="Páratartalom"
            value={`${current.humidity}%`}
            color={statColors.humidity}
          />
          <WeatherStat
            icon={WiStrongWind}
            label="Szél"
            value={`${current.windSpeed} km/h ${getWindDirection(current.windDirection)}`}
            color={statColors.wind}
          />
          <WeatherStat
            icon={WiRaindrop}
            label="Csapadék"
            value={`${current.precipitation} mm`}
            color={statColors.precipitation}
          />
          <WeatherStat
            icon={WiDaySunny}
            label="UV index"
            value={current.uvIndex}
            color={statColors.uv}
          />
          <WeatherStat
            icon={WiBarometer}
            label="Légnyomás"
            value={`${current.pressure} hPa`}
            color={statColors.pressure}
          />
          <WeatherStat
            icon={WiCloudy}
            label="Felhőzet"
            value={`${current.cloudCover}%`}
            color={statColors.cloud}
          />
          <WeatherStat
            icon={WiSunrise}
            label="Napkelte"
            value={getTime(current.sunrise)}
            color={statColors.sunrise}
          />
          <WeatherStat
            icon={WiSunset}
            label="Napnyugta"
            value={getTime(current.sunset)}
            color={statColors.sunset}
          />
        </div>
      )}
    </section>
  )
}
