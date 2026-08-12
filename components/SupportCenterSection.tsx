import { useState, useEffect } from "react"
import Section5 from "@/imports/5"

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 635
const CONTENT_WIDTH = 1400

export default function SupportCenterSection() {
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
        /* BG layer: show only bg divs (first 2 children) and Mask group — hide all content */
        .s5-bg-layer [data-name="5"] > :nth-child(n+4) { display: none !important; }

        /* Content layer: hide bg elements, show only content */
        .s5-content-layer [data-name="5"] > :first-child { display: none !important; }
        .s5-content-layer [data-name="5"] > :nth-child(2) { display: none !important; }
        .s5-content-layer [data-name="5"] > [data-name="Mask group"] { display: none !important; }
      `}</style>

      {/* BG layer: scaleX fills viewport width, scaleY matches container height */}
      <div
        className="s5-bg-layer"
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
        <Section5 />
      </div>

      {/* Content layer: centered at 1400px scale */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <div style={{ pointerEvents: "auto" }}>
          <div
            className="s5-content-layer"
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
            <Section5 />
          </div>
        </div>
      </div>
    </div>
  )
}
