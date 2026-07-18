type PosterStat = {
  label: string
  value: string
}

type DiffusePosterProps = {
  label: string
  title: string
  summary: string
  accent: string
  qr?: string
  stats: PosterStat[]
}

export function DiffusePosterExample(props: DiffusePosterProps) {
  return (
    <main className="relative overflow-hidden bg-[#101114] text-white" style={{ width: 1440, minHeight: 2100 }}>
      <div
        className="pointer-events-none absolute -left-80 -top-72 h-[1180px] w-[1350px] rounded-full blur-[180px]"
        style={{ background: `radial-gradient(ellipse at 40% 40%, ${props.accent}66 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute -right-72 top-[520px] h-[900px] w-[860px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.28) 0%, transparent 72%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-[-260px] left-40 h-[760px] w-[1100px] rounded-full blur-[220px]"
        style={{ background: `radial-gradient(ellipse at 50% 60%, ${props.accent}44 0%, transparent 75%)` }}
      />

      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] mix-blend-overlay">
        <filter id="poster-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#poster-noise)" />
      </svg>

      <div className="pointer-events-none absolute right-16 top-20 text-[210px] font-black leading-none tracking-tight opacity-[0.04]">
        SIGNAL
      </div>

      <section className="relative z-10 grid min-h-[2100px] grid-cols-12 gap-14 px-20 py-20">
        <aside className="col-span-4 flex flex-col justify-between">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: props.accent }} />
              <span className="text-2xl font-bold uppercase tracking-[0.24em] text-white/55">{props.label}</span>
            </div>
            <h1 className="text-[118px] font-black leading-[0.96] tracking-tight">{props.title}</h1>
            <p className="mt-12 text-[34px] leading-[1.55] text-white/62">{props.summary}</p>
          </div>

          {props.qr && (
            <div className="w-[340px] rounded-[36px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl">
              <img src={props.qr} alt="" className="h-auto w-full rounded-3xl bg-white" />
              <p className="mt-5 text-center text-2xl font-semibold tracking-[0.16em] text-white/55">SCAN TO CONTINUE</p>
            </div>
          )}
        </aside>

        <section className="col-span-8 flex flex-col justify-end">
          <div className="rounded-[3rem] border border-white/15 bg-white/10 p-12 shadow-2xl backdrop-blur-xl">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-[76px] font-black leading-none">Overview</h2>
              <div className="h-3 w-28 rounded-full" style={{ backgroundColor: props.accent }} />
            </div>

            <div className="grid grid-cols-2 gap-8">
              {props.stats.map((item) => (
                <div key={item.label} className="rounded-[32px] border border-white/10 bg-black/18 p-8">
                  <div className="text-[82px] font-black leading-none tabular-nums">{item.value}</div>
                  <div className="mt-5 text-3xl font-semibold text-white/55">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
