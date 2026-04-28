import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BTrace } from '../app/components/BTrace';
import { AgentAvatar } from '../app/components/AgentAvatar';

// ─── BTrace ──────────────────────────────────────────────────────────────────

const btraceMeta: Meta<typeof BTrace> = {
  title: 'App / Primitives / BTrace',
  component: BTrace,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'range', min: 10, max: 120, step: 2 } },
    label: { control: 'text' },
  },
};
export default btraceMeta;

export const Default: StoryObj<typeof BTrace> = {
  args: { size: 48 },
};

export const WithLabel: StoryObj<typeof BTrace> = {
  args: { size: 48, label: 'Pulling most recent data…' },
};

export const Sizes: StoryObj<typeof BTrace> = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, padding: 32, background: '#fff' }}>
      {[
        { size: 10, label: 'Task icon (10)' },
        { size: 18, label: 'Small (18)' },
        { size: 48, label: 'Default (48)' },
        { size: 72, label: 'Canvas loader (72)' },
      ].map(({ size, label }) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <BTrace size={size} />
          <span style={{ fontSize: 11, color: '#a39e98', fontFamily: 'monospace' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

export const LoadingCanvas: StoryObj<typeof BTrace> = {
  args: { size: 72, label: 'Pulling most recent data…' },
};

export const ThinkingCanvas: StoryObj<typeof BTrace> = {
  args: { size: 72, label: 'Drafting two versions…' },
};
