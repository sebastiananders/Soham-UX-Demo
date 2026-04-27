import type { AgentId, ChatMessage } from './types';

// ── Agent config ───────────────────────────────────────────────────────────────

export const AGENTS: Record<AgentId, {
  name: string;
  displayName: string;
  sub: string;
  meta: string;
  accent: string;
  cardBg: string;
}> = {
  website:  { name: 'Speaker profiles',     displayName: 'Web Agent',      sub: 'Event website',        meta: '1d ago · Draft ready',       accent: '#FDE047', cardBg: '#FFFFFF' },
  contacts: { name: 'Win warm contacts',    displayName: 'Contacts Agent', sub: 'Contact & tickets',    meta: '3d ago · 340 warm contacts', accent: '#C4B5FD', cardBg: '#FFFFFF' },
  insights: { name: 'Registration insight', displayName: 'Insights Agent', sub: 'Insights & reporting', meta: '2h ago · 612 registrations', accent: '#34D399', cardBg: '#FFFFFF' },
};

// ── Initial messages ───────────────────────────────────────────────────────────

export const INITIAL_MESSAGES: Record<AgentId, ChatMessage[]> = {
  website: [
    { kind: 'agent', agentId: 'website', text: "Hi Jen, I noticed the event website is missing Dr. Sarah Chen's speaker profile. I've drafted a bio based on the event brief and her published work.", time: '2:14 PM' },
    { kind: 'agent', agentId: 'website', text: "I've placed her profile in the Speakers section — you can see the draft on the right. Everything is ready to go live. Should I publish it?", time: '2:14 PM' },
    { kind: 'agent', agentId: 'website', text: '', time: '2:15 PM', actions: [{ label: 'Approve & publish', primary: true, id: 'publish' }, { label: 'Edit first', id: 'edit' }] },
  ],
  contacts: [
    { kind: 'agent', agentId: 'contacts', text: "I found 340 contacts who opened the event invite but haven't registered. With the early-bird deadline in 3 days, this is the right moment to follow up.", time: '2:31 PM' },
    { kind: 'agent', agentId: 'contacts', text: "I've drafted a last-chance email and pulled the contact segment. Both are on the right — let me know if you'd like to adjust the tone or subject line before sending.", time: '2:31 PM' },
    { kind: 'agent', agentId: 'contacts', text: '', time: '2:32 PM', actions: [{ label: 'Send to 340 contacts', primary: true, id: 'send' }, { label: 'Edit draft', id: 'edit-draft' }] },
  ],
  insights: [
    { kind: 'agent', agentId: 'insights', text: "I've pulled the latest registration data for Tech Summit Europe 2026. You're at 612 participants — 61% of your 1,000-seat target, with 3 days left on early-bird pricing.", time: '3:02 PM' },
    { kind: 'agent', agentId: 'insights', text: "Registration velocity has been accelerating week over week. With the current pace and the early-bird deadline, I project 720–780 total registrations and €216K–€240K in revenue. Full report is on the right.", time: '3:02 PM' },
    { kind: 'agent', agentId: 'insights', text: 'Want me to share this report with the team, or draft a summary for the exec update?', time: '3:03 PM', actions: [{ label: 'Share with team', primary: true, id: 'share' }, { label: 'Draft exec summary', id: 'draft' }] },
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
