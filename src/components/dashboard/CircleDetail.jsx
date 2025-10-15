import { useState } from 'react'
import InviteMembersForm from './InviteMembersForm'

function CircleDetail({ circle, onBack, onInvitesAdded }) {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRole, setFilterRole] = useState('all')
  const [sortBy, setSortBy] = useState('name-asc')

  // Mock invitation status data
  const [invitations] = useState(circle.invitations || [])

  const handleInviteSuccess = (invites, message) => {
    // TODO: API call to send invitations
    console.log('Sending invitations:', invites, message)
    setShowInviteForm(false)
    if (onInvitesAdded) {
      onInvitesAdded(invites, message)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'declined': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRoleColor = (role) => {
    return role === 'delegate' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'declined':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      default:
        return null
    }
  }

  const acceptedCount = invitations.filter(i => i.status === 'accepted').length
  const pendingCount = invitations.filter(i => i.status === 'pending').length

  // Filter and sort invitations
  const getFilteredAndSortedInvitations = () => {
    let filtered = invitations.filter(invitation => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        invitation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitation.email.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus = filterStatus === 'all' || invitation.status === filterStatus

      // Role filter
      const matchesRole = filterRole === 'all' || invitation.role === filterRole

      return matchesSearch && matchesStatus && matchesRole
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'email-asc':
          return a.email.localeCompare(b.email)
        case 'email-desc':
          return b.email.localeCompare(a.email)
        case 'status':
          const statusOrder = { accepted: 0, pending: 1, declined: 2 }
          return statusOrder[a.status] - statusOrder[b.status]
        case 'role':
          return a.role.localeCompare(b.role)
        default:
          return 0
      }
    })

    return filtered
  }

  const filteredInvitations = getFilteredAndSortedInvitations()

  return (
    <div>
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-gray-900 mb-6 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Circles
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">{circle.name}</h2>
          {circle.description && (
            <p className="text-gray-600 mt-1">{circle.description}</p>
          )}
        </div>
        {!showInviteForm && (circle.role === 'organizer' || circle.role === 'delegate') && (
          <button
            onClick={() => setShowInviteForm(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
          >
            + Invite Members
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-semibold text-gray-900">{invitations.length}</div>
          <div className="text-sm text-gray-600">Total Invited</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-semibold text-green-700">{acceptedCount}</div>
          <div className="text-sm text-gray-600">Accepted</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-semibold text-yellow-700">{pendingCount}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <div className="mb-8">
          <InviteMembersForm
            circle={circle}
            onCancel={() => setShowInviteForm(false)}
            onSuccess={handleInviteSuccess}
          />
        </div>
      )}

      {/* Member List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Members</h3>

          {/* Search and Filters */}
          <div className="grid grid-cols-4 gap-3">
            {/* Search */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            />

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="accepted">Accepted</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Role Filter */}
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="appearance-none w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="member">Member</option>
                <option value="delegate">Delegate</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-3 py-1.5 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="email-asc">Email (A-Z)</option>
                <option value="email-desc">Email (Z-A)</option>
                <option value="status">Status</option>
                <option value="role">Role</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-500 ml-auto">
              Showing {filteredInvitations.length} of {invitations.length} members
            </span>
          </div>
        </div>

        {invitations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No members invited yet.
          </div>
        ) : filteredInvitations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No members match your search criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredInvitations.map((invitation, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                    {invitation.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{invitation.name}</span>
                      {invitation.role && (
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRoleColor(invitation.role)}`}>
                          {invitation.role === 'delegate' ? 'Delegate' : 'Member'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{invitation.email}</div>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(invitation.status)}`}>
                  {getStatusIcon(invitation.status)}
                  <span className="capitalize">{invitation.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CircleDetail
