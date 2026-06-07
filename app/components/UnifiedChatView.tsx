import React, { useState, useRef, useEffect } from 'react';
import { Plus, Mic, Paperclip, Check } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import type { AgentId, ChatMessage } from '../../types';
import { AGENTS, INITIAL_MESSAGES } from '../../constants';
import { now } from '../../utils';
import { BTrace } from './BTrace';
import { WebsiteCanvas } from './WebsiteCanvas';
import { ContactsCanvas } from './ContactsCanvas';
import { InsightsCanvas } from './InsightsCanvas';


const FIX_ALL_ITEMS = [
  { title: 'Jim Roland — missing speaker bio',           domain: 'Speakers', color: '#F25A38' },
  { title: 'Venue state shows "England"',                domain: 'Basics',   color: '#F2B138' },
  { title: 'Marita McGinley — non-standard email',       domain: 'Speakers', color: '#F2B138' },
  { title: 'Dora Seow — email typo "soew"',              domain: 'Speakers', color: '#F2B138' },
  { title: 'Marita McGinley — name trailing whitespace', domain: 'Speakers', color: '#F2B138' },
  { title: 'Alex Hideki Sato — unusual name formatting', domain: 'Speakers', color: '#6BA7BF' },
  { title: 'Verify speaker session assignments',          domain: 'Speakers', color: '#6BA7BF' },
];

const DAY1_DATA = [
  { t: '7:00', v: 8 }, { t: '7:30', v: 22 }, { t: '8:00', v: 48 }, { t: '8:30', v: 67 },
  { t: '9:00', v: 70 }, { t: '9:30', v: 52 }, { t: '10:00', v: 37 }, { t: '10:30', v: 23 },
  { t: '11:00', v: 15 }, { t: '11:30', v: 11 }, { t: '12:00', v: 7 }, { t: '12:30', v: 6 },
  { t: '1:00', v: 5 }, { t: '1:30', v: 4 }, { t: '2:00', v: 2 }, { t: '2:30', v: 1 },
];
const XLABELS = ['7 AM', '9 AM', '11 AM', '1 PM', '3 PM'];
const XIDX    = [0, 4, 8, 12, 15];

