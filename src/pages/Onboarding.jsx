import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateCircleForm from '../components/dashboard/CreateCircleForm'

function Onboarding() {
  const navigate = useNavigate()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinCode, setJoinCode] = useState('')

  const handleCircleCreated = (formData) => {
    // TODO: API call to create circle
    // Store the created circle data in localStorage for now
    const newCircle = {
      id: Date.now(),
      name: formData.circleName || 'New Circle',
      description: formData.circleDescription || '',
      members: 0,
      role: 'organizer',
      invitations: []
    }

    // Store in localStorage
    const existingCircles = JSON.parse(localStorage.getItem('userCreatedCircles') || '[]')
    localStorage.setItem('userCreatedCircles', JSON.stringify([...existingCircles, newCircle]))

    // Navigate to dashboard with the new circle
    navigate('/dashboard?flow=created-circle')
  }

  const handleJoinWithCode = (e) => {
    e.preventDefault()
    // TODO: API call to join circle with code
    navigate('/dashboard?flow=one-circle')
  }

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 p-8">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Create Your First Circle</h1>
            <p className="text-gray-600 mt-2">Set up billing and create your circle to get started</p>
          </div>
          <CreateCircleForm
            onCancel={() => setShowCreateForm(false)}
            onSuccess={handleCircleCreated}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3">Welcome to timesēkr</h1>
          <p className="text-lg text-gray-600">
            To get started, you'll need to create a circle or join an existing one
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Create Circle */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition text-left group"
          >
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create a Circle</h3>
            <p className="text-gray-600 text-sm">
              Start your own circle and invite team members to coordinate meetings
            </p>
          </button>

          {/* Join with Code */}
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition text-left group"
          >
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Join with Code</h3>
            <p className="text-gray-600 text-sm">
              Have an invite code? Enter it here to join an existing circle
            </p>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            If you received an email invitation, check your inbox and click the link there
          </p>
        </div>
      </div>

      {/* Join with Code Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Join with Invite Code</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Enter the invite code you received to join an existing circle
            </p>
            <form onSubmit={handleJoinWithCode}>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter invite code"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none mb-4"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition"
                >
                  Join Circle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Onboarding
