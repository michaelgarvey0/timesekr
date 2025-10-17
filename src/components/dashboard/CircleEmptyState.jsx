import { useState } from 'react'
import InviteMembersForm from './InviteMembersForm'

function CircleEmptyState({ circle, onInvitesAdded, onBack }) {
  const [activeTab, setActiveTab] = useState('members')
  const [showInviteForm, setShowInviteForm] = useState(false)

  const handleInviteSuccess = (invites, message) => {
    setShowInviteForm(false)
    if (onInvitesAdded) {
      onInvitesAdded(invites, message)
    }
  }

  const handleConnectCalendar = (provider) => {
    // TODO: Connect calendar flow
    alert(`Connecting ${provider} calendar coming soon!`)
  }

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

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">{circle.name}</h2>
        {circle.description && (
          <p className="text-gray-600 mt-1">{circle.description}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-3 border-b-2 font-medium text-sm transition ${
              activeTab === 'members'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 border-b-2 font-medium text-sm transition ${
              activeTab === 'settings'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div>
          {showInviteForm ? (
            <InviteMembersForm
              circle={circle}
              onCancel={() => setShowInviteForm(false)}
              onSuccess={handleInviteSuccess}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No members yet</h3>
                <p className="text-gray-600 mb-8">
                  Start by inviting members to join your circle.
                </p>

                <button
                  onClick={() => setShowInviteForm(true)}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Invite Members
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Circle Settings</h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Organization Calendar</h4>
              <p className="text-sm text-gray-600 mb-4">
                Connect your organization's calendar to sync availability across your team.
              </p>

              <div className="grid gap-3 max-w-md">
                <button
                  onClick={() => handleConnectCalendar('Google Workspace')}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Google Workspace</div>
                    <div className="text-xs text-gray-500">Connect Google Calendar</div>
                  </div>
                </button>

                <button
                  onClick={() => handleConnectCalendar('Microsoft 365')}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#f25022" d="M0 0h11.5v11.5H0z"/>
                    <path fill="#00a4ef" d="M12.5 0H24v11.5H12.5z"/>
                    <path fill="#7fba00" d="M0 12.5h11.5V24H0z"/>
                    <path fill="#ffb900" d="M12.5 12.5H24V24H12.5z"/>
                  </svg>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Microsoft 365</div>
                    <div className="text-xs text-gray-500">Connect Exchange Calendar</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CircleEmptyState
