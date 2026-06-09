import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-heritage-surface p-8 shadow-glass backdrop-blur-xs">
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-heritage-accent">Create Account</p>
        <h2 className="text-3xl font-semibold text-white">Join HeritageAI</h2>
      </div>

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          <label className="block text-sm text-heritage-muted">
            Full Name
            <input
              type="text"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-heritage-gold focus:ring-2 focus:ring-heritage-gold/25"
              placeholder="Your name"
            />
          </label>
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
              placeholder="Create a password"
            />
          </label>
        </div>

        <button className="w-full rounded-full bg-heritage-gold px-5 py-3 text-sm font-semibold text-heritage text-black transition hover:bg-[#f0c56d]">
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-heritage-muted">
        Already have an account?{' '}
        <Link to="/login" className="text-heritage-accent hover:text-white">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Register;
