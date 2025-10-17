import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import MyCirclesTab from '../components/dashboard/MyCirclesTab'
import MembersTab from '../components/dashboard/MembersTab'
import SettingsTab from '../components/dashboard/SettingsTab'
import CircleManagementTab from '../components/dashboard/CircleManagementTab'
import AvailabilityTab from '../components/dashboard/AvailabilityTab'
import FindAvailabilityTab from '../components/dashboard/FindAvailabilityTab'
import CreateCircleForm from '../components/dashboard/CreateCircleForm'
import FlowSwitcher from '../components/FlowSwitcher'

function Dashboard() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState(() => {
    // Default to members tab if coming from onboarding with a newly created circle
    const flow = searchParams.get('flow')
    return flow === 'created-circle' ? 'members' : 'availability'
  })
  const [currentFlow, setCurrentFlow] = useState('empty')
  const [userCreatedCircles, setUserCreatedCircles] = useState(() => {
    // Load circles from localStorage on initial mount
    const stored = localStorage.getItem('userCreatedCircles')
    return stored ? JSON.parse(stored) : []
  })
  const [circleInviteStates, setCircleInviteStates] = useState({
    1: true,  // Acme has invites
    2: true,  // Nonprofit has invites
    3: false  // Consulting has no invites
  })
  const [pendingInvite, setPendingInvite] = useState(null)
  const [showAvailabilityBanner, setShowAvailabilityBanner] = useState(false)
  const [selectedCircleId, setSelectedCircleId] = useState(null)
  const [showCircleDropdown, setShowCircleDropdown] = useState(false)
  const [showCreateCircleForm, setShowCreateCircleForm] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  // Check for flow parameter in URL and pending invites
  useEffect(() => {
    const flow = searchParams.get('flow')
    const token = searchParams.get('token')

    if (flow) {
      setCurrentFlow(flow)
    }

    // Check if there's a pending invitation
    if (flow === 'invite-pending' && token) {
      // TODO: API call to get invite details
      setPendingInvite({
        token,
        circleName: 'Acme Corporation',
        inviterName: 'John Doe',
        inviterEmail: 'john@acme.com',
        invitedEmail: 'john@example.com', // The email they were invited as
        role: 'member',
        message: 'Hey! Join our team circle so we can coordinate meetings more easily.'
      })
    }
  }, [searchParams])

  // Redirect to onboarding if user has no circles (unless they have a pending invite)
  useEffect(() => {
    const allCircles = getMockCircles()
    if (allCircles.length === 0 && !pendingInvite) {
      navigate('/onboarding')
    }
  }, [userCreatedCircles, currentFlow, pendingInvite, navigate])

  // Mock data based on flow
  const getMockCircles = () => {
    const mockCircles = (() => {
      switch (currentFlow) {
        case 'invite-accepted':
          // Don't return mock data - the circle is in userCreatedCircles
          return []
        case 'one-circle':
          return [{
            id: 1,
            name: 'Acme Corporation',
            description: 'Main company circle',
            members: 47,
            role: 'organizer',
            invitations: circleInviteStates[1] ? [
              { name: 'Sarah Johnson', email: 'sarah@acme.com', status: 'accepted', role: 'member' },
              { name: 'Mike Chen', email: 'mike@acme.com', status: 'accepted', role: 'delegate' },
              { name: 'Emily Rodriguez', email: 'emily@acme.com', status: 'pending', role: 'member' },
              { name: 'James Wilson', email: 'james@acme.com', status: 'pending', role: 'delegate' },
              { name: 'Lisa Anderson', email: 'lisa@acme.com', status: 'declined', role: 'member' }
            ] : []
          }]
        case 'multiple-circles':
          return [
            {
              id: 1,
              name: 'Acme Corporation',
              description: 'Main company circle for all members',
              members: 47,
              role: 'organizer',
              invitations: circleInviteStates[1] ? [
                { name: 'Sarah Johnson', email: 'sarah@acme.com', status: 'accepted', role: 'member' },
                { name: 'Mike Chen', email: 'mike@acme.com', status: 'pending', role: 'delegate' }
              ] : []
            },
            {
              id: 2,
              name: 'Nonprofit Foundation',
              description: '501(c)(3) circle',
              members: 23,
              role: 'delegate',
              invitations: circleInviteStates[2] ? [
                { name: 'Alex Kim', email: 'alex@nonprofit.org', status: 'accepted', role: 'member' },
                { name: 'Jordan Lee', email: 'jordan@nonprofit.org', status: 'accepted', role: 'delegate' }
              ] : []
            },
            {
              id: 3,
              name: 'Consulting Partners LLC',
              members: 12,
              role: 'member',
              invitations: circleInviteStates[3] ? [
                { name: 'David Brown', email: 'david@consulting.com', status: 'accepted', role: 'member' }
              ] : []
            }
          ]
        default:
          return []
      }
    })()

    // Merge mock circles with user created circles
    return [...mockCircles, ...userCreatedCircles]
  }

  // Check if user is organizer or delegate in any circle
  const canFindAvailability = () => {
    const allCircles = getMockCircles()
    return allCircles.some(c => c.role === 'organizer' || c.role === 'delegate')
  }

  const handleFlowChange = (flowId) => {
    setCurrentFlow(flowId)
  }

  // Set default selected circle when circles load
  useEffect(() => {
    const circles = getMockCircles()
    if (circles.length > 0 && !selectedCircleId) {
      setSelectedCircleId(circles[0].id)
    }
  }, [currentFlow, userCreatedCircles])

  const getSelectedCircle = () => {
    const circles = getMockCircles()
    return circles.find(c => c.id === selectedCircleId) || circles[0]
  }

  const handleCircleCreated = (formData) => {
    const newCircle = {
      id: Date.now(),
      name: formData.circleName || 'New Circle',
      description: formData.circleDescription || '',
      members: 0,
      role: 'organizer',
      invitations: []
    }
    const updatedCircles = [...userCreatedCircles, newCircle]
    setUserCreatedCircles(updatedCircles)
    // Persist to localStorage
    localStorage.setItem('userCreatedCircles', JSON.stringify(updatedCircles))
    setSelectedCircleId(newCircle.id)
    setShowCreateCircleForm(false)
  }

  const handleCircleUpdated = (updatedCircle) => {
    // Update in userCreatedCircles if it exists there
    const index = userCreatedCircles.findIndex(c => c.id === updatedCircle.id)
    if (index !== -1) {
      const updated = [...userCreatedCircles]
      updated[index] = updatedCircle
      setUserCreatedCircles(updated)
      // Persist to localStorage
      localStorage.setItem('userCreatedCircles', JSON.stringify(updated))
    }
  }

  const handleAcceptInvite = () => {
    // TODO: API call to accept invitation
    console.log('Accepted invite')

    // Add circle to user's circles
    const newCircle = {
      id: Date.now(),
      name: pendingInvite.circleName,
      description: 'Main company circle',
      members: 47,
      role: pendingInvite.role,
      invitations: [
        { name: 'Sarah Johnson', email: 'sarah@acme.com', status: 'accepted', role: 'member' },
        { name: 'Mike Chen', email: 'mike@acme.com', status: 'accepted', role: 'delegate' },
        { name: 'Emily Rodriguez', email: 'emily@acme.com', status: 'pending', role: 'member' }
      ]
    }
    const updatedCircles = [...userCreatedCircles, newCircle]
    setUserCreatedCircles(updatedCircles)
    // Persist to localStorage
    localStorage.setItem('userCreatedCircles', JSON.stringify(updatedCircles))
    setPendingInvite(null)
    setCurrentFlow('invite-accepted')

    // Redirect to My Availability tab with banner
    setShowAvailabilityBanner(true)
    setActiveView('availability')
  }

  const handleDeclineInvite = () => {
    // TODO: API call to decline invitation
    setPendingInvite(null)
  }

  const selectedCircle = getSelectedCircle()
  const allCircles = getMockCircles()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">timesēkr</h1>
        </div>

        {/* Circle Selector */}
        <div className="p-4 border-b border-gray-200">
          {allCircles.length > 0 ? (
            <div className="relative">
              <button
                onClick={() => setShowCircleDropdown(!showCircleDropdown)}
                className="w-full bg-white border-2 border-gray-200 rounded-lg px-4 py-3 text-left hover:border-teal-300 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">
                      {selectedCircle?.name ? selectedCircle.name.substring(0, 2).toUpperCase() : 'C'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">Current Circle</div>
                    <div className="font-medium text-gray-900 truncate">{selectedCircle?.name}</div>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${showCircleDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCircleDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                  {allCircles.map(circle => (
                    <button
                      key={circle.id}
                      onClick={() => {
                        setSelectedCircleId(circle.id)
                        setShowCircleDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-teal-50 transition border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${
                        selectedCircleId === circle.id ? 'bg-teal-50' : ''
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">
                          {circle.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{circle.name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {circle.members} members · {circle.role}
                        </div>
                      </div>
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setShowCreateCircleForm(true)
                      setShowCircleDropdown(false)
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-teal-50 transition border-t-2 border-gray-200 text-teal-600 font-medium"
                  >
                    + Create New Circle
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <div className="text-center mb-4">
                <div className="text-xs text-gray-500 mb-2">No Circles</div>
                <div className="text-sm text-gray-600">Get started by creating or joining a circle</div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setShowCreateCircleForm(true)}
                  className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
                >
                  Create Circle
                </button>
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition text-sm"
                >
                  Join with Code
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pending Invite Banner */}
        {pendingInvite && (
          <div className="p-4 border-b border-gray-200">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
              <div className="text-xs font-medium text-yellow-700 mb-1">Pending Invitation</div>
              <div className="text-sm font-semibold text-gray-900 mb-2">{pendingInvite.circleName}</div>
              <div className="flex gap-2">
                <button
                  onClick={handleAcceptInvite}
                  className="flex-1 bg-teal-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-teal-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={handleDeclineInvite}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-50 transition"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Find Availability CTA */}
        {canFindAvailability() && (
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => setActiveView('find-availability')}
              className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
            >
              Find Availability
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <button
            onClick={() => setActiveView('availability')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition mb-2 ${
              activeView === 'availability'
                ? 'bg-teal-50 text-teal-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            My Availability
          </button>
          <button
            onClick={() => setActiveView('members')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition mb-2 ${
              activeView === 'members'
                ? 'bg-teal-50 text-teal-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Circle Members
          </button>
          <button
            onClick={() => setActiveView('circle-management')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
              activeView === 'circle-management'
                ? 'bg-teal-50 text-teal-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Manage Circle
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setActiveView('settings')}
            className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition"
          >
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">@johndoe</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-[1000px] mx-auto">
          {showCreateCircleForm ? (
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">Create Circle</h2>
              <CreateCircleForm
                onCancel={() => setShowCreateCircleForm(false)}
                onSuccess={handleCircleCreated}
              />
            </div>
          ) : activeView === 'members' ? (
            <MembersTab circle={selectedCircle} onMembersAdded={(members) => {
              const updatedCircle = {
                ...selectedCircle,
                invitations: [...(selectedCircle?.invitations || []), ...members],
                members: (selectedCircle?.members || 0) + members.filter(m => m.status === 'accepted').length
              }
              handleCircleUpdated(updatedCircle)
            }} />
          ) : activeView === 'availability' ? (
            <AvailabilityTab showBanner={showAvailabilityBanner} />
          ) : activeView === 'circle-management' ? (
            <CircleManagementTab circle={selectedCircle} />
          ) : activeView === 'find-availability' ? (
            <FindAvailabilityTab circle={selectedCircle} />
          ) : activeView === 'settings' ? (
            <SettingsTab />
          ) : null}
        </div>
      </main>

      {/* Join with Code Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Join with Invite Code</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Enter the invite code you received to join an existing circle
            </p>
            <input
              type="text"
              placeholder="Enter invite code"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: API call to join with code
                  setShowJoinModal(false)
                }}
                className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Join Circle
              </button>
            </div>
          </div>
        </div>
      )}

      <FlowSwitcher
        currentFlow={currentFlow}
        onFlowChange={handleFlowChange}
        circleInviteStates={circleInviteStates}
        onInviteStateChange={setCircleInviteStates}
      />
    </div>
  )
}

export default Dashboard
