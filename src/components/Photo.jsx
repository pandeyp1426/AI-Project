import { photos } from '../data/photos.js';

export function PhotoCredit({ photo, className = '' }) {
  const entry = typeof photo === 'string' ? photos[photo] : photo;
  if (!entry) return null;
  return <span className={`photo-credit ${className}`}>Photo: <a href={entry.source} target="_blank" rel="noreferrer">{entry.creator}</a> · <a href={entry.licenseUrl} target="_blank" rel="noreferrer">{entry.license}</a> · cropped</span>;
}

export default function Photo({ id, className = '', priority = false, sizes, ...rest }) {
  const entry = photos[id];
  if (!entry) return null;
  return <img src={`${import.meta.env.BASE_URL}${entry.src}`} alt={entry.alt} width={entry.width} height={entry.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" className={className} sizes={sizes} {...rest} />;
}
