import test from 'node:test';
import assert from 'node:assert/strict';
import { interests } from '../../src/data/itinerary.js';
import { generateItinerary, validPreferences } from '../../src/utils/itineraryGenerator.js';

test('all 448 duration/interest combinations produce complete unique deterministic plans', () => {
  for (let duration = 1; duration <= 7; duration += 1) {
    for (let mask = 0; mask < 64; mask += 1) {
      const selected = interests.filter((_, index) => mask & (1 << index)).map((item) => item.id);
      const preferences = { version: 1, duration, interests: selected };
      const plan = generateItinerary(preferences);
      assert.equal(plan.length, duration);
      assert.equal(new Set(plan.map((day) => day.regionId)).size, duration);
      const stops = plan.flatMap((day) => day.stops);
      assert.equal(stops.length, duration * 3);
      assert.ok(stops.every((stop) => stop?.name && stop?.description));
      assert.equal(new Set(stops.map((stop) => stop.id)).size, stops.length);
      assert.deepEqual(plan, generateItinerary(preferences));
      assert.deepEqual(preferences.interests, selected);
    }
  }
});

test('interests change the itinerary and museum interest prioritizes the Met', () => {
  const culture = generateItinerary({ version: 1, duration: 1, interests: ['culture'] });
  const nature = generateItinerary({ version: 1, duration: 1, interests: ['nature'] });
  const food = generateItinerary({ version: 1, duration: 1, interests: ['food'] });
  assert.equal(culture[0].stops[0].id, 'met-museum');
  assert.notDeepEqual(culture, nature);
  assert.notDeepEqual(food, nature);
  const longer = generateItinerary({ version: 1, duration: 4, interests: ['culture'] });
  assert.ok(longer.some((day) => day.stops.some((stop) => stop.id === 'met-museum')));
});

test('reject malformed, out-of-range, duplicate, and unknown saved preferences', () => {
  for (const value of [
    null,
    [],
    {},
    'bad',
    { version: 2, duration: 2, interests: [] },
    { version: 1, duration: 0, interests: [] },
    { version: 1, duration: 8, interests: [] },
    { version: 1, duration: 1.5, interests: [] },
    { version: 1, duration: 2, interests: ['unknown'] },
    { version: 1, duration: 2, interests: ['food', 'food'] },
    { version: 1, duration: '2', interests: [] },
  ]) {
    assert.equal(validPreferences(value), false);
    assert.throws(() => generateItinerary(value), TypeError);
  }
  assert.equal(validPreferences({ version: 1, duration: 1, interests: [] }), true);
});
