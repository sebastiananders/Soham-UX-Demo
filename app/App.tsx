import React, { useState, useRef } from 'react';
import { Home, Globe, Ticket, PieChart, Bell, Plus, Mic, Paperclip, MoreHorizontal, ChevronRight, X, ArrowUp, Bookmark, Shuffle } from 'lucide-react';
import { Badge, Avatar } from 'antd';
import imgLogo from "../imports/DeviceMacBookPro14/c4121c79ef3207dcf24c7435552bb7378ad17369.png";
import imgProfile from "./assets/aria.jpg";
import { Illustration } from './components/FigmaIcons';
import { UnifiedChatView } from './components/UnifiedChatView';
import { AgentAvatar } from './components/AgentAvatar';
import type { AgentId, HistoryItem } from '../types';
import { AGENTS, INITIAL_MESSAGES } from '../constants';

const PROGRESS_METRICS = [
  { left: '612 of 1,000 seats',          pct: 61, right: '61%',  sub: '3 days left on early-bird', color: 'bg-[rgba(0,0,0,0.9)]' },
  { left: '€183,600 of €300K revenue',   pct: 61, right: '61%',  sub: 'on current pace',           color: 'bg-[rgba(0,0,0,0.9)]' },
  { left: '8 of 12 speakers confirmed',  pct: 67, right: '67%',  sub: '4 still pending',           color: 'bg-green-500'   },
  { left: '5 of 8 sponsors signed',      pct: 63, right: '63%',  sub: '2 weeks to deadline',       color: 'bg-[rgba(0,0,0,0.9)]' },
  { left: '127 of 400 early-bird seats', pct: 32, right: '32%',  sub: 'still available',           color: 'bg-red-500'     },
];

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
  const [bookmarked, setBookmarked] = useState<Set<AgentId>>(new Set());
  const [progressIdx, setProgressIdx] = useState(0);
  const [progressAnimating, setProgressAnimating] = useState(false);

  const shuffleProgress = () => {
    setProgressAnimating(true);
    setTimeout(() => {
      setProgressIdx(i => (i + 1 + Math.floor(Math.random() * (PROGRESS_METRICS.length - 1))) % PROGRESS_METRICS.length);
      setProgressAnimating(false);
    }, 200);
  };
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
        className={`${collapsed ? 'w-[64px]' : 'w-[240px]'} border-r border-neutral-200 flex flex-col items-center py-8 bg-white z-20 shrink-0 transition-all duration-200 overflow-visible relative`}
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
            <span className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}>Soham home</span>
          </a>
        </div>

        <nav className="flex flex-col w-full px-2 gap-2">
          {/* Active chats section */}
          <button onClick={() => !collapsed && setActiveChatsOpen(v => !v)}
            className={`flex items-center justify-between px-3 py-1.5 w-full rounded-md ${!collapsed ? 'hover:bg-neutral-50 transition-colors' : ''}`}>
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}>Active chats</span>
            {!collapsed && (
              <ChevronRight className={`w-3 h-3 text-neutral-300 transition-transform duration-200 ${activeChatsOpen ? 'rotate-90' : ''}`} />
            )}
          </button>
          {activeChatsOpen && ([
            { id: 'insights' as AgentId, label: 'Insights & reporting', meta: '2h ago · 612 registrations', awaiting: true,  icon: PieChart },
            { id: 'website'  as AgentId, label: 'Event website',        meta: '1d ago · Draft ready',       awaiting: true,  icon: Globe    },
            { id: 'contacts' as AgentId, label: 'Contact & tickets',    meta: '3d ago · 340 warm contacts', awaiting: false, icon: Ticket   },
          ]).map(item => {
            const Icon = item.icon;
            return (
              <a key={item.id} href="#" onClick={e => { e.preventDefault(); openAgent(item.id); }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md w-full text-sm ${sidebarAgentActive(item.id) ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}>
                <div className="relative shrink-0">
                  <div className={`rounded-[7px] flex items-center justify-center transition-all duration-200 ${collapsed ? 'w-5 h-5 rounded-[5px]' : 'w-7 h-7'}`} style={{ backgroundColor: AGENTS[item.id].cardBg }}>
                    <Icon className={`transition-all duration-200 ${collapsed ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}`} style={{ color: AGENTS[item.id].accent }} />
                  </div>
                  {item.awaiting && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                </div>
                <div className={`flex flex-col min-w-0 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}>
                  <span className="whitespace-nowrap text-sm">{item.label}</span>
                  <span className="whitespace-nowrap text-[10px] text-neutral-400 font-normal mt-0.5">{item.meta}</span>
                </div>
              </a>
            );
          })}

          <button onClick={() => setActiveSession(null)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-md w-full text-sm text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600 transition-colors">
            <div className={`rounded-[7px] flex items-center justify-center bg-neutral-100 transition-all duration-200 shrink-0 ${collapsed ? 'w-5 h-5 rounded-[5px]' : 'w-7 h-7'}`}>
              <Plus className={`transition-all duration-200 ${collapsed ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}`} />
            </div>
            <span className={`whitespace-nowrap text-sm transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}>Start a new chat</span>
          </button>

          {/* Recent chats section */}
          <button onClick={() => !collapsed && setRecentChatsOpen(v => !v)}
            className={`flex items-center justify-between px-3 pt-3 pb-1.5 w-full rounded-md ${!collapsed ? 'hover:bg-neutral-50 transition-colors' : ''}`}>
            <span className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}>Recent chats</span>
            {!collapsed && (
              <ChevronRight className={`w-3 h-3 text-neutral-300 transition-transform duration-200 ${recentChatsOpen ? 'rotate-90' : ''}`} />
            )}
          </button>
          {recentChatsOpen && (chatHistory.length === 0 ? (
            <div className={`px-3 py-1.5 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}>
              <span className="text-xs text-neutral-300 whitespace-nowrap">No recent chats yet</span>
            </div>
          ) : (
            chatHistory.map(item => (
              <a key={item.id} href="#" onClick={e => { e.preventDefault(); openAgent(item.agentId); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-sm text-neutral-500 hover:bg-neutral-50 transition-colors">
                <div className={`flex flex-col min-w-0 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}>
                  <span className="whitespace-nowrap text-sm">{AGENTS[item.agentId].sub}</span>
                  <span className="text-[10px] text-neutral-400 font-normal mt-0.5 break-words">{item.preview}</span>
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
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md w-full text-sm text-neutral-700 hover:bg-neutral-50 transition-colors ${showActivity ? 'bg-neutral-50' : ''}`}
            >
              <div className="relative shrink-0">
                <Badge count={ACTIVITY_ITEMS.filter(i => i.awaiting).length} style={{ backgroundColor: '#dbeafe', color: '#2563eb', boxShadow: '0 0 0 2px white', fontSize: 9, fontWeight: 600 }}>
                  <Bell className="w-4 h-4 text-neutral-500" />
                </Badge>
              </div>
              <span className={`text-sm transition-all duration-150 overflow-hidden ${collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[120px] whitespace-nowrap'}`} style={{ transitionDelay: collapsed ? '0ms' : '200ms', display: 'inline-block' }}>Activity</span>
            </button>

            {showActivity && (
              <>
                <div className="fixed inset-0" onClick={() => setShowActivity(false)} />
                <div className="absolute bottom-full left-full mb-2 ml-2 w-[380px] bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] border border-neutral-100 z-50 overflow-hidden">
                  <div className="px-5 pt-5 pb-3">
                    <p className="text-xs font-medium text-neutral-400">Activity</p>
                  </div>
                  <div className="flex flex-col gap-2 px-3 pb-3">
                    {ACTIVITY_ITEMS.map(chat => {
                      const ActivityIcon = { insights: PieChart, website: Globe, contacts: Ticket }[chat.id];
                      return (
                        <div key={chat.id} onClick={() => { setShowActivity(false); openAgent(chat.id); }}
                          className="flex items-center gap-3 px-4 py-3.5 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors">
                          <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center" style={{ backgroundColor: AGENTS[chat.id].cardBg }}>
                              <ActivityIcon className="w-4 h-4 text-neutral-900" />
                            </div>
                            {chat.awaiting && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-medium text-neutral-900 truncate">{chat.label}</span>
                            <span className="text-xs text-neutral-400 mt-0.5">{chat.meta}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-full border-t border-neutral-100 mx-2" />
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
            <div className="flex-1 w-full max-w-[820px] flex flex-col items-center justify-center z-10 relative px-4">
              <div className="flex flex-col items-center gap-10 w-full">
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-[42px] font-normal text-neutral-900 tracking-tight" style={{ fontFamily: 'GalaxieCopernicus, serif' }}>Aloha, Jen</h1>
                  {/* <p className="text-base text-neutral-400">What shall we do today?</p> */}
                </div>
                <div className="flex items-center gap-4 w-[70%] border border-transparent bg-neutral-50 rounded-2xl px-8 py-5">
                  <span className="text-sm text-neutral-500 whitespace-nowrap shrink-0 transition-opacity duration-200" style={{ opacity: progressAnimating ? 0 : 1 }}>
                    {PROGRESS_METRICS[progressIdx].left}
                  </span>
                  <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div className={`h-full ${PROGRESS_METRICS[progressIdx].color} rounded-full transition-all duration-500 ease-out`} style={{ width: progressAnimating ? '0%' : `${PROGRESS_METRICS[progressIdx].pct}%` }} />
                  </div>
                  <span className="text-sm whitespace-nowrap shrink-0 transition-opacity duration-200" style={{ opacity: progressAnimating ? 0 : 1 }}>
                    <strong className="font-semibold text-neutral-700">{PROGRESS_METRICS[progressIdx].right}</strong>
                    <span className="text-neutral-500"> · {PROGRESS_METRICS[progressIdx].sub}</span>
                  </span>
                  <button onClick={shuffleProgress} className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-blue-500 hover:text-blue-600 hover:bg-neutral-50 transition-colors">
                    <Shuffle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* <div className="w-full border-t border-neutral-200 mt-6" /> */}

              {/* Agent Cards */}
              <div className="flex gap-3 justify-center w-full mt-12">
                {([
                  { id: 'insights' as AgentId, title: 'See event insights', stat: '61%', statLabel: 'of seat target', desc: "At 612 registrations with velocity climbing week over week. Projecting 720–780 total before early-bird ends.",  badge: 'Insights & reporting', cta: 'Share insight'  },
                  { id: 'contacts' as AgentId, title: 'Win warm contacts',  stat: '340', statLabel: 'warm contacts',  desc: "Contacts opened your invite but haven't registered. Early-bird closes in 3 days — email is ready to send.",  badge: 'Contact & tickets',    cta: 'Draft mail'     },
                  { id: 'website'  as AgentId, title: 'Add speaker bio',    stat: '1',   statLabel: 'bio ready',      desc: "Dr. Sarah Chen's profile is missing from the speakers page. Bio is drafted and reviewed — ready to publish.", badge: 'Event website',        cta: 'Publish bio'    },
                ]).map(card => (
                  <div key={card.id} onClick={() => openAgent(card.id)}
                    className="rounded-[0.85175rem] flex flex-col w-[290px] shrink-0 cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-150"
                    style={{
                      backgroundColor: AGENTS[card.id].cardBg,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}>
                    {/* Card body */}
                    <div className="p-5 flex flex-col">
                      {/* Title */}
                      <h3 className="text-[19px] font-bold leading-tight" style={{ color: '#171717' }}>{card.title}</h3>
                      {/* Category label */}
                      <div className="flex items-center mt-2">
                        <span className="text-[10px] font-semibold tracking-widest uppercase leading-none px-2 py-1" style={{ backgroundColor: `${AGENTS[card.id].accent}80`, color: '#171717', borderRadius: '2px' }}>{card.badge}</span>
                      </div>
                      {/* Body */}
                      <p className="mt-4 text-[13px] leading-relaxed line-clamp-3" style={{ color: '#6B7280' }}>{card.desc}</p>
                      {/* Divider */}
                      <div className="border-t mt-3" style={{ borderColor: '#E5E7EB' }} />
                      {/* Stat + CTA */}
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <p className="text-[10px] leading-none mb-1" style={{ color: 'rgba(0,0,0,0.5)' }}>{card.statLabel}</p>
                          <p className="text-[32px] font-bold leading-none tracking-tight" style={{ color: '#171717' }}>{card.stat}</p>
                        </div>
                        <span className="text-[12px] font-normal px-4 py-2" style={{ color: '#171717', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '4px' }}>{card.cta}</span>
                      </div>
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