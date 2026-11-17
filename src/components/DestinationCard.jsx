import { ArrowUpRight, MapPin } from 'lucide-react';
import Photo, { PhotoCredit } from './Photo.jsx';
import FavoriteButton from './FavoriteButton.jsx';

export default function DestinationCard({ destination, onDetails }) {
  return (
    <article className="destination-card group">
      <div className="relative">
        <button
          type="button"
          className="card-image-button"
          onClick={() => onDetails(destination)}
          aria-label={`View ${destination.name} details`}
        >
          <Photo
            id={destination.id}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
        </button>
        <span className="image-tag">{destination.category}</span>
        <div className="absolute right-3 top-3">
          <FavoriteButton destination={destination} />
        </div>
      </div>
      <div className="px-1 pt-5">
        <p className="mb-2 flex items-center gap-1.5 text-xs text-slate">
          <MapPin size={13} aria-hidden="true" />
          {destination.location}
        </p>
        <h3 className="font-serif text-2xl">{destination.name}</h3>
        <p className="mt-3 min-h-20 text-sm leading-7 text-slate">{destination.description}</p>
        <button className="text-link my-4" type="button" onClick={() => onDetails(destination)}>
          View details <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> for {destination.name}</span>
        </button>
        <div className="border-t border-line pt-3">
          <PhotoCredit photo={destination.id} />
        </div>
      </div>
    </article>
  );
}
