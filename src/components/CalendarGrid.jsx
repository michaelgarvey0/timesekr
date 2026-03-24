import { useEffect, useRef, useState, useCallback } from "react";
import { isSameDay } from "../lib/dates";
import { EV_COLORS, AVAIL_STYLES, HOURS, DEFAULT_SLOT_HEIGHT, DEFAULT_SCROLL_HOUR, VISIBLE_HOURS, formatTime } from "../data/events";

const RESIZE_EDGE = 6;

// ── Overlap layout algorithm ────────────────────────────────────────────────
function layoutBlocks(blocks) {
  if (!blocks.length) return {};
  const sorted = [...blocks].sort((a, b) => a.start - b.start || a.duration - b.duration);

  const groups = [];
  let group = [sorted[0]];
  let groupEnd = sorted[0].start + sorted[0].duration;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start < groupEnd) {
      group.push(sorted[i]);
      groupEnd = Math.max(groupEnd, sorted[i].start + sorted[i].duration);
    } else {
      groups.push(group);
      group = [sorted[i]];
      groupEnd = sorted[i].start + sorted[i].duration;
    }
  }
  groups.push(group);

  const result = {};
  for (const g of groups) {
    const cols = [];
    for (const block of g) {
      let placed = false;
      for (let c = 0; c < cols.length; c++) {
        const last = cols[c][cols[c].length - 1];
        if (last.start + last.duration <= block.start) {
          cols[c].push(block);
          block._col = c;
          placed = true;
          break;
        }
      }
      if (!placed) {
        block._col = cols.length;
        cols.push([block]);
      }
    }
    const total = cols.length;
    for (const block of g) {
      result[block._key] = { col: block._col, total };
    }
  }
  return result;
}

// ── Layout style helper ─────────────────────────────────────────────────────
function getLayoutStyle(layout) {
  if (!layout || layout.total <= 1) return { left: 3, right: 3 };
  const pct = 100 / layout.total;
  return {
    left: `calc(${layout.col * pct}% + 2px)`,
    width: `calc(${pct}% - 4px)`,
    right: "auto",
  };
}

