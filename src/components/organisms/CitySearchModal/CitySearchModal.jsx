import { useEffect, useState } from "react"
import { FiX } from "react-icons/fi"
import { searchCities } from "@/services/weatherApi"
import { Input } from "@/components/atoms/Input/Input"
import { Spinner } from "@/components/atoms/Spinner/Spinner"
import { CitySearchResult } from "@/components/molecules/CitySearchResult/CitySearchResult"
import "./CitySearchModal.scss"

const DEBOUNCE_MS = 350
const MIN_QUERY_LENGTH = 2

const INITIAL_SEARCH = { term: "", status: "idle", results: [], error: null }

export const CitySearchModal = ({ onSelect, onClose }) => {
  const [query, setQuery] = useState("")
  const [search, setSearch] = useState(INITIAL_SEARCH)

  const term = query.trim()
  const isSearchable = term.length >= MIN_QUERY_LENGTH

  // Keresés késleltetve, hogy ne fusson minden leütésre.
  // A state-et csak a setTimeout aszinkron callbackjében frissítjük.
  useEffect(() => {
    if (!isSearchable) {
      return
    }

    let active = true
    const timeoutId = setTimeout(() => {
      searchCities(term)
        .then(cities => {
          if (!active) return
          setSearch({
            term,
            status: cities.length ? "success" : "empty",
            results: cities,
            error: null
          })
        })
        .catch(err => {
          if (!active) return
          setSearch({ term, status: "error", results: [], error: err.message })
        })
    }, DEBOUNCE_MS)

    return () => {
      active = false
      clearTimeout(timeoutId)
    }
  }, [term, isSearchable])

  // Bezárás Escape billentyűre
  useEffect(() => {
    const handleKey = event => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  const isResolved = search.term === term
  const isPending = isSearchable && !isResolved
  const showResults = isSearchable && isResolved && search.status === "success"

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Város keresése"
    >
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <div className="modal__header">
          <h2 className="modal__title">Város keresése</h2>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Bezárás"
          >
            <FiX size={20} />
          </button>
        </div>
        <Input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Írd be a város nevét…"
          autoFocus
        />
        <div className="modal__results">
          {!isSearchable && (
            <p className="modal__state">
              Legalább {MIN_QUERY_LENGTH} karaktert írj be a kereséshez.
            </p>
          )}
          {isPending && (
            <div className="modal__state">
              <Spinner />
            </div>
          )}
          {isSearchable && isResolved && search.status === "error" && (
            <p className="modal__state modal__error">{search.error}</p>
          )}
          {isSearchable && isResolved && search.status === "empty" && (
            <p className="modal__state">Nincs találat.</p>
          )}
          {showResults && (
            <ul className="modal__list">
              {search.results.map(city => (
                <CitySearchResult
                  key={city.id}
                  city={city}
                  onSelect={onSelect}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
