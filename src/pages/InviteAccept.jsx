import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function InviteAccept() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Mock invite data based on URL params
  const inviteToken = searchParams.get('token') || 'mock-token-123'

  // Simulate checking if user has account (email from invite token)
  // In real app, this would be an API call
  useEffect(() => {
    const checkAccount = () => {
      // Mock: Check if user exists
      const hasAccount = false // TODO: API call to check email from token

      if (hasAccount) {
        // User exists, redirect to dashboard with pending invitation
        navigate('/dashboard?flow=invite-pending&token=' + inviteToken)
      } else {
        // User doesn't exist, redirect to signup with invite context
        navigate('/signup?invite=' + inviteToken)
      }
    }

    checkAccount()
  }, [inviteToken, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">timesēkr</h1>
        <p className="text-gray-600">Loading your invitation...</p>
      </div>
    </div>
  )
}

export default InviteAccept
