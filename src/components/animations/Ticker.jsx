export default function Ticker({ items, speed = 25 }) {
  return (
    <div className="client-logo-marquee overflow-hidden py-8" aria-label="Client logos">
      <div className="client-logo-track">
        {[0, 1, 2].map((group) => (
          <div key={group} className="client-logo-group" aria-hidden={group > 0 ? "true" : undefined}>
            {items.map((item) => (
              <div
                key={`${group}-${item.alt}`}
                className={`${item.wrapperClass || "w-40 sm:w-48 md:w-52"} h-24 sm:h-28 md:h-32 flex items-center justify-center shrink-0 px-1`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`h-16 sm:h-20 md:h-24 max-h-16 sm:max-h-20 md:max-h-24 max-w-[160px] sm:max-w-[190px] md:max-w-[210px] w-auto shrink-0 object-contain filter drop-shadow-sm transition-all duration-300 hover:opacity-100 ${
                    item.scale || ""
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        .client-logo-marquee { width:100%; }
        .client-logo-track { display:flex; width:max-content; animation:client-logo-scroll ${speed}s linear infinite; will-change:transform; }
        .client-logo-track:hover { animation-play-state:paused; }
        .client-logo-group { display:flex; flex-shrink:0; align-items:center; gap:0.10rem; padding-right:0.10rem; }
        @keyframes client-logo-scroll { from { transform:translateX(0); } to { transform:translateX(-33.333333%); } }
        @media (prefers-reduced-motion:reduce) { .client-logo-track { animation-play-state:paused; } }
      `}</style>
    </div>
  );
}
