const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

// Városok keresése név alapján (Open-Meteo Geocoding API)
export const searchCities = async query => {
  const params = new URLSearchParams({
    name: query,
    count: "10",
    language: "hu",
    format: "json"
  })

  const response = await fetch(`${GEOCODING_URL}?${params}`)
  if (!response.ok) {
    throw new Error("Hiba történt a városkeresés során.")
  }

  const data = await response.json()
  const results = data.results ?? []
  // Csak lakott helyek (városok, falvak) – kiszűrjük az országokat és közigazgatási egységeket
  return results.filter(place => place.feature_code?.startsWith("PPL"))
}

const CURRENT_FIELDS = [
  "temperature_2m",
  "apparent_temperature",
  "relative_humidity_2m",
  "weather_code",
  "wind_speed_10m",
  "wind_direction_10m",
  "precipitation",
  "surface_pressure",
  "cloud_cover",
  "is_day"
].join(",")

const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_probability_max",
  "precipitation_sum",
  "wind_speed_10m_max",
  "uv_index_max",
  "sunrise",
  "sunset"
].join(",")

// Aktuális + 7 napos előrejelzés lekérése koordináták alapján (Open-Meteo Forecast API)
export const fetchForecast = async (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: CURRENT_FIELDS,
    daily: DAILY_FIELDS,
    timezone: "auto",
    forecast_days: "7"
  })

  const response = await fetch(`${FORECAST_URL}?${params}`)
  if (!response.ok) {
    throw new Error("Hiba történt az időjárás-adatok lekérése során.")
  }

  const data = await response.json()
  return normalizeForecast(data)
}

// A nyers API-választ a komponensek által használt formára alakítja
const normalizeForecast = data => {
  const c = data.current
  const d = data.daily

  const current = {
    temperature: Math.round(c.temperature_2m),
    apparentTemperature: Math.round(c.apparent_temperature),
    weatherCode: c.weather_code,
    humidity: Math.round(c.relative_humidity_2m),
    windSpeed: Math.round(c.wind_speed_10m),
    windDirection: c.wind_direction_10m,
    precipitation: c.precipitation,
    pressure: Math.round(c.surface_pressure),
    cloudCover: Math.round(c.cloud_cover),
    isDay: c.is_day === 1,
    uvIndex: Math.round(d.uv_index_max[0]),
    sunrise: d.sunrise[0],
    sunset: d.sunset[0]
  }

  const daily = d.time.map((date, index) => ({
    date,
    weatherCode: d.weather_code[index],
    tempMax: Math.round(d.temperature_2m_max[index]),
    tempMin: Math.round(d.temperature_2m_min[index]),
    precipProb: d.precipitation_probability_max[index] ?? 0
  }))

  return { current, daily }
}
