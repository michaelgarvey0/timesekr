import { useState } from 'react'

function CircleManagementTab({
  circle,
  allCircles,
  circleConnections,
  onSendConnectionRequest,
  onAcceptConnectionRequest,
  onDeclineConnectionRequest,
  onRemoveConnection
}) {
  const isOrganizer = circle?.role === 'organizer'
  const [searchCircleQuery, setSearchCircleQuery] = useState('')

  // Get current circle's connection data
  const currentCircleConnections = circleConnections?.[circle?.id] || { connectedCircles: [], pendingRequests: [] }

  // Get connected circles details
  const connectedCircles = currentCircleConnections.connectedCircles
    .map(id => allCircles?.find(c => c.id === id))
    .filter(Boolean)

  // Get pending requests
  const receivedRequests = currentCircleConnections.pendingRequests.filter(r => r.status === 'received')
  const sentRequests = currentCircleConnections.pendingRequests.filter(r => r.status === 'sent')

  // Filter circles available to connect (exclude own circle, already connected, and pending)
  const availableCircles = allCircles?.filter(c => {
    if (c.id === circle?.id) return false // Not own circle
    if (currentCircleConnections.connectedCircles.includes(c.id)) return false // Not already connected
    if (currentCircleConnections.pendingRequests.some(r => r.circleId === c.id)) return false // Not pending
    if (searchCircleQuery && !c.name.toLowerCase().includes(searchCircleQuery.toLowerCase())) return false
    return true
  }) || []

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">Manage Circle</h2>

      {/* Circle Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Circle Information</h3>

        {/* Circle Icon/Logo */}
        <div className="flex items-start gap-6 mb-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">
                {circle?.name ? circle.name.substring(0, 2).toUpperCase() : 'AC'}
              </span>
            </div>
            {isOrganizer && (
              <button className="mt-3 text-xs text-teal-600 hover:text-teal-700 font-medium w-full text-center">
                Change Logo
              </button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Circle Name</label>
              <input
                type="text"
                value={circle?.name || ''}
                disabled={!isOrganizer}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={circle?.description || ''}
                disabled={!isOrganizer}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {isOrganizer && (
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm">
            Save Changes
          </button>
        )}
      </div>

      {/* Organization Calendars */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Calendars</h3>
        <p className="text-sm text-gray-600 mb-4">
          Connect your organization's calendar system to automatically sync availability
        </p>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded shadow flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Google Workspace</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded shadow flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M0 0h11v11H0z"/>
                  <path fill="#81bc06" d="M12 0h11v11H12z"/>
                  <path fill="#05a6f0" d="M0 12h11v11H0z"/>
                  <path fill="#ffba08" d="M12 12h11v11H12z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Microsoft 365</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Connected Circles */}
      {isOrganizer && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Circles</h3>
          <p className="text-sm text-gray-600 mb-4">
            Connect with other circles to search their members when finding availability
          </p>

          {/* Received Connection Requests */}
          {receivedRequests.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Connection Requests</h4>
              <div className="space-y-2">
                {receivedRequests.map((request) => (
                  <div key={request.circleId} className="flex items-center justify-between p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {request.circleName.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{request.circleName}</div>
                        <div className="text-xs text-gray-500">wants to connect</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onAcceptConnectionRequest(circle.id, request.circleId)}
                        className="px-3 py-1.5 bg-teal-600 text-white rounded text-xs font-medium hover:bg-teal-700 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onDeclineConnectionRequest(circle.id, request.circleId)}
                        className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-50 transition"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Currently Connected Circles */}
          {connectedCircles.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Connected ({connectedCircles.length})</h4>
              <div className="space-y-2">
                {connectedCircles.map((connectedCircle) => (
                  <div key={connectedCircle.id} className="flex items-center justify-between p-3 bg-teal-50 border-2 border-teal-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {connectedCircle.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{connectedCircle.name}</div>
                        <div className="text-xs text-gray-500">{connectedCircle.members} members</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveConnection(circle.id, connectedCircle.id)}
                      className="text-red-600 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sent Requests (Pending) */}
          {sentRequests.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Pending Requests</h4>
              <div className="space-y-2">
                {sentRequests.map((request) => (
                  <div key={request.circleId} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {request.circleName.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{request.circleName}</div>
                        <div className="text-xs text-gray-500">Request pending</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onDeclineConnectionRequest(circle.id, request.circleId)}
                      className="text-gray-600 hover:text-gray-700 text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and Connect to New Circles */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Connect to Circle</h4>
            <input
              type="text"
              value={searchCircleQuery}
              onChange={(e) => setSearchCircleQuery(e.target.value)}
              placeholder="Search for circles..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm mb-3"
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableCircles.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  {searchCircleQuery ? 'No circles found' : 'No other circles available'}
                </p>
              ) : (
                availableCircles.map((availableCircle) => (
                  <div key={availableCircle.id} className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {availableCircle.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{availableCircle.name}</div>
                        <div className="text-xs text-gray-500">{availableCircle.members} members</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onSendConnectionRequest(circle.id, availableCircle.id, availableCircle.name)}
                      className="px-3 py-1.5 bg-teal-600 text-white rounded text-xs font-medium hover:bg-teal-700 transition"
                    >
                      Connect
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Billing */}
      {isOrganizer && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
            <div>
              <div className="text-sm font-medium text-gray-900">Current Plan: 1-5 members</div>
              <div className="text-xs text-gray-500 mt-1">$3.00/month</div>
            </div>
            <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
              Change Plan
            </button>
          </div>
          <button className="text-red-600 hover:text-red-700 font-medium text-sm">
            Manage Payment Method
          </button>
        </div>
      )}
    </div>
  )
}

export default CircleManagementTab
