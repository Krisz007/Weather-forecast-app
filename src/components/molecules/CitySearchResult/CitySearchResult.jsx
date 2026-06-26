import "./CitySearchResult.scss"

export const CitySearchResult = ({ city, onSelect }) => {
  const region = [city.admin1, city.country].filter(Boolean).join(", ")

  return (
    <li className="city-result">
      <button
        type="button"
        className="city-result__btn"
        onClick={() => onSelect(city)}
      >
        <span className="city-result__name">{city.name}</span>
        {region && <span className="city-result__region">{region}</span>}
      </button>
    </li>
  )
}
