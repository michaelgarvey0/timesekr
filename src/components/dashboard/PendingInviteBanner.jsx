function PendingInviteBanner({ invite, onAccept, onDecline }) {

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-gray-900">{invite.circleName}</h3>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
              Pending Invitation
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Invited by {invite.inviterName} · as {invite.invitedEmail}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAccept}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default PendingInviteBanner
