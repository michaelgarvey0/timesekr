export const EV_COLORS = {
  blue: { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF" },
  teal: { bg: "#ECFDF5", border: "#A7F3D0", text: "#065F46" },
  amber: { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E" },
  purple: { bg: "#F5F3FF", border: "#DDD6FE", text: "#4C1D95" },
  gray: { bg: "#F9FAFB", border: "#E5E7EB", text: "#374151" },
  red: { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B" },
  orange: { bg: "#FFF7ED", border: "#FED7AA", text: "#9A3412" },
};

export const COLOR_OPTIONS = Object.keys(EV_COLORS);

// 24 hours, midnight to midnight
export const HOURS = Array.from({ length: 24 }, (_, i) => {
  if (i === 0) return "12 AM";
  if (i < 12) return `${i} AM`;
  if (i === 12) return "12 PM";
  return `${i - 12} PM`;
});

export const DEFAULT_SLOT_HEIGHT = 60; // fallback px per hour
export const DEFAULT_SCROLL_HOUR = 8; // scroll to 8 AM on load
export const VISIBLE_HOURS = 10; // 8 AM to 6 PM

export const AVAIL_STYLES = {
  free: { bg: "#ECFDF5", border: "#6EE7B7", text: "#065F46", label: "Free" },
  tentative: { bg: "#FFFBEB", border: "#FCD34D", text: "#92400E", label: "Tentative" },
  busy: { bg: "#FEF2F2", border: "#FCA5A5", text: "#991B1B", label: "Busy" },
};

// ── Mock people with availability ───────────────────────────────────────────
export const PEOPLE_COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#EF4444"];

export function generatePeople(days) {
  const d = (i) => days[i]?.iso;
  if (!d(0)) return [];
  return [
    {
      id: "p1", name: "Sarah Chen", color: PEOPLE_COLORS[0],
      avatar: "SC",
      availability: [
        { date: d(0), start: 10, duration: 1.5, status: "busy" },
        { date: d(1), start: 8.5, duration: 1, status: "busy" },
        { date: d(1), start: 10, duration: 2, status: "busy" },
        { date: d(1), start: 14, duration: 1.5, status: "busy" },
        { date: d(2), start: 9, duration: 1, status: "busy" },
        { date: d(2), start: 11, duration: 1.5, status: "busy" },
        { date: d(2), start: 14.5, duration: 1, status: "busy" },
        { date: d(3), start: 8, duration: 1, status: "busy" },
        { date: d(3), start: 10, duration: 2, status: "busy" },
        { date: d(3), start: 13, duration: 1, status: "busy" },
        { date: d(3), start: 15, duration: 1.5, status: "busy" },
        { date: d(4), start: 9, duration: 2, status: "busy" },
        { date: d(4), start: 13, duration: 1.5, status: "busy" },
        { date: d(4), start: 15.5, duration: 1, status: "busy" },
        { date: d(5), start: 9, duration: 1, status: "busy" },
        { date: d(5), start: 11, duration: 2, status: "busy" },
        { date: d(5), start: 14, duration: 1.5, status: "busy" },
      ],
    },
    {
      id: "p2", name: "James Miller", color: PEOPLE_COLORS[1],
      avatar: "JM",
      availability: [
        { date: d(1), start: 9, duration: 1.5, status: "busy" },
        { date: d(1), start: 11.5, duration: 1, status: "busy" },
        { date: d(1), start: 14, duration: 2, status: "busy" },
        { date: d(2), start: 8, duration: 1.5, status: "busy" },
        { date: d(2), start: 10.5, duration: 1, status: "busy" },
        { date: d(2), start: 13, duration: 2, status: "busy" },
        { date: d(2), start: 16, duration: 1, status: "busy" },
        { date: d(3), start: 9, duration: 2, status: "busy" },
        { date: d(3), start: 12, duration: 1.5, status: "busy" },
        { date: d(3), start: 15, duration: 1, status: "busy" },
        { date: d(4), start: 8.5, duration: 1.5, status: "busy" },
        { date: d(4), start: 11, duration: 1, status: "busy" },
        { date: d(4), start: 14, duration: 2, status: "busy" },
        { date: d(5), start: 9, duration: 2, status: "busy" },
        { date: d(5), start: 13, duration: 1.5, status: "busy" },
        { date: d(5), start: 15.5, duration: 1, status: "busy" },
      ],
    },
    {
      id: "p3", name: "Priya Patel", color: PEOPLE_COLORS[2],
      avatar: "PP",
      availability: [
        { date: d(1), start: 8, duration: 2, status: "busy" },
        { date: d(1), start: 11, duration: 1, status: "busy" },
        { date: d(1), start: 13.5, duration: 1.5, status: "busy" },
        { date: d(1), start: 16, duration: 1, status: "busy" },
        { date: d(2), start: 9, duration: 1, status: "busy" },
        { date: d(2), start: 11, duration: 2, status: "busy" },
        { date: d(2), start: 14, duration: 1.5, status: "busy" },
        { date: d(3), start: 8.5, duration: 1, status: "busy" },
        { date: d(3), start: 10.5, duration: 1.5, status: "busy" },
        { date: d(3), start: 14, duration: 2, status: "busy" },
        { date: d(4), start: 9, duration: 1.5, status: "busy" },
        { date: d(4), start: 12, duration: 1, status: "busy" },
        { date: d(4), start: 14.5, duration: 1.5, status: "busy" },
        { date: d(5), start: 8, duration: 1.5, status: "busy" },
        { date: d(5), start: 10.5, duration: 1, status: "busy" },
        { date: d(5), start: 13, duration: 2, status: "busy" },
        { date: d(5), start: 16, duration: 1, status: "busy" },
      ],
    },
    {
      id: "p4", name: "Alex Rodriguez", color: PEOPLE_COLORS[3],
      avatar: "AR",
      availability: [
        { date: d(1), start: 9, duration: 1, status: "busy" },
        { date: d(1), start: 11, duration: 2, status: "busy" },
        { date: d(1), start: 15, duration: 1.5, status: "busy" },
        { date: d(2), start: 8.5, duration: 1.5, status: "busy" },
        { date: d(2), start: 11, duration: 1, status: "busy" },
        { date: d(2), start: 13.5, duration: 2, status: "busy" },
        { date: d(3), start: 9, duration: 1.5, status: "busy" },
        { date: d(3), start: 11.5, duration: 1, status: "busy" },
        { date: d(3), start: 14, duration: 1.5, status: "busy" },
        { date: d(3), start: 16.5, duration: 1, status: "busy" },
        { date: d(4), start: 8, duration: 1, status: "busy" },
        { date: d(4), start: 10, duration: 2, status: "busy" },
        { date: d(4), start: 13.5, duration: 1.5, status: "busy" },
        { date: d(4), start: 16, duration: 1, status: "busy" },
        { date: d(5), start: 9.5, duration: 1, status: "busy" },
        { date: d(5), start: 12, duration: 1.5, status: "busy" },
        { date: d(5), start: 15, duration: 1.5, status: "busy" },
      ],
    },
    {
      id: "p5", name: "Emily Nguyen", color: PEOPLE_COLORS[4],
      avatar: "EN",
      availability: [
        { date: d(1), start: 8, duration: 1, status: "busy" },
        { date: d(1), start: 10, duration: 1.5, status: "busy" },
        { date: d(1), start: 13, duration: 2, status: "busy" },
        { date: d(1), start: 16, duration: 1, status: "busy" },
        { date: d(2), start: 9, duration: 2, status: "busy" },
        { date: d(2), start: 12, duration: 1, status: "busy" },
        { date: d(2), start: 15, duration: 1.5, status: "busy" },
        { date: d(3), start: 8, duration: 1.5, status: "busy" },
        { date: d(3), start: 11, duration: 1, status: "busy" },
        { date: d(3), start: 13.5, duration: 1.5, status: "busy" },
        { date: d(4), start: 9.5, duration: 1.5, status: "busy" },
        { date: d(4), start: 12.5, duration: 1, status: "busy" },
        { date: d(4), start: 15, duration: 1.5, status: "busy" },
        { date: d(5), start: 8.5, duration: 1, status: "busy" },
        { date: d(5), start: 10, duration: 2, status: "busy" },
        { date: d(5), start: 14, duration: 1.5, status: "busy" },
      ],
    },
    {
      id: "p6", name: "David Kim", color: PEOPLE_COLORS[5],
      avatar: "DK",
      availability: [
        { date: d(1), start: 9, duration: 2, status: "busy" },
        { date: d(1), start: 12, duration: 1.5, status: "busy" },
        { date: d(1), start: 15, duration: 1, status: "busy" },
        { date: d(2), start: 8, duration: 1, status: "busy" },
        { date: d(2), start: 10, duration: 1.5, status: "busy" },
        { date: d(2), start: 13, duration: 2, status: "busy" },
        { date: d(2), start: 16, duration: 1, status: "busy" },
        { date: d(3), start: 9, duration: 1, status: "busy" },
        { date: d(3), start: 11, duration: 2, status: "busy" },
        { date: d(3), start: 14.5, duration: 1.5, status: "busy" },
        { date: d(4), start: 8.5, duration: 1.5, status: "busy" },
        { date: d(4), start: 11, duration: 1, status: "busy" },
        { date: d(4), start: 13, duration: 2, status: "busy" },
        { date: d(4), start: 16, duration: 1, status: "busy" },
        { date: d(5), start: 9, duration: 1.5, status: "busy" },
        { date: d(5), start: 12, duration: 1, status: "busy" },
        { date: d(5), start: 14.5, duration: 2, status: "busy" },
      ],
    },
  ];
}

export function formatTime(hour) {
  const h = Math.floor(hour);
  const m = Math.round((hour % 1) * 60);
  const ampm = h < 12 || h === 24 ? "AM" : "PM";
  const display = h === 0 || h === 24 ? 12 : h > 12 ? h - 12 : h;
  return m === 0 ? `${display} ${ampm}` : `${display}:${String(m).padStart(2, "0")} ${ampm}`;
}
