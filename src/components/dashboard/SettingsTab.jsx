import { useState } from 'react'

function SettingsTab() {
  const [username] = useState('johndoe')
  const [emails, setEmails] = useState([
    { email: 'john@example.com', primary: true, verified: true },
    { email: 'john.doe@company.com', primary: false, verified: true }
  ])
  const [newEmail, setNewEmail] = useState('')

  const handleAddEmail = (e) => {
    e.preventDefault()
    if (newEmail) {
      setEmails([...emails, { email: newEmail, primary: false, verified: false }])
      setNewEmail('')
    }
  }

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter(e => e.email !== emailToRemove))
  }

  const handleSetPrimary = (emailToSet) => {
    setEmails(emails.map(e => ({ ...e, primary: e.email === emailToSet })))
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">Settings</h2>

      {/* Username Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Username</h3>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-medium text-gray-900">@{username}</span>
          <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
            Change
          </button>
        </div>
      </div>

      {/* Email Addresses Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Addresses</h3>
        <p className="text-sm text-gray-600 mb-4">
          People can invite you using any of these email addresses
        </p>

        <div className="space-y-3 mb-4">
          {emails.map((emailObj) => (
            <div key={emailObj.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-sm font-medium text-gray-900">{emailObj.email}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {emailObj.primary && (
                      <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-700 rounded">Primary</span>
                    )}
                    {emailObj.verified ? (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">Unverified</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!emailObj.primary && (
                  <button
                    onClick={() => handleSetPrimary(emailObj.email)}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Set Primary
                  </button>
                )}
                {!emailObj.primary && (
                  <button
                    onClick={() => handleRemoveEmail(emailObj.email)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddEmail} className="flex gap-2">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Add another email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition text-sm"
          >
            Add Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingsTab
