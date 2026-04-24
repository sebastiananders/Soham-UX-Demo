import { Button, Tabs } from 'antd';
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import { weeklyData, revenueScenarios, ticketTiers } from '../../constants';
import { BTrace } from './BTrace';

interface InsightsCanvasProps {
  loading: boolean;
  draftState: 'idle' | 'thinking' | 'done';
  draftChosen: number | null;
  rightTab: 'report' | 'draft';
  onTabChange: (t: 'report' | 'draft') => void;
  onChooseDraft: (i: number) => void;
}

export function InsightsCanvas({ loading, draftState, draftChosen, rightTab, onTabChange, onChooseDraft }: InsightsCanvasProps) {
  if (loading) return <div className="flex-1 flex flex-col items-center justify-center"><BTrace size={72} label="Pulling most recent data…" /></div>;
  if (draftState === 'thinking') return <div className="flex-1 flex flex-col items-center justify-center"><BTrace size={72} label="Drafting two versions…" /></div>;

  const reportContent = (
    <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-12">
      <div>
        <h2 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase">Registration Insight Report</h2>
        <p className="text-xs text-neutral-400 mt-1">Tech Summit Europe 2026 · Generated April 17, 2026</p>
      </div>
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="text-[72px] font-semibold leading-none tracking-tighter text-neutral-900" style={{ fontVariantNumeric: 'tabular-nums' }}>612</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-base text-neutral-500 font-normal">registered</span>
            <span className="text-xs text-neutral-400">of 1,000 target</span>
          </div>
        </div>
        <div className="w-full h-[3px] bg-neutral-100 rounded-full">
          <div className="h-full rounded-full" style={{ width: '61.2%', backgroundColor: '#012030' }} />
        </div>
        <div className="flex items-center divide-x divide-neutral-100">
          <span className="pr-6 text-sm text-neutral-500"><strong className="font-semibold text-neutral-900">61%</strong> to goal</span>
          <span className="px-6 text-sm text-neutral-500"><strong className="font-semibold text-neutral-900">€183,600</strong> raised</span>
          <span className="pl-6 text-sm text-neutral-500"><strong className="font-semibold" style={{ color: '#13678A' }}>3 days</strong> of early-bird left</span>
        </div>
      </section>
      <hr className="border-t border-neutral-100" />
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Registration momentum</h3>
        <div className="relative mt-2">
          <div className="absolute z-10 pointer-events-none" style={{ left: 'calc(76% - 32px)', top: '-2px' }}>
            <div className="bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">+27% peak</div>
            <div className="w-px h-3 bg-neutral-300 mx-auto mt-0.5" />
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={weeklyData} margin={{ top: 20, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a3a3a3', fontFamily: 'inherit' }} dy={6} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a3a3a3', fontFamily: 'inherit' }} tickCount={4} width={36} />
              <ReferenceLine x="Mar 24" stroke="#e5e5e5" strokeWidth={1} strokeDasharray="3 3" />
              <Area type="monotone" dataKey="count" stroke="#012030" strokeWidth={1.5} fill="#45C4B0" fillOpacity={0.12} dot={false} activeDot={{ r: 3, fill: '#012030', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[11px] text-neutral-400">Velocity accelerating — Mar 24 was your strongest week · Current week (Apr 1) is partial</p>
      </section>
      <hr className="border-t border-neutral-100" />
      <section className="flex flex-col gap-5">
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Ticket tier fill rate</h3>
          <p className="text-[11px] text-neutral-400 mt-1">Registered vs. capacity per tier</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {ticketTiers.map(tier => {
            const pct = Math.round((tier.registered / tier.capacity) * 100);
            return (
              <div key={tier.tier} className="flex flex-col gap-3 relative">
                {tier.tier === 'Early-bird' && (
                  <span className="absolute -top-2 right-0 text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: '#e8f6f8', border: '1px solid #13678A', color: '#012030' }}>Closes in 3 days</span>
                )}
                <span className="text-xs font-semibold text-neutral-700">{tier.tier}</span>
                <div className="w-full h-[5px] bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: tier.color }} />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-semibold text-neutral-900 tabular-nums leading-none">{pct}%</span>
                  <span className="text-[10px] text-neutral-400">{tier.registered} / {tier.capacity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr className="border-t border-neutral-100" />
      <section className="flex flex-col gap-5">
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Revenue scenarios</h3>
          <p className="text-[11px] text-neutral-400 mt-1">Based on €300 average ticket price</p>
        </div>
        <div className="flex flex-col gap-7 pt-1">
          {revenueScenarios.map(s => {
            const pct = (s.value / 312000) * 100;
            return (
              <div key={s.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{s.label}</span>
                  <span className="text-sm font-semibold text-neutral-900 tabular-nums">€{(s.value / 1000).toFixed(0)}K</span>
                </div>
                <div className="relative w-full h-[1px] bg-neutral-100">
                  <div className="absolute top-0 left-0 h-[1px]" style={{ width: `${pct}%`, backgroundColor: s.accent === '#E5E5E5' ? '#d4d4d4' : s.accent }} />
                  <div className="absolute top-1/2 -translate-y-1/2 w-[8px] h-[8px] rounded-full border-2 border-white"
                    style={{ left: `calc(${Math.min(pct, 98)}% - 4px)`, backgroundColor: s.accent === '#E5E5E5' ? '#d4d4d4' : s.accent }} />
                </div>
              </div>
            );
          })}
          <div className="flex justify-between pt-1">
            <span className="text-[10px] text-neutral-300">€0</span>
            <span className="text-[10px] text-neutral-300">€312K full target</span>
          </div>
        </div>
      </section>
    </div>
  );

  const draftContent = (
    <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-8">
      <div>
        <h2 className="text-sm font-semibold text-neutral-900 tracking-wide uppercase">Exec Summary Drafts</h2>
        <p className="text-xs text-neutral-400 mt-1">Tech Summit Europe 2026 · Two tone variants — pick one</p>
      </div>
      <div className="flex flex-col gap-5">
        {[
          { id: 0, label: 'Formal / data-led', text: "Tech Summit Europe 2026 has reached 612 registrations (61% of the 1,000-seat target), generating €183,600 in revenue. Registration velocity peaked at 198 in the week of Mar 24. With 3 days remaining on early-bird pricing, the projected range is 720–780 total registrations and €216K–€240K in revenue." },
          { id: 1, label: 'Narrative / momentum', text: "We're 61% to goal and accelerating — last week was our strongest yet. With early-bird closing in 3 days, we have a real window to push. At current pace we're on track for €216K; if we activate the early-bird push, €240K is within reach. Now's the moment to move." },
        ].map(v => (
          <div key={v.id} onClick={() => onChooseDraft(draftChosen === v.id ? -1 : v.id)}
            className="rounded-[16px] border p-6 flex flex-col gap-4 cursor-pointer transition-all"
            style={{ borderColor: draftChosen === v.id ? '#45C4B0' : '#e5e5e5', backgroundColor: draftChosen === v.id ? '#f4fcfb' : '#fafafa' }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">{v.label}</span>
              {draftChosen === v.id && (
                <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: '#13678A' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Selected
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">{v.text}</p>
            <Button
              shape="round"
              size="small"
              type="primary"
              onClick={e => { e.stopPropagation(); onChooseDraft(v.id); }}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: draftChosen === v.id ? '#13678A' : '#012030',
                borderColor: draftChosen === v.id ? '#13678A' : '#012030',
              }}
            >
              {draftChosen === v.id ? 'Chosen' : 'Use this'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  if (draftState !== 'done') {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {reportContent}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <Tabs
        activeKey={rightTab}
        onChange={key => onTabChange(key as 'report' | 'draft')}
        destroyInactiveTabPane
        items={[
          { key: 'report', label: 'Insight Report', children: reportContent },
          { key: 'draft', label: 'Exec Summary', children: draftContent },
        ]}
        tabBarStyle={{ paddingLeft: 40, paddingRight: 40, marginBottom: 0, borderBottom: '1px solid #f5f5f5' }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        className="insights-tabs"
      />
    </div>
  );
}
