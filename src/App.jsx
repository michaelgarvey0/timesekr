import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-semibold text-gray-900 mb-4">timesēkr</h1>
        <p className="text-xl text-gray-600 mb-12">Find meeting times across organizations, instantly</p>

        <div className="flex gap-4 justify-center mb-12">
          <Link to="/signup">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition">
              Create Account
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition border border-gray-300">
              Log In
            </button>
          </Link>
        </div>

        {/* Demo Flows */}
        <div className="border-t border-gray-300 pt-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Demo Flows</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/invite-email">
              <button className="w-full bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition border border-gray-300">
                Member Invite Email
              </button>
            </Link>
            <Link to="/invite">
              <button className="w-full bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition border border-gray-300">
                Accept Invitation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
