import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import FeedbackButton from '../components/FeedbackButton'

function MemberSignup() {
  const { inviteCode } = useParams()
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')

  // Mock org data (would come from API based on inviteCode)
  const orgData = {
    name: 'Acme Corporation',
    invitedBy: 'Alice Johnson',
    invitedEmail: 'bob@example.com' // Email from invitation
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({
      inviteCode,
      user: { name: userName, email: orgData.invitedEmail }
    })

    // Redirect to member dashboard
    navigate('/member-dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6">
      <FeedbackButton />
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-medium">Back to home</span>
      </Link>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-[#212121] text-4xl font-bold mb-2">timesēkr</h1>
          <p className="text-gray-600">
            You've been invited to join {orgData.name} by {orgData.invitedBy}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#212121]">Complete Your Profile</h2>

            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="userEmail"
                value={orgData.invitedEmail}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
              <p className="text-sm text-teal-900 font-semibold mb-2">Your organization calendar is already connected</p>
              <p className="text-sm text-teal-800">You can add your personal calendars and set availability preferences in your dashboard.</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm"
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}

export default MemberSignup
