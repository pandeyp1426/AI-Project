import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import ImageLightbox from '../components/ImageLightbox.jsx';
import { gallery } from '../data/gallery.js';

export default function Gallery() {
  const [index, setIndex] = useState(null);
  return <><PageIntro label="A visual wish list" title={<>The city, <em>in frames.</em></>} aside={<span className="editorial-note">A borrowed lens.<br /><em>A growing daydream.</em></span>}><p>Light on a skyline. A familiar bridge. A street I haven’t walked yet.<br className="hidden sm:block" /> Photographs that make someday feel a little closer.</p></PageIntro><section className="page-shell pb-20" aria-label="New York photo gallery"><div className="mb-8 flex items-center justify-between border-y border-line py-4 text-xs text-slate"><p>{gallery.length} perspectives on one city</p><p>Open a frame. Look a little closer.</p></div><GalleryGrid items={gallery} onSelect={setIndex} /></section><section id="credits" tabIndex={-1} className="border-t border-line bg-sand py-14"><div className="page-shell grid gap-7 md:grid-cols-2"><div><p className="eyebrow text-rust">Behind the photographs</p><h2 className="mt-4 font-serif text-3xl">A thank you to the people<br />behind the lens.</h2></div><div className="text-sm leading-7 text-slate"><p>These photographs belong to their credited creators. Each image links to its source and reuse license. Images have been resized and may be cropped for this layout. Full credit and modification details are recorded in the project’s image credits.</p><p className="mt-4">They are inspiration for a future trip, not photographs from a trip I’ve already taken.</p><Link to="/plan" className="text-link mt-5">Turn inspiration into an itinerary <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>{index !== null && <ImageLightbox items={gallery} index={index} onChange={setIndex} onClose={() => setIndex(null)} />}</>;
}
