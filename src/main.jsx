import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource/ibm-plex-sans/300.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-sans/700.css'
import './index.css'
import App from './App.jsx'
import OrgOnboarding from './pages/OrgOnboarding.jsx'
import Dashboard from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/onboarding" element={<OrgOnboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-3xl">Login page coming soon...</h1></div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
