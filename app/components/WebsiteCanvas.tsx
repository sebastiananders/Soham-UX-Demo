import { Tag } from 'antd';

export function WebsiteCanvas() {
  return (
    <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">
      <div className="shrink-0 flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 bg-white">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => <div key={i} className="w-3 h-3 rounded-full bg-neutral-200" />)}
        </div>
        <div className="flex-1 bg-neutral-100 rounded-md px-3 py-1.5 text-xs text-neutral-500 font-mono">
          techsummiteurope.com/speakers
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="bg-neutral-900 px-10 py-4 flex items-center justify-between">
          <span className="text-white font-semibold text-sm tracking-wide">TECH SUMMIT EUROPE 2026</span>
          <div className="flex gap-6">
            {['Programme', 'Speakers', 'Venue', 'Register'].map(item => (
              <span key={item} className={`text-xs font-medium cursor-pointer ${item === 'Speakers' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`}>{item}</span>
            ))}
          </div>
        </div>
        <div className="px-10 py-10">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Speakers</h2>
          <div className="w-10 h-0.5 bg-[#FFF000] mb-8" />
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white rounded-[12px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
              <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4" />
              <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Marcus Becker</h3>
              <p className="text-xs text-neutral-500 mt-0.5 mb-3">CTO, FinEdge Group</p>
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">Marcus leads technology strategy at FinEdge, driving digital transformation across 14 European markets.</p>
            </div>
            <div className="bg-white rounded-[12px] p-5 border border-neutral-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
              <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4" />
              <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Dr. Elena Vasquez</h3>
              <p className="text-xs text-neutral-500 mt-0.5 mb-3">Founder, Neura Systems</p>
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">Pioneering human-computer interaction research, Elena founded Neura Systems after a decade at CERN's data team.</p>
            </div>
            <div className="relative bg-white rounded-[12px] p-5 border-2 border-[#FFF000] shadow-[0px_2px_12px_0px_rgba(255,240,0,0.2)]">
              <div className="absolute -top-2.5 left-4">
                <Tag style={{ backgroundColor: '#FFF000', color: '#171717', borderColor: '#FFF000', fontSize: 10, fontWeight: 600, lineHeight: '18px' }}>
                  Pending approval
                </Tag>
              </div>
              <div className="w-16 h-16 rounded-full bg-neutral-100 mb-4 flex items-center justify-center">
                <span className="text-neutral-400 text-[10px] font-medium">Photo</span>
              </div>
              <h3 className="font-semibold text-neutral-900 text-sm leading-tight">Dr. Sarah Chen</h3>
              <p className="text-xs text-neutral-500 mt-0.5 mb-3">Head of AI Research, TechCore Labs</p>
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-4">Dr. Sarah Chen leads AI research at TechCore Labs, focusing on large language models and enterprise applications. With 15+ years in ML, she has published 40+ papers and holds 12 patents.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
