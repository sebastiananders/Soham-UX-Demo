import type { AgentId, ChatMessage } from './types';

// ── Agent config ───────────────────────────────────────────────────────────────

export const AGENTS: Record<AgentId, {
  name: string;
  sub: string;
  meta: string;
  accent: string;
  cardBg: string;
}> = {
  website:  { name: 'Event website · Hero',     sub: 'Event website',        meta: 'Just now · Building',           accent: '#FDE047', cardBg: '#FFFFFF' },
  contacts: { name: 'Contact & ticket summary', sub: 'Contact & tickets',    meta: '3d ago · 121 contacts',         accent: '#C4B5FD', cardBg: '#FFFFFF' },
  insights: { name: 'Post-event read-out',      sub: 'Insights & Reporting', meta: '2h ago · 612 registrations',    accent: '#34D399', cardBg: '#FFFFFF' },
  analyzer: { name: 'Event analyzer',           sub: 'Event analyzer',       meta: 'Just now · 7 findings',         accent: '#F25A38', cardBg: '#FFFFFF' },
};

// ── Initial messages ───────────────────────────────────────────────────────────

export const INITIAL_MESSAGES: Record<AgentId, ChatMessage[]> = {
  website: [
    { kind: 'agent', agentId: 'website', text: "Hi Jen — I'm your event website builder. Tell me what you'd like to create or change and I'll get straight to work. You can describe a section, a layout, a style direction, or paste a brief.", time: '2:14 PM' },
  ],
  contacts: [
    {
      kind: 'agent', agentId: 'contacts', time: '9:22 AM',
      text: "Here's a read-out on your current contact list.\n\n121 contacts total — 104 speakers, 17 RSVPs\nAll have name and email · ~93% have job titles\nMost enrichment fields are empty (country, industry, check-in, leads, engagement)\n\nA few company names look like placeholders — Horizon Dynamics, Nexus Innovations — possibly sample or demo data worth cleaning up.\n\nThree things worth acting on: assign comp tickets to the 104 speakers and 17 RSVPs, follow up with the 5 pending-payment registrants, and send a post-event thank-you to all 708 check-ins.",
      actions: [
        { label: 'Assign comp tickets', primary: true, id: 'send' },
        { label: 'Send thank-you email', id: 'edit-draft' },
      ],
    },
  ],
  analyzer: [
    {
      kind: 'agent', agentId: 'analyzer', time: '8:04 AM',
      text: "I ran an overnight review of your event — 69 speakers, 3 days to go.\n\n1 critical · 4 warnings · 2 suggestions\n\nSpeakers carry 6 of the 7 items. One item is in Basics. Nothing here blocks the event, but the critical item (Jim Roland's bio) is visible on the public speaker page.",
    },
    { kind: 'user', text: 'Analyse the check in for my event', time: '8:05 AM' },
    {
      kind: 'agent', agentId: 'analyzer', time: '8:06 AM',
      text: "Here's the check-in summary for Customer Contact Week Orlando — January 21–22, 2026.\n\nAttendance\n500 checked in · 100% in-person · 0 virtual\nDay 1: 378 (76%) · Day 2: 121 (24%) · Day 3: 1\nSharp Day 2 drop-off — typical for this format.\n\nTicket breakdown\nEnd Users 232 (46%) · Sponsors 206 (41%)\nVendors 29 · Staff 25 · Other 8\nNearly as many sponsors as end users — heavily commercial crowd.\n\nTop companies\nCMP (organizer) 23 · ASAPP 8 · Five9 8 · Replicant 7 · Liveops 7",
    },
    { kind: 'user', text: 'Show me the check-in timeline for Day 1', time: '8:07 AM' },
    {
      kind: 'agent', agentId: 'analyzer', time: '8:07 AM',
      text: "Here's the check-in timeline for Day 1. The morning rush peaked at 9:00 AM with 70 check-ins in that 30-minute window — right as the opening keynote was scheduled.",
    },
    { kind: 'chart', chartId: 'checkin-day1' },
    { kind: 'suggestions', pills: ['What items are still open for this event', 'Show me all event registrations', 'Analyse the checkin for my event', 'Change the design of the event website'] },
  ],
  insights: [
    {
      kind: 'agent', agentId: 'insights', time: '9:14 AM',
      text: "I've pulled the post-event read-out.\n\n882 tickets sold · 708 checked in — 80% show-up rate\n$461K gross revenue, led by End User and Vendor tickets\n9.5 sessions per attendee · 74% view duration — strong engagement\n\nAudience skewed sponsor and vendor-heavy, tech-industry (Internet Software & Services at 33%), 90%+ US-based. Biggest draws: networking and meals. Top sessions: the Olive Garden keynote, the Voice Agent Build demo, and the Agentic AI airline talk.\n\nDay 1 carried about two-thirds of session traffic — typical Day 2 drop-off. Three follow-ups worth acting on: the 174 no-shows, the low-attendance formats, and the Day 2 gap.",
      actions: [
        { label: 'Draft re-engagement email', primary: true, id: 'draft' },
        { label: 'Analyse Day 2', id: 'day2' },
      ],
    },
  ],
};

// ── Contacts canvas data ───────────────────────────────────────────────────────

export const warmContacts = [
  { name: 'Anna Fischer',    company: 'Siemens AG',      email: 'a.fischer@siemens.com',   opened: '2 days ago' },
  { name: 'Luca Romano',     company: 'Bain & Company',  email: 'l.romano@bain.com',        opened: '3 days ago' },
  { name: 'Sophie Müller',   company: 'Deutsche Bank',   email: 's.mueller@db.com',         opened: '3 days ago' },
  { name: 'James Holloway',  company: 'Accenture',       email: 'j.holloway@accenture.com', opened: '4 days ago' },
  { name: 'Priya Nair',      company: 'McKinsey & Co',   email: 'p.nair@mckinsey.com',      opened: '4 days ago' },
  { name: 'Tobias Kern',     company: 'SAP SE',          email: 't.kern@sap.com',           opened: '5 days ago' },
];

export type WarmContact = typeof warmContacts[0];

// ── Insights canvas data ───────────────────────────────────────────────────────

export const weeklyData = [
  { label: 'Mar 3',  count: 89  },
  { label: 'Mar 10', count: 134 },
  { label: 'Mar 17', count: 156 },
  { label: 'Mar 24', count: 198 },
  { label: 'Apr 1',  count: 35  },
];

export const revenueScenarios = [
  { label: 'Current pace',    value: 183600, accent: '#45C4B0' },
  { label: 'Pace projection', value: 216000, accent: '#13678A' },
  { label: 'Early-bird push', value: 240000, accent: '#012030' },
  { label: 'Full target',     value: 312000, accent: '#E5E5E5' },
];

export const ticketTiers = [
  { tier: 'Early-bird', registered: 289, capacity: 400, color: '#012030' },
  { tier: 'Standard',   registered: 214, capacity: 400, color: '#13678A' },
  { tier: 'VIP',        registered: 109, capacity: 200, color: '#45C4B0' },
];
