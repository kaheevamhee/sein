import { useState, useEffect } from "react"
import ImportedPage from "@/imports/01DigitalCareGlumicsEcosystem"

const DESIGN_WIDTH = 1920
const CONTENT_WIDTH = 1400
// Frame20 at top-1770, 4 content sections, footer Banner(640)+Footer1(650)=1290px at bottom-0
const PAGE_HEIGHT = 7200

export default function DigitalCareGlumicsEcosystem() {
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
