import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Compass, Heart } from 'lucide-react';
import PageIntro from '../components/PageIntro.jsx';
import DestinationCard from '../components/DestinationCard.jsx';
import DestinationDetails from '../components/DestinationDetails.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import { categories, destinations } from '../data/destinations.js';
import { useFavorites } from '../context/FavoritesContext.js';
import { filterDestinations } from '../utils/filterDestinations.js';

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const { favorites } = useFavorites();
  const category = categories.includes(params.get('category')) ? params.get('category') : 'All';
  const visible = filterDestinations(destinations, { query, category, savedOnly, favorites });
  const reset = () => {
    setQuery('');
    setSavedOnly(false);
    setParams({});
  };
  return (
    <>
      <PageIntro
        label="The city, one place at a time"
        title={
          <>
            Find your New York<span className="text-rust">.</span>
          </>
        }
        aside={
          <span className="editorial-note">
            12 places.
            <br />
            <em>Endless possibilities.</em>
          </span>
        }
      >
        <p>
          Big landmarks, quieter corners, and places to get a little lost.
          <br className="hidden sm:block" /> Start exploring. Keep the ones that speak to you.
        </p>
      </PageIntro>
      <section className="page-shell pb-20" aria-label="Destination discovery">
        <div className="discovery-controls">
          <div className="flex flex-col gap-4 sm:flex-row">
            <SearchBar query={query} setQuery={setQuery} />
            <button
              type="button"
              className={`button ${savedOnly ? 'button-dark' : 'button-outline'} shrink-0`}
              aria-pressed={savedOnly}
              onClick={() => setSavedOnly(!savedOnly)}
            >
              <Heart size={17} aria-hidden="true" />
              My favorites <span className="count-badge">{favorites.length}</span>
            </button>
          </div>
          <div className="mt-5">
            <CategoryFilter
              category={category}
              onChange={(next) => setParams(next === 'All' ? {} : { category: next })}
            />
          </div>
        </div>
        <div className="my-7 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate" role="status">
            {visible.length} {visible.length === 1 ? 'place' : 'places'} to{' '}
            {savedOnly ? 'keep dreaming about' : 'discover'}
          </p>
          {(query || savedOnly || category !== 'All') && (
            <button type="button" className="text-link text-sm" onClick={reset}>
              Reset filters
            </button>
          )}
          <span className="hidden text-xs text-slate sm:block">
            A heart today. A memory someday.
          </span>
        </div>
        {visible.length ? (
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onDetails={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Compass size={34} strokeWidth={1.3} className="mx-auto text-rust" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl">
              {savedOnly && !favorites.length
                ? 'Your wish list starts with a heart.'
                : 'A little off the map.'}
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-7 text-slate">
              {savedOnly && !favorites.length
                ? 'Save a place that catches your eye. You’ll find your favorites here whenever you come back.'
                : 'No places match these filters. Try another search or make a little more room in your plans.'}
            </p>
            <button type="button" className="button button-dark mt-6" onClick={reset}>
              Explore all places <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </section>
      <DestinationDetails destination={selected} onClose={() => setSelected(null)} />
    </>
  );
}
