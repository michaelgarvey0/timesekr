function ManageGroups() {
  // Mock data
  const groups = [
    { id: 1, name: 'Engineering Team', members: 12, color: 'teal' },
    { id: 2, name: 'Design Team', members: 8, color: 'purple' },
    { id: 3, name: 'Marketing', members: 15, color: 'orange' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-[#212121]">Groups</h3>
            <p className="text-sm text-gray-500 mt-1">Create and manage groups for convenient scheduling queries</p>
          </div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
            + Create Group
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-teal-600 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 bg-${group.color}-100 rounded-lg flex items-center justify-center`}>
                  <svg className={`w-5 h-5 text-${group.color}-700`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <h4 className="font-semibold text-[#212121] mb-1">{group.name}</h4>
              <p className="text-sm text-gray-500">{group.members} members</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageGroups
