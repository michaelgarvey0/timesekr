import { useState } from 'react'
import GoogleWorkspaceIcon from '../assets/google-workspace.svg'
import MicrosoftExchangeIcon from '../assets/microsoft-exchange.svg'

function CalendarConnectionFlow({ onConnectionComplete, onDisconnect }) {
  const [calendarConnected, setCalendarConnected] = useState(false)
  const [calendarProvider, setCalendarProvider] = useState(null)
  const [showAdminFlow, setShowAdminFlow] = useState(false)
  const [showOAuthSimulation, setShowOAuthSimulation] = useState(false)
  const [showRequestAdmin, setShowRequestAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')

  const handleCalendarProviderSelect = (provider) => {
    setCalendarProvider(provider)
    setShowAdminFlow(true)
  }

  const handleAdminConsent = () => {
    setShowOAuthSimulation(true)
  }

  const handleOAuthApprove = () => {
    setCalendarConnected(true)
    setShowOAuthSimulation(false)
    setShowAdminFlow(false)
    onConnectionComplete?.()
  }

  const handleRequestAdminApproval = () => {
    setShowRequestAdmin(true)
  }

  const handleSendAdminRequest = (e) => {
    e.preventDefault()
    alert(`Request sent to ${adminEmail}. They will receive an email to authorize timesēkr.`)
    setShowRequestAdmin(false)
    setShowAdminFlow(false)
  }

  const handleDisconnect = () => {
    setCalendarConnected(false)
    setCalendarProvider(null)
    setShowAdminFlow(false)
    setShowOAuthSimulation(false)
    setShowRequestAdmin(false)
    onDisconnect?.()
  }

  const handleBack = () => {
    setShowAdminFlow(false)
    setCalendarProvider(null)
    setShowOAuthSimulation(false)
    setShowRequestAdmin(false)
  }

  // Connected state
  if (calendarConnected && !showAdminFlow) {
    return (
      <div className="flex items-center justify-between p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            src={calendarProvider === 'google-workspace' ? GoogleWorkspaceIcon : MicrosoftExchangeIcon}
            alt={calendarProvider === 'google-workspace' ? 'Google Workspace' : 'Microsoft Exchange'}
            className="w-12 h-12"
          />
          <div>
            <p className="font-semibold text-[#212121]">
              {calendarProvider === 'google-workspace' ? 'Google Workspace' : 'Microsoft Exchange'}
            </p>
            <p className="text-sm text-gray-600">Connected</p>
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          className="text-sm text-red-600 font-semibold hover:text-red-700"
        >
          Disconnect
        </button>
      </div>
    )
  }

  // OAuth simulation screen (modal)
  if (showOAuthSimulation) {
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
                {calendarProvider === 'google-workspace' ? 'accounts.google.com' : 'login.microsoftonline.com'}
              </div>
            </div>

            <div className="bg-white p-6 space-y-6">
              <div className="flex items-center justify-center gap-3 pb-4 border-b">
                <img
                  src={calendarProvider === 'google-workspace' ? GoogleWorkspaceIcon : MicrosoftExchangeIcon}
                  alt={calendarProvider === 'google-workspace' ? 'Google' : 'Microsoft'}
                  className="w-10 h-10"
                />
                <span className="text-2xl font-semibold text-gray-700">
                  {calendarProvider === 'google-workspace' ? 'Google' : 'Microsoft'}
                </span>
              </div>

              <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold text-[#212121]">timesēkr wants to access your calendar</h2>
                <p className="text-sm text-gray-600">Signed in as admin@acme.com</p>

                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <p className="text-sm font-semibold text-gray-700 mb-2">This will allow timesēkr to:</p>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>View and manage your calendar</span>
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
            ↑ Simulated {calendarProvider === 'google-workspace' ? 'Google' : 'Microsoft'} authorization screen
          </p>
        </div>
      </div>
    )
  }

  // Request admin screen
  if (showRequestAdmin) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#212121]">Request Admin Authorization</h3>
          <p className="text-sm text-gray-600">
            Enter your administrator's email address. They will receive a request to authorize timesēkr.
          </p>

          <form onSubmit={handleSendAdminRequest} className="space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Administrator Email
              </label>
              <input
                type="email"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
              <p className="font-semibold mb-2">What happens next:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Your administrator receives an email with authorization details</li>
                <li>They review and approve timesēkr's calendar access</li>
                <li>You'll be notified once authorization is complete</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowRequestAdmin(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Admin flow screen
  if (showAdminFlow) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#212121]">Administrator Authorization Required</h3>
          <p className="text-sm text-gray-600">
            timesēkr needs access to your organization's {calendarProvider === 'google-workspace' ? 'Google Workspace' : 'Microsoft 365'} calendar.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleAdminConsent}
            className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm"
          >
            I am an Administrator - Authorize Now
          </button>
          <button
            type="button"
            onClick={handleRequestAdminApproval}
            className="w-full bg-white text-teal-600 py-4 rounded-lg font-semibold border-2 border-teal-600 hover:bg-teal-50 transition"
          >
            Request Admin to Authorize
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  // Initial provider selection
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 mb-4">Connect your organization's calendar to sync availability</p>
      <div className="space-y-3">
        <button
          onClick={() => handleCalendarProviderSelect('google-workspace')}
          className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition"
        >
          <img src={GoogleWorkspaceIcon} alt="Google Workspace" className="w-12 h-12" />
          <div className="text-left flex-1">
            <p className="font-semibold text-[#212121]">Google Workspace</p>
            <p className="text-sm text-gray-600">Shared calendar</p>
          </div>
        </button>

        <button
          onClick={() => handleCalendarProviderSelect('exchange')}
          className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition"
        >
          <img src={MicrosoftExchangeIcon} alt="Microsoft Exchange" className="w-12 h-12" />
          <div className="text-left flex-1">
            <p className="font-semibold text-[#212121]">Exchange</p>
            <p className="text-sm text-gray-600">Microsoft 365</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default CalendarConnectionFlow
