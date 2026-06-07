import React, { useState } from 'react';
import { Bell, ChevronLeft, ChevronRight, Search, PieChart, Globe, Ticket, List, LayoutGrid, CalendarDays, Shield } from 'lucide-react';
import { Badge, Avatar } from 'antd';
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay, format, addMonths, subMonths, isSameDay, isWithinInterval, startOfDay } from 'date-fns';
import imgLogo from '../../imports/DeviceMacBookPro14/c4121c79ef3207dcf24c7435552bb7378ad17369.png';
import imgProfile from '../assets/aria.jpg';
import type { AgentId } from '../../types';
import { AGENTS } from '../../constants';
import evtLogo1 from '../assets/eventlogos/Screenshot 2026-05-04 at 14.39.23.png';
import evtLogo2 from '../assets/eventlogos/Screenshot 2026-05-04 at 14.39.32.png';
import evtLogo3 from '../assets/eventlogos/Screenshot 2026-05-04 at 14.39.37.png';
import evtLogo4 from '../assets/eventlogos/Screenshot 2026-05-04 at 14.39.41.png';
import evtLogo5 from '../assets/eventlogos/Screenshot 2026-05-04 at 14.39.55.png';

const EVENTS = [
  { id: 'amaf-2026',       name: 'Asset Management Asia Forum',     format: 'In-person', date: 'May 6, 2026',      location: 'Singapore', criticalCount: 1, warningCount: 0, daysLabel: '3 days away',  urgent: true,  isPast: false, pct: 45,  pctLeft: '450 of 1,000 seats', pctRight: '45%',  pctSub: '3 days left on early-bird', image: evtLogo1, startDate: new Date(2026, 4, 6),  endDate: new Date(2026, 4, 6)  },
  { id: 'cfo-2026',        name: 'CFO Leadership Summit 2026',      format: 'Hybrid',    date: 'Jun 8, 2026',      location: 'New York',  criticalCount: 0, warningCount: 6, daysLabel: '36 days away', urgent: false, isPast: false, pct: 61,  pctLeft: '612 of 1,000 seats', pctRight: '61%',  pctSub: '3 days left on early-bird', image: evtLogo2, startDate: new Date(2026, 5, 8),  endDate: new Date(2026, 5, 8)  },
  { id: 'iconoclast-2026', name: 'Iconoclast Business Summit 2026', format: 'In-person', date: 'Jun 3, 2026',      location: 'New York',  criticalCount: 0, warningCount: 0, daysLabel: '31 days away', urgent: false, isPast: false, pct: 78,  pctLeft: '780 of 1,000 seats', pctRight: '78%',  pctSub: 'on current pace',           image: evtLogo3, startDate: new Date(2026, 5, 3),  endDate: new Date(2026, 5, 3)  },
  { id: 'contact-week',    name: 'Contact Week Las Vegas 2026',     format: 'In-person', date: 'Jun 22–25, 2026',  location: 'Las Vegas', criticalCount: 0, warningCount: 0, daysLabel: '50 days away', urgent: false, isPast: false, pct: 32,  pctLeft: '320 of 1,000 seats', pctRight: '32%',  pctSub: 'still available',           image: evtLogo4, startDate: new Date(2026, 5, 22), endDate: new Date(2026, 5, 25) },
  { id: 'innovate-expo',   name: 'Innovate Expo Spring',            format: 'Virtual',   date: 'Mar 9',            location: '',          criticalCount: 0, warningCount: 0, daysLabel: '12 days ago',  urgent: false, isPast: true,  pct: 100, pctLeft: '1,247 attended',     pctRight: '100%', pctSub: 'event complete',            image: evtLogo5, startDate: new Date(2026, 2, 9),  endDate: new Date(2026, 2, 9)  },
];

const ACTIVITY_ITEMS: { id: AgentId; label: string; meta: string; awaiting: boolean }[] = [
  { id: 'insights', label: 'Want me to share this report with the team, or draft a summary for the exec update?', meta: 'Insights & reporting · awaiting response · 2h ago', awaiting: true },
  { id: 'website',  label: 'Should I add the speaker section to the live page, or keep it as a draft?',           meta: 'Event website · awaiting response · 1d ago',        awaiting: true },
  { id: 'contacts', label: 'Win warm contacts',                                                                    meta: 'Contact & tickets · last active 3d ago',             awaiting: false },
];

