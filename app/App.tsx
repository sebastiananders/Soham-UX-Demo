import React, { useState, useRef, useEffect } from 'react';
import { Home, PieChart, Globe, Ticket, Bell, TrendingUp, AlertCircle, Plus, Mic, Paperclip, MoreHorizontal, ChevronLeft, ChevronRight, X, ArrowUp, MessageSquare, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Button, Tag, Badge, Avatar, Tabs, Table } from 'antd';
import type { TableProps } from 'antd';
import imgLogo from "../imports/DeviceMacBookPro14/c4121c79ef3207dcf24c7435552bb7378ad17369.png";
import imgProfile from "../imports/DeviceMacBookPro14/d48bb91af6b62d07c468e4d0ae99ca184be233a8.png";
import { Illustration } from './components/FigmaIcons';
import speakerIcon from './assets/speaker.svg';
import warmContactsIcon from './assets/warmcontacts.svg';
import regInsightIcon from './assets/reginsight.svg';

// ── Types ──────────────────────────────────────────────────────────────────────

type AgentId = 'website' | 'contacts' | 'insights';

interface ActionBtn { label: string; primary?: boolean; id: string }

type ChatMessage =
  | { kind: 'agent'; agentId: AgentId; text: string; time: string; actions?: ActionBtn[] }
  | { kind: 'user'; text: string; time: string }
  | { kind: 'handoff'; from: AgentId; to: AgentId; time: string }
  | { kind: 'task-running'; label: string }
  | { kind: 'task-done'; label: string; summary: string };

interface HistoryItem { id: string; agentId: AgentId; title: string; preview: string }

// ── Agent config ───────────────────────────────────────────────────────────────

const AGENTS: Record<AgentId, { name: string; sub: string; accent: string; icon: string }> = {
  website:  { name: 'Speaker profiles',     sub: 'Event website',        accent: '#FFF000', icon: speakerIcon },
  contacts: { name: 'Win warm contacts',    sub: 'Contact & tickets',    accent: '#3B82F6', icon: warmContactsIcon },
  insights: { name: 'Registration insight', sub: 'Insights & reporting', accent: '#10B981', icon: regInsightIcon },
};

const INITIAL_MESSAGES: Record<AgentId, ChatMessage[]> = {
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

function now() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// ── Shared: B-Trace animation ──────────────────────────────────────────────────

function BTrace({ size = 48, label }: { size?: number; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <style>{`@keyframes bTrace{0%{stroke-dashoffset:1200}100%{stroke-dashoffset:0}}`}</style>
      <svg width={size} height={size} viewBox="50 35 120 150" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M150.2 104.8C154.8 99.5 157.4 93.3001 157.4 86.6001C157.4 61.7001 138.7 43.3 98.7 43.3C75.8 43.3 58.7 50.0001 58.7 50.0001L64.7 66.0001C64.7 66.0001 77 59.3 98.7 59.3C120.4 59.3 141.4 65.5001 141.4 86.6001C141.4 89.8001 140.6 92.4001 139.1 94.6001C122.8 82.1001 101.8 74.6001 85.4 74.6001C76.1 74.6001 62.1 79.3001 62.1 92.6001C62.1 113.9 94.8 119.9 112.1 119.9C121.8 119.9 130.5 117.8 137.7 114.3C144.3 121.5 148.8 130.3 148.8 140.6C148.8 156.4 132.1 159.9 122.8 159.9C97.5 159.9 82.8 142.8 78.1 132.6L62.8 136.6V172.6H78.8V159.3C78.8 159.3 94.9 176.6 122.8 176.6C149.5 176.6 165.5 160.9 165.5 140.6C165.4 127.1 159.4 114.9 150.2 104.8ZM78.8 94.0001C78.8 87.3001 103.7 90.6001 123.8 103.1C105.2 106.6 78.8 99.9001 78.8 94.0001Z"
          fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: '400 800', animation: 'bTrace 2.5s linear infinite' }}
        />
      </svg>
      {label && <p className="text-sm text-neutral-400">{label}</p>}
    </div>
  );
}

// ── Canvas panels ──────────────────────────────────────────────────────────────

const warmContacts = [
  { name: 'Anna Fischer',    company: 'Siemens AG',      email: 'a.fischer@siemens.com',   opened: '2 days ago' },
  { name: 'Luca Romano',     company: 'Bain & Company',  email: 'l.romano@bain.com',        opened: '3 days ago' },
  { name: 'Sophie Müller',   company: 'Deutsche Bank',   email: 's.mueller@db.com',         opened: '3 days ago' },
  { name: 'James Holloway',  company: 'Accenture',       email: 'j.holloway@accenture.com', opened: '4 days ago' },
  { name: 'Priya Nair',      company: 'McKinsey & Co',   email: 'p.nair@mckinsey.com',      opened: '4 days ago' },
  { name: 'Tobias Kern',     company: 'SAP SE',          email: 't.kern@sap.com',           opened: '5 days ago' },
];

