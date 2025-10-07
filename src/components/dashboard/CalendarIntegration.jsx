function CalendarIntegration() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-2">My Calendars</h3>
        <p className="text-sm text-gray-600 mb-6">Connect your personal calendars to sync your availability</p>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#212121]">Google Calendar</p>
              <p className="text-sm text-gray-500">Connect your Google Calendar</p>
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
              <p className="text-sm text-gray-500">Connect your Outlook Calendar</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarIntegration
