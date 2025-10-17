// Mock email visualization component
// This simulates what an invited member would see in their email

function InviteEmail() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Email Client Chrome */}
        <div className="bg-white rounded-t-lg shadow-lg border-b border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-gray-500 ml-2">Inbox</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-gray-500">From:</span> <span className="font-medium">John Doe (john@acme.com)</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Subject:</span> <span className="font-medium">Join our team on timesēkr</span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="bg-white rounded-b-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">timesēkr</h1>
            <div className="w-12 h-1 bg-teal-600 mx-auto"></div>
          </div>

          <p className="text-gray-700 mb-4">Hi there,</p>

          <p className="text-gray-700 mb-4">
            <strong>John Doe</strong> has invited you to join <strong>Acme Corporation</strong> on timesēkr.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 italic">
              "Hey! Join our team circle so we can coordinate meetings more easily."
            </p>
          </div>

          <p className="text-gray-700 mb-6">
            timesēkr helps teams find the best meeting times by automatically checking everyone's calendar availability.
            Once you join, we'll be able to schedule meetings that work for everyone - no more back-and-forth emails!
          </p>

          <div className="text-center mb-6">
            <a
              href="/invite?token=mock-token-123"
              className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition"
            >
              View Invitation
            </a>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500 text-center mb-2">
              This invitation was sent to you by John Doe from Acme Corporation
            </p>
            <p className="text-xs text-gray-500 text-center">
              <a href="#" className="text-teal-600 hover:underline">Decline invitation</a> or
              <a href="#" className="text-teal-600 hover:underline ml-1">Report as spam</a>
            </p>
          </div>
        </div>

        {/* Helper text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            This is a simulation of the invitation email a member would receive
          </p>
          <a
            href="/invite?token=mock-token-123"
            className="text-teal-600 hover:text-teal-700 font-medium text-sm"
          >
            → Click here to view the invitation acceptance page
          </a>
        </div>
      </div>
    </div>
  )
}

export default InviteEmail
