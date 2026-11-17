import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUpRight, Building2, Menu, X } from 'lucide-react';

const links = [
  ['/', 'Home'],
  ['/explore', 'Explore'],
  ['/gallery', 'Gallery'],
  ['/plan', 'Plan My Trip'],
  ['/why-nyc', 'Why NYC'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const escape = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener('keydown', escape);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', escape);
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="page-shell flex min-h-20 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="New York, Someday — home"
        >
          <Building2 size={25} strokeWidth={1.4} aria-hidden="true" />
          <span>
            New York<span className="brand-comma">,</span> <em>Someday</em>
            <span className="brand-dot">.</span>
          </span>
        </NavLink>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end className="nav-link">
              {label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/plan" className="button button-dark hidden xl:inline-flex">
          Let’s make a plan <ArrowUpRight size={16} aria-hidden="true" />
        </NavLink>
        <button
          ref={menuButton}
          className="icon-button lg:hidden"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        className="mobile-nav lg:hidden"
      >
        <div className="page-shell grid gap-1 py-4">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end className="nav-link" onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
