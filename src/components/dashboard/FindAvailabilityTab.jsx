import { useState, useEffect } from 'react'

function FindAvailabilityTab({ circle }) {
  // Set default date range: today to 2 weeks from now
  const getDefaultDateRange = () => {
    const today = new Date()
    const twoWeeksFromNow = new Date()
    twoWeeksFromNow.setDate(today.getDate() + 14)

    return {
      start: today.toISOString().split('T')[0],
      end: twoWeeksFromNow.toISOString().split('T')[0]
    }
  }

  const [selectedMembers, setSelectedMembers] = useState([])
  const [selectedTeams, setSelectedTeams] = useState([]) // Track selected teams separately
  const [dateRange, setDateRange] = useState(getDefaultDateRange())
  const [duration, setDuration] = useState('30')
  const [imAttending, setImAttending] = useState(true) // Toggle for including self
  const [memberSearchQuery, setMemberSearchQuery] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState('members') // 'members' or 'teams'
  const [expandedTeams, setExpandedTeams] = useState(new Set())
  const [dragStartTime, setDragStartTime] = useState(null) // For dragging meeting duration block

  // Mock teams data (same as MembersTab)
  const [teams] = useState([
    { id: 1, name: 'Engineering', members: ['sarah@acme.com', 'mike@acme.com'] },
    { id: 2, name: 'Design', members: ['emily@acme.com'] }
  ])

  // Get members from current circle
  const circleMembers = circle?.invitations?.filter(i => i.status === 'accepted') || []

  // Filter members based on search
  const filteredMembers = circleMembers.filter(member =>
    member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
  )

  // Filter teams based on search
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(memberSearchQuery.toLowerCase())
  )

  // Combined search results (both teams and members)
  const hasSearchQuery = memberSearchQuery.trim().length > 0
  const searchResults = hasSearchQuery ? [...filteredTeams, ...filteredMembers] : []

  const handleMemberToggle = (email) => {
    if (selectedMembers.includes(email)) {
      setSelectedMembers(selectedMembers.filter(e => e !== email))
    } else {
      setSelectedMembers([...selectedMembers, email])
    }
  }

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map(m => m.email))
    }
  }

  const handleTeamToggle = (team) => {
    // Check if all team members are already selected
    const allSelected = team.members.every(email => selectedMembers.includes(email))
    const isTeamSelected = selectedTeams.some(t => t.id === team.id)

    if (allSelected && isTeamSelected) {
      // Deselect team and all its members
      setSelectedTeams(selectedTeams.filter(t => t.id !== team.id))
      setSelectedMembers(selectedMembers.filter(email => !team.members.includes(email)))
    } else {
      // Select team and all its members
      if (!isTeamSelected) {
        setSelectedTeams([...selectedTeams, team])
      }
      const newMembers = team.members.filter(email => !selectedMembers.includes(email))
      setSelectedMembers([...selectedMembers, ...newMembers])
    }
  }

  const handleRemoveTeam = (teamId) => {
    const team = teams.find(t => t.id === teamId)
    if (team) {
      setSelectedTeams(selectedTeams.filter(t => t.id !== teamId))
      setSelectedMembers(selectedMembers.filter(email => !team.members.includes(email)))
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

  // Generate mock availability grid data
  const generateAvailabilityGrid = () => {
    if (!dateRange.start || !dateRange.end) {
      return { timeSlots: [], participants: [], availability: {} }
    }

    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      // Get all participants (me + selected members)
      const participants = []
      if (imAttending) {
        participants.push({ name: 'Me', email: 'me@self', isMe: true })
      }

      // Add selected team members and individual members
      const allSelectedEmails = new Set(selectedMembers)
      selectedTeams.forEach(team => {
        team.members.forEach(email => allSelectedEmails.add(email))
      })

      allSelectedEmails.forEach(email => {
        const member = circleMembers.find(m => m.email === email)
        if (member) {
          participants.push({ name: member.name, email: member.email, isMe: false })
        }
      })

      // Generate continuous time slots (5-minute increments from 9 AM to 5 PM)
      const timeSlots = []
      const start = new Date(dateRange.start)
      const end = new Date(dateRange.end)

      const currentDate = new Date(start)
      while (currentDate <= end) {
        // Skip weekends for realism
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          // Generate slots from 9 AM to 5 PM in 5-minute increments for continuous feel
          for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 5) {
              const slotTime = new Date(currentDate)
              slotTime.setHours(hour, minute, 0, 0)

              timeSlots.push({
                time: slotTime,
                date: currentDate.toISOString().split('T')[0],
                displayTime: slotTime.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                }),
                minutesSinceMidnight: hour * 60 + minute
              })
            }
          }
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }

      // Generate random availability for each participant at each time slot
      const availability = {}
      timeSlots.forEach(slot => {
        const slotKey = slot.time.toISOString()
        availability[slotKey] = {}

        participants.forEach(participant => {
          // 70% chance of being available
          availability[slotKey][participant.email] = Math.random() > 0.3
        })
      })

      setAvailableSlots({ timeSlots, participants, availability })
      setIsSearching(false)
    }, 500)
  }

  // Trigger search whenever parameters change (but only if results are visible)
  useEffect(() => {
    if (showResults) {
      generateAvailabilityGrid()
    }
  }, [selectedMembers, selectedTeams, imAttending, dateRange, duration, showResults])

  const handleFindAvailability = () => {
    setShowResults(true)
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">Find Availability</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Search Parameters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Parameters</h3>

          <div className="space-y-4">
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Duration
            </label>
            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="appearance-none w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
                <option value="180">3 hours</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* I'm Attending Toggle */}
          <div>
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <span className="text-sm font-medium text-gray-700">I'm attending</span>
              <button
                type="button"
                onClick={() => setImAttending(!imAttending)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  imAttending ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    imAttending ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Selected Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participants ({(imAttending ? 1 : 0) + selectedMembers.length})
            </label>
            {!imAttending && selectedMembers.length === 0 && selectedTeams.length === 0 ? (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-500">
                No participants selected
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {/* Me (if attending) */}
                  {imAttending && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 border border-teal-300 rounded text-xs font-medium text-teal-900">
                      Me
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setImAttending(false)
                        }}
                        className="hover:text-teal-900 text-teal-600"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}

                  {/* Selected Teams */}
                  {selectedTeams.map(team => (
                    <span key={`team-${team.id}`} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 border border-purple-300 rounded text-xs">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium text-purple-900">{team.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveTeam(team.id)
                        }}
                        className="hover:text-purple-900 text-purple-600"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}

                  {/* Selected Individual Members (not part of selected teams) */}
                  {selectedMembers.map(email => {
                    // Don't show individual member if they're part of a selected team
                    const isInSelectedTeam = selectedTeams.some(team => team.members.includes(email))
                    if (isInSelectedTeam) return null

                    const member = circleMembers.find(m => m.email === email)
                    if (!member) return null
                    return (
                      <span key={email} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-teal-300 rounded text-xs">
                        {member.name}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMemberToggle(email)
                          }}
                          className="hover:text-teal-900 text-teal-600"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Member Selection */}
        {circle && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Participants</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {selectedMembers.length} selected
              </span>
              {filteredMembers.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className="text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  {selectedMembers.length === filteredMembers.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            value={memberSearchQuery}
            onChange={(e) => setMemberSearchQuery(e.target.value)}
            placeholder="Search participants..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm mb-4"
          />

          {circleMembers.length === 0 ? (
            <p className="text-gray-600 text-sm">No accepted members in selected circles yet.</p>
          ) : hasSearchQuery ? (
            /* Search Results - unified list of teams and members */
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.length === 0 ? (
                <p className="text-gray-600 text-sm">No results found</p>
              ) : (
                searchResults.map((item) => {
                  // Check if item is a team (has 'members' array property)
                  const isTeam = 'members' in item && Array.isArray(item.members)

                  if (isTeam) {
                    const team = item
                    const allSelected = team.members.every(email => selectedMembers.includes(email))
                    const someSelected = team.members.some(email => selectedMembers.includes(email)) && !allSelected

                    return (
                      <div
                        key={`team-${team.id}`}
                        onClick={() => handleTeamToggle(team)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                          allSelected ? 'bg-purple-50 border-2 border-purple-200' : someSelected ? 'bg-purple-50/50 border-2 border-purple-100' : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={() => {}}
                            className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white cursor-pointer checked:bg-purple-600 checked:border-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                          />
                          {allSelected ? (
                            <svg className="absolute w-3 h-3 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : someSelected ? (
                            <svg className="absolute w-3 h-3 text-purple-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
                            </svg>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div className={`font-medium ${allSelected ? 'text-purple-900' : 'text-gray-900'}`}>{team.name}</div>
                          <span className="text-xs text-gray-500">({team.members.length} members)</span>
                        </div>
                      </div>
                    )
                  } else {
                    const member = item
                    const isSelected = selectedMembers.includes(member.email)

                    return (
                      <div
                        key={`member-${member.email}`}
                        onClick={() => handleMemberToggle(member.email)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                          isSelected ? 'bg-teal-50 border-2 border-teal-200' : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white cursor-pointer checked:bg-teal-600 checked:border-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                          />
                          <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${isSelected ? 'text-teal-900' : 'text-gray-900'}`}>{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                        {member.role === 'delegate' && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                            Delegate
                          </span>
                        )}
                      </div>
                    )
                  }
                })
              )}
            </div>
          ) : (
            /* Tabs view when no search query */
            <div>
              {/* Tab buttons */}
              <div className="flex gap-2 mb-4 border-b border-gray-200">
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

              {/* Tab content */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {activeTab === 'members' ? (
                  circleMembers.map((member) => {
                    const isSelected = selectedMembers.includes(member.email)
                    return (
                      <div
                        key={member.email}
                        onClick={() => handleMemberToggle(member.email)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                          isSelected ? 'bg-teal-50 border-2 border-teal-200' : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white cursor-pointer checked:bg-teal-600 checked:border-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                          />
                          <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${isSelected ? 'text-teal-900' : 'text-gray-900'}`}>{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                        {member.role === 'delegate' && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                            Delegate
                          </span>
                        )}
                      </div>
                    )
                  })
                ) : (
                  teams.map((team) => {
                    const allSelected = team.members.every(email => selectedMembers.includes(email))
                    const someSelected = team.members.some(email => selectedMembers.includes(email)) && !allSelected
                    const isExpanded = expandedTeams.has(team.id)
                    const teamMembers = circleMembers.filter(m => team.members.includes(m.email))

                    return (
                      <div key={team.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <div
                          className={`flex items-center gap-3 p-3 transition ${
                            allSelected ? 'bg-purple-50' : someSelected ? 'bg-purple-50/50' : 'bg-white hover:bg-gray-50'
                          }`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleTeamExpanded(team.id)
                            }}
                            className="p-1 hover:bg-gray-200 rounded transition"
                          >
                            <svg className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          <div
                            onClick={() => handleTeamToggle(team)}
                            className="flex items-center gap-3 flex-1 cursor-pointer"
                          >
                            <div className="relative flex items-center justify-center w-5 h-5">
                              <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={() => {}}
                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white cursor-pointer checked:bg-purple-600 checked:border-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
                              />
                              {allSelected ? (
                                <svg className="absolute w-3 h-3 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : someSelected ? (
                                <svg className="absolute w-3 h-3 text-purple-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" />
                                </svg>
                              ) : null}
                            </div>
                            <div className="flex items-center gap-2 flex-1">
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <div className={`font-medium ${allSelected ? 'text-purple-900' : 'text-gray-900'}`}>{team.name}</div>
                              <span className="text-xs text-gray-500">({team.members.length} members)</span>
                            </div>
                          </div>
                        </div>

                        {/* Expanded team members */}
                        {isExpanded && (
                          <div className="border-t border-gray-200 bg-gray-50 p-3">
                            {teamMembers.length === 0 ? (
                              <p className="text-sm text-gray-500">No active members in this team</p>
                            ) : (
                              <div className="space-y-2">
                                {teamMembers.map((member) => (
                                  <div key={member.email} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-xs font-medium">
                                      {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                      <div className="text-xs text-gray-500">{member.email}</div>
                                    </div>
                                    {member.role === 'delegate' && (
                                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                        Delegate
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
        )}
      </div>

      {/* Find Button */}
      <button
        onClick={handleFindAvailability}
        disabled={!circle || (!imAttending && selectedMembers.length === 0)}
        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed mb-6"
      >
        Find Available Times
      </button>

      {/* Results */}
      {showResults && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Availability Grid
          </h3>

          {isSearching ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600">Loading availability...</p>
            </div>
          ) : !availableSlots.timeSlots || availableSlots.timeSlots.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-lg font-medium">No availability data</p>
              <p className="text-sm mt-2">Try adjusting your search parameters</p>
            </div>
          ) : (
            <div>
              {/* Suggested Times */}
              {(() => {
                // Calculate suggested times (slots where everyone or almost everyone is available)
                const suggestedSlots = availableSlots.timeSlots
                  .map(slot => {
                    const slotKey = slot.time.toISOString()
                    const availableCount = availableSlots.participants.filter(
                      p => availableSlots.availability[slotKey]?.[p.email]
                    ).length
                    const totalCount = availableSlots.participants.length
                    const availabilityPercentage = (availableCount / totalCount) * 100

                    return {
                      slot,
                      availableCount,
                      totalCount,
                      availabilityPercentage
                    }
                  })
                  .filter(s => s.availabilityPercentage >= 80) // 80% or more available
                  .sort((a, b) => b.availabilityPercentage - a.availabilityPercentage)
                  .slice(0, 5) // Top 5 suggestions

                return suggestedSlots.length > 0 && (
                  <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-teal-900 mb-3">Suggested Times (Best Availability)</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSlots.map((suggested, idx) => {
                        const dateObj = new Date(suggested.slot.date + 'T12:00:00')
                        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                        const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

                        return (
                          <button
                            key={idx}
                            className="px-3 py-2 bg-white border border-teal-300 rounded-lg hover:bg-teal-100 transition"
                          >
                            <div className="text-xs font-medium text-gray-900">
                              {dayName}, {dateStr}
                            </div>
                            <div className="text-xs text-teal-700 font-semibold">
                              {suggested.slot.displayTime}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {suggested.availableCount}/{suggested.totalCount} available
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}

              {/* Continuous availability spectrum */}
              <div className="relative">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    {/* Calculate total minutes to display */}
                    {(() => {
                      const totalMinutes = availableSlots.timeSlots.length * 5 // 5-minute increments
                      const pixelsPerMinute = 2 // 2 pixels per minute for good density
                      const totalWidth = totalMinutes * pixelsPerMinute

                      return (
                        <>
                          {/* Time ruler with hour markers */}
                          <div className="relative h-16 mb-2">
                            <div className="absolute left-0 w-[140px] h-full bg-white z-20" />
                            <div className="relative" style={{ paddingLeft: '140px', width: totalWidth + 140 }}>
                              {availableSlots.timeSlots
                                .filter((slot) => slot.minutesSinceMidnight % 60 === 0) // Only show hour marks
                                .map((slot, idx) => {
                                  const slotIndex = availableSlots.timeSlots.findIndex(s => s.time.getTime() === slot.time.getTime())
                                  const position = slotIndex * 5 * pixelsPerMinute // Position based on minutes elapsed

                                  const isNewDay = idx === 0 || slot.date !== availableSlots.timeSlots.filter((s) => s.minutesSinceMidnight % 60 === 0)[idx - 1]?.date
                                  const dateObj = new Date(slot.date + 'T12:00:00')
                                  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                                  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

                                  return (
                                    <div key={idx} className="absolute" style={{ left: `${position}px` }}>
                                      {isNewDay && (
                                        <div className="absolute -top-8 left-0 text-sm font-bold text-teal-600 whitespace-nowrap">
                                          {dayName} {dateStr}
                                        </div>
                                      )}
                                      <div className="absolute top-0 left-0 w-px h-4 bg-gray-400" />
                                      <div className="absolute top-6 left-0 text-xs font-medium text-gray-600 whitespace-nowrap transform -translate-x-1/2">
                                        {slot.time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(' ', '')}
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>

                          {/* Draggable meeting duration overlay */}
                          <div className="relative h-12 mb-2 border-y border-gray-300 bg-gray-50">
                            <div className="absolute left-0 w-[140px] h-full bg-white z-20 flex items-center justify-center border-r border-gray-300">
                              <span className="text-xs font-semibold text-teal-700">Meeting Window</span>
                            </div>
                            <div className="relative h-full" style={{ paddingLeft: '140px', width: totalWidth + 140 }}>
                              <div
                                className="absolute top-0 h-full bg-teal-500 opacity-70 border-2 border-teal-700 rounded cursor-move hover:opacity-90 transition flex items-center justify-center shadow-lg"
                                style={{
                                  left: dragStartTime || '0px',
                                  width: `${parseInt(duration) * pixelsPerMinute}px`
                                }}
                                draggable
                                onDragStart={(e) => {
                                  const rect = e.currentTarget.parentElement.getBoundingClientRect()
                                  const x = e.clientX - rect.left - 140
                                  setDragStartTime(`${Math.max(0, x)}px`)
                                }}
                                onDrag={(e) => {
                                  if (e.clientX === 0) return
                                  const rect = e.currentTarget.parentElement.getBoundingClientRect()
                                  const x = e.clientX - rect.left - 140
                                  const maxX = totalWidth - (parseInt(duration) * pixelsPerMinute)
                                  setDragStartTime(`${Math.max(0, Math.min(maxX, x))}px`)
                                }}
                              >
                                <span className="text-sm font-bold text-white drop-shadow">
                                  {duration} min meeting
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Participant rows with continuous availability bars */}
                          <div className="space-y-1">
                            {availableSlots.participants.map((participant) => (
                              <div key={participant.email} className="flex items-center group">
                                {/* Participant name (frozen) */}
                                <div className="sticky left-0 z-20 w-[140px] pr-3 bg-white">
                                  <div className="text-xs font-medium text-gray-900 truncate px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 group-hover:border-teal-300 transition">
                                    {participant.name}
                                    {participant.isMe && (
                                      <span className="ml-1 text-teal-600">(You)</span>
                                    )}
                                  </div>
                                </div>

                                {/* Availability spectrum */}
                                <div className="relative h-10 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg overflow-hidden border border-gray-200" style={{ width: totalWidth }}>
                                  {availableSlots.timeSlots.map((slot, idx) => {
                                    const slotKey = slot.time.toISOString()
                                    const isAvailable = availableSlots.availability[slotKey]?.[participant.email]
                                    const isNewDay = idx > 0 && slot.date !== availableSlots.timeSlots[idx - 1].date
                                    const position = idx * 5 * pixelsPerMinute

                                    return (
                                      <div
                                        key={idx}
                                        className={`absolute top-0 h-full transition-colors ${
                                          isAvailable
                                            ? 'bg-gradient-to-b from-green-400 to-green-500'
                                            : 'bg-gradient-to-b from-red-200 to-red-300'
                                        } ${isNewDay ? 'border-l-2 border-teal-500' : ''}`}
                                        style={{
                                          left: `${position}px`,
                                          width: `${5 * pixelsPerMinute}px`
                                        }}
                                        title={`${slot.displayTime} - ${isAvailable ? 'Available' : 'Unavailable'}`}
                                      />
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FindAvailabilityTab
