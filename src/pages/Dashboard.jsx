import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MyCirclesTab from '../components/dashboard/MyCirclesTab'
import SettingsTab from '../components/dashboard/SettingsTab'
import AvailabilityTab from '../components/dashboard/AvailabilityTab'
import FindAvailabilityTab from '../components/dashboard/FindAvailabilityTab'
import FlowSwitcher from '../components/FlowSwitcher'

function Dashboard() {
  const [searchParams] = useSearchParams()
  const [activeView, setActiveView] = useState('circles')
  const [currentFlow, setCurrentFlow] = useState('empty')
  const [userCreatedCircles, setUserCreatedCircles] = useState([])
  const [circleInviteStates, setCircleInviteStates] = useState({
    1: true,  // Acme has invites
    2: true,  // Nonprofit has invites
    3: false  // Consulting has no invites
  })
  const [pendingInvite, setPendingInvite] = useState(null)
  const [showAvailabilityBanner, setShowAvailabilityBanner] = useState(false)

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
        role: 'member',
        message: 'Hey! Join our team circle so we can coordinate meetings more easily.'
      })
    }
  }, [searchParams])

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
    setActiveView('circles')
  }

  const handleCircleCreated = (circle) => {
    setUserCreatedCircles([...userCreatedCircles, circle])
  }

  const handleCircleUpdated = (updatedCircle) => {
    // Update in userCreatedCircles if it exists there
    const index = userCreatedCircles.findIndex(c => c.id === updatedCircle.id)
    if (index !== -1) {
      const updated = [...userCreatedCircles]
      updated[index] = updatedCircle
      setUserCreatedCircles(updated)
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
    setUserCreatedCircles([...userCreatedCircles, newCircle])
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">timesēkr</h1>
        </div>

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
            onClick={() => setActiveView('circles')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition mb-2 ${
              activeView === 'circles'
                ? 'bg-teal-50 text-teal-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            My Circles
          </button>
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
            onClick={() => setActiveView('settings')}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
              activeView === 'settings'
                ? 'bg-teal-50 text-teal-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Settings
          </button>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">john@example.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-[1000px] mx-auto">
          {activeView === 'circles' && (
            <MyCirclesTab
              circles={getMockCircles()}
              onCircleCreated={handleCircleCreated}
              onCircleUpdated={handleCircleUpdated}
              pendingInvite={pendingInvite}
              onAcceptInvite={handleAcceptInvite}
              onDeclineInvite={handleDeclineInvite}
            />
          )}

          {activeView === 'availability' && (
            <AvailabilityTab showBanner={showAvailabilityBanner} />
          )}

          {activeView === 'find-availability' && (
            <FindAvailabilityTab circles={getMockCircles()} />
          )}

          {activeView === 'settings' && (
            <SettingsTab />
          )}
        </div>
      </main>

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
