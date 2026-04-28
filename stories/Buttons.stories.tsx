import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const btnBase: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '0.2px',
  lineHeight: 1.33,
  cursor: 'pointer',
  fontFamily: 'Inter, system-ui, sans-serif',
  transition: 'filter 0.15s ease, transform 0.1s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
};

const primary: React.CSSProperties = { ...btnBase, backgroundColor: '#0075de', color: '#ffffff' };
const secondary: React.CSSProperties = { ...btnBase, backgroundColor: 'rgba(0,0,0,0.05)', color: 'rgba(0,0,0,0.95)' };
const ghost: React.CSSProperties = { ...btnBase, backgroundColor: 'transparent', color: 'rgba(0,0,0,0.95)', textDecoration: 'underline', textDecorationColor: 'transparent' };
const badge: React.CSSProperties = {
  padding: '4px 8px',
  borderRadius: 9999,
  backgroundColor: '#f2f9ff',
  color: '#097fe8',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.125px',
  lineHeight: 1.33,
  cursor: 'pointer',
  fontFamily: 'Inter, system-ui, sans-serif',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
};

function HoverBtn({ style, children, hoverStyle }: { style: React.CSSProperties; children: React.ReactNode; hoverStyle?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      style={{ ...style, ...(hovered ? (hoverStyle ?? { filter: 'brightness(0.92)' }) : {}), ...(pressed ? { transform: 'scale(0.9)' } : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a39e98', marginBottom: 24 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

function ButtonsPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '48px 56px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'rgba(0,0,0,0.95)', margin: 0, letterSpacing: '-0.5px' }}>Buttons</h1>
        <p style={{ fontSize: 15, color: '#615d59', marginTop: 8 }}>All interactions use 15px / 600 weight / 0.2px tracking. Hover: brightness(0.92). Active: scale(0.9).</p>
      </div>

      <Section title="Primary — Notion Blue">
        <HoverBtn style={primary}>Approve &amp; publish</HoverBtn>
        <HoverBtn style={primary}>Send to 340 contacts</HoverBtn>
        <HoverBtn style={primary}>Share with team</HoverBtn>
        <HoverBtn style={primary}>Draft exec summary</HoverBtn>
      </Section>

      <Section title="Secondary — Neutral">
        <HoverBtn style={secondary} hoverStyle={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>Edit first</HoverBtn>
        <HoverBtn style={secondary} hoverStyle={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>Edit draft</HoverBtn>
        <HoverBtn style={secondary} hoverStyle={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>Cancel</HoverBtn>
      </Section>

      <Section title="Ghost / Link">
        <HoverBtn style={ghost} hoverStyle={{ textDecorationColor: 'rgba(0,0,0,0.9)' }}>View details</HoverBtn>
        <HoverBtn style={ghost} hoverStyle={{ textDecorationColor: 'rgba(0,0,0,0.9)' }}>Learn more</HoverBtn>
      </Section>

      <Section title="Pill Badge">
        <button style={badge}>Event website</button>
        <button style={badge}>Insights &amp; reporting</button>
        <button style={badge}>Contact &amp; tickets</button>
        <button style={badge}>New</button>
      </Section>

      <Section title="Primary + Secondary paired (as they appear in chat)">
        <div style={{ display: 'flex', gap: 8 }}>
          <HoverBtn style={primary}>Approve &amp; publish</HoverBtn>
          <HoverBtn style={secondary} hoverStyle={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>Edit first</HoverBtn>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <HoverBtn style={primary}>Send to 340 contacts</HoverBtn>
          <HoverBtn style={secondary} hoverStyle={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>Edit draft</HoverBtn>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <HoverBtn style={primary}>Send to team</HoverBtn>
          <HoverBtn style={secondary} hoverStyle={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>Edit draft</HoverBtn>
        </div>
      </Section>

      <Section title="States">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Default', s: primary },
            { label: 'Hover', s: { ...primary, filter: 'brightness(0.92)' } },
            { label: 'Active / Pressed', s: { ...primary, transform: 'scale(0.9)' } },
            { label: 'Disabled', s: { ...primary, opacity: 0.4, cursor: 'not-allowed' } },
          ].map(({ label, s }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 100, fontSize: 12, color: '#a39e98' }}>{label}</div>
              <button style={s}>Approve &amp; publish</button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Design System / Buttons',
  component: ButtonsPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const AllVariants: StoryObj = {};
