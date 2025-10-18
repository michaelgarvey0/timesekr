import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateCircleForm from '../components/dashboard/CreateCircleForm'

function Onboarding() {
  const navigate = useNavigate()
  const [showCreateForm, setShowCreateForm] = useState(false)

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
            Create your first circle to get started
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Create Circle */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition text-left group"
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
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Received an email invitation? Click the link in your email to join an existing circle
          </p>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
