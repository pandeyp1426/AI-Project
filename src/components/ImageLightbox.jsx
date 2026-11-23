import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Dialog from './Dialog.jsx';
import Photo, { PhotoCredit } from './Photo.jsx';

function LightboxPhoto({ id }) {
  const [state, setState] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  return (
    <div className="lightbox-stage">
      <Photo
        key={attempt}
        id={id}
        className={`lightbox-image ${state === 'ready' ? '' : 'invisible'}`}
        priority
        onLoad={() => setState('ready')}
        onError={() => setState('error')}
      />
      {state !== 'ready' && (
        <div className="lightbox-feedback">
          <p role="status">
            {state === 'loading' ? 'Loading photograph…' : 'This photograph could not load.'}
          </p>
          {state === 'error' && (
            <button
              type="button"
              className="button button-glass mt-4"
              onClick={(event) => {
                event.currentTarget
                  .closest('dialog')
                  ?.querySelector('[aria-label="Close lightbox"]')
                  ?.focus();
                setState('loading');
                setAttempt((value) => value + 1);
              }}
            >
              Retry photo
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ImageLightbox({ items, index, onChange, onClose }) {
  const move = (step) => onChange((index + step + items.length) % items.length);
  const current = items[index];
  return (
    <Dialog
      className="lightbox"
      labelledBy="lightbox-title"
      describedBy="lightbox-help"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <div className="lightbox-inner">
        <div className="lightbox-toolbar">
          <div className="flex gap-2" role="group" aria-label="Photo navigation">
            <button
              type="button"
              className="lightbox-nav"
              aria-label="Previous photo"
              onClick={() => move(-1)}
            >
              <ChevronLeft size={18} aria-hidden="true" /> Previous
            </button>
            <button
              type="button"
              className="lightbox-nav"
              aria-label="Next photo"
              onClick={() => move(1)}
            >
              Next <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
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
        <LightboxPhoto key={current.id} id={current.id} />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div aria-live="polite" aria-atomic="true">
            <h2 id="lightbox-title" className="font-serif text-2xl text-white sm:text-3xl">
              {current.title}
            </h2>
            <p className="mt-2 text-sm text-white/65">
              {current.location} · Image {index + 1} of {items.length}
            </p>
          </div>
        </div>
        <p className="mt-4">
          <PhotoCredit photo={current.id} className="text-white/65" />
        </p>
        <p id="lightbox-help" className="mt-4 text-sm leading-6 text-white/75">
          Use Left and Right arrow keys to browse. Escape closes.
        </p>
      </div>
    </Dialog>
  );
}
