import { useState, useCallback } from "react";
import CalendarToolbar from "./CalendarToolbar";
import CalendarGrid from "./CalendarGrid";
import { getWeekStart, getWeekDays } from "../lib/dates";

export default function Calendar({ events, availability, draftEvent, onDragCreate, onDraftUpdate, onDraftDelete, onSetAvailability, onDeleteEvent, onDeleteAvailability, onUpdateEvent, onUpdateAvailability, onEditEvent, peopleOverlays, testDataOn, onToggleTestData }) {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [viewMode, setViewMode] = useState("Week");

  const allDays = getWeekDays(weekStart);
  const days = allDays.filter((d) => d.date.getDay() !== 0 && d.date.getDay() !== 6);

  const goToToday = useCallback(() => setWeekStart(getWeekStart(new Date())), []);

  const goPrevWeek = useCallback(() => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  }, []);

  const goNextWeek = useCallback(() => {
    setWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  }, []);

  return (
    <div className="flex-1 min-w-0 bg-white border border-gray-300 rounded-[20px] overflow-hidden flex flex-col">
      <CalendarToolbar
        weekStart={weekStart}
        onPrevWeek={goPrevWeek}
        onNextWeek={goNextWeek}
        onToday={goToToday}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        testDataOn={testDataOn}
        onToggleTestData={onToggleTestData}
      />
      <CalendarGrid
        days={days}
        events={events}
        availability={availability}
        draftEvent={draftEvent}
        onDragCreate={onDragCreate}
        onDraftUpdate={onDraftUpdate}
        onDraftDelete={onDraftDelete}
        onSetAvailability={onSetAvailability}
        onDeleteEvent={onDeleteEvent}
        onDeleteAvailability={onDeleteAvailability}
        onUpdateEvent={onUpdateEvent}
        onUpdateAvailability={onUpdateAvailability}
        onEditEvent={onEditEvent}
        peopleOverlays={peopleOverlays}
      />
    </div>
  );
}
