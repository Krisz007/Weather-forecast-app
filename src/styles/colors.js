// JS-ből használt színek egy helyen.
// Ide azok a színek kerülnek, amelyeket nem CSS, hanem JavaScript olvas:
// Recharts SVG propok, ikon `color` propok és inline `style` értékek.
// A tisztán CSS-ben használt színek továbbra is az _variables.scss-ben élnek.

// Fehér áttetsző árnyalatok (a chart vonalai, rácsa, tooltip-kurzora).
export const white = {
  solid: "#ffffff",
  a18: "rgba(255, 255, 255, 0.18)",
  a45: "rgba(255, 255, 255, 0.45)",
  a85: "rgba(255, 255, 255, 0.85)"
}

// A jelenlegi időjárás statisztika-ikonjainak színei (CurrentWeather).
export const statColors = {
  humidity: "#9fd4ff",
  wind: "#a9e7da",
  precipitation: "#9fd4ff",
  uv: "#ffb74d",
  pressure: "#c7b3ff",
  cloud: "#ffffff",
  sunrise: "#ffca7a",
  sunset: "#ff9e7a"
}

// Háttér-gradiensek napszak szerint.
export const background = {
  day: "linear-gradient(160deg, #1c84ef 0%, #48b0e8 100%)",
  night: "linear-gradient(160deg, #0f2027 0%, #203a43 55%, #2c5364 100%)"
}
