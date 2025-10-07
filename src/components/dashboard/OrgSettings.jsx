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
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Pacific Time (PT)</option>
              <option>Mountain Time (MT)</option>
              <option>Central Time (CT)</option>
              <option>Eastern Time (ET)</option>
            </select>
          </div>

          {/* Default Meeting Duration */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">Default Meeting Duration</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
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
    </div>
  )
}

export default OrgSettings
