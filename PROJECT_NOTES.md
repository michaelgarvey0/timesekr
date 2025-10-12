# timesēkr Project Notes

## What This Is
A web-based prototype for core user flows and UI/UX. No backend - all mock/simulated data.

---

## What We Built

Four core user stories:

1. **Org creation and setup**
2. **General finding availability**
3. **Member signup w/ calendar linking**
4. **Personal availability setting**

---

## User Flows

### Flow 1: Organization Creator (Organizer)
**Entry:** `/` → Click "Organization Creator"

**Steps:**
1. **Org + User Info** - Org name, your name, your email
2. **Payment** - Card info, $29/month basic plan
3. **Connect Calendar** - Choose Google/Outlook/Apple/Other
4. **Create Circle** - Name your first scheduling circle, add member emails, customize invite message
5. **Review & Send** - Final confirmation, shows summary of everything
6. → **Dashboard**

**Key decisions we made:**
- Payment comes BEFORE inviting anyone (commitment first)
- Calendar connection happens IN the onboarding flow
- "Circle" = a group of people you schedule with (can have multiple circles per org)
- Org > Circle > Members hierarchy

### Flow 2: Invited Member
**Entry:** `/` → Click "Invited Member" → Mock email page

**Steps:**
1. **Mock Email** - Simulated Gmail inbox with meeting invitation
2. **Click "Yes, I can attend"** - Deep link with invite code
3. **Sign Up** - Name + email
4. **Connect Calendar** - Choose calendar provider
5. **Set Availability** - Working hours
6. → **Dashboard**

**Key decisions:**
- Same calendar connection flow as organizers
- No payment for members
- Invitation email is simulated for demo purposes

---

## App Structure

### Routes
- `/` - Landing page with flow selection
- `/mock-email` - Simulated email inbox
- `/onboarding` - 5-step organizer signup
- `/join/:inviteCode` - 3-step member signup
- `/dashboard` - Main app

### Dashboard Features
- **Find Availability** - Timeline view showing when people are free
  - Select participants (individuals or groups)
  - See availability heatmap
  - Groups can expand to show individual members
  - Suggested times highlighted
- **My Availability** - Connect calendar, set working hours

### What We Removed (Not MVP)
- ❌ Manage Users tab
- ❌ Manage Groups tab
- ❌ Organization Settings tab
- ❌ Multiple view modes for availability (kept Timeline only)
- ❌ Separate "My Calendars" tab (merged into My Availability)

---

## Major Design Decision: Web-First vs Mobile-First

### The Problem
Original requirements said "mobile app only" with QR codes in emails for desktop users and deep links for app download.

### Our Decision: WEB-FIRST

**Why:**
1. **Users work on computers** - Meetings happen on Zoom/Teams (desktop), calendars managed on desktop, emails checked on desktop
2. **Friction argument** - Forcing app download is MORE friction:
   - Web: Email → Click → Sign up → Done (3 steps)
   - Mobile: Email → QR code → App Store → Download → Open → Sign up → Done (7 steps)
3. **One codebase** - React web app works on mobile browsers already (responsive)
4. **Calendar OAuth** - Google/Microsoft/Apple all have web OAuth that works
5. **Faster** - Ship in weeks, not months
6. **Requirements said "app OR web page"** - so web was already needed anyway

### What This Means
- Building a web app that works on desktop AND mobile browsers
- Can add native apps later if needed using same backend
- PWA option for "app-like" experience without App Store

---

## Other Key Decisions We Made

### Organization Hierarchy
```
Organization (Acme Corp)
  └── Circle (Marketing Team)
       ├── Member 1
       ├── Member 2
       └── Sub-groups (optional, not built yet)
```

- **Organization** = Account/billing entity
- **Circle** = Group of people you schedule with
- Organizers can create multiple circles

### Calendar Connection Required
- Organizers: Connect in onboarding (Step 3 of 5)
- Members: Connect in signup (Step 2 of 3)
- Dashboard: If not connected, forced to My Availability tab
- **Why:** Can't schedule without calendar data

### Zero Friction UI
Changes we made:
- Landing page: Removed "Why timesēkr" marketing section
- Org signup: Consolidated to 5 logical steps
- Member signup: 3 clean steps
- Dashboard: Only 2 tabs
- No fake login page - jump straight to demo flows
- Calendar connection: Clean white cards (no dark green gradient)

---

## Tech Stack

- **Framework:** React 18 with Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **State:** Local component state

### Not Implemented
- Backend API
- Database
- Authentication
- Real calendar OAuth
- Email sending
- Payment processing

Everything uses mock data in component state.

---

## Design Language

**Colors:**
- Primary: Teal (#0D9488)
- Background: Gradient teal-50 to emerald-100
- Text: Gray-900 (#212121)

**Typography:**
- Font: IBM Plex Sans
- Weights: 300, 400, 500, 600, 700

**Style:**
- Rounded corners (rounded-xl, rounded-lg)
- Shadows for depth
- Hover states on everything interactive
- Smooth transitions

---

## Key Files

### Pages
- `src/pages/DemoSelector.jsx` - Landing page
- `src/pages/MockEmail.jsx` - Simulated email
- `src/pages/OrgOnboarding.jsx` - 5-step organizer flow
- `src/pages/MemberSignup.jsx` - 3-step member flow
- `src/pages/Dashboard.jsx` - Main app

### Components
- `src/components/dashboard/FindAvailability.jsx` - Timeline availability view
- `src/components/dashboard/MyAvailability.jsx` - Calendar connection + hours
- `src/components/FeedbackButton.jsx` - Floating feedback button

---

## Known Limitations

What's simulated/fake right now:

1. No authentication - all flows just navigate
2. No data persistence - resets on reload
3. Calendar OAuth is fake - just button clicks
4. Payment is fake - no Stripe
5. Email is simulated - mock inbox only
6. Can't actually create meetings - just view availability
7. Timeline data is random (Math.random())
8. No error handling
9. No loading states
