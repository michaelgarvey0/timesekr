import { useState } from 'react'
import { Link } from 'react-router-dom'
import ManageUsers from '../components/dashboard/ManageUsers'
import ManageGroups from '../components/dashboard/ManageGroups'
import FindAvailability from '../components/dashboard/FindAvailability'
import MyAvailability from '../components/dashboard/MyAvailability'
import CalendarIntegration from '../components/dashboard/CalendarIntegration'
import OrgSettings from '../components/dashboard/OrgSettings'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('find')

  // Mock data
  const orgData = {
    name: 'Acme Corporation',
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-2xl font-bold text-[#212121]">timesēkr</Link>
          <p className="text-sm text-gray-600 mt-1">{orgData.name}</p>
        </div>

        <nav className="flex-1 p-4">
          {/* Primary Action */}
          <button
            onClick={() => setActiveTab('find')}
            className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Schedule Meeting
          </button>

          {/* Scheduling Section */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3">Scheduling</p>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('find')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                  activeTab === 'find'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Find Availability
              </button>
              <button
                onClick={() => setActiveTab('my-availability')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                  activeTab === 'my-availability'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                My Availability
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                  activeTab === 'calendar'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                My Calendars
              </button>
            </div>
          </div>

          {/* Organization Section */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3">Organization</p>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                  activeTab === 'users'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Manage Users
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                  activeTab === 'groups'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Manage Groups
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                  activeTab === 'settings'
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                Organization Settings
              </button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">Alice Johnson</p>
              <p className="text-xs text-gray-500 truncate">Organizer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-8 py-4 flex items-center justify-end">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-8 py-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Manage Users Tab */}
            {activeTab === 'users' && <ManageUsers />}

            {/* Manage Groups Tab */}
            {activeTab === 'groups' && <ManageGroups />}

            {/* Find Availability Tab */}
            {activeTab === 'find' && <FindAvailability />}

            {/* My Availability Tab */}
            {activeTab === 'my-availability' && <MyAvailability />}

            {/* Calendar Integration Tab */}
            {activeTab === 'calendar' && <CalendarIntegration />}

            {/* Organization Settings Tab */}
            {activeTab === 'settings' && <OrgSettings />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
