import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiRain,
  WiRainMix,
  WiShowers,
  WiSleet,
  WiSnow,
  WiSnowflakeCold,
  WiSnowWind,
  WiSprinkle,
  WiStormShowers,
  WiThunderstorm
} from "react-icons/wi"

// WMO időjárás-kód → magyar megnevezés + ikon
// Forrás: https://open-meteo.com/en/docs (WMO Weather interpretation codes)
const WEATHER_MAP = {
  0: { label: "Tiszta idő", icon: WiDaySunny },
  1: { label: "Túlnyomóan derült", icon: WiDaySunnyOvercast },
  2: { label: "Részben felhős", icon: WiDayCloudy },
  3: { label: "Borult", icon: WiCloudy },
  45: { label: "Köd", icon: WiFog },
  48: { label: "Zúzmarás köd", icon: WiFog },
  51: { label: "Gyenge szitálás", icon: WiSprinkle },
  53: { label: "Szitálás", icon: WiSprinkle },
  55: { label: "Erős szitálás", icon: WiSprinkle },
  56: { label: "Ónos szitálás", icon: WiSleet },
  57: { label: "Erős ónos szitálás", icon: WiSleet },
  61: { label: "Gyenge eső", icon: WiRain },
  63: { label: "Eső", icon: WiRain },
  65: { label: "Erős eső", icon: WiRain },
  66: { label: "Ónos eső", icon: WiRainMix },
  67: { label: "Erős ónos eső", icon: WiRainMix },
  71: { label: "Gyenge havazás", icon: WiSnow },
  73: { label: "Havazás", icon: WiSnow },
  75: { label: "Erős havazás", icon: WiSnow },
  77: { label: "Hószemcsék", icon: WiSnowflakeCold },
  80: { label: "Gyenge zápor", icon: WiShowers },
  81: { label: "Zápor", icon: WiShowers },
  82: { label: "Heves zápor", icon: WiShowers },
  85: { label: "Gyenge hózápor", icon: WiSnowWind },
  86: { label: "Erős hózápor", icon: WiSnowWind },
  95: { label: "Zivatar", icon: WiThunderstorm },
  96: { label: "Zivatar jégesővel", icon: WiStormShowers },
  99: { label: "Erős zivatar jégesővel", icon: WiStormShowers }
}

const FALLBACK = { label: "Ismeretlen", icon: WiCloudy }

export const getWeather = code => WEATHER_MAP[code] ?? FALLBACK

// Szélirány fokból magyar égtáj-rövidítéssé (pl. 90° → "K")
const COMPASS = ["É", "ÉK", "K", "DK", "D", "DNy", "Ny", "ÉNy"]

export const getWindDirection = degrees => COMPASS[Math.round(degrees / 45) % 8]

// Ikonszín kódonként
export const getWeatherColor = code => {
  if (code === 0) return "#ffd66b" // tiszta idő – nap
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "#9fd4ff" // szitálás, eső, zápor
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "#cfeaff" // hó
  if (code >= 95 && code <= 99) return "#c5c5c5" // zivatar, borult
  return "#ffffff" // derült, felhős
}
