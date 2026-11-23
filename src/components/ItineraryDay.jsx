import { ExternalLink, MapPin, Moon, Sun, Sunrise } from 'lucide-react';
import { periods } from '../data/itinerary.js';
import { explainStop } from '../utils/planPresentation.js';
import Photo, { PhotoCredit } from './Photo.jsx';

const periodIcons = [Sunrise, Sun, Moon];
export default function ItineraryDay({ day, selectedInterests }) {
  return (
    <article className="itinerary-day">
      <header className="flex gap-5 border-b border-line pb-6">
        <span className="day-number">{String(day.day).padStart(2, '0')}</span>
        <div>
          <p className="eyebrow mb-2 text-rust">Day {day.day}</p>
          <h3 className="font-serif text-2xl sm:text-3xl">{day.name}</h3>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-slate">
            <MapPin size={13} aria-hidden="true" />
            {day.area}
          </p>
        </div>
      </header>
      <p className="mt-5 text-sm leading-7 text-slate">{day.subtitle}</p>
      <ol className="itinerary-stops">
        {day.stops.map((stop, index) => {
          const Icon = periodIcons[index];
          return (
            <li key={periods[index]}>
              <div className="stop-marker">
                <Icon size={17} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="eyebrow mb-2 text-slate">{periods[index]}</p>
                <h4 className="text-base font-semibold">{stop?.name || 'Leave a little room'}</h4>
                <p className="stop-reason mt-2 text-sm leading-6 text-rust">
                  {explainStop(stop, selectedInterests)}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate">
                  {stop?.description ||
                    'Take a break, find something to eat, or revisit a favorite nearby street.'}
                </p>
                {stop?.official && (
                  <a
                    href={stop.official}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-xs font-medium text-rust underline underline-offset-4"
                  >
                    Visitor information <ExternalLink size={12} aria-hidden="true" />
                    <span className="sr-only"> for {stop.name} (opens in new tab)</span>
                  </a>
                )}
              </div>
              {index === 0 && stop?.photo && (
                <figure className="stop-photo">
                  <Photo id={stop.photo} className="aspect-square w-full rounded-sm object-cover" />
                  <figcaption className="mt-1">
                    <PhotoCredit photo={stop.photo} />
                  </figcaption>
                </figure>
              )}
            </li>
          );
        })}
      </ol>
    </article>
  );
}
