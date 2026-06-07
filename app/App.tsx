import React, { useState, useRef } from 'react';
import type { ChatMessage } from '../types';
import { Home, Globe, Ticket, PieChart, Shield, Plus, Mic, Paperclip, ChevronRight, X, ArrowUp, ArrowDown, MessageSquare, HelpCircle, Check, CheckCircle2, Zap, Users, LayoutTemplate } from 'lucide-react';
import { Badge, Avatar } from 'antd';
import imgProfile from "./assets/aria.jpg";
import imgHeadsUp from "./assets/heads_up.svg";
import imgTakeALook from "./assets/take_a_look.svg";
import imgSuggestions from "./assets/suggestions.png";
import { Illustration } from './components/FigmaIcons';
import { BTrace } from './components/BTrace';
import { UnifiedChatView } from './components/UnifiedChatView';
import { LivestreamCanvas } from './components/LivestreamCanvas';
import { EventsList } from './components/EventsList';
import type { AgentId, HistoryItem } from '../types';

interface FindingSession {
  title: string;
  badge: string;
  badgeColor: string;
  agentId: AgentId;
  messages: ChatMessage[];
  autoAction?: string;
  hideCanvas?: boolean;
  preview?: string;
}
import { AGENTS, INITIAL_MESSAGES } from '../constants';

const PROGRESS_METRICS = [
  { left: '612 of 1,000 seats',          pct: 61, right: '61%',  sub: '3 days left on early-bird', color: 'bg-[rgba(0,0,0,0.9)]' },
  { left: '€183,600 of €300K revenue',   pct: 61, right: '61%',  sub: 'on current pace',           color: 'bg-[rgba(0,0,0,0.9)]' },
  { left: '8 of 12 speakers confirmed',  pct: 67, right: '67%',  sub: '4 still pending',           color: 'bg-green-500'          },
  { left: '5 of 8 sponsors signed',      pct: 63, right: '63%',  sub: '2 weeks to deadline',       color: 'bg-[rgba(0,0,0,0.9)]' },
  { left: '127 of 400 early-bird seats', pct: 32, right: '32%',  sub: 'still available',           color: 'bg-red-500'            },
];

const ACTIVITY_ITEMS: { id: AgentId; label: string; meta: string; awaiting: boolean }[] = [
  { id: 'insights', label: 'Want me to share this report with the team, or draft a summary for the exec update?', meta: 'Insights & reporting · awaiting response · 2h ago', awaiting: true  },
  { id: 'website',  label: 'Should I add the speaker section to the live page, or keep it as a draft?',           meta: 'Event website · awaiting response · 1d ago',        awaiting: true  },
  { id: 'contacts', label: 'Win warm contacts',                                                                    meta: 'Contact & tickets · last active 3d ago',             awaiting: false },
];

