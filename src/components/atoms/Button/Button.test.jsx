import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "./Button"

describe("Button", () => {
  it("megjeleníti a gyerek tartalmat", () => {
    render(<Button>Keresés</Button>)
    expect(screen.getByRole("button", { name: "Keresés" })).toBeInTheDocument()
  })

  it("alapból a primary variánst használja", () => {
    render(<Button>Mehet</Button>)
    expect(screen.getByRole("button")).toHaveClass("button", "primary")
  })

  it("a megadott variánst és className-et alkalmazza", () => {
    render(
      <Button variant="ghost" className="extra">
        X
      </Button>
    )
    const btn = screen.getByRole("button")
    expect(btn).toHaveClass("button", "ghost", "extra")
  })

  it("kattintásra meghívja az onClick-et", async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Klikk</Button>)
    await userEvent.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("továbbadja a többi prop-ot (pl. aria-label)", () => {
    render(<Button aria-label="bezárás">X</Button>)
    expect(screen.getByRole("button", { name: "bezárás" })).toBeInTheDocument()
  })
})
