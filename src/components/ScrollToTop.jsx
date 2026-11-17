import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titles = { '/': 'A city worth dreaming about', '/explore': 'Explore New York', '/gallery': 'The city, in frames', '/plan': 'Plan My Trip', '/why-nyc': 'Why New York' };

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = `${titles[pathname] || 'Page not found'} | New York, Someday`;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView();
      target?.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return null;
}
