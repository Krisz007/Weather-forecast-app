import { FiMoon, FiSun } from "react-icons/fi"
import "./WeatherLayout.scss"

export const WeatherLayout = ({
  background,
  isDay,
  onToggleTheme,
  left,
  right,
  footer
}) => (
  <div className="layout">
    <div
      className="layout__bg"
      style={background ? { background } : undefined}
    />
    <div className="layout__inner">
      <header className="layout__header">
        <button
          type="button"
          className={`theme-switch ${isDay ? "is-day" : "is-night"}`}
          onClick={onToggleTheme}
          role="switch"
          aria-checked={!isDay}
          aria-label={isDay ? "Váltás éjszakai módra" : "Váltás nappali módra"}
          title={isDay ? "Éjszakai mód" : "Nappali mód"}
        >
          <FiSun
            className="theme-switch__ghost theme-switch__ghost--sun"
            size={13}
          />
          <FiMoon
            className="theme-switch__ghost theme-switch__ghost--moon"
            size={13}
          />
          <span className="theme-switch__knob">
            {isDay ? <FiSun size={15} /> : <FiMoon size={15} />}
          </span>
        </button>
      </header>
      <main className="layout__main">
        <div className="layout__column layout__column--left">{left}</div>
        <div className="layout__column layout__column--right">{right}</div>
      </main>
      <footer className="layout__footer">{footer}</footer>
    </div>
  </div>
)
