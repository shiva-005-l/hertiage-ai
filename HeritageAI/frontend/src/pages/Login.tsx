import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-heritage-surface p-8 shadow-glass backdrop-blur-xs">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-heritage-accent">Member Access</p>
        <h2 className="text-3xl font-semibold text-white">Sign in to continue</h2>
      </div>

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          <label className="block text-sm text-heritage-muted">
            Email
            <input
              type="email"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-heritage-gold focus:ring-2 focus:ring-heritage-gold/25"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm text-heritage-muted">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-heritage-gold focus:ring-2 focus:ring-heritage-gold/25"
              placeholder="Enter your password"
            />
          </label>
        </div>

        <button className="w-full rounded-full bg-heritage-gold px-5 py-3 text-sm font-semibold text-heritage text-black transition hover:bg-[#f0c56d]">
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-heritage-muted">
        New to HeritageAI?{' '}
        <Link to="/register" className="text-heritage-accent hover:text-white">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default Login;
