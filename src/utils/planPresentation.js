import { interests } from '../data/itinerary.js';

// Interest selection order does not change the deterministic plan.
export function samePreferences(first, second) {
  return Boolean(
    first &&
    second &&
    first.version === second.version &&
    first.duration === second.duration &&
    first.interests.length === second.interests.length &&
    first.interests.every((id) => second.interests.includes(id)),
  );
}

export function explainStop(stop, selected) {
  if (!selected.length) return 'Part of a balanced introduction to this area.';
  const matches = interests.filter(
    (interest) => selected.includes(interest.id) && stop?.tags?.includes(interest.id),
  );
  return matches.length
    ? `Matches your interests: ${matches.map((interest) => interest.label).join(', ')}.`
    : 'A nearby stop to round out this day.';
}