const ACTIVITY_ICON: Record<AgentId, React.ComponentType<{ className?: string }>> = {
  insights: PieChart,
  website: Globe,
  contacts: Ticket,
  analyzer: Shield,
};

type EventRow = typeof EVENTS[0];

function EventCard({ event, onClick }: { event: EventRow; onClick: () => void }) {
  const hasCritical = event.criticalCount > 0;
  const hasWarning  = event.warningCount > 0;
  const isClean     = !hasCritical && !hasWarning && !event.isPast;
  const meta        = [event.format, event.date, event.location].filter(Boolean).join(' · ');
  const barColor    = hasCritical ? '#F25A38' : hasWarning ? '#F2B138' : event.isPast ? '#D1D5DB' : '#6BA7BF';
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-[0.85175rem] flex flex-col w-full cursor-pointer px-6 pt-7 pb-7 overflow-hidden"
      style={{
        backgroundColor: hovered ? 'rgba(0,117,222,0.025)' : '#ffffff',
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.11)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'background-color 0.15s ease, box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Top row */}
      <div className="flex items-center gap-4">
        {/* Event image */}
        <img
          src={event.image}
          alt={event.name}
          className="w-12 h-12 rounded-lg object-cover shrink-0"
        />

        {/* Event name + meta */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-[15px] font-bold leading-tight truncate"
            style={{ color: event.isPast ? '#9CA3AF' : '#171717' }}
          >
            {event.name}
          </h3>
          <p className="text-[12px] mt-0.5" style={{ color: '#9CA3AF' }}>{meta}</p>
        </div>

        {/* Status badge — right-aligned */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          {hasCritical && (
            <span
              className="text-[10px] font-semibold tracking-widest uppercase leading-none px-2 py-1"
              style={{ backgroundColor: '#F25A3840', color: '#171717', borderRadius: '4px' }}
            >
              {event.criticalCount} Critical
            </span>
          )}
          {hasWarning && (
            <span
              className="text-[10px] font-semibold tracking-widest uppercase leading-none px-2 py-1"
              style={{ backgroundColor: '#F2B13840', color: '#171717', borderRadius: '4px' }}
            >
              {event.warningCount} Warnings
            </span>
          )}
          {isClean && (
            <span
              className="text-[10px] font-semibold tracking-widest uppercase leading-none px-2 py-1"
              style={{ backgroundColor: '#6BA7BF40', color: '#171717', borderRadius: '4px' }}
            >
              Clean
            </span>
          )}
        </div>

        <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-4 mt-4 pl-16">
        <span className="text-sm text-neutral-500 whitespace-nowrap shrink-0">{event.pctLeft}</span>
        <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${event.pct}%`, backgroundColor: barColor }}
          />
        </div>
        <span className="text-sm whitespace-nowrap shrink-0">
          <strong className="font-semibold text-neutral-700">{event.pctRight}</strong>
          <span className="text-neutral-500"> · {event.pctSub}</span>
        </span>
      </div>
    </div>
  );
}

function TileCard({ event, onClick }: { event: EventRow; onClick: () => void }) {
  const hasCritical = event.criticalCount > 0;
  const hasWarning  = event.warningCount > 0;
  const [hovered, setHovered] = useState(false);

  // Badge — mirrors the URGENCY map from App.tsx
  const badge = hasCritical
    ? { label: 'Critical',  color: '#F25A38' }
    : hasWarning
    ? { label: 'Warnings',  color: '#F2B138' }
    : event.isPast
    ? { label: 'Past',      color: '#D1D5DB' }
    : { label: 'Clean',     color: '#6BA7BF' };

  const stat      = hasCritical ? String(event.criticalCount) : hasWarning ? String(event.warningCount) : '0';
  const statLabel = hasCritical ? 'critical issues' : hasWarning ? 'warnings' : 'issues found';
  const desc      = [event.format, event.date, event.location].filter(Boolean).join(' · ');

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-[0.85175rem] flex flex-col cursor-pointer overflow-hidden"
      style={{
        backgroundColor: hovered ? 'rgba(0,117,222,0.025)' : '#ffffff',
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,0.11)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'background-color 0.15s ease, box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      <div className="p-5 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[19px] font-bold leading-tight" style={{ color: '#171717' }}>
            {event.name}
          </h3>
          <img
            src={event.image}
            alt={event.name}
            className="w-8 h-8 rounded-md object-cover shrink-0 mt-0.5"
          />
        </div>
        <div className="flex items-center mt-2">
          <span
            className="text-[10px] font-semibold tracking-widest uppercase leading-none px-2 py-1"
            style={{ backgroundColor: `${badge.color}80`, color: '#171717', borderRadius: '2px' }}
          >
            {badge.label}
          </span>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed line-clamp-3" style={{ color: '#6B7280' }}>{desc}</p>
        <div className="border-t mt-3" style={{ borderColor: '#E5E7EB' }} />
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-[10px] leading-none mb-1" style={{ color: 'rgba(0,0,0,0.5)' }}>{statLabel}</p>
            <p className="text-[32px] font-bold leading-none tracking-tight" style={{ color: '#171717' }}>{stat}</p>
          </div>
          <span
            className="text-[12px] font-normal px-4 py-2"
            style={{ color: '#171717', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '4px' }}
          >
            {event.daysLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function eventColor(event: EventRow) {
  if (event.criticalCount > 0) return '#F25A38';
  if (event.warningCount  > 0) return '#F2B138';
  if (event.isPast)            return '#D1D5DB';
  return '#6BA7BF';
}

function CalendarView({ events }: { events: EventRow[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));

  const monthStart  = startOfMonth(currentMonth);
  const days        = eachDayOfInterval({ start: monthStart, end: endOfMonth(currentMonth) });
  const leadingDays = (getDay(monthStart) + 6) % 7; // Mon-first offset
  const today       = new Date();

  function eventsForDay(day: Date) {
    return events.filter(e =>
      isWithinInterval(startOfDay(day), { start: startOfDay(e.startDate), end: startOfDay(e.endDate) })
    );
  }

  return (
    <div
      className="rounded-[0.85175rem] p-6"
      style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setCurrentMonth(m => subMonths(m, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-400" />
        </button>
        <span className="text-[15px] font-semibold text-neutral-900">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => setCurrentMonth(m => addMonths(m, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map(d => (
          <div key={d} className="text-center text-[11px] font-medium text-neutral-400 pb-2">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {Array.from({ length: leadingDays }).map((_, i) => (
          <div key={`pad-${i}`} className="min-h-[80px]" />
        ))}

        {days.map(day => {
          const dayEvents = eventsForDay(day);
          const isToday   = isSameDay(day, today);

          return (
            <div key={day.toISOString()} className="min-h-[80px] p-1 border-t border-neutral-100">
              {/* Date number */}
              <div className="flex justify-center mb-1">
                <span
                  className="text-[12px] font-medium w-6 h-6 flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: isToday ? '#171717' : 'transparent',
                    color: isToday ? '#ffffff' : '#6B7280',
                  }}
                >
                  {format(day, 'd')}
                </span>
              </div>

              {/* Event chips */}
              <div className="flex flex-col gap-0.5">
                {dayEvents.map(evt => {
                  const isStart = isSameDay(day, evt.startDate);
                  const color   = eventColor(evt);
                  return (
                    <div
                      key={evt.id}
                      className="text-[10px] font-medium leading-none px-1.5 py-[3px] truncate"
                      style={{
                        backgroundColor: `${color}55`,
                        color: '#171717',
                        borderRadius: '3px',
                        borderLeft: `2px solid ${color}`,
                      }}
                    >
                      {isStart ? evt.name : ' '}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface EventsListProps {
  onSelectEvent: (eventId: string, eventName: string) => void;
}

export function EventsList({ onSelectEvent }: EventsListProps) {
  const [showActivity, setShowActivity] = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [viewMode, setViewMode]         = useState<'list' | 'tile' | 'calendar'>('list');

  const awaitingCount  = ACTIVITY_ITEMS.filter(i => i.awaiting).length;
  const filteredEvents = searchQuery
    ? EVENTS.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : EVENTS;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-neutral-900">

      {/* ── Header — same style as UnifiedChatView header ── */}
      <header
        className="flex items-center justify-between px-6 py-5 shrink-0 sticky top-0 z-30"
        style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}
      >
        <img src={imgLogo} alt="Soham" className="w-[45px] h-[36px] object-cover pointer-events-none" />

        <div className="flex items-center gap-3">
          {/* Activity bell — exact replica of sidebar bell */}
          <div className="relative">
            <button
              onClick={() => setShowActivity(v => !v)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm text-neutral-700 hover:bg-neutral-50 transition-colors ${showActivity ? 'bg-neutral-50' : ''}`}
            >
              <div className="relative shrink-0">
                <Badge
                  count={awaitingCount}
                  style={{ backgroundColor: '#dbeafe', color: '#2563eb', boxShadow: '0 0 0 2px white', fontSize: 9, fontWeight: 600 }}
                >
                  <Bell className="w-4 h-4 text-neutral-500" />
                </Badge>
              </div>
            </button>

            {showActivity && (
              <>
                <div className="fixed inset-0" onClick={() => setShowActivity(false)} />
                <div className="absolute top-full right-0 mt-2 w-[380px] bg-white rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] border border-neutral-100 z-50 overflow-hidden">
                  <div className="px-5 pt-5 pb-3">
                    <p className="text-xs font-medium text-neutral-400">Activity</p>
                  </div>
                  <div className="flex flex-col gap-2 px-3 pb-3">
                    {ACTIVITY_ITEMS.map(item => {
                      const Icon = ACTIVITY_ICON[item.id];
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 px-4 py-3.5 bg-neutral-50 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors"
                        >
                          <div className="relative shrink-0">
                            <div
                              className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                              style={{ backgroundColor: AGENTS[item.id].cardBg }}
                            >
                              <Icon className="w-4 h-4 text-neutral-900" />
                            </div>
                            {item.awaiting && (
                              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            )}
                          </div>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-medium text-neutral-900 truncate">{item.label}</span>
                            <span className="text-xs text-neutral-400 mt-0.5">{item.meta}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-neutral-300 shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <Avatar src={imgProfile} size={40} style={{ flexShrink: 0, cursor: 'pointer' }} />
        </div>
      </header>

      {/* ── Page content — same max-width as home screen ── */}
      <div className="flex-1 w-full max-w-[820px] mx-auto flex flex-col px-4 pt-14 pb-12">

        {/* Page heading — centered, same serif + size as "Aloha, Jen" */}
        <div className="flex flex-col items-center gap-1 mb-10 text-center">
          <h1
            className="text-[42px] font-normal text-neutral-900 tracking-tight"
            style={{ fontFamily: 'GalaxieCopernicus, serif' }}
          >
            Aloha, Jen
          </h1>
          <p className="text-sm text-neutral-400">
            {EVENTS.filter(e => !e.isPast).length} events under management
          </p>
        </div>

        {/* Search + view toggle row */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex items-center gap-3 flex-1"
            style={{
              backgroundColor: '#ffffff',
              boxShadow: '0px 2px 8px 0px rgba(23,23,23,0.1)',
              borderRadius: '0.85175rem',
              paddingLeft: '20px',
              paddingRight: '20px',
              height: '52px',
            }}
          >
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search events…"
              className="flex-1 bg-transparent border-none outline-none text-[16px] text-neutral-900 placeholder:text-neutral-400"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-neutral-50 rounded-[10px] p-1 shrink-0" style={{ border: '1px solid #E5E7EB' }}>
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center justify-center w-9 h-9 rounded-[7px] transition-all duration-150"
              style={viewMode === 'list' ? { backgroundColor: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : {}}
            >
              <List className="w-4 h-4" style={{ color: viewMode === 'list' ? '#171717' : '#9CA3AF' }} />
            </button>
            <button
              onClick={() => setViewMode('tile')}
              className="flex items-center justify-center w-9 h-9 rounded-[7px] transition-all duration-150"
              style={viewMode === 'tile' ? { backgroundColor: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : {}}
            >
              <LayoutGrid className="w-4 h-4" style={{ color: viewMode === 'tile' ? '#171717' : '#9CA3AF' }} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className="flex items-center justify-center w-9 h-9 rounded-[7px] transition-all duration-150"
              style={viewMode === 'calendar' ? { backgroundColor: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : {}}
            >
              <CalendarDays className="w-4 h-4" style={{ color: viewMode === 'calendar' ? '#171717' : '#9CA3AF' }} />
            </button>
          </div>
        </div>

        {/* Events — list, tile, or calendar */}
        {viewMode === 'list' && (
          <div className="flex flex-col gap-3">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} onClick={() => onSelectEvent(event.id, event.name)} />
            ))}
          </div>
        )}
        {viewMode === 'tile' && (
          <div className="grid grid-cols-3 gap-3">
            {filteredEvents.map(event => (
              <TileCard key={event.id} event={event} onClick={() => onSelectEvent(event.id, event.name)} />
            ))}
          </div>
        )}
        {viewMode === 'calendar' && (
          <CalendarView events={filteredEvents} />
        )}
      </div>
    </div>
  );
}
