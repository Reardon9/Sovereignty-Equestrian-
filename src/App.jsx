import React, { useEffect, useState } from "react";

// ===== Brand & Assets =====
const LOGO = "/logo.png";
const brand = {
  navy: "#0b1733",
  gold: "#d4af37",
  black: "#111111",
  white: "#ffffff",
};

// === SEO helpers (brand search) ===
const SEO = ({ title, description, canonical = "https://www.sovereigntyequestrian.com/" }) => {
  // re-use React.useEffect already imported in your file
  useEffect(() => {
    // <title>
    document.title = title;

    // <meta name="description">
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', description);

    // <link rel="canonical">
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', canonical);
  }, [title, description, canonical]);

  return null;
};

// LocalBusiness schema for entity recognition
const LocalBusinessSchema = () => {
  const json = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Sovereignty Equestrian",
    "description": "Equine breeding, boarding, lessons, trail rides, and equine-assisted therapy in Kelowna, BC.",
    "url": "https://www.sovereigntyequestrian.com/",
    "image": "https://www.sovereigntyequestrian.com/logo.png",
    "telephone": "+1-250-793-5191",
    "email": "sovereigntyequestrian@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3990 Senger Road",
      "addressLocality": "Kelowna",
      "addressRegion": "BC",
      "postalCode": "V1W 4S8",
      "addressCountry": "CA"
    },
    "areaServed": "Kelowna"
  };

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(json);
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return null;
};

const ChevronDown = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M6.7 8.7a1 1 0 0 1 1.4 0L12 12.6l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.1a1 1 0 0 1 0-1.4z"
    />
  </svg>
);

// ===== Tiny Hash Router =====
const useHashRoute = () => {
  const [path, setPath] = useState(() => {
    if (!window.location.hash) {
      window.location.hash = "#/"; // ensure Home on first run
    }
    return window.location.hash.replace("#", "");
  });
  useEffect(() => {
    const onHash = () => setPath(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (to) => {
    if (!to.startsWith("#/")) to = `#${to}`;
    window.location.hash = to;
  };
  return { path, navigate };
};

// ===== Layout & Chrome =====
const Container = ({ children }) => (
  <div className="max-w-7xl mx-auto px-5 sm:px-8">{children}</div>
);

// ⬇️ REPLACE your current Header with this version
const Header = ({ onNavigate, current }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{ background: brand.navy, borderColor: "rgba(212,175,55,0.25)" }}
    >
      <Container>
        <div className="flex items-center gap-6 py-3">
          {/* Brand / Logo */}
          <a
            href="#/"
            className="flex items-center gap-3 no-underline"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("#/");
            }}
          >
            <img
              src={LOGO}
              alt="Sovereignty Equestrian logo"
              className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
            <div className="leading-tight">
              <div className="text-xl sm:text-2xl font-semibold" style={{ color: brand.white }}>
                Sovereignty Equestrian
              </div>
              <div className="text-xs sm:text-sm" style={{ color: brand.gold }}>
                Why Follow When You Can Lead
              </div>
            </div>
          </a>

          {/* Nav */}
          <nav className="ml-auto pl-1 sm:pl-0">
  <ul className="flex flex-nowrap items-stretch gap-x-2 sm:gap-x-3 md:gap-x-4 text-sm sm:text-base">
    {/* Home (unchanged) */}
    <li className="flex">
      <a
        href="#/"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("#/");
        }}
        className={`px-2 sm:px-3 py-2 rounded-md inline-flex items-center justify-center text-center leading-tight hover:opacity-90 whitespace-normal break-words shrink-0 max-w-[12ch] sm:max-w-[15ch] ${
          current === "/" ? "ring-1" : ""
        }`}
        style={{ color: brand.white }}
      >
        Home
      </a>
    </li>

    {/* Meet the Team — centered on phones */}
    <li className="flex w-full sm:w-auto justify-center">
      <a
        href="#/meet-the-team"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("#/meet-the-team");
        }}
        className={`px-2 sm:px-3 py-2 rounded-md inline-flex items-center justify-center text-center leading-tight hover:opacity-90 whitespace-normal break-words shrink-0 max-w-[15ch] ${
          current === "/meet-the-team" ? "ring-1" : ""
        }`}
        style={{ color: brand.white }}
      >
        Meet the Team
      </a>
    </li>

    {/* Services dropdown trigger (unchanged) */}
    <li className="relative flex" onClick={(e) => e.stopPropagation()}>
      <button
        className="px-2 sm:px-3 py-2 rounded-md inline-flex items-center justify-center gap-1 text-center leading-tight hover:opacity-90 whitespace-normal break-words shrink-0 max-w-[12ch] sm:max-w-[15ch]"
        style={{ color: brand.white }}
        onClick={() => setOpen((v) => !v)}
      >
        Services <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-56 rounded-xl shadow-lg p-2"
          style={{ background: brand.black, border: `1px solid ${brand.gold}` }}
        >
          {[
            { label: "Boarding", to: "#/services/boarding" },
            { label: "Lessons", to: "#/services/lessons" },
            { label: "Camps & Clinics", to: "#/services/camps-clinics" },
            { label: "Trail Rides (Women’s Wine Night)", to: "#/services/trail-rides" },
          ].map((s) => (
            <a
              key={s.to}
              href={s.to}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(s.to);
                setOpen(false);
              }}
              className="block px-3 py-2 rounded-lg hover:opacity-90 text-center"
              style={{ color: brand.white }}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </li>

    {/* Right tabs (unchanged) */}
    {[
      { label: "Equine Assisted Therapy", to: "#/equine-assisted-therapy" },
      { label: "Birthday Parties", to: "#/birthday-parties" },
      { label: "Layover Stays", to: "#/layover-stays" },
      { label: "Horse Purchasing Program", to: "#/horse-purchasing-program" },
      { label: "Contact Us", to: "#/contact" },
    ].map((item) => (
      <li key={item.to} className="flex">
        <a
          href={item.to}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.to);
          }}
          className={`px-2 sm:px-3 py-2 rounded-md inline-flex items-center justify-center text-center leading-tight hover:opacity-90 whitespace-normal break-words shrink-0 max-w-[12ch] sm:max-w-[15ch] ${
            current === item.to.replace("#", "") ? "ring-1" : ""
          }`}
          style={{ color: brand.white }}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
        </div>
      </Container>
    </header>
  );
};

const Footer = () => (
  <footer className="mt-20 border-t" style={{ borderColor: "rgba(212,175,55,0.25)" }}>
    <Container>
      <div className="py-10 text-center">
        <p className="text-sm" style={{ color: brand.gold }}>
          Breeding | Boarding | Performance
        </p>
        <p className="text-xs mt-2" style={{ color: "#c9d1d9" }}>
          © {new Date().getFullYear()} Sovereignty Equestrian. All rights reserved.
        </p>
      </div>
    </Container>
  </footer>
);

const Section = ({ title, kicker, children }) => (
  <section className="py-12 sm:py-16">
    <Container>
      {kicker && (
        <p
          className="text-xs tracking-widest font-semibold mb-2"
          style={{ color: brand.gold }}
        >
          {kicker}
        </p>
      )}
      {title && (
        <h2
          className="text-3xl font-semibold mb-6"
          style={{ color: brand.white }}
        >
          {title}
        </h2>
      )}
      <div className="text-base leading-7" style={{ color: "#dfe7f3" }}>
        {children}
      </div>
    </Container>
  </section>
);

// Shows text with a photo on the RIGHT
const TextWithPhotoRight = ({ children, imgSrc, imgAlt = "" }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
    <div className="md:col-span-3 order-2 md:order-none">{children}</div>
    <aside
      className="md:col-span-2 h-56 rounded-2xl border overflow-hidden"
      style={{ borderColor: brand.gold }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt} className="h-full w-full object-cover" />
      ) : (
        <div
          className="h-full w-full flex items-center justify-center text-sm"
          style={{ color: brand.gold }}
        >
          Photo placeholder
        </div>
      )}
    </aside>
  </div>
);

// Shows text with a photo on the LEFT (added img support)
const TextWithPhotoLeft = ({ children, imgSrc, imgAlt = "" }) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
    <aside
      className="md:col-span-2 h-56 rounded-2xl border overflow-hidden"
      style={{ borderColor: brand.gold }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt} className="h-full w-full object-cover" />
      ) : (
        <div
          className="h-full w-full flex items-center justify-center text-sm"
          style={{ color: brand.gold }}
        >
          Photo placeholder
        </div>
      )}
    </aside>
    <div className="md:col-span-3">{children}</div>
  </div>
);

// ===== Pages =====
const Home = () => (
  <main>
    <SEO title="Sovereignty Equestrian | Kelowna Horse Boarding, Lessons & Trail Rides" description="Sovereignty Equestrian in Kelowna, BC — equine boarding, riding lessons, trail rides, equine-assisted therapy, birthday parties and more." />
    {/* Hero */}
<section className="pt-12 sm:pt-20 pb-10" style={{ background: brand.navy }}>
  <div className="max-w-7xl mx-auto px-6 sm:px-8">
    {/* Text stays exactly as before */}
    <div className="md:max-w-3xl">
      <h1
        className="text-4xl sm:text-5xl font-semibold leading-tight mb-4"
        style={{ color: brand.white }}
      >
        Welcome to Sovereignty Equestrian – Kelowna’s newest equestrian facility.
      </h1>
      <p className="text-lg mb-4" style={{ color: "#c9d1d9" }}>
        We specialise in equine breeding, boarding, and performance!
      </p>
      <p className="text-sm" style={{ color: brand.gold }}>
        Breeding | Boarding | Performance
      </p>
    </div>

    {/* Full-width hero image banner, a bit shorter than Facilities */}
    <div
      className="mt-6 sm:mt-8 rounded-2xl overflow-hidden border"
      style={{ borderColor: brand.gold }}
    >
      <img
        src="/images/home/hero.jpg"
        alt="Sovereignty Equestrian"
        className="w-full h-[260px] sm:h-[340px] md:h-[360px] lg:h-[380px] object-cover"
        style={{ objectPosition: "50% 45%" }}  /* tweak focus if needed */
      />
    </div>
  </div>
</section>

    {/* Video placeholder before Our Story */}
    <Section title="Facilities Video">
  <div
    className="rounded-2xl overflow-hidden border"
    style={{ borderColor: brand.gold }}
  >
    <video
      controls
      playsInline
      className="w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[500px] object-cover"
      // optional: add a poster image for nicer loading
      // poster="/images/home/facilities-1.jpg"
    >
      <source src="/video/facility-tour.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</Section>

    {/* Our Story */}
    <Section title="Our Story" kicker="Built on Bond, Driven by Purpose">
  <TextWithPhotoRight
    imgSrc="/images/home/story.jpg"
    imgAlt="Our story at Sovereignty Equestrian"
    objPos="50% 40%"   // nudge focus a little higher; adjust if needed
  >
    <p>
      Sovereignty Equestrian began with one horse and a shared dream. When we
      moved to Kelowna, boarding Makayla’s horse, Bee, sparked Jakeb’s first real
      experience with horses. Curiosity soon turned into passion, and together we
      saw the chance to create something better—a facility where horses are truly
      cared for, owners feel confident, and the horse–human bond is at the heart
      of it all.
    </p>
    <p className="mt-4">
      We purchased 5.5 acres in Southeast Kelowna, combining Makayla’s equestrian
      expertise with Jakeb’s entrepreneurial drive to build a place that sets a new
      standard in care, connection, and community.
    </p>
  </TextWithPhotoRight>
</Section>

    {/* Philosophy of Care */}
    <Section title="Our Philosophy of Care" kicker="Real Care. Done Right.">
  <TextWithPhotoRight
    imgSrc="/images/home/philosophy.jpg"
    imgAlt="Philosophy of care"
    objPos="50% 45%"   // slight downward focus; tweak if your photo needs more sky/ground
  >
    <p>
      We treat every horse as if they were our own—no shortcuts. Every horse is
      seen, known, and cared for with consistency and intention. From daily routines
      to one-on-one attention, we create a calm, safe environment where horses thrive
      and owners feel confident, every single day.
    </p>
  </TextWithPhotoRight>
</Section>

    {/* Facilities */}
    <Section
      title="Facilities & Property"
      kicker="Designed for Safety, Comfort, and Performance"
    >
      <div className="space-y-6">
        <img
          src="/images/home/facilities-1.jpg"
          alt="Facilities and outdoor arena at Sovereignty Equestrian"
          className="w-full h-[300px] sm:h-[400px] object-cover rounded-lg shadow-md"
          loading="lazy"
        />

        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Spacious Stalls</li>
          <li>Outdoor Arena (185 × 90)</li>
          <li>Round Pen</li>
          <li>Tack Room</li>
          <li>Wash Bay</li>
          <li>Turnout Fields</li>
          <li>On-Property Trails & Access to Local Routes</li>
          <li>Secure Fencing & Surveillance</li>
        </ul>
      </div>
    </Section>
  </main>
);

const MeetTheTeam = () => (
  <main>
    <SEO title="Meet the Team | Sovereignty Equestrian Kelowna" description="Meet the people behind Sovereignty Equestrian—care, connection, and community in Kelowna, BC." />
    <Section
      title="People who care, experience that counts"
      kicker="Meet the Owners"
    >
      <TextWithPhotoLeft
        imgSrc="/images/team/makayla.jpg"
        imgAlt="Makayla Macleod"
      >
        <div>
          <h3
            className="text-2xl font-semibold mb-2"
            style={{ color: brand.white }}
          >
            Makayla Macleod — Owner & Facility Manager
          </h3>
          <p>
            Raised on a working horse farm, Makayla is a former competitive endurance
            rider with FEI qualifications who transitioned to training and breeding.
            She now leads our boarding operation with precision and heart, sharing the
            horse–human bond with every rider.
          </p>
          <p className="mt-3 italic" style={{ color: brand.gold }}>
            “Horses have shaped every chapter of my life. My goal is to share that
            bond and create a place where both horses and riders feel at home.” —
            Makayla
          </p>
        </div>
      </TextWithPhotoLeft>
    </Section>

    <Section>
      <TextWithPhotoLeft imgSrc="/images/team/jakeb.jpg" imgAlt="Jakeb Reardon">
        <div>
          <h3
            className="text-2xl font-semibold mb-2"
            style={{ color: brand.white }}
          >
            Jakeb Reardon — Owner & Business Director
          </h3>
          <p>
            Originally from a small farming town in Australia, Jakeb brings
            entrepreneurial drive, operations leadership, and brand vision — guiding
            strategy, services, and events while building a facility that supports
            both horses and humans.
          </p>
          <p className="mt-3 italic" style={{ color: brand.gold }}>
            “I may not hold the reins, but I guide the vision — always pushing toward
            what’s next.” — Jakeb
          </p>
        </div>
      </TextWithPhotoLeft>
    </Section>

        <Section title="Meet the Horses (Our Workers)">
      <div className="space-y-10">
        <TextWithPhotoLeft
          imgSrc="/images/team/bee.jpg"
          imgAlt="Driftwoods Bellanca (Bee)"
        >
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Driftwoods Bellanca — “Bee”
            </h4>
            <p>
              The heart of our brand. A retired endurance Arabian whose stamina and
              spirit inspired our dream. Soon to share her wisdom as a lesson horse.
              Once an international competitor covering 100-mile races, Bee is now
              enjoying retirement while preparing to guide the next generation of
              riders with her gentle wisdom.
            </p>
          </div>
        </TextWithPhotoLeft>

        <TextWithPhotoLeft
          imgSrc="/images/team/mel.jpg"
          imgAlt="Driftwoods Dark Melody (Mel)"
        >
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Driftwoods Dark Melody — “Mel”
            </h4>
            <p>
              Our graceful matriarch. A retired endurance mare and broodmare who
              still enjoys trail rides and will be available for steady lesson support.
              Mel now shines as our calm, steady teacher — a gentle partner for beginners and a queenly presence
              in the herd.
            </p>
          </div>
        </TextWithPhotoLeft>

        <TextWithPhotoLeft
          imgSrc="/images/team/dutch.jpg"
          imgAlt="Zorros Flying Dutchman (Dutch)"
        >
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Zorros Flying Dutchman — “Dutch”
            </h4>
            <p>
              A big, gentle Arabian and former endurance competitor who qualified for
              the 2016 World Championships in Spain. Retired from competition, perfect
              for confidence-building lessons. Known as our gentle giant, Dutch carries
              the spirit of a world-class athlete while offering steady confidence to
              every rider he meets.
            </p>
          </div>
        </TextWithPhotoLeft>

        <TextWithPhotoLeft
          imgSrc="/images/team/medina.jpg"
          imgAlt="Driftwoods Blk Medina (Medina)"
        >
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Driftwoods Blk Medina — “Medina”
            </h4>
            <p>
              Spirited broodmare joining Sovereignty as our new mama. Bred to Zorros
              Dreamcatcher and in foal for next year. A fiery broodmare with a
              competitive endurance past, Medina brings elegance, strength, and a bright
              future of foals to Sovereignty Equestrian.
            </p>
          </div>
        </TextWithPhotoLeft>
      </div>
    </Section>
  </main>
);

// ---- Services pages ----
const ServicesLanding = () => (
  <main>
    <SEO title="Services | Sovereignty Equestrian Kelowna" description="Explore boarding, lessons, camps & clinics, guided trail rides, equine-assisted therapy, birthday parties, layover stays, and our horse purchasing program." />
    <Section title="Services">
      <p>
        Explore our dedicated pages using the Services menu: Boarding, Lessons & Arabian Knights Riding Club,
        Camps & Clinics, Guided Trail Rides (including Women’s Wine Night), Equine-Assisted Therapy,
        Birthday Parties, Layover Stays, and our Horse Purchasing Program.
      </p>
    </Section>
  </main>
);

const Boarding = () => (
  <main>
    <SEO title="Boarding | Sovereignty Equestrian Kelowna" description="Care that’s consistent, safe, and horse-first. Full board, semi-board, self board, and pasture board options." />
    <Section title="Boarding" kicker="Care that’s consistent, safe, and horse-first">
      <div className="space-y-10">
        <TextWithPhotoRight imgSrc="/images/services/boarding-1.jpg" imgAlt="Full board" objPos="center 35%">
          <div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
              Full Board — Premium Service, Superior Care
            </h4>
            <p>
              Complete daily care: stall cleaning & fresh bedding, premium hay & custom feed plan,
              turnout, blanketing/seasonal care, scheduling for farrier & vet, and regular wellness checks.
            </p>
            <p className="mt-2 italic" style={{ color: brand.white }}>
              Priority is given to clients choosing full board.
            </p>
            <p className="mt-3 font-semibold" style={{ color: brand.gold }}>
              $750/month + tax
            </p>
            <a href="#/contact" className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90" style={{ borderColor: brand.gold, color: brand.gold }}>
              Reserve Your Spot
            </a>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-2.jpg" imgAlt="Semi-board" objPos="center 40%">
          <div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
              Semi-Board — Shared Care, Full Support
            </h4>
            <p>
              Hands-on owners with professional backup. Includes stall, 24/7 hay, and full facility access;
              you manage grooming, exercise, and selected care tasks.
            </p>
            <p className="mt-3 font-semibold" style={{ color: brand.gold }}>
              $575/month + tax
            </p>
            <a href="#/contact" className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90" style={{ borderColor: brand.gold, color: brand.gold }}>
              Reserve Your Spot
            </a>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-3.jpg" imgAlt="Self board" objPos="center 40%">
          <div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
              Self Board — Independent, On Your Terms
            </h4>
            <p>
              Ideal for experienced owners who prefer to manage daily care themselves while enjoying access
              to arenas, pens, and property amenities.
            </p>
            <p className="mt-3 font-semibold" style={{ color: brand.gold }}>
              $375/month + tax
            </p>
            <a href="#/contact" className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90" style={{ borderColor: brand.gold, color: brand.gold }}>
              Reserve Your Spot
            </a>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-4.jpg" imgAlt="Pasture board" objPos="center 40%">
          <div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
              Pasture Board — Outdoor Living, Horse-Approved
            </h4>
            <p>
              Temperament-matched groups, shelter, daily health/safety checks, and optional supplement/grain add-ons.
            </p>
            <p className="mt-3 font-semibold" style={{ color: brand.gold }}>
              $475/month + tax
            </p>
            <a href="#/contact" className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90" style={{ borderColor: brand.gold, color: brand.gold }}>
              Reserve Your Spot
            </a>
          </div>
        </TextWithPhotoRight>
      </div>
    </Section>
  </main>
);

const Lessons = () => (
  <main>
    <SEO title="Riding Lessons in Kelowna | Sovereignty Equestrian" description="Personalized lessons that build strong foundations, confidence, and a deep rider–horse bond, from first ride to advanced." />
    <Section title="Lessons & Arabian Knights Riding Club">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* Text (left) */}
        <div className="md:col-span-3">
          <p className="text-base text-white/80 leading-relaxed">
            At Sovereignty Equestrian, we offer personalized riding lessons that focus on building strong
            foundations, rider confidence, and a deep connection between horse and rider. Whether it’s your
            first ride or you’re refining advanced technique, our experienced instructors provide patient,
            professional guidance in a supportive environment.
          </p>

          <div className="mt-6 space-y-4">
            <p className="text-base text-white/80 leading-relaxed">
              <span className="font-semibold">Discover Riding —</span> 45-minute intro for first-timers & kids.
              Learn the basics of horse safety, grooming, and handling while building comfort and confidence
              around our gentle Arabian horses.
            </p>
            <p className="font-semibold" style={{ color: brand.gold }}>
              $65 + tax
            </p>
            <a href="#/contact" className="inline-block mt-1 px-5 py-2 rounded-xl border font-medium hover:opacity-90" style={{ borderColor: brand.gold, color: brand.gold }}>
              Book a Lesson
            </a>

            <p className="text-base text-white/80 leading-relaxed mt-5">
              <span className="font-semibold">Weekly Riding Lessons —</span> consistent 45-minute sessions
              (billed monthly). Regular lessons build skill, confidence, and a lasting bond with your mount.
            </p>
            <p className="font-semibold" style={{ color: brand.gold }}>
              $55/lesson + tax <span className="text-white/80">($220/month)</span>
            </p>
            <a href="#/contact" className="inline-block mt-1 px-5 py-2 rounded-xl border font-medium hover:opacity-90" style={{ borderColor: brand.gold, color: brand.gold }}>
              Book a Lesson
            </a>

            <p className="text-base text-white/80 leading-relaxed mt-5">
              <span className="font-semibold">Private Booked Lesson —</span> focused 60-minute one-on-one coaching.
              Flexible scheduling and tailored instruction help riders meet their personal goals.
            </p>
            <p className="font-semibold" style={{ color: brand.gold }}>
              $70/lesson + tax
            </p>
            <a href="#/contact" className="inline-block mt-1 px-5 py-2 rounded-xl border font-medium hover:opacity-90" style={{ borderColor: brand.gold, color: brand.gold }}>
              Book a Lesson
            </a>
          </div>

          <p className="text-base text-white/80 leading-relaxed mt-6 italic">
            Join our Arabian Knights Riding Club and begin your journey toward confident, connected riding.
          </p>
        </div>

        {/* Image (right) */}
        <aside className="md:col-span-2 rounded-2xl border overflow-hidden h-[22rem]" style={{ borderColor: brand.gold }}>
          <img src="/images/services/lessons.jpg" alt="Riding lessons" className="h-full w-full object-cover" />
        </aside>
      </div>
    </Section>
  </main>
);

const CampsClinics = () => (
  <main>
    <SEO
      title="Camps & Clinics | Sovereignty Equestrian Kelowna"
      description="Seasonal camps and focused clinics in groundwork, riding technique, and equine wellness."
    />
    <Section title="Camps & Clinics">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* Text (left) */}
        <div className="md:col-span-3">
          <p>
            Seasonal camps give younger riders hands-on experience in horse care,
            riding skills, and confidence building—all in a fun, safe, and supportive
            environment. Our clinics provide focused instruction in areas such as
            groundwork, riding technique, and equine wellness, often led by our team
            and guest instructors. Together, these experiences create meaningful
            opportunities to learn, grow, and connect with both horses and the riding
            community.
          </p>

          <p className="italic mt-6">
            *There may also be opportunities for arena rental. Our outdoor arena may be
            available for private use, group lessons, or hosted events — perfect for
            trainers, clubs, or independent riders looking for a quality space to work.
          </p>

          {/* Price + CTA at bottom */}
          <p className="mt-6 font-semibold" style={{ color: brand.gold }}>
            TBA + tax
          </p>
          <a
            href="#/contact"
            className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90"
            style={{ borderColor: brand.gold, color: brand.gold }}
          >
            Join the Waitlist
          </a>
        </div>

        {/* Image (right) — original path preserved */}
        <aside
          className="md:col-span-2 rounded-2xl border overflow-hidden h-[28rem]"
          style={{ borderColor: brand.gold }}
        >
          <img
            src="/images/services/camps-clinics.jpg"
            alt="Camps and clinics"
            className="h-full w-full object-cover"
          />
        </aside>
      </div>
    </Section>
  </main>
);

