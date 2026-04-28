import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const palette = [
  {
    group: 'Primary',
    colors: [
      { name: 'Notion Black', value: 'rgba(0,0,0,0.95)', hex: '#000000 / 95%' },
      { name: 'Pure White', value: '#ffffff', hex: '#ffffff' },
      { name: 'Notion Blue', value: '#0075de', hex: '#0075de' },
    ],
  },
  {
    group: 'Brand Secondary',
    colors: [
      { name: 'Deep Navy', value: '#213183', hex: '#213183' },
      { name: 'Active Blue', value: '#005bab', hex: '#005bab' },
    ],
  },
  {
    group: 'Warm Neutrals',
    colors: [
      { name: 'Warm White', value: '#f6f5f4', hex: '#f6f5f4' },
      { name: 'Warm Dark', value: '#31302e', hex: '#31302e' },
      { name: 'Warm Gray 500', value: '#615d59', hex: '#615d59' },
      { name: 'Warm Gray 300', value: '#a39e98', hex: '#a39e98' },
    ],
  },
  {
    group: 'Interactive',
    colors: [
      { name: 'Link Blue', value: '#0075de', hex: '#0075de' },
      { name: 'Focus Blue', value: '#097fe8', hex: '#097fe8' },
      { name: 'Badge Blue Bg', value: '#f2f9ff', hex: '#f2f9ff' },
      { name: 'Badge Blue Text', value: '#097fe8', hex: '#097fe8' },
    ],
  },
  {
    group: 'Semantic',
    colors: [
      { name: 'Teal', value: '#2a9d99', hex: '#2a9d99' },
      { name: 'Green', value: '#1aae39', hex: '#1aae39' },
      { name: 'Orange', value: '#dd5b00', hex: '#dd5b00' },
      { name: 'Pink', value: '#ff64c8', hex: '#ff64c8' },
      { name: 'Purple', value: '#391c57', hex: '#391c57' },
    ],
  },
  {
    group: 'Domain Accents',
    colors: [
      { name: 'Website (Yellow)', value: '#FDE047', hex: '#FDE047' },
      { name: 'Contacts (Purple)', value: '#C4B5FD', hex: '#C4B5FD' },
      { name: 'Insights (Green)', value: '#34D399', hex: '#34D399' },
    ],
  },
];

function ColorChip({ name, value, hex }: { name: string; value: string; hex: string }) {
  const isDark = ['#000000', '#213183', '#005bab', '#31302e', '#615d59', '#0075de', '#391c57', '#097fe8'].includes(value.toLowerCase());
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          backgroundColor: value,
          width: 80,
          height: 80,
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.9)' }}>{name}</div>
        <div style={{ fontSize: 11, color: '#a39e98', fontFamily: 'monospace', marginTop: 2 }}>{hex}</div>
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '48px 56px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'rgba(0,0,0,0.95)', margin: 0, letterSpacing: '-0.5px' }}>Color Palette</h1>
        <p style={{ fontSize: 15, color: '#615d59', marginTop: 8 }}>Notion-inspired warm neutral system with Notion Blue as the sole saturated accent.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {palette.map(group => (
          <div key={group.group}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a39e98', marginBottom: 20 }}>{group.group}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {group.colors.map(c => <ColorChip key={c.name} {...c} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Atoms / Colors',
  component: ColorsPage,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const AllColors: StoryObj = {};
