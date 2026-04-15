import React, { useState, useRef } from 'react';
import { Home, PieChart, Globe, Ticket, Bell, TrendingUp, AlertCircle, Plus, Mic, Paperclip, MoreHorizontal, ChevronLeft, ChevronRight, X, ArrowUp } from 'lucide-react';
import imgLogo from "../imports/DeviceMacBookPro14/c4121c79ef3207dcf24c7435552bb7378ad17369.png";
import imgProfile from "../imports/DeviceMacBookPro14/d48bb91af6b62d07c468e4d0ae99ca184be233a8.png";
import { Group2, Group8, Inside, Illustration } from './components/FigmaIcons';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hiddenPills, setHiddenPills] = useState<Set<number>>(new Set());
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
      <aside className={`${collapsed ? 'w-[64px]' : 'w-[200px]'} border-r border-neutral-200 flex flex-col items-center py-8 bg-white z-20 shrink-0 transition-all duration-200 overflow-visible relative`}>
        <div className={`${collapsed ? 'opacity-0 h-0 mb-0' : 'opacity-100 h-[36px] mb-12'} w-[45px] transition-all duration-200 overflow-hidden shrink-0`}>
          <img src={imgLogo} alt="Logo" className="w-full h-full object-cover pointer-events-none" />
        </div>

        <nav className="flex flex-col w-full px-2 gap-2 flex-1">
          <a href="#" className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} p-3 bg-neutral-50 rounded-md w-full text-neutral-900 font-semibold text-sm`}>
            <Home className="w-4 h-4 text-neutral-400 shrink-0" />
            {!collapsed && <span>Soham home</span>}
          </a>
          <a href="#" className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} p-3 rounded-md w-full text-neutral-700 text-sm hover:bg-neutral-50 transition-colors`}>
            <PieChart className="w-4 h-4 text-neutral-400 shrink-0" />
            {!collapsed && <span>Insights & reporting</span>}
          </a>
          <a href="#" className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} p-3 rounded-md w-full text-neutral-700 text-sm hover:bg-neutral-50 transition-colors`}>
            <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
            {!collapsed && <span>Event website</span>}
          </a>
          <a href="#" className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} p-3 rounded-md w-full text-neutral-700 text-sm hover:bg-neutral-50 transition-colors`}>
            <Ticket className="w-4 h-4 text-neutral-400 shrink-0" />
            {!collapsed && <span>Contact & tickets</span>}
          </a>
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-5 h-5 rounded-full bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 flex items-center justify-center text-neutral-400 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

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
      <main className="flex-1 relative flex flex-col items-center">
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
            <h1 className="font-serif text-[33px] text-neutral-900 text-center">Aloha, Jen</h1>
            
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
                  className="px-5 py-2 bg-neutral-50 border border-neutral-300 rounded-full text-sm text-neutral-700 hover:bg-neutral-100 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] whitespace-nowrap"
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
          <div className="bg-white p-[27px] rounded-[14px] flex flex-col gap-[14px] w-[254px] shadow-[0px_1px_9px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)] border border-neutral-100 shrink-0 cursor-pointer transition-shadow duration-150">
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
      </main>
    </div>
  );
}
