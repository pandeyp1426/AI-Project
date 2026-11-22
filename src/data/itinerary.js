import { destinations } from './destinations.js';

export const interests = [
  { id: 'landmarks', label: 'Famous landmarks', icon: 'Landmark' },
  { id: 'nature', label: 'Nature & parks', icon: 'Trees' },
  { id: 'culture', label: 'Art & museums', icon: 'Palette' },
  { id: 'photography', label: 'Photography', icon: 'Camera' },
  { id: 'food', label: 'Food experiences', icon: 'Utensils' },
  { id: 'neighborhoods', label: 'Neighborhoods', icon: 'Map' },
];

const extraStops = [
  {
    id: 'midtown-food',
    name: 'Dinner & a Midtown wander',
    photo: 'times-square',
    tags: ['food', 'neighborhoods'],
    description:
      'Choose a meal near your last stop. Leave time to walk a few blocks and watch Midtown settle into its evening rhythm.',
  },
  {
    id: 'upper-east-food',
    name: 'An Upper East Side evening',
    photo: 'met-museum',
    tags: ['food', 'neighborhoods'],
    description:
      'Leave the afternoon open for the museum or park, then find dinner nearby. A relaxed finish keeps the day from becoming a checklist.',
  },
  {
    id: 'brooklyn-waterfront',
    name: 'Linger by the East River',
    photo: 'dumbo',
    tags: ['nature', 'photography'],
    description:
      'Continue along the Brooklyn waterfront. Find a place to pause, take in Manhattan, and enjoy the change of pace before dinner.',
  },
  {
    id: 'brooklyn-food',
    name: 'A taste of the neighborhood',
    photo: 'dumbo',
    tags: ['food', 'neighborhoods'],
    description:
      'Give yourself time to choose a neighborhood café or restaurant. Check current menus and opening information instead of building the day around an unverified recommendation.',
  },
  {
    id: 'village-food',
    name: 'Dinner in the Village',
    photo: 'washington-square',
    tags: ['food', 'neighborhoods'],
    description:
      'Use the surrounding streets as a starting point for dinner. A slice or a slower sit-down meal can both belong in the plan.',
  },
  {
    id: 'chelsea-wander',
    name: 'Chelsea at street level',
    photo: 'high-line',
    tags: ['neighborhoods', 'culture', 'food'],
    description:
      'Pair the elevated park with a little time on the streets below. Make room for a food break or a gallery after checking current opening information.',
  },
  {
    id: 'harbor-pause',
    name: 'A flexible Lower Manhattan afternoon',
    photo: 'one-world',
    tags: ['neighborhoods', 'nature'],
    description:
      'Leave this block open if the island visit takes longer. Otherwise, return to Lower Manhattan, find lunch, and take a quiet walk near the water.',
  },
  {
    id: 'downtown-dinner',
    name: 'Stay downtown for dinner',
    photo: 'manhattan-skyline',
    tags: ['food', 'neighborhoods'],
    description:
      'Stay in Lower Manhattan for the evening. Choose dinner when you know your ferry return plans, and let the harbor visit set the pace.',
  },
  {
    id: 'tribeca-walk',
    name: 'A walk through Tribeca',
    tags: ['neighborhoods', 'photography'],
    description:
      'Explore the side streets and look for cast-iron details and old warehouse façades.',
  },
  {
    id: 'tribeca-dinner',
    name: 'Dinner in Tribeca',
    tags: ['food', 'neighborhoods'],
    description: 'Find a table nearby and leave the evening open for a short walk after dinner.',
  },
  {
    id: 'tompkins-square',
    name: 'Tompkins Square Park',
    tags: ['nature', 'neighborhoods'],
    description: 'Pick up coffee and start with a loop through the park before exploring Avenue A.',
  },
  {
    id: 'st-marks-walk',
    name: 'Explore St. Marks Place',
    tags: ['culture', 'neighborhoods', 'photography'],
    description:
      'Browse the shops and give yourself time for a snack as you head toward Astor Place.',
  },
  {
    id: 'east-village-dinner',
    name: 'Dinner in the East Village',
    tags: ['food', 'neighborhoods'],
    description: 'Choose a spot for dinner, then take a stroll along Second Avenue.',
  },
];

export const activities = Object.fromEntries(
  [...destinations.map((place) => ({ ...place, photo: place.id })), ...extraStops].map(
    (activity) => [activity.id, activity],
  ),
);

// Each day stays in one area. Candidate order is the tie-breaker, not a travel-time claim.
export const regions = [
  {
    id: 'midtown',
    name: 'The Midtown introduction',
    area: 'Midtown Manhattan',
    subtitle: 'Big architecture. Familiar silhouettes. A little city sparkle.',
    slots: [
      ['grand-central', 'rockefeller-center'],
      ['empire-state-building', 'rockefeller-center', 'grand-central'],
      ['times-square', 'midtown-food'],
    ],
  },
  {
    id: 'uptown',
    name: 'Art & a greener New York',
    area: 'Central Park & the Upper East Side',
    subtitle: 'A few galleries, a little fresh air, and permission to slow down.',
    slots: [['met-museum', 'central-park'], ['central-park', 'met-museum'], ['upper-east-food']],
  },
  {
    id: 'brooklyn',
    name: 'Across the river',
    area: 'Brooklyn Bridge & DUMBO',
    subtitle: 'Start with the crossing. Stay for the waterfront.',
    slots: [
      ['brooklyn-bridge'],
      ['dumbo', 'brooklyn-food'],
      ['brooklyn-waterfront', 'brooklyn-food'],
    ],
  },
  {
    id: 'west-side',
    name: 'The city at a slower pace',
    area: 'Chelsea & Greenwich Village',
    subtitle: 'Gardens above the streets and a neighborhood afternoon.',
    slots: [
      ['high-line', 'chelsea-wander'],
      ['washington-square', 'chelsea-wander'],
      ['village-food'],
    ],
  },
  {
    id: 'harbor',
    name: 'A day around the harbor',
    area: 'Liberty Island & Lower Manhattan',
    subtitle: 'Give the island visit room. Keep the rest of the day flexible.',
    slots: [['statue-of-liberty'], ['harbor-pause'], ['downtown-dinner']],
  },
];

export const extendedTripRegions = [
  {
    id: 'tribeca',
    name: 'From the skyline to the side streets',
    area: 'World Trade Center & Tribeca',
    subtitle: 'Take in the city from above, then spend the afternoon on foot.',
    slots: [['one-world'], ['tribeca-walk'], ['tribeca-dinner']],
  },
  {
    id: 'east-village',
    name: 'A day in the East Village',
    area: 'East Village',
    subtitle: 'A park, independent shops, and time to see where the afternoon takes you.',
    slots: [['tompkins-square'], ['st-marks-walk'], ['east-village-dinner']],
  },
];

export const maxDuration = regions.length + extendedTripRegions.length;
export const periods = ['Morning', 'Afternoon', 'Evening'];
export const defaultPreferences = {
  version: 1,
  duration: 2,
  interests: ['landmarks', 'neighborhoods'],
};
