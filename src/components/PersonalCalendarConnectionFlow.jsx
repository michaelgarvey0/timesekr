import { useState } from 'react'
import GoogleWorkspaceIcon from '../assets/google-workspace.svg'
import MicrosoftExchangeIcon from '../assets/microsoft-exchange.svg'

function PersonalCalendarConnectionFlow({ provider, onConnectionComplete, onCancel }) {
  const [step, setStep] = useState(1) // 1: Enter email, 2: Instructions + password
  const [appleEmail, setAppleEmail] = useState('')
  const [applePassword, setApplePassword] = useState('')
  const [showOAuthSimulation, setShowOAuthSimulation] = useState(false)

  const handleGoogleConnect = () => {
    setShowOAuthSimulation(true)
  }

  const handleOutlookConnect = () => {
    setShowOAuthSimulation(true)
  }

  const handleOAuthApprove = () => {
    onConnectionComplete?.(provider)
  }

  const handleAppleSubmit = (e) => {
    e.preventDefault()
    onConnectionComplete?.(provider)
  }

  // Google OAuth Simulation
  if (provider === 'google' && showOAuthSimulation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="max-w-2xl w-full">
          <div className="border-4 border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-200 px-4 py-3 flex items-center gap-2 border-b-2 border-gray-300">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 font-mono">
                accounts.google.com
              </div>
            </div>

            <div className="bg-white p-6 space-y-6">
              <div className="flex items-center justify-center gap-3 pb-4 border-b">
                <img src={GoogleWorkspaceIcon} alt="Google" className="w-10 h-10" />
                <span className="text-2xl font-semibold text-gray-700">Google</span>
              </div>

              <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold text-[#212121]">timesēkr wants to access your calendar</h2>
                <p className="text-sm text-gray-600">Signed in as you@gmail.com</p>

                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <p className="text-sm font-semibold text-gray-700 mb-2">This will allow timesēkr to:</p>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>View and manage your calendar events</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOAuthSimulation(false)}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleOAuthApprove}
                  className="flex-1 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
                >
                  Allow
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-gray-300 italic mt-4">
            ↑ Simulated Google authorization screen
          </p>
        </div>
      </div>
    )
  }

  // Outlook OAuth Simulation
  if (provider === 'outlook' && showOAuthSimulation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="max-w-2xl w-full">
          <div className="border-4 border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-200 px-4 py-3 flex items-center gap-2 border-b-2 border-gray-300">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 font-mono">
                login.microsoftonline.com
              </div>
            </div>

            <div className="bg-white p-6 space-y-6">
              <div className="flex items-center justify-center gap-3 pb-4 border-b">
                <img src={MicrosoftExchangeIcon} alt="Microsoft" className="w-10 h-10" />
                <span className="text-2xl font-semibold text-gray-700">Microsoft</span>
              </div>

              <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold text-[#212121]">timesēkr wants to access your calendar</h2>
                <p className="text-sm text-gray-600">Signed in as you@outlook.com</p>

                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <p className="text-sm font-semibold text-gray-700 mb-2">This will allow timesēkr to:</p>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Read and write to your calendar</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOAuthSimulation(false)}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleOAuthApprove}
                  className="flex-1 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
                >
                  Allow
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-gray-300 italic mt-4">
            ↑ Simulated Microsoft authorization screen
          </p>
        </div>
      </div>
    )
  }

  // Google connection flow
  if (provider === 'google') {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="max-w-xl w-full bg-white rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#212121] mb-4">Connect Google Calendar</h3>
          <p className="text-sm text-gray-600 mb-6">
            You'll be redirected to Google to authorize timesēkr to access your calendar.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGoogleConnect}
              className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Continue to Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Outlook connection flow
  if (provider === 'outlook') {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="max-w-xl w-full bg-white rounded-xl p-6">
          <h3 className="text-xl font-semibold text-[#212121] mb-4">Connect Outlook Calendar</h3>
          <p className="text-sm text-gray-600 mb-6">
            You'll be redirected to Microsoft to authorize timesēkr to access your calendar.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOutlookConnect}
              className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Continue to Microsoft
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Apple Calendar connection flow (requires app-specific password)
  if (provider === 'apple') {
    if (step === 1) {
      // Step 1: Enter Apple ID email
      return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="max-w-lg w-full bg-white rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#212121] mb-2">Connect Apple Calendar</h3>
            <p className="text-sm text-gray-600 mb-6">Enter your Apple ID email</p>

            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div>
                <label htmlFor="appleEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Apple ID Email
                </label>
                <input
                  type="email"
                  id="appleEmail"
                  value={appleEmail}
                  onChange={(e) => setAppleEmail(e.target.value)}
                  placeholder="you@icloud.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  Next →
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

    if (step === 2) {
      // Step 2: Guide to generating app-specific password + password input
      return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="max-w-lg w-full bg-white rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#212121] mb-2">Connect Apple Calendar</h3>
            <p className="text-sm text-gray-600 mb-6">Apple requires an app-specific password</p>

            <div className="space-y-3 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="text-base text-gray-900 font-semibold mb-3 pt-0.5">Click this button</p>
                    <a
                      href="https://account.apple.com/account/manage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      <span>Open Apple ID</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <p className="text-xs text-gray-600 mt-2">Will open in new tab. Sign in may be required.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="text-base text-gray-900 font-semibold mb-3 pt-0.5">On Apple's page:</p>
                    <div className="text-sm text-gray-600 space-y-1.5 ml-1">
                      <p>→ Click "App-Specific Passwords"</p>
                      <p>→ Click the + button</p>
                      <p>→ Type any name</p>
                      <p>→ Copy the password</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="text-base text-gray-900 font-semibold pt-0.5">Come back and paste it below</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleAppleSubmit} className="space-y-4 mt-6">
              <div>
                <label htmlFor="applePassword" className="block text-sm font-medium text-gray-700 mb-2">
                  App-Specific Password
                </label>
                <input
                  type="text"
                  id="applePassword"
                  value={applePassword}
                  onChange={(e) => setApplePassword(e.target.value)}
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition font-mono"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Paste the password from Apple</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  Connect Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

  }

  return null
}

export default PersonalCalendarConnectionFlow
