import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-heritage bg-[radial-gradient(circle_at_top,_rgba(255,214,118,0.12),_transparent_35%),linear-gradient(180deg,_#111318_0%,_#12161f_100%)] text-heritage-text">
      <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-heritage-accent">HeritageAI</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Smart Heritage Guide</h1>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-heritage-muted">
              <Link to="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-heritage-gold hover:text-white">
                Home
              </Link>
              <Link to="/login" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-heritage-gold hover:text-white">
                Login
              </Link>
              <Link to="/register" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-heritage-gold hover:text-white">
                Register
              </Link>
              <Link to="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-heritage-gold hover:text-white">
                Dashboard
              </Link>
            </nav>
          </div>
        </header>

        <main className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xs">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
