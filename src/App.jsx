import { useState, useCallback, useEffect, useMemo } from "react";
import NavBar from "./components/NavBar";
import Calendar from "./components/Calendar";
import AnimatedPanel from "./components/AnimatedPanel";
import {
  MeetingsSidebar,
  InvitationsSidebar,
  NotificationsSidebar,
  PeopleSidebar,
  CreateMeetingSidebar,
} from "./components/Sidebar";
import { formatTime, generatePeople } from "./data/events";
import { formatDateShort, getWeekStart, getWeekDays } from "./lib/dates";

let nextId = 100;
let nextAvailId = 100;

function generateTestData() {
  const days = getWeekDays(getWeekStart(new Date()));
  const d = (i) => days[i].iso;
  const colors = ["blue", "teal", "purple", "amber", "red", "orange"];

  const events = [
    { id: 1, title: "Team standup", date: d(1), start: 9, duration: 0.5, color: "blue" },
    { id: 2, title: "Design review", date: d(1), start: 13, duration: 1, color: "purple" },
    { id: 3, title: "1:1 with Sarah", date: d(2), start: 10, duration: 0.5, color: "teal" },
    { id: 4, title: "Sprint planning", date: d(2), start: 14, duration: 1.5, color: "amber" },
    { id: 5, title: "Client call", date: d(3), start: 11, duration: 1, color: "red" },
    { id: 6, title: "Lunch & learn", date: d(3), start: 12.5, duration: 1, color: "orange" },
    { id: 7, title: "Team standup", date: d(4), start: 9, duration: 0.5, color: "blue" },
    { id: 8, title: "Product sync", date: d(4), start: 15, duration: 0.75, color: "purple" },
    { id: 9, title: "Retro", date: d(5), start: 10, duration: 1, color: "teal" },
    { id: 10, title: "Happy hour", date: d(5), start: 16.5, duration: 1.5, color: "amber" },
  ].map((ev) => ({ ...ev, timeLabel: `${formatTime(ev.start)} – ${formatTime(ev.start + ev.duration)}` }));

  const avail = [
    { id: 1, date: d(1), start: 10, duration: 2, status: "busy" },
    { id: 2, date: d(3), start: 8, duration: 1.5, status: "free" },
    { id: 3, date: d(4), start: 13, duration: 1.5, status: "tentative" },
    { id: 4, date: d(5), start: 8.5, duration: 1, status: "free" },
  ];

  return { events, avail };
}

