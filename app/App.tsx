import React, { useState, useRef } from 'react';
import { Home, Globe, Ticket, PieChart, Bell, TrendingUp, AlertCircle, Plus, Mic, Paperclip, MoreHorizontal, ChevronRight, X, ArrowUp } from 'lucide-react';
import { Badge, Avatar } from 'antd';
import imgLogo from "../imports/DeviceMacBookPro14/c4121c79ef3207dcf24c7435552bb7378ad17369.png";
import imgProfile from "../imports/DeviceMacBookPro14/d48bb91af6b62d07c468e4d0ae99ca184be233a8.png";
import { Illustration } from './components/FigmaIcons';
import { UnifiedChatView } from './components/UnifiedChatView';
import { AgentAvatar } from './components/AgentAvatar';
import type { AgentId, HistoryItem } from '../types';
import { AGENTS, INITIAL_MESSAGES } from '../constants';

const ACTIVITY_ITEMS: { id: AgentId; label: string; meta: string; awaiting: boolean }[] = [
  { id: 'insights', label: 'Want me to share this report with the team, or draft a summary for the exec update?', meta: 'Insights & reporting · awaiting response · 2h ago', awaiting: true },
  { id: 'website',  label: 'Should I add the speaker section to the live page, or keep it as a draft?',           meta: 'Event website · awaiting response · 1d ago',        awaiting: true },
  { id: 'contacts', label: 'Win warm contacts',                                                                    meta: 'Contact & tickets · last active 3d ago',             awaiting: false },
];

