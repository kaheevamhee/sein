import { useState, useEffect } from "react"
import img1 from "@/imports/메인1-1/3f434b3276f329ceb62e0a0cf503251bc8a71344.png"
import img2 from "@/imports/메인1-1/67322d6d61df8984c2fc1cbff820072ec11613f3.png"
import img3 from "@/imports/메인1-1/847ceb3b475a59579b3d05c7894a61716b0f24cf.png"
import img4 from "@/imports/메인1-1/17b7e17bbc13a3ca276a416f56cf9032ac3d33c6.png"
import img5 from "@/imports/메인1-1/6ed03b3381bcd7fde8847c4a04d0fb665bb8e869.png"

const QUOTE_PATH_L = "M13 21H0V10C0.333333 7.06667 2.8 0.96 10 0L12 4.5C10.1667 5.03333 8 6.5 7 10H13V21Z"
const QUOTE_PATH_R = "M29 21H16V10C16.3333 7.06667 18.8 0.96 26 0L28 4.5C26.1667 5.03333 24 6.5 23 10H29V21Z"

const CARDS = [
  {
    badge: "Patients",
    quote: "Glumics 인슐린 펌프를 사용한 이후, 혈당 수치가 훨씬 안정적으로 유지되고 있습니다. 삶은 더 자유로워지고, 케어는 일상이 되었습니다.",
    name: "Sarah K.",
    role: "제1형 당뇨 12년 차",
    country: "미국",
    photo: img1,
  },
  {
    badge: "Providers",
    quote: "Care Web을 통해 한번에 50명의 Glumics 인슐린 펌프 사용 환자를 관리했습니다. 환자들은 혈당 조절이 더 원활해지고 스트레스가 줄었다고 보고했습니다.",
    name: "Dr. Kim",
    role: "내분비내과",
    country: "한국",
    photo: img2,
  },
  {
    badge: "Partners",
    quote: "Care Web을 통해 우리 팀은 Glumics 인슐린 펌프를 사용하는 환자들을 실시간으로 모니터링했습니다. 그 결과 혈당은 더 안정적으로 유지되고, 방해 요소는 줄어들었습니다.",
    name: "Research Inst",
    role: "임상 연구",
    country: "독일",
    photo: img3,
  },
  {
    badge: "Caregivers",
    quote: "5살 딸아이가 Glumics 인슐린 펌프로 제1형 당뇨를 관리하는 모습을 보며 우리의 삶이 달라졌습니다. 혈당은 더 안정적으로 유지되고, 엄마로서의 불안도 한결 줄었습니다.",
    name: "Emily R.",
    role: "엄마보호자 · 5살 1형당뇨 아이",
    country: "캐나다",
    photo: img4,
  },
  {
    badge: "Caregivers",
    quote: "5살 딸아이가 Glumics 인슐린 펌프로 제1형 당뇨를 관리하는 모습을 보며 우리의 삶이 달라졌습니다. 혈당은 더 안정적으로 유지되고, 아빠로서의 불안도 한결 줄었습니다.",
    name: "Michael R.",
    role: "아빠보호자 · 5살 1형당뇨 아이",
    country: "캐나다",
    photo: img5,
  },
]

const CONTENT_WIDTH = 1400
const DESIGN_CARD_W = 335
const DESIGN_CARD_H = 380
const DESIGN_CARD_GAP = 20
const DESIGN_TITLE_TOP = 90
const DESIGN_CARDS_TOP = 270
const DESIGN_SECTION_H = 770

