import test from 'node:test';
import assert from 'node:assert/strict';
import { samePreferences, explainStop } from '../../src/utils/planPresentation.js';
import { generateItinerary } from '../../src/utils/itineraryGenerator.js';

test('saved-plan comparison ignores interest order but detects changed choices', () => {
  const saved = { version: 1, duration: 7, interests: ['nature', 'food'] };
  const reordered = { ...saved, interests: ['food', 'nature'] };
  assert.equal(samePreferences(saved, reordered), true);
  assert.deepEqual(generateItinerary(saved), generateItinerary(reordered));
  assert.equal(samePreferences(saved, { ...saved, duration: 6 }), false);
  assert.equal(samePreferences(saved, { ...saved, interests: ['food'] }), false);
  assert.equal(samePreferences(saved, { ...saved, interests: ['culture', 'food'] }), false);
  assert.equal(samePreferences(null, saved), false);
  assert.equal(samePreferences(null, null), false);
});

test('stop explanations claim only actual selected matches and explain fallback stops', () => {
  const stop = { tags: ['culture', 'photography'] };
  assert.equal(explainStop(stop, ['food', 'culture']), 'Matches your interests: Art & museums.');
  assert.equal(explainStop(stop, ['food']), 'A nearby stop to round out this day.');
  assert.equal(explainStop(stop, []), 'Part of a balanced introduction to this area.');
  assert.equal(explainStop(null, ['food']), 'A nearby stop to round out this day.');
});
