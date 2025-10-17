import { useState } from 'react'
import CreateCircleForm from './CreateCircleForm'
import CircleDetail from './CircleDetail'
import CircleEmptyState from './CircleEmptyState'
import PendingInviteBanner from './PendingInviteBanner'

function MyCirclesTab({ circles, onCircleCreated, onCircleUpdated, pendingInvite, onAcceptInvite, onDeclineInvite }) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedCircle, setSelectedCircle] = useState(null)
  const [showEmptyState, setShowEmptyState] = useState(false)

  const handleCircleCreated = (formData) => {
    // TODO: API call to create circle
    // Use mock data for demo
    const newCircle = {
      id: Date.now(),
      name: 'Acme Corporation',
      description: 'Main company circle',
      members: 0,
      role: 'organizer',
      invitations: []
    }

    // Add to parent state
    onCircleCreated(newCircle)

    setShowCreateForm(false)
    // Show empty state since no members yet
    setShowEmptyState(true)
    setSelectedCircle(newCircle)
  }

  const handleInvitesAdded = (circleId, invites) => {
    // Generate mock member data when invites are sent
    const mockMembers = [
      { name: 'Sarah Johnson', email: 'sarah@company.com', status: 'accepted', role: 'member' },
      { name: 'Mike Chen', email: 'mike@company.com', status: 'accepted', role: 'delegate' },
      { name: 'Emily Rodriguez', email: 'emily@company.com', status: 'pending', role: 'member' },
      { name: 'James Wilson', email: 'james@company.com', status: 'pending', role: 'delegate' },
      { name: 'Lisa Anderson', email: 'lisa@company.com', status: 'declined', role: 'member' },
      { name: 'Amanda Garcia', email: 'amanda@company.com', status: 'accepted', role: 'member' },
      { name: 'Christopher Taylor', email: 'christopher@company.com', status: 'accepted', role: 'member' },
      { name: 'Michelle White', email: 'michelle@company.com', status: 'pending', role: 'member' },
      { name: 'Daniel Harris', email: 'daniel@company.com', status: 'accepted', role: 'delegate' },
      { name: 'Jessica Martin', email: 'jessica@company.com', status: 'accepted', role: 'member' },
      { name: 'Matthew Thompson', email: 'matthew@company.com', status: 'pending', role: 'member' },
      { name: 'Ashley Moore', email: 'ashley@company.com', status: 'accepted', role: 'member' },
      { name: 'Andrew Jackson', email: 'andrew@company.com', status: 'accepted', role: 'delegate' },
      { name: 'Stephanie Clark', email: 'stephanie@company.com', status: 'pending', role: 'member' },
      { name: 'Joshua Lewis', email: 'joshua@company.com', status: 'accepted', role: 'member' },
      { name: 'Rebecca Walker', email: 'rebecca@company.com', status: 'accepted', role: 'member' },
      { name: 'Ryan Hall', email: 'ryan@company.com', status: 'pending', role: 'member' },
      { name: 'Nicole Allen', email: 'nicole@company.com', status: 'accepted', role: 'delegate' },
      { name: 'Kevin Young', email: 'kevin@company.com', status: 'accepted', role: 'member' },
      { name: 'Rachel King', email: 'rachel@company.com', status: 'pending', role: 'member' },
      { name: 'Brian Wright', email: 'brian@company.com', status: 'accepted', role: 'member' },
      { name: 'Laura Lopez', email: 'laura@company.com', status: 'accepted', role: 'member' },
      { name: 'Jason Hill', email: 'jason@company.com', status: 'pending', role: 'delegate' },
      { name: 'Samantha Scott', email: 'samantha@company.com', status: 'accepted', role: 'member' },
      { name: 'Brandon Green', email: 'brandon@company.com', status: 'accepted', role: 'member' },
      { name: 'Megan Adams', email: 'megan@company.com', status: 'pending', role: 'member' },
      { name: 'Tyler Baker', email: 'tyler@company.com', status: 'accepted', role: 'member' },
      { name: 'David Brown', email: 'david@company.com', status: 'accepted', role: 'member' },
      { name: 'Jennifer Lee', email: 'jennifer@company.com', status: 'pending', role: 'delegate' },
      { name: 'Robert Martinez', email: 'robert@company.com', status: 'accepted', role: 'member' }
    ]

    // Create updated circle
    const updatedCircle = {
      ...selectedCircle,
      invitations: mockMembers,
      members: 47
    }

    // Update selected circle
    setSelectedCircle(updatedCircle)
    setShowEmptyState(false)

    // Persist to parent state
    if (onCircleUpdated) {
      onCircleUpdated(updatedCircle)
    }
  }

  if (selectedCircle) {
    // Show empty state if circle has no invitations
    if (showEmptyState || (selectedCircle.invitations && selectedCircle.invitations.length === 0)) {
      return (
        <CircleEmptyState
          circle={selectedCircle}
          onInvitesAdded={(invites, message) => handleInvitesAdded(selectedCircle.id, invites)}
          onBack={() => {
            setSelectedCircle(null)
            setShowEmptyState(false)
          }}
        />
      )
    }

    return (
      <CircleDetail
        circle={selectedCircle}
        onBack={() => {
          setSelectedCircle(null)
          setShowEmptyState(false)
        }}
        onInvitesAdded={(invites, message) => handleInvitesAdded(selectedCircle.id, invites)}
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">My Circles</h2>
        {!showCreateForm && (circles.length > 0 || pendingInvite) && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
          >
            + Create Circle
          </button>
        )}
      </div>

      {!showCreateForm && circles.length === 0 && !pendingInvite && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">You're not part of any circles yet</h3>
            <p className="text-gray-600 mb-8">
              Create your first circle to start scheduling meetings with your team, or wait for an invitation to join an existing circle.
            </p>

            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Circle
            </button>

            <p className="text-sm text-gray-500 mt-6">
              Have an invitation code?{' '}
              <button className="text-teal-600 hover:text-teal-700 font-medium">
                Join a circle
              </button>
            </p>
          </div>
        </div>
      )}

      {!showCreateForm && (circles.length > 0 || pendingInvite) && (
        <div className="grid gap-4">
          {pendingInvite && (
            <PendingInviteBanner
              invite={pendingInvite}
              onAccept={onAcceptInvite}
              onDecline={onDeclineInvite}
            />
          )}

          {circles.map((circle) => (
            <div
              key={circle.id}
              onClick={() => setSelectedCircle(circle)}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-gray-900">{circle.name}</h3>
                    {circle.role && (
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        circle.role === 'organizer'
                          ? 'bg-purple-100 text-purple-700'
                          : circle.role === 'delegate'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {circle.role.charAt(0).toUpperCase() + circle.role.slice(1)}
                      </span>
                    )}
                  </div>
                  {circle.description && (
                    <p className="text-gray-600 text-sm mt-1">{circle.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>{circle.members} members</span>
                    {circle.invitations && (
                      <>
                        <span>•</span>
                        <span>{circle.invitations.filter(i => i.status === 'pending').length} pending invites</span>
                      </>
                    )}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateForm && (
        <CreateCircleForm
          onCancel={() => setShowCreateForm(false)}
          onSuccess={handleCircleCreated}
        />
      )}
    </div>
  )
}

export default MyCirclesTab
