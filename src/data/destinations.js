export const categories = [
  'All',
  'Landmarks',
  'Parks',
  'Museums & Culture',
  'Neighborhoods',
  'Views',
];

export const destinations = [
  {
    id: 'times-square',
    name: 'Times Square',
    location: 'Midtown, Manhattan',
    category: 'Landmarks',
    description:
      'Bright billboards, Broadway marquees, and a little beautiful chaos. The city at its most unmistakable.',
    detail:
      'I want to see the theater district after the lights come on, then step away from the busiest plazas to find a quieter street. The Times Square Alliance lists public art, Broadway information, and neighborhood events.',
    fact: 'Times Square is a center for Broadway theaters, public art, and pedestrian plazas.',
    tip: 'Keep the visit flexible. It is a place to take in slowly, rather than another attraction to rush through.',
    official: 'https://www.timessquarenyc.org/',
    tags: ['landmarks', 'photography'],
  },
  {
    id: 'central-park',
    name: 'Central Park',
    location: 'Manhattan',
    category: 'Parks',
    description:
      'Tree-lined paths and open lawns, with the skyline never quite out of sight. A chance to let the city slow down.',
    detail:
      'Bethesda Terrace would be my starting point: a place to notice the stonework, the lake, and people moving through the park. I would pick a small part of the park to explore instead of trying to cover it all.',
    fact: 'Bethesda Terrace overlooks the Lake and includes an arcade with a tiled ceiling.',
    tip: 'Check the Conservancy map and park alerts before choosing a walk, especially after rough weather.',
    official: 'https://www.centralparknyc.org/locations/bethesda-terrace',
    tags: ['nature', 'photography'],
  },
  {
    id: 'brooklyn-bridge',
    name: 'Brooklyn Bridge',
    location: 'Manhattan ↔ Brooklyn',
    category: 'Landmarks',
    description:
      'Stone arches, a web of cables, and the East River below. A walk I would make part of the trip, not just the route.',
    detail:
      'The pedestrian promenade offers a way to experience the bridge at walking pace. I would cross toward Brooklyn, leaving time for the waterfront rather than turning straight back.',
    fact: 'Opened in 1883, the bridge connects Lower Manhattan and Brooklyn across the East River.',
    tip: 'Stay on the pedestrian route, keep clear of other walkers, and check NYC DOT for access updates.',
    official: 'https://www.nyc.gov/html/dot/html/infrastructure/brooklyn-bridge.shtml',
    tags: ['landmarks', 'photography', 'neighborhoods'],
  },
  {
    id: 'statue-of-liberty',
    name: 'Statue of Liberty',
    location: 'Liberty Island, New York Harbor',
    category: 'Landmarks',
    description:
      'A harbor crossing and an encounter with a symbol seen in so many photographs. This time, from the water.',
    detail:
      'A visit to Liberty Island deserves its own generous block of time. The island museum and views across the harbor interest me as much as the statue itself. I would decide on island access before making other plans that day.',
    fact: 'The National Park Service identifies Statue City Cruises as the authorized ferry provider to Liberty and Ellis Islands.',
    tip: 'Reserve through the official NPS link. Pedestal and crown access require separate advance planning.',
    official: 'https://www.nps.gov/stli/planyourvisit/index.htm',
    tags: ['landmarks', 'culture', 'photography'],
  },
  {
    id: 'empire-state-building',
    name: 'Empire State Building',
    location: 'Midtown, Manhattan',
    category: 'Views',
    description:
      'An Art Deco silhouette that makes the whole skyline feel familiar. I would love to see the grid from above.',
    detail:
      'Seeing the streets from an observation deck could help put all the walking into perspective. I would choose a clear day if possible and leave time to look at the building itself.',
    fact: 'The building offers observation experiences on its 86th and 102nd floors.',
    tip: 'Check the official website for the right ticket type, entry requirements, and current conditions.',
    official: 'https://www.esbnyc.com/',
    tags: ['landmarks', 'photography'],
  },
  {
    id: 'dumbo',
    name: 'DUMBO',
    location: 'Brooklyn waterfront',
    category: 'Neighborhoods',
    description:
      'Old industrial streets, a bridge framed between buildings, and room to linger by the water.',
    detail:
      'The familiar Washington Street view would be one stop, not the whole visit. I would continue toward Brooklyn Bridge Park and spend time looking back at Manhattan from the waterfront.',
    fact: 'Brooklyn Bridge Park provides waterfront public space beside the DUMBO neighborhood.',
    tip: 'Keep streets and sidewalks clear when taking photos. Explore beyond the best-known viewpoint.',
    official: 'https://brooklynbridgepark.org/',
    tags: ['neighborhoods', 'photography', 'food'],
  },
  {
    id: 'high-line',
    name: 'The High Line',
    location: 'Chelsea & West Side, Manhattan',
    category: 'Parks',
    description:
      'A different level of New York: planting, art, and city views along a former elevated railway.',
    detail:
      'I like the idea of a walk that changes the angle of everyday streets. The gardens and public art would make the High Line more than a shortcut between neighborhoods.',
    fact: 'The High Line combines public gardens and art on an elevated former rail line.',
    tip: 'Check the park website for entrances, accessibility information, and temporary closures.',
    official: 'https://www.thehighline.org/',
    tags: ['nature', 'culture', 'photography'],
  },
  {
    id: 'grand-central',
    name: 'Grand Central Terminal',
    location: 'Midtown East, Manhattan',
    category: 'Museums & Culture',
    description:
      'A working station worth pausing in. The grand concourse turns an everyday journey into architecture.',
    detail:
      'I would step out of the flow of commuters to look up, notice the clock, and appreciate the scale of the Main Concourse. The terminal also has shops and dining, so it could be a natural break in a Midtown walk.',
    fact: 'Grand Central is an active transit terminal with a Main Concourse, shops, and dining.',
    tip: 'Respect commuters and consult the official visitor guide for tours and photography guidance.',
    official: 'https://grandcentralterminal.com/',
    tags: ['culture', 'landmarks', 'photography', 'food'],
  },
  {
    id: 'washington-square',
    name: 'Washington Square Park',
    location: 'Greenwich Village, Manhattan',
    category: 'Parks',
    description:
      'An arch, a fountain, and a place to sit between neighborhood walks. Small moments belong on the itinerary too.',
    detail:
      'I imagine stopping here without a checklist, then wandering through the surrounding Village streets. It is the kind of pause that could make the day feel like my own.',
    fact: 'The park is in Greenwich Village and is known for its Washington Arch and central fountain.',
    tip: 'Use the NYC Parks website to check current information and respect any posted park rules.',
    official: 'https://nycgovparks.org/parks/washingtonsquarepark',
    tags: ['nature', 'neighborhoods', 'culture'],
  },
  {
    id: 'rockefeller-center',
    name: 'Rockefeller Center',
    location: 'Midtown, Manhattan',
    category: 'Landmarks',
    description:
      'Art Deco details, public plazas, and layers of city life. A reason to look closely as well as look up.',
    detail:
      'I would explore the plazas and architectural details before deciding whether to add Top of the Rock. The experience changes with the season, so the official calendar would be part of my planning.',
    fact: 'Rockefeller Center includes Top of the Rock, public art, dining, and seasonal events.',
    tip: 'Seasonal activities and observation deck visits need their own availability checks.',
    official: 'https://www.rockefellercenter.com/',
    tags: ['landmarks', 'culture', 'photography'],
  },
  {
    id: 'met-museum',
    name: 'The Metropolitan Museum of Art',
    location: 'Upper East Side, Manhattan',
    category: 'Museums & Culture',
    description:
      'A chance to spend a little longer with art. I would choose a few galleries and give them my full attention.',
    detail:
      'The Met Fifth Avenue sits alongside Central Park, making a museum visit and a park walk a thoughtful pairing. I would choose a small number of collections before arriving, leaving room for something unexpected.',
    fact: 'The Met Fifth Avenue is one of the museum’s two locations; The Met Cloisters is a separate visit.',
    tip: 'Check the museum’s current visitor information, ticket policies, and gallery access before going.',
    official: 'https://www.metmuseum.org/plan-your-visit',
    tags: ['culture'],
  },
  {
    id: 'one-world',
    name: 'One World Observatory',
    location: 'Lower Manhattan',
    category: 'Views',
    description:
      'The city opens out toward the harbor. An elevated view of the places I would spend the day walking through.',
    detail:
      'I would treat the observatory as a chance to understand the geography of the city: rivers, bridges, neighborhoods, and the harbor beyond. Weather would help decide whether this is the right day for a visit.',
    fact: 'One World Observatory is the observation experience at One World Trade Center.',
    tip: 'Consult the official booking information and check visibility before choosing a visit.',
    official: 'https://www.oneworldobservatory.com/',
    tags: ['photography', 'landmarks'],
  },
];

export const destinationById = Object.fromEntries(destinations.map((place) => [place.id, place]));
export const featuredDestinations = destinations.slice(0, 6);
//comment
