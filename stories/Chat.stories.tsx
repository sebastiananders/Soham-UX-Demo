import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Check, Plus, Mic, Paperclip } from 'lucide-react';

// ─── Shared primitives ────────────────────────────────────────────────────────

const ACCENTS = {
  website:  '#FDE047',
  contacts: '#C4B5FD',
  insights: '#34D399',
} as const;

type Domain = keyof typeof ACCENTS;

const DOMAIN_META: Record<Domain, { sub: string; name: string; meta: string }> = {
  website:  { sub: 'Event website',        name: 'Speaker profiles',     meta: '1d ago · Draft ready' },
  contacts: { sub: 'Contact & tickets',    name: 'Win warm contacts',    meta: '3d ago · 340 warm contacts' },
  insights: { sub: 'Insights & reporting', name: 'Registration insight', meta: '2h ago · 612 registrations' },
};

const BTN_PRIMARY: React.CSSProperties = {
  backgroundColor: '#0075de', color: '#ffffff',
  padding: '8px 16px', borderRadius: 4, border: '1px solid transparent',
  fontSize: 15, fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1.33,
  cursor: 'pointer', fontFamily: 'inherit',
};
const BTN_SECONDARY: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.95)',
  padding: '8px 16px', borderRadius: 4, border: '1px solid transparent',
  fontSize: 15, fontWeight: 600, letterSpacing: '0.2px', lineHeight: 1.33,
  cursor: 'pointer', fontFamily: 'inherit',
};

function BizzaboIcon() {
  return (
    <svg width="18" height="18" viewBox="42 23 133 170" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M150.2 104.8C154.8 99.5 157.4 93.3001 157.4 86.6001C157.4 61.7001 138.7 43.3 98.7 43.3C75.8 43.3 58.7 50.0001 58.7 50.0001L64.7 66.0001C64.7 66.0001 77 59.3 98.7 59.3C120.4 59.3 141.4 65.5001 141.4 86.6001C141.4 89.8001 140.6 92.4001 139.1 94.6001C122.8 82.1001 101.8 74.6001 85.4 74.6001C76.1 74.6001 62.1 79.3001 62.1 92.6001C62.1 113.9 94.8 119.9 112.1 119.9C121.8 119.9 130.5 117.8 137.7 114.3C144.3 121.5 148.8 130.3 148.8 140.6C148.8 156.4 132.1 159.9 122.8 159.9C97.5 159.9 82.8 142.8 78.1 132.6L62.8 136.6V172.6H78.8V159.3C78.8 159.3 94.9 176.6 122.8 176.6C149.5 176.6 165.5 160.9 165.5 140.6C165.4 127.1 159.4 114.9 150.2 104.8ZM78.8 94.0001C78.8 87.3001 103.7 90.6001 123.8 103.1C105.2 106.6 78.8 99.9001 78.8 94.0001Z" fill="rgba(0,0,0,0.85)" />
    </svg>
  );
}

