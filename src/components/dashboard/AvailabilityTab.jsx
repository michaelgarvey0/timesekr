import { useState } from 'react'

function AvailabilityTab({ showBanner }) {
  const [connectedCalendars, setConnectedCalendars] = useState([])
  const [activeTab, setActiveTab] = useState('calendar') // 'calendar' or 'connections'

  const handleConnectCalendar = (provider) => {
    // TODO: OAuth flow
    console.log('Connecting to', provider)
    // Mock: add to connected calendars
    setConnectedCalendars([...connectedCalendars, { provider, email: 'user@example.com' }])
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">My Availability</h2>

      {showBanner && (
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Invitation Accepted!</h3>
              <p className="text-sm text-gray-700">
                Connect your personal calendar to share your availability with your circle
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab buttons */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === 'calendar'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Calendar
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === 'connections'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Connections
        </button>
      </div>

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="bg-white rounded-xl shadow-lg p-6 relative">
          {connectedCalendars.length === 0 ? (
            /* Overlay when no calendars connected */
            <div className="flex items-center justify-center py-24">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Calendars Connected</h3>
                <p className="text-gray-600 mb-6">
                  Connect your calendar to view and manage your availability
                </p>
                <button
                  onClick={() => setActiveTab('connections')}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition"
                >
                  Connect Calendar
                </button>
              </div>
            </div>
          ) : (
            /* Calendar view */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Week of Oct 21 - Oct 27, 2024</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    ← Previous
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Today
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Next →
                  </button>
                </div>
              </div>

              {/* Weekly calendar grid */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Header with days */}
                <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
                  <div className="p-3 text-xs font-semibold text-gray-600 border-r border-gray-200">Time</div>
                  {['Mon 21', 'Tue 22', 'Wed 23', 'Thu 24', 'Fri 25', 'Sat 26', 'Sun 27'].map((day) => (
                    <div key={day} className="p-3 text-xs font-semibold text-gray-900 text-center border-r border-gray-200 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                <div className="relative">
                  {[
                    '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'
                  ].map((time, timeIdx) => (
                    <div key={time} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
                      <div className="p-3 text-xs text-gray-600 border-r border-gray-200 bg-gray-50">
                        {time}
                      </div>
                      {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                        // Mock some events
                        const hasEvent = (timeIdx === 2 && dayIdx === 1) ||
                                        (timeIdx === 4 && dayIdx === 3) ||
                                        (timeIdx === 6 && dayIdx === 2) ||
                                        (timeIdx === 3 && dayIdx === 4)

                        return (
                          <div
                            key={dayIdx}
                            className={`relative min-h-[60px] p-2 border-r border-gray-200 last:border-r-0 hover:bg-teal-50 transition ${
                              hasEvent ? 'bg-gradient-to-br from-teal-100 to-teal-50' : ''
                            }`}
                          >
                            {hasEvent && (
                              <div className="absolute inset-2 bg-teal-500 rounded p-2 text-white text-xs">
                                <div className="font-semibold">Team Meeting</div>
                                <div className="text-teal-100">{time} - {parseInt(time) + 1} {time.includes('AM') ? 'AM' : 'PM'}</div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-teal-500 rounded"></div>
                  <span>Busy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                  <span>Available</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Connections Tab */}
      {activeTab === 'connections' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Connect Calendars</h3>

        {connectedCalendars.length > 0 && (
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            {connectedCalendars.map((calendar, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded shadow flex items-center justify-center">
                    {calendar.provider === 'google' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{calendar.provider === 'google' ? 'Google Calendar' : calendar.provider}</div>
                    <div className="text-xs text-gray-500">{calendar.email}</div>
                  </div>
                </div>
                <button className="text-red-600 text-sm font-medium hover:text-red-700">
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          <button
            onClick={() => handleConnectCalendar('google')}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition"
          >
            <div className="w-12 h-12 bg-white rounded shadow flex items-center justify-center mb-3">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-900">Google</div>
          </button>

          <button
            onClick={() => handleConnectCalendar('microsoft')}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition"
          >
            <div className="w-12 h-12 bg-white rounded shadow flex items-center justify-center mb-3">
              <svg className="w-7 h-7" viewBox="0 0 23 23">
                <path fill="#f35325" d="M0 0h11v11H0z"/>
                <path fill="#81bc06" d="M12 0h11v11H12z"/>
                <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                <path fill="#ffba08" d="M12 12h11v11H12z"/>
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-900">Outlook</div>
          </button>

          <button
            onClick={() => handleConnectCalendar('apple')}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition"
          >
            <div className="w-12 h-12 bg-white rounded shadow flex items-center justify-center mb-3">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-900">Apple</div>
          </button>

          <button
            onClick={() => handleConnectCalendar('yahoo')}
            className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition"
          >
            <div className="w-12 h-12 bg-white rounded shadow flex items-center justify-center mb-3">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#6001D2" d="M13.007 3.75L8.745 12l-2.906 5.25H2.25L7.753 8.5 3 0h3.656l4.351 8.25zm.75 8.25l4.262 8.25h-3.588l-4.262-8.25 4.262-8.25H18.019z"/>
                <path fill="#5F01D1" d="M22.5 3.75h-3.656l-4.262 8.25 2.906 5.25H21.75z"/>
              </svg>
            </div>
            <div className="text-sm font-medium text-gray-900">Yahoo</div>
          </button>
        </div>
        </div>
      )}
    </div>
  )
}

export default AvailabilityTab
