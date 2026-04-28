import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';

// ─── Shared data ──────────────────────────────────────────────────────────────

const ACCENTS = {
  website:  '#FDE047',
  contacts: '#C4B5FD',
  insights: '#34D399',
} as const;

type Domain = keyof typeof ACCENTS;

const PROGRESS_METRICS = [
  { left: '612 of 1,000 seats',          pct: 61, right: '61%',  sub: '3 days left on early-bird', color: 'rgba(0,0,0,0.9)' },
  { left: '€183,600 of €300K revenue',   pct: 61, right: '61%',  sub: 'on current pace',           color: 'rgba(0,0,0,0.9)' },
  { left: '8 of 12 speakers confirmed',  pct: 67, right: '67%',  sub: '4 still pending',           color: '#22c55e'          },
  { left: '5 of 8 sponsors signed',      pct: 63, right: '63%',  sub: '2 weeks to deadline',       color: 'rgba(0,0,0,0.9)' },
  { left: '127 of 400 early-bird seats', pct: 32, right: '32%',  sub: 'still available',           color: '#ef4444'          },
];

const AGENT_CARDS = [
  {
    id: 'insights' as Domain,
    title: 'See event insights',
    stat: '61%',
    statLabel: 'of seat target',
    desc: 'At 612 registrations with velocity climbing week over week. Projecting 720–780 total before early-bird ends.',
    badge: 'Insights & reporting',
    cta: 'Share insight',
  },
  {
    id: 'contacts' as Domain,
    title: 'Win warm contacts',
    stat: '340',
    statLabel: 'warm contacts',
    desc: "Contacts opened your invite but haven't registered. Early-bird closes in 3 days — email is ready to send.",
    badge: 'Contact & tickets',
    cta: 'Draft mail',
  },
  {
    id: 'website' as Domain,
    title: 'Add speaker bio',
    stat: '1',
    statLabel: 'bio ready',
    desc: "Dr. Sarah Chen's profile is missing from the speakers page. Bio is drafted and reviewed — ready to publish.",
    badge: 'Event website',
    cta: 'Publish bio',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AgentCard({ card }: { card: typeof AGENT_CARDS[0] }) {
  const accent = ACCENTS[card.id];
  return (
    <div
      className="rounded-[0.85175rem] flex flex-col w-[290px] shrink-0 overflow-hidden"
      style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
    >
      <div className="p-5 flex flex-col">
        <h3 className="text-[19px] font-bold leading-tight" style={{ color: '#171717' }}>{card.title}</h3>
        <div className="flex items-center mt-2">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase leading-none px-2 py-1"
            style={{ backgroundColor: `${accent}80`, color: '#171717', borderRadius: 2 }}
          >
            {card.badge}
          </span>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed" style={{ color: '#6B7280' }}>{card.desc}</p>
        <div className="border-t mt-3" style={{ borderColor: '#E5E7EB' }} />
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-[10px] leading-none mb-1" style={{ color: 'rgba(0,0,0,0.5)' }}>{card.statLabel}</p>
            <p className="text-[32px] font-bold leading-none tracking-tight" style={{ color: '#171717' }}>{card.stat}</p>
          </div>
          <span
            className="text-[12px] font-normal px-4 py-2"
            style={{ color: '#171717', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 4 }}
          >
            {card.cta}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProgressMetric({ metric }: { metric: typeof PROGRESS_METRICS[0] }) {
  return (
    <div className="flex items-center gap-4 bg-neutral-50 rounded-2xl px-8 py-5 w-full max-w-[640px]">
      <span className="text-sm text-neutral-500 whitespace-nowrap shrink-0">{metric.left}</span>
      <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${metric.pct}%`, backgroundColor: metric.color }}
        />
      </div>
      <span className="text-sm whitespace-nowrap shrink-0">
        <strong className="font-semibold text-neutral-700">{metric.right}</strong>
        <span className="text-neutral-500"> · {metric.sub}</span>
      </span>
    </div>
  );
}

function ProgressCarousel() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const shuffle = () => {
    setAnimating(true);
    setTimeout(() => {
      setIdx(i => (i + 1) % PROGRESS_METRICS.length);
      setAnimating(false);
    }, 200);
  };

  const metric = PROGRESS_METRICS[idx];
  return (
    <div className="flex items-center gap-4 bg-neutral-50 rounded-2xl px-8 py-5 w-full max-w-[640px]">
      <span className="text-sm text-neutral-500 whitespace-nowrap shrink-0 transition-opacity duration-200" style={{ opacity: animating ? 0 : 1 }}>
        {metric.left}
      </span>
      <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: animating ? '0%' : `${metric.pct}%`, backgroundColor: metric.color }}
        />
      </div>
      <span className="text-sm whitespace-nowrap shrink-0 transition-opacity duration-200" style={{ opacity: animating ? 0 : 1 }}>
        <strong className="font-semibold text-neutral-700">{metric.right}</strong>
        <span className="text-neutral-500"> · {metric.sub}</span>
      </span>
      <button onClick={shuffle} className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-blue-500 hover:text-blue-600 hover:bg-neutral-100 transition-colors">
        <Shuffle className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Story definitions ────────────────────────────────────────────────────────

export default { title: 'Components / Home' } satisfies Meta;

// Agent Cards
export const AgentCardInsights: StoryObj = {
  name: 'Agent Card / Insights',
  render: () => <div className="p-8 bg-white"><AgentCard card={AGENT_CARDS[0]} /></div>,
};

export const AgentCardContacts: StoryObj = {
  name: 'Agent Card / Contacts',
  render: () => <div className="p-8 bg-white"><AgentCard card={AGENT_CARDS[1]} /></div>,
};

export const AgentCardWebsite: StoryObj = {
  name: 'Agent Card / Website',
  render: () => <div className="p-8 bg-white"><AgentCard card={AGENT_CARDS[2]} /></div>,
};

export const AgentCardAllThree: StoryObj = {
  name: 'Agent Card / All Three',
  render: () => (
    <div className="p-8 bg-white flex gap-3">
      {AGENT_CARDS.map(card => <AgentCard key={card.id} card={card} />)}
    </div>
  ),
};

// Progress Metrics
export const ProgressSeats: StoryObj = {
  name: 'Progress Metric / Seats',
  render: () => <div className="p-8 bg-white"><ProgressMetric metric={PROGRESS_METRICS[0]} /></div>,
};

export const ProgressRevenue: StoryObj = {
  name: 'Progress Metric / Revenue',
  render: () => <div className="p-8 bg-white"><ProgressMetric metric={PROGRESS_METRICS[1]} /></div>,
};

export const ProgressSpeakers: StoryObj = {
  name: 'Progress Metric / Speakers',
  render: () => <div className="p-8 bg-white"><ProgressMetric metric={PROGRESS_METRICS[2]} /></div>,
};

export const ProgressSponsors: StoryObj = {
  name: 'Progress Metric / Sponsors',
  render: () => <div className="p-8 bg-white"><ProgressMetric metric={PROGRESS_METRICS[3]} /></div>,
};

export const ProgressEarlyBird: StoryObj = {
  name: 'Progress Metric / Early-Bird',
  render: () => <div className="p-8 bg-white"><ProgressMetric metric={PROGRESS_METRICS[4]} /></div>,
};

export const ProgressAll: StoryObj = {
  name: 'Progress Metric / All (carousel)',
  render: () => (
    <div className="p-8 bg-white flex flex-col gap-3">
      {PROGRESS_METRICS.map((m, i) => <ProgressMetric key={i} metric={m} />)}
    </div>
  ),
};

export const ProgressInteractive: StoryObj = {
  name: 'Progress Metric / Interactive Carousel',
  render: () => <div className="p-8 bg-white"><ProgressCarousel /></div>,
};
