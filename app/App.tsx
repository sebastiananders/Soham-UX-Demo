import React, { useState, useRef } from 'react';
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

        <nav className="flex flex-col w-full px-2 gap-2">
          <div className="px-3 py-1.5">
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
              Agents
            </span>
          </div>
          <a href="#" onClick={e => { e.preventDefault(); setActiveCard(null); }} className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeCard === null ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Home className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Soham home</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-3 rounded-md w-full text-neutral-700 text-sm hover:bg-neutral-50 transition-colors">
            <PieChart className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Insights & reporting</span>
          </a>
          <a href="#" onClick={e => { e.preventDefault(); setActiveCard(0); }} className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeCard === 0 ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
            <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Event website</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-3 rounded-md w-full text-neutral-700 text-sm hover:bg-neutral-50 transition-colors">
            <Ticket className="w-4 h-4 text-neutral-400 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Contact & tickets</span>
          </a>
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
              <div className="bg-white p-[27px] rounded-[14px] flex flex-col gap-[14px] w-[254px] shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)] border border-neutral-100 shrink-0 cursor-pointer transition-shadow duration-150">
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
              <div className="bg-white p-[27px] rounded-[14px] flex flex-col gap-[14px] w-[254px] shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)] border border-neutral-100 shrink-0 cursor-pointer transition-shadow duration-150">
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
