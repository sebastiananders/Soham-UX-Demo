import React, { useState, useRef, useEffect } from 'react';
import { Home, PieChart, Globe, Ticket, Bell, TrendingUp, AlertCircle, Plus, Mic, Paperclip, MoreHorizontal, ChevronLeft, ChevronRight, X, ArrowUp, MessageSquare } from 'lucide-react';
import imgLogo from "../imports/DeviceMacBookPro14/c4121c79ef3207dcf24c7435552bb7378ad17369.png";
import imgProfile from "../imports/DeviceMacBookPro14/d48bb91af6b62d07c468e4d0ae99ca184be233a8.png";
import { Group2, Group8, Inside, Illustration } from './components/FigmaIcons';
import illustrationInput from './assets/illustration-input.svg';

const recentChats = [
  'Generate a schedule analysis…',
  'Win warm contacts email',
  'Speaker profile copy review',
  'Revenue projection Q2',
];

function SpeakerChatView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-screen w-full">

      {/* ── Left: Chat panel ── */}
      <div className="w-[400px] shrink-0 flex flex-col border-r border-neutral-100">

        {/* Chat header */}
        <header className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100 shrink-0">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-50 transition-colors text-neutral-400 hover:text-neutral-700 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0 scale-110 origin-center">
            <Group2 />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-neutral-900 text-sm leading-tight">Speaker profiles</h2>
            <span className="text-orange-500 font-semibold text-[11px]">Event website</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-7 px-6 flex flex-col gap-7">

          {/* Message 1 */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">2:14 PM</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Hi Jen, I noticed the event website is missing Dr. Sarah Chen's speaker profile. I've drafted a bio based on the event brief and her published work.
              </p>
            </div>
          </div>

          {/* Message 2 */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">2:14 PM</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                I've placed her profile in the Speakers section — you can see the draft on the right. Everything is ready to go live. Should I publish it?
              </p>
            </div>
          </div>

          {/* Message 3 — awaiting approval */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">2:15 PM</span>
              </div>
              <div className="flex gap-2">
                <button className="px-5 py-2 bg-[#FFF000] rounded-full text-sm font-semibold text-neutral-900 hover:brightness-95 transition-all cursor-pointer">
                  Approve & publish
                </button>
                <button className="px-5 py-2 bg-neutral-50 rounded-full text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer">
                  Edit first
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="shrink-0 pb-6 pt-3 px-5">
          <div className="w-full h-[52px] bg-white rounded-[26px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.08)] border border-neutral-100 flex items-center px-5 gap-3">
            <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Plus className="w-3 h-3 text-neutral-500" />
            </div>
            <span className="text-[15px] text-neutral-400 flex-1 pointer-events-none select-none">Reply to Soham…</span>
            <div className="flex items-center gap-3 text-neutral-400 shrink-0">
              <Mic className="w-4 h-4 cursor-pointer hover:text-neutral-600 transition-colors" />
              <Paperclip className="w-4 h-4 cursor-pointer hover:text-neutral-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Website preview panel ── */}
      <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">

        {/* Browser chrome */}
        <div className="shrink-0 flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 bg-white">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-neutral-200" />
            <div className="w-3 h-3 rounded-full bg-neutral-200" />
            <div className="w-3 h-3 rounded-full bg-neutral-200" />
          </div>
          <div className="flex-1 bg-neutral-100 rounded-md px-3 py-1.5 text-xs text-neutral-500 font-mono">
            techsummiteurope.com/speakers
          </div>
        </div>

        {/* Website content */}
        <div className="flex-1 overflow-y-auto">
          {/* Site nav */}
          <div className="bg-neutral-900 px-10 py-4 flex items-center justify-between">
            <span className="text-white font-semibold text-sm tracking-wide">TECH SUMMIT EUROPE 2026</span>
            <div className="flex gap-6">
              {['Programme', 'Speakers', 'Venue', 'Register'].map(item => (
                <span key={item} className={`text-xs font-medium cursor-pointer ${item === 'Speakers' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`}>{item}</span>
              ))}
            </div>
          </div>

          {/* Page content */}
          <div className="px-10 py-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Speakers</h2>
            <div className="w-10 h-0.5 bg-[#FFF000] mb-8" />

            {/* Speaker grid */}
            <div className="grid grid-cols-3 gap-5">

              {/* Existing speaker 1 */}
              <div className="bg-white rounded-[12px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
                <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4" />
                <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Marcus Becker</h3>
                <p className="text-xs text-neutral-500 mt-0.5 mb-3">CTO, FinEdge Group</p>
                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  Marcus leads technology strategy at FinEdge, driving digital transformation across 14 European markets.
                </p>
              </div>

              {/* Existing speaker 2 */}
              <div className="bg-white rounded-[12px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
                <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4" />
                <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Dr. Elena Vasquez</h3>
                <p className="text-xs text-neutral-500 mt-0.5 mb-3">Founder, Neura Systems</p>
                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  Pioneering human-computer interaction research, Elena founded Neura Systems after a decade at CERN's data team.
                </p>
              </div>

              {/* Proposed speaker — Dr. Sarah Chen */}
              <div className="relative bg-white rounded-[12px] p-5 border-2 border-[#FFF000] shadow-[0px_2px_12px_0px_rgba(255,240,0,0.2)]">
                <div className="absolute -top-2.5 left-4">
                  <span className="bg-[#FFF000] text-neutral-900 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                    Pending approval
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4 flex items-center justify-center">
                  <span className="text-neutral-400 text-[10px] font-medium">Photo</span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Dr. Sarah Chen</h3>
                <p className="text-xs text-neutral-500 mt-0.5 mb-3">Head of AI Research, TechCore Labs</p>
                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-4">
                  Dr. Sarah Chen leads AI research at TechCore Labs, focusing on large language models and enterprise applications. With 15+ years in ML, she has published 40+ papers and holds 12 patents.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

const warmContacts = [
  { name: 'Anna Fischer', company: 'Siemens AG', email: 'a.fischer@siemens.com', opened: '2 days ago' },
  { name: 'Luca Romano', company: 'Bain & Company', email: 'l.romano@bain.com', opened: '3 days ago' },
  { name: 'Sophie Müller', company: 'Deutsche Bank', email: 's.mueller@db.com', opened: '3 days ago' },
  { name: 'James Holloway', company: 'Accenture', email: 'j.holloway@accenture.com', opened: '4 days ago' },
  { name: 'Priya Nair', company: 'McKinsey & Co', email: 'p.nair@mckinsey.com', opened: '4 days ago' },
  { name: 'Tobias Kern', company: 'SAP SE', email: 't.kern@sap.com', opened: '5 days ago' },
];

function WarmContactsChatView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-screen w-full">

      {/* ── Left: Chat panel ── */}
      <div className="w-[400px] shrink-0 flex flex-col border-r border-neutral-100">

        {/* Chat header */}
        <header className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100 shrink-0">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-50 transition-colors text-neutral-400 hover:text-neutral-700 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-[20px] h-[30px] flex items-center justify-center shrink-0 scale-[1.2] origin-center">
            <Group8 />
          </div>
          <div className="flex flex-col ml-1">
            <h2 className="font-semibold text-neutral-900 text-sm leading-tight">Win warm contacts</h2>
            <span className="text-neutral-500 font-semibold text-[11px]">Contact & tickets</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-7 px-6 flex flex-col gap-7">

          {/* Message 1 */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">2:31 PM</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                I found 340 contacts who opened the event invite but haven't registered. With the early-bird deadline in 3 days, this is the right moment to follow up.
              </p>
            </div>
          </div>

          {/* Message 2 */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">2:31 PM</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                I've drafted a last-chance email and pulled the contact segment. Both are on the right — let me know if you'd like to adjust the tone or subject line before sending.
              </p>
            </div>
          </div>

          {/* Message 3 — action */}
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">2:32 PM</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-5 py-2 bg-[#FFF000] rounded-full text-sm font-semibold text-neutral-900 hover:brightness-95 transition-all cursor-pointer">
                  Send to 340 contacts
                </button>
                <button className="px-5 py-2 bg-neutral-50 rounded-full text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer">
                  Edit draft
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="shrink-0 pb-6 pt-3 px-5">
          <div className="w-full h-[52px] bg-white rounded-[26px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.08)] border border-neutral-100 flex items-center px-5 gap-3">
            <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Plus className="w-3 h-3 text-neutral-500" />
            </div>
            <span className="text-[15px] text-neutral-400 flex-1 pointer-events-none select-none">Reply to Soham…</span>
            <div className="flex items-center gap-3 text-neutral-400 shrink-0">
              <Mic className="w-4 h-4 cursor-pointer hover:text-neutral-600 transition-colors" />
              <Paperclip className="w-4 h-4 cursor-pointer hover:text-neutral-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Email draft + contact list ── */}
      <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">


        <div className="flex-1 overflow-y-auto flex flex-col">

          {/* Email draft */}
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-900">Email draft</h3>
              <span className="text-xs bg-[#FFF000] text-neutral-900 font-semibold px-2.5 py-0.5 rounded-full">Pending approval</span>
            </div>
            <div className="bg-white rounded-[14px] border border-neutral-100 shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              {/* Email meta */}
              <div className="border-b border-neutral-100 px-6 py-4 flex flex-col gap-2">
                <div className="flex gap-3 text-xs">
                  <span className="text-neutral-400 w-12 shrink-0">From</span>
                  <span className="text-neutral-700">Jen Thompson &lt;jen@techsummiteurope.com&gt;</span>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="text-neutral-400 w-12 shrink-0">To</span>
                  <span className="text-neutral-700">340 warm contacts <span className="text-neutral-400">(opened invite, not registered)</span></span>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="text-neutral-400 w-12 shrink-0">Subject</span>
                  <span className="text-neutral-900 font-medium">Last chance: Early-bird pricing ends Friday</span>
                </div>
              </div>
              {/* Email body */}
              <div className="px-6 py-5 text-sm text-neutral-700 leading-relaxed space-y-3">
                <p>Hi {'[First name]'},</p>
                <p>You took a look at Tech Summit Europe 2026 a few days ago — thank you for your interest. I wanted to make sure you didn't miss out on our early-bird pricing, which <strong className="font-semibold text-neutral-900">closes this Friday</strong>.</p>
                <p>After that, ticket prices increase by 40%. Secure your spot now and join 600+ tech leaders across Europe for two days of keynotes, workshops, and networking in Berlin.</p>
                <p className="pt-1">
                  <span className="inline-block bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-full cursor-default">Register at early-bird price →</span>
                </p>
                <p className="text-neutral-500 text-xs pt-2">If you have any questions, just reply to this email.<br />— Jen &amp; the Tech Summit team</p>
              </div>
            </div>
          </div>

          {/* Contact list */}
          <div className="px-8 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-900">Contact segment <span className="text-neutral-400 font-normal">· 340 contacts</span></h3>
            </div>
            <div className="bg-white rounded-[14px] border border-neutral-100 shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left px-5 py-3 text-neutral-400 font-medium">Name</th>
                    <th className="text-left px-5 py-3 text-neutral-400 font-medium">Company</th>
                    <th className="text-left px-5 py-3 text-neutral-400 font-medium">Email</th>
                    <th className="text-left px-5 py-3 text-neutral-400 font-medium">Opened</th>
                  </tr>
                </thead>
                <tbody>
                  {warmContacts.map((c, i) => (
                    <tr key={i} className={i < warmContacts.length - 1 ? 'border-b border-neutral-50' : ''}>
                      <td className="px-5 py-3 font-medium text-neutral-900">{c.name}</td>
                      <td className="px-5 py-3 text-neutral-500">{c.company}</td>
                      <td className="px-5 py-3 text-neutral-500">{c.email}</td>
                      <td className="px-5 py-3 text-neutral-400">{c.opened}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="px-5 py-3 text-neutral-400 text-center">+ 334 more contacts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

function RegistrationInsightChatView({ onBack }: { onBack: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const weeklyData = [
    { label: 'Mar 3', count: 89 },
    { label: 'Mar 10', count: 134 },
    { label: 'Mar 17', count: 156 },
    { label: 'Mar 24', count: 198 },
    { label: 'Apr 1', count: 35, current: true },
  ];
  const maxCount = 200;

  const revenueProjections = [
    { label: 'Current', value: 183600, max: 312000, color: 'bg-emerald-400' },
    { label: 'Pace projection', value: 216000, max: 312000, color: 'bg-blue-400' },
    { label: 'With early-bird push', value: 240000, max: 312000, color: 'bg-[#FFF000]' },
    { label: 'Full target', value: 312000, max: 312000, color: 'bg-neutral-200' },
  ];

  return (
    <div className="flex h-screen w-full">

      {/* ── Left: Chat panel ── */}
      <div className="w-[400px] shrink-0 flex flex-col border-r border-neutral-100">

        <header className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100 shrink-0">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-50 transition-colors text-neutral-400 hover:text-neutral-700 shrink-0">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0 scale-110 origin-center">
            <Inside />
          </div>
          <div className="flex flex-col ml-0.5">
            <h2 className="font-semibold text-neutral-900 text-sm leading-tight">Registration insight</h2>
            <span className="text-emerald-500 font-semibold text-[11px]">Insights & reporting</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto py-7 px-6 flex flex-col gap-7">

          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">3:02 PM</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                I've pulled the latest registration data for Tech Summit Europe 2026. You're at 612 participants — 61% of your 1,000-seat target, with 3 days left on early-bird pricing.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">3:02 PM</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Registration velocity has been accelerating week over week. With the current pace and the early-bird deadline, I project 720–780 total registrations — and a revenue range of €216K–€240K. Full report is on the right.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[11px] font-semibold">S</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-neutral-900">Soham</span>
                <span className="text-xs text-neutral-400">3:03 PM</span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Want me to share this report with the team, or draft a summary for the exec update?
              </p>
              <div className="flex gap-2 flex-wrap">
                <button className="px-5 py-2 bg-[#FFF000] rounded-full text-sm font-semibold text-neutral-900 hover:brightness-95 transition-all cursor-pointer">
                  Share with team
                </button>
                <button className="px-5 py-2 bg-neutral-50 rounded-full text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer">
                  Draft exec summary
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 pb-6 pt-3 px-5">
          <div className="w-full h-[52px] bg-white rounded-[26px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.08)] border border-neutral-100 flex items-center px-5 gap-3">
            <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Plus className="w-3 h-3 text-neutral-500" />
            </div>
            <span className="text-[15px] text-neutral-400 flex-1 pointer-events-none select-none">Reply to Soham…</span>
            <div className="flex items-center gap-3 text-neutral-400 shrink-0">
              <Mic className="w-4 h-4 cursor-pointer hover:text-neutral-600 transition-colors" />
              <Paperclip className="w-4 h-4 cursor-pointer hover:text-neutral-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Exec summary report ── */}
      <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">

        {loading ? (
          /* ── Loading state: perpetual B trace ── */
          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            <style>{`
              @keyframes bTrace {
                0%   { stroke-dashoffset: 1200; }
                100% { stroke-dashoffset: 0; }
              }
            `}</style>
            <svg width="72" height="72" viewBox="50 35 120 150" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M150.2 104.8C154.8 99.5 157.4 93.3001 157.4 86.6001C157.4 61.7001 138.7 43.3 98.7 43.3C75.8 43.3 58.7 50.0001 58.7 50.0001L64.7 66.0001C64.7 66.0001 77 59.3 98.7 59.3C120.4 59.3 141.4 65.5001 141.4 86.6001C141.4 89.8001 140.6 92.4001 139.1 94.6001C122.8 82.1001 101.8 74.6001 85.4 74.6001C76.1 74.6001 62.1 79.3001 62.1 92.6001C62.1 113.9 94.8 119.9 112.1 119.9C121.8 119.9 130.5 117.8 137.7 114.3C144.3 121.5 148.8 130.3 148.8 140.6C148.8 156.4 132.1 159.9 122.8 159.9C97.5 159.9 82.8 142.8 78.1 132.6L62.8 136.6V172.6H78.8V159.3C78.8 159.3 94.9 176.6 122.8 176.6C149.5 176.6 165.5 160.9 165.5 140.6C165.4 127.1 159.4 114.9 150.2 104.8ZM78.8 94.0001C78.8 87.3001 103.7 90.6001 123.8 103.1C105.2 106.6 78.8 99.9001 78.8 94.0001Z"
                fill="none"
                stroke="#171717"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: '400 800',
                  animation: 'bTrace 2.5s linear infinite',
                }}
              />
            </svg>
            <p className="text-sm text-neutral-400">Pulling most recent data…</p>
          </div>
        ) : (

        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6">

          {/* Report header */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Registration Insight Report</h2>
            <p className="text-xs text-neutral-400 mt-0.5">Tech Summit Europe 2026 · Generated April 16, 2026</p>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Registered', value: '612', sub: '61% of target', dot: 'bg-emerald-400' },
              { label: 'Revenue to date', value: '€183,600', sub: '€300 avg ticket', dot: 'bg-blue-400' },
              { label: 'Early-bird window', value: '3 days', sub: 'Closes Friday', dot: 'bg-amber-400' },
              { label: 'Remaining to goal', value: '388', sub: 'Target: 1,000 seats', dot: 'bg-neutral-300' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-[12px] p-4 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${kpi.dot}`} />
                  <span className="text-[11px] text-neutral-400 font-medium">{kpi.label}</span>
                </div>
                <p className="text-xl font-semibold text-neutral-900 leading-none">{kpi.value}</p>
                <p className="text-[11px] text-neutral-400 mt-1">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Registration velocity chart */}
          <div className="bg-white rounded-[14px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
            <h3 className="text-xs font-semibold text-neutral-700 mb-1">Registration velocity</h3>
            <p className="text-[11px] text-neutral-400 mb-5">Weekly registrations · Tech Summit Europe 2026</p>
            <div className="flex items-end gap-3 h-[100px]">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-medium text-neutral-500">{d.count}</span>
                  <div className="w-full relative flex items-end" style={{ height: '72px' }}>
                    <div
                      className={`w-full rounded-t-[4px] transition-all ${'current' in d && d.current ? 'bg-[#FFF000]' : 'bg-neutral-900'}`}
                      style={{ height: `${(d.count / maxCount) * 72}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400">{d.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 mt-4">Current week (Apr 1) is partial · Total registrations: 612</p>
          </div>

          {/* Revenue projection */}
          <div className="bg-white rounded-[14px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
            <h3 className="text-xs font-semibold text-neutral-700 mb-1">Revenue projection</h3>
            <p className="text-[11px] text-neutral-400 mb-5">Based on €300 average ticket price</p>
            <div className="flex flex-col gap-4">
              {revenueProjections.map((r, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500">{r.label}</span>
                    <span className="text-[11px] font-semibold text-neutral-900">€{r.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${r.color}`}
                      style={{ width: `${(r.value / r.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        )} {/* end loading conditional */}
      </div>

    </div>
  );
}

export default function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [pinned, setPinned] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hiddenPills, setHiddenPills] = useState<Set<number>>(new Set());
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePillClick = (text: string, index: number) => {
    setInputValue(text);
    setHiddenPills(prev => new Set(prev).add(index));
    setInputFocused(true);
    inputRef.current?.focus();
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`${collapsed ? 'w-[64px]' : 'w-[200px]'} border-r border-neutral-200 flex flex-col items-center py-8 bg-white z-20 shrink-0 transition-all duration-200 overflow-visible relative`}
        onMouseEnter={() => !pinned && setCollapsed(false)}
        onMouseLeave={() => !pinned && setCollapsed(true)}
      >
        <div className="w-[45px] h-[36px] mb-12 shrink-0">
          <img src={imgLogo} alt="Logo" className="w-full h-full object-cover pointer-events-none" />
        </div>

        {/* Soham home — standalone above sections */}
        <div className="flex flex-col w-full px-2 mb-2">
          <a href="#" onClick={e => { e.preventDefault(); setActiveCard(null); }} className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeCard === null ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Home className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Soham home</span>
          </a>
        </div>

        <nav className="flex flex-col w-full px-2 gap-2">
          <div className="px-3 py-1.5">
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
              Agents
            </span>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); setActiveCard(2); }} className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeCard === 2 ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <PieChart className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Insights & reporting</span>
          </a>
          <a href="#" onClick={e => { e.preventDefault(); setActiveCard(0); }} className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeCard === 0 ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Event website</span>
          </a>
          <a href="#" onClick={e => { e.preventDefault(); setActiveCard(1); }} className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeCard === 1 ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Ticket className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Contact & tickets</span>
          </a>
          <button className="flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-neutral-400 text-sm hover:bg-neutral-50 hover:text-neutral-600 transition-colors">
            <Plus className="w-4 h-4 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Create a new agent</span>
          </button>
        </nav>

        {/* Divider */}
        <div className="w-full px-2 my-3">
          <div className="h-px bg-neutral-100" />
        </div>

        {/* Recent chats */}
        <div className="flex flex-col w-full px-2 gap-1">
          <div className="px-3 py-1.5">
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
              Recent
            </span>
          </div>
          {recentChats.map((title, i) => (
            <a key={i} href="#" className="flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-neutral-600 text-sm hover:bg-neutral-50 transition-colors">
              <MessageSquare className="w-4 h-4 text-neutral-400 shrink-0" />
              <span className={`truncate whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
                {title}
              </span>
            </a>
          ))}
          <button className="flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-neutral-400 text-sm hover:bg-neutral-50 hover:text-neutral-600 transition-colors">
            <Plus className="w-4 h-4 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Create a new chat</span>
          </button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden relative shadow-sm shrink-0">
            <img src={imgProfile} alt="User Profile" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-auto max-w-none" />
          </div>
          {!collapsed && (
            <button className="text-neutral-700 p-1">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col items-center overflow-hidden">
        {activeCard === 0 ? (
          <SpeakerChatView onBack={() => setActiveCard(null)} />
        ) : activeCard === 1 ? (
          <WarmContactsChatView onBack={() => setActiveCard(null)} />
        ) : activeCard === 2 ? (
          <RegistrationInsightChatView onBack={() => setActiveCard(null)} />
        ) : (
          <>
            {/* Fixed coordinate space for Illustration to match Figma */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
              <div className="absolute w-[1512px] h-[980px] left-[-200px] top-0">
                <Illustration />
              </div>
            </div>

            {/* Background lower half (gray area at bottom) */}
            <div className="absolute bg-neutral-50 h-[192px] w-[823px] left-1/2 -translate-x-1/2 top-[556px] rounded-[14px] -z-10" />

            {/* Header / Notifications */}
            <header className="absolute top-6 right-6 flex items-center gap-3 z-20 cursor-pointer">
              <div className="relative">
                <Bell className="w-5 h-5 text-neutral-700" />
                <div className="absolute -top-1.5 -right-1.5 bg-blue-100 text-blue-600 text-[10px] font-semibold flex items-center justify-center w-5 h-5 rounded-full border-2 border-white">
                  8
                </div>
              </div>
              <span className="font-medium text-sm text-neutral-700">New notifications</span>
            </header>

            {/* Hero Section */}
            <div className="w-full max-w-[820px] pt-[200px] flex flex-col items-center gap-[30px] z-10 relative">

              <div className="flex flex-col items-center gap-[12px] w-full">
                <div className="flex items-center justify-center gap-3">
                  <h1 className="font-serif text-[33px] text-neutral-900">Aloha, Jen</h1>
                  <img src={illustrationInput} alt="" className="pointer-events-none" style={{ width: '52px', height: '58px', transform: 'rotate(180deg)' }} />
                </div>

                {/* Status indicators */}
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
                {/* Input Bar */}
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
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        if (e.target.value === '') setHiddenPills(new Set());
                      }}
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
                      <button
                        onClick={() => { setInputValue(''); setHiddenPills(new Set()); inputRef.current?.focus(); }}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <Mic className="w-5 h-5 cursor-pointer hover:text-neutral-600 transition-colors" />
                    <Paperclip className="w-5 h-5 cursor-pointer hover:text-neutral-600 transition-colors" />
                  </div>
                </div>
                <button
                  style={{
                    opacity: inputValue ? 1 : 0,
                    transform: inputValue ? 'scale(1)' : 'scale(0.7)',
                    pointerEvents: inputValue ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  className="w-[57px] h-[57px] rounded-full bg-[#FFF000] flex items-center justify-center shrink-0 hover:brightness-95"
                >
                  <ArrowUp className="w-5 h-5 text-neutral-900 stroke-[2.5]" />
                </button>
                </div>

                {/* Prompt Suggestions */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    'Create a new ticket category',
                    'List all VIP registrations',
                    'Add a section to event website',
                  ].map((text, i) => (
                    <button
                      key={i}
                      onClick={() => handlePillClick(text, i)}
                      style={{
                        maxWidth: hiddenPills.has(i) ? '0' : '320px',
                        opacity: hiddenPills.has(i) ? 0 : 1,
                        paddingLeft: hiddenPills.has(i) ? 0 : undefined,
                        paddingRight: hiddenPills.has(i) ? 0 : undefined,
                        overflow: 'hidden',
                        transition: 'max-width 0.35s ease, opacity 0.2s ease, padding 0.35s ease',
                      }}
                      className="px-5 py-2 bg-neutral-50 rounded-full text-sm font-normal text-neutral-700 hover:bg-white transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cards Section */}
            <div className="mt-[120px] flex gap-3 z-10 w-full max-w-[820px] justify-center px-4 mb-20">

              {/* Card 1 */}
              <div
                onClick={() => setActiveCard(0)}
                className="bg-white p-[27px] rounded-[14px] flex flex-col gap-[14px] w-[254px] shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)] border border-neutral-100 shrink-0 cursor-pointer transition-shadow duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 scale-125 origin-left">
                    <Group2 />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-neutral-900 text-[16px] leading-tight">Speaker profiles</h3>
                    <span className="text-orange-500 font-semibold text-[12px]">Event website</span>
                  </div>
                </div>
                <p className="text-[12px] text-neutral-900 leading-[1.5]">
                  Your event page is missing a speaker. Soham has drafted bio content and a layout section ready for review
                </p>
              </div>

              {/* Card 2 */}
              <div onClick={() => setActiveCard(1)} className="bg-white p-[27px] rounded-[14px] flex flex-col gap-[14px] w-[254px] shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)] border border-neutral-100 shrink-0 cursor-pointer transition-shadow duration-150">
                <div className="flex items-center gap-3">
                  <div className="w-[20px] h-[30px] flex items-center justify-center shrink-0 scale-[1.3] origin-left ml-1">
                    <Group8 />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-neutral-900 text-[16px] leading-tight">Win warm contacts</h3>
                    <span className="text-neutral-500 font-bold text-[12px]">Contact & tickets</span>
                  </div>
                </div>
                <p className="text-[12px] text-neutral-900 leading-[1.5]">
                  Draft a last-chance early-bird email to 340 warm contacts who opened the invite but haven't registered.
                </p>
              </div>

              {/* Card 3 */}
              <div onClick={() => setActiveCard(2)} className="bg-white p-[27px] rounded-[14px] flex flex-col gap-[14px] w-[254px] shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)] border border-neutral-100 shrink-0 cursor-pointer transition-shadow duration-150">
                <div className="flex items-center gap-3">
                  <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0 scale-125 origin-left">
                    <Inside />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-neutral-900 text-[16px] leading-tight">Registration insight</h3>
                    <span className="text-emerald-500 font-bold text-[12px]">Insights & reporting</span>
                  </div>
                </div>
                <p className="text-[12px] text-neutral-900 leading-[1.5]">
                  Gathered recent data about the 612 participants and a first insights into the revenue projection
                </p>
              </div>

            </div>
          </>
        )}
      </main>
    </div>
  );
}
