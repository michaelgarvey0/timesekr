import { useState } from 'react'
import { Link } from 'react-router-dom'
import FeedbackButton from '../components/FeedbackButton'
import GoogleWorkspaceIcon from '../assets/google-workspace.svg'
import MicrosoftExchangeIcon from '../assets/microsoft-exchange.svg'
import PersonalCalendarConnectionFlow from '../components/PersonalCalendarConnectionFlow'

function MemberDashboard() {
  const [activeView, setActiveView] = useState('home')
  const [personalCalendars, setPersonalCalendars] = useState([])
  const [workingHoursStart, setWorkingHoursStart] = useState('09:00')
  const [workingHoursEnd, setWorkingHoursEnd] = useState('17:00')
  const [showConnectionFlow, setShowConnectionFlow] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)

  // Mock data
  const memberData = {
    name: 'Bob Smith',
    email: 'bob@example.com',
    organization: 'Acme Corporation',
    orgCalendarConnected: true
  }

  const handleStartConnection = (provider) => {
    setSelectedProvider(provider)
    setShowConnectionFlow(true)
  }

  const handleConnectionComplete = (provider) => {
    // Generate mock email based on provider
    const emails = {
      google: 'you@gmail.com',
      outlook: 'you@outlook.com',
      apple: 'you@icloud.com'
    }

    setPersonalCalendars([...personalCalendars, {
      provider,
      email: emails[provider],
      connected: true
    }])
    setShowConnectionFlow(false)
    setSelectedProvider(null)
  }

  const handleCancelConnection = () => {
    setShowConnectionFlow(false)
    setSelectedProvider(null)
  }

  const handleRemoveCalendar = (index) => {
    setPersonalCalendars(personalCalendars.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <FeedbackButton />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-2xl font-bold text-[#212121]">timesēkr</Link>
          <p className="text-sm text-gray-600 mt-1">{memberData.organization}</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveView('home')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeView === 'home'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </button>

            <button
              onClick={() => setActiveView('availability')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeView === 'availability'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              My Availability
            </button>

            <button
              onClick={() => setActiveView('settings')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeView === 'settings'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
              {memberData.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{memberData.name}</p>
              <p className="text-xs text-gray-500 truncate">Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeView === 'home' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-[#212121] mb-2">Welcome, {memberData.name.split(' ')[0]}</h1>
              <p className="text-gray-600 mb-8">Manage your calendars and availability preferences</p>

              <div className="space-y-4">
                {/* Organization Calendar Status */}
                <div className="bg-white rounded-xl border-2 border-teal-200 bg-teal-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-600">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Organization calendar connected</h3>
                      <p className="text-sm text-gray-600">Your {memberData.organization} calendar is synced and sharing your availability</p>
                    </div>
                  </div>
                </div>

                {/* Personal Calendars */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
                      <span className="text-gray-600 font-bold">+</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Add personal calendars</h3>
                      <p className="text-sm text-gray-600 mb-4">Connect additional calendars to improve availability accuracy</p>
                      <button
                        onClick={() => setActiveView('settings')}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm"
                      >
                        Manage Calendars
                      </button>
                    </div>
                  </div>
                </div>

                {/* Availability Preferences */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Set availability preferences</h3>
                      <p className="text-sm text-gray-600 mb-4">Define your working hours and meeting preferences</p>
                      <button
                        onClick={() => setActiveView('availability')}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm"
                      >
                        Set Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'availability' && (
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-[#212121] mb-6">My Availability</h1>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-[#212121] mb-4">Working Hours</h2>
                <p className="text-sm text-gray-600 mb-4">Set your typical working hours for scheduling</p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={workingHoursStart}
                      onChange={(e) => setWorkingHoursStart(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={workingHoursEnd}
                      onChange={(e) => setWorkingHoursEnd(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-[#212121] mb-6">Settings</h1>

              <div className="space-y-6">
                {/* Organization Calendar */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Organization Calendar</h2>
                  <div className="flex items-center justify-between p-4 bg-teal-50 border border-teal-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#212121]">{memberData.organization} Calendar</p>
                        <p className="text-sm text-gray-600">Connected via organization</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Calendars */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Personal Calendars</h2>
                  <p className="text-sm text-gray-600 mb-4">Add your personal calendars to improve availability tracking</p>

                  {personalCalendars.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {personalCalendars.map((cal, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            {cal.provider === 'google' && <img src={GoogleWorkspaceIcon} alt="Google" className="w-6 h-6" />}
                            {cal.provider === 'outlook' && <img src={MicrosoftExchangeIcon} alt="Microsoft" className="w-6 h-6" />}
                            {cal.provider === 'apple' && (
                              <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                                </svg>
                              </div>
                            )}
                            <p className="text-sm text-gray-700">{cal.email}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveCalendar(index)}
                            className="text-xs text-red-600 font-semibold hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleStartConnection('google')}
                      className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition"
                    >
                      <img src={GoogleWorkspaceIcon} alt="Google Calendar" className="w-12 h-12" />
                      <div className="text-center">
                        <p className="font-semibold text-[#212121] text-sm">Google</p>
                        <p className="text-xs text-gray-600">Calendar</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleStartConnection('outlook')}
                      className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition"
                    >
                      <img src={MicrosoftExchangeIcon} alt="Outlook Calendar" className="w-12 h-12" />
                      <div className="text-center">
                        <p className="font-semibold text-[#212121] text-sm">Outlook</p>
                        <p className="text-xs text-gray-600">Calendar</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleStartConnection('apple')}
                      className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition"
                    >
                      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-[#212121] text-sm">Apple</p>
                        <p className="text-xs text-gray-600">Calendar</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Account Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Account Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={memberData.name}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={memberData.email}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Connection Flow Modal */}
      {showConnectionFlow && selectedProvider && (
        <PersonalCalendarConnectionFlow
          provider={selectedProvider}
          onConnectionComplete={handleConnectionComplete}
          onCancel={handleCancelConnection}
        />
      )}
    </div>
  )
}

export default MemberDashboard
