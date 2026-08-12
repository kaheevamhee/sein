import { useState, useRef, useEffect } from "react"
import { Outlet, Link, useNavigate, useLocation } from "react-router"
import svgPaths from "@/imports/Gnb/svg-a0cazoit7b"

// ── Glumics SVG logo (from Figma import) ─────────────────────────────────────
function GlumicsLogo() {
  return (
    <svg fill="none" height="28" viewBox="0 0 145.839 28" width="145.84" style={{ display: "block" }}>
      <g>
        <path d={svgPaths.p2fbca00} fill="#20C3A8" />
        <path d={svgPaths.pacc800} fill="#20C3A8" />
        <path d={svgPaths.paf0f800} fill="#20C3A8" />
        <path d={svgPaths.p1c50a9f2} fill="#20C3A8" />
        <path d={svgPaths.p204e1e80} fill="#20C3A8" />
        <path d={svgPaths.p390b1fb0} fill="#20C3A8" />
        <path d={svgPaths.p32c2db00} fill="#20C3A8" />
        <path d={svgPaths.p2392d780} fill="#20C3A8" />
      </g>
    </svg>
  )
}

// ── Sitemap data ──────────────────────────────────────────────────────────────
type SubItem = { label: string; path: string }
type Column = { heading: string; items: SubItem[] }
type NavItem = { label: string; columns: Column[] }

const NAV: NavItem[] = [
  {
    label: "Digital care",
    columns: [
      {
        heading: "GLUMICS",
        items: [
          { label: "Ecosystem", path: "/digital-care/glumics/ecosystem" },
          { label: "About GLUMICS", path: "/digital-care/glumics/about" },
          { label: "Why GLUMICS?", path: "/digital-care/glumics/why" },
        ],
      },
      {
        heading: "TECHNOLOGY",
        items: [
          { label: "Technology Overview", path: "/digital-care/technology/overview" },
          { label: "Smart Devices & Delivery", path: "/digital-care/technology/smart-devices" },
          { label: "Connected App Suite", path: "/digital-care/technology/connected-app" },
          { label: "Data Platform & AI Engine", path: "/digital-care/technology/data-platform" },
          { label: "Clinical Decision Support", path: "/digital-care/technology/clinical-decision" },
          { label: "R&D & Future Roadmap", path: "/digital-care/technology/rnd" },
        ],
      },
    ],
  },
  {
    label: "Product",
    columns: [
      {
        heading: "PRODUCTS",
        items: [
          { label: "G8", path: "/product/g8" },
          { label: "P8", path: "/product/p8" },
          { label: "Careweb", path: "/product/careweb" },
          { label: "Follower 보호자", path: "/product/follower" },
          { label: "Glumics APP", path: "/product/glumics-app" },
          { label: "Frequently Asked Questions", path: "/product/faq" },
        ],
      },
    ],
  },
  {
    label: "Right for me?",
    columns: [
      {
        heading: "RIGHT FOR ME?",
        items: [
          { label: "Is Glumics Right for me?", path: "/right-for-me/is-glumics" },
          { label: "For Patients, Type 1", path: "/right-for-me/patients-type1" },
          { label: "For Patients, Type 2", path: "/right-for-me/patients-type2" },
          { label: "가치 제안 for 소아", path: "/right-for-me/children" },
          { label: "매뉴얼 For Caregivers", path: "/right-for-me/caregivers" },
          { label: "Reviews", path: "/right-for-me/reviews" },
        ],
      },
    ],
  },
  {
    label: "Support",
    columns: [
      {
        heading: "SUPPORT",
        items: [
          { label: "Education", path: "/support/education" },
          { label: "Clinical Evidence", path: "/support/clinical-evidence" },
          { label: "Resources & Guidance", path: "/support/resources" },
          { label: "Coverage", path: "/support/coverage" },
          { label: "Simulation", path: "/support/simulation" },
        ],
      },
    ],
  },
  {
    label: "Community",
    columns: [
      {
        heading: "COMMUNITY",
        items: [
          { label: "Case Stories", path: "/community/case-stories" },
          { label: "Reports & Whitepapers", path: "/community/reports" },
          { label: "News & Media", path: "/community/news" },
        ],
      },
    ],
  },
]

