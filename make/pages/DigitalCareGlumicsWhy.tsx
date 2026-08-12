import { useState, useEffect } from "react"
import ImportedPage from "@/imports/01DigitalCareGlumicsWhyGlumics"

const DESIGN_WIDTH = 1920
const CONTENT_WIDTH = 1400
// Frame28 at top-1770, ~3 content sections, footer stack 1490px at bottom-0
const PAGE_HEIGHT = 6700

export default function DigitalCareGlumicsWhy() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const scale = Math.min(1, vw / CONTENT_WIDTH)
  const leftOffset = Math.round((vw - DESIGN_WIDTH * scale) / 2)

  return (
    <div style={{ position: "relative", width: "100%", height: PAGE_HEIGHT * scale, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: leftOffset,
          width: DESIGN_WIDTH,
          height: PAGE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <ImportedPage />
      </div>
    </div>
  )
}
