import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const scale = [
  { role: 'Display Hero', size: '64px', weight: 700, lineHeight: 1.0, letterSpacing: '-2.125px', sample: 'Tech Summit Europe 2026' },
  { role: 'Display Secondary', size: '54px', weight: 700, lineHeight: 1.04, letterSpacing: '-1.875px', sample: 'Tech Summit Europe 2026' },
  { role: 'Section Heading', size: '48px', weight: 700, lineHeight: 1.0, letterSpacing: '-1.5px', sample: 'Registration Insights' },
  { role: 'Sub-heading Large', size: '40px', weight: 700, lineHeight: 1.5, letterSpacing: 'normal', sample: 'Registration Insights' },
  { role: 'Sub-heading', size: '26px', weight: 700, lineHeight: 1.23, letterSpacing: '-0.625px', sample: 'Speaker Profiles' },
  { role: 'Card Title', size: '22px', weight: 700, lineHeight: 1.27, letterSpacing: '-0.25px', sample: 'Win warm contacts' },
  { role: 'Body Large', size: '20px', weight: 600, lineHeight: 1.4, letterSpacing: '-0.125px', sample: 'At 612 registrations with velocity climbing week over week.' },
  { role: 'Body', size: '16px', weight: 400, lineHeight: 1.5, letterSpacing: 'normal', sample: 'Hi Jen! I have pulled the latest registration data and projections for you.' },
  { role: 'Body Medium', size: '16px', weight: 500, lineHeight: 1.5, letterSpacing: 'normal', sample: 'Insights & reporting · Event website · Contact & tickets' },
  { role: 'Body Semibold', size: '16px', weight: 600, lineHeight: 1.5, letterSpacing: 'normal', sample: 'Approve & publish · Send to 340 contacts' },
  { role: 'Nav / Button', size: '15px', weight: 600, lineHeight: 1.33, letterSpacing: '0.2px', sample: 'Approve & publish' },
  { role: 'Caption', size: '14px', weight: 500, lineHeight: 1.43, letterSpacing: 'normal', sample: '1d ago · Draft ready · 612 registrations' },
  { role: 'Caption Light', size: '14px', weight: 400, lineHeight: 1.43, letterSpacing: 'normal', sample: '1d ago · Draft ready · 612 registrations' },
  { role: 'Badge', size: '12px', weight: 600, lineHeight: 1.33, letterSpacing: '0.125px', sample: 'EVENT WEBSITE · INSIGHTS & REPORTING' },
  { role: 'Micro Label', size: '12px', weight: 400, lineHeight: 1.33, letterSpacing: '0.125px', sample: '2:14 PM · 3d ago · awaiting response' },
];

function TypographyPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '48px 56px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'rgba(0,0,0,0.95)', margin: 0, letterSpacing: '-0.5px' }}>Typography</h1>
        <p style={{ fontSize: 15, color: '#615d59', marginTop: 8 }}>Four-weight system: 400 (read) · 500 (interact) · 600 (emphasize) · 700 (announce). Letter-spacing compresses with scale.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {scale.map((item, i) => (
          <div
            key={item.role}
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 32,
              alignItems: 'baseline',
              padding: '20px 0',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#a39e98', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.role}</div>
              <div style={{ fontSize: 11, color: '#a39e98', marginTop: 4, fontFamily: 'monospace' }}>
                {item.size} / {item.weight} / lh {item.lineHeight}
              </div>
            </div>
            <div
              style={{
                fontSize: item.size,
                fontWeight: item.weight,
                lineHeight: item.lineHeight,
                letterSpacing: item.letterSpacing,
                color: 'rgba(0,0,0,0.9)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.sample}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Design System / Typography',
  component: TypographyPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Scale: StoryObj = {};
