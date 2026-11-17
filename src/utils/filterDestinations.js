export function filterDestinations(destinations, { query = '', category = 'All', savedOnly = false, favorites = [] } = {}) {
  const search = query.trim().toLocaleLowerCase();
  return destinations.filter((place) => (category === 'All' || place.category === category)
    && (!savedOnly || favorites.includes(place.id))
    && `${place.name} ${place.location} ${place.description} ${place.detail || ''}`.toLocaleLowerCase().includes(search));
}
