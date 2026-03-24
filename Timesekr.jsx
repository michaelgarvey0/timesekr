import { useState, useRef, useCallback } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const DAYS  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DATES = [15,16,17,18,19,20,21];
const HOURS = ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"];
const SLOT_H = 60;
const DAY_START = 8;
const DAY_END   = 18;
const HOUR_SPAN = DAY_END - DAY_START;
const PERSON_COL_W = 160;

const EVENTS = [
  { id:1,  col:1, top:1,   h:1,    color:"blue",   title:"3x Weekly Standup" },
  { id:2,  col:1, top:2,   h:1.5,  color:"teal",   title:"Weekly 1:1 · Teams" },
  { id:3,  col:1, top:5,   h:1,    color:"gray",   title:"Client – Prince A." },
  { id:4,  col:2, top:1,   h:1,    color:"blue",   title:"Client – Elizabeth S." },
  { id:5,  col:3, top:0,   h:0.75, color:"teal",   title:"Coffee chat w/ Shaun" },
  { id:6,  col:3, top:1,   h:0.6,  color:"blue",   title:"3x Weekly Standup" },
  { id:7,  col:3, top:2,   h:1,    color:"purple", title:"Meet with UNH Team 1" },
  { id:8,  col:3, top:4,   h:1.5,  color:"amber",  title:"ALL CHAPTER MEETING" },
  { id:9,  col:3, top:5.5, h:0.6,  color:"gray",   title:"Thrive Family Appt." },
  { id:10, col:4, top:2,   h:1,    color:"teal",   title:"Mark & Kiska (Timesekr)" },
  { id:11, col:4, top:2,   h:1,    color:"gray",   title:"Hold for Kiska", right:true },
  { id:12, col:4, top:6,   h:0.75, color:"gray",   title:"Private Appointment" },
  { id:13, col:5, top:1,   h:1,    color:"blue",   title:"3x Weekly Standup" },
  { id:14, col:5, top:2,   h:0.6,  color:"gray",   title:"Oil change" },
  { id:15, col:5, top:5,   h:0.75, color:"teal",   title:"Steve ↔ Heather Weekly" },
];

const EV = {
  blue:   { bg:"#EFF6FF", border:"#BFDBFE", text:"#1E40AF" },
  teal:   { bg:"#ECFDF5", border:"#A7F3D0", text:"#065F46" },
  amber:  { bg:"#FFFBEB", border:"#FDE68A", text:"#92400E" },
  purple: { bg:"#F5F3FF", border:"#DDD6FE", text:"#4C1D95" },
  gray:   { bg:"#F9FAFB", border:"#E5E7EB", text:"#374151" },
};

const PEOPLE = [
  { id:"sg", initials:"SG", name:"Steve Goodman", role:"You",            bg:"#111827", fg:"#fff"    },
  { id:"js", initials:"JS", name:"John Smith",    role:"john@acme.com",  bg:"#DBEAFE", fg:"#1E40AF" },
  { id:"bj", initials:"BJ", name:"Bob Jones",     role:"bob@acme.com",   bg:"#EDE9FE", fg:"#4C1D95" },
  { id:"mj", initials:"MJ", name:"Mary James",    role:"mary@acme.com",  bg:"#FFE4E6", fg:"#9F1239" },
  { id:"sk", initials:"SK", name:"Sarah Kim",     role:"sarah@acme.com", bg:"#DCFCE7", fg:"#166534" },
];

