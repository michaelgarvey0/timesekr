function OrgSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-2">Organization Settings</h3>
        <p className="text-sm text-gray-600 mb-6">Manage your organization's configuration and preferences</p>

        <div className="space-y-6">
          {/* Organization Name */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">Organization Name</label>
            <input
              type="text"
              defaultValue="Acme Corporation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Organization Description */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">Description</label>
            <textarea
              rows="3"
              defaultValue="A leading technology company focused on innovation"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Time Zone */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">Time Zone</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none cursor-pointer">
              <option>Pacific Time (PT)</option>
              <option>Mountain Time (MT)</option>
              <option>Central Time (CT)</option>
              <option>Eastern Time (ET)</option>
            </select>
          </div>

          {/* Default Meeting Duration */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">Default Meeting Duration</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none cursor-pointer">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>

          {/* Working Hours */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">Default Working Hours</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                <input
                  type="time"
                  defaultValue="09:00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">End Time</label>
                <input
                  type="time"
                  defaultValue="17:00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Organization Calendar Integration */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-2">Organization Calendar</h3>
        <p className="text-sm text-gray-600 mb-6">Connect your organization's calendar system to sync availability across all members</p>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#212121]">Google Workspace</p>
              <p className="text-sm text-gray-500">Connect Google Calendar</p>
            </div>
          </button>

          <button className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-[#212121]">Microsoft 365</p>
              <p className="text-sm text-gray-500">Connect Outlook Calendar</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrgSettings
