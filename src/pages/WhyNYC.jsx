import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Photo, { PhotoCredit } from '../components/Photo.jsx';

export default function WhyNYC() {
  return (
    <>
      <section className="page-shell page-intro text-center">
        <p className="eyebrow text-rust">A place I’m yet to meet</p>
        <h1 className="page-title mx-auto mt-5 max-w-4xl">
          Why New York Is
          <br />
          on My <em>Bucket List</em>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-slate">
          Not a travel diary. Not yet.
          <br />
          Just a few reasons I keep coming back to the idea of going.
        </p>
        <p className="eyebrow mt-7 text-slate">A personal note · Looking forward</p>
      </section>
      <figure className="page-shell">
        <Photo
          id="brooklyn-bridge"
          className="aspect-[4/3] max-h-[560px] w-full object-cover sm:aspect-[21/9]"
          priority
        />
        <figcaption className="mt-3 flex flex-wrap justify-between gap-2">
          <span className="text-xs text-slate">
            One day, the walk across will be more than a photograph.
          </span>
          <PhotoCredit photo="brooklyn-bridge" />
        </figcaption>
      </figure>
      <article className="story-body">
        <section>
          <p className="eyebrow text-rust">01 / The beginning</p>
          <h2>The City I’ve Always Wanted to See</h2>
          <p>
            New York is familiar to me in an unusual way. I recognize its skyline and the names of
            its streets, but I have no idea what an ordinary morning there would feel like. That gap
            between recognizing a place and actually knowing it is a large part of why I want to go.
          </p>
          <p>
            I don’t expect a trip to match every image I have in mind. I’m interested in what the
            photographs leave out: the sound at an intersection, the scale of a building from the
            sidewalk, the way one street leads into a different neighborhood.
          </p>
        </section>
        <section>
          <p className="eyebrow text-rust">02 / Looking up</p>
          <h2>The Skyline and Architecture</h2>
          <p>
            The skyline is the first thing that draws me in. I would love to see the Empire State
            Building as part of a real view, rather than a shape on a screen. But I also want to
            notice the less famous buildings: an entrance, an old facade, a detail above a shop.
          </p>
          <p>
            Grand Central interests me for the same reason. It is a landmark, but also somewhere
            people pass through as part of a normal day. I like the thought of taking time to notice
            a space that is both impressive and useful.
          </p>
        </section>
      </article>
      <aside className="story-quote">
        <div className="page-shell">
          <blockquote>
            “I want to leave room for the places
            <br className="hidden md:block" /> I don’t yet know to look for.”
          </blockquote>
          <p className="eyebrow mt-6 text-rust">The best part of a first visit</p>
        </div>
      </aside>
      <div className="page-shell section-space grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <figure>
          <Photo
            id="washington-square"
            className="aspect-[4/5] max-h-[620px] w-full object-cover"
          />
          <figcaption className="mt-3">
            <PhotoCredit photo="washington-square" />
          </figcaption>
        </figure>
        <div className="story-copy">
          <section>
            <p className="eyebrow text-rust">03 / At street level</p>
            <h2>Experiencing the Streets and Neighborhoods</h2>
            <p>
              I would want to walk through DUMBO, spend some time in Greenwich Village, and see how
              different those places feel from Midtown. A neighborhood is more than a list of
              attractions. It is also the distance between them.
            </p>
            <p>
              I imagine leaving part of an afternoon unplanned: stopping in a park, looking into a
              shop, or simply taking the slower way back. I would rather get a feel for a few places
              than hurry through as many as possible.
            </p>
          </section>
          <section className="mt-10">
            <p className="eyebrow text-rust">04 / In good company</p>
            <h2>The Food, Culture, and People</h2>
            <p>
              Food would be part of how I explore. I want to try a New York bagel, find a slice of
              pizza between walks, and make room for something I haven’t tried before. I don’t need
              every meal to be famous.
            </p>
            <p>
              I’m equally curious about museums, theater, and the everyday mix of people around me.
              I would like to spend time with art, listen, observe, and remember that I’m a visitor
              in someone else’s home city.
            </p>
          </section>
        </div>
      </div>
      <section className="bg-navy py-20 text-ivory">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-orange">05 / A first-day daydream</p>
            <h2 className="section-title mt-5">
              My Ideal First Day
              <br />
              in New York
            </h2>
            <p className="mt-6 max-w-md leading-8 text-white/70">
              Something familiar to begin with. Something unexpected along the way. This is an
              imagined day, with plenty of room to change my mind.
            </p>
          </div>
          <ol className="story-timeline">
            <li>
              <span>Morning</span>
              <h3>A slow start in Midtown</h3>
              <p>
                Find breakfast, take in Grand Central, and start noticing the architecture between
                stops.
              </p>
            </li>
            <li>
              <span>Afternoon</span>
              <h3>A little perspective</h3>
              <p>
                Explore a few Midtown blocks and, if the weather and bookings work out, see the view
                from the Empire State Building.
              </p>
            </li>
            <li>
              <span>Evening</span>
              <h3>See the lights come on</h3>
              <p>
                Have dinner, see Times Square, and stop before the day becomes a race to fit in one
                more thing.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <article className="story-body">
        <section>
          <p className="eyebrow text-rust">06 / What stays with me</p>
          <h2>What I Hope to Take Away From the Experience</h2>
          <p>
            I hope to come home with a more personal picture of New York. Not just photographs of
            places everyone recognizes, but a few small memories that mean something because I was
            there.
          </p>
          <p>
            For now, making this website is a way to turn a vague wish into a more thoughtful plan.
            Someday is still in the future. At least now I have somewhere to begin.
          </p>
          <Link to="/plan" className="button button-dark mt-7">
            Plan a first day of your own <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </article>
    </>
  );
}
