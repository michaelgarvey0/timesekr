import { useState, useRef } from 'react'

function FindAvailability() {
  const [selectedParticipants, setSelectedParticipants] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState({}) // Track which groups are expanded
  const timelineScrollRef = useRef(null)

  const toggleGroupExpansion = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  // Mock data
  const allPeople = [
    { id: 1, name: 'Alice Johnson', type: 'user' },
    { id: 2, name: 'Bob Smith', type: 'user' },
    { id: 3, name: 'Charlie Brown', type: 'user' },
    { id: 4, name: 'Diana Prince', type: 'user' },
  ]

  const allGroups = [
    {
      id: 'g1',
      name: 'Engineering',
      type: 'group',
      members: 12,
      membersList: [
        { id: 'g1-1', name: 'Alice Johnson', type: 'user' },
        { id: 'g1-2', name: 'Bob Smith', type: 'user' },
        { id: 'g1-3', name: 'Charlie Brown', type: 'user' },
        { id: 'g1-4', name: 'David Chen', type: 'user' },
        { id: 'g1-5', name: 'Emily Davis', type: 'user' },
        { id: 'g1-6', name: 'Frank Miller', type: 'user' },
        { id: 'g1-7', name: 'Grace Lee', type: 'user' },
        { id: 'g1-8', name: 'Henry Ford', type: 'user' },
        { id: 'g1-9', name: 'Iris West', type: 'user' },
        { id: 'g1-10', name: 'Jack Ryan', type: 'user' },
        { id: 'g1-11', name: 'Karen Page', type: 'user' },
        { id: 'g1-12', name: 'Leo Fitz', type: 'user' },
      ]
    },
    {
      id: 'g2',
      name: 'Design',
      type: 'group',
      members: 5,
      membersList: [
        { id: 'g2-1', name: 'Diana Prince', type: 'user' },
        { id: 'g2-2', name: 'Ethan Hunt', type: 'user' },
        { id: 'g2-3', name: 'Maya Lopez', type: 'user' },
        { id: 'g2-4', name: 'Nathan Drake', type: 'user' },
        { id: 'g2-5', name: 'Olivia Pope', type: 'user' },
      ]
    },
    {
      id: 'g3',
      name: 'Product',
      type: 'group',
      members: 8,
      membersList: [
        { id: 'g3-1', name: 'Fiona Green', type: 'user' },
        { id: 'g3-2', name: 'George Lucas', type: 'user' },
        { id: 'g3-3', name: 'Hannah White', type: 'user' },
        { id: 'g3-4', name: 'Ian Malcolm', type: 'user' },
        { id: 'g3-5', name: 'Jessica Jones', type: 'user' },
        { id: 'g3-6', name: 'Kevin Flynn', type: 'user' },
        { id: 'g3-7', name: 'Laura Kinney', type: 'user' },
        { id: 'g3-8', name: 'Mike Ross', type: 'user' },
      ]
    },
  ]

  const allOptions = [...allPeople, ...allGroups]
  const filteredOptions = searchQuery
    ? allOptions.filter(opt => opt.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const addParticipant = (participant) => {
    if (!selectedParticipants.find(p => p.id === participant.id)) {
      setSelectedParticipants([...selectedParticipants, participant])
      setSearchQuery('')
    }
  }

  const removeParticipant = (id) => {
    setSelectedParticipants(selectedParticipants.filter(p => p.id !== id))
  }

  // Mock timeline data for each participant (half-hour slots)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8
    const minutes = i % 2 === 0 ? '00' : '30'
    return { hour, minutes, label: `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}` }
  }) // 8 AM to 7:30 PM in 30-min increments

  // Expand participants to include group members (for display only)
  const expandedParticipantsForDisplay = selectedParticipants.flatMap(participant => {
    if (participant.type === 'group') {
      if (expandedGroups[participant.id]) {
        // When expanded, show members only (not the group row)
        return participant.membersList
      }
      // When collapsed, show group only
      return [participant]
    }
    return [participant]
  })

  const mockTimelineData = expandedParticipantsForDisplay.map(participant => ({
    ...participant,
    availability: timeSlots.map(() => ({
      available: Math.random() > 0.3 // 70% chance of being available
    }))
  }))

  // Calculate total person count (groups count as their member count)
  const getTotalPersonCount = () => {
    return selectedParticipants.reduce((total, participant) => {
      if (participant.type === 'group') {
        return total + participant.members
      }
      return total + 1
    }, 0)
  }

  // Calculate available person count for a given time slot
  const getAvailablePersonCount = (slotIndex) => {
    return selectedParticipants.reduce((count, participant) => {
      if (participant.type === 'group') {
        // For groups, count based on member availability
        const groupData = mockTimelineData.find(d => d.id === participant.id)
        if (groupData && groupData.availability[slotIndex].available) {
          // Simulate: if group shows available, assume 70% of members are available
          return count + Math.floor(participant.members * 0.7)
        }
        return count
      } else {
        // For individuals
        const userData = mockTimelineData.find(d => d.id === participant.id)
        if (userData && userData.availability[slotIndex].available) {
          return count + 1
        }
        return count
      }
    }, 0)
  }

  // Helper to find suggested times for Timeline view
  const getSuggestedTimeSlots = () => {
    if (selectedParticipants.length === 0) return []

    const suggestions = []
    const dates = ['Mon, Jan 15', 'Tue, Jan 16', 'Wed, Jan 17'] // Mock dates for prototype
    const totalPersons = getTotalPersonCount()

    timeSlots.forEach((slot, idx) => {
      const availableCount = getAvailablePersonCount(idx)
      if (availableCount === totalPersons) {
        const dateIndex = Math.floor(idx / 8) % dates.length // Cycle through dates
        suggestions.push({
          slot,
          index: idx,
          time: slot.label,
          date: dates[dateIndex]
        })
      }
    })

    return suggestions.slice(0, 5) // Return first 5 suggested times
  }

  const scrollToTimeSlot = (index) => {
    if (timelineScrollRef.current) {
      const slotWidth = 96 // w-24 = 96px
      const scrollPosition = (index * slotWidth) - 200 // Offset to center better
      timelineScrollRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-4">Find Available Times</h3>
        <p className="text-sm text-gray-600 mb-6">Add participants to see available times automatically</p>

        {/* Participant Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Participants
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search members or groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
            {searchQuery && filteredOptions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => addParticipant(option)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900">{option.name}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {option.type === 'group' ? `Group (${option.members})` : 'User'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Participants */}
          {selectedParticipants.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedParticipants.map(participant => (
                <div key={participant.id} className="flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full">
                  <span className="text-sm font-medium">{participant.name}</span>
                  {participant.type === 'group' && (
                    <span className="text-xs text-teal-600">({participant.members})</span>
                  )}
                  <button
                    onClick={() => removeParticipant(participant.id)}
                    className="text-teal-700 hover:text-teal-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Duration
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition bg-white appearance-none cursor-pointer">
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>1.5 hours</option>
            <option>2 hours</option>
          </select>
        </div>
      </div>

      {/* Results - Timeline View */}
      {selectedParticipants.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-[#212121]">Available Time Slots</h4>
          </div>

          {/* Timeline View */}
          <div className="relative">
              {/* Suggested Times - Compact Shortcuts */}
              {getSuggestedTimeSlots().length > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Suggested Times</p>
                  <div className="flex flex-wrap gap-2">
                    {getSuggestedTimeSlots().map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToTimeSlot(suggestion.index)}
                        className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium hover:bg-teal-100 transition border border-teal-200 flex flex-col items-start"
                      >
                        <span className="text-xs text-teal-600 font-normal">{suggestion.date}</span>
                        <span>{suggestion.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={timelineScrollRef} className="overflow-x-auto">
                <div className="min-w-max">
                  {/* Header with time slots */}
                  <div className="flex border-b border-gray-200 mb-2">
                    <div className="w-56 flex-shrink-0 py-3 px-4 font-semibold text-gray-700 text-sm bg-white sticky left-0 z-10 border-r border-gray-200">
                      Time
                    </div>
                    {timeSlots.map((slot, idx) => (
                      <div key={idx} className="w-24 flex-shrink-0 py-3 px-2 text-center text-xs text-gray-500 border-l border-gray-100">
                        {slot.label}
                      </div>
                    ))}
                  </div>

                  {/* Summary row - ALL AVAILABLE AT TOP */}
                  <div className="flex border-b-2 border-gray-300 bg-gray-50 mb-2">
                    <div className="w-56 flex-shrink-0 py-3 px-4 font-semibold text-gray-700 text-sm bg-gray-50 sticky left-0 z-10 border-r border-gray-200">
                      All Available
                    </div>
                    {timeSlots.map((slot, idx) => {
                      const availableCount = getAvailablePersonCount(idx)
                      const totalCount = getTotalPersonCount()
                      const allAvailable = availableCount === totalCount
                      const availabilityRatio = totalCount > 0 ? availableCount / totalCount : 0

                      // Calculate teal intensity based on availability ratio
                      let bgColor = 'bg-white'
                      if (allAvailable) {
                        bgColor = 'bg-teal-600' // Rich button teal for 100%
                      } else if (availabilityRatio >= 0.75) {
                        bgColor = 'bg-teal-200'
                      } else if (availabilityRatio >= 0.5) {
                        bgColor = 'bg-teal-150'
                      } else if (availabilityRatio >= 0.25) {
                        bgColor = 'bg-teal-100'
                      } else if (availabilityRatio > 0) {
                        bgColor = 'bg-teal-50'
                      }

                      return (
                        <div
                          key={idx}
                          className={`w-24 flex-shrink-0 py-3 px-2 border-l border-gray-200 ${bgColor} ${
                            allAvailable ? 'cursor-pointer hover:bg-teal-700' : ''
                          }`}
                        >
                          <div className="text-center">
                            {allAvailable ? (
                              <span className="text-xs font-semibold text-white">✓</span>
                            ) : (
                              <span className="text-xs text-gray-600">
                                {availableCount}/{totalCount}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Participant rows */}
                  {selectedParticipants.map((participant) => {
                    const isGroup = participant.type === 'group'
                    const isExpanded = expandedGroups[participant.id]

                    if (isGroup && isExpanded) {
                      // Show group members
                      const groupData = mockTimelineData.find(d => d.id === participant.id)
                      return (
                        <div key={participant.id}>
                          {/* Group header row with rollup availability */}
                          <div className="flex border-b border-gray-200 bg-gray-50">
                            <div className="w-56 flex-shrink-0 py-3 flex items-center gap-2 bg-gray-50 sticky left-0 z-10 border-r border-gray-200 pl-4">
                              <button
                                onClick={() => toggleGroupExpansion(participant.id)}
                                className="text-gray-500 hover:text-gray-700 flex-shrink-0 w-4"
                              >
                                <svg className="w-4 h-4 transform transition rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 bg-purple-100 text-purple-700">
                                {participant.name.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-gray-900 truncate">
                                {participant.name}
                                <span className="text-xs text-gray-500 ml-1">({participant.members})</span>
                              </span>
                            </div>
                            {/* Rollup availability for group */}
                            {timeSlots.map((_, slotIdx) => {
                              // Calculate how many members are available at this slot
                              const availableMembers = participant.membersList.filter(member => {
                                const memberData = mockTimelineData.find(d => d.id === member.id)
                                return memberData?.availability[slotIdx]?.available
                              }).length
                              const totalMembers = participant.members
                              const availabilityRatio = availableMembers / totalMembers
                              const allAvailable = availableMembers === totalMembers

                              // Calculate teal intensity based on availability ratio
                              let bgColor = 'bg-white'
                              if (allAvailable) {
                                bgColor = 'bg-teal-500'
                              } else if (availabilityRatio >= 0.75) {
                                bgColor = 'bg-teal-200'
                              } else if (availabilityRatio >= 0.5) {
                                bgColor = 'bg-teal-150'
                              } else if (availabilityRatio >= 0.25) {
                                bgColor = 'bg-teal-100'
                              } else if (availabilityRatio > 0) {
                                bgColor = 'bg-teal-50'
                              }

                              return (
                                <div key={slotIdx} className={`w-24 flex-shrink-0 py-3 px-2 border-l border-gray-100 ${bgColor}`}>
                                  <div className="text-center">
                                    {allAvailable ? (
                                      <span className="text-xs font-semibold text-white">✓</span>
                                    ) : (
                                      <span className="text-xs text-gray-600">
                                        {availableMembers}/{totalMembers}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          {/* Member rows */}
                          {participant.membersList.map((member) => {
                            const memberData = mockTimelineData.find(d => d.id === member.id)
                            return (
                              <div key={member.id} className="flex border-b border-gray-100 hover:bg-gray-50">
                                <div className="w-56 flex-shrink-0 py-3 flex items-center gap-2 bg-white sticky left-0 z-10 border-r border-gray-200 pl-12">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 bg-teal-100 text-teal-700">
                                    {member.name.charAt(0)}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 truncate">
                                    {member.name}
                                  </span>
                                </div>
                                {memberData?.availability.map((slot, idx) => (
                                  <div
                                    key={idx}
                                    className="w-24 flex-shrink-0 py-3 px-2 border-l border-gray-100"
                                    title={slot.available ? 'Available' : 'Busy'}
                                  >
                                    <div className={`h-8 rounded ${
                                      slot.available ? 'bg-teal-200' : 'bg-red-200'
                                    }`} />
                                  </div>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      )
                    }

                    // Show collapsed group or individual user
                    const displayData = mockTimelineData.find(d => d.id === participant.id)
                    return (
                      <div key={participant.id} className="flex border-b border-gray-100 hover:bg-gray-50">
                        <div className="w-56 flex-shrink-0 py-3 flex items-center gap-2 bg-white sticky left-0 z-10 border-r border-gray-200 pl-4">
                          {isGroup && (
                            <button
                              onClick={() => toggleGroupExpansion(participant.id)}
                              className="text-gray-500 hover:text-gray-700 flex-shrink-0 w-4"
                            >
                              <svg className="w-4 h-4 transform transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                          {!isGroup && <div className="w-4 flex-shrink-0"></div>}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                            isGroup ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
                          }`}>
                            {participant.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {participant.name}
                            {isGroup && <span className="text-xs text-gray-500 ml-1">({participant.members})</span>}
                          </span>
                        </div>
                        {displayData?.availability.map((slot, idx) => (
                          <div
                            key={idx}
                            className="w-24 flex-shrink-0 py-3 px-2 border-l border-gray-100"
                            title={slot.available ? 'Available' : 'Busy'}
                          >
                            <div className={`h-8 rounded ${
                              slot.available ? 'bg-teal-200' : 'bg-red-200'
                            }`} />
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h4 className="font-semibold text-[#212121] mb-2">Available Time Slots</h4>
          <p className="text-sm text-gray-500">Add participants to see available times</p>
        </div>
      )}
    </div>
  )
}

export default FindAvailability
