import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource/ibm-plex-sans/300.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import './index.css'
import DemoSelector from './pages/DemoSelector.jsx'
import MockEmail from './pages/MockEmail.jsx'
import OrgOnboarding from './pages/OrgOnboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MemberDashboard from './pages/MemberDashboard.jsx'
import MemberSignup from './pages/MemberSignup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemoSelector />} />
        <Route path="/mock-email" element={<MockEmail />} />
        <Route path="/onboarding" element={<OrgOnboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member-dashboard" element={<MemberDashboard />} />
        <Route path="/join/:inviteCode" element={<MemberSignup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
