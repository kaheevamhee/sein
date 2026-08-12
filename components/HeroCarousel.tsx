import { useState, useEffect, useCallback, useRef } from "react"
import Slide01 from "@/imports/01"
import Slide02 from "@/imports/02"
import Slide03 from "@/imports/03"
import Slide04 from "@/imports/7"
import viImg01 from "@/imports/vi_img01.png"
import viImg02 from "@/imports/vi_img02.png"
import viImg03 from "@/imports/vi_img03.png"
import viImg04 from "@/imports/vi_img04.png"

const SLIDES = [Slide01, Slide02, Slide03, Slide04]
const SLIDE_IMAGES = [viImg01, viImg02, viImg03, viImg04]
const INTERVAL = 5000
const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080
const CONTENT_WIDTH = 1400
const TABS = ["Home", "Patients", "Providers", "Partners"]

const ICON_DEVICE = "M7 20H17M9 16V20M15 16V20M3 5C3 4.73478 3.10536 4.48043 3.29289 4.29289C3.48043 4.10536 3.73478 4 4 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5V15C21 15.2652 20.8946 15.5196 20.7071 15.7071C20.5196 15.8946 20.2652 16 20 16H4C3.73478 16 3.48043 15.8946 3.29289 15.7071C3.10536 15.5196 3 15.2652 3 15V5Z"
const ICON_MESSAGES = "M14 15V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H6L3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H6M21 14L18 11H11C10.7348 11 10.4804 10.8946 10.2929 10.7071C10.1054 10.5196 10 10.2652 10 10V4C10 3.73478 10.1054 3.48043 10.2929 3.29289C10.4804 3.10536 10.7348 3 11 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V14Z"
const ICON_ARROW_UP = "M12 5V19M8 9L12 5L16 9"

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, INTERVAL)
  }, [])

  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startInterval])

  const goTo = (idx: number) => { setCurrent(idx); startInterval() }

  // Background fills full width, maintaining 16:9 design ratio
  const bgScale = vw / DESIGN_WIDTH
  const containerHeight = Math.round(DESIGN_HEIGHT * bgScale)
  // Content scales to fit within 1400px width; never exceeds 1:1
  const contentScale = Math.min(1, vw / CONTENT_WIDTH)
  // Left offset centers the 1920px design canvas relative to viewport
  const contentLeft = Math.round((vw - DESIGN_WIDTH * contentScale) / 2)

  return (
    <div style={{ width: "100%", height: `${containerHeight}px`, position: "relative", overflow: "hidden", background: "#111" }}>
      <style>{`
        .hero-content-layer [data-name="image"] { display: none !important; }
        .hero-content-layer [data-name="gnb"] { display: none !important; }
        .hero-content-layer .hero-slide-inner [class*="bg-black"][class*="h-[1080px]"] { display: none !important; }
        .hero-content-layer .hero-slide-inner [data-name="dlacon 2"] { display: none !important; }
        .hero-content-layer .hero-slide-inner [class*="w-[504px]"] { display: none !important; }
        .hero-content-layer .hero-slide-inner [class*="top-[995px]"] { display: none !important; }
        .hero-content-layer .hero-slide-inner [class*="top-[1015px]"] { display: none !important; }
        .hero-content-layer .hero-slide-inner [class*="top-[1005px]"] { display: none !important; }
        .hero-content-layer .hero-slide-inner > div > [data-name="icon"] { display: none !important; }
      `}</style>

      {/* Background images — full cover, crossfade */}
      {SLIDE_IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Dark overlay for text legibility */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 1, pointerEvents: "none" }} />

      {/* Content layer — Figma slide text/buttons, scaled to CONTENT_WIDTH */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ pointerEvents: "auto" }}>
          <div
            className="hero-content-layer"
            style={{
              position: "absolute",
              top: 0,
              left: `${contentLeft}px`,
              width: `${DESIGN_WIDTH}px`,
              height: `${DESIGN_HEIGHT}px`,
              transform: `scale(${contentScale})`,
              transformOrigin: "top left",
              overflow: "hidden",
            }}
          >
            <div style={{
              display: "flex",
              width: `${DESIGN_WIDTH * SLIDES.length}px`,
              height: `${DESIGN_HEIGHT}px`,
              transform: `translateX(-${current * DESIGN_WIDTH}px)`,
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              {SLIDES.map((SlideComponent, i) => (
                <div
                  key={i}
                  className="hero-slide-inner"
                  style={{ width: `${DESIGN_WIDTH}px`, height: `${DESIGN_HEIGHT}px`, flexShrink: 0, overflow: "hidden" }}
                >
                  <SlideComponent />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pill tab navigation — centered, above dot indicators */}
      <div style={{
        position: "absolute",
        bottom: `${Math.round(52 * bgScale)}px`,
        left: "50%",
        transform: `translateX(-50%) scale(${bgScale})`,
        transformOrigin: "bottom center",
        zIndex: 6,
        width: "504px",
        height: "64px",
        borderRadius: "14px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
      }}>
        <div style={{
          position: "absolute",
          left: `${12 + current * 120}px`,
          top: "12px",
          width: "120px",
          height: "40px",
          borderRadius: "10px",
          background: "#20C3A8",
          transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => goTo(i)}
            style={{
              width: "120px",
              height: "40px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: i === current ? "#fff" : "rgba(255,255,255,0.6)",
              fontFamily: "'Pretendard:SemiBold', sans-serif",
              fontSize: "16px",
              position: "relative",
              zIndex: 1,
              transition: "color 0.3s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{
        position: "absolute",
        bottom: `${Math.round(24 * bgScale)}px`,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        zIndex: 6,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "32px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "#20C3A8" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.35s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Right-side icon group */}
      <div style={{
        position: "absolute",
        right: `${Math.round(20 * bgScale)}px`,
        bottom: `${Math.round(60 * bgScale)}px`,
        zIndex: 6,
        display: "flex",
        flexDirection: "column",
        gap: `${Math.round(12 * bgScale)}px`,
      }}>
        {[ICON_DEVICE, ICON_MESSAGES, ICON_ARROW_UP].map((path, i) => {
          const sz = Math.round(Math.min(56, Math.max(40, 56 * bgScale)))
          return (
            <div
              key={i}
              style={{
                width: `${sz}px`,
                height: `${sz}px`,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <svg width={Math.round(sz * 0.4)} height={Math.round(sz * 0.4)} viewBox="0 0 24 24" fill="none">
                <path d={path} stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )
        })}
      </div>
    </div>
  )
}
