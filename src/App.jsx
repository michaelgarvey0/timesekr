import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6">

      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#212121] mb-4">timesēkr</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find meeting times across organizations, instantly
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Organization Card */}
          <Link to="/onboarding">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer group">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-600 transition">
                <svg className="w-6 h-6 text-teal-700 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#212121] mb-2">Create Organization</h2>
              <p className="text-gray-600 mb-4">
                Set up a new organization and invite your team members
              </p>
              <div className="text-teal-600 font-medium group-hover:translate-x-2 transition inline-flex items-center">
                Get started
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Login Card */}
          <Link to="/login">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition cursor-pointer group">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition">
                <svg className="w-6 h-6 text-emerald-700 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-[#212121] mb-2">Login</h2>
              <p className="text-gray-600 mb-4">
                Access your existing organization and schedule meetings
              </p>
              <div className="text-emerald-600 font-medium group-hover:translate-x-2 transition inline-flex items-center">
                Sign in
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 text-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Why timesēkr?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-2">📅</div>
              <h4 className="font-semibold text-[#212121] mb-1">Cross-Platform</h4>
              <p className="text-sm text-gray-600">Works with Google, Outlook, and more</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold text-[#212121] mb-1">Instant Results</h4>
              <p className="text-sm text-gray-600">Find available times in seconds</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👥</div>
              <h4 className="font-semibold text-[#212121] mb-1">Scale to 500+</h4>
              <p className="text-sm text-gray-600">Perfect for large organizations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
