import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Plus, Mic, Paperclip, Check } from 'lucide-react';
import { Button, Tag } from 'antd';
import type { AgentId, ChatMessage } from '../../types';
import { AGENTS, INITIAL_MESSAGES } from '../../constants';
import { now } from '../../utils';
import { BTrace } from './BTrace';
import { WebsiteCanvas } from './WebsiteCanvas';
import { ContactsCanvas } from './ContactsCanvas';
import { InsightsCanvas } from './InsightsCanvas';

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

export function UnifiedChatView({ initialAgent, onBack }: { initialAgent: AgentId; onBack: () => void }) {
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
          <div className="w-7 h-7 rounded-full shrink-0 mt-0.5 overflow-hidden border border-neutral-100">
            <img src={agent.photo} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-neutral-900">{agent.agentName}</span>
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
            <img src={fromAgent.photo} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[11px] text-neutral-400">→</span>
            <img src={toAgent.photo} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[11px] text-neutral-500 font-medium">Switching to {toAgent.agentName}</span>
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
        <header className="flex items-center gap-3 px-6 py-5 border-b border-neutral-100 shrink-0 relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-sm transition-colors duration-300"
            style={{ backgroundColor: agentAvatarColor[activeAgent] === '#FFF000' ? '#FFF000' : agentAvatarColor[activeAgent] }} />
          <Button
            type="text"
            onClick={onBack}
            icon={<ChevronLeft className="w-4 h-4" />}
            style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: '#a3a3a3', flexShrink: 0 }}
          />
          <div className="flex flex-col">
            <h2 className="font-semibold text-neutral-900 text-sm leading-tight">{agentInfo.name}</h2>
            <span className="text-neutral-400 font-normal text-[11px]">{agentInfo.meta}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto py-7 px-6 flex flex-col gap-6">
          {messages.map((msg, i) => renderMessage(msg, i))}
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
              placeholder={`Reply to ${AGENTS[activeAgent].agentName}…`}
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

      {/* ── Right: Canvas ── */}
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
