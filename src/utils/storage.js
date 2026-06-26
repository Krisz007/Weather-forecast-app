const CITY_KEY = "weather.selectedCity"

export const loadCity = () => {
  try {
    const raw = localStorage.getItem(CITY_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const saveCity = city => {
  try {
    localStorage.setItem(CITY_KEY, JSON.stringify(city))
  } catch {
    // A tárolás sikertelen lehet (pl. privát mód) – ilyenkor figyelmen kívül hagyjuk.
  }
}

const THEME_MODE_KEY = "weather.themeMode"
const LAST_THEME_KEY = "weather.lastTheme"

// A felhasználó által választott nappali/éjszakai mód ("day" | "night" | null)
export const loadThemeMode = () => {
  try {
    return localStorage.getItem(THEME_MODE_KEY) || null
  } catch {
    return null
  }
}

export const saveThemeMode = mode => {
  try {
    localStorage.setItem(THEME_MODE_KEY, mode)
  } catch {
    // figyelmen kívül hagyjuk
  }
}

// Az utolsó ismert téma ({ weatherCode, isDay }) – hogy induláskor a végleges háttér jelenjen meg
export const loadLastTheme = () => {
  try {
    const raw = localStorage.getItem(LAST_THEME_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const saveLastTheme = theme => {
  try {
    localStorage.setItem(LAST_THEME_KEY, JSON.stringify(theme))
  } catch {
    // figyelmen kívül hagyjuk
  }
}
