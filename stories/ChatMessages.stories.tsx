import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Check } from 'lucide-react';

const BizzaboIcon = () => (
  <svg width="18" height="18" viewBox="42 23 133 170" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
    <path d="M150.2 104.8C154.8 99.5 157.4 93.3001 157.4 86.6001C157.4 61.7001 138.7 43.3 98.7 43.3C75.8 43.3 58.7 50.0001 58.7 50.0001L64.7 66.0001C64.7 66.0001 77 59.3 98.7 59.3C120.4 59.3 141.4 65.5001 141.4 86.6001C141.4 89.8001 140.6 92.4001 139.1 94.6001C122.8 82.1001 101.8 74.6001 85.4 74.6001C76.1 74.6001 62.1 79.3001 62.1 92.6001C62.1 113.9 94.8 119.9 112.1 119.9C121.8 119.9 130.5 117.8 137.7 114.3C144.3 121.5 148.8 130.3 148.8 140.6C148.8 156.4 132.1 159.9 122.8 159.9C97.5 159.9 82.8 142.8 78.1 132.6L62.8 136.6V172.6H78.8V159.3C78.8 159.3 94.9 176.6 122.8 176.6C149.5 176.6 165.5 160.9 165.5 140.6C165.4 127.1 159.4 114.9 150.2 104.8ZM78.8 94.0001C78.8 87.3001 103.7 90.6001 123.8 103.1C105.2 106.6 78.8 99.9001 78.8 94.0001Z" fill="rgba(0,0,0,0.85)" />
  </svg>
);

const btnBase: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: 4,
  border: '1px solid transparent',
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: '0.2px',
  lineHeight: 1.33,
  cursor: 'pointer',
  fontFamily: 'Inter, system-ui, sans-serif',
};

function AgentMessage({ text, time = '2:14 PM', actions }: { text: string; time?: string; actions?: { label: string; primary?: boolean }[] }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <BizzaboIcon />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>Soham</span>
          <span style={{ fontSize: 12, color: '#a39e98' }}>{time}</span>
        </div>
        {text && <p style={{ fontSize: 14, color: '#404040', lineHeight: 1.6, margin: 0 }}>{text}</p>}
        {actions && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {actions.map(a => (
              <button key={a.label} style={a.primary ? { ...btnBase, backgroundColor: '#0075de', color: '#ffffff' } : { ...btnBase, backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.95)' }}>
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ backgroundColor: '#f5f5f5', borderRadius: '14px 14px 4px 14px', padding: '10px 14px', maxWidth: 270 }}>
        <p style={{ fontSize: 14, color: '#1a1a1a', margin: 0 }}>{text}</p>
      </div>
    </div>
  );
}

function TaskRunning({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fafafa', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#d4d4d4', animation: 'pulse 1.5s ease-in-out infinite' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ height: 6, width: 96, backgroundColor: '#f5f5f5', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '60%', backgroundColor: '#d4d4d4', borderRadius: 9999 }} />
        </div>
        <span style={{ fontSize: 12, color: '#a39e98' }}>{label}</span>
      </div>
    </div>
  );
}

function TaskDone({ label, summary }: { label: string; summary: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
        <Check size={10} color="#16a34a" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>{label}</span>
        <span style={{ fontSize: 12, color: '#a39e98' }}>{summary}</span>
      </div>
    </div>
  );
}

function ChatFrame({ children, accent = '#FDE047', sub = 'Event website', name = 'Speaker profiles', meta = '1d ago · Draft ready' }: {
  children: React.ReactNode;
  accent?: string;
  sub?: string;
  name?: string;
  meta?: string;
}) {
  return (
    <div style={{ width: 400, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, overflow: 'hidden', backgroundColor: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, backgroundColor: `${accent}80`, color: '#171717', display: 'inline-block', marginBottom: 6 }}>{sub}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#171717' }}>{name}</div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{meta}</div>
      </div>
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {children}
      </div>
    </div>
  );
}

function AllMessages() {
  return (
    <div style={{ backgroundColor: '#f6f5f4', minHeight: '100vh', padding: '48px 56px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'rgba(0,0,0,0.95)', margin: 0, letterSpacing: '-0.5px' }}>Chat Messages</h1>
        <p style={{ fontSize: 15, color: '#615d59', marginTop: 8 }}>All message types rendered in context. Black Bizzabo avatar for Soham. Text aligns at 18px + 12px gap = 30px.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a39e98', marginBottom: 16 }}>Website chat</div>
          <ChatFrame accent="#FDE047" sub="Event website" name="Speaker profiles" meta="1d ago · Draft ready">
            <AgentMessage text="Hi Jen, I noticed the event website is missing Dr. Sarah Chen's speaker profile. I've drafted a bio based on the event brief and her published work." time="2:14 PM" />
            <AgentMessage text="I've placed her profile in the Speakers section — you can see the draft on the right. Everything is ready to go live. Should I publish it?" time="2:14 PM" />
            <AgentMessage text="" time="2:15 PM" actions={[{ label: 'Approve & publish', primary: true }, { label: 'Edit first' }]} />
            <UserMessage text="Approve & publish" />
            <AgentMessage text="Dr. Sarah Chen's profile is now live on the speakers page. Great call — the bio reads really well." time="2:16 PM" />
          </ChatFrame>
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a39e98', marginBottom: 16 }}>Task states</div>
          <ChatFrame accent="#C4B5FD" sub="Contact & tickets" name="Win warm contacts" meta="3d ago · 340 warm contacts">
            <AgentMessage text="I found 340 contacts who opened the event invite but haven't registered. With the early-bird deadline in 3 days, this is the right moment to follow up." time="2:31 PM" />
            <AgentMessage text="" time="2:32 PM" actions={[{ label: 'Send to 340 contacts', primary: true }, { label: 'Edit draft' }]} />
            <UserMessage text="Send to 340 contacts" />
            <AgentMessage text="On it! Sending the early-bird email to all 340 contacts. I'll let you know as soon as it's done." time="2:32 PM" />
            <TaskRunning label="Sending emails to 340 contacts…" />
            <TaskDone label="Email campaign sent" summary="340 emails delivered · avg open rate 42% expected" />
          </ChatFrame>
        </div>

      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Design System / Chat Messages',
  component: AllMessages,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const AllTypes: StoryObj = {};
export const AgentOnly: StoryObj = {
  render: () => (
    <div style={{ padding: 32, backgroundColor: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <AgentMessage text="Hi Jen, I've pulled the latest registration data for Tech Summit Europe 2026." time="3:02 PM" />
        <AgentMessage text="Registration velocity has been accelerating week over week. With current pace, I project 720–780 total registrations." time="3:02 PM" />
        <AgentMessage text="Want me to share this report with the team, or draft a summary for the exec update?" time="3:03 PM" actions={[{ label: 'Share with team', primary: true }, { label: 'Draft exec summary' }]} />
      </div>
    </div>
  ),
};
export const TaskStates: StoryObj = {
  render: () => (
    <div style={{ padding: 32, backgroundColor: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <TaskRunning label="Sending emails to 340 contacts…" />
        <TaskRunning label="Drafting exec summary variants…" />
        <TaskDone label="Email campaign sent" summary="340 emails delivered · avg open rate 42% expected" />
        <TaskDone label="Exec summary ready" summary="Two tone variants drafted — formal & narrative" />
      </div>
    </div>
  ),
};
