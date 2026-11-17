import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Dialog from './Dialog.jsx';
import Photo, { PhotoCredit } from './Photo.jsx';

export default function ImageLightbox({ items, index, onChange, onClose }) {
  const move = (step) => onChange((index + step + items.length) % items.length);
  const current = items[index];
  return (
    <Dialog
      className="lightbox"
      labelledBy="lightbox-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <div className="lightbox-inner">
        <div className="flex items-center justify-between gap-4 pb-4">
          <p className="eyebrow text-white/70">New York, in frames</p>
          <button
            type="button"
            className="icon-button text-white"
            aria-label="Close lightbox"
            onClick={onClose}
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <Photo key={current.id} id={current.id} className="lightbox-image" priority />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div aria-live="polite" aria-atomic="true">
            <h2 id="lightbox-title" className="font-serif text-2xl text-white sm:text-3xl">
              {current.title}
            </h2>
            <p className="mt-2 text-sm text-white/65">
              {current.location} · Image {index + 1} of {items.length}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="icon-button border border-white/30 text-white"
              aria-label="Previous photo"
              onClick={() => move(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-button border border-white/30 text-white"
              aria-label="Next photo"
              onClick={() => move(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="mt-4">
          <PhotoCredit photo={current.id} className="text-white/65" />
        </p>
      </div>
    </Dialog>
  );
}