type WarmContact = typeof warmContacts[0];

const contactColumns: TableProps<WarmContact>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <span className="font-medium text-neutral-900 text-xs">{text}</span>,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (text: string) => <span className="text-neutral-500 text-xs">{text}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text: string) => <span className="text-neutral-500 text-xs">{text}</span>,
  },
  {
    title: 'Opened',
    dataIndex: 'opened',
    key: 'opened',
    render: (text: string) => <span className="text-neutral-400 text-xs">{text}</span>,
  },
];

function WebsiteCanvas() {
  return (
    <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">
      <div className="shrink-0 flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 bg-white">
        <div className="flex gap-1.5">
          {[0,1,2].map(i => <div key={i} className="w-3 h-3 rounded-full bg-neutral-200" />)}
        </div>
        <div className="flex-1 bg-neutral-100 rounded-md px-3 py-1.5 text-xs text-neutral-500 font-mono">
          techsummiteurope.com/speakers
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="bg-neutral-900 px-10 py-4 flex items-center justify-between">
          <span className="text-white font-semibold text-sm tracking-wide">TECH SUMMIT EUROPE 2026</span>
          <div className="flex gap-6">
            {['Programme', 'Speakers', 'Venue', 'Register'].map(item => (
              <span key={item} className={`text-xs font-medium cursor-pointer ${item === 'Speakers' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`}>{item}</span>
            ))}
          </div>
        </div>
        <div className="px-10 py-10">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Speakers</h2>
          <div className="w-10 h-0.5 bg-[#FFF000] mb-8" />
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white rounded-[12px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
              <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4" />
              <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Marcus Becker</h3>
              <p className="text-xs text-neutral-500 mt-0.5 mb-3">CTO, FinEdge Group</p>
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">Marcus leads technology strategy at FinEdge, driving digital transformation across 14 European markets.</p>
            </div>
            <div className="bg-white rounded-[12px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
              <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4" />
              <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Dr. Elena Vasquez</h3>
              <p className="text-xs text-neutral-500 mt-0.5 mb-3">Founder, Neura Systems</p>
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">Pioneering human-computer interaction research, Elena founded Neura Systems after a decade at CERN's data team.</p>
            </div>
            <div className="relative bg-white rounded-[12px] p-5 border-2 border-[#FFF000] shadow-[0px_2px_12px_0px_rgba(255,240,0,0.2)]">
              <div className="absolute -top-2.5 left-4">
                <Tag style={{ backgroundColor: '#FFF000', color: '#171717', borderColor: '#FFF000', fontSize: 10, fontWeight: 600, lineHeight: '18px' }}>
                  Pending approval
                </Tag>
              </div>
              <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4 flex items-center justify-center">
                <span className="text-neutral-400 text-[10px] font-medium">Photo</span>
              </div>
              <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Dr. Sarah Chen</h3>
              <p className="text-xs text-neutral-500 mt-0.5 mb-3">Head of AI Research, TechCore Labs</p>
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-4">Dr. Sarah Chen leads AI research at TechCore Labs, focusing on large language models and enterprise applications. With 15+ years in ML, she has published 40+ papers and holds 12 patents.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactsCanvas() {
  return (
    <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-900">Email draft</h3>
            <Tag style={{ backgroundColor: '#FFF000', color: '#171717', borderColor: '#FFF000', fontWeight: 600 }}>
              Pending approval
            </Tag>
          </div>
          <div className="bg-white rounded-[14px] border border-neutral-100 shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="border-b border-neutral-100 px-6 py-4 flex flex-col gap-2">
              <div className="flex gap-3 text-xs"><span className="text-neutral-400 w-12 shrink-0">From</span><span className="text-neutral-700">Jen Thompson &lt;jen@techsummiteurope.com&gt;</span></div>
              <div className="flex gap-3 text-xs"><span className="text-neutral-400 w-12 shrink-0">To</span><span className="text-neutral-700">340 warm contacts <span className="text-neutral-400">(opened invite, not registered)</span></span></div>
              <div className="flex gap-3 text-xs"><span className="text-neutral-400 w-12 shrink-0">Subject</span><span className="text-neutral-900 font-medium">Last chance: Early-bird pricing ends Friday</span></div>
            </div>
            <div className="px-6 py-5 text-sm text-neutral-700 leading-relaxed space-y-3">
              <p>Hi {'[First name]'},</p>
              <p>You took a look at Tech Summit Europe 2026 a few days ago — thank you for your interest. I wanted to make sure you didn't miss out on our early-bird pricing, which <strong className="font-semibold text-neutral-900">closes this Friday</strong>.</p>
              <p>After that, ticket prices increase by 40%. Secure your spot now and join 600+ tech leaders across Europe for two days of keynotes, workshops, and networking in Berlin.</p>
              <p className="pt-1"><span className="inline-block bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-full cursor-default">Register at early-bird price →</span></p>
              <p className="text-neutral-500 text-xs pt-2">If you have any questions, just reply to this email.<br />— Jen &amp; the Tech Summit team</p>
            </div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-900">Contact segment <span className="text-neutral-400 font-normal">· 340 contacts</span></h3>
          </div>
          <div className="bg-white rounded-[14px] border border-neutral-100 shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <Table<WarmContact>
              dataSource={warmContacts}
              columns={contactColumns}
              size="small"
              pagination={false}
              rowKey="email"
              footer={() => (
                <span className="text-neutral-400 text-center block text-xs">+ 334 more contacts</span>
              )}
              style={{ fontFamily: 'inherit' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const weeklyData = [
  { label: 'Mar 3', count: 89 },
  { label: 'Mar 10', count: 134 },
  { label: 'Mar 17', count: 156 },
  { label: 'Mar 24', count: 198 },
  { label: 'Apr 1', count: 35 },
];

const revenueScenarios = [
  { label: 'Current pace',    value: 183600, accent: '#45C4B0' },
  { label: 'Pace projection', value: 216000, accent: '#13678A' },
  { label: 'Early-bird push', value: 240000, accent: '#012030' },
  { label: 'Full target',     value: 312000, accent: '#E5E5E5' },
];

const ticketTiers = [
  { tier: 'Early-bird', registered: 289, capacity: 400, color: '#012030' },
  { tier: 'Standard',   registered: 214, capacity: 400, color: '#13678A' },
  { tier: 'VIP',        registered: 109, capacity: 200, color: '#45C4B0' },
];

function InsightsCanvas({ loading, draftState, draftChosen, rightTab, onTabChange, onChooseDraft }: {
  loading: boolean;
  draftState: 'idle' | 'thinking' | 'done';
  draftChosen: number | null;
  rightTab: 'report' | 'draft';
  onTabChange: (t: 'report' | 'draft') => void;
  onChooseDraft: (i: number) => void;
}) {
  if (loading) return <div className="flex-1 flex flex-col items-center justify-center"><BTrace size={72} label="Pulling most recent data…" /></div>;
  if (draftState === 'thinking') return <div className="flex-1 flex flex-col items-center justify-center"><BTrace size={72} label="Drafting two versions…" /></div>;

  const reportContent = (
    <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-12">
      <div>
        <h2 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase">Registration Insight Report</h2>
        <p className="text-xs text-neutral-400 mt-1">Tech Summit Europe 2026 · Generated April 17, 2026</p>
      </div>
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="text-[72px] font-semibold leading-none tracking-tighter text-neutral-900" style={{ fontVariantNumeric: 'tabular-nums' }}>612</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-base text-neutral-500 font-normal">registered</span>
            <span className="text-xs text-neutral-400">of 1,000 target</span>
          </div>
        </div>
        <div className="w-full h-[3px] bg-neutral-100 rounded-full">
          <div className="h-full rounded-full" style={{ width: '61.2%', backgroundColor: '#012030' }} />
        </div>
        <div className="flex items-center divide-x divide-neutral-100">
          <span className="pr-6 text-sm text-neutral-500"><strong className="font-semibold text-neutral-900">61%</strong> to goal</span>
          <span className="px-6 text-sm text-neutral-500"><strong className="font-semibold text-neutral-900">€183,600</strong> raised</span>
          <span className="pl-6 text-sm text-neutral-500"><strong className="font-semibold" style={{ color: '#13678A' }}>3 days</strong> of early-bird left</span>
        </div>
      </section>
      <hr className="border-t border-neutral-100" />
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Registration momentum</h3>
        <div className="relative mt-2">
          <div className="absolute z-10 pointer-events-none" style={{ left: 'calc(76% - 32px)', top: '-2px' }}>
            <div className="bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">+27% peak</div>
            <div className="w-px h-3 bg-neutral-300 mx-auto mt-0.5" />
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={weeklyData} margin={{ top: 20, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a3a3a3', fontFamily: 'inherit' }} dy={6} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a3a3a3', fontFamily: 'inherit' }} tickCount={4} width={36} />
              <ReferenceLine x="Mar 24" stroke="#e5e5e5" strokeWidth={1} strokeDasharray="3 3" />
              <Area type="monotone" dataKey="count" stroke="#012030" strokeWidth={1.5} fill="#45C4B0" fillOpacity={0.12} dot={false} activeDot={{ r: 3, fill: '#012030', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-neutral-400">Velocity accelerating — Mar 24 was your strongest week · Current week (Apr 1) is partial</p>
      </section>
      <hr className="border-t border-neutral-100" />
      <section className="flex flex-col gap-5">
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Ticket tier fill rate</h3>
          <p className="text-[11px] text-neutral-400 mt-1">Registered vs. capacity per tier</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {ticketTiers.map(tier => {
            const pct = Math.round((tier.registered / tier.capacity) * 100);
            return (
              <div key={tier.tier} className="flex flex-col gap-3 relative">
                {tier.tier === 'Early-bird' && (
                  <span className="absolute -top-2 right-0 text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: '#e8f6f8', border: '1px solid #13678A', color: '#012030' }}>Closes in 3 days</span>
                )}
                <span className="text-xs font-semibold text-neutral-700">{tier.tier}</span>
                <div className="w-full h-[5px] bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: tier.color }} />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-semibold text-neutral-900 tabular-nums leading-none">{pct}%</span>
                  <span className="text-[10px] text-neutral-400">{tier.registered} / {tier.capacity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr className="border-t border-neutral-100" />
      <section className="flex flex-col gap-5">
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Revenue scenarios</h3>
          <p className="text-[11px] text-neutral-400 mt-1">Based on €300 average ticket price</p>
        </div>
        <div className="flex flex-col gap-7 pt-1">
          {revenueScenarios.map(s => {
            const pct = (s.value / 312000) * 100;
            return (
              <div key={s.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{s.label}</span>
                  <span className="text-sm font-semibold text-neutral-900 tabular-nums">€{(s.value / 1000).toFixed(0)}K</span>
                </div>
                <div className="relative w-full h-[1px] bg-neutral-100">
                  <div className="absolute top-0 left-0 h-[1px]" style={{ width: `${pct}%`, backgroundColor: s.accent === '#E5E5E5' ? '#d4d4d4' : s.accent }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full border-2 border-white"
                    style={{ left: `calc(${Math.min(pct, 98)}% - 4px)`, backgroundColor: s.accent === '#E5E5E5' ? '#d4d4d4' : s.accent }} />
                </div>
              </div>
            );
          })}
          <div className="flex justify-between pt-1">
            <span className="text-[10px] text-neutral-300">€0</span>
            <span className="text-[10px] text-neutral-300">€312K full target</span>
          </div>
        </div>
      </section>
    </div>
  );

  const draftContent = (
    <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-8">
      <div>
        <h2 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase">Exec Summary Drafts</h2>
        <p className="text-xs text-neutral-400 mt-1">Tech Summit Europe 2026 · Two tone variants — pick one</p>
      </div>
      <div className="flex flex-col gap-5">
        {[
          { id: 0, label: 'Formal / data-led', text: "Tech Summit Europe 2026 has reached 612 registrations (61% of the 1,000-seat target), generating €183,600 in revenue. Registration velocity peaked at 198 in the week of Mar 24. With 3 days remaining on early-bird pricing, the projected range is 720–780 total registrations and €216K–€240K in revenue." },
          { id: 1, label: 'Narrative / momentum', text: "We're 61% to goal and accelerating — last week was our strongest yet. With early-bird closing in 3 days, we have a real window to push. At current pace we're on track for €216K; if we activate the early-bird push, €240K is within reach. Now's the moment to move." },
        ].map(v => (
          <div key={v.id} onClick={() => onChooseDraft(draftChosen === v.id ? -1 : v.id)}
            className="rounded-[16px] border p-6 flex flex-col gap-4 cursor-pointer transition-all"
            style={{ borderColor: draftChosen === v.id ? '#45C4B0' : '#e5e5e5', backgroundColor: draftChosen === v.id ? '#f4fcfb' : '#fafafa' }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">{v.label}</span>
              {draftChosen === v.id && (
                <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: '#13678A' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Selected
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">{v.text}</p>
            <Button
              shape="round"
              size="small"
              type="primary"
              onClick={e => { e.stopPropagation(); onChooseDraft(v.id); }}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: draftChosen === v.id ? '#13678A' : '#012030',
                borderColor: draftChosen === v.id ? '#13678A' : '#012030',
              }}
            >
              {draftChosen === v.id ? 'Chosen' : 'Use this'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  if (draftState !== 'done') {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {reportContent}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <Tabs
        activeKey={rightTab}
        onChange={key => onTabChange(key as 'report' | 'draft')}
        items={[
          { key: 'report', label: 'Insight Report', children: reportContent },
          { key: 'draft', label: 'Exec Summary', children: draftContent },
        ]}
        tabBarStyle={{ paddingLeft: 40, paddingRight: 40, marginBottom: 0, borderBottom: '1px solid #f5f5f5' }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        className="insights-tabs"
      />
    </div>
  );
}

// ── Unified Chat View ──────────────────────────────────────────────────────────

function UnifiedChatView({ initialAgent, onBack }: { initialAgent: AgentId; onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES[initialAgent]);
  const [activeAgent, setActiveAgent] = useState<AgentId>(initialAgent);
  const [canvasMode, setCanvasMode] = useState<AgentId>(initialAgent);
  const [inputValue, setInputValue] = useState('');
  const [userReplyCount, setUserReplyCount] = useState(0);
  const [canvasVisible, setCanvasVisible] = useState(true);

  // Insights-specific state
  const [insightsLoading, setInsightsLoading] = useState(initialAgent === 'insights');
  const [draftState, setDraftState] = useState<'idle' | 'thinking' | 'done'>('idle');
  const [draftChosen, setDraftChosen] = useState<number | null>(null);
  const [rightTab, setRightTab] = useState<'report' | 'draft'>('report');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialAgent === 'insights') {
      const t = setTimeout(() => setInsightsLoading(false), 3500);
      return () => clearTimeout(t);
    }
  }, [initialAgent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cross-fade canvas on agent switch
  const switchCanvas = (newAgent: AgentId) => {
    setCanvasVisible(false);
    setTimeout(() => {
      setCanvasMode(newAgent);
      setCanvasVisible(true);
    }, 250);
  };

  const addMessages = (msgs: ChatMessage[]) => {
    setMessages(prev => [...prev, ...msgs]);
  };

  const triggerHandoff = (from: AgentId, to: AgentId) => {
    const t = now();
    const handoffMsgs: ChatMessage[] = [
      { kind: 'agent', agentId: from, text: `Happy to hand this off — let me bring in ${to === 'contacts' ? 'Maya, our contacts specialist' : to === 'insights' ? 'Kai, our analytics agent' : 'the website agent'}.`, time: t },
      { kind: 'handoff', from, to, time: t },
      { kind: 'agent', agentId: to, text: to === 'contacts'
          ? "Hi Jen! I'm Maya. I can see your warm contacts campaign — 340 people opened the invite but haven't registered. Want me to draft a follow-up email?"
          : to === 'insights'
          ? "Hi Jen! I'm Kai. I can pull the latest registration data and projections for you. Give me a moment."
          : "Hi Jen! I can help with the event website. What would you like to work on?",
        time: t },
    ];
    setTimeout(() => {
      addMessages(handoffMsgs);
      setActiveAgent(to);
      switchCanvas(to);
    }, 600);
  };

  const handleAction = (id: string) => {
    const t = now();
    if (id === 'publish') {
      addMessages([
        { kind: 'user', text: 'Approve & publish', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Dr. Sarah Chen's profile is now live on the speakers page. Great call — the bio reads really well.", time: t },
      ]);
      setUserReplyCount(c => c + 1);
    } else if (id === 'edit') {
      addMessages([
        { kind: 'user', text: 'Edit first', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Sure! What would you like to change — the bio text, the title, or the photo?", time: t },
      ]);
      setUserReplyCount(c => c + 1);
    } else if (id === 'send') {
      addMessages([
        { kind: 'user', text: 'Send to 340 contacts', time: t },
        { kind: 'agent', agentId: 'contacts', text: "On it! Sending the early-bird email to all 340 contacts. I'll let you know as soon as it's done.", time: t },
        { kind: 'task-running', label: 'Sending emails to 340 contacts…' },
      ]);
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-running');
          return [...next, { kind: 'task-done', label: 'Email campaign sent', summary: '340 emails delivered · avg open rate 42% expected' }];
        });
      }, 4000);
    } else if (id === 'edit-draft') {
      addMessages([
        { kind: 'user', text: 'Edit draft', time: t },
        { kind: 'agent', agentId: 'contacts', text: "Of course — what would you like to change? The subject line, tone, or the CTA?", time: t },
      ]);
    } else if (id === 'share') {
      addMessages([
        { kind: 'user', text: 'Share with team', time: t },
        { kind: 'agent', agentId: 'insights', text: "Done! I've shared the report with your team members. They'll receive a link via email.", time: t },
      ]);
    } else if (id === 'draft') {
      addMessages([
        { kind: 'user', text: 'Draft exec summary', time: t },
        { kind: 'agent', agentId: 'insights', text: "On it — drafting two versions for you right now.", time: t },
        { kind: 'task-running', label: 'Drafting exec summary variants…' },
      ]);
      setDraftState('thinking');
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-running');
          return [
            ...next,
            { kind: 'task-done', label: 'Exec summary ready', summary: 'Two tone variants drafted — formal & narrative' },
            { kind: 'agent', agentId: 'insights' as AgentId, text: 'Two drafts are ready — pick your tone in the Exec Summary tab on the right →', time: now() },
          ];
        });
        setDraftState('done');
        setRightTab('draft');
      }, 3000);
    }
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    const t = now();
    const count = userReplyCount + 1;
    setUserReplyCount(count);
    setInputValue('');

    addMessages([{ kind: 'user', text, time: t }]);

    // Auto-reply logic
    setTimeout(() => {
      if (activeAgent === 'website' && count >= 2) {
        triggerHandoff('website', 'contacts');
      } else if (activeAgent === 'website') {
        addMessages([{ kind: 'agent', agentId: 'website', text: "Got it! I'll keep that in mind while finalising the speaker section.", time: now() }]);
      } else if (activeAgent === 'contacts') {
        addMessages([{ kind: 'agent', agentId: 'contacts', text: "Noted — I'll adjust the email draft accordingly. Anything else you'd like to tweak?", time: now() }]);
      } else if (activeAgent === 'insights') {
        addMessages([{ kind: 'agent', agentId: 'insights', text: "Good question. Based on current velocity, I'd estimate we reach 75% capacity before the early-bird window closes.", time: now() }]);
      }
    }, 700);
  };

  const agentInfo = AGENTS[activeAgent];

  const agentAvatarColor: Record<AgentId, string> = {
    website:  '#FFF000',
    contacts: '#3B82F6',
    insights: '#10B981',
  };

  const agentTagColor: Record<AgentId, string> = {
    website:  '#7a7000',
    contacts: '#1d4ed8',
    insights: '#047857',
  };

  const renderMessage = (msg: ChatMessage, i: number) => {
    if (msg.kind === 'user') {
      return (
        <div key={i} className="flex justify-end">
          <div className="bg-neutral-100 rounded-[14px] rounded-tr-[4px] px-4 py-3 max-w-[270px]">
            <p className="text-sm text-neutral-800">{msg.text}</p>
          </div>
        </div>
      );
    }

    if (msg.kind === 'agent') {
      const agent = AGENTS[msg.agentId];
      return (
        <div key={i} className="flex gap-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden border border-neutral-100"
            style={{ backgroundColor: agentAvatarColor[msg.agentId] + '22' }}>
            <img src={agent.icon} className="w-4 h-4 object-contain" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-neutral-900">Soham</span>
              <Tag
                style={{
                  backgroundColor: agentAvatarColor[msg.agentId] + '22',
                  color: agentTagColor[msg.agentId],
                  borderColor: 'transparent',
                  fontSize: 10,
                  fontWeight: 500,
                  lineHeight: '18px',
                }}
              >
                {agent.sub}
              </Tag>
              <span className="text-xs text-neutral-400">{msg.time}</span>
            </div>
            {msg.text && <p className="text-sm text-neutral-700 leading-relaxed">{msg.text}</p>}
            {msg.actions && (
              <div className="flex gap-2 flex-wrap">
                {msg.actions.map(a => (
                  <Button
                    key={a.id}
                    shape="round"
                    onClick={() => handleAction(a.id)}
                    style={a.primary
                      ? { backgroundColor: '#FFF000', borderColor: '#FFF000', color: '#171717', fontWeight: 600 }
                      : { backgroundColor: '#f5f5f5', borderColor: 'transparent', color: '#404040', fontWeight: 600 }
                    }
                  >
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (msg.kind === 'handoff') {
      const fromAgent = AGENTS[msg.from];
      const toAgent = AGENTS[msg.to];
      return (
        <div key={i} className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-neutral-100" />
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: agentAvatarColor[msg.from] + '33' }}>
              <img src={fromAgent.icon} className="w-3 h-3 object-contain" />
            </div>
            <span className="text-[11px] text-neutral-400">→</span>
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: agentAvatarColor[msg.to] + '33' }}>
              <img src={toAgent.icon} className="w-3 h-3 object-contain" />
            </div>
            <span className="text-[11px] text-neutral-500 font-medium">Switching to {toAgent.sub}</span>
          </div>
          <div className="flex-1 h-px bg-neutral-100" />
        </div>
      );
    }

    if (msg.kind === 'task-running') {
      return (
        <div key={i} className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
            <BTrace size={14} />
          </div>
          <div className="flex flex-col gap-1 py-1">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-300 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
              <span className="text-xs text-neutral-400">{msg.label}</span>
            </div>
          </div>
        </div>
      );
    }

    if (msg.kind === 'task-done') {
      return (
        <div key={i} className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="flex flex-col gap-0.5 py-1">
            <span className="text-sm font-semibold text-neutral-900">{msg.label}</span>
            <span className="text-xs text-neutral-400">{msg.summary}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen w-full">
      {/* ── Left: Chat panel ── */}
      <div className="w-[400px] shrink-0 flex flex-col border-r border-neutral-100">
        {/* Header with accent line */}
        <header className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100 shrink-0 relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-sm transition-colors duration-300"
            style={{ backgroundColor: agentAvatarColor[activeAgent] === '#FFF000' ? '#FFF000' : agentAvatarColor[activeAgent] }} />
          <Button
            type="text"
            onClick={onBack}
            icon={<ChevronLeft className="w-4 h-4" />}
            style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: '#a3a3a3', flexShrink: 0 }}
          />
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: agentAvatarColor[activeAgent] + '22' }}>
            <img src={agentInfo.icon} className="w-4 h-4 object-contain" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-neutral-900 text-sm leading-tight">{agentInfo.name}</h2>
            <span className="text-neutral-400 font-semibold text-[11px]">{agentInfo.sub}</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-7 px-6 flex flex-col gap-6">
          {messages.map((msg, i) => renderMessage(msg, i))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="shrink-0 pb-6 pt-3 px-5">
          <div className="w-full h-[52px] bg-white rounded-[26px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.08)] border border-neutral-100 flex items-center px-5 gap-3">
            <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Plus className="w-3 h-3 text-neutral-500" />
            </div>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Reply to Soham…"
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
            />
            <div className="flex items-center gap-2 shrink-0">
              {inputValue && (
                <button onClick={handleSend}
                  className="w-7 h-7 rounded-full bg-[#FFF000] flex items-center justify-center hover:brightness-95 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                </button>
              )}
              <Mic className="w-4 h-4 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors" />
              <Paperclip className="w-4 h-4 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Canvas (cross-fades on agent switch) ── */}
      <div className="flex-1 flex flex-col overflow-hidden transition-opacity duration-300" style={{ opacity: canvasVisible ? 1 : 0 }}>
        {canvasMode === 'website' && <WebsiteCanvas />}
        {canvasMode === 'contacts' && <ContactsCanvas />}
        {canvasMode === 'insights' && (
          <InsightsCanvas
            loading={insightsLoading}
            draftState={draftState}
            draftChosen={draftChosen}
            rightTab={rightTab}
            onTabChange={setRightTab}
            onChooseDraft={i => setDraftChosen(i === draftChosen ? null : i)}
          />
        )}
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hiddenPills, setHiddenPills] = useState<Set<number>>(new Set());
  const [activeSession, setActiveSession] = useState<AgentId | null>(null);
  const [chatHistory, setChatHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePillClick = (text: string, index: number) => {
    setInputValue(text);
    setHiddenPills(prev => new Set(prev).add(index));
    setInputFocused(true);
    inputRef.current?.focus();
  };

  const openAgent = (agentId: AgentId) => {
    setActiveSession(agentId);
  };

  const handleBack = () => {
    if (activeSession) {
      const agent = AGENTS[activeSession];
      setChatHistory(prev => {
        const alreadyExists = prev.some(h => h.agentId === activeSession);
        if (alreadyExists) return prev;
        return [{ id: Date.now().toString(), agentId: activeSession, title: agent.name, preview: INITIAL_MESSAGES[activeSession][0].kind === 'agent' ? (INITIAL_MESSAGES[activeSession][0] as any).text.slice(0, 50) + '…' : '' }, ...prev];
      });
    }
    setActiveSession(null);
  };

  const sidebarAgentActive = (agentId: AgentId) => activeSession === agentId;

  return (
    <div className="flex min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? 'w-[64px]' : 'w-[200px]'} border-r border-neutral-200 flex flex-col items-center py-8 bg-white z-20 shrink-0 transition-all duration-200 overflow-visible relative`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="w-[45px] h-[36px] mb-12 shrink-0">
          <img src={imgLogo} alt="Logo" className="w-full h-full object-cover pointer-events-none" />
        </div>

        <div className="flex flex-col w-full px-2 mb-2">
          <a href="#" onClick={e => { e.preventDefault(); setActiveSession(null); }}
            className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeSession === null ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Home className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Soham home</span>
          </a>
        </div>

        <nav className="flex flex-col w-full px-2 gap-2">
          <div className="px-3 py-1.5">
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Recent chats</span>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); openAgent('insights'); }}
            className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${sidebarAgentActive('insights') ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <PieChart className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Insights & reporting</span>
          </a>
          <a href="#" onClick={e => { e.preventDefault(); openAgent('website'); }}
            className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${sidebarAgentActive('website') ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Event website</span>
          </a>
          <a href="#" onClick={e => { e.preventDefault(); openAgent('contacts'); }}
            className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${sidebarAgentActive('contacts') ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Ticket className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Contact & tickets</span>
          </a>
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3">
          <Avatar src={imgProfile} size={40} style={{ flexShrink: 0, cursor: 'pointer' }} />
          {!collapsed && (
            <Button type="text" icon={<MoreHorizontal className="w-5 h-5" />} style={{ color: '#404040', padding: 4 }} />
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col items-center overflow-hidden">
        {activeSession ? (
          <UnifiedChatView key={activeSession} initialAgent={activeSession} onBack={handleBack} />
        ) : (
          <>
            {/* Fixed coordinate space for Illustration */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
              <div className="absolute w-[1512px] h-[980px] left-[-200px] top-0">
                <Illustration />
              </div>
            </div>

            {/* Background lower half */}
            <div className="absolute bg-neutral-50 h-[260px] w-[823px] left-1/2 -translate-x-1/2 top-[530px] rounded-[14px] -z-10" />

            {/* Header / Notifications */}
            <header className="absolute top-6 right-6 flex items-center gap-3 z-20 cursor-pointer">
              <Badge count={8} style={{ backgroundColor: '#dbeafe', color: '#2563eb', boxShadow: '0 0 0 2px white', fontSize: 10, fontWeight: 600 }}>
                <Bell className="w-5 h-5 text-neutral-700" />
              </Badge>
              <span className="font-medium text-sm text-neutral-700">New notifications</span>
            </header>

            {/* Hero */}
            <div className="w-full max-w-[820px] pt-[200px] flex flex-col items-center gap-[30px] z-10 relative">
              <div className="flex flex-col items-center gap-[12px] w-full">
                <h1 className="font-serif text-[33px] text-neutral-900">Aloha, Jen</h1>
                <div className="flex items-center justify-center gap-3 px-6 py-3">
                  <p className="flex items-center gap-1.5 text-sm text-neutral-700">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>Registration is at 61% of target</span>
                  </p>
                  <div className="w-px h-5 bg-neutral-200 mx-2" />
                  <p className="flex items-center gap-1.5 text-sm text-neutral-700">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span>The early-bird deadline is in 3 days</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-[18px] relative w-full">
                <div className="flex items-center gap-3">
                  <div className="w-[600px] h-[57px] bg-white rounded-[28.5px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.1)] flex items-center px-[20px] gap-3">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                      <Plus className="w-3.5 h-3.5 text-neutral-500" />
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        ref={inputRef}
                        value={inputValue}
                        onChange={e => { setInputValue(e.target.value); if (e.target.value === '') setHiddenPills(new Set()); }}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        className="w-full bg-transparent border-none outline-none text-[16px] text-neutral-900"
                      />
                      {!inputFocused && !inputValue && (
                        <span className="absolute inset-0 flex items-center text-[16px] text-neutral-400 pointer-events-none">
                          Generate a schedule analysis for Tech Summit Europe 2026
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-neutral-400 shrink-0">
                      {inputValue && (
                        <button onClick={() => { setInputValue(''); setHiddenPills(new Set()); inputRef.current?.focus(); }} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <Mic className="w-5 h-5 cursor-pointer hover:text-neutral-600 transition-colors" />
                      <Paperclip className="w-5 h-5 cursor-pointer hover:text-neutral-600 transition-colors" />
                    </div>
                  </div>
                  <button style={{ opacity: inputValue ? 1 : 0, transform: inputValue ? 'scale(1)' : 'scale(0.7)', pointerEvents: inputValue ? 'auto' : 'none', transition: 'opacity 0.2s ease, transform 0.2s ease' }}
                    className="w-[57px] h-[57px] rounded-full bg-[#FFF000] flex items-center justify-center shrink-0 hover:brightness-95">
                    <ArrowUp className="w-5 h-5 text-neutral-900 stroke-[2.5]" />
                  </button>
                </div>

                {/* Prompt Suggestions */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {['Create a new ticket category', 'List all VIP registrations', 'Add a section to event website'].map((text, i) => (
                    <button key={i} onClick={() => handlePillClick(text, i)}
                      style={{ maxWidth: hiddenPills.has(i) ? '0' : '320px', opacity: hiddenPills.has(i) ? 0 : 1, paddingLeft: hiddenPills.has(i) ? 0 : undefined, paddingRight: hiddenPills.has(i) ? 0 : undefined, overflow: 'hidden', transition: 'max-width 0.35s ease, opacity 0.2s ease, padding 0.35s ease' }}
                      className="px-5 py-2 bg-neutral-50 rounded-full text-sm font-normal text-neutral-700 hover:bg-white transition-colors whitespace-nowrap cursor-pointer">
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Chats */}
            <div className="mt-[80px] z-10 w-full max-w-[820px] px-4 mb-20">
              <p className="text-xs font-medium text-neutral-400 mb-3 px-1">Recent chats</p>
              <div className="flex flex-col gap-2">
                {([
                  { id: 'insights' as AgentId, label: 'Want me to share this report with the team, or draft a summary for the exec update?', status: 'Awaiting reply', awaiting: true, source: 'Registration insight', time: '2h' },
                  { id: 'website' as AgentId, label: 'Should I add the speaker section to the live page, or keep it as a draft?', status: 'Awaiting reply', awaiting: true, source: 'Speaker profiles', time: '1d' },
                  { id: 'contacts' as AgentId, label: 'Win warm contacts', status: 'Active', awaiting: false, source: 'Contact & tickets', time: '3d' },
                ]).map(chat => (
                  <div key={chat.id} onClick={() => openAgent(chat.id)}
                    className="flex items-center gap-3 px-4 py-3.5 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${chat.awaiting ? 'bg-blue-500 animate-pulse' : 'bg-neutral-300'}`} />
                    <span className={`text-sm shrink-0 ${chat.awaiting ? 'text-blue-500' : 'text-neutral-400'}`}>{chat.status}</span>
                    <span className="text-sm font-semibold text-neutral-900 flex-1 min-w-0 truncate">{chat.label}</span>
                    <span className="text-sm text-neutral-400 shrink-0">{chat.source}</span>
                    <span className="text-sm text-neutral-400 shrink-0 w-6 text-right">{chat.time}</span>
                    <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
