function FindAvailability() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-4">Find Available Times</h3>
        <p className="text-sm text-gray-600 mb-6">Select participants and find times when everyone is available</p>

        {/* Participant Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Participants
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search members or groups..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
              Search
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Duration
          </label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition">
            <option>30 minutes</option>
            <option>1 hour</option>
            <option>1.5 hours</option>
            <option>2 hours</option>
          </select>
        </div>

        <button className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition">
          Find Available Times
        </button>
      </div>

      {/* Results placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h4 className="font-semibold text-[#212121] mb-2">Available Time Slots</h4>
        <p className="text-sm text-gray-500">Results will appear here after searching...</p>
      </div>
    </div>
  )
}

export default FindAvailability
