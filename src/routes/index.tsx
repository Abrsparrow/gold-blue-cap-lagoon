import { createFileRoute } from "@tanstack/react-router";
import {
  Armchair,
  Clapperboard,
  Clock,
  MapPin,
  Phone,
  Volume2,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PopcornHero } from "@/components/popcorn-hero";
import { cinema, films, halls } from "@/lib/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Header />
      <Hero />
      <NowShowing />
      <Experience />
      <Visit />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/92">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-xl tracking-tight text-fg">
          GAST
          <span className="ml-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Cinema
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#showing" className="hover:text-fg">
            Now showing
          </a>
          <a href="#experience" className="hover:text-fg">
            Halls
          </a>
          <a href="#visit" className="hover:text-fg">
            Visit
          </a>
        </nav>
        <Button asChild size="sm">
          <a href={`tel:${cinema.phoneTel}`}>Call</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden border-b border-line">
      <PopcornHero />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/15 md:bg-gradient-to-r md:from-bg md:via-bg/75 md:to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl items-end px-5 pb-16 pt-24 md:items-center md:pb-20">
        <div className="pointer-events-auto max-w-xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-mark">
            CMC Road · Addis Ababa
          </p>
          <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.95] tracking-[-0.03em] text-fg">
            The picture,
            <br />
            as it was meant
            <br />
            to be seen.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Dolby 3D. Dolby Atmos. Reclining seats, VIP rooms, and a rooftop
            cinema on the tenth floor of GAST Entertainment Mall.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#showing">See what’s on</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={cinema.telegram} target="_blank" rel="noreferrer">
                Telegram schedule
              </a>
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-faint">Rating</dt>
              <dd className="mt-1 tabular-nums text-fg">{cinema.rating} / 5</dd>
            </div>
            <div>
              <dt className="text-faint">Reviews</dt>
              <dd className="mt-1 tabular-nums text-fg">{cinema.reviews}</dd>
            </div>
            <div>
              <dt className="text-faint">Sound</dt>
              <dd className="mt-1 text-fg">Dolby Atmos</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function NowShowing() {
  return (
    <section id="showing" className="border-b border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mark">
              This week
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">Now showing</h2>
          </div>
          <a
            href={cinema.telegram}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-sm text-muted hover:text-fg md:inline-flex"
          >
            Full schedule <ArrowUpRight className="size-4" />
          </a>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {films.map((film) => (
            <li key={film.title} className="group">
              <article className="overflow-hidden rounded-xl bg-surface">
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={film.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-mark">{film.meta}</p>
                  <h3 className="mt-1 font-display text-2xl leading-tight">{film.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{film.blurb}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-b border-line py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mark">The halls</p>
        <h2 className="mt-2 max-w-xl font-display text-4xl tracking-tight md:text-5xl">
          Built for sound, light, and sitting still.
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Volume2, label: "Dolby Atmos", copy: "Object-based surround, ceiling included." },
            { icon: Clapperboard, label: "Dolby 3D", copy: "Bright projection, clean colour." },
            { icon: Armchair, label: "Recliners", copy: "Full-length seats with cup holders." },
            { icon: Building2, label: "The mall", copy: "Bowling, games, gym, cafés — one roof." },
          ].map((item) => (
            <li key={item.label} className="rounded-lg border border-line bg-surface p-5">
              <item.icon className="size-5 text-fg" strokeWidth={1.5} />
              <h3 className="mt-4 font-medium">{item.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.copy}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {halls.map((hall) => (
            <article key={hall.title} className="overflow-hidden rounded-xl bg-surface">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={hall.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-display text-2xl">{hall.title}</h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{hall.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mark">Visit</p>
          <h2 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
            CMC Road, opposite St. Michael Church.
          </h2>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted" />
              <span>
                {cinema.address}
                <br />
                {cinema.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-muted" />
              <a href={`tel:${cinema.phoneTel}`} className="hover:text-fg">
                {cinema.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-muted" />
              <span>{cinema.hours}</span>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={cinema.maps} target="_blank" rel="noreferrer">
                Open in Maps
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={cinema.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </Button>
          </div>
        </div>
        <a
          href={cinema.maps}
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-xl"
        >
          <img
            src="/media/exterior.jpg"
            alt="GAST Entertainment Mall at night"
            className="h-full w-full object-cover"
          />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>GAST Cinema · GAST Entertainment Mall</p>
        <p>Tickets via Telegram or a call to {cinema.phoneDisplay}</p>
      </div>
    </footer>
  );
}
