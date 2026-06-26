const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1)

// Teljes magyar napnév, pl. "Hétfő"
export const getDayName = dateStr => {
  const name = new Date(dateStr).toLocaleDateString("hu-HU", {
    weekday: "long"
  })
  return capitalize(name)
}

// Rövid magyar napnév a grafikonhoz, pl. "Hét"
export const getShortDay = dateStr => {
  const name = new Date(dateStr).toLocaleDateString("hu-HU", {
    weekday: "short"
  })
  return capitalize(name)
}

// Időpont óra:perc formában, pl. "05:12"
export const getTime = dateStr =>
  new Date(dateStr).toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit"
  })
