import { Link } from 'react-router-dom'
import FeedbackButton from '../components/FeedbackButton'

function DemoSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6">
      <FeedbackButton />

      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#212121] mb-4">timesēkr</h1>
        </div>

        {/* Flow Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Org Creator Flow */}
          <Link to="/onboarding">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer group">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition">
                <svg className="w-6 h-6 text-teal-700 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#212121] mb-2">Organization Creator</h2>
              <p className="text-gray-600 mb-6">
                Experience creating a new organization and inviting team members
              </p>
              <div className="text-teal-600 font-medium group-hover:translate-x-2 transition inline-flex items-center">
                Start as organizer
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Invited Member Flow */}
          <Link to="/mock-email">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer group">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition">
                <svg className="w-6 h-6 text-emerald-700 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#212121] mb-2">Invited Member</h2>
              <p className="text-gray-600 mb-6">
                Experience receiving an email invite and joining as a new member
              </p>
              <div className="text-emerald-600 font-medium group-hover:translate-x-2 transition inline-flex items-center">
                Start as invitee
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default DemoSelector
