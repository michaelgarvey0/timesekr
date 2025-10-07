import { useState } from 'react'

function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Mock data
  const allMembers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', status: 'active', role: 'Organizer', groups: ['Engineering', 'Leadership'] },
    { id: 2, name: 'Bob Smith', email: 'bob@company.com', status: 'active', role: 'Member', groups: ['Engineering'] },
    { id: 3, name: 'Charlie Brown', email: 'charlie@company.com', status: 'pending', role: 'Member', groups: [] },
    { id: 4, name: 'Diana Prince', email: 'diana@company.com', status: 'active', role: 'Member', groups: ['Marketing', 'Design'] },
    { id: 5, name: 'Eve Martinez', email: 'eve@company.com', status: 'active', role: 'Organizer', groups: ['Engineering', 'Product'] },
    { id: 6, name: 'Frank Wilson', email: 'frank@company.com', status: 'pending', role: 'Member', groups: [] },
    { id: 7, name: 'Grace Lee', email: 'grace@company.com', status: 'active', role: 'Member', groups: ['Design'] },
    { id: 8, name: 'Henry Davis', email: 'henry@company.com', status: 'active', role: 'Member', groups: ['Sales'] },
    { id: 9, name: 'Iris Chen', email: 'iris@company.com', status: 'active', role: 'Member', groups: ['Engineering', 'Product', 'Innovation'] },
    { id: 10, name: 'Jack Taylor', email: 'jack@company.com', status: 'active', role: 'Organizer', groups: ['Leadership'] },
    { id: 11, name: 'Karen White', email: 'karen@company.com', status: 'pending', role: 'Member', groups: [] },
    { id: 12, name: 'Leo Garcia', email: 'leo@company.com', status: 'active', role: 'Member', groups: ['Sales', 'Marketing'] },
    { id: 13, name: 'Maya Patel', email: 'maya@company.com', status: 'active', role: 'Member', groups: ['Product'] },
    { id: 14, name: 'Nathan Kim', email: 'nathan@company.com', status: 'active', role: 'Member', groups: ['Engineering'] },
    { id: 15, name: 'Olivia Reed', email: 'olivia@company.com', status: 'pending', role: 'Member', groups: [] },
    { id: 16, name: 'Peter Zhang', email: 'peter@company.com', status: 'active', role: 'Organizer', groups: ['Engineering', 'Leadership'] },
    { id: 17, name: 'Quinn Murphy', email: 'quinn@company.com', status: 'active', role: 'Member', groups: ['Marketing'] },
    { id: 18, name: 'Rachel Green', email: 'rachel@company.com', status: 'active', role: 'Member', groups: ['Design'] },
    { id: 19, name: 'Sam Cooper', email: 'sam@company.com', status: 'pending', role: 'Member', groups: [] },
    { id: 20, name: 'Tina Shah', email: 'tina@company.com', status: 'active', role: 'Member', groups: ['Product', 'Innovation'] },
    { id: 21, name: 'Uma Foster', email: 'uma@company.com', status: 'active', role: 'Member', groups: ['Sales'] },
    { id: 22, name: 'Victor Lopez', email: 'victor@company.com', status: 'active', role: 'Member', groups: ['Engineering'] },
  ]

  // Filter logic
  const filteredMembers = allMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#212121]">Organization Members</h3>
              <p className="text-sm text-gray-500 mt-1">Manage users and their permissions</p>
            </div>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
              + Invite Members
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setRoleFilter('all')
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  roleFilter === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setRoleFilter('Organizer')
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  roleFilter === 'Organizer'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Organizer
              </button>
              <button
                onClick={() => {
                  setRoleFilter('Member')
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  roleFilter === 'Member'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Member
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600"><span style={{ paddingLeft: '8px' }}>User</span></th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600"><span style={{ paddingLeft: '8px' }}>Role</span></th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600"><span style={{ paddingLeft: '8px' }}>Groups</span></th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600"><span style={{ paddingLeft: '8px' }}>Status</span></th>
                <th className="w-12 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-semibold flex-shrink-0">
                        {member.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#212121]">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
                      {member.role}
                    </span>
                  </td>

                  {/* Groups */}
                  <td className="px-6 py-4">
                    {member.groups.length === 0 ? (
                      <span className="text-sm text-gray-400" style={{ paddingLeft: '8px' }}>No groups</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {member.groups.slice(0, 2).map((group, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded">
                            {group}
                          </span>
                        ))}
                        {member.groups.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            +{member.groups.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {member.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === i + 1
                      ? 'bg-teal-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageUsers
