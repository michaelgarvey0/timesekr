import { useState, useEffect } from 'react'

function FindAvailabilityTab({ circle, allCircles, circleConnections }) {
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
  const [gridView, setGridView] = useState('grid') // 'grid', 'list', 'compact'
  const [selectedCircleIds, setSelectedCircleIds] = useState([circle?.id].filter(Boolean)) // Circles to search in
  const [showCircleSelector, setShowCircleSelector] = useState(false)

  // Mock teams data (same as MembersTab)
  const [teams] = useState([
    { id: 1, name: 'Engineering', members: ['sarah@acme.com', 'mike@acme.com'] },
    { id: 2, name: 'Design', members: ['emily@acme.com'] }
  ])

  // Get connected circles for current circle
  const currentCircleConnections = circleConnections?.[circle?.id] || { connectedCircles: [], pendingRequests: [] }
  const connectedCircleIds = currentCircleConnections.connectedCircles

  // Get members from all selected circles
  const getAllMembers = () => {
    const membersByCircle = {}

    selectedCircleIds.forEach(circleId => {
      const targetCircle = allCircles?.find(c => c.id === circleId)
      if (targetCircle) {
        const members = targetCircle.invitations?.filter(i => i.status === 'accepted') || []
        membersByCircle[circleId] = {
          circleName: targetCircle.name,
          members: members.map(m => ({ ...m, circleId, circleName: targetCircle.name }))
        }
      }
    })

    return membersByCircle
  }

  const membersByCircle = getAllMembers()
  const allMembers = Object.values(membersByCircle).flatMap(c => c.members)

  // Get members from current circle (for compatibility)
  const circleMembers = circle?.invitations?.filter(i => i.status === 'accepted') || []

  // Filter members based on search (use allMembers for cross-circle search)
  const filteredMembers = allMembers.filter(member =>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="flex items-center gap-2 p-3 border-2 border-gray-300 rounded-lg hover:border-teal-500 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition bg-white">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="flex-1 text-sm text-gray-900 focus:outline-none"
              />
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="flex-1 text-sm text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Meeting Duration
              </label>
              <span className="text-sm font-semibold text-teal-600">
                {parseInt(duration) >= 60
                  ? `${Math.floor(parseInt(duration) / 60)}h ${parseInt(duration) % 60 > 0 ? `${parseInt(duration) % 60}m` : ''}`
                  : `${duration} min`}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="15"
                max="180"
                step="15"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full h-2 bg-gradient-to-r from-teal-200 to-teal-500 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #5eead4 0%, #14b8a6 ${((parseInt(duration) - 15) / 165) * 100}%, #e5e7eb ${((parseInt(duration) - 15) / 165) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                <span>15m</span>
                <span>1h</span>
                <span>2h</span>
                <span>3h</span>
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
                      <span key={email} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-teal-300 rounded text-xs font-medium text-gray-900">
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

          {/* Circle Selector */}
          {connectedCircleIds.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowCircleSelector(!showCircleSelector)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Searching in: {selectedCircleIds.length === 1 ? circle.name : `${selectedCircleIds.length} circles`}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showCircleSelector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCircleSelector && (
                <div className="mt-2 p-3 bg-white border border-gray-300 rounded-lg space-y-2">
                  {/* Own circle */}
                  <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCircleIds.includes(circle.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCircleIds([...selectedCircleIds, circle.id])
                        } else {
                          setSelectedCircleIds(selectedCircleIds.filter(id => id !== circle.id))
                        }
                      }}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{circle.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{circle.name}</span>
                      <span className="text-xs text-teal-600">(Your circle)</span>
                    </div>
                  </label>

                  {/* Connected circles */}
                  {connectedCircleIds.map(connectedId => {
                    const connectedCircle = allCircles?.find(c => c.id === connectedId)
                    if (!connectedCircle) return null
                    return (
                      <label key={connectedId} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCircleIds.includes(connectedId)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCircleIds([...selectedCircleIds, connectedId])
                            } else {
                              setSelectedCircleIds(selectedCircleIds.filter(id => id !== connectedId))
                            }
                          }}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{connectedCircle.name.substring(0, 2).toUpperCase()}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{connectedCircle.name}</span>
                          <span className="text-xs text-gray-500">({connectedCircle.members} members)</span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          )}

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
                          <div className="flex items-center gap-2">
                            <div className={`font-medium ${isSelected ? 'text-teal-900' : 'text-gray-900'}`}>{member.name}</div>
                            {member.circleId !== circle.id && (
                              <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                                {member.circleName}
                              </span>
                            )}
                          </div>
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
                  allMembers.map((member) => {
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
                          <div className="flex items-center gap-2">
                            <div className={`font-medium ${isSelected ? 'text-teal-900' : 'text-gray-900'}`}>{member.name}</div>
                            {member.circleId !== circle.id && (
                              <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                                {member.circleName}
                              </span>
                            )}
                          </div>
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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Availability Grid</h3>

            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setGridView('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  gridView === 'grid' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setGridView('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  gridView === 'list' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setGridView('compact')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  gridView === 'compact' ? 'bg-white text-gray-900 shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Compact
              </button>
            </div>
          </div>

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
              {/* Find continuous time blocks that work for the meeting duration */}
              {(() => {
                // Generate continuous 5-min slots and find blocks where everyone is free
                const slots = []
                for (let hour = 9; hour < 17; hour++) {
                  for (let min = 0; min < 60; min += 5) {
                    const isEveryoneAvail = Math.random() > 0.4
                    const availableParticipants = availableSlots.participants.filter(() => Math.random() > 0.3)
                    slots.push({
                      hour,
                      min,
                      time: `${hour > 12 ? hour - 12 : hour}:${min.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`,
                      everyoneAvailable: isEveryoneAvail,
                      availableParticipants
                    })
                  }
                }

                // Find continuous blocks that fit the meeting duration
                const meetingMinutes = parseInt(duration)
                const slotsNeeded = meetingMinutes / 5
                const validBlocks = []

                for (let i = 0; i <= slots.length - slotsNeeded; i++) {
                  const block = slots.slice(i, i + slotsNeeded)
                  const allAvailable = block.every(s => s.everyoneAvailable)
                  const commonAvailable = block.length > 0 ?
                    availableSlots.participants.filter(p =>
                      block.every(s => s.availableParticipants.some(ap => ap.email === p.email))
                    ) : []

                  if (allAvailable || commonAvailable.length > 0) {
                    const startSlot = block[0]
                    const endSlot = block[block.length - 1]
                    const endMin = endSlot.min + 5
                    const endHour = endMin >= 60 ? endSlot.hour + 1 : endSlot.hour
                    const actualEndMin = endMin >= 60 ? 0 : endMin

                    validBlocks.push({
                      start: startSlot.time,
                      end: `${endHour > 12 ? endHour - 12 : endHour}:${actualEndMin.toString().padStart(2, '0')} ${endHour >= 12 ? 'PM' : 'AM'}`,
                      availableCount: commonAvailable.length,
                      totalCount: availableSlots.participants.length,
                      participants: commonAvailable,
                      allAvailable
                    })
                  }
                }

                // Top suggestions (best availability)
                const topSuggestions = validBlocks
                  .filter(b => b.availableCount === b.totalCount)
                  .slice(0, 5)

                return (
                  <>
                    {/* Best Times - Always show at top */}
                    {topSuggestions.length > 0 && (
                      <div className="mb-6 p-4 bg-teal-50 border-2 border-teal-300 rounded-lg">
                        <h4 className="text-sm font-semibold text-teal-900 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Best Available Times (Everyone Free)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {topSuggestions.map((block, idx) => (
                            <button
                              key={idx}
                              className="px-4 py-3 bg-white border-2 border-teal-400 rounded-lg hover:bg-teal-100 transition shadow-sm"
                            >
                              <div className="text-sm font-semibold text-gray-900">
                                {block.start} - {block.end}
                              </div>
                              <div className="text-xs text-teal-700 font-medium mt-1">
                                All {block.totalCount} participants available
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Grid View */}
                    {gridView === 'grid' && (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b">
                          <h4 className="font-semibold text-gray-900">Available {duration}-minute slots</h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-800">
                              <tr>
                                <th className="p-3 text-left text-sm font-medium text-white border-r border-gray-700">Time Block</th>
                                <th className="p-3 text-left text-sm font-medium text-white border-r border-gray-700">Available</th>
                                <th className="p-3 text-left text-sm font-medium text-white">Participants</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {validBlocks.slice(0, 20).map((block, idx) => (
                                <tr key={idx} className={block.allAvailable ? 'bg-green-50' : ''}>
                                  <td className="p-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                                    {block.start} - {block.end}
                                  </td>
                                  <td className="p-3 border-r border-gray-200">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      block.allAvailable ? 'bg-green-100 text-green-800' :
                                      block.availableCount > block.totalCount / 2 ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {block.availableCount}/{block.totalCount}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <div className="flex flex-wrap gap-1">
                                      {block.participants.map(p => (
                                        <span key={p.email} className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded text-xs">
                                          {p.name}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* List View */}
                    {gridView === 'list' && (
                      <div className="space-y-3">
                        {validBlocks.slice(0, 20).map((block, idx) => (
                          <button
                            key={idx}
                            className={`w-full text-left border-2 rounded-lg p-4 transition hover:border-teal-400 ${
                              block.allAvailable ? 'border-green-300 bg-green-50' : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {block.start} - {block.end}
                              </h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                block.allAvailable ? 'bg-green-100 text-green-800' :
                                block.availableCount > block.totalCount / 2 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {block.availableCount}/{block.totalCount} available
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {block.participants.map(p => (
                                <span key={p.email} className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs font-medium">
                                  {p.name}
                                </span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Compact View */}
                    {gridView === 'compact' && (
                      <div className="grid grid-cols-2 gap-3">
                        {validBlocks.filter(b => b.allAvailable).slice(0, 12).map((block, idx) => (
                          <button
                            key={idx}
                            className="p-4 border-2 border-green-300 bg-green-50 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition"
                          >
                            <div className="text-sm font-semibold text-gray-900">
                              {block.start} - {block.end}
                            </div>
                            <div className="text-xs text-green-700 font-medium mt-1">
                              All {block.totalCount} available
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FindAvailabilityTab
