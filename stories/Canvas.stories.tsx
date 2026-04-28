import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { WebsiteCanvas } from '../app/components/WebsiteCanvas';
import { ContactsCanvas } from '../app/components/ContactsCanvas';
import { InsightsCanvas } from '../app/components/InsightsCanvas';

// ─── WebsiteCanvas ────────────────────────────────────────────────────────────

export default {
  title: 'Demo / Canvas',
} satisfies Meta;

export const Website: StoryObj = {
  render: () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <WebsiteCanvas />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

// ─── ContactsCanvas ───────────────────────────────────────────────────────────

export const Contacts: StoryObj = {
  render: () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ContactsCanvas />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

// ─── InsightsCanvas states ────────────────────────────────────────────────────

export const InsightsLoading: StoryObj = {
  name: 'Insights – Loading',
  render: () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <InsightsCanvas loading draftState="idle" draftChosen={null} rightTab="report" onTabChange={() => {}} onChooseDraft={() => {}} />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

export const InsightsReport: StoryObj = {
  name: 'Insights – Report',
  render: () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <InsightsCanvas loading={false} draftState="idle" draftChosen={null} rightTab="report" onTabChange={() => {}} onChooseDraft={() => {}} />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

export const InsightsThinking: StoryObj = {
  name: 'Insights – Thinking',
  render: () => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <InsightsCanvas loading={false} draftState="thinking" draftChosen={null} rightTab="draft" onTabChange={() => {}} onChooseDraft={() => {}} />
    </div>
  ),
  parameters: { layout: 'fullscreen' },
};

function InsightsDraftInteractive({ initialChosen }: { initialChosen: number | null }) {
  const [chosen, setChosen] = useState<number | null>(initialChosen);
  const [tab, setTab] = useState<'report' | 'draft'>('draft');
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <InsightsCanvas
        loading={false}
        draftState="done"
        draftChosen={chosen}
        rightTab={tab}
        onTabChange={setTab}
        onChooseDraft={i => setChosen(i === chosen ? null : i)}
      />
    </div>
  );
}

export const InsightsDraftsNoneSelected: StoryObj = {
  name: 'Insights – Drafts (none selected)',
  render: () => <InsightsDraftInteractive initialChosen={null} />,
  parameters: { layout: 'fullscreen' },
};

export const InsightsDraftsFirstSelected: StoryObj = {
  name: 'Insights – Drafts (first selected)',
  render: () => <InsightsDraftInteractive initialChosen={0} />,
  parameters: { layout: 'fullscreen' },
};
