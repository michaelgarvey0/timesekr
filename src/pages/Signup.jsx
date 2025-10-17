import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get('invite')

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  // If coming from invite, show context
  const [inviteContext, setInviteContext] = useState(null)

  useEffect(() => {
    if (inviteToken) {
      // TODO: API call to get invite details
      setInviteContext({
        circleName: 'Acme Corporation',
        inviterName: 'John Doe'
      })
    }
  }, [inviteToken])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: API call to create account
    if (inviteToken) {
      // Redirect to dashboard with invite pending
      navigate('/dashboard?flow=invite-pending&token=' + inviteToken)
    } else {
      // Redirect to onboarding to create/join first circle
      navigate('/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Create Account</h1>
        {inviteContext ? (
          <p className="text-gray-600 mb-8">
            Join timesēkr to accept your invitation to <strong>{inviteContext.circleName}</strong>
          </p>
        ) : (
          <p className="text-gray-600 mb-8">Get started with timesēkr - it's free!</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Full Name"
            />
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="username"
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition"
          >
            {inviteContext ? 'Create Account & Continue' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
