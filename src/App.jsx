import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="text-center max-w-4xl mx-auto relative z-10 bg-white/80 backdrop-blur-sm p-12 rounded-2xl border border-gray-200 shadow-xl">
        <h1 className="text-5xl font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">timesēkr</h1>
        <p className="text-xl text-gray-700 mb-12">Find meeting times across organizations, instantly</p>

        {/* Demo Flows */}
        <div>
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">Demo Flows</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/signup">
              <button className="w-full bg-gradient-to-b from-teal-500 to-cyan-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md border border-teal-400/20">
                Organizer Account Creation
              </button>
            </Link>
            <Link to="/invite-email">
              <button className="w-full bg-gradient-to-b from-teal-500 to-cyan-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md border border-teal-400/20">
                Member Invite Email
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
