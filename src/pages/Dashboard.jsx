import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FeedbackButton from '../components/FeedbackButton'
import CalendarConnectionFlow from '../components/CalendarConnectionFlow'

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeView, setActiveView] = useState('home') // 'home', 'find', 'settings', 'invite'
  const [calendarConnected, setCalendarConnected] = useState(false)
  const [hasMembers, setHasMembers] = useState(false)
  const [members, setMembers] = useState([])
  const [inviteEmails, setInviteEmails] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  // Check if coming from onboarding - show home view
  useEffect(() => {
    if (searchParams.get('welcome') === 'true') {
      setActiveView('home')
      // Clean up URL
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  // Mock data
  const orgData = {
    name: 'Acme Corporation',
  }

  const handleCalendarConnectionComplete = () => {
    setCalendarConnected(true)
    setActiveView('home')
  }

  const handleCalendarDisconnect = () => {
    setCalendarConnected(false)
  }

  const handleFileUpload = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result
      const emails = text
        .split(/[\n,\t]+/)
        .map(email => email.trim())
        .filter(email => email && email.includes('@'))

      if (emails.length > 0) {
        const newMembers = emails.map(email => ({
          email,
          name: email.split('@')[0],
          status: 'pending'
        }))
        setMembers([...members, ...newMembers])
        setHasMembers(true)
        setActiveView('home')
      }
    }
    reader.readAsText(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleSendInvites = (e) => {
    e.preventDefault()
    // Handle multiple formats: comma-separated, newline-separated, tab-separated (from spreadsheets)
    const emails = inviteEmails
      .split(/[\n,\t]+/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'))

    if (emails.length > 0) {
      const newMembers = emails.map(email => ({
        email,
        name: email.split('@')[0],
        status: 'pending'
      }))
      setMembers([...members, ...newMembers])
      setHasMembers(true)
      setInviteEmails('')
      setActiveView('home')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <FeedbackButton />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-2xl font-bold text-[#212121]">timesēkr</Link>
          <p className="text-sm text-gray-600 mt-1">{orgData.name}</p>
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
              onClick={() => setActiveView('find')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeView === 'find'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Availability
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
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Alice Johnson</p>
              <p className="text-xs text-gray-500 truncate">Organizer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeView === 'home' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-[#212121] mb-2">Welcome to {orgData.name}</h1>
              <p className="text-gray-600 mb-8">Let's get your organization set up</p>

              <div className="space-y-4">
                {/* Step 1: Connect Calendar */}
                <div className={`bg-white rounded-xl border-2 p-6 transition ${calendarConnected ? 'border-teal-200 bg-teal-50' : 'border-gray-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${calendarConnected ? 'bg-teal-600' : 'bg-gray-200'}`}>
                      {calendarConnected ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-gray-600 font-bold">1</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Connect your organization calendar</h3>
                      <p className="text-sm text-gray-600 mb-4">Connect Google Workspace or Microsoft 365 to sync your organization's availability</p>
                      {!calendarConnected && (
                        <button
                          onClick={() => setActiveView('settings')}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm"
                        >
                          Connect Calendar
                        </button>
                      )}
                      {calendarConnected && (
                        <p className="text-sm text-teal-700 font-semibold">✓ Calendar connected</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 2: Invite Members */}
                <div className={`bg-white rounded-xl border-2 p-6 transition ${hasMembers ? 'border-teal-200 bg-teal-50' : 'border-gray-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${hasMembers ? 'bg-teal-600' : 'bg-gray-200'}`}>
                      {hasMembers ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-gray-600 font-bold">2</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Invite team members</h3>
                      <p className="text-sm text-gray-600 mb-4">Add people to your organization so they can share their availability</p>
                      {!hasMembers && (
                        <button
                          onClick={() => setActiveView('invite')}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm"
                        >
                          Invite Members
                        </button>
                      )}
                      {hasMembers && (
                        <p className="text-sm text-teal-700 font-semibold">✓ {members.length} member{members.length !== 1 ? 's' : ''} invited</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 3: Create Circle */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
                      <span className="text-gray-600 font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Create your first circle</h3>
                      <p className="text-sm text-gray-600 mb-4">Group team members together to find availability and schedule meetings</p>
                      <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm">
                        Create Circle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'find' && (
          <div className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold text-[#212121] mb-6">Find Availability</h1>
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No team members yet. Invite people to see their availability.</p>
              </div>
            </div>
          </div>
        )}

        {activeView === 'invite' && (
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <button
                  onClick={() => setActiveView('home')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </button>
                <h1 className="text-3xl font-bold text-[#212121]">Invite Team Members</h1>
                <p className="text-gray-600 mt-2">Add people to your organization to start finding availability</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {/* CSV Upload Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
                    isDragging ? 'border-teal-600 bg-teal-50' : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <input
                    type="file"
                    id="csvUpload"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label htmlFor="csvUpload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg font-semibold text-gray-700 mb-1">Drop CSV file here or click to upload</p>
                    <p className="text-sm text-gray-500">Upload a CSV file with email addresses</p>
                  </label>
                </div>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="text-sm text-gray-500 font-medium">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Manual Entry */}
                <form onSubmit={handleSendInvites} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Email Addresses Manually
                    </label>
                    <textarea
                      id="inviteEmails"
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                      placeholder="Paste emails here (comma-separated, one per line, or from spreadsheet)"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveView('home')}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!inviteEmails.trim()}
                      className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Invitations
                    </button>
                  </div>
                </form>

                {members.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-[#212121] mb-4">Invited Members ({members.length})</h3>
                    <div className="space-y-2">
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
                              {member.name[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{member.email}</p>
                            </div>
                          </div>
                          <span className="text-xs text-yellow-600 font-semibold px-2 py-1 bg-yellow-50 rounded">
                            Pending
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-[#212121] mb-6">Organization Settings</h1>

              <div className="space-y-6">
                {/* Calendar Connection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Calendar Connection</h2>
                  <CalendarConnectionFlow
                    onConnectionComplete={handleCalendarConnectionComplete}
                    onDisconnect={handleCalendarDisconnect}
                  />
                </div>

                {/* Organization Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Organization Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                      <input
                        type="text"
                        value={orgData.name}
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
    </div>
  )
}

export default Dashboard
