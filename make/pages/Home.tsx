import { useState, useEffect } from "react"
import HeroCarousel from "@/components/HeroCarousel"
import MainPageContent from "@/components/MainPageContent"
import TestimonialsSection from "@/components/TestimonialsSection"
import SupportCenterSection from "@/components/SupportCenterSection"
import FooterSection from "@/components/FooterSection"

const DESIGN_WIDTH = 1920
const CONTENT_WIDTH = 1400
const DESIGN_HERO_H = 1080
// From hero bottom, design y-offsets for each section start:
// S2(1080) + S3(1800) = 2880 for S4; +S4(770) = 3650 for S5; +S5(635) = 4285 for S6
const SECTION4_DESIGN_Y = 2880
const SECTION4_DESIGN_H = 770
const SECTION5_DESIGN_Y = 3650
const SECTION5_DESIGN_H = 635
const SECTION6_DESIGN_Y = 4285
const SECTION6_DESIGN_H = 650

export default function Home() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const bgScale = vw / DESIGN_WIDTH
  const contentScale = Math.min(1, vw / CONTENT_WIDTH)
  const heroHeight = Math.round(DESIGN_HERO_H * bgScale)

  const section4Top = heroHeight + Math.round(SECTION4_DESIGN_Y * contentScale)
  const section4H = Math.round(SECTION4_DESIGN_H * contentScale)
  const section5Top = heroHeight + Math.round(SECTION5_DESIGN_Y * contentScale)
  const section5H = Math.round(SECTION5_DESIGN_H * contentScale)
  const section6Top = section5Top + section5H
  const section6H = Math.round(SECTION6_DESIGN_H * contentScale)

  return (
    <div style={{ position: "relative" }}>
      <HeroCarousel />
      <MainPageContent />

      {/* TestimonialsSection overlays section 4 */}
      <div style={{
        position: "absolute",
        top: `${section4Top}px`,
        left: 0,
        width: "100%",
        height: `${section4H}px`,
        zIndex: 5,
        overflow: "hidden",
      }}>
        <TestimonialsSection />
      </div>

      {/* SupportCenterSection overlays section 5 */}
      <div style={{
        position: "absolute",
        top: `${section5Top}px`,
        left: 0,
        width: "100%",
        height: `${section5H}px`,
        zIndex: 5,
      }}>
        <SupportCenterSection />
      </div>

      {/* FooterSection overlays section 6 */}
      <div style={{
        position: "absolute",
        top: `${section6Top}px`,
        left: 0,
        width: "100%",
        height: `${section6H}px`,
        zIndex: 5,
      }}>
        <FooterSection />
      </div>
    </div>
  )
}
