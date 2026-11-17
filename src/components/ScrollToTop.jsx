import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const titles = {
  '/': 'A city worth dreaming about',
  '/explore': 'Explore New York',
  '/gallery': 'The city, in frames',
  '/plan': 'Plan My Trip',
  '/why-nyc': 'Why New York',
};

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousLocation = useRef(null);
  useEffect(() => {
    const locationKey = pathname + hash;
    const navigated = previousLocation.current !== null && previousLocation.current !== locationKey;
    previousLocation.current = locationKey;
    document.title = `${titles[pathname] || 'Page not found'} | New York, Someday`;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView();
      target?.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Preserve the browser's initial tab order; move focus only after in-app navigation.
      if (navigated) document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return null;
}
