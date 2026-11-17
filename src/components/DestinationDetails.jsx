import { ExternalLink, MapPin, X } from 'lucide-react';
import Dialog from './Dialog.jsx';
import Photo, { PhotoCredit } from './Photo.jsx';
import FavoriteButton from './FavoriteButton.jsx';

export default function DestinationDetails({ destination, onClose }) {
  if (!destination) return null;
  return (
    <Dialog onClose={onClose} labelledBy="destination-title">
      <div className="relative">
        <Photo
          id={destination.id}
          className="aspect-[16/9] max-h-72 w-full object-cover"
          priority
        />
        <button
          type="button"
          className="icon-button absolute right-4 top-4 bg-ivory"
          onClick={onClose}
          aria-label="Close destination details"
          autoFocus
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <div className="p-6 sm:p-9">
        <p className="eyebrow text-rust">{destination.category}</p>
        <h2 id="destination-title" className="mt-3 font-serif text-3xl sm:text-4xl">
          {destination.name}
        </h2>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate">
          <MapPin size={15} aria-hidden="true" />
          {destination.location}
        </p>
        <p className="mt-6 leading-8 text-slate">{destination.detail}</p>
        <div className="my-6 border-l-2 border-rust pl-5">
          <h3 className="mb-2 font-semibold">A detail worth knowing</h3>
          <p className="text-sm leading-7 text-slate">{destination.fact}</p>
        </div>
        <p className="mb-6 text-sm leading-7">
          <strong>Before you go:</strong> {destination.tip}
        </p>
        <div className="flex flex-wrap gap-3">
          <FavoriteButton destination={destination} withLabel />
          <a
            href={destination.official}
            target="_blank"
            rel="noreferrer"
            className="button button-dark"
          >
            Official visitor information <ExternalLink size={15} aria-hidden="true" />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
        <p className="mt-6">
          <PhotoCredit photo={destination.id} />
        </p>
      </div>
    </Dialog>
  );
}
