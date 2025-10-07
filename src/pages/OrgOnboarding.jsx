import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FeedbackButton from '../components/FeedbackButton'

function OrgOnboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Register, 2: Org Info, 3: Invite Members

  // Step 1: User registration
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  // Step 2: Organization info
  const [orgName, setOrgName] = useState('')
  const [orgDescription, setOrgDescription] = useState('')

  // Step 3: Invite members
  const [emailText, setEmailText] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target.result
        // Parse CSV and extract emails
        const emails = text
          .split(/[\n,;]/)
          .map(email => email.trim())
          .filter(email => email.includes('@'))
          .join('\n')
        setEmailText(prev => prev ? `${prev}\n${emails}` : emails)
      }
      reader.readAsText(file)
    }
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handleStep2Submit = (e) => {
    e.preventDefault()
    setStep(3)
  }

  const handleFinalSubmit = (e) => {
    e.preventDefault()
    // Parse emails from textarea
    const emails = emailText
      .split(/[\n,;]/)
      .map(email => email.trim())
      .filter(email => email.includes('@'))

    console.log({
      organizer: { name: userName, email: userEmail },
      organization: { name: orgName, description: orgDescription },
      invitedMembers: emails,
      totalMembers: emails.length
    })

    // Redirect to dashboard after successful submission
    navigate('/dashboard')
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
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-[#212121] text-4xl font-bold mb-2">timesēkr</h1>
          <p className="text-gray-600">
            {step === 1 && "Let's get started - tell us about yourself"}
            {step === 2 && "Now, tell us about your organization"}
            {step === 3 && "Finally, invite your team members"}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'} font-semibold`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: User Registration */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#212121]">Your Information</h2>

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

              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm"
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 2: Organization Info */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#212121]">Organization Information</h2>

              <div>
                <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., Book Club, Engineering Team"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="orgDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="orgDescription"
                  value={orgDescription}
                  onChange={(e) => setOrgDescription(e.target.value)}
                  placeholder="Tell us about your organization..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                />
              </div>

            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm"
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Invite Members */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#212121]">Invite Members (Optional)</h2>
              <p className="text-sm text-gray-600">Add email addresses now, or skip and invite members later from your dashboard</p>

              <div>
                <label htmlFor="emails" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Addresses
                </label>
                <textarea
                  id="emails"
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="Paste emails here (one per line, or comma/semicolon separated)&#10;example@email.com&#10;another@email.com"
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none font-mono text-sm"
                />
                {emailText && (
                  <p className="text-sm text-gray-500 mt-2">
                    {emailText.split(/[\n,;]/).filter(e => e.trim().includes('@')).length} email(s) detected
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div>
                <label className="block">
                  <span className="sr-only">Upload CSV file</span>
                  <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 transition cursor-pointer">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold text-teal-600">Upload a CSV file</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">CSV with email addresses</p>
                    </div>
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition shadow-sm"
              >
                {emailText.trim() ? 'Create Organization & Send Invites' : 'Create Organization'}
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              You can invite more members anytime after creating your organization
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default OrgOnboarding
