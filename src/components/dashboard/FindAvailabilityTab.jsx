import { useState, useEffect } from 'react'

function FindAvailabilityTab({ circles }) {
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

  // Get available circles where user is organizer or delegate
  const availableCircles = circles.filter(c => c.role === 'organizer' || c.role === 'delegate')

  // Default to first available circle
  const getDefaultCircle = () => {
    return availableCircles.length > 0 ? [availableCircles[0].id.toString()] : []
  }

  const [selectedCircles, setSelectedCircles] = useState(getDefaultCircle())
  const [selectedMembers, setSelectedMembers] = useState([])
  const [dateRange, setDateRange] = useState(getDefaultDateRange())
  const [duration, setDuration] = useState('30')
  const [memberSearchQuery, setMemberSearchQuery] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Get members from all selected circles
  const getAllMembers = () => {
    const allMembers = []
    const seenEmails = new Set()

    selectedCircles.forEach(circleId => {
      const circle = circles.find(c => c.id.toString() === circleId)
      const members = circle?.invitations?.filter(i => i.status === 'accepted') || []

      members.forEach(member => {
        if (!seenEmails.has(member.email)) {
          seenEmails.add(member.email)
          allMembers.push({
            ...member,
            circleName: circle.name
          })
        }
      })
    })

    return allMembers
  }

  const circleMembers = getAllMembers()

  // Filter members based on search
  const filteredMembers = circleMembers.filter(member =>
    member.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
  )

  const handleMemberToggle = (email) => {
    if (selectedMembers.includes(email)) {
      setSelectedMembers(selectedMembers.filter(e => e !== email))
    } else {
      setSelectedMembers([...selectedMembers, email])
    }
  }

  const handleCircleToggle = (circleId) => {
    if (selectedCircles.includes(circleId)) {
      setSelectedCircles(selectedCircles.filter(id => id !== circleId))
    } else {
      setSelectedCircles([...selectedCircles, circleId])
    }
    // Reset selected members when circles change
    setSelectedMembers([])
  }

  const handleRemoveCircle = (circleId) => {
    setSelectedCircles(selectedCircles.filter(id => id !== circleId))
    setSelectedMembers([])
  }

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map(m => m.email))
    }
  }

  // Generate mock available time slots
  const generateAvailableSlots = () => {
    if (!dateRange.start || !dateRange.end || selectedMembers.length === 0) {
      return []
    }

    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      const slots = []
      const start = new Date(dateRange.start)
      const end = new Date(dateRange.end)
      const durationMinutes = parseInt(duration)

      // Generate slots for each day in range
      const currentDate = new Date(start)
      while (currentDate <= end) {
        // Skip weekends for realism
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          // Morning slots (9 AM - 12 PM)
          const morningSlots = [
            { hour: 9, minute: 0 },
            { hour: 10, minute: 0 },
            { hour: 11, minute: 0 }
          ]

          // Afternoon slots (1 PM - 5 PM)
          const afternoonSlots = [
            { hour: 13, minute: 0 },
            { hour: 14, minute: 0 },
            { hour: 15, minute: 0 },
            { hour: 16, minute: 0 }
          ]

          // Randomly select some slots as available (60% chance)
          const allSlots = [...morningSlots, ...afternoonSlots]
          allSlots.forEach(slot => {
            if (Math.random() > 0.4) {
              const slotDate = new Date(currentDate)
              slotDate.setHours(slot.hour, slot.minute, 0, 0)

              const endTime = new Date(slotDate)
              endTime.setMinutes(endTime.getMinutes() + durationMinutes)

              slots.push({
                start: slotDate,
                end: endTime,
                date: currentDate.toISOString().split('T')[0]
              })
            }
          })
        }

        currentDate.setDate(currentDate.getDate() + 1)
      }

      setAvailableSlots(slots)
      setIsSearching(false)
    }, 500)
  }

  // Trigger search whenever parameters change (but only if results are visible)
  useEffect(() => {
    if (showResults) {
      generateAvailableSlots()
    }
  }, [selectedCircles, selectedMembers, dateRange, duration, showResults])

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
          {/* Circle Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Circles
            </label>

            {/* Selected circles as tags */}
            {selectedCircles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedCircles.map(circleId => {
                  const circle = availableCircles.find(c => c.id.toString() === circleId)
                  return (
                    <span key={circleId} className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                      {circle?.name}
                      <button
                        onClick={() => handleRemoveCircle(circleId)}
                        className="hover:text-teal-900"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )
                })}
              </div>
            )}

            {/* Circle dropdown */}
            <div className="relative">
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value && !selectedCircles.includes(e.target.value)) {
                    handleCircleToggle(e.target.value)
                  }
                }}
                className="appearance-none w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
              >
                <option value="">Add a circle...</option>
                {availableCircles
                  .filter(c => !selectedCircles.includes(c.id.toString()))
                  .map((circle) => (
                    <option key={circle.id} value={circle.id}>
                      {circle.name}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

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

          {/* Selected Participants */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participants ({selectedMembers.length})
            </label>
            {selectedMembers.length === 0 ? (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-500">
                No participants selected
              </div>
            ) : (
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map(email => {
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
        {selectedCircles.length > 0 && (
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
          ) : filteredMembers.length === 0 ? (
            <p className="text-gray-600 text-sm">No members match your search.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredMembers.map((member) => {
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
              })}
            </div>
          )}
        </div>
        )}
      </div>

      {/* Find Button */}
      <button
        onClick={handleFindAvailability}
        disabled={selectedCircles.length === 0 || selectedMembers.length === 0}
        className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed mb-6"
      >
        Find Available Times
      </button>

      {/* Results */}
      {showResults && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Times {!isSearching && availableSlots.length > 0 && (
              <span className="text-sm font-normal text-gray-600">({availableSlots.length} slots found)</span>
            )}
          </h3>

          {isSearching ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600">Searching for available times...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-lg font-medium">No available times found</p>
              <p className="text-sm mt-2">Try adjusting your search parameters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Group slots by date */}
              {Object.entries(
                availableSlots.reduce((acc, slot) => {
                  if (!acc[slot.date]) acc[slot.date] = []
                  acc[slot.date].push(slot)
                  return acc
                }, {})
              ).map(([date, daySlots]) => {
                const dateObj = new Date(date + 'T12:00:00')
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' })
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

                return (
                  <div key={date} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-3">
                      {dayName}, {dateStr}
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {daySlots.map((slot, idx) => {
                        const startTime = slot.start.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })
                        const endTime = slot.end.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })

                        return (
                          <button
                            key={idx}
                            className="px-3 py-2 bg-teal-50 border border-teal-200 rounded-lg text-sm font-medium text-teal-700 hover:bg-teal-100 hover:border-teal-300 transition"
                          >
                            {startTime} - {endTime}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FindAvailabilityTab
