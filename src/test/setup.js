import "@testing-library/jest-dom/vitest"
import { afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

// Minden teszt után leszedjük a DOM-ra rendert komponenseket
afterEach(() => {
  cleanup()
})