export default function App() {
  const [activeNav, setActiveNav] = useState("meetings");
  const [events, setEvents] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [draftEvent, setDraftEvent] = useState(null); // { date, start, duration }
  const [selectedPeople, setSelectedPeople] = useState([]); // array of person ids

  // Track last panel content for exit animation
  const [panelContent, setPanelContent] = useState("meetings");
  const panelOpen = activeNav !== null || showCreate;

  useEffect(() => {
    if (showCreate) setPanelContent("create");
    else if (activeNav) setPanelContent(activeNav);
  }, [activeNav, showCreate]);

  // People mock data (based on current week)
  const currentWeekDays = useMemo(() => getWeekDays(getWeekStart(new Date())), []);
  const people = useMemo(() => generatePeople(currentWeekDays), [currentWeekDays]);

  const togglePerson = useCallback((id) => {
    setSelectedPeople((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  // Gather selected people's availability for overlay
  const peopleOverlays = useMemo(() => {
    return people
      .filter((p) => selectedPeople.includes(p.id))
      .map((p) => ({ id: p.id, name: p.name, color: p.color, availability: p.availability }));
  }, [people, selectedPeople]);

  // Hide the event being edited (it's shown as draft instead)
  const editId = draftEvent?._editId;
  const visibleEvents = editId ? events.filter((ev) => ev.id !== editId) : events;

  const meetings = events.map((ev) => {
    const d = new Date(ev.date + "T00:00:00");
    return {
      ...ev,
      dateLabel: formatDateShort(d),
      dotColor: { blue: "#3B82F6", teal: "#14B8A6", purple: "#8B5CF6", amber: "#F59E0B", gray: "#9CA3AF", red: "#EF4444", orange: "#F97316" }[ev.color] || "#3B82F6",
    };
  });

  // Commit the draft event (create or update)
  const addEvent = useCallback((data) => {
    const editId = draftEvent?._editId;
    if (editId) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editId
            ? {
                ...ev,
                title: data.title,
                date: data.date,
                start: data.start,
                duration: data.duration,
                color: data.color || "blue",
                timeLabel: `${formatTime(data.start)} – ${formatTime(data.start + data.duration)}`,
              }
            : ev
        )
      );
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: nextId++,
          title: data.title,
          date: data.date,
          start: data.start,
          duration: data.duration,
          color: data.color || "blue",
          timeLabel: `${formatTime(data.start)} – ${formatTime(data.start + data.duration)}`,
        },
      ]);
    }
    setDraftEvent(null);
  }, [draftEvent]);

  // Drag on calendar → create draft + open form
  const handleDragCreate = useCallback((info) => {
    setDraftEvent({ date: info.date, start: info.start, duration: info.duration });
    setShowCreate(true);
    setActiveNav(null);
  }, []);

  // Update draft from dragging/resizing on calendar
  const handleDraftUpdate = useCallback((updated) => {
    setDraftEvent(updated);
  }, []);

  // "Create meeting" button in nav
  const handleCreateMeeting = useCallback(() => {
    setDraftEvent(null); // no prefill from drag
    setShowCreate(true);
    setActiveNav(null);
  }, []);

  const handleNavChange = useCallback((nav) => {
    setActiveNav(nav);
    setShowCreate(false);
    setDraftEvent(null); // discard draft when switching tabs
  }, []);

  // Delete draft event
  const handleDraftDelete = useCallback(() => {
    setDraftEvent(null);
    setShowCreate(false);
    setActiveNav(null);
  }, []);

  // Delete a committed event
  const handleDeleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }, []);

  // Delete an availability block
  const handleDeleteAvailability = useCallback((id) => {
    setAvailability((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Update an existing event (move/resize)
  const handleUpdateEvent = useCallback((id, updates) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              ...updates,
              timeLabel: `${formatTime(updates.start ?? ev.start)} – ${formatTime((updates.start ?? ev.start) + (updates.duration ?? ev.duration))}`,
            }
          : ev
      )
    );
  }, []);

  // Update an existing availability block (move)
  const handleUpdateAvailability = useCallback((id, updates) => {
    setAvailability((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  }, []);

  // Edit an existing event — open sidebar with its data
  const handleEditEvent = useCallback((id, overrides) => {
    const ev = events.find((e) => e.id === id);
    if (!ev) return;
    setDraftEvent({ ...ev, ...overrides, _editId: id });
    setShowCreate(true);
    setActiveNav(null);
  }, [events]);

  // Set availability block
  const handleSetAvailability = useCallback((info) => {
    setAvailability((prev) => [
      ...prev,
      { id: nextAvailId++, date: info.date, start: info.start, duration: info.duration, status: info.status },
    ]);
  }, []);

  // Toggle test data
  const [testDataOn, setTestDataOn] = useState(false);
  const toggleTestData = useCallback(() => {
    setTestDataOn((prev) => {
      if (!prev) {
        const { events: testEvents, avail } = generateTestData();
        setEvents(testEvents);
        setAvailability(avail);
        nextId = 100;
        nextAvailId = 100;
      } else {
        setEvents([]);
        setAvailability([]);
      }
      return !prev;
    });
    setDraftEvent(null);
    setShowCreate(false);
  }, []);

  // Close sidebar — discard draft (editing just restores original since we filter by _editId)
  const closeSidebar = useCallback(() => {
    setActiveNav(null);
    setShowCreate(false);
    setDraftEvent(null);
  }, []);

  const renderPanelContent = () => {
    switch (panelContent) {
      case "meetings":
        return <MeetingsSidebar meetings={meetings} onClose={closeSidebar} />;
      case "invitations":
        return <InvitationsSidebar onClose={closeSidebar} />;
      case "notifications":
        return <NotificationsSidebar onClose={closeSidebar} />;
      case "people":
        return <PeopleSidebar onClose={closeSidebar} people={people} selectedPeople={selectedPeople} onTogglePerson={togglePerson} />;
      case "create":
        return (
          <CreateMeetingSidebar
            onClose={closeSidebar}
            onSubmit={addEvent}
            prefill={draftEvent}
            onDraftUpdate={handleDraftUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-[#0a0c4d] to-[#10137b] p-6">
      <div className="flex flex-col gap-6 h-full w-full">
        <NavBar
          activeNav={activeNav}
          onNavChange={handleNavChange}
          onCreateMeeting={handleCreateMeeting}
          inviteCount={0}
          notifCount={0}
        />

        <div className="flex gap-6 flex-1 min-h-0">
          <Calendar
            events={visibleEvents}
            availability={availability}
            draftEvent={draftEvent}
            onDragCreate={handleDragCreate}
            onDraftUpdate={handleDraftUpdate}
            onDraftDelete={handleDraftDelete}
            onSetAvailability={handleSetAvailability}
            onDeleteEvent={handleDeleteEvent}
            onDeleteAvailability={handleDeleteAvailability}
            onUpdateEvent={handleUpdateEvent}
            onUpdateAvailability={handleUpdateAvailability}
            onEditEvent={handleEditEvent}
            peopleOverlays={peopleOverlays}
            testDataOn={testDataOn}
            onToggleTestData={toggleTestData}
          />

          <AnimatedPanel open={panelOpen}>
            {renderPanelContent()}
          </AnimatedPanel>
        </div>
      </div>
    </div>
  );
}
