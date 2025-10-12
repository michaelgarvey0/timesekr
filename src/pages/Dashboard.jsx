import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FeedbackButton from '../components/FeedbackButton'
import CalendarConnectionFlow from '../components/CalendarConnectionFlow'

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeView, setActiveView] = useState('home') // 'home', 'find', 'members', 'settings', 'invite', 'schedule'
  const [calendarConnected, setCalendarConnected] = useState(false)
  const [hasMembers, setHasMembers] = useState(false)
  const [members, setMembers] = useState([])
  const [inviteEmails, setInviteEmails] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [inviteStep, setInviteStep] = useState('input') // 'input', 'review'
  const [pendingInvites, setPendingInvites] = useState([])
  const [bulkRole, setBulkRole] = useState('Member')
  const [selectedInvites, setSelectedInvites] = useState([])
  const [memberSearch, setMemberSearch] = useState('')
  const [memberRoleFilter, setMemberRoleFilter] = useState('all')
  const [memberStatusFilter, setMemberStatusFilter] = useState('all')
  const [showPaymentAlert, setShowPaymentAlert] = useState(true)
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false)
  const [showCircleSelector, setShowCircleSelector] = useState(false)
  const [showCreateCircle, setShowCreateCircle] = useState(false)
  const [newCircleName, setNewCircleName] = useState('')

  // Schedule Meeting Flow
  const [scheduleStep, setScheduleStep] = useState('create') // 'create', 'review', 'confirm'
  const [meetingData, setMeetingData] = useState({
    title: '',
    dateRangeStart: '',
    dateRangeEnd: '',
    duration: '30',
    participants: [],
    subject: '',
    description: ''
  })
  const [showParticipantModal, setShowParticipantModal] = useState(false)
  const [participantSearch, setParticipantSearch] = useState('')
  const [expandedTimeSlot, setExpandedTimeSlot] = useState(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [invitationsSent, setInvitationsSent] = useState(false)

  // Mock Circle members and groups
  const mockCircleMembers = [
    { id: 1, name: 'John Smith', email: 'john@acme.com', type: 'member' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@acme.com', type: 'member' },
    { id: 3, name: 'Mike Chen', email: 'mike@acme.com', type: 'member' },
    { id: 4, name: 'Emma Davis', email: 'emma@acme.com', type: 'member' }
  ]

  const mockGroups = [
    { id: 'g1', name: 'Engineering Team', type: 'group', memberCount: 12 },
    { id: 'g2', name: 'Design Team', type: 'group', memberCount: 5 }
  ]

  const handleAddParticipant = (participant) => {
    if (!meetingData.participants.find(p => p.id === participant.id)) {
      setMeetingData({
        ...meetingData,
        participants: [...meetingData.participants, participant]
      })
    }
  }

  const handleAddEmailParticipant = () => {
    if (participantSearch && participantSearch.includes('@')) {
      const newParticipant = {
        id: `email-${Date.now()}`,
        email: participantSearch,
        name: participantSearch.split('@')[0],
        type: 'email'
      }
      handleAddParticipant(newParticipant)
      setParticipantSearch('')
    }
  }

  // Mock circles data - single circle for organizer
  const [circles, setCircles] = useState([
    { id: 1, name: 'Acme Corporation', role: 'Organizer', members: 1 }
  ])
  const [currentCircleId, setCurrentCircleId] = useState(1)

  // Pricing tiers based on group size
  const getPlanForMembers = (memberCount) => {
    if (memberCount <= 5) return { name: 'Family Plan', price: 3, range: '1-5 members', perUser: 0.60 }
    if (memberCount <= 15) return { name: 'Small Team', price: 8, range: '6-15 members', perUser: 0.53 }
    if (memberCount <= 30) return { name: 'Medium Team', price: 15, range: '16-30 members', perUser: 0.50 }
    if (memberCount <= 50) return { name: 'Large Team', price: 20, range: '31-50 members', perUser: 0.40 }
    if (memberCount <= 100) return { name: 'Enterprise', price: 30, range: '51-100 members', perUser: 0.30 }
    if (memberCount <= 500) return { name: 'Enterprise Plus', price: 50, range: '101-500 members', perUser: 0.10 }
    return { name: 'Enterprise Max', price: 90, range: '501-1000 members', perUser: 0.09 }
  }

  const currentPlan = getPlanForMembers(members.length || 0)
  const nextTierPlan = getPlanForMembers((members.length || 0) + 1)

  // Mock billing data
  const billingData = {
    plan: currentPlan.name,
    price: currentPlan.price,
    interval: 'month',
    members: members.length,
    memberRange: currentPlan.range,
    perUserCost: currentPlan.perUser,
    nextBillingDate: 'January 15, 2025',
    billingHistory: [
      { date: 'December 15, 2024', amount: currentPlan.price, status: 'paid' },
      { date: 'November 15, 2024', amount: currentPlan.price, status: 'paid' },
      { date: 'October 15, 2024', amount: currentPlan.price, status: 'paid' }
    ]
  }

  // Check if coming from onboarding - show home view
  useEffect(() => {
    if (searchParams.get('welcome') === 'true') {
      setActiveView('home')
      // Clean up URL
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  // Get current circle data
  const currentCircle = circles.find(c => c.id === currentCircleId) || circles[0]
  const orgData = {
    name: currentCircle.name,
  }

  const handleSwitchCircle = (circleId) => {
    setCurrentCircleId(circleId)
    setShowCircleSelector(false)
    setActiveView('home')
  }

  const handleCreateCircle = () => {
    if (!newCircleName.trim()) return

    const newCircle = {
      id: circles.length + 1,
      name: newCircleName,
      role: 'Organizer',
      members: 0
    }
    setCircles([...circles, newCircle])
    setCurrentCircleId(newCircle.id)
    setNewCircleName('')
    setShowCreateCircle(false)
    setActiveView('home')
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
        const newInvites = emails.map(email => ({
          email,
          name: email.split('@')[0],
          role: 'Member'
        }))
        setPendingInvites(newInvites)
        setInviteStep('review')
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

  const handleProcessInvites = (e) => {
    e.preventDefault()
    // Handle multiple formats: comma-separated, newline-separated, tab-separated (from spreadsheets)
    const emails = inviteEmails
      .split(/[\n,\t]+/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'))

    if (emails.length > 0) {
      const newInvites = emails.map(email => ({
        email,
        name: email.split('@')[0],
        role: 'Member'
      }))
      setPendingInvites(newInvites)
      setInviteStep('review')
    }
  }

  const handleSendInvites = () => {
    const newMembers = pendingInvites.map(invite => ({
      ...invite,
      status: 'pending'
    }))
    setMembers([...members, ...newMembers])
    setHasMembers(true)
    setInviteEmails('')
    setPendingInvites([])
    setInviteStep('input')
    setBulkRole('Member')
    setSelectedInvites([])
    setActiveView('home')
  }

  const handleUpdateRole = (email, newRole) => {
    setPendingInvites(pendingInvites.map(invite =>
      invite.email === email ? { ...invite, role: newRole } : invite
    ))
  }

  const handleApplyBulkRole = () => {
    if (selectedInvites.length === 0) return

    setPendingInvites(pendingInvites.map(invite =>
      selectedInvites.includes(invite.email)
        ? { ...invite, role: bulkRole }
        : invite
    ))
  }

  const handleToggleSelect = (email) => {
    setSelectedInvites(prev =>
      prev.includes(email)
        ? prev.filter(e => e !== email)
        : [...prev, email]
    )
  }

  const handleSelectAll = () => {
    if (selectedInvites.length === pendingInvites.length) {
      setSelectedInvites([])
    } else {
      setSelectedInvites(pendingInvites.map(i => i.email))
    }
  }

  const handleRemoveInvite = (email) => {
    setPendingInvites(pendingInvites.filter(invite => invite.email !== email))
  }

  const handleCancelReview = () => {
    setPendingInvites([])
    setInviteStep('input')
    setBulkRole('Member')
    setSelectedInvites([])
  }

  const handleLoadTestData = () => {
    const testEmails = [
      'john.smith@acme.com',
      'sarah.johnson@acme.com',
      'mike.chen@acme.com',
      'emma.davis@acme.com',
      'alex.martinez@acme.com',
      'olivia.taylor@acme.com',
      'james.wilson@acme.com',
      'sophia.garcia@acme.com',
      'david.brown@acme.com',
      'emily.anderson@acme.com',
      'ryan.thomas@acme.com',
      'lisa.moore@acme.com',
      'kevin.jackson@acme.com',
      'maria.white@acme.com',
      'chris.harris@acme.com'
    ]

    const newInvites = testEmails.map(email => ({
      email,
      name: email.split('@')[0],
      role: 'Member'
    }))

    setPendingInvites(newInvites)
    setInviteStep('review')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <FeedbackButton />

      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-2xl font-bold text-[#212121]">timesēkr</Link>

          {/* Circle Selector */}
          <div className="mt-4 relative">
            <button
              onClick={() => setShowCircleSelector(!showCircleSelector)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-bold text-gray-900 truncate">{currentCircle.name}</p>
                <p className="text-xs text-gray-500">{currentCircle.role} · {currentCircle.members} members</p>
              </div>
              <svg className={`w-5 h-5 text-gray-400 group-hover:text-teal-600 flex-shrink-0 transition-transform ${showCircleSelector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Circle Dropdown */}
            {showCircleSelector && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">Your Circles</p>
                  {circles.map(circle => (
                    <button
                      key={circle.id}
                      onClick={() => handleSwitchCircle(circle.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition ${
                        circle.id === currentCircleId ? 'bg-teal-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{circle.name}</p>
                          <p className="text-xs text-gray-500">{circle.role} · {circle.members} members</p>
                        </div>
                        {circle.id === currentCircleId && (
                          <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-gray-200 p-2">
                  <button
                    onClick={() => {
                      setShowCircleSelector(false)
                      setShowCreateCircle(true)
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-teal-600 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Circle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveView('schedule')}
              className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Schedule Meeting
            </button>

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
              onClick={() => setActiveView('members')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeView === 'members'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Members
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Circle Admin
            </button>
          </div>

          <div className="px-4 pt-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Personal</p>
            <button
              onClick={() => setActiveView('profile')}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeView === 'profile'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
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

      {/* Add Participants Modal */}
      {showParticipantModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-[#212121]">Add Participants</h2>
                <button
                  onClick={() => {
                    setShowParticipantModal(false)
                    setParticipantSearch('')
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600">Select from your Circle members, groups, or add external emails</p>

              {/* Search/Add Email */}
              <div className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={participantSearch}
                    onChange={(e) => setParticipantSearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddEmailParticipant()}
                    placeholder="Search members or enter email address..."
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {participantSearch && participantSearch.includes('@') && (
                  <button
                    onClick={handleAddEmailParticipant}
                    className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    + Add "{participantSearch}" as external participant
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Circle Members */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Circle Members</h3>
                <div className="space-y-2">
                  {mockCircleMembers
                    .filter(member =>
                      !participantSearch ||
                      member.name.toLowerCase().includes(participantSearch.toLowerCase()) ||
                      member.email.toLowerCase().includes(participantSearch.toLowerCase())
                    )
                    .map(member => (
                      <button
                        key={member.id}
                        onClick={() => handleAddParticipant(member)}
                        disabled={meetingData.participants.find(p => p.id === member.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition ${
                          meetingData.participants.find(p => p.id === member.id)
                            ? 'border-teal-200 bg-teal-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-teal-500 hover:bg-teal-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-sm font-semibold text-teal-700">
                            {member.name[0].toUpperCase()}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                          </div>
                        </div>
                        {meetingData.participants.find(p => p.id === member.id) ? (
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        )}
                      </button>
                    ))}
                </div>
              </div>

              {/* Groups */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Groups</h3>
                <div className="space-y-2">
                  {mockGroups
                    .filter(group =>
                      !participantSearch ||
                      group.name.toLowerCase().includes(participantSearch.toLowerCase())
                    )
                    .map(group => (
                      <button
                        key={group.id}
                        onClick={() => handleAddParticipant(group)}
                        disabled={meetingData.participants.find(p => p.id === group.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition ${
                          meetingData.participants.find(p => p.id === group.id)
                            ? 'border-teal-200 bg-teal-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-teal-500 hover:bg-teal-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{group.name}</p>
                            <p className="text-sm text-gray-600">{group.memberCount} members</p>
                          </div>
                        </div>
                        {meetingData.participants.find(p => p.id === group.id) ? (
                          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  {meetingData.participants.length} participant{meetingData.participants.length !== 1 ? 's' : ''} selected
                </p>
                <button
                  onClick={() => {
                    setShowParticipantModal(false)
                    setParticipantSearch('')
                  }}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Confirmation Modal */}
      {showConfirmationModal && selectedTimeSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {!invitationsSent ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-[#212121]">Confirm Meeting</h2>
                    <button
                      onClick={() => {
                        setShowConfirmationModal(false)
                        setSelectedTimeSlot(null)
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Review meeting details and send invitations</p>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Meeting Details Card */}
                  <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-teal-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{meetingData.title || 'Untitled Meeting'}</h3>
                        {meetingData.subject && (
                          <p className="text-sm text-gray-700 mb-3">{meetingData.subject}</p>
                        )}
                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold">{selectedTimeSlot.date}</span>
                          <span className="text-gray-500">•</span>
                          <span className="font-semibold">{selectedTimeSlot.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-semibold">{selectedTimeSlot.available}/{selectedTimeSlot.total} participants available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participants List */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-3">Participants</h3>
                    <div className="space-y-2">
                      {selectedTimeSlot.participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold flex-shrink-0">
                              {participant.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{participant.name}</p>
                              <p className="text-sm text-gray-500">{participant.email}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {participant.isAvailable ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs font-semibold">Available</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-amber-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="text-xs font-semibold">Has conflict</span>
                              </div>
                            )}
                            {participant.type === 'external' && (
                              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">External</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* External Participants Notice */}
                  {selectedTimeSlot.participants.some(p => p.type === 'external') && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex gap-3">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold text-blue-900 mb-1">External Participants Included</p>
                          <p className="text-sm text-blue-800">
                            External participants will receive a meeting invitation along with an invitation to join your Circle for easier future scheduling.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowConfirmationModal(false)
                        setSelectedTimeSlot(null)
                      }}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        // Simulate sending invitations
                        setTimeout(() => {
                          setInvitationsSent(true)
                        }, 1500)
                      }}
                      className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                    >
                      Send Invitations
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Meeting Scheduled!</h2>
                  <p className="text-gray-600 mb-8">
                    Invitations have been sent to all participants. The meeting has been added to your calendar.
                  </p>

                  {/* Meeting Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-bold text-gray-900 mb-4">Meeting Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Title:</span>
                        <span className="font-semibold text-gray-900">{meetingData.title || 'Untitled Meeting'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date & Time:</span>
                        <span className="font-semibold text-gray-900">{selectedTimeSlot.date}, {selectedTimeSlot.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Participants:</span>
                        <span className="font-semibold text-gray-900">{selectedTimeSlot.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calendar File:</span>
                        <span className="font-semibold text-teal-600">.ics sent via email</span>
                      </div>
                    </div>
                  </div>

                  {/* What Happens Next */}
                  <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      What happens next?
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Circle members will receive calendar invitations (.ics files)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>External participants will also receive Circle invitations to join for easier future scheduling</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>Once accepted, the meeting will appear on your calendar</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>You'll receive notifications as participants respond</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setShowConfirmationModal(false)
                      setSelectedTimeSlot(null)
                      setInvitationsSent(false)
                      // Reset meeting data
                      setMeetingData({
                        title: '',
                        dateRangeStart: '',
                        dateRangeEnd: '',
                        duration: '30',
                        participants: [],
                        subject: '',
                        description: ''
                      })
                    }}
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Create Circle Modal */}
      {showCreateCircle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-[#212121] mb-2">Create New Circle</h2>
            <p className="text-sm text-gray-600 mb-6">Start a new Circle to manage availability with a different group.</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Circle Name
              </label>
              <input
                type="text"
                value={newCircleName}
                onChange={(e) => setNewCircleName(e.target.value)}
                placeholder="e.g., Marketing Team, Project Alpha"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreateCircle(false)
                  setNewCircleName('')
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCircle}
                disabled={!newCircleName.trim()}
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Circle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Payment Alert Banner */}
        {!hasPaymentMethod && showPaymentAlert && (
          <div className="bg-yellow-50 border-b-2 border-yellow-200 px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-yellow-900">Payment method required</h3>
                  <p className="text-sm text-yellow-800">Add a payment method to continue using timesēkr and avoid service interruption.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('settings')}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition text-sm whitespace-nowrap"
                >
                  Add Payment Method
                </button>
                <button
                  onClick={() => setShowPaymentAlert(false)}
                  className="p-2 text-yellow-600 hover:text-yellow-800 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

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
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Invite Circle members</h3>
                      <p className="text-sm text-gray-600 mb-4">Add people to your Circle so they can share their availability</p>
                      {!hasMembers && (
                        <button
                          onClick={() => setActiveView('invite')}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm"
                        >
                          Invite Circle Members
                        </button>
                      )}
                      {hasMembers && (
                        <p className="text-sm text-teal-700 font-semibold">✓ {members.length} Circle member{members.length !== 1 ? 's' : ''} invited</p>
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
                      <h3 className="text-lg font-semibold text-[#212121] mb-1">Create your first group</h3>
                      <p className="text-sm text-gray-600 mb-4">Group Circle members together for convenient scheduling queries</p>
                      <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm">
                        Create Group
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
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#212121] mb-2">My Availability</h1>
                <p className="text-gray-600">Set your available time blocks and preferences for meetings</p>
              </div>

              {/* Preferences Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-bold text-[#212121] mb-4">Availability Preferences</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours Start</label>
                    <input
                      type="time"
                      defaultValue="09:00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours End</label>
                    <input
                      type="time"
                      defaultValue="17:00"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Meeting Duration</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition">
                      <option>15 minutes</option>
                      <option selected>30 minutes</option>
                      <option>45 minutes</option>
                      <option>1 hour</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buffer Between Meetings</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition">
                      <option>No buffer</option>
                      <option>5 minutes</option>
                      <option selected>10 minutes</option>
                      <option>15 minutes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Calendar Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h2 className="text-xl font-bold text-gray-900">Week of January 15, 2024</h2>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm">
                      Save Changes
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Click and drag to add available time blocks</p>
                </div>

                {/* Weekly Calendar Grid */}
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Day Headers */}
                    <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
                      <div className="p-4 text-sm font-semibold text-gray-600"></div>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
                        <div key={day} className="p-4 text-center border-l border-gray-200">
                          <p className="text-sm font-semibold text-gray-900">{day}</p>
                          <p className="text-xs text-gray-500">Jan {15 + idx}</p>
                        </div>
                      ))}
                    </div>

                    {/* Time Slots */}
                    <div className="relative">
                      {Array.from({ length: 24 }, (_, hour) => {
                        const timeLabel = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`
                        return (
                          <div key={hour} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50 transition">
                            {/* Time Label */}
                            <div className="p-2 text-xs text-gray-500 font-medium text-right pr-4 border-r border-gray-200">
                              {timeLabel}
                            </div>

                            {/* Day Cells */}
                            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                              // Mock availability blocks
                              const isAvailable = (day < 5 && hour >= 9 && hour < 17) // Mon-Fri 9 AM - 5 PM

                              return (
                                <div
                                  key={day}
                                  className={`p-2 border-l border-gray-100 min-h-[40px] cursor-pointer transition group relative ${
                                    isAvailable ? 'bg-teal-100 hover:bg-teal-200' : 'hover:bg-gray-100'
                                  }`}
                                >
                                  {isAvailable && (
                                    <div className="absolute inset-0 bg-teal-500 opacity-20 group-hover:opacity-30"></div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-teal-500 rounded"></div>
                      <span className="text-sm text-gray-700">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                      <span className="text-sm text-gray-700">Unavailable</span>
                    </div>
                    <div className="ml-auto text-sm text-gray-600">
                      40 hours available this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'members' && (
          <div className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#212121] mb-2">Circle Members</h1>
                <p className="text-gray-600">{members.length} member{members.length !== 1 ? 's' : ''} in your Circle</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={memberSearch}
                        onChange={(e) => setMemberSearch(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <button
                      onClick={() => setActiveView('invite')}
                      className="bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition whitespace-nowrap"
                    >
                      + Invite Members
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMemberRoleFilter('all')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition text-sm ${
                          memberRoleFilter === 'all'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        All Roles
                      </button>
                      <button
                        onClick={() => setMemberRoleFilter('Member')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition text-sm ${
                          memberRoleFilter === 'Member'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Members
                      </button>
                      <button
                        onClick={() => setMemberRoleFilter('Member Delegate')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition text-sm ${
                          memberRoleFilter === 'Member Delegate'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Member Delegates
                      </button>
                    </div>

                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => setMemberStatusFilter('all')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition text-sm ${
                          memberStatusFilter === 'all'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        All Status
                      </button>
                      <button
                        onClick={() => setMemberStatusFilter('active')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition text-sm ${
                          memberStatusFilter === 'active'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setMemberStatusFilter('pending')}
                        className={`px-3 py-1.5 rounded-lg font-medium transition text-sm ${
                          memberStatusFilter === 'pending'
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Pending
                      </button>
                    </div>
                  </div>
                </div>

                {/* Members List */}
                <div className="divide-y divide-gray-200">
                  {members.length === 0 ? (
                    <div className="p-12 text-center">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No members yet</h3>
                      <p className="text-gray-600 mb-4">Start building your Circle by inviting members</p>
                      <button
                        onClick={() => setActiveView('invite')}
                        className="bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition"
                      >
                        Invite Members
                      </button>
                    </div>
                  ) : (
                    members
                      .filter(member => {
                        const matchesSearch = member.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
                                            (member.name && member.name.toLowerCase().includes(memberSearch.toLowerCase()))
                        const matchesRole = memberRoleFilter === 'all' || member.role === memberRoleFilter
                        const matchesStatus = memberStatusFilter === 'all' || member.status === memberStatusFilter
                        return matchesSearch && matchesRole && matchesStatus
                      })
                      .map((member, index) => (
                        <div key={index} className="p-4 hover:bg-gray-50 transition">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-base font-semibold text-teal-700">
                                {member.name[0].toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900">{member.email}</p>
                                {member.role && (
                                  <p className="text-xs text-gray-600 mt-0.5">{member.role}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                                member.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {member.status === 'active' ? 'Active' : 'Pending'}
                              </span>
                              <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'schedule' && (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#212121] mb-2">Schedule Meeting</h1>
                <p className="text-gray-600">Find the best time for your Circle members to meet</p>
              </div>

              {scheduleStep === 'create' && (
                <div className="bg-white rounded-xl border border-gray-200">
                  {/* Meeting Information */}
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-[#212121] mb-1">Meeting Information</h2>
                    <p className="text-sm text-gray-600 mb-6">Set up your meeting details and find available times</p>

                    <div className="space-y-4">
                      {/* Meeting Title */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Meeting Title *
                        </label>
                        <input
                          type="text"
                          value={meetingData.title}
                          onChange={(e) => setMeetingData({...meetingData, title: e.target.value})}
                          placeholder="e.g., Q1 Planning Session"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={meetingData.subject}
                          onChange={(e) => setMeetingData({...meetingData, subject: e.target.value})}
                          placeholder="Brief subject line for the invitation"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={meetingData.description}
                          onChange={(e) => setMeetingData({...meetingData, description: e.target.value})}
                          placeholder="Add meeting details, agenda, or any additional information..."
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-gray-200"></div>

                  {/* Availability Search */}
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-[#212121] mb-1">Find Available Times</h2>
                    <p className="text-sm text-gray-600 mb-6">Select participants and date range to see availability</p>

                    <div className="space-y-4">
                      {/* Participants */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Participants *
                        </label>
                        <p className="text-xs text-gray-600 mb-3">Add Circle members, groups, or enter new email addresses</p>

                      {/* Selected Participants */}
                      {meetingData.participants.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {meetingData.participants.map((p, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-300">
                              <span className="text-sm text-gray-900">{p.name || p.email}</span>
                              <button
                                type="button"
                                onClick={() => setMeetingData({
                                  ...meetingData,
                                  participants: meetingData.participants.filter((_, i) => i !== idx)
                                })}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                        <button
                          type="button"
                          onClick={() => setShowParticipantModal(true)}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition text-gray-600 hover:text-teal-700 font-medium"
                        >
                          + Add Participants
                        </button>
                      </div>

                      {/* Date Range */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Search From *
                          </label>
                          <input
                            type="date"
                            value={meetingData.dateRangeStart}
                            onChange={(e) => setMeetingData({...meetingData, dateRangeStart: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Search Until *
                          </label>
                          <input
                            type="date"
                            value={meetingData.dateRangeEnd}
                            onChange={(e) => setMeetingData({...meetingData, dateRangeEnd: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                          />
                        </div>
                      </div>

                      {/* Meeting Duration */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Meeting Duration *
                        </label>
                        <div className="relative">
                          <select
                            value={meetingData.duration}
                            onChange={(e) => setMeetingData({...meetingData, duration: e.target.value})}
                            className="appearance-none w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition bg-white cursor-pointer"
                          >
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                          </select>
                          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Available Time Slots - Shows when participants are added */}
                  {meetingData.participants.length > 0 && (
                    <>
                      {/* Divider */}
                      <div className="border-t-2 border-gray-200"></div>

                      <div className="p-6">
                        <h2 className="text-lg font-bold text-[#212121] mb-1">Available Time Slots</h2>
                        <p className="text-sm text-gray-600 mb-6">
                          Showing availability for {meetingData.participants.length} participant{meetingData.participants.length !== 1 ? 's' : ''}
                        </p>

                        {/* Mock available times */}
                        <div className="space-y-2">
                          {[
                            {
                              id: 0,
                              date: 'Monday, Jan 15',
                              time: '2:00 PM - 2:30 PM',
                              available: meetingData.participants.length,
                              total: meetingData.participants.length,
                              participants: meetingData.participants.map(p => ({ ...p, isAvailable: true }))
                            },
                            {
                              id: 1,
                              date: 'Monday, Jan 15',
                              time: '4:00 PM - 4:30 PM',
                              available: Math.max(1, meetingData.participants.length - 1),
                              total: meetingData.participants.length,
                              participants: meetingData.participants.map((p, i) => ({ ...p, isAvailable: i !== 0 }))
                            },
                            {
                              id: 2,
                              date: 'Tuesday, Jan 16',
                              time: '10:00 AM - 10:30 AM',
                              available: meetingData.participants.length,
                              total: meetingData.participants.length,
                              participants: meetingData.participants.map(p => ({ ...p, isAvailable: true }))
                            },
                            {
                              id: 3,
                              date: 'Tuesday, Jan 16',
                              time: '3:00 PM - 3:30 PM',
                              available: Math.max(1, meetingData.participants.length - 1),
                              total: meetingData.participants.length,
                              participants: meetingData.participants.map((p, i) => ({ ...p, isAvailable: i !== 1 }))
                            },
                            {
                              id: 4,
                              date: 'Wednesday, Jan 17',
                              time: '1:00 PM - 1:30 PM',
                              available: meetingData.participants.length,
                              total: meetingData.participants.length,
                              participants: meetingData.participants.map(p => ({ ...p, isAvailable: true }))
                            }
                          ].map((slot) => (
                            <div key={slot.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-teal-500 transition">
                              <button
                                onClick={() => setExpandedTimeSlot(expandedTimeSlot === slot.id ? null : slot.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-teal-50 transition group"
                              >
                                <div className="text-left">
                                  <p className="font-semibold text-gray-900">{slot.date}</p>
                                  <p className="text-sm text-gray-600">{slot.time}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">
                                      {slot.available}/{slot.total} available
                                    </p>
                                    {slot.available === slot.total && (
                                      <p className="text-xs text-green-600 font-semibold">Everyone can attend</p>
                                    )}
                                  </div>
                                  <svg
                                    className={`w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-transform ${expandedTimeSlot === slot.id ? 'rotate-90' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </button>

                              {/* Participant availability details */}
                              {expandedTimeSlot === slot.id && (
                                <div className="border-t border-gray-200 bg-gray-50 p-4">
                                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                                    Participant Availability
                                  </p>
                                  <div className="space-y-2">
                                    {slot.participants.map((participant) => (
                                      <div
                                        key={participant.id}
                                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold text-sm flex-shrink-0">
                                            {participant.name.charAt(0)}
                                          </div>
                                          <div>
                                            <p className="text-sm font-semibold text-gray-900">{participant.name}</p>
                                            {participant.email && (
                                              <p className="text-xs text-gray-500">{participant.email}</p>
                                            )}
                                          </div>
                                        </div>
                                        {participant.isAvailable ? (
                                          <div className="flex items-center gap-2 text-green-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-semibold">Available</span>
                                          </div>
                                        ) : (
                                          <div className="flex items-center gap-2 text-red-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            <span className="text-sm font-semibold">Unavailable</span>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  <button
                                    onClick={() => {
                                      setSelectedTimeSlot(slot)
                                      setShowConfirmationModal(true)
                                      setInvitationsSent(false)
                                    }}
                                    className="mt-4 w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
                                  >
                                    Select This Time
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        <button className="mt-4 w-full text-center py-2 text-sm text-teal-600 font-semibold hover:text-teal-700">
                          Expand date range to show more options
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
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
                <h1 className="text-3xl font-bold text-[#212121]">Invite Circle Members</h1>
                <p className="text-gray-600 mt-2">Add people to your Circle to start finding availability</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {inviteStep === 'input' && (
                  <>
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
                    <form onSubmit={handleProcessInvites} className="space-y-6">
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
                          type="button"
                          onClick={handleLoadTestData}
                          className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition border border-purple-300"
                        >
                          Load Test Data
                        </button>
                        <button
                          type="submit"
                          disabled={!inviteEmails.trim()}
                          className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {inviteStep === 'review' && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-[#212121] mb-2">Review Invitations ({pendingInvites.length})</h3>
                      <p className="text-sm text-gray-600">Set permissions for each member before sending invitations</p>
                    </div>

                    {/* Bulk Actions */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleSelectAll}
                            className="text-sm font-medium text-teal-600 hover:text-teal-700"
                          >
                            {selectedInvites.length === pendingInvites.length ? 'Deselect All' : 'Select All'}
                          </button>
                          {selectedInvites.length > 0 && (
                            <span className="text-sm text-gray-600">
                              {selectedInvites.length} selected
                            </span>
                          )}
                        </div>
                        {selectedInvites.length > 0 && (
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Set selected to:</label>
                            <div className="relative">
                              <select
                                value={bulkRole}
                                onChange={(e) => setBulkRole(e.target.value)}
                                className="appearance-none px-3 py-1.5 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition bg-white text-sm font-medium cursor-pointer hover:border-gray-400"
                              >
                                <option value="Member">Member</option>
                                <option value="Member Delegate">Member Delegate</option>
                              </select>
                              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <button
                              onClick={handleApplyBulkRole}
                              className="px-4 py-1.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition text-sm"
                            >
                              Apply
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pending Invites List */}
                    <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                      {pendingInvites.map((invite, index) => (
                        <div key={index} className={`flex items-center justify-between p-4 bg-white border-2 rounded-lg transition ${
                          selectedInvites.includes(invite.email)
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="checkbox"
                              checked={selectedInvites.includes(invite.email)}
                              onChange={() => handleToggleSelect(invite.email)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer"
                            />
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-sm font-semibold text-teal-700">
                              {invite.name[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{invite.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <select
                                value={invite.role}
                                onChange={(e) => handleUpdateRole(invite.email, e.target.value)}
                                className="appearance-none px-3 py-1.5 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition bg-white text-sm font-medium cursor-pointer hover:border-gray-400"
                              >
                                <option value="Member">Member</option>
                                <option value="Member Delegate">Member Delegate</option>
                              </select>
                              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                            <button
                              onClick={() => handleRemoveInvite(invite.email)}
                              className="p-1.5 text-gray-400 hover:text-red-600 transition"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancelReview}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSendInvites}
                        disabled={pendingInvites.length === 0}
                        className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send {pendingInvites.length} Invitation{pendingInvites.length !== 1 ? 's' : ''}
                      </button>
                    </div>
                  </>
                )}

                {members.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-[#212121] mb-4">Invited Circle Members ({members.length})</h3>
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

        {activeView === 'profile' && (
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-[#212121] mb-6">My Profile</h1>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value="Alice Johnson"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value="alice@acme.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        readOnly
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                  </div>
                </div>

                {/* Personal Calendars */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">My Personal Calendars</h2>
                  <p className="text-sm text-gray-600 mb-4">Connect your personal calendars to improve availability tracking</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-[#212121] text-sm">Google</p>
                        <p className="text-xs text-gray-600">Calendar</p>
                      </div>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-[#212121] text-sm">Outlook</p>
                        <p className="text-xs text-gray-600">Calendar</p>
                      </div>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
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

                {/* Save Button */}
                <div className="flex justify-end">
                  <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>Circle Admin</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-900 font-medium">{currentCircle.name}</span>
                </div>
                <h1 className="text-3xl font-bold text-[#212121]">Circle Admin</h1>
              </div>

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

                {/* Subscription Plan */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Subscription Plan</h2>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 mb-6 border border-teal-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#212121] mb-1">{billingData.plan}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="text-2xl font-bold text-teal-700">${billingData.price}</span>
                          <span className="text-gray-600">/{billingData.interval}</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          {billingData.memberRange} · ${billingData.perUserCost.toFixed(2)}/user/month
                        </p>
                      </div>
                      <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Active
                      </span>
                    </div>

                    <div className="bg-white/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Circle Members</span>
                        <span className="text-sm font-bold text-[#212121]">{billingData.members}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((billingData.members / parseInt(billingData.memberRange.split('-')[1])) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        {billingData.memberRange.split('-')[1] - billingData.members > 0
                          ? `${parseInt(billingData.memberRange.split('-')[1]) - billingData.members} members remaining in this tier`
                          : 'At tier capacity'}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Unlimited availability searches</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Calendar integrations</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Email support</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-teal-200">
                      <p className="text-xs text-gray-600">
                        Next billing date: <span className="font-semibold text-gray-900">{billingData.nextBillingDate}</span>
                      </p>
                    </div>
                  </div>

                  {currentPlan.name !== nextTierPlan.name && billingData.members > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Auto-upgrade enabled</p>
                          <p className="text-sm text-blue-800 mt-1">
                            When you add your next member, you'll automatically upgrade to the {nextTierPlan.name} plan (${nextTierPlan.price}/month).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <details className="group">
                    <summary className="cursor-pointer text-teal-600 font-semibold hover:text-teal-700 transition text-sm list-none flex items-center gap-2">
                      <span>View All Plans</span>
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                      {[
                        { name: 'Family Plan', price: 3, range: '1-5 members', perUser: 0.60 },
                        { name: 'Small Team', price: 8, range: '6-15 members', perUser: 0.53 },
                        { name: 'Medium Team', price: 15, range: '16-30 members', perUser: 0.50 },
                        { name: 'Large Team', price: 20, range: '31-50 members', perUser: 0.40 },
                        { name: 'Enterprise', price: 30, range: '51-100 members', perUser: 0.30 },
                        { name: 'Enterprise Plus', price: 50, range: '101-500 members', perUser: 0.10 },
                        { name: 'Enterprise Max', price: 90, range: '501-1000 members', perUser: 0.09 }
                      ].map((plan) => (
                        <div key={plan.name} className={`p-3 rounded-lg border ${
                          plan.name === currentPlan.name
                            ? 'border-teal-300 bg-teal-50'
                            : 'border-gray-200 bg-white'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{plan.name}</p>
                              <p className="text-xs text-gray-600">{plan.range} · ${plan.perUser.toFixed(2)}/user/month</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">${plan.price}/mo</p>
                              {plan.name === currentPlan.name && (
                                <span className="text-xs text-teal-600 font-semibold">Current</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>

                {/* Payment & Billing */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-[#212121] mb-4">Payment Method</h2>
                  {!hasPaymentMethod ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-yellow-900">No payment method on file</p>
                          <p className="text-sm text-yellow-800 mt-1">Add a payment method to continue service.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-600">Expires 12/25</p>
                        </div>
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">Active</span>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => setHasPaymentMethod(true)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition text-sm"
                  >
                    {hasPaymentMethod ? 'Update Payment Method' : 'Add Payment Method'}
                  </button>
                </div>

                {/* Billing History */}
                {hasPaymentMethod && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-[#212121] mb-4">Billing History</h2>
                    <div className="space-y-2">
                      {billingData.billingHistory.map((invoice, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                            <p className="text-xs text-gray-600">{billingData.plan} Plan</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-900">${invoice.amount}</span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${
                              invoice.status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-teal-600 font-semibold hover:text-teal-700 transition text-sm">
                      View All Invoices →
                    </button>
                  </div>
                )}

                {/* Circle Members Summary */}
                {members.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-[#212121]">Circle Members</h2>
                        <p className="text-sm text-gray-600 mt-1">{members.length} member{members.length !== 1 ? 's' : ''} in your Circle</p>
                      </div>
                      <button
                        onClick={() => setActiveView('members')}
                        className="text-teal-600 font-semibold hover:text-teal-700 transition text-sm"
                      >
                        View All →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
