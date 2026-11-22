import {
  activities,
  extendedTripRegions,
  interests,
  maxDuration,
  regions,
} from '../data/itinerary.js';

const allowedInterests = new Set(interests.map((interest) => interest.id));

export function validPreferences(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    value.version === 1 &&
    Number.isInteger(value.duration) &&
    value.duration >= 1 &&
    value.duration <= maxDuration &&
    Array.isArray(value.interests) &&
    value.interests.length <= allowedInterests.size &&
    new Set(value.interests).size === value.interests.length &&
    value.interests.every((interest) => allowedInterests.has(interest))
  );
}

export function generateItinerary(preferences) {
  if (!validPreferences(preferences))
    throw new TypeError(`Choose between 1 and ${maxDuration} days and valid interests.`);
  const selected = new Set(preferences.interests);
  const score = (id) =>
    (activities[id]?.tags || []).filter((tag) => selected.has(tag)).length +
    (id === 'met-museum' && selected.has('culture') ? 2 : 0);
  // Rank areas by their best matches per time block. Ties retain the editorial order.
  const availableRegions =
    preferences.duration <= 4 ? regions : [...regions, ...extendedTripRegions];
  const ranked = availableRegions
    .map((region, order) => ({
      ...region,
      order,
      score: region.slots.reduce((sum, options) => sum + Math.max(0, ...options.map(score)), 0),
    }))
    .sort((a, b) => b.score - a.score || a.order - b.order);
  const used = new Set();
  return ranked.slice(0, preferences.duration).map((region, day) => ({
    regionId: region.id,
    day: day + 1,
    name: region.name,
    area: region.area,
    subtitle: region.subtitle,
    stops: region.slots.map((options) => {
      const available = options.filter((id) => activities[id] && !used.has(id));
      const best = available
        .map((id, order) => ({ id, order, score: score(id) }))
        .sort((a, b) => b.score - a.score || a.order - b.order)[0];
      if (!best) return null;
      used.add(best.id);
      return activities[best.id];
    }),
  }));
}
