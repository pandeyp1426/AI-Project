import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BookmarkCheck,
  Camera,
  Check,
  Compass,
  Download,
  Landmark,
  Map,
  Palette,
  Printer,
  RotateCcw,
  Save,
  Trees,
  Utensils,
} from 'lucide-react';
import { defaultPreferences, interests, maxDuration } from '../data/itinerary.js';
import { generateItinerary, validPreferences } from '../utils/itineraryGenerator.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import ItineraryDay from './ItineraryDay.jsx';

const icons = { Landmark, Trees, Palette, Camera, Utensils, Map };
const validSaved = (value) => value === null || validPreferences(value);
const durations = Array.from({ length: maxDuration }, (_, index) => index + 1);

export default function ItineraryBuilder() {
  const [params] = useSearchParams();
  const [saved, save, storageWarning] = useLocalStorage(
    'nyc-someday:itinerary:v1',
    null,
    validSaved,
    { requirePersistence: true },
  );
  const requestedInterest = params.get('interest');
  const initial = interests.some((interest) => interest.id === requestedInterest)
    ? { ...defaultPreferences, interests: [requestedInterest] }
    : saved || defaultPreferences;
  const [preferences, setPreferences] = useState(initial);
  const [built, setBuilt] = useState(saved);
  const [message, setMessage] = useState(
    saved ? 'Your saved itinerary is ready. Change the choices to build another.' : '',
  );
  const resultHeading = useRef(null);
  const days = built ? generateItinerary(built) : [];
  const changed = built && JSON.stringify(preferences) !== JSON.stringify(built);

  function build() {
    setBuilt({ ...preferences, interests: [...preferences.interests] });
    setMessage('Your itinerary is ready. Save it to keep this version after a refresh.');
    requestAnimationFrame(() => {
      resultHeading.current?.focus({ preventScroll: true });
      resultHeading.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      });
    });
  }
  function toggleInterest(id) {
    setPreferences((current) => ({
      ...current,
      interests: current.interests.includes(id)
        ? current.interests.filter((item) => item !== id)
        : [...current.interests, id],
    }));
  }
  function reset() {
    setPreferences({ ...defaultPreferences, interests: [] });
    setBuilt(null);
    setMessage('Selections reset. Any saved itinerary is still available to reload.');
  }

  return (
    <div className="planner-layout">
      <aside className="planner-controls" aria-label="Itinerary preferences">
        <div className="planner-panel">
          <p className="eyebrow mb-7 text-rust">Your trip, your pace</p>
          <fieldset>
            <legend className="control-title">
              <span>01</span>How long have you got?
            </legend>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {durations.map((duration) => (
                <button
                  type="button"
                  key={duration}
                  className={`duration-button ${preferences.duration === duration ? 'selected' : ''}`}
                  aria-pressed={preferences.duration === duration}
                  onClick={() => setPreferences({ ...preferences, duration })}
                >
                  <span>{duration}</span> <small>{duration === 1 ? 'day' : 'days'}</small>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-8">
            <legend className="control-title">
              <span>02</span>What brings you here?
            </legend>
            <p className="mt-2 text-xs leading-6 text-slate">
              Choose a few favorites, or keep an open mind.
            </p>
            <div className="mt-4 grid gap-2">
              {interests.map((interest) => {
                const Icon = icons[interest.icon];
                const active = preferences.interests.includes(interest.id);
                return (
                  <button
                    type="button"
                    key={interest.id}
                    className={`interest-button ${active ? 'selected' : ''}`}
                    aria-pressed={active}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    <span className="flex-1 text-left">{interest.label}</span>
                    <span className="interest-check">
                      {active && <Check size={12} aria-hidden="true" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
          <button type="button" className="button button-dark mt-7 w-full" onClick={build}>
            Build My NYC Itinerary <ArrowRight size={17} aria-hidden="true" />
          </button>
          <p className="mt-3 text-center text-xs leading-6 text-slate">
            Thoughtful suggestions. Room for spontaneity.
          </p>
          <div className="mt-5 flex flex-wrap justify-between gap-1 border-t border-line pt-4">
            <button type="button" className="utility-button" onClick={reset}>
              <RotateCcw size={14} aria-hidden="true" />
              Reset selections
            </button>
            <button
              type="button"
              className="utility-button"
              disabled={!saved}
              onClick={() => {
                setPreferences(saved);
                setBuilt(saved);
                setMessage('Saved itinerary loaded.');
              }}
            >
              <Download size={14} aria-hidden="true" />
              Load saved
            </button>
          </div>
          {saved && (
            <p className="mt-3 flex items-center gap-2 text-xs text-slate">
              <BookmarkCheck size={14} aria-hidden="true" />A {saved.duration}-day itinerary is
              saved on this browser.
            </p>
          )}
        </div>
        <div className="planner-note">
          <Compass size={23} strokeWidth={1.4} className="text-rust" aria-hidden="true" />
          <p>
            Good trips leave a little breathing room. These are day outlines, with time to pause
            between stops.
          </p>
        </div>
      </aside>
      <section className="min-w-0" aria-labelledby="itinerary-title">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-rust">A little closer to someday</p>
            <h2
              id="itinerary-title"
              ref={resultHeading}
              tabIndex={-1}
              className="mt-3 font-serif text-3xl sm:text-4xl"
            >
              {built ? `Your ${built.duration}-day New York` : 'Your days, waiting to happen.'}
            </h2>
          </div>
          {built && (
            <span className="text-xs text-slate">
              {built.interests.length
                ? `${built.interests.length} interests · at your pace`
                : 'An open-minded introduction'}
            </span>
          )}
        </div>
        <p role="status" className="status-message">
          {message}
        </p>
        {storageWarning && (
          <p role="alert" className="storage-warning mb-5">
            {storageWarning}
          </p>
        )}
        {changed && (
          <p className="mb-5 rounded-sm border border-orange/40 bg-orange/10 p-4 text-sm leading-6">
            Your preferences have changed. Build again to update the itinerary below.
          </p>
        )}
        {built ? (
          <>
            <div className="itinerary-actions mb-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="button button-accent"
                onClick={() => {
                  if (save(built))
                    setMessage('Itinerary saved on this browser. It will be here after a refresh.');
                  else
                    setMessage(
                      'This itinerary is available for this visit, but could not be saved.',
                    );
                }}
              >
                <Save size={16} aria-hidden="true" />
                Save itinerary
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={() => window.print()}
              >
                <Printer size={16} aria-hidden="true" />
                Print itinerary
              </button>
              <button type="button" className="button button-outline" onClick={build}>
                <RotateCcw size={15} aria-hidden="true" />
                Regenerate
              </button>
            </div>
            <div className="grid gap-7">
              {days.map((day) => (
                <ItineraryDay key={day.regionId} day={day} />
              ))}
            </div>
            <p className="itinerary-disclaimer mt-6 text-xs leading-6 text-slate">
              An outline to personalize, not a booking or live schedule. Check attraction hours,
              entry requirements, weather, and transport before you go. The same choices produce the
              same plan; change interests to explore another combination. Printing also lets you
              save as PDF in a supporting browser.
            </p>
          </>
        ) : (
          <div className="planner-empty">
            <div className="empty-route" aria-hidden="true">
              <span>01</span>
              <i />
              <span>02</span>
              <i />
              <span>03</span>
            </div>
            <Compass
              size={47}
              strokeWidth={1}
              className="mx-auto mt-10 text-rust"
              aria-hidden="true"
            />
            <h3 className="mt-6 font-serif text-3xl">
              Every good trip starts
              <br />
              with a little curiosity.
            </h3>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-slate">
              Choose your days and the things you love. We’ll bring nearby places together into a
              plan with room to breathe.
            </p>
            <p className="eyebrow mt-9 text-rust">Morning · Afternoon · Evening</p>
          </div>
        )}
      </section>
    </div>
  );
}