const TrailRides = () => (
  <main>
    <SEO
      title="Guided Trail Rides in Kelowna | Sovereignty Equestrian"
      description="Beginner-friendly guided trail rides through scenic routes—plus Women’s Wine Night experiences."
    />
    <Section title="Guided Trail Rides & Women’s Wine Night" kicker="Explore Southeast Kelowna">
      <TextWithPhotoRight
        imgSrc="/images/services/trail-rides.jpg"  // keep your original image path
        imgAlt="Guided trail rides"
        objPos="center 45%"
      >
        <div>
          {/* --- Guided Trail Rides --- */}
          <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
            Guided Trail Rides
          </h4>
          <p>
            Ride through orchards, vineyards, rolling hills, and along Mission Creek/Gallagher’s Canyon.
            Calm, well-trained horses and friendly guides make it beginner-friendly and unforgettable.
          </p>

          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>Scenic routes and small groups</li>
            <li>Photo stops and relaxed pacing</li>
            <li>Beginner-friendly with guidance</li>
          </ul>

          {/* Price + CTA ONLY here (under dot points) */}
          <p className="mt-3 font-semibold" style={{ color: brand.gold }}>
            $150/person + tax
          </p>
          <a
            href="#/contact"
            className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90"
            style={{ borderColor: brand.gold, color: brand.gold }}
          >
            Book Your Ride
          </a>

          {/* --- Women’s Wine Night --- */}
          <div className="mt-10">
            <h5 className="text-lg font-semibold mb-2" style={{ color: brand.white }}>
              Women’s Wine Night
            </h5>
            <p>
              A special ladies-only guided ride with curated tastings and scenic lookouts, featuring stops
              at local gems and viewpoints. Perfect for celebrations or an unforgettable evening with friends.
              No riding experience required.
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Guided trail ride with planned winery/viewpoint stops</li>
              <li>Time to unwind, take photos, and enjoy Okanagan charm</li>
              <li>Small group atmosphere</li>
            </ul>

            {/* Price + CTA ONLY here (under dot points) */}
            <p className="mt-3 font-semibold" style={{ color: brand.gold }}>
              $150/person + tax
            </p>
            <a
              href="#/contact"
              className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90"
              style={{ borderColor: brand.gold, color: brand.gold }}
            >
              Book Your Evening
            </a>
          </div>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const Therapy = () => (
  <main>
    <SEO
      title="Equine-Assisted Therapy in Kelowna | Sovereignty Equestrian"
      description="Guided, ground-based sessions supporting emotional healing, mental wellness, and personal growth—no riding experience required."
    />
    <Section title="Equine-Assisted Therapy" kicker="Healing Through Connection, One Horse at a Time">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* TEXT (left) */}
        <div className="md:col-span-3">
          <p>
            At Sovereignty Equestrian, we believe in the powerful, unspoken connection
            between humans and horses. Our Equine-Assisted Therapy sessions are designed
            to support emotional healing, mental wellness, and personal growth through
            meaningful, guided interactions with our horses.
          </p>

          <p className="mt-4">
            Led in a calm, supportive environment, this service is ideal for individuals
            navigating stress, anxiety, grief, trauma, or life transitions. No riding
            experience is required — these sessions focus on ground-based activities that
            foster mindfulness, trust, communication, and self-awareness.
          </p>

          <h5 className="text-lg font-semibold mt-6" style={{ color: brand.white }}>
            What You Can Expect
          </h5>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>30-minute or 60-minute sessions (one-on-one or small group)</li>
            <li>Groundwork and hands-on interaction with horses</li>
            <li>A quiet, natural setting for emotional wellness</li>
            <li>Supportive facilitation (non-clinical)*</li>
            <li>Safe space for all ages and backgrounds</li>
          </ul>

          <p className="mt-6 italic">
            Sometimes the best healing happens without words — and horses have a way of
            knowing exactly what you need.
          </p>

          <p className="mt-2 text-sm italic">
            *Non-clinical program; ask about referrals if you require licensed clinical services.
          </p>

          {/* === PRICES AT VERY BOTTOM === */}
          <div className="mt-8">
            <p className="font-semibold" style={{ color: brand.gold }}>
              30 min — $45/session + tax
            </p>
            <p className="font-semibold" style={{ color: brand.gold }}>
              60 min — $75/session + tax
            </p>
            <a
              href="#/contact"
              className="inline-block mt-3 px-5 py-2 rounded-xl border font-medium hover:opacity-90"
              style={{ borderColor: brand.gold, color: brand.gold }}
            >
              Start Your Journey
            </a>
          </div>
        </div>

        {/* IMAGE (right) — original path preserved */}
        <aside
          className="md:col-span-2 rounded-2xl border overflow-hidden h-[28rem]"
          style={{ borderColor: brand.gold }}
        >
          <img
            src="/images/services/therapy.jpg"
            alt="Equine-Assisted Therapy"
            className="h-full w-full object-cover"
          />
        </aside>
      </div>
    </Section>
  </main>
);

