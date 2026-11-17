import { photos } from '../data/photos.js';

export default function PhotoCredits() {
  return (
    <details className="page-shell mt-10 border-t border-line pt-5">
      <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium">
        View the complete photography credits
      </summary>
      <p className="mb-5 text-xs leading-6 text-slate">
        All photographs were resized proportionally and converted to WebP. Display crops vary by
        layout; the lightbox shows the full image. The DUMBO derivative remains licensed CC BY-SA
        2.0. All other photographs use CC BY 2.0.
      </p>
      <ul className="grid gap-5 text-xs leading-6 text-slate md:grid-cols-2">
        {Object.entries(photos).map(([id, photo]) => (
          <li key={id}>
            <a
              href={photo.originalSource || photo.source}
              className="font-medium text-ink underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {photo.title}
            </a>
            <br />
            {photo.creator} ·{' '}
            <a
              href={photo.licenseUrl}
              className="underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {photo.license}
            </a>{' '}
            · Resized / WebP / display crop.
          </li>
        ))}
      </ul>
    </details>
  );
}
