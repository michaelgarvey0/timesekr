function MyAvailability() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-4">My Availability Settings</h3>
        <p className="text-sm text-gray-600 mb-6">Manage your calendar connection and availability preferences</p>

        {/* Calendar Connection Status */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-medium text-yellow-800">Calendar Not Connected</p>
              <p className="text-sm text-yellow-700 mt-1">Connect your calendar to allow others to see your availability</p>
            </div>
          </div>
        </div>

        {/* Connect Calendar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Connect Your Calendar
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#212121]">Google Calendar</p>
                <p className="text-sm text-gray-500">Connect your personal calendar</p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#212121]">Outlook Calendar</p>
                <p className="text-sm text-gray-500">Connect your Microsoft calendar</p>
              </div>
            </button>
          </div>
        </div>

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
