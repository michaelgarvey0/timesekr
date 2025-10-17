import { useState } from 'react'
import InviteMembersForm from './InviteMembersForm'

function MembersTab({ circle, onMembersAdded }) {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [expandedTeams, setExpandedTeams] = useState(new Set())
  const [activeTab, setActiveTab] = useState('members') // 'members' or 'teams'
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name') // 'name' or 'role'
  const [filterRole, setFilterRole] = useState('all') // 'all', 'organizer', 'delegate', 'member'
  const [teams, setTeams] = useState([
    { id: 1, name: 'Engineering', members: ['sarah@acme.com', 'mike@acme.com'] },
    { id: 2, name: 'Design', members: ['emily@acme.com'] }
  ])
  const [newTeamName, setNewTeamName] = useState('')
  const [selectedMembersForTeam, setSelectedMembersForTeam] = useState([])

  const members = circle?.invitations?.filter(i => i.status === 'accepted') || []
  const pendingInvites = circle?.invitations?.filter(i => i.status === 'pending') || []
  const isOrganizer = circle?.role === 'organizer' || circle?.role === 'delegate'

  // Filter, search, and sort members
  const getFilteredAndSortedMembers = () => {
    let filtered = members

    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter(m => m.role === filterRole)
    }

    // Search by name or email
    if (searchQuery.trim()) {
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'role') {
        const roleOrder = { organizer: 0, delegate: 1, member: 2 }
        return roleOrder[a.role] - roleOrder[b.role]
      }
      return 0
    })

    return filtered
  }

  const filteredMembers = getFilteredAndSortedMembers()

  const handleInvitesAdded = (invites) => {
    // Generate mock member data
    const mockMembers = invites.map((invite, idx) => ({
      name: invite.email.split('@')[0].charAt(0).toUpperCase() + invite.email.split('@')[0].slice(1),
      email: invite.email,
      status: idx % 3 === 0 ? 'pending' : 'accepted',
      role: invite.role
    }))

    if (onMembersAdded) {
      onMembersAdded(mockMembers)
    }
    setShowInviteForm(false)
  }

  const handleCreateTeam = () => {
    if (newTeamName && selectedMembersForTeam.length > 0) {
      const newTeam = {
        id: Date.now(),
        name: newTeamName,
        members: selectedMembersForTeam
      }
      setTeams([...teams, newTeam])
      setShowTeamModal(false)
      setNewTeamName('')
      setSelectedMembersForTeam([])
    }
  }

  const handleToggleMemberForTeam = (email) => {
    if (selectedMembersForTeam.includes(email)) {
      setSelectedMembersForTeam(selectedMembersForTeam.filter(e => e !== email))
    } else {
      setSelectedMembersForTeam([...selectedMembersForTeam, email])
    }
  }

  const toggleTeamExpanded = (teamId) => {
    const newExpanded = new Set(expandedTeams)
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId)
    } else {
      newExpanded.add(teamId)
    }
    setExpandedTeams(newExpanded)
  }

  if (showInviteForm) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setShowInviteForm(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-3xl font-semibold text-gray-900">Invite Members</h2>
        </div>
        <InviteMembersForm
          circle={circle}
          onSuccess={handleInvitesAdded}
          onCancel={() => setShowInviteForm(false)}
        />
      </div>
    )
  }

  // Empty state when no members
  if (members.length === 0 && pendingInvites.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Members</h2>
        <div className="bg-white rounded-xl shadow-lg p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No members yet</h3>
            <p className="text-gray-600 mb-8">
              Get started by inviting team members to join your circle
            </p>
            {isOrganizer && (
              <button
                onClick={() => setShowInviteForm(true)}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Invite Members
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Members list view
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">Members</h2>
        {isOrganizer && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowTeamModal(true)}
              className="bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition text-sm"
            >
              + Create Team
            </button>
            <button
              onClick={() => setShowInviteForm(true)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
            >
              + Invite Members
            </button>
          </div>
        )}
      </div>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === 'members'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === 'teams'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Teams
        </button>
      </div>

      {/* Search, Sort, and Filter controls (only for members tab) */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex gap-3">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="role">Sort by Role</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="organizer">Organizer</option>
                <option value="delegate">Delegate</option>
                <option value="member">Member</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teams Tab */}
      {activeTab === 'teams' && teams.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="space-y-3">
            {teams.map((team) => {
              const isExpanded = expandedTeams.has(team.id)
              const teamMembers = members.filter(m => team.members.includes(m.email))

              return (
                <div key={team.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleTeamExpanded(team.id)}
                    className="w-full p-3 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{team.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{team.members.length} members</div>
                      </div>
                    </div>
                    {isOrganizer && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: Edit team
                        }}
                        className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="p-3 bg-white border-t border-gray-200">
                      {teamMembers.length > 0 ? (
                        <div className="space-y-2">
                          {teamMembers.map((member) => (
                            <div key={member.email} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                                {member.name.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                <div className="text-xs text-gray-500">{member.email}</div>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                member.role === 'organizer'
                                  ? 'bg-purple-100 text-purple-700'
                                  : member.role === 'delegate'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-2">No active members in this team</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No members found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMembers.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {member.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  member.role === 'organizer'
                    ? 'bg-purple-100 text-purple-700'
                    : member.role === 'delegate'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
              </div>
            ))}
            </div>
          )}
        </div>
      )}

      {/* Pending Invitations */}
      {pendingInvites.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pending Invitations ({pendingInvites.length})
          </h3>
          <div className="space-y-3">
            {pendingInvites.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {member.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    member.role === 'organizer'
                      ? 'bg-purple-100 text-purple-700'
                      : member.role === 'delegate'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Create Team</h3>
              <button
                onClick={() => {
                  setShowTeamModal(false)
                  setNewTeamName('')
                  setSelectedMembersForTeam([])
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
              <input
                type="text"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                placeholder="e.g. Engineering, Design, Marketing"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Members ({selectedMembersForTeam.length})
              </label>
              <div className="max-h-64 overflow-y-auto space-y-2 border-2 border-gray-200 rounded-lg p-3">
                {members.map((member) => (
                  <label key={member.email} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMembersForTeam.includes(member.email)}
                      onChange={() => handleToggleMemberForTeam(member.email)}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowTeamModal(false)
                  setNewTeamName('')
                  setSelectedMembersForTeam([])
                }}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTeam}
                disabled={!newTeamName || selectedMembersForTeam.length === 0}
                className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersTab
