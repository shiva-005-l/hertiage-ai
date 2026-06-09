function Home() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 shadow-glass backdrop-blur-xs">
        <p className="text-sm uppercase tracking-[0.4em] text-heritage-accent">Welcome</p>
        <h2 className="mt-4 text-4xl font-semibold text-white">Discover heritage like never before.</h2>
        <p className="mt-4 max-w-2xl text-heritage-muted">
          Explore monuments, read reviews, scan QR guides, and ask the AI Heritage Assistant for curated trip plans with an immersive dark heritage theme.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-heritage-surface p-6 shadow-glass backdrop-blur-xs">
          <h3 className="text-2xl font-semibold text-white">Heritage Map</h3>
          <p className="mt-3 text-heritage-muted">
            Navigate monuments visually, explore gold-accented highlights, and travel the past in a modern experience.
          </p>
        </article>
        <article className="rounded-[2rem] border border-white/10 bg-heritage-surface p-6 shadow-glass backdrop-blur-xs">
          <h3 className="text-2xl font-semibold text-white">Personalized Guide</h3>
          <p className="mt-3 text-heritage-muted">
            Sign in to save favorites, leave reviews, and access your dashboard for curated recommendations.
          </p>
        </article>
      </div>
    </section>
  );
}

export default Home;
