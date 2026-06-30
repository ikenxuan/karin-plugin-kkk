type CleanCardProps = {
  avatar: string
  name: string
  meta: string
  title: string
  body: string
  cover?: string
  stats: Array<{ label: string; value: string }>
}

export function CleanCardExample(props: CleanCardProps) {
  return (
    <main className="relative overflow-hidden bg-background text-foreground" style={{ width: 1440, minHeight: 1500 }}>
      <section className="relative z-10 px-20 py-16">
        <header className="mb-14 flex items-center gap-8">
          <img src={props.avatar} alt="" className="h-36 w-36 rounded-full object-cover shadow-xl" />
          <div className="min-w-0 flex-1">
            <h1 className="line-clamp-2 text-7xl font-bold leading-tight">{props.name}</h1>
            <p className="mt-3 text-4xl text-foreground/60">{props.meta}</p>
          </div>
        </header>

        <article className="space-y-10">
          <h2 className="text-[72px] font-bold leading-[1.18]">{props.title}</h2>
          <p className="whitespace-pre-wrap text-[56px] leading-[1.65] text-foreground/85">{props.body}</p>

          {props.cover && (
            <div className="overflow-hidden rounded-[40px] shadow-2xl">
              <img src={props.cover} alt="" className="h-auto w-full object-cover" />
            </div>
          )}
        </article>

        <footer className="mt-14 grid grid-cols-3 gap-6">
          {props.stats.map((item) => (
            <div key={item.label} className="rounded-3xl bg-surface px-8 py-6">
              <div className="text-5xl font-bold tabular-nums">{item.value}</div>
              <div className="mt-2 text-3xl text-foreground/55">{item.label}</div>
            </div>
          ))}
        </footer>
      </section>
    </main>
  )
}