// ── CalendarGrid ────────────────────────────────────────────────────────────
export default function CalendarGrid({ days, events, availability, draftEvent, onDragCreate, onDraftUpdate, onDraftDelete, onSetAvailability, onDeleteEvent, onDeleteAvailability, onUpdateEvent, onUpdateAvailability, onEditEvent, peopleOverlays }) {
  const scrollRef = useRef(null);
  const gridRef = useRef(null);
  const today = new Date();
  const [slotHeight, setSlotHeight] = useState(DEFAULT_SLOT_HEIGHT);

  // ── Lifted move state ──────────────────────────────────────────────────
  const [movingBlock, setMovingBlock] = useState(null);
  // { type:'event'|'avail', id, originalDate, originalStart, duration, title, color, status, currentDate, currentStart }
  const [movePrompt, setMovePrompt] = useState(null);
  // { x, y, type, id, date, start, duration, title, color, status }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.clientHeight;
      if (h > 0) setSlotHeight(h / VISIBLE_HOURS);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = DEFAULT_SCROLL_HOUR * slotHeight;
    }
  }, [days[0]?.iso, slotHeight]);

  const xToDay = useCallback((clientX) => {
    if (!gridRef.current) return null;
    const rect = gridRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const colWidth = rect.width / days.length;
    const colIndex = Math.max(0, Math.min(days.length - 1, Math.floor(x / colWidth)));
    return days[colIndex]?.iso ?? null;
  }, [days]);

  const snapToQuarter = useCallback((py) => {
    const raw = py / slotHeight;
    return Math.max(0, Math.min(24, Math.round(raw * 4) / 4));
  }, [slotHeight]);

  // Close move prompt on outside click or Escape
  useEffect(() => {
    if (!movePrompt) return;
    const close = () => setMovePrompt(null);
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("mousedown", close);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("mousedown", close); window.removeEventListener("keydown", onKey); };
  }, [movePrompt]);

  // ── Block move handler (called by EventBlock / AvailBlock) ────────────
  const handleBlockMoveStart = useCallback((info, e) => {
    // info: { type, id, date, start, duration, title, color, status }
    if (e.button !== 0) return; // ignore right-clicks
    e.stopPropagation();
    e.preventDefault();
    setMovePrompt(null);

    // Find the column element for the block's day to calculate grab offset
    const colIndex = days.findIndex((d) => d.iso === info.date);
    const gridRect = gridRef.current.getBoundingClientRect();
    const colTop = gridRect.top - (scrollRef.current?.scrollTop || 0) + scrollRef.current.getBoundingClientRect().top - gridRect.top;
    // Use scrollRef to get the correct Y offset
    const scrollRect = scrollRef.current.getBoundingClientRect();
    const yInGrid = e.clientY - scrollRect.top + scrollRef.current.scrollTop;
    const topPx = info.start * slotHeight;
    const grabOffset = yInGrid - topPx;

    const block = {
      ...info,
      originalDate: info.date,
      originalStart: info.start,
      currentDate: info.date,
      currentStart: info.start,
    };
    setMovingBlock(block);

    const didDrag = { current: false };

    const onMove = (e2) => {
      didDrag.current = true;
      const yInGrid2 = e2.clientY - scrollRect.top + scrollRef.current.scrollTop;
      const newStart = snapToQuarter(yInGrid2 - grabOffset);
      const clamped = Math.max(0, Math.min(24 - info.duration, newStart));
      const newDate = xToDay(e2.clientX) || info.date;
      setMovingBlock((prev) => prev && { ...prev, currentDate: newDate, currentStart: clamped });
    };

    const onUp = (e2) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      setMovingBlock(null);

      if (!didDrag.current) {
        // Click, not drag — edit for events
        if (info.type === "event") {
          onEditEvent(info.id);
        }
        return;
      }

      const yInGrid2 = e2.clientY - scrollRect.top + scrollRef.current.scrollTop;
      const finalStart = snapToQuarter(yInGrid2 - grabOffset);
      const clampedStart = Math.max(0, Math.min(24 - info.duration, finalStart));
      const finalDate = xToDay(e2.clientX) || info.date;

      if (info.type === "avail") {
        // Availability blocks move freely — no confirmation needed
        onUpdateAvailability(info.id, { start: clampedStart, date: finalDate });
      } else {
        setMovePrompt({
          x: e2.clientX,
          y: e2.clientY,
          type: info.type,
          id: info.id,
          date: finalDate,
          start: clampedStart,
          duration: info.duration,
          title: info.title,
          color: info.color,
          status: info.status,
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [days, slotHeight, snapToQuarter, xToDay, onEditEvent, onUpdateAvailability]);

  const handleConfirmMove = useCallback(() => {
    if (!movePrompt) return;
    const { type, id, date, start } = movePrompt;
    if (type === "event") {
      // Don't persist move yet — open edit with new position as overrides.
      // Move only persists if the user saves in the edit panel.
      onEditEvent(id, { start, date });
    } else {
      onUpdateAvailability(id, { start, date });
    }
    setMovePrompt(null);
  }, [movePrompt, onUpdateAvailability, onEditEvent]);

  // ── Ghost rendering helpers ───────────────────────────────────────────
  const dayIndex = movingBlock ? days.findIndex((d) => d.iso === movingBlock.currentDate) : -1;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Day headers */}
      <div className="flex shrink-0 overflow-hidden">
        <div className="w-[72px] shrink-0" />
        <div className="flex-1 flex">
          {days.map((day) => {
            const isToday = isSameDay(day.date, today);
            return (
              <div
                key={day.iso}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 border-l border-b border-gray-300 text-center min-w-0"
              >
                <span className={`text-sm uppercase ${isToday ? "text-[#10137b] font-semibold" : "text-gray-400"}`}>
                  {day.dayName}
                </span>
                {isToday ? (
                  <span className="bg-[#10137b] text-white w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold">
                    {day.dayNum}
                  </span>
                ) : (
                  <span className="text-[32px] leading-none text-black">{day.dayNum}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="shrink-0" style={{ width: scrollRef.current?.offsetWidth - scrollRef.current?.clientWidth || 0 }} />
      </div>

      {/* Scrollable time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="flex" style={{ height: slotHeight * 24 }}>
          <div className="w-[72px] shrink-0">
            {HOURS.map((hour, i) => (
              <div key={i} className="flex items-start justify-end pr-3 pt-1" style={{ height: slotHeight }}>
                <span className="text-sm text-gray-500 whitespace-nowrap">{hour}</span>
              </div>
            ))}
          </div>

          <div ref={gridRef} className="flex flex-1 min-w-0 relative">
            {days.map((day) => (
              <DayColumn
                key={day.iso}
                day={day}
                events={events}
                availability={availability}
                draftEvent={draftEvent}
                onDragCreate={onDragCreate}
                onDraftUpdate={onDraftUpdate}
                onDraftDelete={onDraftDelete}
                onSetAvailability={onSetAvailability}
                onDeleteEvent={onDeleteEvent}
                onDeleteAvailability={onDeleteAvailability}
                onUpdateAvailability={onUpdateAvailability}
                onEditEvent={onEditEvent}
                onBlockMoveStart={handleBlockMoveStart}
                movingBlock={movingBlock}
                peopleOverlays={peopleOverlays}
                gridRef={gridRef}
                days={days}
                xToDay={xToDay}
                slotHeight={slotHeight}
              />
            ))}

            {/* Ghost block while dragging across days */}
            {movingBlock && dayIndex >= 0 && (() => {
              const colPct = 100 / days.length;
              const ghostLeft = `${dayIndex * colPct}%`;
              const ghostWidth = `${colPct}%`;
              const ghostTop = movingBlock.currentStart * slotHeight;
              const ghostHeight = movingBlock.duration * slotHeight;

              if (movingBlock.type === "event") {
                const c = EV_COLORS[movingBlock.color] || EV_COLORS.blue;
                return (
                  <div
                    className="absolute pointer-events-none opacity-50"
                    style={{
                      left: ghostLeft,
                      width: ghostWidth,
                      top: ghostTop,
                      height: Math.max(ghostHeight, 20),
                      padding: "4px 9px",
                      background: c.bg,
                      borderLeft: `3px solid ${c.border}`,
                      borderRight: `1px solid ${c.border}`,
                      borderTop: `1px solid ${c.border}`,
                      borderBottom: `1px solid ${c.border}`,
                      zIndex: 25,
                    }}
                  >
                    <span className="text-xs font-bold leading-tight block" style={{ color: c.text }}>
                      {movingBlock.title}
                    </span>
                    {ghostHeight >= 40 && (
                      <span className="text-[11px] leading-tight block mt-0.5" style={{ color: c.text, opacity: 0.7 }}>
                        {formatTime(movingBlock.currentStart)} – {formatTime(movingBlock.currentStart + movingBlock.duration)}
                      </span>
                    )}
                  </div>
                );
              } else {
                const s = AVAIL_STYLES[movingBlock.status];
                return (
                  <div
                    className="absolute pointer-events-none opacity-50"
                    style={{
                      left: ghostLeft,
                      width: ghostWidth,
                      top: ghostTop,
                      height: Math.max(ghostHeight, 20),
                      padding: "4px 9px",
                      background: s.bg,
                      borderLeft: `3px dashed ${s.border}`,
                      borderRight: `1px solid ${s.border}`,
                      borderTop: `1px solid ${s.border}`,
                      borderBottom: `1px solid ${s.border}`,
                      zIndex: 25,
                    }}
                  >
                    <span className="text-xs font-bold leading-tight block" style={{ color: s.text }}>
                      {s.label}
                    </span>
                    {ghostHeight >= 40 && (
                      <span className="text-[11px] leading-tight block mt-0.5" style={{ color: s.text, opacity: 0.7 }}>
                        {formatTime(movingBlock.currentStart)} – {formatTime(movingBlock.currentStart + movingBlock.duration)}
                      </span>
                    )}
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>

      {/* Move confirmation prompt (fixed position, above everything) */}
      {movePrompt && (() => {
        const isEvent = movePrompt.type === "event";
        const c = isEvent ? (EV_COLORS[movePrompt.color] || EV_COLORS.blue) : AVAIL_STYLES[movePrompt.status];
        const label = isEvent ? movePrompt.title : c.label;
        return (
          <div
            className="fixed bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 min-w-[200px]"
            style={{ left: movePrompt.x, top: movePrompt.y }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-1.5 text-xs font-medium text-gray-400">Move "{label}"?</div>
            <button
              className="w-full px-4 py-2 text-sm text-left text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer flex items-center gap-2"
              onClick={handleConfirmMove}
            >
              <span className="size-2.5 rounded-full" style={{ background: c.border }} />
              {isEvent ? "Yes, move & edit" : "Yes, move"}
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-left text-gray-500 hover:bg-gray-50 cursor-pointer"
              onClick={() => setMovePrompt(null)}
            >
              Cancel
            </button>
          </div>
        );
      })()}
    </div>
  );
}

// ── DayColumn ───────────────────────────────────────────────────────────────
function DayColumn({ day, events, availability, draftEvent, onDragCreate, onDraftUpdate, onDraftDelete, onSetAvailability, onDeleteEvent, onDeleteAvailability, onUpdateAvailability, onEditEvent, onBlockMoveStart, movingBlock, peopleOverlays, gridRef, days, xToDay, slotHeight }) {
  const colRef = useRef(null);
  const [dragPreview, setDragPreview] = useState(null);
  const [dragMenu, setDragMenu] = useState(null);
  const [pendingBlock, setPendingBlock] = useState(null);
  const dragging = useRef(false);

  const dayEvents = events.filter((ev) => ev.date === day.iso);
  const dayAvail = availability.filter((a) => a.date === day.iso);
  const hasDraft = draftEvent && draftEvent.date === day.iso && !draftEvent._hidden;

  // Compute shared availability for this day
  // Total = you + selected people. Everyone assumed free except where busy.
  // Your events and "busy" availability blocks count as your busy time.
  const totalSelected = (peopleOverlays?.length || 0) + (peopleOverlays?.length ? 1 : 0); // +1 for you
  const sharedSlots = (() => {
    if (!peopleOverlays?.length) return [];
    const freeCount = new Array(96).fill(totalSelected);

    // Subtract YOUR busy time: all events + "busy" availability blocks
    for (const ev of dayEvents) {
      const startSlot = Math.round(ev.start * 4);
      const endSlot = Math.round((ev.start + ev.duration) * 4);
      for (let s = startSlot; s < endSlot && s < 96; s++) {
        freeCount[s]--;
      }
    }
    for (const a of dayAvail) {
      if (a.status !== "busy") continue;
      const startSlot = Math.round(a.start * 4);
      const endSlot = Math.round((a.start + a.duration) * 4);
      for (let s = startSlot; s < endSlot && s < 96; s++) {
        freeCount[s] = Math.max(0, freeCount[s] - 1);
      }
    }

    // Subtract each selected person's busy blocks
    for (const person of peopleOverlays) {
      for (const a of person.availability) {
        if (a.date !== day.iso || a.status !== "busy") continue;
        const startSlot = Math.round(a.start * 4);
        const endSlot = Math.round((a.start + a.duration) * 4);
        for (let s = startSlot; s < endSlot && s < 96; s++) {
          freeCount[s]--;
        }
      }
    }

    // Show slots where at least 2 people are free, intensity scales with count
    const ranges = [];
    let i = 0;
    while (i < 96) {
      if (freeCount[i] >= 2) {
        const count = freeCount[i];
        const rangeStart = i;
        while (i < 96 && freeCount[i] === count) i++;
        ranges.push({ start: rangeStart / 4, duration: (i - rangeStart) / 4, count });
      } else {
        i++;
      }
    }
    return ranges;
  })();

  // Dim original block if it's being moved
  const movingEventId = movingBlock?.type === "event" ? movingBlock.id : null;
  const movingAvailId = movingBlock?.type === "avail" ? movingBlock.id : null;

  // Build layout for overlapping blocks
  const previewStart = dragPreview ? Math.min(dragPreview.startHour, dragPreview.endHour) : 0;
  const previewDuration = dragPreview ? Math.abs(dragPreview.endHour - dragPreview.startHour) : 0;

  const allBlocks = [
    ...dayAvail.map((a) => ({ _key: `av-${a.id}`, start: a.start, duration: a.duration })),
    ...dayEvents.map((ev) => ({ _key: `ev-${ev.id}`, start: ev.start, duration: ev.duration })),
    ...(hasDraft ? [{ _key: "draft", start: draftEvent.start, duration: draftEvent.duration }] : []),
    ...(dragPreview && previewDuration >= 0.25 ? [{ _key: "preview", start: previewStart, duration: previewDuration }] : []),
    ...(pendingBlock ? [{ _key: "pending", start: pendingBlock.start, duration: pendingBlock.duration }] : []),
  ];
  const layout = layoutBlocks(allBlocks);

  const snapToQuarter = useCallback((py) => {
    const raw = py / slotHeight;
    return Math.max(0, Math.min(24, Math.round(raw * 4) / 4));
  }, [slotHeight]);

  const yToHour = useCallback((clientY) => {
    const rect = colRef.current.getBoundingClientRect();
    return snapToQuarter(clientY - rect.top);
  }, [snapToQuarter]);

  useEffect(() => {
    if (!dragMenu) return;
    const close = () => { setDragMenu(null); setPendingBlock(null); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("mousedown", close);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("mousedown", close); window.removeEventListener("keydown", onKey); };
  }, [dragMenu]);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (dragMenu) {
      setDragMenu(null);
      setPendingBlock(null);
      return;
    }
    const hour = yToHour(e.clientY);
    dragging.current = true;
    const isEditing = draftEvent?._editId;
    if (isEditing) {
      onDraftDelete();
      return;
    }
    if (draftEvent) {
      onDraftUpdate({ ...draftEvent, _hidden: true });
    }
    setDragPreview({ startHour: hour, endHour: hour + 0.25 });

    const onMove = (e2) => {
      if (!dragging.current) return;
      const hour2 = yToHour(e2.clientY);
      setDragPreview((prev) => prev && {
        ...prev,
        endHour: Math.max(hour2, prev.startHour + 0.25),
      });
    };

    const onUp = (e2) => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      const hour2 = yToHour(e2.clientY);
      const finalEnd = Math.max(hour2, hour + 0.25);
      const start = Math.min(hour, finalEnd);
      const end = Math.max(hour, finalEnd);

      if (end - start >= 0.25) {
        if (draftEvent && !isEditing) {
          const { _hidden, ...rest } = draftEvent;
          onDraftUpdate({ ...rest, date: day.iso, start, duration: end - start });
        } else {
          setPendingBlock({ start, duration: end - start });
          setDragMenu({ x: e2.clientX, y: e2.clientY, date: day.iso, start, duration: end - start });
        }
      }
      setDragPreview(null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [day.iso, yToHour, draftEvent, onDraftUpdate, dragMenu]);

  const handleMenuChoice = useCallback((choice) => {
    if (!dragMenu) return;
    const { date, start, duration } = dragMenu;
    setDragMenu(null);
    setPendingBlock(null);
    if (choice === "meeting") {
      onDragCreate({ date, start, duration });
    } else {
      onSetAvailability({ date, start, duration, status: choice });
    }
  }, [dragMenu, onDragCreate, onSetAvailability]);

  const hasPeopleOverlay = totalSelected > 0;

  return (
    <div ref={colRef} className="flex-1 relative cursor-crosshair select-none min-w-0" onMouseDown={handleMouseDown}>
      {HOURS.map((_, i) => (
        <div key={i} className="border-l border-b border-gray-200" style={{ height: slotHeight }}>
          <div className="border-b border-gray-100/50" style={{ height: slotHeight / 4 }} />
          <div className="border-b border-gray-100/50" style={{ height: slotHeight / 4 }} />
          <div className="border-b border-gray-100/50" style={{ height: slotHeight / 4 }} />
        </div>
      ))}

      {/* Shared availability highlights */}
      {sharedSlots.map((slot, i) => {
        const ratio = slot.count / totalSelected;
        // Linear opacity: 2/7 ≈ 0.29, 7/7 = 1.0 — dark green at full
        const opacity = ratio;
        return (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: slot.start * slotHeight,
              height: slot.duration * slotHeight,
              left: 0,
              right: 0,
              background: "#166534",
              opacity,
              zIndex: 1,
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "#14532d" }} />
            {slot.duration * slotHeight >= 28 && (
              <span className="text-[11px] font-bold leading-tight block px-2 pt-1" style={{ color: "#fff" }}>
                {slot.count === totalSelected ? "All free" : `${slot.count}/${totalSelected}`}
              </span>
            )}
          </div>
        );
      })}

      {dayAvail.map((a) => (
        <AvailBlock
          key={a.id}
          avail={a}
          slotHeight={slotHeight}
          layout={layout[`av-${a.id}`]}
          onDelete={() => onDeleteAvailability(a.id)}
          onChangeStatus={(status) => onUpdateAvailability(a.id, { status })}
          onUpdate={(updates) => onUpdateAvailability(a.id, updates)}
          onMoveStart={(e) => onBlockMoveStart({ type: "avail", id: a.id, date: a.date, start: a.start, duration: a.duration, status: a.status }, e)}
          isMoving={movingAvailId === a.id}
          dimmed={hasPeopleOverlay}
          colRef={colRef}
          snapToQuarter={snapToQuarter}
        />
      ))}

      {dayEvents.map((ev) => (
        <EventBlock
          key={ev.id}
          ev={ev}
          slotHeight={slotHeight}
          layout={layout[`ev-${ev.id}`]}
          onDelete={() => onDeleteEvent(ev.id)}
          onSetStatus={(status) => onSetAvailability({ date: ev.date, start: ev.start, duration: ev.duration, status })}
          onEdit={() => onEditEvent(ev.id)}
          onMoveStart={(e) => onBlockMoveStart({ type: "event", id: ev.id, date: ev.date, start: ev.start, duration: ev.duration, title: ev.title, color: ev.color }, e)}
          isMoving={movingEventId === ev.id}
          dimmed={hasPeopleOverlay}
        />
      ))}

      {hasDraft && (
        <DraftEventBlock
          draft={draftEvent}
          colRef={colRef}
          snapToQuarter={snapToQuarter}
          onDraftUpdate={onDraftUpdate}
          onDraftDelete={onDraftDelete}
          xToDay={xToDay}
          slotHeight={slotHeight}
          layout={layout["draft"]}
        />
      )}

      {dragPreview && previewDuration >= 0.25 && (
        <div
          className="absolute overflow-hidden pointer-events-none"
          style={{
            top: previewStart * slotHeight,
            height: previewDuration * slotHeight,
            ...getLayoutStyle(layout["preview"]),
            padding: "4px 6px",
            background: "#F3F4F6",
            border: "1px dashed #D1D5DB",
            zIndex: 10,
          }}
        >
          <span className="text-xs font-bold leading-tight block text-gray-500">
            {formatTime(previewStart)} – {formatTime(previewStart + previewDuration)}
          </span>
        </div>
      )}

      {pendingBlock && (
        <div
          className="absolute overflow-hidden pointer-events-none"
          style={{
            top: pendingBlock.start * slotHeight,
            height: pendingBlock.duration * slotHeight,
            ...getLayoutStyle(layout["pending"]),
            padding: "4px 6px",
            background: "#F3F4F6",
            border: "1px dashed #D1D5DB",
            zIndex: 10,
          }}
        >
          <span className="text-xs font-bold leading-tight block text-gray-500">
            {formatTime(pendingBlock.start)} – {formatTime(pendingBlock.start + pendingBlock.duration)}
          </span>
        </div>
      )}

      {dragMenu && (
        <div
          className="fixed bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 min-w-[180px]"
          style={{ left: dragMenu.x, top: dragMenu.y }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button className="w-full px-4 py-2 text-sm text-left text-gray-800 font-semibold hover:bg-gray-50 cursor-pointer flex items-center gap-2" onClick={() => handleMenuChoice("meeting")}>
            <span className="size-2.5 rounded-full bg-blue-500" />
            Create meeting
          </button>
          <div className="h-px bg-gray-100 mx-2 my-1" />
          <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer flex items-center gap-2" style={{ color: AVAIL_STYLES.free.text }} onClick={() => handleMenuChoice("free")}>
            <span className="size-2.5 rounded-full" style={{ background: AVAIL_STYLES.free.border }} />
            Set as Free
          </button>
          <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer flex items-center gap-2" style={{ color: AVAIL_STYLES.tentative.text }} onClick={() => handleMenuChoice("tentative")}>
            <span className="size-2.5 rounded-full" style={{ background: AVAIL_STYLES.tentative.border }} />
            Set as Tentative
          </button>
          <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer flex items-center gap-2" style={{ color: AVAIL_STYLES.busy.text }} onClick={() => handleMenuChoice("busy")}>
            <span className="size-2.5 rounded-full" style={{ background: AVAIL_STYLES.busy.border }} />
            Set as Busy
          </button>
        </div>
      )}
    </div>
  );
}

// ── Context menu hook ───────────────────────────────────────────────────────
function useContextMenu() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [menu]);

  const onContextMenu = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({ x: e.clientX, y: e.clientY });
  }, []);

  return { menu, setMenu, onContextMenu };
}

// ── AvailBlock ──────────────────────────────────────────────────────────────
function AvailBlock({ avail, slotHeight, layout, onDelete, onChangeStatus, onUpdate, onMoveStart, isMoving, dimmed, colRef, snapToQuarter }) {
  const s = AVAIL_STYLES[avail.status];
  const topPx = avail.start * slotHeight;
  const heightPx = avail.duration * slotHeight;
  const { menu, setMenu, onContextMenu } = useContextMenu();

  const yToHour = useCallback((clientY) => {
    const rect = colRef.current.getBoundingClientRect();
    return snapToQuarter(clientY - rect.top);
  }, [colRef, snapToQuarter]);

  const handleResizeTop = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    const endHour = avail.start + avail.duration;
    const onMove = (e2) => {
      const newStart = yToHour(e2.clientY);
      const clamped = Math.max(0, Math.min(endHour - 0.25, newStart));
      onUpdate({ start: clamped, duration: endHour - clamped });
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [avail, yToHour, onUpdate]);

  const handleResizeBottom = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    const onMove = (e2) => {
      const endHour = yToHour(e2.clientY);
      const newDuration = Math.max(0.25, Math.min(24 - avail.start, endHour - avail.start));
      onUpdate({ duration: newDuration });
    };
    const onUp = () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [avail, yToHour, onUpdate]);

  return (
    <>
      <div
        className={`absolute overflow-visible cursor-default ${isMoving ? "opacity-30" : dimmed ? "opacity-40" : ""}`}
        onContextMenu={onContextMenu}
        style={{
          top: topPx,
          height: Math.max(heightPx, 20),
          ...getLayoutStyle(layout),
          padding: "4px 6px",
          background: s.bg,
          borderLeft: `3px dashed ${s.border}`,
          zIndex: 2,
        }}
      >
        <div className="absolute left-0 right-0 cursor-row-resize" style={{ top: -RESIZE_EDGE, height: RESIZE_EDGE * 2, zIndex: 1 }} onMouseDown={handleResizeTop} />
        <div className="absolute left-0 right-0 cursor-default" style={{ top: RESIZE_EDGE, bottom: RESIZE_EDGE, zIndex: 0 }} onMouseDown={onMoveStart} />

        <span className="text-xs font-bold leading-tight block pointer-events-none" style={{ color: s.text }}>
          {s.label}
        </span>
        {heightPx >= 40 && (
          <span className="text-[11px] leading-tight block mt-0.5 pointer-events-none" style={{ color: s.text, opacity: 0.7 }}>
            {formatTime(avail.start)} – {formatTime(avail.start + avail.duration)}
          </span>
        )}

        <div className="absolute left-0 right-0 cursor-row-resize" style={{ bottom: -RESIZE_EDGE, height: RESIZE_EDGE * 2, zIndex: 1 }} onMouseDown={handleResizeBottom} />
      </div>
      {menu && (
        <div className="fixed bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 min-w-[190px]" style={{ left: menu.x, top: menu.y }} onMouseDown={(e) => e.stopPropagation()}>
          <div className="px-4 py-1 text-xs font-medium text-gray-400">Change status</div>
          {["free", "tentative", "busy"].filter((st) => st !== avail.status).map((status) => {
            const as = AVAIL_STYLES[status];
            return (
              <button key={status} className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer flex items-center gap-2" style={{ color: as.text }} onClick={() => { setMenu(null); onChangeStatus(status); }}>
                <span className="size-2.5 rounded-full" style={{ background: as.border }} />
                {as.label}
              </button>
            );
          })}
          <div className="h-px bg-gray-100 mx-2 my-1" />
          <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 cursor-pointer" onClick={() => { setMenu(null); onDelete(); }}>
            Delete
          </button>
        </div>
      )}
    </>
  );
}

// ── EventBlock ──────────────────────────────────────────────────────────────
function EventBlock({ ev, slotHeight, layout, onDelete, onSetStatus, onEdit, onMoveStart, isMoving, dimmed }) {
  const c = EV_COLORS[ev.color] || EV_COLORS.blue;
  const topPx = ev.start * slotHeight;
  const heightPx = ev.duration * slotHeight;
  const { menu, setMenu, onContextMenu } = useContextMenu();

  return (
    <>
      <div
        className={`absolute overflow-hidden cursor-pointer hover:brightness-95 transition-all ${isMoving ? "opacity-30" : dimmed ? "opacity-40" : ""}`}
        onMouseDown={onMoveStart}
        onContextMenu={onContextMenu}
        style={{
          top: topPx,
          height: Math.max(heightPx, 20),
          ...getLayoutStyle(layout),
          padding: "4px 6px",
          background: c.bg,
          borderLeft: `3px solid ${c.border}`,
          borderRight: `1px solid ${c.border}`,
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          zIndex: 3,
        }}
      >
        <span className="text-xs font-bold leading-tight block pointer-events-none" style={{ color: c.text }}>
          {ev.title}
        </span>
        {heightPx >= 40 && (
          <span className="text-[11px] leading-tight block mt-0.5 pointer-events-none" style={{ color: c.text, opacity: 0.7 }}>
            {ev.timeLabel}
          </span>
        )}
      </div>
      {menu && (
        <div className="fixed bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 min-w-[190px]" style={{ left: menu.x, top: menu.y }} onMouseDown={(e) => e.stopPropagation()}>
          <div className="px-4 py-1 text-xs font-medium text-gray-400">Override with availability</div>
          {["free", "tentative"].map((status) => {
            const as = AVAIL_STYLES[status];
            return (
              <button key={status} className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer flex items-center gap-2" style={{ color: as.text }} onClick={() => { setMenu(null); onSetStatus(status); }}>
                <span className="size-2.5 rounded-full" style={{ background: as.border }} />
                {as.label}
              </button>
            );
          })}
          <div className="h-px bg-gray-100 mx-2 my-1" />
          <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700" onClick={() => { setMenu(null); onEdit(); }}>
            Edit event
          </button>
          <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 cursor-pointer" onClick={() => { setMenu(null); onDelete(); }}>
            Delete event
          </button>
        </div>
      )}
    </>
  );
}

// ── DraftEventBlock ─────────────────────────────────────────────────────────
function DraftEventBlock({ draft, colRef, snapToQuarter, onDraftUpdate, onDraftDelete, xToDay, slotHeight, layout }) {
  const topPx = draft.start * slotHeight;
  const heightPx = draft.duration * slotHeight;
  const { menu, setMenu, onContextMenu } = useContextMenu();

  const c = EV_COLORS[draft.color] || EV_COLORS.blue;

  const yToHour = useCallback((clientY) => {
    const rect = colRef.current.getBoundingClientRect();
    return snapToQuarter(clientY - rect.top);
  }, [colRef, snapToQuarter]);

  const handleMoveDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    const grabOffset = e.clientY - colRef.current.getBoundingClientRect().top - topPx;

    const onMove = (e2) => {
      const rect = colRef.current.getBoundingClientRect();
      const newStart = snapToQuarter(e2.clientY - rect.top - grabOffset);
      const clamped = Math.max(0, Math.min(24 - draft.duration, newStart));
      const newDate = xToDay(e2.clientX) || draft.date;
      onDraftUpdate({ ...draft, start: clamped, date: newDate });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [draft, colRef, snapToQuarter, onDraftUpdate, topPx, xToDay]);

  const handleResizeTop = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    const endHour = draft.start + draft.duration;

    const onMove = (e2) => {
      const newStart = yToHour(e2.clientY);
      const clampedStart = Math.max(0, Math.min(endHour - 0.25, newStart));
      onDraftUpdate({ ...draft, start: clampedStart, duration: endHour - clampedStart });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [draft, yToHour, onDraftUpdate]);

  const handleResizeBottom = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    const onMove = (e2) => {
      const endHour = yToHour(e2.clientY);
      const newDuration = Math.max(0.25, endHour - draft.start);
      onDraftUpdate({ ...draft, duration: Math.min(newDuration, 24 - draft.start) });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [draft, yToHour, onDraftUpdate]);

  return (
    <>
      <div
        className="absolute overflow-visible animate-draft-pulse"
        onContextMenu={onContextMenu}
        style={{
          top: topPx,
          height: Math.max(heightPx, 20),
          ...getLayoutStyle(layout),
          padding: "4px 6px",
          background: c.bg,
          borderLeft: `3px solid ${c.border}`,
          borderRight: `1px solid ${c.border}`,
          borderTop: `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          zIndex: 15,
        }}
      >
        <div className="absolute left-0 right-0 cursor-row-resize" style={{ top: -RESIZE_EDGE, height: RESIZE_EDGE * 2, zIndex: 1 }} onMouseDown={handleResizeTop} />
        <div className="absolute left-0 right-0 cursor-default" style={{ top: RESIZE_EDGE, bottom: RESIZE_EDGE, zIndex: 0 }} onMouseDown={handleMoveDown} />

        <span className="text-xs font-bold leading-tight block pointer-events-none relative" style={{ color: c.text }}>
          {draft.title || "New meeting"}
        </span>
        {heightPx >= 40 && (
          <span className="text-[11px] leading-tight block mt-0.5 pointer-events-none relative" style={{ color: c.text, opacity: 0.7 }}>
            {formatTime(draft.start)} – {formatTime(draft.start + draft.duration)}
          </span>
        )}

        <div className="absolute left-0 right-0 cursor-row-resize" style={{ bottom: -RESIZE_EDGE, height: RESIZE_EDGE * 2, zIndex: 1 }} onMouseDown={handleResizeBottom} />
      </div>

      {menu && (
        <div className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50" style={{ left: menu.x, top: menu.y }} onMouseDown={(e) => e.stopPropagation()}>
          <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 cursor-pointer" onClick={() => { setMenu(null); onDraftDelete(); }}>
            Delete
          </button>
        </div>
      )}
    </>
  );
}
