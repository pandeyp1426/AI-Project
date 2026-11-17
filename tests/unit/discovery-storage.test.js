import test from 'node:test';
import assert from 'node:assert/strict';
import { destinations } from '../../src/data/destinations.js';
import { filterDestinations } from '../../src/utils/filterDestinations.js';
import { readStored, writeStored } from '../../src/utils/storage.js';
import { photos } from '../../src/data/photos.js';
import { gallery } from '../../src/data/gallery.js';
import { existsSync } from 'node:fs';

test('search handles whitespace, case, descriptions, no matches, and clearing', () => {
  assert.equal(
    filterDestinations(destinations, { query: '  CENTRAL PARK  ' })[0].id,
    'central-park',
  );
  assert.ok(
    filterDestinations(destinations, { query: 'railway' }).some(
      (place) => place.id === 'high-line',
    ),
  );
  assert.equal(filterDestinations(destinations, { query: 'zzzz1234' }).length, 0);
  assert.equal(filterDestinations(destinations, { query: '   ' }).length, 12);
});

test('search, categories, and saved-only apply together', () => {
  assert.deepEqual(
    filterDestinations(destinations, {
      query: 'park',
      category: 'Parks',
      savedOnly: true,
      favorites: ['central-park'],
    }).map((place) => place.id),
    ['central-park'],
  );
  assert.equal(
    filterDestinations(destinations, {
      category: 'Views',
      savedOnly: true,
      favorites: ['central-park'],
    }).length,
    0,
  );
});

test('optional description detail is safe to omit', () => {
  assert.equal(
    filterDestinations(
      [{ id: 'x', name: 'A place', location: '', description: '', category: 'Parks' }],
      { query: 'place' },
    ).length,
    1,
  );
});

test('missing, malformed and invalid storage falls back without crashing', () => {
  const valid = (value) => Array.isArray(value);
  for (const raw of ['{broken', '{}', 'null', '"string"']) {
    const result = readStored('test', [], valid, { getItem: () => raw });
    assert.deepEqual(result.value, []);
    assert.ok(result.warning);
  }
  assert.deepEqual(readStored('test', [], valid, { getItem: () => null }), {
    value: [],
    warning: '',
  });
  assert.deepEqual(readStored('test', [], valid, { getItem: () => '["central-park"]' }).value, [
    'central-park',
  ]);
});

test('blocked reads and quota failures are reported truthfully', () => {
  assert.ok(
    readStored('x', [], Array.isArray, {
      getItem() {
        throw new Error('blocked');
      },
    }).warning,
  );
  const failed = writeStored('x', ['a'], {
    setItem() {
      throw new Error('quota');
    },
  });
  assert.equal(failed.ok, false);
  assert.ok(failed.warning);
  let written;
  assert.equal(
    writeStored('x', ['a'], {
      setItem(key, value) {
        written = [key, value];
      },
    }).ok,
    true,
  );
  assert.deepEqual(written, ['x', '["a"]']);
});

test('each destination and gallery image has an existing local asset and license metadata', () => {
  assert.ok(gallery.length >= 12);
  assert.equal(new Set(destinations.map((place) => place.id)).size, 12);
  for (const item of [...destinations, ...gallery]) {
    const photo = photos[item.id];
    assert.ok(photo && photo.alt.length > 20 && photo.creator && photo.license && photo.licenseUrl);
    assert.ok(photo.width > 0 && photo.height > 0);
    assert.ok(existsSync(new URL(`../../public/${photo.src}`, import.meta.url)), photo.src);
    assert.ok(photo.source.startsWith('https://'));
  }
});
