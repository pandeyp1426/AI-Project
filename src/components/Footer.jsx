import { Link } from 'react-router-dom';
import { ArrowUpRight, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="grid gap-9 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-16">
          <div>
            <Link to="/" className="brand text-ivory">
              <Building2 size={25} aria-hidden="true" />
              <span>
                New York, <em>Someday.</em>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/70">
              A city I haven’t explored yet,
              <br />
              but can’t wait to discover.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-5 text-white/60">Find your way</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <Link to="/">Home</Link>
              <Link to="/explore">Explore</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/plan">Plan My Trip</Link>
              <Link to="/why-nyc">Why NYC</Link>
            </div>
          </nav>
          <div>
            <p className="eyebrow mb-5 text-white/60">A little daydream, made real</p>
            <p className="text-sm leading-7 text-white/70">
              An independent travel wish list and AI-assisted university project. Made with
              curiosity. Built for someday.
            </p>
            <Link
              to="/gallery#credits"
              className="mt-4 inline-flex items-center gap-2 text-sm underline underline-offset-4"
            >
              Photography & credits <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} New York, Someday. Original site content.</p>
          <p>No bookings. Just possibilities.</p>
        </div>
      </div>
    </footer>
  );
}
