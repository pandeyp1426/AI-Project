import { destinations, destinationById } from '../data/destinations.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { FavoritesContext } from './FavoritesContext.js';

const validFavorites = (value) => Array.isArray(value) && value.length <= destinations.length && new Set(value).size === value.length && value.every((id) => typeof id === 'string' && Object.hasOwn(destinationById, id));

export default function FavoritesProvider({ children }) {
  const [favorites, saveFavorites, warning] = useLocalStorage('nyc-someday:favorites:v1', [], validFavorites);
  const toggleFavorite = (id) => saveFavorites(favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]);
  return <FavoritesContext.Provider value={{ favorites, toggleFavorite, warning }}>{children}</FavoritesContext.Provider>;
}
