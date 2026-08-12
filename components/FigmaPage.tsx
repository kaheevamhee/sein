import { useState, useEffect, ComponentType } from "react"

const DESIGN_WIDTH = 1920
const CONTENT_WIDTH = 1400

interface Props {
  component: ComponentType
  pageHeight: number
}

export default function FigmaPage({ component: Page, pageHeight }: Props) {
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
    <div style={{ position: "relative", width: "100%", height: pageHeight * scale, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: leftOffset,
          width: DESIGN_WIDTH,
          height: pageHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Page />
      </div>
    </div>
  )
}
