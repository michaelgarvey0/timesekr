import { useState } from 'react'

function InviteMembersForm({ circle, onCancel, onSuccess }) {
  const [step, setStep] = useState(1)
  const [bulkText, setBulkText] = useState('')
  const [invites, setInvites] = useState([])
  const [selectedInvites, setSelectedInvites] = useState(new Set())
  const [invitationMessage, setInvitationMessage] = useState(
    `You're invited to join ${circle?.name || 'our circle'} on timesēkr! We use this platform to coordinate our schedules and find meeting times that work for everyone.`
  )

  const parseBulkText = (text) => {
    const lines = text.trim().split('\n')
    const parsed = []

    lines.forEach((line, idx) => {
      const trimmed = line.trim()
      if (!trimmed) return

      // Try to parse as "Name <email>" or "Name, email" or just "email"
      const emailMatch = trimmed.match(/([^<,]+?)(?:[<,]\s*)?([^\s<>,]+@[^\s<>,]+)/i)
      if (emailMatch) {
        parsed.push({
          id: idx,
          name: emailMatch[1].trim(),
          email: emailMatch[2].trim(),
          role: 'member'
        })
      } else if (trimmed.includes('@')) {
        // Just an email
        parsed.push({
          id: idx,
          name: '',
          email: trimmed,
          role: 'member'
        })
      }
    })

    return parsed
  }

  const getMockInvites = () => [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'member' },
    { id: 2, name: 'Mike Chen', email: 'mike@company.com', role: 'member' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@company.com', role: 'member' },
    { id: 4, name: 'James Wilson', email: 'james@company.com', role: 'member' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa@company.com', role: 'member' },
    { id: 6, name: 'David Brown', email: 'david@company.com', role: 'member' },
    { id: 7, name: 'Jennifer Lee', email: 'jennifer@company.com', role: 'member' },
    { id: 8, name: 'Robert Martinez', email: 'robert@company.com', role: 'member' },
    { id: 9, name: 'Amanda Garcia', email: 'amanda@company.com', role: 'member' },
    { id: 10, name: 'Christopher Taylor', email: 'christopher@company.com', role: 'member' },
    { id: 11, name: 'Michelle White', email: 'michelle@company.com', role: 'member' },
    { id: 12, name: 'Daniel Harris', email: 'daniel@company.com', role: 'member' },
    { id: 13, name: 'Jessica Martin', email: 'jessica@company.com', role: 'member' },
    { id: 14, name: 'Matthew Thompson', email: 'matthew@company.com', role: 'member' },
    { id: 15, name: 'Ashley Moore', email: 'ashley@company.com', role: 'member' },
    { id: 16, name: 'Andrew Jackson', email: 'andrew@company.com', role: 'member' },
    { id: 17, name: 'Stephanie Clark', email: 'stephanie@company.com', role: 'member' },
    { id: 18, name: 'Joshua Lewis', email: 'joshua@company.com', role: 'member' },
    { id: 19, name: 'Rebecca Walker', email: 'rebecca@company.com', role: 'member' },
    { id: 20, name: 'Ryan Hall', email: 'ryan@company.com', role: 'member' },
    { id: 21, name: 'Nicole Allen', email: 'nicole@company.com', role: 'member' },
    { id: 22, name: 'Kevin Young', email: 'kevin@company.com', role: 'member' },
    { id: 23, name: 'Rachel King', email: 'rachel@company.com', role: 'member' },
    { id: 24, name: 'Brian Wright', email: 'brian@company.com', role: 'member' },
    { id: 25, name: 'Laura Lopez', email: 'laura@company.com', role: 'member' },
    { id: 26, name: 'Jason Hill', email: 'jason@company.com', role: 'member' },
    { id: 27, name: 'Samantha Scott', email: 'samantha@company.com', role: 'member' },
    { id: 28, name: 'Brandon Green', email: 'brandon@company.com', role: 'member' },
    { id: 29, name: 'Megan Adams', email: 'megan@company.com', role: 'member' },
    { id: 30, name: 'Tyler Baker', email: 'tyler@company.com', role: 'member' }
  ]

  const handleParse = () => {
    const mockInvites = getMockInvites()
    setInvites(mockInvites)
    setSelectedInvites(new Set(mockInvites.map(p => p.id)))
    setStep(2)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const mockInvites = getMockInvites()
    setInvites(mockInvites)
    setSelectedInvites(new Set(mockInvites.map(p => p.id)))
    setStep(2)
  }

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedInvites)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedInvites(newSelected)
  }

  const removeInvite = (id) => {
    setInvites(invites.filter(i => i.id !== id))
    const newSelected = new Set(selectedInvites)
    newSelected.delete(id)
    setSelectedInvites(newSelected)
  }

  const setRoleForSelected = (role) => {
    const updated = invites.map(invite =>
      selectedInvites.has(invite.id) ? { ...invite, role } : invite
    )
    setInvites(updated)
  }

  const handleSend = (e) => {
    e.preventDefault()
    const finalInvites = invites.filter(i => selectedInvites.has(i.id))
    onSuccess(finalInvites, invitationMessage)
  }

  const selectedCount = selectedInvites.size

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Invite Members</h3>
            {step === 2 && <p className="text-sm text-gray-600 mt-1">{selectedCount} selected</p>}
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <form onSubmit={handleSend} className="p-6">
        {/* Step 1: Paste or Upload */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste list or upload CSV
              </label>
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder="John Doe <john@example.com>&#10;Jane Smith, jane@example.com&#10;bob@example.com"
                className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm font-mono"
              />
              <p className="text-xs text-gray-500 mt-2">
                Formats: "Name &lt;email&gt;", "Name, email", or just "email"
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleParse}
                disabled={!bulkText.trim()}
                className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Parse List
              </button>
              <label className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition cursor-pointer text-center">
                Upload CSV
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Select & Assign Roles */}
        {step === 2 && (
          <div className="space-y-4">
            {/* Bulk Actions */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="checkbox"
                      checked={selectedInvites.size === invites.length && invites.length > 0}
                      onChange={() => {
                        if (selectedInvites.size === invites.length) {
                          setSelectedInvites(new Set())
                        } else {
                          setSelectedInvites(new Set(invites.map(i => i.id)))
                        }
                      }}
                      className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white cursor-pointer checked:bg-teal-600 checked:border-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                    />
                    <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">Select All</span>
                </label>
                {selectedCount > 0 && (
                  <span className="text-xs text-gray-500">({selectedCount} selected)</span>
                )}
              </div>

              {selectedCount > 0 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRoleForSelected('member')}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700"
                  >
                    Set as member
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleForSelected('delegate')}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Set as member delegate
                  </button>
                </div>
              )}
            </div>

            {/* List */}
            <div className="max-h-96 overflow-y-auto space-y-2">
              {invites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                >
                  <label className="flex items-center cursor-pointer">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input
                        type="checkbox"
                        checked={selectedInvites.has(invite.id)}
                        onChange={() => toggleSelect(invite.id)}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white cursor-pointer checked:bg-teal-600 checked:border-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
                      />
                      <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {invite.name || invite.email}
                    </div>
                    {invite.name && (
                      <div className="text-xs text-gray-500">{invite.email}</div>
                    )}
                  </div>
                  <div className="relative">
                    <select
                      value={invite.role}
                      onChange={(e) => {
                        const updated = invites.map(i =>
                          i.id === invite.id ? { ...i, role: e.target.value } : i
                        )
                        setInvites(updated)
                      }}
                      className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm bg-white cursor-pointer"
                    >
                      <option value="member">Member</option>
                      <option value="delegate">Member Delegate</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeInvite(invite.id)}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={invites.length === 0}
                className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue ({invites.length})
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Customize Message */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Inviting {selectedCount} member{selectedCount !== 1 ? 's' : ''}:</p>
              <div className="flex flex-wrap gap-2">
                {invites.filter(i => selectedInvites.has(i.id)).map((invite) => (
                  <span key={invite.id} className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded text-xs">
                    <span>{invite.name || invite.email}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs ${
                      invite.role === 'delegate' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {invite.role === 'delegate' ? 'D' : 'M'}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invitation Message
              </label>
              <textarea
                value={invitationMessage}
                onChange={(e) => setInvitationMessage(e.target.value)}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Send Invitations
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default InviteMembersForm
