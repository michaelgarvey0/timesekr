import { useState } from 'react'
import './App.css'

// Mock data
const mockGroups = [
  { id: 1, name: 'Engineering Team', members: ['alice@company.com', 'bob@company.com', 'charlie@company.com'] },
  { id: 2, name: 'Book Club', members: ['dana@email.com', 'eve@email.com', 'frank@email.com', 'grace@email.com'] },
]

const mockAvailableSlots = [
  { date: '2025-10-08', time: '2:00 PM - 3:00 PM', available: 8, total: 8 },
  { date: '2025-10-08', time: '4:00 PM - 5:00 PM', available: 7, total: 8 },
  { date: '2025-10-09', time: '10:00 AM - 11:00 AM', available: 8, total: 8 },
  { date: '2025-10-09', time: '1:00 PM - 2:00 PM', available: 6, total: 8 },
  { date: '2025-10-10', time: '3:00 PM - 4:00 PM', available: 8, total: 8 },
]

function App() {
  const [view, setView] = useState('host') // 'host' or 'groups'
  const [emails, setEmails] = useState('')
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [showNewGroup, setShowNewGroup] = useState(false)

  const handleFindTimes = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      setShowResults(true)
    }, 1500)
  }

  const handleLoadGroup = (group) => {
    setSelectedGroup(group)
    setEmails(group.members.join(', '))
    setView('host')
  }

  const handleSaveGroup = () => {
    // Simulate saving group
    setShowNewGroup(false)
    setNewGroupName('')
    alert('Group saved! (This is a demo - not actually saved)')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Timesēkr</h1>
        <p className="tagline">Find meeting times across organizations, instantly</p>
        <nav className="nav">
          <button
            className={view === 'host' ? 'active' : ''}
            onClick={() => setView('host')}
          >
            Find Times
          </button>
          <button
            className={view === 'groups' ? 'active' : ''}
            onClick={() => setView('groups')}
          >
            My Groups
          </button>
        </nav>
      </header>

      <main className="main">
        {view === 'host' && (
          <div className="host-view">
            <div className="input-section">
              <h2>Find Available Meeting Times</h2>
              <div className="form-group">
                <label>Enter participant emails (comma separated):</label>
                <textarea
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="alice@company.com, bob@team.org, charlie@email.com"
                  rows="4"
                />
              </div>

              <div className="actions">
                <button
                  className="primary-btn"
                  onClick={handleFindTimes}
                  disabled={!emails || isSearching}
                >
                  {isSearching ? 'Checking Calendars...' : 'Find Available Times'}
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => setShowNewGroup(!showNewGroup)}
                >
                  Save as Group
                </button>
              </div>

              {showNewGroup && (
                <div className="new-group-form">
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Group name (e.g., 'Weekly Standup Team')"
                  />
                  <button onClick={handleSaveGroup} disabled={!newGroupName}>
                    Save Group
                  </button>
                </div>
              )}
            </div>

            {showResults && (
              <div className="results-section">
                <h3>Available Time Slots</h3>
                <p className="results-info">
                  Showing times when all {emails.split(',').length} participants are available
                </p>
                <div className="time-slots">
                  {mockAvailableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`time-slot ${slot.available === slot.total ? 'full-availability' : ''}`}
                    >
                      <div className="slot-date">{slot.date}</div>
                      <div className="slot-time">{slot.time}</div>
                      <div className="slot-availability">
                        {slot.available}/{slot.total} available
                      </div>
                      <button className="select-btn">Select This Time</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'groups' && (
          <div className="groups-view">
            <h2>Saved Groups</h2>
            <p className="groups-info">Quickly reuse groups for recurring meetings</p>
            <div className="groups-list">
              {mockGroups.map((group) => (
                <div key={group.id} className="group-card">
                  <h3>{group.name}</h3>
                  <p className="member-count">{group.members.length} members</p>
                  <div className="members">
                    {group.members.map((member, idx) => (
                      <span key={idx} className="member-tag">{member}</span>
                    ))}
                  </div>
                  <button
                    className="load-btn"
                    onClick={() => handleLoadGroup(group)}
                  >
                    Use This Group
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="demo-badge">DEMO MODE - All data is simulated</div>
      </footer>
    </div>
  )
}

export default App
