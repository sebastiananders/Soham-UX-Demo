export function LivestreamCanvas({ state }: { state: 'diagnosed' | 'fixed' }) {
  return (
    <div className="flex-1 flex flex-col bg-neutral-50 overflow-hidden">
      {/* Browser chrome */}
      <div className="shrink-0 flex items-center gap-3 px-5 py-3.5 border-b border-neutral-200 bg-white">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => <div key={i} className="w-3 h-3 rounded-full bg-neutral-200" />)}
        </div>
        <div className="flex-1 bg-neutral-100 rounded-md px-3 py-1.5 text-xs text-neutral-500 font-mono">
          techsummiteurope.com/live
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Event nav */}
        <div className="bg-neutral-900 px-10 py-4 flex items-center justify-between">
          <span className="text-white font-semibold text-sm tracking-wide">TECH SUMMIT EUROPE 2026</span>
          <div className="flex gap-6">
            {['Programme', 'Speakers', 'Venue', 'Live'].map(item => (
              <span key={item} className={`text-xs font-medium cursor-pointer ${item === 'Live' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'}`}>{item}</span>
            ))}
          </div>
        </div>

        <div className="px-10 py-10">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Live Stream</h2>
          <div className="w-10 h-0.5 bg-neutral-300 mb-8" />

          {state === 'diagnosed' && (
            <div className="flex flex-col gap-5">
              {/* Broken player */}
              <div className="w-full aspect-video bg-neutral-100 rounded-[12px] border border-neutral-200 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                  <span className="text-red-400 text-xl">⚠</span>
                </div>
                <p className="text-sm font-semibold text-neutral-700">Stream unavailable</p>
                <p className="text-xs text-neutral-400">Unable to connect to stream source</p>
                <code className="text-[11px] text-neutral-400 bg-neutral-200 px-3 py-1 rounded-md font-mono mt-1">
                  stream.techsummit.io/live
                </code>
              </div>

              {/* Diagnosis callout */}
              <div className="rounded-[12px] border border-yellow-200 bg-yellow-50 p-5 flex flex-col gap-3">
                <p className="text-xs font-semibold text-yellow-800 uppercase tracking-widest">URL mismatch detected</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <span className="text-[11px] font-semibold text-red-500 w-24 shrink-0 pt-0.5">Current</span>
                    <code className="text-[11px] text-neutral-600 bg-white border border-neutral-200 px-2 py-1 rounded font-mono break-all">stream.techsummit.io/live</code>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[11px] font-semibold text-emerald-600 w-24 shrink-0 pt-0.5">Correct</span>
                    <code className="text-[11px] text-neutral-600 bg-white border border-emerald-200 px-2 py-1 rounded font-mono break-all">cdn.bizzabo.com/techsummit-2026/live</code>
                  </div>
                </div>
                <p className="text-[11px] text-yellow-700">The previous endpoint was decommissioned yesterday. Pushing the correct URL takes ~10 seconds.</p>
              </div>
            </div>
          )}

          {state === 'fixed' && (
            <div className="flex flex-col gap-5">
              {/* Live player */}
              <div className="w-full aspect-video bg-neutral-900 rounded-[12px] border border-neutral-800 flex items-center justify-center relative overflow-hidden">
                {/* Live badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-600 rounded px-2 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[11px] font-bold tracking-widest">LIVE</span>
                </div>
                {/* Viewer count */}
                <div className="absolute top-4 right-4 text-neutral-300 text-xs font-medium">
                  1,247 watching
                </div>
                {/* Play button */}
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                </div>
                {/* Subtle scanlines / texture */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Confirmation bar */}
              <div className="rounded-[12px] border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-900">Stream restored</p>
                  <p className="text-xs text-emerald-700">cdn.bizzabo.com/techsummit-2026/live · updated just now</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