const SCHEDULE = {
  sg: [
    { day:1,start:8,  end:9,    type:"busy",      label:"3x Standup"      },
    { day:1,start:9,  end:10.5, type:"busy",      label:"Weekly 1:1"      },
    { day:1,start:13, end:14,   type:"busy",      label:"Client Call"     },
    { day:2,start:9,  end:10,   type:"busy",      label:"Client – Eliz."  },
    { day:2,start:14, end:15,   type:"tentative", label:"Design Review?"  },
    { day:3,start:8,  end:8.75, type:"busy",      label:"Coffee"          },
    { day:3,start:9,  end:9.6,  type:"busy",      label:"Standup"         },
    { day:3,start:10, end:11,   type:"busy",      label:"UNH Team"        },
    { day:3,start:12, end:13.5, type:"busy",      label:"Chapter Mtg"     },
    { day:4,start:10, end:11,   type:"busy",      label:"Mark & Kiska"    },
    { day:4,start:14, end:14.75,type:"busy",      label:"Private"         },
    { day:5,start:9,  end:10,   type:"busy",      label:"3x Standup"      },
    { day:5,start:10, end:10.6, type:"busy",      label:"Oil change"      },
    { day:5,start:13, end:13.75,type:"busy",      label:"Steve↔Heather"   },
  ],
  js: [
    { day:1,start:9,  end:10,   type:"busy",      label:"Team Sync"       },
    { day:1,start:11, end:12,   type:"tentative", label:"Lunch?"          },
    { day:2,start:9,  end:11,   type:"busy",      label:"Client Work"     },
    { day:2,start:14, end:16,   type:"busy",      label:"Planning"        },
    { day:3,start:10, end:12,   type:"busy",      label:"Engineering"     },
    { day:3,start:13, end:14,   type:"tentative", label:"1:1?"            },
    { day:4,start:9,  end:10.5, type:"busy",      label:"Standup"         },
    { day:4,start:14, end:15,   type:"busy",      label:"Review"          },
    { day:5,start:11, end:12,   type:"busy",      label:"Sprint Close"    },
    { day:5,start:15, end:17,   type:"oof",       label:"Out"             },
  ],
  bj: [
    { day:1,start:8,  end:9,    type:"busy",      label:"Morning Sync"    },
    { day:1,start:12, end:14,   type:"busy",      label:"Lunch + Report"  },
    { day:2,start:9,  end:10,   type:"busy",      label:"Standup"         },
    { day:2,start:13, end:15,   type:"tentative", label:"Client Call?"    },
    { day:3,start:9,  end:11,   type:"busy",      label:"Product Review"  },
    { day:3,start:14, end:15.5, type:"busy",      label:"Budget"          },
    { day:4,start:8,  end:9,    type:"busy",      label:"Kickoff"         },
    { day:4,start:11, end:13,   type:"busy",      label:"Deep work"       },
    { day:5,start:9,  end:10,   type:"busy",      label:"Standup"         },
    { day:5,start:13, end:15,   type:"busy",      label:"Client"          },
  ],
  mj: [
    { day:1,start:9,  end:11,   type:"busy",      label:"Design Sprint"   },
    { day:1,start:14, end:15,   type:"busy",      label:"1:1"             },
    { day:2,start:8,  end:10,   type:"busy",      label:"PM Sync"         },
    { day:2,start:11, end:12,   type:"tentative", label:"Retro?"          },
    { day:3,start:9,  end:10,   type:"busy",      label:"Standup"         },
    { day:3,start:11, end:12,   type:"busy",      label:"UX Review"       },
    { day:3,start:13, end:14.5, type:"tentative", label:"Workshop?"       },
    { day:4,start:8,  end:9,    type:"busy",      label:"Daily"           },
    { day:4,start:13, end:15,   type:"busy",      label:"Research"        },
    { day:5,start:9,  end:10.5, type:"busy",      label:"Standup + Sync"  },
    { day:5,start:14, end:16,   type:"busy",      label:"Planning"        },
  ],
  sk: [
    { day:1,start:9,  end:10,   type:"busy",      label:"Standup"         },
    { day:1,start:13, end:14,   type:"busy",      label:"1:1"             },
    { day:2,start:10, end:12,   type:"busy",      label:"Interviews"      },
    { day:2,start:15, end:16,   type:"busy",      label:"Debrief"         },
    { day:3,start:9,  end:9.5,  type:"busy",      label:"Standup"         },
    { day:3,start:11, end:13,   type:"busy",      label:"Workshop"        },
    { day:4,start:9,  end:10,   type:"busy",      label:"Sync"            },
    { day:4,start:14, end:15,   type:"tentative", label:"Coffee?"         },
    { day:5,start:8,  end:17,   type:"oof",       label:"OOF – Travel"    },
  ],
};

const SEG_STYLE = {
  busy:      { bg:"#BFDBFE", border:"#93C5FD", text:"#1E40AF" },
  tentative: { bg:null,      border:"#FCD34D", text:"#92400E" },
  oof:       { bg:"#F3F4F6", border:"#E5E7EB", text:"#9CA3AF" },
};

const fmtHour = h => {
  const base = Math.floor(h);
  const mins = Math.round((h % 1) * 60);
  const ampm = base < 12 ? "AM" : "PM";
  const disp = base > 12 ? base - 12 : base === 0 ? 12 : base;
  return mins === 0 ? `${disp} ${ampm}` : `${disp}:${String(mins).padStart(2,"0")} ${ampm}`;
};

const hp = h => `${((h - DAY_START) / HOUR_SPAN) * 100}%`;

// ── Primitives ────────────────────────────────────────────────────────────────

