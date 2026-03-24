import { CalendarDays, ChevronRight, Plus, X, Mail, Bell, Users } from "lucide-react";
import { formatTime } from "../data/events";
import { formatDateShort } from "../lib/dates";

// ── Meetings Panel ──────────────────────────────────────────────────────────

export function MeetingsSidebar({ meetings, onClose }) {
  return (
    <SidebarShell title="My meetings" icon={<CalendarDays size={24} className="text-gray-800" />} onClose={onClose}>
      {meetings.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-8">
          No meetings yet. Click "Create meeting" or drag on the calendar to get started.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {meetings.map((m) => (
            <div key={m.id}>
              <div className="h-px bg-gray-200 w-full" />
              <div className="flex items-start gap-2.5 pt-3 cursor-pointer">
                <div className="w-2.5 h-6 rounded-full mt-0.5 shrink-0" style={{ background: m.dotColor }} />
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2.5">
                    <span className="flex-1 text-base font-semibold text-black">{m.title}</span>
                    <ChevronRight size={20} className="text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-500">
                    {m.dateLabel} · {formatTime(m.start)} – {formatTime(m.start + m.duration)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidebarShell>
  );
}

// ── Invitations Panel ───────────────────────────────────────────────────────

export function InvitationsSidebar({ onClose }) {
  return (
    <SidebarShell title="Invitations" icon={<Mail size={24} className="text-gray-800" />} onClose={onClose}>
      <div className="text-center text-gray-400 text-base py-8">
        No pending invitations.
      </div>
    </SidebarShell>
  );
}

// ── Notifications Panel ─────────────────────────────────────────────────────

export function NotificationsSidebar({ onClose }) {
  return (
    <SidebarShell title="Notifications" icon={<Bell size={24} className="text-gray-800" />} onClose={onClose}>
      <div className="text-center text-gray-400 text-base py-8">
        You're all caught up.
      </div>
    </SidebarShell>
  );
}

// ── People Panel ────────────────────────────────────────────────────────────

export function PeopleSidebar({ onClose, people, selectedPeople, onTogglePerson }) {
  return (
    <SidebarShell title="People" icon={<Users size={24} className="text-gray-800" />} onClose={onClose}>
      <p className="text-sm text-gray-500 -mt-2 mb-1">
        Toggle people to see their availability on the calendar.
      </p>
      <div className="flex flex-col gap-1">
        {people.map((p) => {
          const isSelected = selectedPeople.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => onTogglePerson(p.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border transition-all text-left ${
                isSelected
                  ? "border-gray-300 bg-gray-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
            >
              <div
                className="size-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ background: p.color }}
              >
                {p.avatar}
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">{p.name}</span>
              <div
                className={`size-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  isSelected ? "border-[#10137b] bg-[#10137b]" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </SidebarShell>
  );
}

// ── Create Meeting Panel ────────────────────────────────────────────────────

export function CreateMeetingSidebar({ onClose, onSubmit, prefill, onDraftUpdate }) {
  const isEditing = !!prefill?._editId;
  return (
    <SidebarShell title={isEditing ? "Edit meeting" : "Create meeting"} icon={<Plus size={24} className="text-gray-800" />} onClose={onClose}>
      <CreateMeetingForm onSubmit={onSubmit} onClose={onClose} prefill={prefill} onDraftUpdate={onDraftUpdate} isEditing={isEditing} />
    </SidebarShell>
  );
}

const HOUR_OPTIONS = (() => {
  const opts = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const val = h + m / 60;
      opts.push({ value: val, label: formatTime(val) });
    }
  }
  return opts;
})();

const DURATION_OPTIONS = [
  { value: 0.25, label: "15 min" },
  { value: 0.5, label: "30 min" },
  { value: 0.75, label: "45 min" },
  { value: 1, label: "1 hour" },
  { value: 1.5, label: "1.5 hours" },
  { value: 2, label: "2 hours" },
  { value: 3, label: "3 hours" },
  { value: 4, label: "4 hours" },
];

const COLORS = ["blue", "teal", "purple", "amber", "gray", "red", "orange"];
const COLOR_HEX = { blue: "#3B82F6", teal: "#14B8A6", purple: "#8B5CF6", amber: "#F59E0B", gray: "#9CA3AF", red: "#EF4444", orange: "#F97316" };
const COLOR_LABELS = { blue: "Blue", teal: "Teal", purple: "Purple", amber: "Amber", gray: "Gray", red: "Red", orange: "Orange" };

function CreateMeetingForm({ onSubmit, onClose, prefill, onDraftUpdate, isEditing }) {
  const title = prefill?.title || "";
  const date = prefill?.date || new Date().toISOString().slice(0, 10);
  const start = prefill?.start ?? 9;
  const duration = prefill?.duration ?? 1;
  const color = prefill?.color || "blue";

  const update = (fields) => onDraftUpdate({ ...prefill, title, date, start, duration, color, ...fields });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), date, start, duration, color });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Title</label>
        <input
          value={title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="Meeting title"
          required
          autoFocus
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-base bg-gray-50 outline-none text-gray-900 font-medium focus:border-[#10137b] focus:border-2 focus:px-[11px] focus:py-[9px]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => update({ date: e.target.value })}
          required
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-base bg-gray-50 outline-none text-gray-900 focus:border-[#10137b] focus:border-2 focus:px-[11px] focus:py-[9px]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Start time</label>
        <select
          value={start}
          onChange={(e) => update({ start: parseFloat(e.target.value) })}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-base bg-gray-50 outline-none text-gray-900 focus:border-[#10137b] focus:border-2 focus:px-[11px] focus:py-[9px]"
        >
          {HOUR_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Duration</label>
        <select
          value={duration}
          onChange={(e) => update({ duration: parseFloat(e.target.value) })}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-base bg-gray-50 outline-none text-gray-900 focus:border-[#10137b] focus:border-2 focus:px-[11px] focus:py-[9px]"
        >
          {DURATION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Color</label>
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <label key={c} className="cursor-pointer" title={COLOR_LABELS[c]}>
              <input
                type="radio"
                name="color"
                value={c}
                checked={c === color}
                onChange={() => update({ color: c })}
                className="sr-only peer"
              />
              <div
                className="size-8 rounded-full border-2 border-transparent peer-checked:border-gray-800 peer-checked:scale-110 transition-all"
                style={{ background: COLOR_HEX[c] }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 h-[42px] rounded-xl border border-gray-200 bg-white cursor-pointer text-base text-gray-700 hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-[2] h-[42px] rounded-xl border-none cursor-pointer text-base text-white font-bold bg-gradient-to-r from-[#e04200] to-[#e77f00] hover:brightness-110 transition-all"
        >
          {isEditing ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}

// ── Shell ────────────────────────────────────────────────────────────────────

function SidebarShell({ title, icon, onClose, children }) {
  return (
    <div className="w-full h-full bg-white border border-gray-300 rounded-[20px] p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          {icon}
          <h2 className="text-xl font-semibold text-gray-800 m-0">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="size-8 rounded-lg border border-gray-200 bg-white cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all"
        >
          <X size={16} />
        </button>
      </div>
      {children}
    </div>
  );
}
