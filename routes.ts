import { createBrowserRouter } from "react-router"
import Root from "./Root"
import Home from "./pages/Home"
import PlaceholderPage from "./pages/PlaceholderPage"
import DigitalCareGlumicsEcosystem from "./pages/DigitalCareGlumicsEcosystem"
import DigitalCareGlumicsAbout from "./pages/DigitalCareGlumicsAbout"
import DigitalCareGlumicsWhy from "./pages/DigitalCareGlumicsWhy"
import DigitalCareTechnologyOverview from "./pages/DigitalCareTechnologyOverview"
import DigitalCareTechnologySmartDevices from "./pages/DigitalCareTechnologySmartDevices"
import DigitalCareTechnologyConnectedApp from "./pages/DigitalCareTechnologyConnectedApp"
import DigitalCareTechnologyClinicalDecision from "./pages/DigitalCareTechnologyClinicalDecision"
import DigitalCareTechnologyDataPlatform from "./pages/DigitalCareTechnologyDataPlatform"
import DigitalCareTechnologyRnd from "./pages/DigitalCareTechnologyRnd"
import ProductG8 from "./pages/ProductG8"
import ProductP8 from "./pages/ProductP8"
import ProductFaq from "./pages/ProductFaq"
import RightForMeIsGlumics from "./pages/RightForMeIsGlumics"
import RightForMeType1 from "./pages/RightForMeType1"
import RightForMeType2 from "./pages/RightForMeType2"
import RightForMeChildren from "./pages/RightForMeChildren"
import RightForMeCaregivers from "./pages/RightForMeCaregivers"
import RightForMeReviews from "./pages/RightForMeReviews"
import SupportEducation from "./pages/SupportEducation"
import SupportClinicalEvidence from "./pages/SupportClinicalEvidence"
import SupportClinicalEvidenceView from "./pages/SupportClinicalEvidenceView"
import SupportCoverage from "./pages/SupportCoverage"
import CommunityCaseStories from "./pages/CommunityCaseStories"

const p = (title: string, breadcrumb?: string) => ({
  Component: () => PlaceholderPage({ title, breadcrumb }),
})

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },

      // Digital Care
      { path: "digital-care/glumics/ecosystem", Component: DigitalCareGlumicsEcosystem },
      { path: "digital-care/glumics/about", Component: DigitalCareGlumicsAbout },
      { path: "digital-care/glumics/why", Component: DigitalCareGlumicsWhy },
      { path: "digital-care/technology/overview", Component: DigitalCareTechnologyOverview },
      { path: "digital-care/technology/smart-devices", Component: DigitalCareTechnologySmartDevices },
      { path: "digital-care/technology/connected-app", Component: DigitalCareTechnologyConnectedApp },
      { path: "digital-care/technology/clinical-decision", Component: DigitalCareTechnologyClinicalDecision },
      { path: "digital-care/technology/data-platform", Component: DigitalCareTechnologyDataPlatform },
      { path: "digital-care/technology/rnd", Component: DigitalCareTechnologyRnd },

      // Product
      { path: "product/g8", Component: ProductG8 },
      { path: "product/p8", Component: ProductP8 },
      { path: "product/careweb", ...p("Careweb", "Product") },
      { path: "product/follower", ...p("Follower 보호자", "Product") },
      { path: "product/glumics-app", ...p("Glumics APP", "Product") },
      { path: "product/faq", Component: ProductFaq },

      // Right for me?
      { path: "right-for-me/is-glumics", Component: RightForMeIsGlumics },
      { path: "right-for-me/patients-type1", Component: RightForMeType1 },
      { path: "right-for-me/patients-type2", Component: RightForMeType2 },
      { path: "right-for-me/children", Component: RightForMeChildren },
      { path: "right-for-me/caregivers", Component: RightForMeCaregivers },
      { path: "right-for-me/reviews", Component: RightForMeReviews },

      // Support
      { path: "support/education", Component: SupportEducation },
      { path: "support/clinical-evidence", Component: SupportClinicalEvidence },
      { path: "support/clinical-evidence/view", Component: SupportClinicalEvidenceView },
      { path: "support/resources", ...p("Resources & Guidance", "Support") },
      { path: "support/coverage", Component: SupportCoverage },
      { path: "support/simulation", ...p("Simulation", "Support") },

      // Community
      { path: "community/case-stories", Component: CommunityCaseStories },
      { path: "community/reports", ...p("Reports & Whitepapers", "Community") },
      { path: "community/news", ...p("News & Media", "Community") },

      // Top buttons
      { path: "partners", ...p("For Partners") },
      { path: "healthcare-providers", ...p("For Healthcare Providers") },
      { path: "get-started", ...p("Get Started") },
    ],
  },
])