export default function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hiddenPills, setHiddenPills] = useState<Set<number>>(new Set());
  const [activeSession, setActiveSession] = useState<AgentId | null>(null);
  const [chatHistory, setChatHistory] = useState<HistoryItem[]>([]);
  const [showActivity, setShowActivity] = useState(false);
  const [activeChatsOpen, setActiveChatsOpen] = useState(true);
  const [recentChatsOpen, setRecentChatsOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const pillSuggestions = [
    { label: 'Create a new ticket category', full: 'Create a new ticket category for group registrations with a 10% discount for teams of 5 or more.' },
    { label: 'List all VIP registrations', full: 'List all VIP registrations for Tech Summit Europe 2026, including name, company, and contact details.' },
    { label: 'Add a section to event website', full: 'Add a section to the event website showcasing our keynote speakers with their bios and session details.' },
  ];

  const handlePillClick = (full: string, index: number) => {
    setInputValue(full);
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
        const firstMsg = INITIAL_MESSAGES[activeSession][0];
        const preview = firstMsg.kind === 'agent' ? firstMsg.text.slice(0, 50) + '…' : '';
        return [{ id: Date.now().toString(), agentId: activeSession, title: agent.name, preview }, ...prev];
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
          {/* Active chats section */}
          <button onClick={() => !collapsed && setActiveChatsOpen(v => !v)}
            className={`flex items-center justify-between px-3 py-1.5 w-full rounded-md ${!collapsed ? 'hover:bg-neutral-50 transition-colors' : ''}`}>
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Active chats</span>
            {!collapsed && (
              <ChevronRight className={`w-3 h-3 text-neutral-300 transition-transform duration-200 ${activeChatsOpen ? 'rotate-90' : ''}`} />
            )}
          </button>
          {activeChatsOpen && ([
            { id: 'insights' as AgentId, label: 'Insights & reporting', meta: '2h ago · 612 registrations', awaiting: true  },
            { id: 'website'  as AgentId, label: 'Event website',         meta: '1d ago · Draft ready',       awaiting: true  },
            { id: 'contacts' as AgentId, label: 'Contact & tickets',     meta: '3d ago · 340 warm contacts', awaiting: false },
          ]).map(item => (
            <a key={item.id} href="#" onClick={e => { e.preventDefault(); openAgent(item.id); }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-sm ${sidebarAgentActive(item.id) ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
              <div className="relative shrink-0">
                <AgentAvatar agentId={item.id} size={20} />
                {item.awaiting && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
              </div>
              <div className={`flex flex-col min-w-0 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
                <span className="whitespace-nowrap text-sm">{item.label}</span>
                <span className="whitespace-nowrap text-[10px] text-neutral-400 font-normal mt-0.5">{item.meta}</span>
              </div>
            </a>
          ))}

          {/* Recent chats section */}
          <button onClick={() => !collapsed && setRecentChatsOpen(v => !v)}
            className={`flex items-center justify-between px-3 pt-3 pb-1.5 w-full rounded-md ${!collapsed ? 'hover:bg-neutral-50 transition-colors' : ''}`}>
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Recent chats</span>
            {!collapsed && (
              <ChevronRight className={`w-3 h-3 text-neutral-300 transition-transform duration-200 ${recentChatsOpen ? 'rotate-90' : ''}`} />
            )}
          </button>
          {recentChatsOpen && (chatHistory.length === 0 ? (
            <div className={`px-3 py-1.5 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-xs text-neutral-300 whitespace-nowrap">No recent chats yet</span>
            </div>
          ) : (
            chatHistory.map(item => (
              <a key={item.id} href="#" onClick={e => { e.preventDefault(); openAgent(item.agentId); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-sm text-neutral-500 hover:bg-neutral-50 transition-colors">
                <AgentAvatar agentId={item.agentId} size={20} />
                <div className={`flex flex-col min-w-0 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
                  <span className="whitespace-nowrap text-sm">{AGENTS[item.agentId].sub}</span>
                  <span className="whitespace-nowrap text-[10px] text-neutral-400 font-normal mt-0.5">{item.preview}</span>
                </div>
              </a>
            ))
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3 w-full px-2 relative">
          {/* Activity bell */}
          <div className="relative w-full">
            <button
              onClick={() => setShowActivity(v => !v)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-sm text-neutral-700 hover:bg-neutral-50 transition-colors ${showActivity ? 'bg-neutral-50' : ''}`}
            >
              <div className="relative shrink-0">
                <Badge count={ACTIVITY_ITEMS.filter(i => i.awaiting).length} style={{ backgroundColor: '#dbeafe', color: '#2563eb', boxShadow: '0 0 0 2px white', fontSize: 9, fontWeight: 600 }}>
                  <Bell className="w-4 h-4 text-neutral-500" />
                </Badge>
              </div>
              <span className={`whitespace-nowrap text-sm transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>Activity</span>
            </button>

            {showActivity && (
              <>
                <div className="fixed inset-0" onClick={() => setShowActivity(false)} />
                <div className="absolute bottom-full left-full mb-2 ml-2 w-[380px] bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] border border-neutral-100 z-50 overflow-hidden">
                  <div className="px-5 pt-5 pb-3">
                    <p className="text-xs font-medium text-neutral-400">Activity</p>
                  </div>
                  <div className="flex flex-col gap-2 px-3 pb-3">
                    {ACTIVITY_ITEMS.map(chat => (
                      <div key={chat.id} onClick={() => { setShowActivity(false); openAgent(chat.id); }}
                        className="flex items-center gap-3 px-4 py-3.5 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 self-start mt-[7px] ${chat.awaiting ? 'bg-blue-500 animate-pulse' : 'bg-neutral-300'}`} />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-medium text-neutral-900 truncate">{chat.label}</span>
                          <span className="text-xs text-neutral-400 mt-0.5">{chat.meta}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Avatar src={imgProfile} size={40} style={{ flexShrink: 0, cursor: 'pointer' }} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col items-center overflow-hidden">

        {activeSession ? (
          <UnifiedChatView key={activeSession} initialAgent={activeSession} onBack={handleBack} />
        ) : (
          <>
            {/* Illustration background */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
              <div className="absolute w-[1512px] h-[980px] left-[-200px] top-0">
                <Illustration />
              </div>
            </div>

            {/* Top block — greeting + agent cards */}
            <div className="flex-1 w-full max-w-[820px] flex flex-col items-center justify-center gap-16 z-10 relative px-4">
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-[42px] text-neutral-900 tracking-tight" style={{ fontFamily: 'GalaxieCopernicus, serif' }}>Aloha, Jen</h1>
                  <p className="text-base text-neutral-400">Let's get some work done</p>
                </div>
                <div className="flex items-center justify-center gap-3 px-6 py-2">
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

              {/* Agent Cards */}
              <div className="flex gap-3 justify-center w-full">
                {([
                  { id: 'website'  as AgentId, title: 'Add speaker bio',     desc: "Dr. Sarah Chen's profile is missing from the speakers page. The bio is drafted and reviewed — ready to publish with one tap.", badge: 'Event website',        badgeIcon: <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> },
                  { id: 'contacts' as AgentId, title: 'Win warm contacts',    desc: "340 contacts opened your invite but haven't registered. Early-bird closes in 3 days — last-chance email is drafted and ready.", badge: 'Contact & tickets',    badgeIcon: <Ticket className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> },
                  { id: 'insights' as AgentId, title: 'See event insights', desc: "612 registrations — 61% of target, velocity climbing week over week. Revenue projections and full report are ready to review.", badge: 'Insights & reporting', badgeIcon: <PieChart className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> },
                ]).map(card => (
                  <div key={card.id} onClick={() => openAgent(card.id)}
                    className="bg-white p-6 rounded-[0.85175rem] flex flex-col gap-2 w-[290px] aspect-[3/2] overflow-hidden shadow-[0_1.136px_9.085px_0_rgba(0,0,0,0.05)] hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)] border-[1.136px] border-[#ECEAEA] shrink-0 cursor-pointer transition-shadow duration-150">
                    <div className="flex items-center gap-3">
                      <AgentAvatar agentId={card.id} size={24} />
                      <h3 className="font-semibold text-neutral-900 text-[15px] leading-tight">{card.title}</h3>
                    </div>
                    <p className="text-[13px] text-neutral-700 leading-[1.6] flex-1 line-clamp-3">{card.desc}</p>
                    <div className="flex items-center pt-3 border-t border-neutral-100">
                      <span className="text-[11px] text-neutral-400 font-medium">{card.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom block — input */}
            <div className="w-full max-w-[820px] pb-10 flex flex-col items-center gap-4 z-10 relative px-4">
              <div className="flex flex-wrap items-center justify-center gap-2"
                style={{ opacity: inputFocused ? 0 : 1, pointerEvents: inputFocused ? 'none' : 'auto', transition: 'opacity 0.25s ease' }}>
                {pillSuggestions.map((p, i) => (
                  <button key={i} onClick={() => handlePillClick(p.full, i)}
                    style={{ maxWidth: hiddenPills.has(i) ? '0' : '320px', opacity: hiddenPills.has(i) ? 0 : 1, paddingLeft: hiddenPills.has(i) ? 0 : undefined, paddingRight: hiddenPills.has(i) ? 0 : undefined, overflow: 'hidden', transition: 'max-width 0.35s ease, opacity 0.2s ease, padding 0.35s ease' }}
                    className="px-5 py-2 bg-neutral-50 rounded-full text-sm font-normal text-neutral-700 hover:bg-white transition-colors whitespace-nowrap cursor-pointer">
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 w-full">
                <div
                  className={`bg-white rounded-[28.5px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.1)] flex px-[20px] gap-3 ${inputFocused ? 'items-start pt-4' : 'items-center'}`}
                  style={{ width: inputFocused ? '100%' : '600px', height: inputFocused ? '114px' : '57px', transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1), height 0.35s cubic-bezier(0.4,0,0.2,1)' }}
                >
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
                      <button onClick={() => { setInputValue(''); setHiddenPills(new Set()); setInputFocused(false); inputRef.current?.blur(); }} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <Mic className="w-5 h-5 cursor-pointer hover:text-neutral-600 transition-colors" />
                    <Paperclip className="w-5 h-5 cursor-pointer hover:text-neutral-600 transition-colors" />
                  </div>
                </div>
                <button style={{ opacity: inputValue ? 1 : 0, width: inputValue ? '57px' : '0', transform: inputValue ? 'scale(1)' : 'scale(0.7)', pointerEvents: inputValue ? 'auto' : 'none', transition: 'opacity 0.2s ease, transform 0.2s ease, width 0.2s ease', overflow: 'hidden' }}
                  className="h-[57px] rounded-full bg-[#FFF000] flex items-center justify-center shrink-0 hover:brightness-95">
                  <ArrowUp className="w-5 h-5 text-neutral-900 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
