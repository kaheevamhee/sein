import { useState, useEffect } from "react"
import Main1 from "@/imports/메인1-2"

const DESIGN_WIDTH = 1920
const CONTENT_WIDTH = 1400
const DESIGN_HERO_HEIGHT = 1080
// Sections 2–6 heights: eco(1080) + rightforme(1800) + features(770) + support(635) + footer(650)
// Section 1 is visibility:hidden (keeps 1080px in flex), topOffset=-1080*scale hides it above container
const DESIGN_BELOW_HEIGHT = 1080 + 1800 + 770 + 635 + 650

export default function MainPageContent() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Content is designed at 1400px — cap scale at 1 when viewport >= 1400px
  const scale = Math.min(1, vw / CONTENT_WIDTH)
  const leftOffset = Math.round((vw - DESIGN_WIDTH * scale) / 2)
  const topOffset = -DESIGN_HERO_HEIGHT * scale
  const screenHeight = Math.round(DESIGN_BELOW_HEIGHT * scale)

  return (
    <div style={{ width: "100%", height: `${screenHeight}px`, overflow: "hidden", position: "relative" }}>
      <style>{`
        .main1-wrap [data-name="gnb"] { display: none !important; }
        /* Keep layout space but hide all overlay-managed sections visually */
        .main1-wrap [data-name="메인1"] > [data-name="1"] { visibility: hidden !important; }
        .main1-wrap [data-name="메인1"] > [data-name="4"] { visibility: hidden !important; }
        .main1-wrap [data-name="메인1"] > [data-name="5"] { visibility: hidden !important; }
        .main1-wrap [data-name="메인1"] > [data-name="6"] { visibility: hidden !important; }
      `}</style>

      <div
        className="main1-wrap"
        style={{
          position: "absolute",
          top: `${topOffset}px`,
          left: `${leftOffset}px`,
          width: `${DESIGN_WIDTH}px`,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <Main1 />
      </div>
    </div>
  )
}