// ── Dropdown panel ────────────────────────────────────────────────────────────
function DropdownPanel({ nav, onClose }: { nav: NavItem; onClose: () => void }) {
  const navigate = useNavigate()
  const handleClick = (path: string) => { navigate(path); onClose() }

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
        padding: "24px 28px",
        zIndex: 100,
        minWidth: nav.columns.length > 1 ? "480px" : "220px",
        display: "grid",
        gridTemplateColumns: `repeat(${nav.columns.length}, 1fr)`,
        gap: "32px",
      }}
    >
      {nav.columns.map((col) => (
        <div key={col.heading}>
          <p style={{
            fontFamily: "'Pretendard:SemiBold', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "#20C3A8",
            marginBottom: "10px",
            textTransform: "uppercase",
          }}>
            {col.heading}
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {col.items.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleClick(item.path)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Pretendard:Regular', sans-serif",
                    fontSize: "15px",
                    color: "#535353",
                    padding: "7px 10px",
                    borderRadius: "8px",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#f0fdf9"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "#20C3A8"
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "none"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "#535353"
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// ── Root layout ───────────────────────────────────────────────────────────────
export default function Root() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === "/"

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Scroll detection for home page
  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    setScrolled(false)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  // Close dropdown on route change
  useEffect(() => { setOpenIndex(null) }, [location.pathname])

  // Visual state: transparent (hero) vs solid (scrolled/other page)
  const isTransparent = isHome && !scrolled

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ── GNB ──────────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isTransparent ? "transparent" : "#ffffff",
          borderBottom: isTransparent ? "none" : "1px solid rgba(0,0,0,0.07)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            width: "1400px",
            maxWidth: "calc(100vw - 40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <GlumicsLogo />
          </Link>

          {/* Main nav */}
          <nav ref={navRef} style={{ display: "flex", alignItems: "center", gap: "0" }}>
            {NAV.map((item, i) => {
              const isActive = openIndex === i
              const textColor = isTransparent
                ? (isActive ? "#20C3A8" : "#ffffff")
                : (isActive ? "#20C3A8" : "#535353")

              return (
                <div key={item.label} style={{ position: "relative" }}>
                  <button
                    onClick={() => setOpenIndex(isActive ? null : i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "0 20px",
                      height: "90px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Pretendard:SemiBold', sans-serif",
                      fontSize: "18px",
                      color: textColor,
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                      style={{ transition: "transform 0.2s", transform: isActive ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isActive && (
                    <DropdownPanel nav={item} onClose={() => setOpenIndex(null)} />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Util: For Partners | For healthcare Providers + Get started */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
            {/* For Partners | For healthcare Providers */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                to="/partners"
                style={{
                  fontFamily: "'Pretendard:Regular', sans-serif",
                  fontSize: "16px",
                  color: isTransparent ? "#ffffff" : "#535353",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                For Partners
              </Link>
              {/* Divider */}
              <div style={{ width: "1px", height: "14px", background: isTransparent ? "rgba(255,255,255,0.3)" : "rgba(83,83,83,0.3)" }} />
              <Link
                to="/healthcare-providers"
                style={{
                  fontFamily: "'Pretendard:Regular', sans-serif",
                  fontSize: "16px",
                  color: isTransparent ? "#ffffff" : "#535353",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                For healthcare Providers
              </Link>
            </div>

            {/* Get started button */}
            <Link
              to="/get-started"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "42px",
                padding: "0 20px",
                background: "#20C3A8",
                borderRadius: "6px",
                fontFamily: "'Pretendard:SemiBold', sans-serif",
                fontSize: "16px",
                color: "#ffffff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#1aad96")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#20C3A8")}
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Page content ─────────────────────────────────────────────────────── */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
