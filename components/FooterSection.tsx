import { useState, useEffect } from "react"
import Section6 from "@/imports/6-1"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 650
const CONTENT_WIDTH = 1400

export default function FooterSection() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const bgScale = vw / DESIGN_WIDTH
  const contentScale = Math.min(1, vw / CONTENT_WIDTH)
  // Height follows contentScale (matches MainPageContent hidden section height)
  const containerHeight = Math.round(DESIGN_HEIGHT * contentScale)
  const contentLeft = Math.round((vw - DESIGN_WIDTH * contentScale) / 2)

  return (
    <div style={{ width: "100%", height: `${containerHeight}px`, position: "relative", overflow: "hidden" }}>
      <style>{`
        /* BG layer: show only first child (solid #191919 bg) */
        .s6-bg-layer [data-name="6"] > :nth-child(n+2) { display: none !important; }

        /* Content layer: hide bg element, show content */
        .s6-content-layer [data-name="6"] > :first-child { display: none !important; }
      `}</style>

      {/* BG layer: scaleX fills viewport width, scaleY matches container height */}
      <div
        className="s6-bg-layer"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${DESIGN_WIDTH}px`,
          height: `${DESIGN_HEIGHT}px`,
          transform: `scaleX(${bgScale}) scaleY(${contentScale})`,
          transformOrigin: "top left",
        }}
      >
        <Section6 />
      </div>

      {/* Layer 2 – content at 1400px-relative scale, centered */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto" }}>
          <div
            className="s6-content-layer"
            style={{
              position: "absolute",
              top: 0,
              left: `${contentLeft}px`,
              width: `${DESIGN_WIDTH}px`,
              height: `${DESIGN_HEIGHT}px`,
              transform: `scale(${contentScale})`,
              transformOrigin: "top left",
            }}
          >
            <Section6 />
          </div>
        </div>
      </div>
    </div>
  )
}