export default function App() {
  const [collapsed, setCollapsed]               = useState(true);
  const [inputFocused, setInputFocused]         = useState(false);
  const [inputValue, setInputValue]             = useState('');
  const [hiddenPills, setHiddenPills]           = useState<Set<number>>(new Set());
  const [activeSession, setActiveSession]       = useState<AgentId | null>(null);
  const [chatHistory, setChatHistory]           = useState<HistoryItem[]>([]);
const [activeChatsOpen, setActiveChatsOpen]   = useState(true);
  const [recentChatsOpen, setRecentChatsOpen]   = useState(true);
  const [progressIdx, setProgressIdx]           = useState(0);
  const [progressAnimating, setProgressAnimating] = useState(false);
  const [activeFinding, setActiveFinding]       = useState<FindingSession | null>(null);
  const [livestreamState, setLivestreamState]   = useState<'diagnosed' | 'fixed'>('diagnosed');
  const [activeEvent, setActiveEvent]           = useState<{ id: string; name: string } | null>({ id: 'default', name: 'Future of Asset Management Asia' });
  const [showNewChat, setShowNewChat]           = useState(false);

  const [inlineChatCard, setInlineChatCard] = useState<string | null>(null);
  const [inlineChatClosing, setInlineChatClosing] = useState(false);
  const [inlineChatPhase, setInlineChatPhase] = useState<'idle' | 'thinking' | 'bio' | 'published'>('idle');
  const [inlineChatThinkStep, setInlineChatThinkStep] = useState(0);
  const [nextCardPhase, setNextCardPhase] = useState<'idle' | 'sending' | 'done'>('idle');
  const [showTakeALook, setShowTakeALook] = useState(false);
  const [resolvedCards, setResolvedCards] = useState<Set<string>>(new Set());
  const [fixAllStep, setFixAllStep] = useState(0);
  const [fixAllDone, setFixAllDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inlineChatRef = useRef<HTMLDivElement>(null);
  const inlineChatEndRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const THINK_STEPS = ['Looking up Jim Roland…', 'Searching LinkedIn profile…', 'Reviewing published work…', 'Drafting bio…'];

  React.useEffect(() => {
    if (!inlineChatCard) return;
    const FIXED_INPUT_H = 105; // paddingTop(24) + height(57) + paddingBottom(24)
    const scroll = () => {
      const el = inlineChatEndRef.current;
      const main = mainRef.current;
      if (!el || !main) return;
      const elBottom = el.getBoundingClientRect().bottom;
      const mainBottom = main.getBoundingClientRect().bottom;
      const clearance = mainBottom - FIXED_INPUT_H - 16;
      const delta = elBottom - clearance;
      if (delta > 0) main.scrollBy({ top: delta, behavior: 'smooth' });
    };
    setTimeout(scroll, 50);
  }, [inlineChatCard, inlineChatPhase, inlineChatThinkStep, nextCardPhase, showTakeALook, fixAllStep]);

  const handleSendReminders = () => {
    setNextCardPhase('sending');
    setTimeout(() => setNextCardPhase('done'), 2800);
  };

  const handleDraftBio = () => {
    setInlineChatPhase('thinking');
    setInlineChatThinkStep(0);
    let step = 0;
    const iv = setInterval(() => {
      step += 1;
      if (step < THINK_STEPS.length) {
        setInlineChatThinkStep(step);
      } else {
        clearInterval(iv);
        setInlineChatPhase('bio');
      }
    }, 900);
  };

  React.useEffect(() => {
    const id = setInterval(() => {
      setProgressAnimating(true);
      setTimeout(() => {
        setProgressIdx(i => (i + 1) % PROGRESS_METRICS.length);
        setProgressAnimating(false);
      }, 200);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const pillSuggestions = [
    { label: 'Event website',      full: '', icon: LayoutTemplate, bg: '#EEF4FF', iconColor: '#6B8FE8', agentId: 'website' as AgentId },
    { label: 'Contacts & Tickets', full: 'List all VIP registrations for Tech Summit Europe 2026, including name, company, and contact details.', icon: Ticket, bg: '#FFF4EC', iconColor: '#E8956B' },
    { label: 'Insights & Reporting', full: '', icon: PieChart, bg: '#EDFAF4', iconColor: '#5BBF8E', agentId: 'analyzer' as AgentId },
  ];

  const handlePillClick = (full: string, index: number, agentId?: AgentId) => {
    if (agentId) {
      setHiddenPills(prev => new Set(prev).add(index));
      openAgent(agentId);
      return;
    }
    setInputValue(full);
    setHiddenPills(prev => new Set(prev).add(index));
    setInputFocused(true);
    inputRef.current?.focus();
  };

  const openAgent = (agentId: AgentId) => {
    setShowNewChat(false);
    setActiveSession(agentId);
    const agent = AGENTS[agentId];
    const firstMsg = INITIAL_MESSAGES[agentId][0];
    const preview = firstMsg.kind === 'agent' ? firstMsg.text.slice(0, 50) + '…' : '';
    setChatHistory(prev => {
      if (prev.some(h => h.agentId === agentId)) return prev;
      return [{ id: Date.now().toString(), agentId, title: agent.name, preview }, ...prev];
    });
  };

  const openInlineChat = (cardTitle: string) => {
    setInlineChatCard(cardTitle);
    setInlineChatClosing(false);
    setInlineChatPhase('idle');
    setNextCardPhase('idle');
    setShowTakeALook(false);
    setTimeout(() => {
      const el = inlineChatRef.current;
      const main = mainRef.current;
      if (!el || !main) return;
      const elTop = el.getBoundingClientRect().top;
      const mainTop = main.getBoundingClientRect().top;
      main.scrollTo({ top: main.scrollTop + (elTop - mainTop) - 24, behavior: 'smooth' });
    }, 150);
  };

  const openFixAll = () => {
    setInlineChatCard('Fix all');
    setInlineChatClosing(false);
    setInlineChatPhase('idle');
    setNextCardPhase('idle');
    setShowTakeALook(false);
    setFixAllStep(0);
    setTimeout(() => setFixAllStep(1), 900);
    setTimeout(() => setFixAllStep(2), 2700);
    setTimeout(() => setFixAllStep(3), 3500);
    setTimeout(() => setFixAllStep(4), 5300);
    setTimeout(() => setFixAllStep(5), 6100);
    setTimeout(() => setFixAllStep(6), 7900);
    setTimeout(() => {
      const el = inlineChatRef.current;
      const main = mainRef.current;
      if (!el || !main) return;
      const elTop = el.getBoundingClientRect().top;
      const mainTop = main.getBoundingClientRect().top;
      main.scrollTo({ top: main.scrollTop + (elTop - mainTop) - 24, behavior: 'smooth' });
    }, 150);
  };

  const closeInlineChat = () => {
    if (inlineChatCard === 'Fix all' && fixAllStep >= 6) {
      setFixAllDone(true);
    }
    setResolvedCards(prev => {
      const next = new Set(prev);
      if (inlineChatCard === 'Fix all' && fixAllStep >= 6) {
        next.add('Heads up'); next.add('Take a look'); next.add('Suggestions');
      } else {
        if (inlineChatPhase === 'published') next.add('Heads up');
        if (nextCardPhase === 'done') next.add('Take a look');
      }
      return next;
    });
    setInlineChatClosing(true);
    setTimeout(() => {
      setInlineChatCard(null);
      setInlineChatPhase('idle');
      setNextCardPhase('idle');
      setShowTakeALook(false);
      setFixAllStep(0);
      setInlineChatClosing(false);

    }, 220);
  };

  const CARD_IMGS: Record<string, string> = {
    'Heads up': imgHeadsUp,
    'Take a look': imgTakeALook,
    'Suggestions': imgSuggestions,
  };

  const CARD_CHAT: Record<string, { label: string; p1: string; p2: string; primary: string; secondary: string }> = {
    'Heads up': {
      label: 'Analyzer · Jim Roland — missing bio',
      p1: "Jim Roland's speaker bio is missing from the public speaker page — his profile is live but shows as empty to attendees.",
      p2: "I can draft a bio for him based on his LinkedIn profile and published work, or you can provide the text directly.",
      primary: 'Draft bio for me',
      secondary: "I'll add it manually",
    },
    'Take a look': {
      label: 'Analyzer · Speaker confirmations',
      p1: "4 speakers haven't confirmed their session time slots, and 3 speaker headshots are still missing from the public page.",
      p2: "I can send a reminder to all pending speakers with a one-click confirmation link, or you can follow up manually.",
      primary: 'Send reminders',
      secondary: "I'll handle it",
    },
    'Suggestions': {
      label: 'Analyzer · Speaker social links',
      p1: "The top keynote speaker profiles are missing social links. Attendees frequently look for these before and after the event.",
      p2: "I can pull LinkedIn and Twitter handles from public sources and draft the updates for your review.",
      primary: 'Pull social links',
      secondary: 'Skip for now',
    },
  };

  const handleBack = () => {
    if (activeFinding) {
      setChatHistory(prev => {
        const alreadyExists = prev.some(h => h.agentId === activeFinding.agentId && h.title === activeFinding.title);
        if (alreadyExists) return prev;
        const preview = activeFinding.preview ?? (activeFinding.messages[0]?.kind === 'agent' ? activeFinding.messages[0].text.slice(0, 50) + '…' : '');
        return [{ id: Date.now().toString(), agentId: activeFinding.agentId, title: activeFinding.title, preview }, ...prev];
      });
      setActiveFinding(null);
      setLivestreamState('diagnosed');
      return;
    }
    setActiveSession(null);
  };

  const sidebarAgentActive = (agentId: AgentId) => !activeFinding && activeSession === agentId;

  // ── Entry screen: EventsList ──────────────────────────────────────────────────
  if (!activeEvent) {
    return <EventsList onSelectEvent={(id, name) => setActiveEvent({ id, name })} />;
  }

  // ── Event context: header + sidebar + main ────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">

      {/* ── Global header ── */}
      <header
        className="flex items-center justify-between px-6 shrink-0 sticky top-0 z-30"
        style={{ backgroundColor: '#FFF000', minHeight: 80 }}
      >
        {/* Left: logo + event name */}
        <div className="flex items-center gap-3">
          <svg
            onClick={() => { setActiveSession(null); setActiveFinding(null); setShowNewChat(false); }}
            width="28" height="36" viewBox="42 23 133 170"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer shrink-0"
          >
            <path d="M150.2 104.8C154.8 99.5 157.4 93.3001 157.4 86.6001C157.4 61.7001 138.7 43.3 98.7 43.3C75.8 43.3 58.7 50.0001 58.7 50.0001L64.7 66.0001C64.7 66.0001 77 59.3 98.7 59.3C120.4 59.3 141.4 65.5001 141.4 86.6001C141.4 89.8001 140.6 92.4001 139.1 94.6001C122.8 82.1001 101.8 74.6001 85.4 74.6001C76.1 74.6001 62.1 79.3001 62.1 92.6001C62.1 113.9 94.8 119.9 112.1 119.9C121.8 119.9 130.5 117.8 137.7 114.3C144.3 121.5 148.8 130.3 148.8 140.6C148.8 156.4 132.1 159.9 122.8 159.9C97.5 159.9 82.8 142.8 78.1 132.6L62.8 136.6V172.6H78.8V159.3C78.8 159.3 94.9 176.6 122.8 176.6C149.5 176.6 165.5 160.9 165.5 140.6C165.4 127.1 159.4 114.9 150.2 104.8ZM78.8 94.0001C78.8 87.3001 103.7 90.6001 123.8 103.1C105.2 106.6 78.8 99.9001 78.8 94.0001Z" fill="#1A1A1A" />
          </svg>
          <span style={{ fontSize: 18, fontWeight: 500, color: '#111111', letterSpacing: '-0.01em' }}>
            Marketing Qualified Leads 2026
            {(activeFinding || activeSession || showNewChat || inlineChatCard) && (
              <>
                <span style={{ color: '#888888', fontWeight: 400, margin: '0 10px' }}>·</span>
                <span style={{ fontWeight: 400 }}>
                  {activeFinding ? activeFinding.title : activeSession ? AGENTS[activeSession].name : inlineChatCard ? (CARD_CHAT[inlineChatCard]?.label ?? inlineChatCard) : 'New chat'}
                </span>
              </>
            )}
          </span>
        </div>

        {/* Right: icons (non-interactive) */}
        <div className="flex items-center gap-4">
          <MessageSquare className="w-5 h-5" style={{ color: '#111111' }} />
          <HelpCircle className="w-5 h-5" style={{ color: '#111111' }} />
          <Avatar src={imgProfile} size={34} style={{ flexShrink: 0 }} />
        </div>
      </header>

      {/* ── Sidebar + main ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`${collapsed ? 'w-[64px]' : 'w-[240px]'} border-r border-neutral-200 flex flex-col items-center py-6 bg-white z-20 shrink-0 transition-all duration-200 overflow-visible relative`}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          {false && <div className="flex flex-col w-full px-2 mb-2">
            <a
              href="#"
              onClick={e => { e.preventDefault(); setActiveSession(null); setShowNewChat(false); }}
              className={`flex items-center gap-2 px-3 py-3 rounded-md w-full text-sm ${activeSession === null ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}
            >
              <Home className="w-4 h-4 text-neutral-400 shrink-0" />
              <span
                className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}
              >
                Event home
              </span>
            </a>
          </div>}

          <nav className="flex flex-col w-full px-2 gap-2">
            {/* Shortcuts section */}
            {false && <><button
              onClick={() => !collapsed && setActiveChatsOpen(v => !v)}
              className={`flex items-center justify-between px-3 py-1.5 w-full rounded-md ${!collapsed ? 'hover:bg-neutral-50 transition-colors' : ''}`}
            >
              <span
                className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}
              >
                Shortcuts
              </span>
              {!collapsed && (
                <ChevronRight className={`w-3 h-3 text-neutral-300 transition-transform duration-200 ${activeChatsOpen ? 'rotate-90' : ''}`} />
              )}
            </button>

            {activeChatsOpen && ([
              { id: 'insights'  as AgentId, label: 'Insights & reporting', meta: '2h ago · 612 registrations', awaiting: true,  icon: PieChart },
              { id: 'website'   as AgentId, label: 'Event website',        meta: '1d ago · Draft ready',       awaiting: true,  icon: Globe    },
              { id: 'contacts'  as AgentId, label: 'Contact & tickets',    meta: '3d ago · 340 warm contacts', awaiting: false, icon: Ticket   },
              { id: 'analyzer'  as AgentId, label: 'Event analyzer',       meta: 'Just now · 7 findings',      awaiting: true,  icon: Shield   },
            ]).map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href="#"
                  onClick={e => { e.preventDefault(); openAgent(item.id); }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md w-full text-sm ${sidebarAgentActive(item.id) ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-700 hover:bg-neutral-50 transition-colors'}`}
                >
                  <div className="relative shrink-0">
                    <div
                      className={`rounded-[7px] flex items-center justify-center transition-all duration-200 ${collapsed ? 'w-5 h-5 rounded-[5px]' : 'w-7 h-7'}`}
                      style={{ backgroundColor: AGENTS[item.id].cardBg }}
                    >
                      <Icon
                        className={`transition-all duration-200 ${collapsed ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'}`}
                        style={{ color: AGENTS[item.id].accent }}
                      />
                    </div>
                  </div>
                  <span
                    className={`whitespace-nowrap text-sm transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}
                  >
                    {item.label}
                  </span>
                </a>
              );
            })}</>}

            {/* Recent chats section */}
            <button
              onClick={() => !collapsed && setRecentChatsOpen(v => !v)}
              className={`flex items-center justify-between px-3 pt-3 pb-1.5 w-full rounded-md ${!collapsed ? 'hover:bg-neutral-50 transition-colors' : ''}`}
            >
              <span
                className={`text-xs font-medium text-neutral-400 whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}
              >
                Recent chats
              </span>
              {!collapsed && (
                <ChevronRight className={`w-3 h-3 text-neutral-300 transition-transform duration-200 ${recentChatsOpen ? 'rotate-90' : ''}`} />
              )}
            </button>

            {recentChatsOpen && (
              <>
                {/* New chat button */}
                <button
                  onClick={() => { setActiveSession(null); setActiveFinding(null); setShowNewChat(true); setInputValue(''); setHiddenPills(new Set()); setTimeout(() => inputRef.current?.focus(), 50); }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-sm text-neutral-500 hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span
                    className={`whitespace-nowrap transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}
                  >
                    New chat
                  </span>
                </button>

                {chatHistory.length === 0 ? (
                  <div
                    className={`px-3 py-1.5 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}
                  >
                    <span className="text-xs text-neutral-300 whitespace-nowrap">No recent chats yet</span>
                  </div>
                ) : (
                  chatHistory.map(item => (
                    <a
                      key={item.id}
                      href="#"
                      onClick={e => { e.preventDefault(); openAgent(item.agentId); }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-md w-full text-sm ${activeFinding?.title === item.title ? 'bg-neutral-50 text-neutral-900 font-semibold' : 'text-neutral-500 hover:bg-neutral-50 transition-colors'}`}
                    >
                      <div
                        className={`flex flex-col min-w-0 transition-opacity duration-150 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                        style={{ transitionDelay: collapsed ? '0ms' : '200ms' }}
                      >
                        <span className="whitespace-nowrap text-sm">{item.title}</span>
                        <span className="text-[10px] text-neutral-400 font-normal mt-0.5 break-words">{item.preview}</span>
                      </div>
                    </a>
                  ))
                )}
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main ref={mainRef} className="flex-1 relative flex flex-col items-center overflow-auto">

          {activeFinding ? (
            <UnifiedChatView
              key={activeFinding.title}
              initialAgent={activeFinding.agentId}
              onBack={handleBack}
              hideCanvas={activeFinding.hideCanvas ?? (activeFinding.agentId !== 'website' || activeFinding.badge !== 'Critical')}
              chatTitle={activeFinding.title}
              chatBadge={activeFinding.badge}
              chatBadgeColor={activeFinding.badgeColor}
              overrideMessages={activeFinding.messages}
              autoAction={activeFinding.autoAction}
              canvasNode={activeFinding.badge === 'Critical' ? <LivestreamCanvas state={livestreamState} /> : undefined}
              onFindingAction={(id) => {
                if (id === 'fix-now') setLivestreamState('fixed');
              }}
            />
          ) : activeSession ? (
            <UnifiedChatView
              key={activeSession}
              initialAgent={activeSession}
              onBack={handleBack}
              hideCanvas={activeSession === 'insights' || activeSession === 'contacts' || activeSession === 'analyzer'}
            />
          ) : showNewChat ? (
            /* ── New chat view ── */
            <div className="flex-1 w-full flex flex-col items-center justify-center px-4 pb-10">
              <div className="w-full max-w-[600px] flex flex-col items-center gap-8">
                <h2
                  className="text-[28px] font-normal text-neutral-900 tracking-tight text-center"
                  style={{ fontFamily: 'GalaxieCopernicus, serif' }}
                >
                  What shall we work on?
                </h2>

                <div className="flex items-center justify-center gap-3 w-full">
                  <div
                    className={`bg-white rounded-[28.5px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.1)] flex px-[20px] gap-3 ${inputFocused ? 'items-start pt-4' : 'items-center'}`}
                    style={{
                      width: '100%',
                      height: inputFocused ? '114px' : '57px',
                      transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
                    }}
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
                          Ask anything about this event…
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
                  <button
                    style={{
                      opacity: inputValue ? 1 : 0,
                      width: inputValue ? '57px' : '0',
                      transform: inputValue ? 'scale(1)' : 'scale(0.7)',
                      pointerEvents: inputValue ? 'auto' : 'none',
                      transition: 'opacity 0.2s ease, transform 0.2s ease, width 0.2s ease',
                      overflow: 'hidden',
                    }}
                    className="h-[57px] rounded-full bg-[#FFF000] flex items-center justify-center shrink-0 hover:brightness-95"
                  >
                    <ArrowUp className="w-5 h-5 text-neutral-900 stroke-[2.5]" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                  {pillSuggestions.map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handlePillClick(p.full, i, 'agentId' in p ? p.agentId : undefined)}
                        style={{
                          maxWidth: hiddenPills.has(i) ? '0' : '400px',
                          opacity: hiddenPills.has(i) ? 0 : 1,
                          paddingLeft: hiddenPills.has(i) ? 0 : '16px',
                          paddingRight: hiddenPills.has(i) ? 0 : '20px',
                          overflow: 'hidden',
                          transition: 'max-width 0.35s ease, opacity 0.2s ease, padding 0.35s ease',
                          display: 'flex', alignItems: 'center', gap: 8,
                          paddingTop: 10, paddingBottom: 10,
                          backgroundColor: p.bg, border: 'none', borderRadius: 999,
                          fontSize: 14, fontWeight: 400, color: '#4A4742',
                          cursor: 'pointer', whiteSpace: 'nowrap',
                        }}
                      >
                        <Icon size={15} style={{ color: p.iconColor, flexShrink: 0 }} />
                        {p.label}
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          ) : (
            <>
              {/* Illustration background */}
              <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute w-[1512px] h-[980px] left-[-200px] top-0">
                  <Illustration />
                </div>
              </div>

              {/* Single centered column: greeting → input → analyzer */}
              <div className="flex-1 flex flex-col items-center z-10 relative px-4" style={{ width: 680, alignSelf: 'flex-start', marginLeft: 'calc(50vw - 404px)', paddingBottom: inlineChatCard ? '100vh' : '2.5rem' }}>

                {/* Vertically centered greeting + prompt */}
                <div className="flex-1 flex flex-col items-center justify-center gap-10 w-full">

                {/* 1. Greeting */}
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="font-normal text-neutral-900 tracking-tight" style={{ fontFamily: 'GalaxieCopernicus, serif', fontSize: 28 }}>
                    Good morning, Jen.
                  </h1>
                  <p className="text-sm text-neutral-400">What shall we work on today?</p>
                </div>

                {/* 2. Prompt input */}
                <div className="w-full flex flex-col items-center gap-4">
                  {false && <div
                    className="flex flex-wrap items-center justify-center gap-2"
                    style={{ opacity: inputFocused ? 0 : 1, pointerEvents: inputFocused ? 'none' : 'auto', transition: 'opacity 0.25s ease' }}
                  >
                    {pillSuggestions.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => handlePillClick(p.full, i, 'agentId' in p ? p.agentId : undefined)}
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
                        {p.label}
                      </button>
                    ))}
                  </div>}

                  <div className="flex items-center justify-center gap-3 w-full">
                    <div
                      className={`bg-white rounded-[28.5px] shadow-[0px_2px_8px_0px_rgba(23,23,23,0.1)] flex px-[20px] gap-3 ${inputFocused ? 'items-start pt-4' : 'items-center'}`}
                      style={{
                        width: '100%',
                        height: inputFocused ? '114px' : '57px',
                        transition: 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
                      }}
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
                          <button
                            onClick={() => { setInputValue(''); setHiddenPills(new Set()); setInputFocused(false); inputRef.current?.blur(); }}
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
                        width: inputValue ? '57px' : '0',
                        transform: inputValue ? 'scale(1)' : 'scale(0.7)',
                        pointerEvents: inputValue ? 'auto' : 'none',
                        transition: 'opacity 0.2s ease, transform 0.2s ease, width 0.2s ease',
                        overflow: 'hidden',
                      }}
                      className="h-[57px] rounded-full bg-[#FFF000] flex items-center justify-center shrink-0 hover:brightness-95"
                    >
                      <ArrowUp className="w-5 h-5 text-neutral-900 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                </div>{/* end centered wrapper */}

                {/* 3. Event analyzer — Figma design */}
                <div className="w-full flex flex-col items-center gap-5" style={{ paddingTop: 24, paddingBottom: inlineChatCard ? 100 : 0 }}>

                  <p style={{ fontSize: 12, color: '#9B9693', textAlign: 'center', margin: 0 }}>Event analyzer</p>

                  <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1B1A17', letterSpacing: '-0.01em', lineHeight: 1.2, textAlign: 'center', margin: 0 }}>
                    A few things to tidy up
                  </h3>

                  <style>{`
                    @keyframes cardOpen { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes cardClose { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
                  `}</style>

                  {inlineChatCard === 'Fix all' ? (
                    /* ── Fix all card ── */
                    <div ref={inlineChatRef} className="w-full flex flex-col gap-4 rounded-xl px-7 py-5" style={{ backgroundColor: '#FFFFFF', animation: inlineChatClosing ? 'cardClose 0.2s ease-in forwards' : 'cardOpen 0.25s ease-out' }}>

                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5" style={{ color: '#1B1A17' }} />
                          <span style={{ fontSize: 18, fontWeight: 600, color: '#1B1A17' }}>Fix all</span>
                        </div>
                        <button onClick={closeInlineChat} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B9693', padding: 0 }}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Opening message */}
                      <div className="flex flex-col gap-2 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                        <p style={{ fontSize: 14, color: '#1B1A17', lineHeight: 1.6, margin: 0 }}>
                          I'll work through all 3 items and fix them one by one. Starting with the most critical.
                        </p>
                      </div>

                      {/* Step 1: Heads up */}
                      {fixAllStep >= 1 && (
                        <div className="flex flex-col gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                          <div className="flex items-center gap-2">
                            <img src={imgHeadsUp} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1B1A17' }}>Heads up</span>
                          </div>
                          {fixAllStep === 1 ? (
                            <div className="flex items-center gap-3">
                              <BTrace size={20} />
                              <span style={{ fontSize: 13, color: '#9B9693' }}>Drafting Jim Roland's bio…</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#16A34A' }} />
                              <span style={{ fontSize: 13, color: '#4A4742' }}>Bio drafted and published to the speaker page</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 2: Take a look */}
                      {fixAllStep >= 3 && (
                        <div className="flex flex-col gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                          <div className="flex items-center gap-2">
                            <img src={imgTakeALook} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1B1A17' }}>Take a look</span>
                          </div>
                          {fixAllStep === 3 ? (
                            <div className="flex items-center gap-3">
                              <BTrace size={20} />
                              <span style={{ fontSize: 13, color: '#9B9693' }}>Sending reminders to 4 speakers…</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#16A34A' }} />
                              <span style={{ fontSize: 13, color: '#4A4742' }}>Reminders sent · headshot requests included</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 3: Suggestions */}
                      {fixAllStep >= 5 && (
                        <div className="flex flex-col gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                          <div className="flex items-center gap-2">
                            <img src={imgSuggestions} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#1B1A17' }}>Suggestions</span>
                          </div>
                          {fixAllStep === 5 ? (
                            <div className="flex items-center gap-3">
                              <BTrace size={20} />
                              <span style={{ fontSize: 13, color: '#9B9693' }}>Pulling social links for top speakers…</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#16A34A' }} />
                              <span style={{ fontSize: 13, color: '#4A4742' }}>Social links added · ready for your review</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* All done */}
                      {fixAllStep >= 6 && (
                        <div className="flex flex-col gap-1 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                          <p style={{ fontSize: 14, color: '#1B1A17', fontWeight: 500, margin: 0 }}>All 3 issues resolved.</p>
                          <p style={{ fontSize: 13, color: '#9B9693', margin: 0 }}>Your event is in great shape for go-live.</p>
                        </div>
                      )}

                      <div ref={inlineChatEndRef} />
                    </div>

                  ) : inlineChatCard ? (
                    /* ── Expanded card chat (all three cards share this layout) ── */
                    <div ref={inlineChatRef} className="w-full flex flex-col gap-4 rounded-xl px-7 py-5" style={{ backgroundColor: '#FFFFFF', animation: inlineChatClosing ? 'cardClose 0.2s ease-in forwards' : 'cardOpen 0.25s ease-out' }}>

                      {/* Card header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={CARD_IMGS[inlineChatCard]} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                          <span style={{ fontSize: 18, fontWeight: 600, color: '#1B1A17' }}>{inlineChatCard}</span>
                        </div>
                        <button onClick={closeInlineChat} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B9693', padding: 0 }}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Initial agent message */}
                      <div className="flex flex-col gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                        <p style={{ fontSize: 14, color: '#1B1A17', lineHeight: 1.6, margin: 0 }}>{CARD_CHAT[inlineChatCard].p1}</p>
                        <p style={{ fontSize: 14, color: '#1B1A17', lineHeight: 1.6, margin: 0 }}>{CARD_CHAT[inlineChatCard].p2}</p>
                        {inlineChatCard === 'Heads up' && inlineChatPhase === 'idle' && (
                          <div className="flex gap-2 flex-wrap" style={{ marginTop: 4 }}>
                            <button onClick={handleDraftBio} style={{ backgroundColor: '#1B1A17', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                              Draft bio for me
                            </button>
                            <button style={{ backgroundColor: 'transparent', color: '#4A4742', border: '1px solid #E8E8E8', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                              I'll add it manually
                            </button>
                          </div>
                        )}
                        {inlineChatCard === 'Take a look' && nextCardPhase === 'idle' && (
                          <div className="flex gap-2 flex-wrap" style={{ marginTop: 4 }}>
                            <button onClick={handleSendReminders} style={{ backgroundColor: '#1B1A17', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                              Send reminders
                            </button>
                            <button style={{ backgroundColor: 'transparent', color: '#4A4742', border: '1px solid #E8E8E8', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                              I'll handle it
                            </button>
                          </div>
                        )}
                        {inlineChatCard === 'Suggestions' && (
                          <div className="flex gap-2 flex-wrap" style={{ marginTop: 4 }}>
                            <button style={{ backgroundColor: '#1B1A17', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                              {CARD_CHAT['Suggestions'].primary}
                            </button>
                            <button style={{ backgroundColor: 'transparent', color: '#4A4742', border: '1px solid #E8E8E8', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                              {CARD_CHAT['Suggestions'].secondary}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Heads up: user bubble → thinking → bio → published */}
                      {inlineChatCard === 'Heads up' && (inlineChatPhase === 'thinking' || inlineChatPhase === 'bio' || inlineChatPhase === 'published') && (
                        <div className="flex justify-end">
                          <div className="rounded-[14px] rounded-tr-[4px] px-4 py-3" style={{ backgroundColor: '#DBEAFE', maxWidth: 260 }}>
                            <p style={{ fontSize: 14, color: '#1B1A17', margin: 0 }}>Draft bio for me</p>
                          </div>
                        </div>
                      )}
                      {inlineChatCard === 'Heads up' && inlineChatPhase === 'thinking' && (
                        <div className="flex items-center gap-3">
                          <BTrace size={22} />
                          <span style={{ fontSize: 14, color: '#9B9693', transition: 'opacity 0.3s ease' }}>{THINK_STEPS[inlineChatThinkStep]}</span>
                        </div>
                      )}
                      {inlineChatCard === 'Heads up' && (inlineChatPhase === 'bio' || inlineChatPhase === 'published') && (
                        <div className="flex flex-col gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                          <p style={{ fontSize: 14, color: '#1B1A17', lineHeight: 1.6, margin: 0 }}>
                            Here's a draft bio for Jim Roland based on his LinkedIn profile and recent keynote at FinTech Forward 2025:
                          </p>
                          <div style={{ borderLeft: '3px solid #E8E8E8', paddingLeft: 16 }}>
                            <p style={{ fontSize: 14, color: '#4A4742', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                              Jim Roland is a Managing Director at Blackstone Asset Management, where he leads the firm's digital infrastructure strategy across Asia-Pacific. With over 18 years in institutional asset management, Jim specialises in the intersection of alternative investments and emerging technology. He has spoken at FinTech Forward, Money20/20 Asia, and the HKMA annual symposium. Jim holds an MBA from INSEAD and a BSc in Economics from the London School of Economics.
                            </p>
                          </div>
                          {inlineChatPhase === 'bio' && (
                            <div className="flex gap-2 flex-wrap" style={{ marginTop: 4 }}>
                              <button onClick={() => setInlineChatPhase('published')} style={{ backgroundColor: '#1B1A17', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                                Approve & publish
                              </button>
                              <button style={{ backgroundColor: 'transparent', color: '#4A4742', border: '1px solid #E8E8E8', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                                Edit first
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      {inlineChatCard === 'Heads up' && inlineChatPhase === 'published' && (
                        <>
                          <div className="flex justify-end">
                            <div className="rounded-[14px] rounded-tr-[4px] px-4 py-3" style={{ backgroundColor: '#DBEAFE', maxWidth: 260 }}>
                              <p style={{ fontSize: 14, color: '#1B1A17', margin: 0 }}>Approve & publish</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                            <p style={{ fontSize: 14, color: '#1B1A17', lineHeight: 1.6, margin: 0 }}>
                              Done — Jim Roland's bio is live on the public speaker page. The critical issue is resolved.
                            </p>
                          </div>
                        </>
                      )}

                      {/* Take a look: user bubble → sending → done */}
                      {inlineChatCard === 'Take a look' && (nextCardPhase === 'sending' || nextCardPhase === 'done') && (
                        <div className="flex justify-end">
                          <div className="rounded-[14px] rounded-tr-[4px] px-4 py-3" style={{ backgroundColor: '#DBEAFE', maxWidth: 260 }}>
                            <p style={{ fontSize: 14, color: '#1B1A17', margin: 0 }}>Send reminders</p>
                          </div>
                        </div>
                      )}
                      {inlineChatCard === 'Take a look' && nextCardPhase === 'sending' && (
                        <div className="flex items-center gap-3">
                          <BTrace size={22} />
                          <span style={{ fontSize: 14, color: '#9B9693' }}>Sending reminders to 4 speakers…</span>
                        </div>
                      )}
                      {inlineChatCard === 'Take a look' && nextCardPhase === 'done' && (
                        <div className="flex flex-col gap-2 rounded-xl px-5 py-4" style={{ backgroundColor: '#F7F6F4' }}>
                          <p style={{ fontSize: 14, color: '#1B1A17', lineHeight: 1.6, margin: 0 }}>
                            Done — reminders sent to all 4 speakers with a one-click confirmation link. Headshot requests included.
                          </p>
                        </div>
                      )}

                      <div ref={inlineChatEndRef} />
                    </div>

                  ) : fixAllDone ? (
                    /* ── All done state ── */
                    <div className="w-full flex flex-col items-center gap-2 py-6" style={{ animation: 'cardOpen 0.25s ease-out' }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DCFCE7' }}>
                        <Check className="w-5 h-5" style={{ color: '#16A34A' }} />
                      </div>
                      <p style={{ fontSize: 16, fontWeight: 600, color: '#1B1A17', margin: 0 }}>All done</p>
                      <p style={{ fontSize: 13, color: '#9B9693', margin: 0 }}>All 3 issues have been resolved.</p>
                    </div>

                  ) : (
                    /* ── Normal three-card row + Fix all ── */
                    <>
                      <div className="flex flex-col w-full" style={{ animation: 'cardOpen 0.25s ease-out' }}>
                        {[
                          { dot: '#EF4444', title: 'Heads up',    body: "Jim Roland's speaker bio is missing. His profile is live on the public page but shows as an empty element", onFix: () => openInlineChat('Heads up') },
                          { dot: '#F59E0B', title: 'Take a look', body: "4 speakers haven't confirmed their session time slots and 3 speaker headshots are missing", onFix: () => openInlineChat('Take a look') },
                          { dot: '#3B82F6', title: 'Suggestions', body: "Add social links to the top keynote speaker profiles. Attendees frequently look for these informations", onFix: () => openInlineChat('Suggestions') },
                        ].map((card, i, arr) => (
                          <div key={card.title} onClick={() => card.onFix()} className="flex items-center gap-4 py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F0EFED' : 'none', cursor: resolvedCards.has(card.title) ? 'default' : 'pointer' }}>
                            {resolvedCards.has(card.title) ? (
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#16A34A' }} />
                            ) : (
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: card.dot }} />
                            )}
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                              <span style={{ fontSize: 14, fontWeight: 600, color: '#1B1A17' }}>{card.title}</span>
                              <span style={{ fontSize: 13, color: '#9B9693', lineHeight: 1.4 }}>{card.body}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Fix all button */}
                      <button
                        onClick={openFixAll}
                        className="w-full flex items-center justify-center gap-2"
                        style={{ background: 'none', border: 'none', color: '#9B9693', padding: '8px 0', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Fix all
                      </button>
                    </>
                  )}

                  {/* Bridge — agent asks what to do next */}
                  {inlineChatCard === 'Heads up' && inlineChatPhase === 'published' && (
                    <div className="w-full flex flex-col gap-3" style={{ animation: inlineChatClosing ? 'cardClose 0.2s ease-in forwards' : 'cardOpen 0.25s ease-out' }}>
                      <p style={{ fontSize: 14, color: '#6B6762', lineHeight: 1.6, margin: 0 }}>
                        Want to tackle the next item, or would you prefer to work on something else?
                      </p>
                      {!showTakeALook && (
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => setShowTakeALook(true)}
                            style={{ backgroundColor: '#1B1A17', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                          >
                            Tackle next item
                          </button>
                          <button
                            onClick={closeInlineChat}
                            style={{ backgroundColor: 'transparent', color: '#4A4742', border: '1px solid #E8E8E8', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                          >
                            I'll type my own
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Take a look — separate section after Heads up is resolved */}
                  {inlineChatCard === 'Heads up' && inlineChatPhase === 'published' && showTakeALook && (
                    <div className="w-full flex flex-col gap-2 rounded-xl px-7 py-5" style={{ backgroundColor: '#FFFFFF', animation: inlineChatClosing ? 'cardClose 0.2s ease-in forwards' : 'cardOpen 0.25s ease-out' }}>
                      <div className="flex items-center gap-2">
                        <img src={imgTakeALook} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                        <span style={{ fontSize: 18, fontWeight: 600, color: '#1B1A17' }}>Take a look</span>
                      </div>
                      <p style={{ fontSize: 13, color: '#6B6762', lineHeight: 1.55, margin: 0 }}>
                        4 speakers haven't confirmed their session time slots and 3 speaker headshots are missing
                      </p>
                      {nextCardPhase === 'idle' && (
                        <div className="flex gap-2 flex-wrap" style={{ marginTop: 8 }}>
                          <button onClick={handleSendReminders} style={{ backgroundColor: '#1B1A17', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                            Send reminders
                          </button>
                          <button style={{ backgroundColor: 'transparent', color: '#4A4742', border: '1px solid #E8E8E8', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                            I'll handle it
                          </button>
                        </div>
                      )}
                      {nextCardPhase === 'sending' && (
                        <div className="flex items-center gap-3" style={{ marginTop: 8 }}>
                          <BTrace size={22} />
                          <span style={{ fontSize: 14, color: '#9B9693' }}>Sending reminders to 4 speakers…</span>
                        </div>
                      )}
                      {nextCardPhase === 'done' && (
                        <div className="flex flex-col gap-1" style={{ marginTop: 8 }}>
                          <span style={{ fontSize: 14, color: '#1B1A17', fontWeight: 500 }}>Reminders sent</span>
                          <span style={{ fontSize: 13, color: '#9B9693' }}>4 speakers notified · headshot requests included</span>
                        </div>
                      )}
                      <div ref={inlineChatEndRef} />
                    </div>
                  )}


                </div>

              </div>

              {/* Fixed reply input — always visible at bottom when inline chat is open */}
              {inlineChatCard && (
                <div
                  className="fixed bottom-0 z-20"
                  style={{ left: 'calc(50vw - 404px + 64px)', width: 680, backgroundColor: '#FFFFFF', paddingBottom: 24, paddingTop: 24 }}
                >
                  <div
                    className="flex items-center gap-3 px-5 rounded-[28.5px]"
                    style={{ height: 57, boxShadow: '0px 2px 8px 0px rgba(23,23,23,0.1)', backgroundColor: '#FFFFFF' }}
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                      <Plus className="w-3.5 h-3.5 text-neutral-500" />
                    </div>
                    <span style={{ fontSize: 16, color: '#C4C2BF', flex: 1 }}>Reply…</span>
                    <Mic className="w-5 h-5" style={{ color: '#C4C2BF' }} />
                    <Paperclip className="w-5 h-5" style={{ color: '#C4C2BF' }} />
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