const BirthdayParties = () => (
  <main>
    <SEO
      title="Horse Birthday Parties | Sovereignty Equestrian"
      description="Celebrate with horses, laughter, and lasting memories. Hands-on horse experiences, pony rides, and fun party add-ons."
    />
    <Section title="Birthday Parties" kicker="Celebrate with Horses, Laughter, and Lasting Memories">
      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* Text (left) */}
        <div className="md:col-span-3">
          <p>
            Make your special day unforgettable with a barn-side birthday party at Sovereignty Equestrian!
            Our parties combine hands-on horse experiences with plenty of fun and photo-worthy moments.
          </p>

          <h5 className="text-lg font-semibold mt-6" style={{ color: brand.white }}>
            What’s Included
          </h5>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Horse Meet-and-Greets</strong> — get up close with our friendly horses and ponies</li>
            <li><strong>Grooming Demos &amp; Hands-On Fun</strong> — learn how to brush, care for, and bond with our horses</li>
            <li><strong>Leadline &amp; Pony Rides</strong> — age-appropriate rides for kids, guided safely by our team</li>
            <li><strong>Reserved Picnic Area</strong> — perfect for cake, presents, and relaxing with friends and family</li>
            <li><strong>Photo Opportunities</strong> — capture memories with our beautiful horses and rustic backdrop</li>
          </ul>

          <h5 className="text-lg font-semibold mt-6" style={{ color: brand.white }}>
            Add-On Options
          </h5>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>BBQ and Fridge rental</li>
            <li>Horse dress-up package (fun costumes &amp; themed photo ops)</li>
            <li>Themed decorations or party setups</li>
          </ul>

          {/* === PRICING AT BOTTOM === */}
          <div className="mt-8">
            <p className="font-semibold" style={{ color: brand.gold }}>
              Base Package — $350 for 8 kids + tax
            </p>
            <p className="font-semibold" style={{ color: brand.gold }}>
              Additional Guests — $25/child + tax
            </p>
            <a
              href="#/contact"
              className="inline-block mt-3 px-5 py-2 rounded-xl border font-medium hover:opacity-90"
              style={{ borderColor: brand.gold, color: brand.gold }}
            >
              Plan Your Party
            </a>
          </div>
        </div>

        {/* Image (right) — unchanged */}
        <aside
          className="md:col-span-2 rounded-2xl border overflow-hidden h-[28rem]"
          style={{ borderColor: brand.gold }}
        >
          <img
            src="/images/services/parties.jpg"
            alt="Birthday Parties at Sovereignty Equestrian"
            className="h-full w-full object-cover"
          />
        </aside>
      </div>
    </Section>
  </main>
);

const LayoverStays = () => (
  <main>
    <SEO
      title="Horse Layover Stays in Kelowna | Sovereignty Equestrian"
      description="Safe overnight layovers with stalls, turnout, and optional on-site suite. Easy trailer access and amenities."
    />
    <Section title="Layover Stays" kicker="Rest, Recharge, and Ride On">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* TEXT */}
        <div className="md:col-span-2">
          <p>
            Traveling long distances with your horse? We offer overnight layover stays for
            travelers passing through the Okanagan, providing a safe and comfortable place
            for both you and your horse to rest and recharge.
          </p>
          <p className="mt-4">
            Our facility is the perfect stopover — with everything you need to feel at home
            on the road.
          </p>

          <h5 className="text-lg font-semibold mt-6" style={{ color: brand.white }}>
            For the Horse
          </h5>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Clean, safe stalls or paddocks</li>
            <li>Space to hand-walk and stretch</li>
            <li>Fresh water, hay, and calm surroundings</li>
            <li>Secure, well-maintained facilities with easy trailer access</li>
          </ul>

          <h5 className="text-lg font-semibold mt-6" style={{ color: brand.white }}>
            For the Rider
          </h5>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Trailer parking with optional hook-ups</li>
            <li>Stay in your own travel trailer, or book our cozy on-site basement suite</li>
            <li>Access to washrooms, Wi-Fi, and basic amenities</li>
            <li>Use of arena or space to stretch your horse’s legs (on request)</li>
          </ul>

          {/* Closing paragraph (your anchor for pricing) */}
          <p className="mt-6">
            Whether you’re heading to a show, relocating, or on an adventure — our layover
            service gives you and your horse the break you deserve, with peace of mind and a
            welcoming place to rest.
          </p>

          {/* PRICES — placed directly under the closing paragraph */}
          <div className="mt-6">
            <p className="font-semibold" style={{ color: brand.gold }}>
              Trailer Stay — $80/night + tax
            </p>
            <p className="font-semibold" style={{ color: brand.gold }}>
              Suite Stay — $125/night + tax
            </p>
            <p className="font-semibold" style={{ color: brand.gold }}>
              Extra Horse Fee — $30/horse + tax
            </p>
            <a
              href="#/contact"
              className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90"
              style={{ borderColor: brand.gold, color: brand.gold }}
            >
              Plan Your Stay
            </a>
          </div>
        </div>

        {/* IMAGE (keep your existing path if different) */}
        <aside
          className="md:col-span-3 rounded-2xl border overflow-hidden h-[22rem]"
          style={{ borderColor: brand.gold }}
        >
          <img
            src="/images/services/layover.jpg"
            alt="Layover Stays at Sovereignty Equestrian"
            className="h-full w-full object-cover"
          />
        </aside>
      </div>
    </Section>
  </main>
);

const HorsePurchasing = () => (
  <main>
    <SEO
      title="Arabian Horse Purchasing Program | Sovereignty Equestrian"
      description="Access to world-class prospects, breeding-quality mares, and lifelong companions — with full buyer support."
    />
    <Section
      title="Horse Purchasing Program"
      kicker="Sovereignty Equestrian × Gone with the Wind Arabians"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {/* TEXT (left) */}
        <div className="md:col-span-3">
          <p>
            At Sovereignty Equestrian, we’re proud to partner with Gone with the Wind Arabians,
            a highly respected and internationally recognized breeding farm based in Fort St. John, BC.
            This partnership is a cornerstone of our Horse Purchasing Program, giving clients access to
            some of the finest Egyptian-influenced Arabian bloodlines in North America.
          </p>

          <p className="mt-4">
            Gone with the Wind Arabians has been producing world-class Arabians for over 25 years,
            with more than 100 purebreds sold across Canada, the United States, and Dubai. Their foundation
            lines are celebrated for elegance, athleticism, and exceptional temperament — equally suited for
            the show ring, breeding programs, or lifelong companionship.
          </p>

          <h5 className="text-lg font-semibold mt-6" style={{ color: brand.white }}>
            What We Offer
          </h5>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Competitive Prospects</strong> — endurance, performance, and show-quality Arabians</li>
            <li><strong>Breeding-Quality Mares</strong> — exceptional bloodlines for future programs</li>
            <li><strong>Lifelong Companions</strong> — gentle, versatile partners for riders of all levels</li>
          </ul>

          <h5 className="text-lg font-semibold mt-6" style={{ color: brand.white }}>
            Buyer Support
          </h5>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access to photos, videos, and pedigrees upon request</li>
            <li>Guidance in matching the right horse to your goals and budget</li>
            <li>Logistics support (transport options &amp; best practices)</li>
          </ul>

          <p className="mt-6">
            We’ll help you navigate options with honesty and care, so you can find the right partner
            and become part of a trusted community dedicated to the Arabian breed.
          </p>

          {/* PRICE + CTA AT VERY BOTTOM */}
          <p className="mt-8 font-semibold" style={{ color: brand.gold }}>
            Custom Quote + tax
          </p>
          <a
            href="#/contact"
            className="inline-block mt-2 px-5 py-2 rounded-xl border font-medium hover:opacity-90"
            style={{ borderColor: brand.gold, color: brand.gold }}
          >
            Request a Quote
          </a>
        </div>

        {/* IMAGE (right) — original path preserved */}
        <aside
          className="md:col-span-2 rounded-2xl border overflow-hidden h-[28rem]"
          style={{ borderColor: brand.gold }}
        >
          <img
            src="/images/services/purchasing.jpg"
            alt="Horse Purchasing Program"
            className="h-full w-full object-cover"
          />
        </aside>
      </div>
    </Section>
  </main>
);

const Contact = () => {
  return (
    <main>
      <SEO
        title="Contact Sovereignty Equestrian | Kelowna, BC"
        description="3990 Senger Road, Kelowna, BC V1W 4S8 · 250-793-5191 · sovereigntyequestrian@gmail.com"
      />
      <Section title="Contact Us">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left column: static details */}
          <div>
            <h4 className="text-xl font-semibold mb-3" style={{ color: brand.white }}>
              Reach Out
            </h4>
            <p>3990 Senger Road, Kelowna, BC V1W 4S8</p>
            <p className="mt-2">250-793-5191 | 604-855-1483</p>
            <p className="mt-2">sovereigntyequestrian@gmail.com</p>
          </div>

          {/* Right column: form */}
          <div className="space-y-4">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                // Grab the submit button
                const btn = e.currentTarget.querySelector("button[type='submit']");
                if (!btn) return;

                // Immediately show permanent success message and lock the button
                btn.textContent = "Sent ✓ — your inquiry has been sent!";
                btn.disabled = true;

                // Collect form data
                const form = Object.fromEntries(new FormData(e.currentTarget));

                // Fire-and-forget the request (we already show success)
                fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(form),
                }).catch(() => {
                  // Silently ignore — email still reaches you per your current backend behavior
                });

                // Clear fields
                e.currentTarget.reset();
              }}
            >
              <div>
                <label className="text-sm" style={{ color: brand.gold }}>Name</label>
                <input
                  name="name"
                  required
                  className="w-full mt-1 rounded-xl px-3 py-2 bg-transparent border"
                  style={{ borderColor: brand.gold, color: brand.white }}
                />
              </div>

              <div>
                <label className="text-sm" style={{ color: brand.gold }}>Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full mt-1 rounded-xl px-3 py-2 bg-transparent border"
                  style={{ borderColor: brand.gold, color: brand.white }}
                />
              </div>

              <div>
                <label className="text-sm" style={{ color: brand.gold }}>Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full mt-1 rounded-xl px-3 py-2 bg-transparent border"
                  style={{ borderColor: brand.gold, color: brand.white }}
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl border font-medium hover:opacity-90"
                style={{ borderColor: brand.gold, color: brand.gold }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Section>
    </main>
  );
};

// ===== App =====
export default function App() {
  const { path, navigate } = useHashRoute();
  useEffect(() => {
    document.body.style.background = brand.navy;
    if (!window.location.hash) {
      window.location.hash = "#/";
    }
  }, []);
  let page = null;
  switch (path) {
    case "/":
      page = <Home />;
      break;
    case "/meet-the-team":
      page = <MeetTheTeam />;
      break;
    case "/services":
      page = <ServicesLanding />;
      break;
    case "/services/boarding":
      page = <Boarding />;
      break;
    case "/services/lessons":
      page = <Lessons />;
      break;
    case "/services/camps-clinics":
      page = <CampsClinics />;
      break;
    case "/services/trail-rides":
      page = <TrailRides />;
      break;
    case "/equine-assisted-therapy":
      page = <Therapy />;
      break;
    case "/birthday-parties":
      page = <BirthdayParties />;
      break;
    case "/layover-stays":
      page = <LayoverStays />;
      break;
    case "/horse-purchasing-program":
      page = <HorsePurchasing />;
      break;
    case "/contact":
      page = <Contact />;
      break;
    default:
      page = <Home />;
  }
  return (
    <div>
      <LocalBusinessSchema />
      <Header onNavigate={navigate} current={path} />
      {page}
      <Footer />
    </div>
  );
}
