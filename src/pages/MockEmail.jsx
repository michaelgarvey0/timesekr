import { Link } from 'react-router-dom'

function MockEmail() {
  // Mock invite data
  const invite = {
    organizer: 'Alice Johnson',
    organization: 'Acme Corporation',
    inviteCode: 'ABC123XYZ'
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {/* Mock email client container */}
      <div className="w-full max-w-3xl">
        {/* Email client chrome */}
        <div className="bg-white rounded-t-lg border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-600">Inbox - Gmail</div>
        </div>

        {/* Email header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{invite.organizer} invited you to join {invite.organization} on timesēkr</h2>
              <p className="text-sm text-gray-600 mt-1">
                from <span className="font-medium">{invite.organizer}</span> via timesēkr
              </p>
            </div>
            <span className="text-sm text-gray-500">2 min ago</span>
          </div>
        </div>

        {/* Email body */}
        <div className="bg-white rounded-b-lg p-8 shadow-lg">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">Hi there,</p>
            <p className="text-gray-700 mb-4">
              {invite.organizer} has invited you to join <strong>{invite.organization}</strong> on timesēkr.
            </p>

            <p className="text-gray-700 mb-4">
              timesēkr helps teams coordinate schedules and find availability for meetings. By joining, you'll be able to share your availability with {invite.organization}.
            </p>

            <div className="bg-teal-50 rounded-lg p-4 mb-6 border border-teal-200">
              <p className="text-sm text-teal-900 font-semibold mb-2">What happens next:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-teal-800">
                <li>Create your account</li>
                <li>Connect your personal calendar</li>
                <li>Start coordinating with {invite.organization}</li>
              </ol>
            </div>
          </div>

          {/* Action button */}
          <div className="mb-8">
            <Link
              to={`/join/${invite.inviteCode}`}
              className="block"
            >
              <button className="w-full bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm">
                Accept Invitation & Join
              </button>
            </Link>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 text-center">
              This is a simulated email to demonstrate the user flow. In production, this would be a real email sent to invitees.
            </p>
          </div>
        </div>

        {/* Back to flows selector */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
            ← Back to demo selection
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MockEmail
