function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-heritage-surface p-8 shadow-glass backdrop-blur-xs">
        <p className="text-sm uppercase tracking-[0.4em] text-heritage-accent">Dashboard</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Your heritage command center</h2>
        <p className="mt-3 text-heritage-muted">
          Manage your saved experiences, review monuments, and view curated trip ideas from a single responsive panel.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-white/10 bg-heritage-surface p-6 shadow-glass backdrop-blur-xs">
          <h3 className="text-xl font-semibold text-white">My Visits</h3>
          <p className="mt-3 text-heritage-muted">Track recent monuments, save notes, and continue your heritage journey.</p>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-heritage-surface p-6 shadow-glass backdrop-blur-xs">
          <h3 className="text-xl font-semibold text-white">AI Planner</h3>
          <p className="mt-3 text-heritage-muted">Get itinerary suggestions, route plans, and cultural insights at a glance.</p>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