function CheckinDay1Chart() {
  const W = 480; const H = 160;
  const L = 36; const R = 16; const T = 16; const B = 32;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const max = 70;
  const xs = DAY1_DATA.map((_, i) => L + i * (plotW / (DAY1_DATA.length - 1)));
  const ys = DAY1_DATA.map(d => T + plotH - (d.v / max) * plotH);

  const curvePath = (fill: boolean) => {
    const pts = DAY1_DATA.map((_, i) => ({ x: xs[i], y: ys[i] }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const cp = (pts[i + 1].x - (i > 0 ? pts[i - 1].x : pts[i].x)) * 0.2;
      const cp2 = ((i + 2 < pts.length ? pts[i + 2].x : pts[i + 1].x) - pts[i].x) * 0.2;
      d += ` C ${pts[i].x + cp} ${pts[i].y}, ${pts[i + 1].x - cp2} ${pts[i + 1].y}, ${pts[i + 1].x} ${pts[i + 1].y}`;
    }
    if (fill) d += ` L ${pts[pts.length - 1].x} ${T + plotH} L ${pts[0].x} ${T + plotH} Z`;
    return d;
  };

  const peakIdx = 4; // 9:00 AM

  return (
    <div className="mt-1 overflow-hidden" style={{ borderRadius: '0.85175rem', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#fff' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <span style={{ fontSize: 13, fontWeight: 600, color: '#171717' }}>Day 1 check-ins · Jan 21</span>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', color: '#8A857C', backgroundColor: '#F5F5F5', borderRadius: 4, padding: '2px 7px' }}>378 total</span>
      </div>
      {/* Chart */}
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="cig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0075de" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0075de" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Y guide lines */}
        {[0, 35, 70].map(v => {
          const y = T + plotH - (v / max) * plotH;
          return (
            <g key={v}>
              <line x1={L} y1={y} x2={W - R} y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
              <text x={L - 5} y={y + 3.5} textAnchor="end" fontSize="9" fill="#9CA3AF">{v}</text>
            </g>
          );
        })}
        {/* Area fill */}
        <path d={curvePath(true)} fill="url(#cig)" />
        {/* Line */}
        <path d={curvePath(false)} fill="none" stroke="#0075de" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Peak dot */}
        <circle cx={xs[peakIdx]} cy={ys[peakIdx]} r="4" fill="#0075de" stroke="white" strokeWidth="2" />
        {/* Peak label */}
        <text x={xs[peakIdx]} y={ys[peakIdx] - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0075de">70</text>
        {/* X labels */}
        {XIDX.map((di, li) => (
          <text key={li} x={xs[di]} y={H - 6} textAnchor="middle" fontSize="10" fill="#9CA3AF">{XLABELS[li]}</text>
        ))}
      </svg>
    </div>
  );
}

function ThinkingMessage({ steps }: { steps: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIdx(i => (i + 1) % steps.length), 1500);
    return () => clearInterval(interval);
  }, [steps.length]);
  return (
    <div className="flex gap-4 items-center py-2">
      <BTrace size={32} />
      <span
        className="text-sm text-neutral-500"
        style={{ transition: 'opacity 0.3s ease', opacity: 0.9 }}
      >
        {steps[idx]}
      </span>
    </div>
  );
}

const DOMAIN_TAG: React.CSSProperties = {
  fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
  color: '#8A857C', backgroundColor: '#F5F5F5', borderRadius: 4, padding: '2px 6px', flexShrink: 0,
};

export function UnifiedChatView({
  initialAgent,
  onBack,
  hideCanvas = false,
  chatTitle,
  chatBadge,
  chatBadgeColor,
  overrideMessages,
  autoAction,
  canvasNode,
  onFindingAction,
}: {
  initialAgent: AgentId;
  onBack: () => void;
  hideCanvas?: boolean;
  chatTitle?: string;
  chatBadge?: string;
  chatBadgeColor?: string;
  overrideMessages?: ChatMessage[];
  autoAction?: string;
  canvasNode?: React.ReactNode;
  onFindingAction?: (id: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(overrideMessages ?? INITIAL_MESSAGES[initialAgent]);
  const [inputValue, setInputValue] = useState('');
  const [canvasVisible, setCanvasVisible] = useState(!canvasNode && initialAgent !== 'website');

  const activeAgent = initialAgent;

  const [analyzerAnswered, setAnalyzerAnswered] = useState(false);
  const [analyzerGraphed, setAnalyzerGraphed] = useState(false);
  const [websiteBuilt, setWebsiteBuilt] = useState(false);
  const [heroUpdated, setHeroUpdated] = useState(false);

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

  useEffect(() => {
    if (!autoAction) return;
    const t = setTimeout(() => handleAction(autoAction), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessages = (msgs: ChatMessage[]) => {
    setMessages(prev => [...prev, ...msgs]);
  };

  const handleAction = (id: string) => {
    const t = now();
    if (id === 'publish') {
      addMessages([
        { kind: 'user', text: 'Approve & publish', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Dr. Sarah Chen's profile is now live on the speakers page. Great call — the bio reads really well.", time: t },
      ]);
    } else if (id === 'edit') {
      addMessages([
        { kind: 'user', text: 'Edit first', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Sure! What would you like to change — the bio text, the title, or the photo?", time: t },
      ]);
    } else if (id === 'send') {
      addMessages([
        { kind: 'user', text: 'Send to 340 contacts', time: t },
        { kind: 'agent', agentId: activeAgent, text: "On it! Sending the early-bird email to all 340 contacts. I'll let you know as soon as it's done.", time: t },
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
        { kind: 'agent', agentId: activeAgent, text: "Of course — what would you like to change? The subject line, tone, or the CTA?", time: t },
      ]);
    } else if (id === 'send-draft') {
      addMessages([
        { kind: 'user', text: 'Send to team', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Sent! Your team will receive the exec summary by email. Let me know if you need any follow-up.", time: t },
      ]);
    } else if (id === 'edit-exec-draft') {
      addMessages([
        { kind: 'user', text: 'Edit draft', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Sure — what would you like to change? The tone, length, or specific data points?", time: t },
      ]);
    } else if (id === 'share') {
      addMessages([
        { kind: 'user', text: 'Share with team', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Done! I've shared the report with your team members. They'll receive a link via email.", time: t },
      ]);
    } else if (id === 'draft') {
      addMessages([
        { kind: 'user', text: 'Draft exec summary', time: t },
        { kind: 'agent', agentId: activeAgent, text: "On it — drafting two versions for you right now.", time: t },
        { kind: 'task-running', label: 'Drafting exec summary variants…' },
      ]);
      setDraftState('thinking');
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-running');
          return [
            ...next,
            { kind: 'task-done', label: 'Exec summary ready', summary: 'Two tone variants drafted — formal & narrative' },
            { kind: 'agent', agentId: activeAgent, text: 'Two drafts are ready on the right — select one to continue.', time: now() },
          ];
        });
        setDraftState('done');
        setRightTab('draft');
      }, 3000);
    } else if (id === 'finding-primary') {
      // Path A: Fix now (immediate)
      addMessages([
        { kind: 'user', text: 'Fix now', time: t },
        { kind: 'agent', agentId: activeAgent, text: "On it — pushing the correct CDN URL to the live page now.", time: t },
        { kind: 'task-running', label: 'Updating stream URL on event page…' },
      ]);
      onFindingAction?.('fix-now');
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-running');
          return [
            ...next,
            { kind: 'task-done', label: 'Stream URL updated · live page redeployed', summary: 'cdn.bizzabo.com/techsummit-2026/live is now live' },
            { kind: 'agent', agentId: activeAgent, text: "Done. The stream is live — 1,247 virtual attendees now have access. You can verify on the right.", time: now() },
          ];
        });
        setCanvasVisible(true);
      }, 2000);
    } else if (id === 'finding-secondary') {
      // Path B: Tell me more
      addMessages([
        { kind: 'user', text: 'Tell me more', time: t },
        { kind: 'agent', agentId: activeAgent, text: "The event page is pointing to stream.techsummit.io/live, which was decommissioned yesterday when you switched CDN providers. The correct URL is cdn.bizzabo.com/techsummit-2026/live. Attendees have been hitting the error for about 14 minutes. The fix takes roughly 10 seconds.", time: t, actions: [{ label: 'Fix now', primary: true, id: 'finding-fix-after-diagnose' }, { label: 'Copy correct URL', id: 'finding-copy-url' }] },
      ]);
      onFindingAction?.('tell-me-more');
      setCanvasVisible(true);
    } else if (id === 'finding-fix-after-diagnose') {
      // Path B → fix
      addMessages([
        { kind: 'user', text: 'Fix now', time: t },
        { kind: 'agent', agentId: activeAgent, text: "On it — pushing the correct CDN URL to the live page now.", time: t },
        { kind: 'task-running', label: 'Updating stream URL on event page…' },
      ]);
      onFindingAction?.('fix-now');
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-running');
          return [
            ...next,
            { kind: 'task-done', label: 'Stream URL updated · live page redeployed', summary: 'cdn.bizzabo.com/techsummit-2026/live is now live' },
            { kind: 'agent', agentId: activeAgent, text: "Done. The stream is live — 1,247 virtual attendees now have access.", time: now() },
          ];
        });
      }, 2000);
    } else if (id === 'finding-copy-url') {
      addMessages([
        { kind: 'user', text: 'Copy correct URL', time: t },
        { kind: 'agent', agentId: activeAgent, text: "Copied to clipboard: cdn.bizzabo.com/techsummit-2026/live", time: t },
      ]);
    } else if (id === 'fix-all') {
      addMessages([
        { kind: 'agent', agentId: activeAgent, text: "On it — applying all 7 fixes now.", time: t },
        { kind: 'task-running', label: 'Applying 7 fixes…' },
      ]);
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-running');
          return [
            ...next,
            { kind: 'task-done', label: '7 fixes applied', summary: 'All data issues resolved' },
            { kind: 'agent', agentId: activeAgent, text: "All done. Here's what I fixed:", time: now(), items: FIX_ALL_ITEMS },
          ];
        });
      }, 1800);
    }
  };

  const ANALYZER_RESPONSE = "Here's the check-in summary for Customer Contact Week Orlando — January 21–22, 2026.\n\nAttendance\n500 checked in · 100% in-person · 0 virtual\nDay 1: 378 (76%) · Day 2: 121 (24%) · Day 3: 1\nSharp Day 2 drop-off — typical for this format.\n\nTicket breakdown\nEnd Users 232 (46%) · Sponsors 206 (41%)\nVendors 29 · Staff 25 · Other 8\nNearly as many sponsors as end users — heavily commercial crowd.\n\nRoles\nAttendees 150 · Sponsors 207 · Guests 94 · Speakers 16 · Staff 26\nThe 94 guests suggest a strong invite-a-colleague or promo-code program.\n\nGeography\nUS 370+ · Florida 54 · New York 43 · California 25\nSmall international presence: Canada 10, plus Greece, Japan, Egypt, Germany, UK, Cyprus.\n\nTop companies\nCMP (organizer) 23 · ASAPP 8 · Five9 8 · Replicant 7 · Liveops 7\nGenesys 6 · Disney 5 · The RealReal 5\nContact center tech and BPO firms dominate — on-theme.\n\nIndustry & payment\nIndustry field mostly blank (342/500 N/A) — not reliable for segmentation.\nEnterprise Software 43 · Outsourcing/Offshoring 27 among those who filled it in.\n496 of 500 payments completed · 4 still pending.\n\nWant me to dig deeper? I can break down check-in timing by hour, compare sponsor vs. end-user engagement, or pull a company-by-company attendance list.";

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    addMessages([{ kind: 'user', text, time: now() }]);
    if (activeAgent === 'analyzer' && !analyzerAnswered) {
      setAnalyzerAnswered(true);
      addMessages([{ kind: 'task-thinking', steps: ['Reading check-in data…', 'Analyzing attendance patterns…', 'Segmenting by ticket type…', 'Mapping geography…', 'Reviewing company breakdown…', 'Putting it together…'] }]);
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-thinking');
          return [...next, { kind: 'agent', agentId: activeAgent, text: ANALYZER_RESPONSE, time: now() }];
        });
      }, 6000);
    } else if (activeAgent === 'analyzer' && analyzerAnswered && !analyzerGraphed) {
      setAnalyzerGraphed(true);
      addMessages([{ kind: 'task-thinking', steps: ['Loading check-in timestamps…', 'Grouping by 30-minute intervals…', 'Calculating peaks…', 'Rendering chart…'] }]);
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-thinking');
          return [
            ...next,
            { kind: 'agent', agentId: activeAgent, text: "Here's the check-in timeline for Day 1. The morning rush peaked at 9:00 AM with 70 check-ins in that 30-minute window — right as the opening keynote was scheduled.", time: now() },
            { kind: 'chart', chartId: 'checkin-day1' },
            { kind: 'suggestions', pills: ['What items are still open for this event', 'Show me all event registrations', 'Analyze the checkin for my event', 'Change the design of the event website'] },
          ];
        });
      }, 4000);
    } else if (activeAgent === 'website' && !websiteBuilt) {
      setWebsiteBuilt(true);
      addMessages([{ kind: 'task-thinking', steps: ['Reading your brief…', 'Planning layout structure…', 'Designing hero section…', 'Adding countdown timer…', 'Placing venue details…', 'Finalising styles…'] }]);
      setTimeout(() => {
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-thinking');
          return [
            ...next,
            { kind: 'task-done', label: 'Hero section built', summary: 'Split-screen layout · countdown timer · venue block' },
            { kind: 'agent', agentId: activeAgent, text: "Done — I've built the split-screen hero with your event info and CTA on the left, a live countdown to the event on the right, and the venue block below. Preview is on the right. Let me know if you'd like to tweak anything.", time: now() },
          ];
        });
        setCanvasVisible(true);
      }, 5500);
    } else if (activeAgent === 'website' && websiteBuilt) {
      addMessages([{ kind: 'task-thinking', steps: ['Reading your request…', 'Updating headline…', 'Applying to preview…'] }]);
      setTimeout(() => {
        setHeroUpdated(true);
        setMessages(prev => {
          const next = prev.filter(m => m.kind !== 'task-thinking');
          return [
            ...next,
            { kind: 'task-done', label: 'Headline updated', summary: 'Marketing Qualified Leads 2026' },
            { kind: 'agent', agentId: activeAgent, text: 'Done — the headline now reads "Marketing Qualified Leads 2026". Want to adjust anything else?', time: now() },
          ];
        });
      }, 2200);
    } else {
      setTimeout(() => {
        addMessages([{ kind: 'agent', agentId: activeAgent, text: "Got it — I'll keep that in mind.", time: now() }]);
      }, 700);
    }
  };

  const agentInfo = AGENTS[activeAgent];

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
      return (
        <div key={i} className="flex gap-3">
          <svg width="18" height="18" viewBox="42 23 133 170" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M150.2 104.8C154.8 99.5 157.4 93.3001 157.4 86.6001C157.4 61.7001 138.7 43.3 98.7 43.3C75.8 43.3 58.7 50.0001 58.7 50.0001L64.7 66.0001C64.7 66.0001 77 59.3 98.7 59.3C120.4 59.3 141.4 65.5001 141.4 86.6001C141.4 89.8001 140.6 92.4001 139.1 94.6001C122.8 82.1001 101.8 74.6001 85.4 74.6001C76.1 74.6001 62.1 79.3001 62.1 92.6001C62.1 113.9 94.8 119.9 112.1 119.9C121.8 119.9 130.5 117.8 137.7 114.3C144.3 121.5 148.8 130.3 148.8 140.6C148.8 156.4 132.1 159.9 122.8 159.9C97.5 159.9 82.8 142.8 78.1 132.6L62.8 136.6V172.6H78.8V159.3C78.8 159.3 94.9 176.6 122.8 176.6C149.5 176.6 165.5 160.9 165.5 140.6C165.4 127.1 159.4 114.9 150.2 104.8ZM78.8 94.0001C78.8 87.3001 103.7 90.6001 123.8 103.1C105.2 106.6 78.8 99.9001 78.8 94.0001Z" fill="rgba(0,0,0,0.85)" />
          </svg>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-neutral-900">Soham</span>
              <span className="text-xs text-neutral-400">{msg.time}</span>
            </div>
            {msg.text && (
              <div className="flex flex-col gap-3">
                {msg.text.split('\n\n').map((para, pi) => (
                  <p key={pi} className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">{para}</p>
                ))}
              </div>
            )}
            {msg.items && (
              <div className="flex flex-col gap-2.5 mt-1">
                {msg.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-neutral-700 flex-1">{item.title}</span>
                    <span style={DOMAIN_TAG}>{item.domain}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0075de', flexShrink: 0 }}>✓</span>
                  </div>
                ))}
              </div>
            )}
            {msg.actions && (
              <div className="flex gap-2 flex-wrap mt-4">
                {msg.actions.map(a => (
                  <button
                    key={a.id}
                    onClick={() => handleAction(a.id)}
                    style={a.primary
                      ? { backgroundColor: '#0075de', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', border: '1px solid transparent', fontSize: '15px', fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1.33, cursor: 'pointer', transition: 'filter 0.15s ease, transform 0.1s ease' }
                      : { backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.95)', padding: '8px 16px', borderRadius: '4px', border: '1px solid transparent', fontSize: '15px', fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1.33, cursor: 'pointer', transition: 'filter 0.15s ease, transform 0.1s ease' }
                    }
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.92)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = ''; }}
                    onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.9)'; }}
                    onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (msg.kind === 'task-thinking') {
      return <ThinkingMessage key={i} steps={msg.steps} />;
    }

    if (msg.kind === 'chart') {
      return msg.chartId === 'checkin-day1' ? <CheckinDay1Chart key={i} /> : null;
    }

    if (msg.kind === 'suggestions') {
      return (
        <div key={i} className="flex flex-wrap gap-2 pt-1">
          {msg.pills.map((pill, pi) => (
            <button
              key={pi}
              onClick={() => { setInputValue(pill); setTimeout(() => inputRef.current?.focus(), 0); }}
              className="px-4 py-2 rounded-full text-sm text-neutral-700 hover:bg-white transition-colors"
              style={{ backgroundColor: '#F5F5F5', border: '1px solid rgba(0,0,0,0.07)', fontSize: 13 }}
            >
              {pill}
            </button>
          ))}
        </div>
      );
    }

    if (msg.kind === 'task-running') {
      return (
        <div key={i} className="flex gap-3">
          <div className="w-[18px] h-[18px] rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
            <BTrace size={10} />
          </div>
          <div className="flex flex-col gap-1">
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
          <div className="w-[18px] h-[18px] rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-2.5 h-2.5 text-emerald-600" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-neutral-900">{msg.label}</span>
            <span className="text-xs text-neutral-400">{msg.summary}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  const centered = hideCanvas || !canvasVisible;

  return (
    <div className={`flex h-full w-full ${centered ? 'justify-center' : ''}`}>
      {/* ── Left: Chat panel ── */}
      <div className={`${centered ? 'w-1/2' : 'w-[400px] shrink-0 border-r border-neutral-100'} flex flex-col`}>

        <div className="flex-1 overflow-y-auto pt-8 pb-7 px-6 flex flex-col gap-6">
          {messages.map((msg, i) => renderMessage(msg, i))}
          {draftState === 'done' && (
            <div
              className="flex gap-2 flex-wrap pl-[30px]"
              style={{
                opacity: draftChosen !== null ? 1 : 0,
                transform: draftChosen !== null ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                pointerEvents: draftChosen !== null ? 'auto' : 'none',
              }}
            >
              {[{ label: 'Send to team', primary: true, id: 'send-draft' }, { label: 'Edit draft', id: 'edit-exec-draft' }].map(a => (
                <button
                  key={a.id}
                  onClick={() => handleAction(a.id)}
                  style={a.primary
                    ? { backgroundColor: '#0075de', color: '#ffffff', padding: '8px 16px', borderRadius: '4px', border: '1px solid transparent', fontSize: '15px', fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1.33, cursor: 'pointer', transition: 'filter 0.15s ease' }
                    : { backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.95)', padding: '8px 16px', borderRadius: '4px', border: '1px solid transparent', fontSize: '15px', fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1.33, cursor: 'pointer', transition: 'filter 0.15s ease' }
                  }
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.92)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = ''; }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

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
              placeholder={activeAgent === 'analyzer' && !analyzerAnswered ? 'Analyze the check in for my event' : 'Ask Soham anything…'}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
            />
            <div className="flex items-center gap-2 shrink-0">
              {inputValue && (
                <button onClick={handleSend}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:brightness-95 transition-all"
                  style={{ backgroundColor: '#FFF000' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                </button>
              )}
              <Mic className="w-4 h-4 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors" />
              <Paperclip className="w-4 h-4 text-neutral-400 cursor-pointer hover:text-neutral-600 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Canvas ── */}
      {!hideCanvas && (
        <div
          className="flex flex-col overflow-hidden"
          style={{
            flex: canvasVisible ? 1 : 0,
            opacity: canvasVisible ? 1 : 0,
            transition: 'flex 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
            minWidth: 0,
          }}
        >
          {canvasNode ?? (
            <>
              {activeAgent === 'website' && (websiteBuilt ? (
                <HeroCanvas
                  showUpdated={heroUpdated}
                  onDescribeChange={zone => {
                    setInputValue(`Change the ${zone}: `);
                    setTimeout(() => inputRef.current?.focus(), 50);
                  }}
                  onApply={(zoneId, values) => {
                    if (zoneId === 'headline') {
                      setHeroUpdated(true);
                      addMessages([{ kind: 'agent', agentId: activeAgent, text: `Done — the headline has been updated to "${values[0]}". You can see the change in the preview.`, time: now() }]);
                    }
                  }}
                />
              ) : <WebsiteCanvas />)}
              {activeAgent === 'contacts' && <ContactsCanvas />}
              {activeAgent === 'insights' && (
                <InsightsCanvas
                  loading={insightsLoading}
                  draftState={draftState}
                  draftChosen={draftChosen}
                  rightTab={rightTab}
                  onTabChange={setRightTab}
                  onChooseDraft={i => setDraftChosen(i === draftChosen ? null : i)}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
