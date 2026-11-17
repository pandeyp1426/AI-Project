import { Search, X } from 'lucide-react';

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="search-field">
      <Search size={19} aria-hidden="true" />
      <label htmlFor="destination-search" className="sr-only">
        Search destinations
      </label>
      <input
        id="destination-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Find your kind of New York…"
        autoComplete="off"
      />
      {query && (
        <button
          type="button"
          className="icon-button shrink-0"
          aria-label="Clear search"
          onClick={() => {
            setQuery('');
            document.getElementById('destination-search').focus();
          }}
        >
          <X size={17} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
