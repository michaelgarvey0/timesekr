import { Users, Plus } from "lucide-react";

export default function NavBar({ activeNav, onNavChange, onCreateMeeting, inviteCount, notifCount }) {
  return (
    <nav className="flex items-center justify-between shrink-0">
      <div className="flex items-center gap-6">
        <span className="text-white font-bold text-lg tracking-tight">
          timesēkr
        </span>

        <div className="w-px h-[30px] bg-white/30" />

        <div className="flex items-center gap-3">
          <NavButton active={activeNav === "meetings"} onClick={() => onNavChange("meetings")}>
            My meetings
          </NavButton>
          <NavButton active={activeNav === "invitations"} onClick={() => onNavChange("invitations")} badge={inviteCount}>
            Invitations
          </NavButton>
          <NavButton active={activeNav === "notifications"} onClick={() => onNavChange("notifications")} badge={notifCount}>
            Notifications
          </NavButton>
        </div>

        <div className="w-px h-[30px] bg-white/30" />

        <NavButton active={activeNav === "people"} onClick={() => onNavChange("people")}>
          <Users size={18} />
          People
        </NavButton>
      </div>

      <button
        onClick={onCreateMeeting}
        className="flex items-center gap-1 h-[42px] px-4 rounded-xl border-none cursor-pointer text-base text-white font-bold bg-gradient-to-r from-[#e04200] to-[#e77f00] hover:brightness-110 transition-all"
      >
        <Plus size={18} />
        Create meeting
      </button>
    </nav>
  );
}

function NavButton({ children, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 h-[42px] px-5 rounded-xl border-none cursor-pointer text-base transition-all ${
        active
          ? "bg-white text-[#10137b] font-bold"
          : "bg-white/20 text-white hover:bg-white/30"
      }`}
    >
      {children}
      {badge > 0 && (
        <span className="flex items-center justify-center size-6 rounded-xl text-white text-sm font-normal bg-gradient-to-r from-[#e04200] to-[#e77f00]">
          {badge}
        </span>
      )}
    </button>
  );
}