function AgentMsg({ text, time = '2:14 PM', actions }: { text: string; time?: string; actions?: { label: string; primary?: boolean }[] }) {
  return (
    <div className="flex gap-3">
      <BizzaboIcon />
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-neutral-900">Soham</span>
          <span className="text-xs text-neutral-400">{time}</span>
        </div>
        {text && <p className="text-sm text-neutral-700 leading-relaxed">{text}</p>}
        {actions && (
          <div className="flex gap-2 flex-wrap mt-4">
            {actions.map(a => (
              <button key={a.label} style={a.primary ? BTN_PRIMARY : BTN_SECONDARY}>{a.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserMsg({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-neutral-100 rounded-[14px] rounded-tr-[4px] px-4 py-3 max-w-[270px]">
        <p className="text-sm text-neutral-800">{text}</p>
      </div>
    </div>
  );
}

function TaskRunning({ label }: { label: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-[18px] h-[18px] rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
        <div className="w-2 h-2 rounded-full bg-neutral-300 animate-pulse" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-24 bg-neutral-100 rounded-full overflow-hidden">
          <div className="h-full bg-neutral-300 rounded-full" style={{ width: '60%' }} />
        </div>
        <span className="text-xs text-neutral-400">{label}</span>
      </div>
    </div>
  );
}

function TaskDone({ label, summary }: { label: string; summary: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-[18px] h-[18px] rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
        <Check className="w-2.5 h-2.5 text-emerald-600" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-neutral-900">{label}</span>
        <span className="text-xs text-neutral-400">{summary}</span>
      </div>
    </div>
  );
}

function ChatHeader({ domain }: { domain: Domain }) {
  const accent = ACCENTS[domain];
  const { sub, name, meta } = DOMAIN_META[domain];
  return (
    <div className="flex items-center gap-3 px-6 py-5" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #E5E7EB' }}>
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold tracking-widest uppercase leading-none px-2 py-1 self-start" style={{ backgroundColor: `${accent}80`, color: '#171717', borderRadius: 4 }}>{sub}</span>
        <h2 className="font-bold text-[18px] leading-tight" style={{ color: '#171717' }}>{name}</h2>
        <span className="text-[12px] font-medium" style={{ color: '#9CA3AF' }}>{meta}</span>
      </div>
    </div>
  );
}

function ChatInputBar({ domain, hasText = false }: { domain: Domain; hasText?: boolean }) {
  const [value, setValue] = useState(hasText ? 'Can you make the tone more urgent?' : '');
  const accent = ACCENTS[domain];
  return (
    <div className="pb-6 pt-3 px-5" style={{ backgroundColor: '#fff' }}>
      <div className="w-full h-[52px] bg-white rounded-[26px] border border-neutral-100 flex items-center px-5 gap-3" style={{ boxShadow: '0px 2px 8px 0px rgba(23,23,23,0.08)' }}>
        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
          <Plus className="w-3 h-3 text-neutral-500" />
        </div>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Ask Soham anything…"
          className="flex-1 bg-transparent border-none outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
        />
        <div className="flex items-center gap-2 shrink-0">
          {value && (
            <button className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </button>
          )}
          <Mic className="w-4 h-4 text-neutral-400" />
          <Paperclip className="w-4 h-4 text-neutral-400" />
        </div>
      </div>
    </div>
  );
}

function Pad({ children }: { children: React.ReactNode }) {
  return <div className="p-8 bg-white flex flex-col gap-6 max-w-[400px]">{children}</div>;
}

// ─── Story definitions ────────────────────────────────────────────────────────

export default { title: 'App / Chat' } satisfies Meta;

// Messages
export const MessageAgent: StoryObj = {
  name: 'Messages / Agent',
  render: () => <Pad><AgentMsg text="Hi Jen, I've pulled the latest registration data for Tech Summit Europe 2026." time="3:02 PM" /></Pad>,
};

export const MessageAgentWithActions: StoryObj = {
  name: 'Messages / Agent with Actions',
  render: () => (
    <Pad>
      <AgentMsg
        text="Want me to share this report with the team, or draft a summary for the exec update?"
        time="3:03 PM"
        actions={[{ label: 'Share with team', primary: true }, { label: 'Draft exec summary' }]}
      />
    </Pad>
  ),
};

export const MessageUser: StoryObj = {
  name: 'Messages / User',
  render: () => <Pad><UserMsg text="Can you make the bio a bit shorter?" /></Pad>,
};

export const MessageTaskRunning: StoryObj = {
  name: 'Messages / Task Running',
  render: () => <Pad><TaskRunning label="Sending emails to 340 contacts…" /></Pad>,
};

export const MessageTaskDone: StoryObj = {
  name: 'Messages / Task Done',
  render: () => <Pad><TaskDone label="Email campaign sent" summary="340 emails delivered · avg open rate 42% expected" /></Pad>,
};

export const FullThread: StoryObj = {
  name: 'Messages / Full Thread',
  render: () => (
    <div className="w-[400px] bg-white flex flex-col gap-6 py-7 px-6">
      <AgentMsg text="Hi Jen, I noticed the event website is missing Dr. Sarah Chen's speaker profile. I've drafted a bio based on the event brief and her published work." time="2:14 PM" />
      <AgentMsg text="I've placed her profile in the Speakers section — you can see the draft on the right. Everything is ready to go live. Should I publish it?" time="2:14 PM" />
      <AgentMsg text="" time="2:15 PM" actions={[{ label: 'Approve & publish', primary: true }, { label: 'Edit first' }]} />
      <UserMsg text="Approve & publish" />
      <AgentMsg text="Dr. Sarah Chen's profile is now live on the speakers page. Great call — the bio reads really well." time="2:16 PM" />
      <UserMsg text="Can you also add a short video intro section?" />
      <AgentMsg text="On it — adding a video intro section now. I'll let you know as soon as it's done." time="2:17 PM" />
      <TaskRunning label="Updating speaker section…" />
      <TaskDone label="Speaker section updated" summary="Video intro slot added · ready to preview" />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

// Chat Header
export const HeaderWebsite: StoryObj = {
  name: 'Chat Header / Website',
  render: () => <div style={{ width: 400 }}><ChatHeader domain="website" /></div>,
};
export const HeaderContacts: StoryObj = {
  name: 'Chat Header / Contacts',
  render: () => <div style={{ width: 400 }}><ChatHeader domain="contacts" /></div>,
};
export const HeaderInsights: StoryObj = {
  name: 'Chat Header / Insights',
  render: () => <div style={{ width: 400 }}><ChatHeader domain="insights" /></div>,
};

// Chat Input
export const InputEmpty: StoryObj = {
  name: 'Chat Input / Empty',
  render: () => <div style={{ width: 400, backgroundColor: '#fff' }}><ChatInputBar domain="website" hasText={false} /></div>,
};
export const InputWithText: StoryObj = {
  name: 'Chat Input / With Text',
  render: () => <div style={{ width: 400, backgroundColor: '#fff' }}><ChatInputBar domain="website" hasText={true} /></div>,
};

// Canvas-driven Action Buttons
function ActionButtons({ draftChosen }: { draftChosen: number | null }) {
  return (
    <div
      className="flex gap-2 flex-wrap pl-[30px]"
      style={{
        opacity: draftChosen !== null ? 1 : 0,
        transform: draftChosen !== null ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        pointerEvents: draftChosen !== null ? 'auto' : 'none',
      }}
    >
      <button style={BTN_PRIMARY}>Send to team</button>
      <button style={BTN_SECONDARY}>Edit draft</button>
    </div>
  );
}

export const ActionButtonsHidden: StoryObj = {
  name: 'Action Buttons / Hidden (no canvas selection)',
  render: () => (
    <div className="p-8 bg-white flex flex-col gap-4">
      <p className="text-xs text-neutral-400">No draft selected — buttons invisible</p>
      <ActionButtons draftChosen={null} />
    </div>
  ),
};

export const ActionButtonsVisible: StoryObj = {
  name: 'Action Buttons / Visible (canvas selection active)',
  render: () => {
    const [chosen, setChosen] = useState<number | null>(null);
    return (
      <div className="p-8 bg-white flex flex-col gap-4">
        <p className="text-xs text-neutral-400">Click a draft card to reveal buttons:</p>
        <div className="flex gap-3">
          {[0, 1].map(i => (
            <div
              key={i}
              onClick={() => setChosen(i === chosen ? null : i)}
              className="rounded-[12px] border p-4 cursor-pointer transition-all flex-1"
              style={{ borderColor: chosen === i ? '#45C4B0' : '#e5e5e5', backgroundColor: chosen === i ? '#f4fcfb' : '#fafafa' }}
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">{i === 0 ? 'Formal / data-led' : 'Narrative / momentum'}</p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {i === 0 ? 'Tech Summit Europe 2026 has reached 612 registrations (61% of the 1,000-seat target).' : "We're 61% to goal and accelerating — last week was our strongest yet."}
              </p>
            </div>
          ))}
        </div>
        <ActionButtons draftChosen={chosen} />
      </div>
    );
  },
};
