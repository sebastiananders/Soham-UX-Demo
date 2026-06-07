import { useState } from 'react';
import { X, MessageSquare, Settings2 } from 'lucide-react';
import eventHero from '../assets/event_hero.png';
import updatedHero from '../assets/updated_hero_section.png';

interface Zone {
  id: string;
  label: string;
  top: string; left: string; width: string; height: string;
  barBelow?: boolean;
  props: { label: string; type: 'text' | 'color' | 'range'; value: string }[];
}

const ZONES: Zone[] = [
  {
    id: 'headline',
    label: 'Headline',
    top: '5%', left: '3%', width: '38%', height: '44%',
    barBelow: true,
    props: [
      { label: 'Event name', type: 'text', value: 'NEXUS 2026' },
      { label: 'Date line', type: 'text', value: 'September 18–20, 2026' },
      { label: 'Tagline', type: 'text', value: 'Where the Future Gets Built' },
    ],
  },
  {
    id: 'cta',
    label: 'CTA Button',
    top: '53%', left: '3%', width: '36%', height: '12%',
    barBelow: true,
    props: [
      { label: 'Button label', type: 'text', value: 'Reserve Your Seat' },
      { label: 'Button color', type: 'color', value: '#1a1a1a' },
      { label: 'Secondary link', type: 'text', value: 'VIEW SCHEDULE →' },
    ],
  },
  {
    id: 'countdown',
    label: 'Countdown Timer',
    top: '10%', left: '47%', width: '49%', height: '35%',
    barBelow: true,
    props: [
      { label: 'Target date', type: 'text', value: '2026-09-18' },
      { label: 'Text color', type: 'color', value: '#ffffff' },
      { label: 'Font size', type: 'range', value: '72' },
    ],
  },
  {
    id: 'venue',
    label: 'Venue',
    top: '56%', left: '47%', width: '49%', height: '30%',
    barBelow: false,
    props: [
      { label: 'Venue name', type: 'text', value: 'The Grand Hall, Geneva' },
      { label: 'Address line 1', type: 'text', value: 'Palexpo, Route François-Peyrot 30' },
      { label: 'Address line 2', type: 'text', value: 'Geneva, Switzerland' },
    ],
  },
];

interface HeroCanvasProps {
  onDescribeChange?: (zone: string) => void;
  onApply?: (zoneId: string, values: string[]) => void;
  showUpdated?: boolean;
}