function NavChip({ children, active, onClick, count }) {
  return (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:6, padding:"5px 13px", borderRadius:20,
      border: active ? "none" : "1px solid #E5E7EB",
      background: active ? "#111827" : "#fff",
      color: active ? "#fff" : "#374151",
      fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s",
    }}>
      {children}
      {count != null && <span style={{ background: active ? "rgba(255,255,255,0.22)" : "#EF4444", color:"#fff", borderRadius:10, fontSize:10, fontWeight:700, padding:"1px 5px", minWidth:16, textAlign:"center", lineHeight:"15px", display:"inline-block" }}>{count}</span>}
    </button>
  );
}

function Avatar({ initials, bg="#111827", fg="#fff", size=32 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:bg, color:fg, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:size*0.34, flexShrink:0 }}>{initials}</div>
  );
}

// ── Calendar Grid (main view) ─────────────────────────────────────────────────

function CalendarGrid() {
  return (
    <div style={{ display:"flex" }}>
      <div style={{ width:56, flexShrink:0 }}>
        {HOURS.map(h => (
          <div key={h} style={{ height:SLOT_H, display:"flex", alignItems:"flex-start", justifyContent:"flex-end", paddingRight:12, paddingTop:6, fontSize:10, color:"#D1D5DB", fontVariantNumeric:"tabular-nums" }}>{h}</div>
        ))}
      </div>
      {DAYS.map((_, ci) => {
        const evs = EVENTS.filter(e => e.col === ci);
        return (
          <div key={ci} style={{ flex:1, borderLeft:"1px solid #F3F4F6", position:"relative", minWidth:0 }}>
            {HOURS.map((_, hi) => <div key={hi} style={{ height:SLOT_H, borderBottom:"1px solid #F3F4F6" }}/>)}
            {evs.map(ev => {
              const c = EV[ev.color];
              return (
                <div key={ev.id} style={{ position:"absolute", left: ev.right ? "50%" : 3, right:3, top: ev.top * SLOT_H + 1, height: Math.max(ev.h * SLOT_H - 3, 22), background:c.bg, borderLeft:`2.5px solid ${c.border}`, borderRadius:"0 5px 5px 0", padding:"4px 6px", fontSize:11, fontWeight:500, color:c.text, overflow:"hidden", cursor:"pointer", zIndex:2, lineHeight:1.3 }}
                  onMouseEnter={e => e.currentTarget.style.filter="brightness(0.93)"}
                  onMouseLeave={e => e.currentTarget.style.filter="none"}
                >{ev.title}</div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ── Find a Time (inline, replaces calendar body) ──────────────────────────────

function FindATime({ selectedDay, onSelectDay, selStart, selDuration, onMove, onResize }) {
  const timelineRef = useRef(null);
  const dragging = useRef(null);
  const dragStartX = useRef(0);
  const dragStartVal = useRef(0);

  const pxToHour = useCallback(px => {
    const w = timelineRef.current?.clientWidth || 600;
    return (px / w) * HOUR_SPAN;
  }, []);

  const startDrag = (e, type) => {
    e.preventDefault();
    dragging.current = type;
    dragStartX.current = e.clientX;
    dragStartVal.current = type === "move" ? selStart : selDuration;
    const onMove_ = e2 => {
      const dh = pxToHour(e2.clientX - dragStartX.current);
      if (dragging.current === "move") {
        const next = Math.max(DAY_START, Math.min(DAY_END - selDuration, dragStartVal.current + dh));
        onMove(Math.round(next * 4) / 4);
      } else {
        const next = Math.max(0.25, Math.min(DAY_END - selStart, dragStartVal.current + dh));
        onResize(Math.round(next * 4) / 4);
      }
    };
    const onUp_ = () => {
      dragging.current = null;
      window.removeEventListener("mousemove", onMove_);
      window.removeEventListener("mouseup", onUp_);
    };
    window.addEventListener("mousemove", onMove_);
    window.addEventListener("mouseup", onUp_);
  };

  const onTimelineClick = e => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const hour = DAY_START + pxToHour(relX);
    const snapped = Math.round(hour * 4) / 4;
    const newStart = Math.max(DAY_START, Math.min(DAY_END - selDuration, snapped - selDuration / 2));
    onMove(newStart);
  };

  const selEnd = selStart + selDuration;
  const conflicts = PEOPLE.filter(p =>
    (SCHEDULE[p.id]||[]).some(s => s.day === selectedDay && s.type !== "free" && s.start < selEnd && s.end > selStart)
  );
  const allFree = conflicts.length === 0;
  const selColor = allFree ? "#059669" : "#6366F1";
  const selBg    = allFree ? "rgba(5,150,105,0.09)" : "rgba(99,102,241,0.08)";
  const selBdr   = allFree ? "rgba(5,150,105,0.45)" : "rgba(99,102,241,0.45)";

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>

      {/* Day tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid #F3F4F6", flexShrink:0, paddingLeft:PERSON_COL_W }}>
        {DAYS.map((day, i) => {
          const isWeekend = i === 0 || i === 6;
          const active = selectedDay === i;
          return (
            <button key={day} onClick={() => !isWeekend && onSelectDay(i)} style={{
              flex:1, padding:"8px 4px 10px", border:"none", background:"transparent",
              cursor: isWeekend ? "default" : "pointer", fontFamily:"'DM Sans',sans-serif",
              borderBottom: active ? "2px solid #111827" : "2px solid transparent",
              marginBottom:-1, opacity: isWeekend ? 0.3 : 1,
              pointerEvents: isWeekend ? "none" : "auto",
            }}>
              <div style={{ fontSize:9, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.07em", fontWeight:500 }}>{day}</div>
              <div style={{ fontSize:14, fontWeight: active ? 700 : 300, color:"#111827", marginTop:2 }}>{DATES[i]}</div>
            </button>
          );
        })}
      </div>

      {/* Hour ruler */}
      <div style={{ display:"flex", flexShrink:0, borderBottom:"1px solid #F3F4F6" }}>
        <div style={{ width:PERSON_COL_W, flexShrink:0 }}/>
        <div ref={timelineRef} style={{ flex:1, display:"flex", position:"relative" }} onClick={onTimelineClick}>
          {HOURS.slice(0,-1).map((h, i) => (
            <div key={h} style={{ flex:1, padding:"5px 0 4px 4px", fontSize:9, color:"#C4C4BF", borderLeft:"1px solid #F3F4F6", fontVariantNumeric:"tabular-nums" }}>{h}</div>
          ))}
          <div style={{ flex:1, padding:"5px 0 4px 4px", fontSize:9, color:"#C4C4BF", borderLeft:"1px solid #F3F4F6" }}>{HOURS[HOURS.length-1]}</div>
        </div>
      </div>

      {/* Person rows */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {PEOPLE.map((person, pi) => {
          const segs = (SCHEDULE[person.id]||[]).filter(s => s.day === selectedDay);
          return (
            <div key={person.id} style={{ display:"flex", alignItems:"stretch", borderBottom:"1px solid #F9FAFB", minHeight:44 }}>
              {/* Person label */}
              <div style={{ width:PERSON_COL_W, flexShrink:0, display:"flex", alignItems:"center", gap:8, padding:"6px 12px", borderRight:"1px solid #F3F4F6" }}>
                <Avatar initials={person.initials} bg={person.bg} fg={person.fg} size={24}/>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#111827", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{person.name}</div>
                  <div style={{ fontSize:10, color:"#9CA3AF", marginTop:0 }}>{person.id === "sg" ? "you" : person.role.split("@")[0]}</div>
                </div>
              </div>

              {/* Timeline row */}
              <div style={{ flex:1, position:"relative", background: pi % 2 === 0 ? "#fff" : "#FCFCFB", cursor:"crosshair" }}
                onClick={pi === 0 ? onTimelineClick : undefined}
              >
                {/* Sub-grid lines */}
                {Array.from({length: HOUR_SPAN}).map((_, hi) => (
                  <div key={hi} style={{ position:"absolute", top:0, bottom:0, left:`${(hi/HOUR_SPAN)*100}%`, width:1, background:"#F3F4F6" }}/>
                ))}
                {Array.from({length: HOUR_SPAN * 2}).map((_, qi) => (
                  <div key={qi} style={{ position:"absolute", top:0, bottom:0, left:`${(qi/(HOUR_SPAN*2))*100}%`, width:1, background:"#FAFAFA" }}/>
                ))}

                {/* Busy/tentative/oof segments */}
                {segs.map((seg, si) => {
                  const st = SEG_STYLE[seg.type];
                  const isTentative = seg.type === "tentative";
                  const isOof       = seg.type === "oof";
                  return (
                    <div key={si} title={`${seg.label}: ${fmtHour(seg.start)}–${fmtHour(seg.end)}`} style={{
                      position:"absolute", top:5, bottom:5,
                      left:hp(seg.start), width:`${((seg.end - seg.start)/HOUR_SPAN)*100}%`,
                      background: isTentative
                        ? "repeating-linear-gradient(45deg,#FDE68A,#FDE68A 3px,#FFFBEB 3px,#FFFBEB 8px)"
                        : st.bg,
                      border:`1px solid ${st.border}`,
                      borderRadius:4,
                      display:"flex", alignItems:"center", paddingLeft:4,
                      overflow:"hidden", zIndex:2,
                    }}>
                      <span style={{ fontSize:9, fontWeight:500, color:st.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{seg.label}</span>
                    </div>
                  );
                })}

                {/* Selection window */}
                <div
                  style={{ position:"absolute", top:0, bottom:0, left:hp(selStart), width:`${(selDuration/HOUR_SPAN)*100}%`, background:selBg, border:`1.5px solid ${selBdr}`, borderRadius:4, zIndex:5, cursor:"grab" }}
                  onMouseDown={e => startDrag(e, "move")}
                >
                  {/* Resize handle */}
                  <div
                    onMouseDown={e => { e.stopPropagation(); startDrag(e, "resize"); }}
                    style={{ position:"absolute", right:0, top:0, bottom:0, width:8, cursor:"ew-resize", display:"flex", alignItems:"center", justifyContent:"center" }}
                  >
                    <div style={{ width:2, height:14, borderRadius:1, background:selColor, opacity:0.6 }}/>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Everyone composite row */}
        <div style={{ display:"flex", borderTop:"2px solid #F3F4F6" }}>
          <div style={{ width:PERSON_COL_W, flexShrink:0, display:"flex", alignItems:"center", padding:"6px 12px", borderRight:"1px solid #F3F4F6" }}>
            <span style={{ fontSize:10, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.07em" }}>All people</span>
          </div>
          <div style={{ flex:1, position:"relative", height:32 }}>
            {Array.from({length: HOUR_SPAN * 4}).map((_, qi) => {
              const h = DAY_START + qi * 0.25;
              const hEnd = h + 0.25;
              const hasConflict = PEOPLE.some(p =>
                (SCHEDULE[p.id]||[]).some(s => s.day === selectedDay && s.type !== "free" && s.start < hEnd && s.end > h)
              );
              return (
                <div key={qi} style={{ position:"absolute", top:4, bottom:4, left:`${(qi/(HOUR_SPAN*4))*100}%`, width:`${(1/(HOUR_SPAN*4))*100}%`, background: hasConflict ? "rgba(239,68,68,0.12)" : "rgba(5,150,105,0.14)" }}/>
              );
            })}
            {/* Hour lines */}
            {Array.from({length: HOUR_SPAN}).map((_, hi) => (
              <div key={hi} style={{ position:"absolute", top:0, bottom:0, left:`${(hi/HOUR_SPAN)*100}%`, width:1, background:"#F3F4F6" }}/>
            ))}
            {/* Selection */}
            <div style={{ position:"absolute", top:0, bottom:0, left:hp(selStart), width:`${(selDuration/HOUR_SPAN)*100}%`, background: allFree ? "rgba(5,150,105,0.18)" : "rgba(239,68,68,0.12)", border:`1.5px solid ${selBdr}`, borderRadius:4, zIndex:5 }}/>
          </div>
        </div>
      </div>

      {/* Conflict summary bar */}
      <div style={{ padding:"8px 12px", borderTop:"1px solid #F3F4F6", background: allFree ? "#F0FDF4" : "#FEF2F2", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background: allFree ? "#059669" : "#EF4444", flexShrink:0 }}/>
        <span style={{ fontSize:11, fontWeight:500, color: allFree ? "#065F46" : "#991B1B", flex:1 }}>
          {allFree ? `✓ Everyone is free ${fmtHour(selStart)} – ${fmtHour(selEnd)}` : `${conflicts.map(c => c.name.split(" ")[0]).join(", ")} ${conflicts.length === 1 ? "has" : "have"} a conflict`}
        </span>
        <span style={{ fontSize:10, color:"#9CA3AF" }}>Drag to adjust</span>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:12, padding:"6px 12px", borderTop:"1px solid #F3F4F6", flexShrink:0 }}>
        {[
          { label:"Busy",      bg:"#BFDBFE", border:"#93C5FD", pattern:false },
          { label:"Tentative", bg:null, border:"#FCD34D",       pattern:true  },
          { label:"Out of office", bg:"#F3F4F6", border:"#E5E7EB", pattern:false },
        ].map(l => (
          <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:"#9CA3AF" }}>
            <div style={{ width:14, height:10, borderRadius:2, background: l.pattern ? "repeating-linear-gradient(45deg,#FDE68A,#FDE68A 3px,#FFFBEB 3px,#FFFBEB 8px)" : l.bg, border:`1px solid ${l.border}` }}/>
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── New Meeting Panel ─────────────────────────────────────────────────────────

function NewMeetingPanel({ onClose, calView, setCalView, findTimeProps }) {
  const [title, setTitle] = useState("");
  const [attendees, setAttendees] = useState("");

  return (
    <div style={{ width:320, borderLeft:"1px solid #F3F4F6", background:"#fff", display:"flex", flexDirection:"column", flexShrink:0, animation:"drawerIn 0.18s ease" }}>

      {/* Panel header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px 12px", borderBottom:"1px solid #F3F4F6", flexShrink:0 }}>
        <span style={{ fontSize:14, fontWeight:700, letterSpacing:"-0.02em" }}>New meeting</span>
        <button onClick={onClose} style={{ width:26, height:26, borderRadius:6, border:"1px solid #F3F4F6", background:"#fff", cursor:"pointer", fontSize:16, color:"#9CA3AF", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
      </div>

      {/* Form */}
      <div style={{ padding:"16px 20px", borderBottom:"1px solid #F3F4F6", flexShrink:0 }}>
        {/* Title */}
        <div style={{ marginBottom:12 }}>
          <input
            value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Meeting title"
            style={{ width:"100%", padding:"9px 11px", borderRadius:9, border:"1px solid #E5E7EB", fontSize:13, fontFamily:"'DM Sans',sans-serif", background:"#FAFAFA", outline:"none", color:"#111827", fontWeight:500 }}
          />
        </div>

        {/* Duration */}
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:11, fontWeight:500, color:"#9CA3AF", marginBottom:5 }}>Duration</div>
          <div style={{ display:"flex", gap:4 }}>
            {["30m","1h","1.5h","2h"].map(d => (
              <button key={d} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", fontSize:11, fontWeight:500, color:"#374151", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.1s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#F9FAFB"; e.currentTarget.style.borderColor="#D1D5DB"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="#E5E7EB"; }}
              >{d}</button>
            ))}
          </div>
        </div>

        {/* Attendees */}
        <div>
          <div style={{ fontSize:11, fontWeight:500, color:"#9CA3AF", marginBottom:5 }}>Attendees</div>
          <input
            value={attendees} onChange={e => setAttendees(e.target.value)}
            placeholder="Add names or emails"
            style={{ width:"100%", padding:"9px 11px", borderRadius:9, border:"1px solid #E5E7EB", fontSize:12, fontFamily:"'DM Sans',sans-serif", background:"#FAFAFA", outline:"none", color:"#111827" }}
          />
          {/* Added attendee chips */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:8 }}>
            {PEOPLE.filter(p => p.id !== "sg").slice(0,3).map(p => (
              <div key={p.id} style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 8px 3px 4px", borderRadius:20, background:"#F3F4F6", fontSize:11 }}>
                <Avatar initials={p.initials} bg={p.bg} fg={p.fg} size={18}/>
                <span style={{ color:"#374151" }}>{p.name.split(" ")[0]}</span>
                <span style={{ color:"#D1D5DB", cursor:"pointer", fontSize:12 }}>×</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View toggle — key feature */}
      <div style={{ padding:"12px 20px", borderBottom:"1px solid #F3F4F6", flexShrink:0 }}>
        <div style={{ display:"flex", background:"#F3F4F6", borderRadius:10, padding:3, gap:2 }}>
          <button
            onClick={() => setCalView("calendar")}
            style={{ flex:1, padding:"7px 0", borderRadius:8, border:"none", background: calView==="calendar" ? "#fff" : "transparent", boxShadow: calView==="calendar" ? "0 1px 3px rgba(0,0,0,0.08)" : "none", fontSize:12, fontWeight:500, color: calView==="calendar" ? "#111827" : "#9CA3AF", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="0.5" y="1.5" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.1"/><path d="M0.5 4.5h11" stroke="currentColor" strokeWidth="1.1"/><path d="M3.5 0.5v2.5M8.5 0.5v2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
            Calendar
          </button>
          <button
            onClick={() => setCalView("findtime")}
            style={{ flex:1, padding:"7px 0", borderRadius:8, border:"none", background: calView==="findtime" ? "#fff" : "transparent", boxShadow: calView==="findtime" ? "0 1px 3px rgba(0,0,0,0.08)" : "none", fontSize:12, fontWeight:500, color: calView==="findtime" ? "#111827" : "#9CA3AF", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s", display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M1 6h10M1 9h10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
            Find a time
          </button>
        </div>
        {calView === "findtime" && (
          <p style={{ fontSize:11, color:"#9CA3AF", marginTop:8, lineHeight:1.5 }}>
            Click the timeline to place a window. Drag to move or resize it.
          </p>
        )}
      </div>

      {/* Selected time (when in find-a-time mode) */}
      {calView === "findtime" && (
        <div style={{ padding:"10px 20px", borderBottom:"1px solid #F3F4F6", flexShrink:0 }}>
          <div style={{ fontSize:11, fontWeight:500, color:"#9CA3AF", marginBottom:4 }}>Selected time</div>
          <div style={{ fontSize:13, fontWeight:600, color:"#111827" }}>
            {DAYS[findTimeProps.selectedDay]}, Feb {DATES[findTimeProps.selectedDay]}
          </div>
          <div style={{ fontSize:12, color:"#6B7280", marginTop:1 }}>
            {fmtHour(findTimeProps.selStart)} – {fmtHour(findTimeProps.selStart + findTimeProps.selDuration)}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex:1 }}/>

      {/* Actions */}
      <div style={{ padding:"14px 20px", borderTop:"1px solid #F3F4F6", display:"flex", gap:8, flexShrink:0 }}>
        <button onClick={onClose} style={{ flex:1, padding:"10px 0", borderRadius:10, border:"1px solid #E5E7EB", background:"#fff", fontSize:13, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", color:"#374151" }}>Cancel</button>
        <button onClick={onClose} style={{ flex:2, padding:"10px 0", borderRadius:10, border:"none", background:"#111827", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Create meeting</button>
      </div>
    </div>
  );
}

// ── Drawer contents ───────────────────────────────────────────────────────────

function DrawerOrg() {
  const items = [
    { name:"Q1 Planning Session", status:"Needs attention", dot:"#EF4444" },
    { name:"Design Review",        status:"Draft",           dot:"#F59E0B" },
    { name:"Investor Sync",        status:"Finalized",       dot:"#10B981" },
  ];
  return (
    <div>
      <div style={{ fontSize:11, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>My meetings</div>
      {items.map(m => (
        <div key={m.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:"1px solid #F9FAFB", cursor:"pointer" }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:m.dot, flexShrink:0 }}/>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name}</div>
            <div style={{ fontSize:11, color:"#9CA3AF", marginTop:1 }}>{m.status}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      ))}
    </div>
  );
}

function DrawerInv() {
  const [dismissed, setDismissed] = useState([]);
  const invs = [
    { name:"Engineering All-Hands", from:"Sarah K.", time:"Feb 27 · 60m" },
    { name:"Coffee Chat w/ Alex",   from:"Alex M.",  time:"Mar 1 · 30m" },
  ].filter((_, i) => !dismissed.includes(i));
  return (
    <div>
      <div style={{ fontSize:11, fontWeight:600, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>Invitations</div>
      {invs.length === 0
        ? <div style={{ textAlign:"center", color:"#9CA3AF", fontSize:13, padding:"16px 0" }}>All caught up ✓</div>
        : invs.map((inv, i) => (
          <div key={inv.name} style={{ padding:"10px 0", borderBottom:"1px solid #F9FAFB" }}>
            <div style={{ fontSize:13, fontWeight:600 }}>{inv.name}</div>
            <div style={{ fontSize:11, color:"#9CA3AF", marginTop:2 }}>{inv.from} · {inv.time}</div>
            <div style={{ display:"flex", gap:6, marginTop:8 }}>
              <button style={{ flex:1, padding:"6px 0", borderRadius:8, border:"none", background:"#059669", color:"#fff", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Accept</button>
              <button onClick={() => setDismissed(d => [...d, i])} style={{ flex:1, padding:"6px 0", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", color:"#374151", fontSize:11, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Decline</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function Timesekr() {
  const [drawer, setDrawer]         = useState(null);       // "org" | "inv" | "msg"
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [calView, setCalView]       = useState("calendar"); // "calendar" | "findtime"
  const [selectedDay, setSelectedDay] = useState(1);
  const [selStart, setSelStart]     = useState(10);
  const [selDuration, setSelDuration] = useState(1);

  const openDrawer = key => setDrawer(d => d === key ? null : key);

  const findTimeProps = { selectedDay, onSelectDay: setSelectedDay, selStart, selDuration, onMove: setSelStart, onResize: setSelDuration };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#111827", height:"100vh", display:"flex", flexDirection:"column", background:"#fff", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        @keyframes drawerIn { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; height:4px; }
        ::-webkit-scrollbar-thumb { background:#E5E7EB; border-radius:4px; }
        button:focus { outline:none; }
        input:focus { border-color:#D1D5DB !important; }
      `}</style>

      {/* ── NAV ── */}
      <header style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", borderBottom:"1px solid #F3F4F6", padding:"0 24px", height:54, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginRight:20 }}>
          <div style={{ width:30, height:30, borderRadius:9, background:"#111827", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="2.5" width="13" height="11" rx="2.5" stroke="#fff" strokeWidth="1.3"/>
              <path d="M1 6.5h13" stroke="#fff" strokeWidth="1.3"/>
              <path d="M5 1v3.5M10 1v3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontWeight:700, fontSize:14, letterSpacing:"-0.03em" }}>timesekr</span>
        </div>

        <div style={{ width:1, height:20, background:"#F3F4F6", marginRight:4 }}/>
        <NavChip active={drawer==="org"} onClick={() => { openDrawer("org"); setShowNewMeeting(false); }}>My meetings</NavChip>
        <NavChip active={drawer==="inv"} onClick={() => { openDrawer("inv"); setShowNewMeeting(false); }} count={2}>Invitations</NavChip>
        <NavChip active={drawer==="msg"} onClick={() => { openDrawer("msg"); setShowNewMeeting(false); }} count={4}>Notifications</NavChip>

        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
          <button
            onClick={() => { setShowNewMeeting(s => !s); setDrawer(null); setCalView("calendar"); }}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 16px", borderRadius:20, background: showNewMeeting ? "#374151" : "#111827", color:"#fff", border:"none", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background 0.15s" }}
          >
            <span style={{ fontSize:16, lineHeight:1, marginTop:-1 }}>+</span>New meeting
          </button>
          <Avatar initials="SG" size={32}/>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* ── MAIN CALENDAR / FIND-A-TIME AREA ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

          {/* Cal nav — hidden when in find-a-time mode */}
          {calView === "calendar" && (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 24px", background:"#fff", borderBottom:"1px solid #F3F4F6", flexShrink:0 }}>
                <button style={{ padding:"5px 12px", borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif", color:"#374151", fontWeight:500 }}>Today</button>
                {["‹","›"].map(c => <button key={c} style={{ width:28, height:28, borderRadius:8, border:"1px solid #E5E7EB", background:"#fff", cursor:"pointer", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", color:"#374151" }}>{c}</button>)}
                <span style={{ fontSize:14, fontWeight:600, letterSpacing:"-0.02em" }}>February 15 – 21, 2026</span>
                <div style={{ marginLeft:"auto", display:"flex", gap:2 }}>
                  {["Day","Week","Month"].map(v => <button key={v} style={{ padding:"5px 12px", borderRadius:8, border:"1px solid #E5E7EB", background: v==="Week" ? "#111827" : "#fff", color: v==="Week" ? "#fff" : "#9CA3AF", cursor:"pointer", fontSize:11, fontFamily:"'DM Sans',sans-serif", fontWeight: v==="Week" ? 600 : 400 }}>{v}</button>)}
                </div>
              </div>

              {/* Day headers */}
              <div style={{ display:"grid", gridTemplateColumns:"56px repeat(7,1fr)", background:"#fff", borderBottom:"1px solid #F3F4F6", flexShrink:0 }}>
                <div/>
                {DAYS.map((day, i) => {
                  const today = DATES[i] === 22;
                  return (
                    <div key={day} style={{ padding:"10px 0", textAlign:"center" }}>
                      <div style={{ fontSize:10, color:"#D1D5DB", textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:500 }}>{day}</div>
                      <div style={{ width:32, height:32, borderRadius:"50%", margin:"3px auto 0", background: today ? "#111827" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize: today ? 14 : 17, fontWeight: today ? 700 : 300, color: today ? "#fff" : "#111827" }}>{DATES[i]}</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ flex:1, overflowY:"auto" }}>
                <CalendarGrid/>
              </div>
            </>
          )}

          {/* Find a time view */}
          {calView === "findtime" && (
            <FindATime {...findTimeProps}/>
          )}
        </div>

        {/* ── INFO DRAWERS (org/inv/msg) ── */}
        {drawer && !showNewMeeting && (
          <div style={{ width:288, borderLeft:"1px solid #F3F4F6", background:"#fff", flexShrink:0, display:"flex", flexDirection:"column", animation:"drawerIn 0.18s ease" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px 12px", borderBottom:"1px solid #F3F4F6" }}>
              <span style={{ fontSize:11, fontWeight:600, color:"#D1D5DB", textTransform:"uppercase", letterSpacing:"0.07em" }}>
                { drawer==="org" ? "My meetings" : drawer==="inv" ? "Invitations" : "Notifications" }
              </span>
              <button onClick={() => setDrawer(null)} style={{ width:24, height:24, borderRadius:6, border:"1px solid #F3F4F6", background:"#fff", cursor:"pointer", fontSize:15, color:"#9CA3AF", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"12px 20px 20px" }}>
              { drawer==="org" ? <DrawerOrg/> : drawer==="inv" ? <DrawerInv/> : null }
            </div>
          </div>
        )}

        {/* ── NEW MEETING PANEL ── */}
        {showNewMeeting && (
          <NewMeetingPanel
            onClose={() => { setShowNewMeeting(false); setCalView("calendar"); }}
            calView={calView}
            setCalView={setCalView}
            findTimeProps={findTimeProps}
          />
        )}
      </div>
    </div>
  );
}
