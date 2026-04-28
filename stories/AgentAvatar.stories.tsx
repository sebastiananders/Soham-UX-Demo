import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AgentAvatar } from '../app/components/AgentAvatar';

const meta: Meta<typeof AgentAvatar> = {
  title: 'Atoms / AgentAvatar',
  component: AgentAvatar,
  parameters: { layout: 'centered' },
  argTypes: {
    agentId: { control: 'select', options: ['website', 'contacts', 'insights'] },
    size: { control: { type: 'range', min: 12, max: 80, step: 2 } },
  },
};
export default meta;

export const Default: StoryObj<typeof AgentAvatar> = {
  args: { agentId: 'insights', size: 32 },
};

export const AllAgents: StoryObj<typeof AgentAvatar> = {
  render: () => (
    <div style={{ padding: 32, background: '#fff', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {(['website', 'contacts', 'insights'] as const).map(agentId => (
        <div key={agentId} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ width: 80, fontSize: 12, color: '#a39e98', fontFamily: 'monospace' }}>{agentId}</span>
          {[20, 32, 48].map(size => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <AgentAvatar agentId={agentId} size={size} />
              <span style={{ fontSize: 10, color: '#d4d4d4' }}>{size}px</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};
