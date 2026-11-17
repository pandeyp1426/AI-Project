import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.js';

export default function FavoriteButton({ destination, withLabel = false }) {
  const { favorites, toggleFavorite } = useFavorites();
  const saved = favorites.includes(destination.id);
  return (
    <button
      type="button"
      className={withLabel ? 'button button-outline' : 'favorite-button'}
      aria-label={
        withLabel
          ? undefined
          : `${saved ? 'Remove' : 'Save'} ${destination.name}${saved ? ' from favorites' : ' to favorites'}`
      }
      aria-pressed={saved}
      onClick={() => toggleFavorite(destination.id)}
    >
      <Heart size={19} className={saved ? 'fill-rust text-rust' : ''} aria-hidden="true" />
      {withLabel && (saved ? 'Saved to favorites' : 'Save this place')}
    </button>
  );
}
