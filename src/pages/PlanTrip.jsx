import { Footprints, MapPin, Ticket, TrainFront } from 'lucide-react';
import PageIntro from '../components/PageIntro.jsx';
import ItineraryBuilder from '../components/ItineraryBuilder.jsx';

const tips = [
  { icon: Footprints, title: 'Leave room to wander', text: 'Wear comfortable shoes, build in breaks, and choose a walking pace that works for you. The space between stops is part of the trip.' },
  { icon: TrainFront, title: 'Get to know the subway', text: 'Check routes, service changes, and station accessibility with the MTA before setting out.', href: 'https://www.mta.info/guides/riding-the-subway', label: 'MTA subway guide' },
  { icon: MapPin, title: 'Think in neighborhoods', text: 'Keep nearby places together. Spend more time experiencing an area and less time crossing the city back and forth.' },
  { icon: Ticket, title: 'Make the big plans first', text: 'Check official ticket and reservation requirements before booking major attractions. Hours, access, and availability can change.' },
];

export default function PlanTrip() {
  return <><PageIntro label="Make a little room for someday" title={<>A trip that feels <em>like you.</em></>}><p>One day or a few. The icons or the quieter corners.<br className="hidden sm:block" /> Bring your curiosity. Let’s give it a starting point.</p></PageIntro><div className="page-shell pb-20"><ItineraryBuilder /></div><section className="travel-tips border-t border-line bg-sand py-16"><div className="page-shell"><p className="eyebrow text-rust">A few things to take with you</p><h2 className="mt-4 font-serif text-3xl sm:text-4xl">Less rushing. More New York.</h2><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{tips.map(({ icon: Icon, ...tip }) => <article key={tip.title}><Icon size={24} strokeWidth={1.4} className="mb-5 text-rust" aria-hidden="true" /><h3 className="font-medium">{tip.title}</h3><p className="mt-3 text-sm leading-7 text-slate">{tip.text}</p>{tip.href && <a className="mt-3 inline-flex min-h-10 items-center text-xs font-medium text-rust underline underline-offset-4" href={tip.href} target="_blank" rel="noreferrer">{tip.label}<span className="sr-only"> (opens in new tab)</span></a>}</article>)}</div></div></section></>;
}
