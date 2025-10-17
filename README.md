# timesēkr

A web-based scheduling and availability platform for finding optimal meeting times across organizations.

## Tech Stack
- React 19 + Vite (Rolldown)
- Tailwind CSS v4
- React Router
- IBM Plex Sans font family

---

# TimeSeekr Prototype Build Order
## Sequential Build Order (Logical Dependencies)

**Build Status Legend:**
- ⬜ Not Started
- 🟦 In Progress
- ✅ Complete

---

## PHASE 1: Basic Account Creation (No Circle Yet)

### 1. New User Account Creation (Free) ✅

Anyone can create an account without joining or creating a circle.

#### Account Setup
- **Contact Information**: Name, email, phone
- **Link Calendars**: Connect Google Calendar, Outlook, Apple Calendar, or other calendar services
- **Notification Preferences**: Configure notification settings
- **Calendar Overrides**: Set initial availability exceptions (vacations, blackout times)

---

## PHASE 2: Member Joining Existing Circles

### 2. Member Receives Circle Invitation 🟦

#### Invitation Flow
- **Invitation Email**: Personalized invitation from circle organizer
- **Two Scenarios**:
  - **Existing User**: Click link → Accept/Decline circle invitation
  - **New User**: Click link → Create account (from Phase 1) → Accept circle invitation

---

### 3. Member Accepts Circle Invitation ⬜

#### Circle Acceptance
- Review circle details
- Accept or decline invitation
- Once accepted, member is added to circle
- Member's existing calendar connections and preferences automatically apply to this circle

---

### 4. Member Preferences & Settings ⬜

#### Calendar Management
- **Calendar Status**: View connected calendars and syncing status
- **Add/Edit/Delete Calendars**: Manage connected calendar sources
- **Calendar Overrides**:
  - **Vacation Button**: Quick toggle for extended unavailable periods
  - **Do Not Schedule Overrides**: Set specific times, dates, or recurring blocks when unavailable

#### Notification Preferences
- Configure notification types, frequency, and delivery methods (global or per-circle)

#### Circle Management
- **Circle Status**: View all circles member belongs to and their role in each
- **Request to Join a Circle**: Submit requests to join circles (if circle allows)
- **Leave Circle**: Option to leave circles

---

## PHASE 3: Creating Your First Circle (Becomes an Organizer)

### 5. Upgrade to Circle Creator ✅

When a user wants to CREATE a circle, they become an organizer and must provide billing.

#### Add Billing Information
- **Payment Method**: Credit card information
- **Billing Address**: Address for invoicing
- **Preferences**:
  - **Auto Upgrade**: Toggle to automatically upgrade when usage exceeds plan limits

---

### 6. Create Circle ✅

#### Circle Setup
- **Circle Name & Description**: Basic circle information
- **Customize Invitation Letters**: Edit templated invitation emails with personalized messaging
- **Add Member Addresses**:
  - Manual entry form
  - Bulk upload option (CSV)

#### Sending Invitations
- Visual distinction between:
  - **Unregistered Users**: Will receive invitation to create account and join circle
  - **Registered Users**: Will receive circle join request
- Batch send interface with progress indicator

---

## PHASE 4: Core Scheduling Functionality

### 7. Organizer/Delegate – Find Availabilities and Schedule ⬜ **MOST CRITICAL**

#### Scheduling Workflow
1. **Meeting Name**: Enter meeting title
2. **Date Range**: Specify window for meeting
3. **Meeting Length**: Set duration (30 min, 1 hour, 2 hours, etc.)
4. **Invitee Selection**:
   - Pick individuals from circle member list
   - Search for specific members
   - Add entire pre-defined teams
   - Save current selection as new team
5. **See Results/Options**: System displays optimal meeting times based on collective availability
6. **Send Invitation**: Distribute calendar invites to selected participants
   - Special messaging for unregistered members: "Your availability was not accessible to TimeSeekr, so this time may not work optimally for you. We encourage you to SIGN UP NOW for better scheduling in the future!"

---

## PHASE 5: Circle Management Tools

### 8. Organizer Circle Management ⬜

#### Circle Administration
- **Registration Status Dashboard**:
  - Visual progress chart
  - List view with status badges (Accepted, Pending, Declined)
- **Reminder System**:
  - Send manual reminders to pending members
  - Configure automated reminder cadence (once CRM functionality is available)
- **Team Creation**: Group circle members into sub-teams for easier scheduling
- **Delegate Organizer Rights**: Grant other circle members administrative permissions
- **Remove Members**: Remove members from circle
- **Circle Linking**:
  - **Generate Connection Key**: Create unique passkey for circle
  - **Insert Connection Key**: Link to another circle using their passkey

---

### 9. Organizer Account Management ⬜

#### Dashboard Features
- **Statistics**:
  - Scheduling success rates
  - Member engagement metrics
  - Usage data by circle
- **Billing**: Invoice history, payment methods, current usage by circle
- **Circle Management**: View all circles user has created/administers
- **Suspend/Cancel Circle**: Options to suspend or close specific circles

---

## PHASE 6: Advanced Cross-Circle Features

### 10. Advanced Circle Features ⬜

#### Import & Connect
- **Import Another Circle**: Import members from another circle
  - Requires permission from original circle organizer
  - Uses passkey authentication
- **Circle Connection Key Exchange**: Enable inter-circle scheduling
  - Generate connection key for your circle
  - Insert connection key from another circle

---

## BUILD SEQUENCE SUMMARY

**Critical Path:**
1. User Account (free) → 2. Accept Circle Invitation → 3. Member has availability data → 4. Someone upgrades to create circle → 5. Scheduling algorithm works

**Key Concepts:**
- Anyone can create a free account
- Users can be members of unlimited circles (no cost to member)
- Only circle creators pay (billing added when creating a circle)
- Users can be members of some circles and organizers of other circles simultaneously

---

## Development

```bash
npm install
npm run dev
```