export function HeroCanvas({ onDescribeChange, onApply, showUpdated = false }: HeroCanvasProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [propValues, setPropValues] = useState<Record<string, string[]>>(
    Object.fromEntries(ZONES.map(z => [z.id, z.props.map(p => p.value)]))
  );

  const selectedZone = ZONES.find(z => z.id === selected);

  const handleZoneClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(id);
    setShowPanel(false);
  };

  const handleDescribe = () => {
    if (!selectedZone) return;
    onDescribeChange?.(selectedZone.label);
    setSelected(null);
    setShowPanel(false);
  };

  const handleEditProps = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPanel(true);
  };

  const dismiss = () => { setSelected(null); setShowPanel(false); };

  return (
    <div className="flex flex-col h-full overflow-hidden" onClick={dismiss}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-neutral-200 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-neutral-100 rounded-md px-3 py-1" style={{ minWidth: 240 }}>
            <svg className="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/></svg>
            <span className="text-xs text-neutral-500">marketingqualifiedleads2026.com</span>
          </div>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 overflow-auto relative">
        {/* Hero image */}
        <div className="relative">
          <img src={showUpdated ? updatedHero : eventHero} alt="Event hero section" style={{ width: '100%', display: 'block', transition: 'opacity 0.3s ease' }} />

          {/* Zone overlays */}
          {ZONES.map(zone => {
            const isSelected = selected === zone.id;
            return (
              <div
                key={zone.id}
                onClick={e => handleZoneClick(zone.id, e)}
                style={{
                  position: 'absolute',
                  top: zone.top, left: zone.left,
                  width: zone.width, height: zone.height,
                  border: isSelected ? '2px solid #2563EB' : '2px solid transparent',
                  borderRadius: 4,
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  backgroundColor: isSelected ? 'rgba(37,99,235,0.06)' : 'transparent',
                  transition: 'border-color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={e => {
                  if (!isSelected) (e.currentTarget as HTMLDivElement).style.border = '2px solid rgba(37,99,235,0.4)';
                }}
                onMouseLeave={e => {
                  if (!isSelected) (e.currentTarget as HTMLDivElement).style.border = '2px solid transparent';
                }}
              >
                {/* Zone label tab */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute', top: -24, left: -2,
                      backgroundColor: '#2563EB', color: '#fff',
                      fontSize: 11, fontWeight: 600, padding: '2px 8px',
                      borderRadius: '3px 3px 0 0', whiteSpace: 'nowrap',
                    }}
                  >
                    {zone.label}
                  </div>
                )}

                {/* Button bar */}
                {isSelected && !showPanel && (
                  <div
                    onClick={e => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      ...(zone.barBelow
                        ? { top: 'calc(100% + 8px)', left: 0 }
                        : { bottom: 'calc(100% + 8px)', left: 0 }),
                      display: 'flex', gap: 6, zIndex: 20,
                    }}
                  >
                    <button
                      onClick={handleDescribe}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        backgroundColor: '#1B1A17', color: '#fff',
                        border: 'none', borderRadius: 8,
                        padding: '7px 12px', fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                      }}
                    >
                      <MessageSquare size={13} />
                      Describe changes
                    </button>
                    <button
                      onClick={handleEditProps}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        backgroundColor: '#fff', color: '#1B1A17',
                        border: '1px solid #E8E8E8', borderRadius: 8,
                        padding: '7px 12px', fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                      }}
                    >
                      <Settings2 size={13} />
                      Edit properties
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Property panel — slides in over the canvas */}
        {showPanel && selectedZone && (
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: 260,
              backgroundColor: '#fff',
              borderLeft: '1px solid #E8E8E8',
              boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
              display: 'flex', flexDirection: 'column',
              zIndex: 30,
            }}
          >
            {/* Panel header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1B1A17' }}>{selectedZone.label}</span>
              <button onClick={dismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B9693', padding: 0, lineHeight: 1 }}>
                <X size={15} />
              </button>
            </div>

            {/* Fields */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {selectedZone.props.map((prop, pi) => (
                <div key={pi} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 500, color: '#9B9693', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {prop.label}
                  </label>
                  {prop.type === 'text' && (
                    <input
                      value={propValues[selectedZone.id][pi]}
                      onChange={e => setPropValues(prev => {
                        const vals = [...prev[selectedZone.id]];
                        vals[pi] = e.target.value;
                        return { ...prev, [selectedZone.id]: vals };
                      })}
                      style={{
                        border: '1px solid #E8E8E8', borderRadius: 6,
                        padding: '7px 10px', fontSize: 13, color: '#1B1A17',
                        outline: 'none', width: '100%', boxSizing: 'border-box',
                      }}
                    />
                  )}
                  {prop.type === 'color' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input
                        type="color"
                        value={propValues[selectedZone.id][pi]}
                        onChange={e => setPropValues(prev => {
                          const vals = [...prev[selectedZone.id]];
                          vals[pi] = e.target.value;
                          return { ...prev, [selectedZone.id]: vals };
                        })}
                        style={{ width: 36, height: 36, border: '1px solid #E8E8E8', borderRadius: 6, cursor: 'pointer', padding: 2 }}
                      />
                      <span style={{ fontSize: 12, color: '#6B6762', fontFamily: 'monospace' }}>
                        {propValues[selectedZone.id][pi]}
                      </span>
                    </div>
                  )}
                  {prop.type === 'range' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <input
                        type="range" min={24} max={120}
                        value={propValues[selectedZone.id][pi]}
                        onChange={e => setPropValues(prev => {
                          const vals = [...prev[selectedZone.id]];
                          vals[pi] = e.target.value;
                          return { ...prev, [selectedZone.id]: vals };
                        })}
                        style={{ width: '100%', accentColor: '#2563EB' }}
                      />
                      <span style={{ fontSize: 12, color: '#6B6762' }}>{propValues[selectedZone.id][pi]}px</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Apply button */}
            <div style={{ padding: 16, borderTop: '1px solid #F0F0F0' }}>
              <button
                onClick={() => { onApply?.(selectedZone.id, propValues[selectedZone.id]); dismiss(); }}
                style={{
                  width: '100%', backgroundColor: '#1B1A17', color: '#fff',
                  border: 'none', borderRadius: 8, padding: '10px 0',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}
              >
                Apply changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
