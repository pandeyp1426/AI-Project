import { categories } from '../data/destinations.js';

export default function CategoryFilter({ category, onChange }) {
  return <div role="group" aria-label="Filter destinations by category" className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => onChange(item)} className={`filter-chip ${category === item ? 'selected' : ''}`}>{item}</button>)}</div>;
}
