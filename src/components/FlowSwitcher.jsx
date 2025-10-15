import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function FlowSwitcher({ currentFlow, onFlowChange, circleInviteStates, onInviteStateChange }) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const flows = [
    { id: 'empty', label: 'New User (No Circles)' },
    { id: 'one-circle', label: 'User with 1 Circle' },
    { id: 'multiple-circles', label: 'User with Multiple Circles' },
    { id: 'member-view', label: 'Member View (Coming Soon)', disabled: true }
  ]

  const currentFlowData = flows.find(f => f.id === currentFlow)

  const toggleCircleInvites = (circleId) => {
    onInviteStateChange({
      ...circleInviteStates,
      [circleId]: !circleInviteStates[circleId]
    })
  }

  const getCircleName = (circleId) => {
    const names = {
      1: 'Acme Corporation',
      2: 'Nonprofit Foundation',
      3: 'Consulting Partners LLC'
    }
    return names[circleId]
  }

  const getCirclesForFlow = () => {
    if (currentFlow === 'one-circle') return [1]
    if (currentFlow === 'multiple-circles') return [1, 2, 3]
    return []
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <p className="text-xs font-semibold text-gray-700 uppercase">Demo Flow</p>
          </div>
          <div className="py-2">
            <button
              onClick={() => {
                navigate('/')
                setIsOpen(false)
              }}
              className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition text-gray-700 hover:bg-gray-50 border-b border-gray-200"
            >
              <span>← Back to Landing Page</span>
            </button>
            {flows.map((flow) => (
              <button
                key={flow.id}
                onClick={() => {
                  if (!flow.disabled) {
                    onFlowChange(flow.id)
                    setIsOpen(false)
                  }
                }}
                disabled={flow.disabled}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition ${
                  flow.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : currentFlow === flow.id
                    ? 'bg-teal-50 text-teal-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{flow.label}</span>
                {currentFlow === flow.id && (
                  <svg className="w-4 h-4 ml-auto text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}

            {/* Circle Invite Toggles */}
            {getCirclesForFlow().length > 0 && (
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase mb-2">Circle Invites</p>
                  {getCirclesForFlow().map((circleId) => (
                    <div key={circleId} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-gray-600">{getCircleName(circleId)}</span>
                      <button
                        type="button"
                        onClick={() => toggleCircleInvites(circleId)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          circleInviteStates[circleId] ? 'bg-teal-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          circleInviteStates[circleId] ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white px-4 py-3 rounded-full shadow-lg hover:bg-gray-800 transition flex items-center gap-2 text-sm font-medium"
      >
        <span>Demo</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

export default FlowSwitcher
