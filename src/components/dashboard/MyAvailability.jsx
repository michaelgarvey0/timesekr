function MyAvailability() {
  return (
    <div className="space-y-6">
      {/* Calendar Connection */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-teal-100 p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-[#212121] mb-2">Connect Your Calendar</h3>
          <p className="text-gray-600">
            Let others see when you're available without sharing meeting details
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition group">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-bold text-[#212121] text-lg">Google Calendar</p>
              <p className="text-sm text-gray-600">Most popular choice</p>
            </div>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition group">
            <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-bold text-[#212121] text-lg">Outlook Calendar</p>
              <p className="text-sm text-gray-600">Microsoft 365</p>
            </div>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition group">
            <div className="w-14 h-14 bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-bold text-[#212121] text-lg">Apple Calendar</p>
              <p className="text-sm text-gray-600">iCloud sync</p>
            </div>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition group">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-bold text-[#212121] text-lg">Other Calendar</p>
              <p className="text-sm text-gray-600">Yahoo, CalDAV</p>
            </div>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Availability Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-4">Availability Preferences</h3>
        <p className="text-sm text-gray-600 mb-6">Set your default working hours and preferences</p>

        {/* Working Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Default Working Hours
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Start Time</label>
              <input
                type="time"
                defaultValue="09:00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">End Time</label>
              <input
                type="time"
                defaultValue="17:00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        <button className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
          Save Preferences
        </button>
      </div>
    </div>
  )
}

export default MyAvailability
