import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchForecast, setSelectedCity } from "@/store/weatherSlice"
import { WeatherLayout } from "@/components/templates/WeatherLayout/WeatherLayout"
import { CurrentWeather } from "@/components/molecules/CurrentWeather/CurrentWeather"
import { ForecastList } from "@/components/organisms/ForecastList/ForecastList"
import { TemperatureChart } from "@/components/organisms/TemperatureChart/TemperatureChart"
import { CitySearchModal } from "@/components/organisms/CitySearchModal/CitySearchModal"
import { Spinner } from "@/components/atoms/Spinner/Spinner"
import { getBackground } from "@/utils/weatherTheme"
import { loadThemeMode, saveThemeMode } from "@/utils/storage"
import "./App.scss"

const APPLICANT_NAME = "Csia Krisztián"

function App() {
  const dispatch = useDispatch()
  const { selectedCity, current, daily, status, error, lastTheme } =
    useSelector(state => state.weather)
  // A modal automatikusan nyílik, ha még nincs kiválasztott város (első megnyitás)
  const [isModalOpen, setIsModalOpen] = useState(!selectedCity)
  // A felhasználó által választott nappali/éjszakai mód (felülírja az automatikust)
  const [themeMode, setThemeMode] = useState(loadThemeMode())

  // A kiválasztott város (akár a localStorage-ból visszatöltött) adatainak lekérése
  useEffect(() => {
    if (selectedCity) {
      dispatch(fetchForecast(selectedCity))
    }
  }, [dispatch, selectedCity])

  const handleSelect = city => {
    dispatch(
      setSelectedCity({
        id: city.id,
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        country: city.country,
        admin1: city.admin1
      })
    )
    setIsModalOpen(false)
  }

  const handleToggleTheme = () => {
    const next = isDay ? "night" : "day"
    setThemeMode(next)
    saveThemeMode(next)
  }

  const renderForecast = () => {
    if (!selectedCity) {
      return (
        <p className="app__hint">Válassz várost az időjárás megtekintéséhez.</p>
      )
    }
    if (status === "loading" || status === "idle") {
      return (
        <div className="app__state">
          <Spinner />
        </div>
      )
    }
    if (status === "failed") {
      return <p className="app__state app__error">{error}</p>
    }
    return (
      <>
        <ForecastList days={daily} />
        <TemperatureChart days={daily} />
      </>
    )
  }

  // A nappal/éjszaka a friss adatból, vagy a korábban elmentett témából
  const themeSource = status === "succeeded" && current ? current : lastTheme
  const isDay = themeMode ? themeMode === "day" : (themeSource?.isDay ?? true)
  const background = getBackground(isDay)

  return (
    <>
      <WeatherLayout
        background={background}
        isDay={isDay}
        onToggleTheme={handleToggleTheme}
        left={
          <CurrentWeather
            city={selectedCity}
            current={status === "succeeded" ? current : null}
            onCityClick={() => setIsModalOpen(true)}
          />
        }
        right={renderForecast()}
        footer={APPLICANT_NAME}
      />
      {isModalOpen && (
        <CitySearchModal
          onSelect={handleSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default App
