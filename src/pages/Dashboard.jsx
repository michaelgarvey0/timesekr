import { useState } from 'react'
import { Link } from 'react-router-dom'
import ManageUsers from '../components/dashboard/ManageUsers'
import ManageGroups from '../components/dashboard/ManageGroups'
import FindAvailability from '../components/dashboard/FindAvailability'
import MyAvailability from '../components/dashboard/MyAvailability'
import CalendarIntegration from '../components/dashboard/CalendarIntegration'
import OrgSettings from '../components/dashboard/OrgSettings'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('users')

  // Mock data
  const orgData = {
    name: 'Acme Corporation',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold text-[#212121]">timesēkr</Link>
              <span className="text-gray-400">|</span>
              <h2 className="text-lg text-gray-600">{orgData.name}</h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'users'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`pb-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'groups'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Groups
            </button>
            <button
              onClick={() => setActiveTab('find')}
              className={`pb-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'find'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Find Availability
            </button>
            <button
              onClick={() => setActiveTab('my-availability')}
              className={`pb-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'my-availability'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Availability
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'calendar'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Calendar Integration
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-1 border-b-2 font-medium transition ${
                activeTab === 'settings'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Organization Settings
            </button>
          </nav>
        </div>

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
    </div>
  )
}

export default Dashboard
