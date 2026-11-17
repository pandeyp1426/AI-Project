import { Maximize2 } from 'lucide-react';
import Photo, { PhotoCredit } from './Photo.jsx';

export default function GalleryGrid({ items, onSelect }) {
  return (
    <div className="gallery-grid">
      {items.map((photo, index) => (
        <figure className="gallery-item group" key={photo.id}>
          <button
            type="button"
            className={`gallery-image gallery-${photo.shape}`}
            aria-label={`Enlarge ${photo.title}`}
            onClick={() => onSelect(index)}
          >
            <Photo
              id={photo.id}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
              priority={index < 2}
            />
            <span className="gallery-enlarge">
              <Maximize2 size={18} aria-hidden="true" />
            </span>
          </button>
          <figcaption className="pt-4">
            <p className="eyebrow text-slate">{photo.location}</p>
            <h2 className="mt-2 font-serif text-xl">{photo.title}</h2>
            <p className="mt-2">
              <PhotoCredit photo={photo.id} />
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