export default function TestimonialsSection() {
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : CONTENT_WIDTH)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const update = () => setVw(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const scale = Math.min(1, vw / CONTENT_WIDTH)
  const sectionH = Math.round(DESIGN_SECTION_H * scale)
  const cardW = Math.round(DESIGN_CARD_W * scale)
  const cardH = Math.round(DESIGN_CARD_H * scale)
  const cardGap = Math.max(12, Math.round(DESIGN_CARD_GAP * scale))
  const step = cardW + cardGap
  const setWidth = CARDS.length * step
  // Left offset: center the 1400px content area
  const titleLeft = Math.round(260 * scale + (vw - CONTENT_WIDTH * scale) / 2)
  const cardsTop = Math.round(DESIGN_CARDS_TOP * scale)
  const titleTop = Math.round(DESIGN_TITLE_TOP * scale)

  return (
    <div
      style={{ width: "100%", height: `${sectionH}px`, background: "#f8f8f8", overflow: "hidden", position: "relative" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes testimonials-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--t-set-w))); }
        }
        .t-track {
          animation: testimonials-marquee 38s linear infinite;
          will-change: transform;
        }
        .t-track.t-paused {
          animation-play-state: paused;
        }
        .t-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          cursor: default;
        }
        .t-card:hover {
          transform: translateY(-20px) !important;
          box-shadow: 0px 16px 40px 0px rgba(32, 195, 168, 0.18) !important;
          border-color: #20C3A8 !important;
        }
      `}</style>

      {/* Section title */}
      <div style={{ position: "absolute", top: `${titleTop}px`, left: `${titleLeft}px`, display: "flex", flexDirection: "column", gap: `${Math.round(12 * scale)}px` }}>
        <p style={{ fontFamily: "'Pretendard:SemiBold', sans-serif", fontSize: `${Math.round(20 * scale)}px`, color: "#20C3A8", lineHeight: 1.5, margin: 0 }}>
          Case Stories
        </p>
        <p style={{ fontFamily: "'Pretendard:SemiBold', sans-serif", fontSize: `${Math.round(54 * scale)}px`, color: "#000", letterSpacing: "-2px", lineHeight: 1.2, margin: 0, whiteSpace: "nowrap" }}>
          실제 사용자의 이야기
        </p>
      </div>

      {/* Scrolling card track — duplicated for seamless loop */}
      <div
        className={`t-track${paused ? " t-paused" : ""}`}
        style={{
          position: "absolute",
          top: `${cardsTop}px`,
          left: 0,
          display: "flex",
          gap: `${cardGap}px`,
          paddingLeft: `${cardGap}px`,
          ["--t-set-w" as string]: `${setWidth + cardGap}px`,
        } as React.CSSProperties}
      >
        {[...CARDS, ...CARDS].map((card, i) => (
          <div
            key={i}
            className="t-card"
            style={{
              width: `${cardW}px`,
              height: `${cardH}px`,
              flexShrink: 0,
              background: "#fff",
              borderRadius: `${Math.round(20 * scale)}px`,
              border: "1px solid #e8e8e8",
              boxShadow: "0px 0px 8px 0px rgba(211,211,211,0.4)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              padding: `${Math.round(50 * scale)}px ${Math.round(30 * scale)}px ${Math.round(28 * scale)}px`,
            }}
          >
            {/* Quote icon */}
            <svg
              width={Math.round(29 * scale)}
              height={Math.round(21 * scale)}
              viewBox="0 0 29 21"
              fill="none"
              style={{ position: "absolute", top: `${Math.round(47 * scale)}px`, left: `${Math.round(30 * scale)}px`, flexShrink: 0 }}
            >
              <path d={QUOTE_PATH_L} fill="#20C3A8" fillOpacity="0.5" />
              <path d={QUOTE_PATH_R} fill="#20C3A8" fillOpacity="0.5" />
            </svg>

            {/* Badge */}
            <div style={{
              position: "absolute",
              top: `${Math.round(20 * scale)}px`,
              right: `${Math.round(20 * scale)}px`,
              height: `${Math.round(37 * scale)}px`,
              padding: `0 ${Math.round(21 * scale)}px`,
              borderRadius: "100px",
              border: "1px solid #d3d3d3",
              display: "flex",
              alignItems: "center",
            }}>
              <span style={{ fontFamily: "'Pretendard:SemiBold', sans-serif", fontSize: `${Math.round(16 * scale)}px`, color: "#535353", whiteSpace: "nowrap" }}>
                {card.badge}
              </span>
            </div>

            {/* Quote text */}
            <p style={{
              fontFamily: "'Pretendard:Regular', sans-serif",
              fontSize: `${Math.round(16 * scale)}px`,
              color: "#535353",
              lineHeight: `${Math.round(28 * scale)}px`,
              marginTop: `${Math.round(67 * scale)}px`,
              marginBottom: 0,
              flex: 1,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}>
              {card.quote}
            </p>

            {/* Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: `${Math.round(12 * scale)}px`, marginTop: `${Math.round(20 * scale)}px`, flexShrink: 0 }}>
              <img
                src={card.photo}
                alt={card.name}
                style={{ width: `${Math.round(56 * scale)}px`, height: `${Math.round(56 * scale)}px`, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
              <div>
                <p style={{ fontFamily: "'Pretendard:Bold', sans-serif", fontSize: `${Math.round(16 * scale)}px`, color: "#000", margin: 0, lineHeight: "20px" }}>
                  {card.name}
                </p>
                <p style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontSize: `${Math.round(14 * scale)}px`, color: "#555", margin: `${Math.round(2 * scale)}px 0 0`, lineHeight: "20px" }}>
                  {card.role}
                </p>
                <p style={{ fontFamily: "'Pretendard:Regular', sans-serif", fontSize: `${Math.round(14 * scale)}px`, color: "#555", margin: 0, lineHeight: "20px" }}>
                  {card.country}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
