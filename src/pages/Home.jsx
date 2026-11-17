import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Building2, Coffee, Landmark, Trees } from 'lucide-react';
import Photo, { PhotoCredit } from '../components/Photo.jsx';
import DestinationCard from '../components/DestinationCard.jsx';
import DestinationDetails from '../components/DestinationDetails.jsx';
import { featuredDestinations } from '../data/destinations.js';

const experiences = [
  { icon: Building2, title: 'The icons', text: 'The landmarks I know by silhouette, waiting to become places I know by heart.', to: '/explore?category=Landmarks', number: '01' },
  { icon: Landmark, title: 'The culture', text: 'A gallery that makes me linger. A stage that makes the evening feel different.', to: '/explore?category=Museums+%26+Culture', number: '02' },
  { icon: Coffee, title: 'The little rituals', text: 'A bagel in the morning. A slice between walks. Time to find my own favorite.', to: '/plan?interest=food', number: '03' },
  { icon: Trees, title: 'The slower side', text: 'Park benches, tree-lined paths, and a pocket of quiet inside all that energy.', to: '/explore?category=Parks', number: '04' },
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  return <>
    <section className="hero">
      <Photo id="manhattan-skyline" className="hero-image" priority />
      <div className="hero-shade" />
      <div className="page-shell relative z-10 flex min-h-[650px] flex-col justify-center py-20 sm:min-h-[700px] lg:min-h-[740px]">
        <p className="eyebrow mb-7 flex items-center gap-3 text-white/85"><span className="h-px w-9 bg-orange" />A personal New York city guide</p>
        <h1 className="hero-title">Some cities you visit.<br />New York, <em>you experience.</em></h1>
        <p className="mt-7 max-w-md text-base leading-8 text-white/85 sm:text-lg">A city I haven’t explored yet, but can’t wait to discover. These are the places, little moments, and big possibilities on my list.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link to="/explore" className="button button-accent">Explore the City <ArrowUpRight size={17} aria-hidden="true" /></Link><Link to="/plan" className="button button-glass">Plan My Dream Trip <ArrowRight size={17} aria-hidden="true" /></Link></div>
        <div className="hero-bottom"><a href="#dream" className="flex items-center gap-3 text-xs tracking-wide" onClick={(event) => { event.preventDefault(); document.getElementById('dream')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); }}>A little further, a little closer <ArrowDown size={15} aria-hidden="true" /></a><PhotoCredit photo="manhattan-skyline" className="text-white/80" /></div>
      </div>
    </section>
    <div className="border-b border-line"><div className="page-shell flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-slate"><span className="eyebrow">New York, through a dreamer’s eyes</span><span>Big-city dreams. Thoughtful little plans.</span></div></div>

    <section id="dream" className="page-shell section-space grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
      <div className="intro-photo"><Photo id="dumbo" className="aspect-[5/4] w-full object-cover" /><div className="intro-photo-note"><span className="font-serif text-3xl italic">Someday starts here.</span><span className="mt-2 block text-xs tracking-widest uppercase">Brooklyn, on my wish list</span></div><p className="mt-3"><PhotoCredit photo="dumbo" /></p></div>
      <div><p className="eyebrow text-rust">The story behind the someday</p><h2 className="section-title mt-4">Why New York?</h2><p className="mt-6 text-lg leading-8">Because I want to know what it feels like to look up and recognize a skyline I’ve only ever seen from a distance.</p><p className="mt-5 leading-8 text-slate">I’m drawn to the energy, but also to the details: the architecture above a busy street, the different rhythms of each neighborhood, the food, art, and everyday culture between famous landmarks. I want to walk, turn a corner, and find something that wasn’t on my list.</p><Link to="/why-nyc" className="text-link mt-7">Read my New York story <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    </section>

    <section className="section-space border-t border-line bg-white/40"><div className="page-shell"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow text-rust">Places on my list</p><h2 className="section-title mt-4">First stops. Lasting impressions.</h2></div><Link to="/explore" className="text-link shrink-0">Explore all places <ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{featuredDestinations.map((destination) => <DestinationCard key={destination.id} destination={destination} onDetails={setSelected} />)}</div></div></section>

    <section className="bg-navy py-20 text-ivory sm:py-24"><div className="page-shell"><div className="max-w-xl"><p className="eyebrow text-orange">More than a postcard</p><h2 className="section-title mt-4">There’s more than one<br /><em>way to feel New York.</em></h2></div><div className="mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-4">{experiences.map(({ icon: Icon, ...item }) => <Link to={item.to} key={item.number} className="experience-link"><div className="mb-8 flex items-center justify-between text-white/55"><Icon size={25} strokeWidth={1.3} aria-hidden="true" /><span className="text-xs">{item.number}</span></div><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-4 text-sm leading-7 text-white/70">{item.text}</p><ArrowUpRight size={18} className="mt-6 text-orange" aria-hidden="true" /></Link>)}</div></div></section>

    <section className="page-shell section-space text-center"><p className="eyebrow text-rust">From someday to a starting point</p><h2 className="section-title mx-auto mt-5 max-w-2xl">A few days. A whole lot<br className="hidden sm:block" /> to look forward to.</h2><p className="mx-auto mt-6 max-w-lg leading-8 text-slate">Pick what you love. Make room for the unexpected. Start shaping a New York trip that feels like yours.</p><Link to="/plan" className="button button-dark mt-8">Build my dream itinerary <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
    <DestinationDetails destination={selected} onClose={() => setSelected(null)} />
  </>;
}
