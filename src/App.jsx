import React, { useEffect, useState } from "react";

// ===== Brand & Assets =====
const LOGO = "/logo.png";
const brand = {
  navy: "#0b1733",
  gold: "#d4af37",
  black: "#111111",
  white: "#ffffff",
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
              className="h-12 w-12 object-contain"
            />
            <div className="leading-tight">
              <div
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: brand.white }}
              >
                Sovereignty Equestrian
              </div>
              <div className="text-xs sm:text-sm" style={{ color: brand.gold }}>
                Why Follow When You Can Lead
              </div>
            </div>
          </a>
          <nav className="ml-auto">
            <ul className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              {[
                { label: "Home", to: "#/" },
                { label: "Meet the Team", to: "#/meet-the-team" },
              ].map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.to);
                    }}
                    className={`px-3 py-2 rounded-md inline-block hover:opacity-90 ${
                      current === item.to.replace("#", "") ? "ring-1" : ""
                    }`}
                    style={{ color: brand.white }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {/* Services with dropdown */}
              <li className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  className="px-3 py-2 rounded-md inline-flex items-center gap-1"
                  style={{ color: brand.white }}
                  onClick={() => setOpen((v) => !v)}
                >
                  Services <ChevronDown className="h-4 w-4" />
                </button>
                {open && (
                  <div
                    className="absolute mt-2 w-56 rounded-xl shadow-lg p-2"
                    style={{
                      background: brand.black,
                      border: `1px solid ${brand.gold}`,
                    }}
                  >
                    {[
                      { label: "Boarding", to: "#/services/boarding" },
                      { label: "Lessons", to: "#/services/lessons" },
                      { label: "Camps & Clinics", to: "#/services/camps-clinics" },
                      {
                        label: "Trail Rides (Women’s Wine Night)",
                        to: "#/services/trail-rides",
                      },
                    ].map((s) => (
                      <a
                        key={s.to}
                        href={s.to}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(s.to);
                          setOpen(false);
                        }}
                        className="block px-3 py-2 rounded-lg hover:opacity-90"
                        style={{ color: brand.white }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
              {[
                { label: "Equine Assisted Therapy", to: "#/equine-assisted-therapy" },
                { label: "Birthday Parties", to: "#/birthday-parties" },
                { label: "Layover Stays", to: "#/layover-stays" },
                { label: "Horse Purchasing Program", to: "#/horse-purchasing-program" },
                { label: "Contact Us", to: "#/contact" },
              ].map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.to);
                    }}
                    className={`px-3 py-2 rounded-md inline-block hover:opacity-90 ${
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
    {/* Hero */}
    <section className="pt-12 sm:pt-20 pb-10" style={{ background: brand.navy }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="col-span-2">
            <h1
              className="text-4xl sm:text-5xl font-semibold mb-4"
              style={{ color: brand.white }}
            >
              Welcome to Sovereignty Equestrian – Kelowna’s newest equestrian
              facility.
            </h1>
            <p className="text-lg mb-4" style={{ color: "#c9d1d9" }}>
              We specialise in equine breeding, boarding, and performance!
            </p>
            <p className="text-sm" style={{ color: brand.gold }}>
              Breeding | Boarding | Performance
            </p>
          </div>
          <div>
            <img
              src="/images/home/hero.jpg"
              alt="Sovereignty Equestrian"
              className="w-full h-full object-cover rounded-2xl overflow-hidden border"
              style={{ borderColor: brand.gold }}
            />
          </div>
        </div>
      </div>
    </section>

    {/* Video placeholder before Our Story */}
    <Section title="Facilities Video">
      <video controls className="w-full aspect-video rounded-2xl">
        <source src="/video/facility-tour.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Section>

    {/* Our Story */}
    <Section title="Our Story" kicker="Built on Bond, Driven by Purpose">
      <TextWithPhotoRight imgSrc="/images/home/story.jpg" imgAlt="Our story">
        <p>
          Sovereignty Equestrian began with one horse and a shared dream. When we
          moved to Kelowna, boarding Makayla’s horse, Bee, sparked Jakeb’s first real
          experience with horses. Curiosity soon turned into passion, and together we
          saw the chance to create something better—a facility where horses are truly
          cared for, owners feel confident, and the horse-human bond is at the heart
          of it all.
        </p>
        <p className="mt-4">
          We purchased 5.5 acres in Southeast Kelowna, combining Makayla’s equestrian
          expertise with Jakeb’s entrepreneurial drive to build a place that sets a new
          standard in care, connection, and community. Whether you’re boarding, riding,
          or joining our programs, our goal is to share the same incredible experiences
          we’ve had with horses like Bee—and give every rider and horse a place they’re
          proud to call home.
        </p>
      </TextWithPhotoRight>
    </Section>

    {/* Philosophy of Care */}
    <Section title="Our Philosophy of Care" kicker="Real Care. Done Right.">
      <TextWithPhotoRight imgSrc="/images/home/philosophy.jpg" imgAlt="Philosophy of care">
        <p>
          We treat every horse as if they were our own — no shortcuts. Every horse is
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
          <li>Spacious stalls</li>
          <li>Outdoor arena (185 × 90)</li>
          <li>Round pens</li>
          <li>Tack room</li>
          <li>Wash bays</li>
          <li>Turnout fields</li>
          <li>On-property trails & access to local routes</li>
          <li>Secure fencing & surveillance</li>
        </ul>
      </div>
    </Section>
  </main>
);

const MeetTheTeam = () => (
  <main>
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
              for confidence-building lessons.
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
              Dreamcatcher and in foal for next year.
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
    <Section title="Services">
      <p>
        Explore our dedicated pages using the Services menu: Boarding, Lessons &
        Arabian Knights Riding Club, Camps & Clinics, and Guided Trail Rides
        (including Women’s Wine Night).
      </p>
    </Section>
  </main>
);

const Boarding = () => (
  <main>
    <Section title="Boarding">
      <div className="space-y-10">
        <TextWithPhotoRight imgSrc="/images/services/boarding-1.jpg" imgAlt="Full board">
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Full Board — Premium Service, Superior Care
            </h4>
            <p>
              Complete care for busy owners: daily stall cleaning, fresh bedding,
              premium hay & custom feeding, daily turnout, blanketing and seasonal
              care, scheduling for farrier/vet, and regular wellness checks.
              <em> Priority is given to clients interested in full boarding.</em>
            </p>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-2.jpg" imgAlt="Semi-board">
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Semi-Board — Shared Care, Full Support
            </h4>
            <p>
              For owners who want hands-on involvement with professional support.
              Includes stall/paddock, 24/7 hay, facility access; owner manages
              grooming, exercise, and selected care.
            </p>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-3.jpg" imgAlt="Self board">
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Self Board — Independent, On Your Terms
            </h4>
            <p>
              Ideal for experienced owners who manage all daily care. Access to
              facilities; feed, bedding, and supplies are owner-provided.
            </p>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-4.jpg" imgAlt="Pasture board">
          <div>
            <h4
              className="text-xl font-semibold mb-2"
              style={{ color: brand.white }}
            >
              Pasture Board — Outdoor Living, Horse-Approved
            </h4>
            <p>
              Group pasture (temperament-based), grass access, shelter, daily health
              & safety checks, and optional supplement/grain feeding add-on.
            </p>
          </div>
        </TextWithPhotoRight>
      </div>
    </Section>
  </main>
);

const Lessons = () => (
  <main>
    <Section title="Lessons & Arabian Knights Riding Club">
      <TextWithPhotoRight imgSrc="/images/services/lessons.jpg" imgAlt="Lessons">
        <div>
          <p>
            Personalized lessons that build strong foundations, confidence, and a
            deep rider–horse connection. Beginners to advanced — with the option to
            choose your horse and grow together.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>
              Discover Riding — introductory 45-minute session for first-timers and kids.
            </li>
            <li>
              Weekly Riding Lessons — consistent, skill-building 45-minute sessions (billed monthly).
            </li>
            <li>
              Private Booked Lesson — focused 60-minute one-on-one coaching, flexible scheduling.
            </li>
          </ul>
          <p className="mt-4">
            Every lesson includes horsemanship: grooming & care, tacking, groundwork,
            and riding fundamentals — scaling up as you progress.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const CampsClinics = () => (
  <main>
    <Section title="Camps & Clinics">
      <TextWithPhotoRight imgSrc="/images/services/camps-clinics.jpg" imgAlt="Camps and clinics">
        <div>
          <p>
            Seasonal camps for younger riders and beginners focus on hands-on learning,
            horse care, riding skills, and building positive relationships with horses.
            Clinics target specific skills like groundwork, technique, or equine wellness —
            led by our team and guest instructors.
          </p>
          <p className="mt-4">
            Our outdoor arena may be available for private use, group lessons, or hosted
            events. Ask about upcoming dates and availability.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const TrailRides = () => (
  <main>
    <Section
      title="Guided Trail Rides & Women’s Wine Night"
      kicker="Explore Southeast Kelowna"
    >
      <TextWithPhotoRight imgSrc="/images/services/trail-rides.jpg" imgAlt="Guided trail rides">
        <div>
          <p>
            Ride through orchards, vineyards, rolling hills, and along Mission
            Creek/Gallagher’s Canyon. Suitable for beginners to experienced riders,
            with calm, well-trained horses and friendly guides.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>Scenic routes and small group sizes</li>
            <li>Beginner-friendly with guidance and photo stops</li>
            <li>Relaxed, immersive connection with nature</li>
          </ul>
          <h4
            className="text-xl font-semibold mt-8 mb-2"
            style={{ color: brand.white }}
          >
            Women’s Wine Night
          </h4>
          <p>
            A special ladies-only guided ride with curated tastings and scenic
            lookouts, featuring stops at local gems and viewpoints. Perfect for
            celebrations or an unforgettable evening with friends. No riding
            experience required.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>Guided trail ride with planned winery/viewpoint stops</li>
            <li>Time to unwind, take photos, and enjoy Okanagan charm</li>
            <li>Small-group atmosphere</li>
          </ul>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const Therapy = () => (
  <main>
    <Section
      title="Equine-Assisted Therapy"
      kicker="Healing through connection, one horse at a time"
    >
      <TextWithPhotoRight imgSrc="/images/services/therapy.jpg" imgAlt="Equine therapy">
        <div>
          <p>
            Ground-based sessions that support emotional healing, mindfulness, trust,
            and self-awareness in a calm, supportive environment. Ideal for those
            navigating stress, anxiety, grief, trauma, or life transitions. No riding
            experience required.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>One-on-one or small group sessions</li>
            <li>Hands-on interaction and groundwork</li>
            <li>Non-clinical supportive facilitation*</li>
          </ul>
          <p className="text-sm mt-4" style={{ color: brand.gold }}>
            *Non-clinical program; ask about referrals if you require licensed clinical
            services.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const BirthdayParties = () => (
  <main>
    <Section title="Birthday Parties">
      <TextWithPhotoRight imgSrc="/images/services/parties.jpg" imgAlt="Birthday parties">
        <div>
          <p>
            Celebrate with an unforgettable barn-side experience. Parties can include
            meet-and-greet with our horses, grooming demos, photo moments, guided
            pony/leadline rides (age-appropriate), and reserved time in our picnic area.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const LayoverStays = () => (
  <main>
    <Section title="Layover Stays" kicker="Rest, recharge, and ride on">
      <TextWithPhotoRight imgSrc="/images/services/layover.jpg" imgAlt="Layover stays">
        <div>
          <p>
            Safe, comfortable overnight stays for travelers with horses. Clean stalls
            or turnout paddocks, fresh water and hay, secure facilities, and options
            for human accommodations (travel-trailer parking or a cozy onsite suite)
            plus access to amenities.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const HorsePurchasing = () => (
  <main>
    <Section title="Horse Purchasing Program">
      <TextWithPhotoRight imgSrc="/images/services/purchasing.jpg" imgAlt="Horse purchasing program">
        <div>
          <p>
            We partner with Gone with the Wind Arabians (Fort St. John, BC) — a respected
            breeder with 25+ years producing Egyptian-influenced purebred Arabians renowned
            for elegance, athleticism, and temperament. Horses placed across Canada, the U.S.,
            and abroad.
          </p>
          <p className="mt-4">
            This collaboration gives you access to world-class prospects — from competitive
            partners to breeding-quality mares to lifelong companions. Ask about available
            horses, photos, pedigrees, and viewing.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const Contact = () => (
  <main>
    <Section title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h4
            className="text-xl font-semibold mb-3"
            style={{ color: brand.white }}
          >
            Reach Out
          </h4>
          <p>3990 Senger Road, Kelowna, BC V1W 4S8</p>
          <p className="mt-2">250-793-5191 | 604-855-1483</p>
          <p className="mt-2">sovereigntyequestrian@gmail.com</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="text-sm" style={{ color: brand.gold }}>
              Name
            </label>
            <input
              className="w-full mt-1 rounded-xl px-3 py-2 bg-transparent border"
              style={{ borderColor: brand.gold, color: brand.white }}
            />
          </div>
          <div>
            <label className="text-sm" style={{ color: brand.gold }}>
              Email
            </label>
            <input
              className="w-full mt-1 rounded-xl px-3 py-2 bg-transparent border"
              style={{ borderColor: brand.gold, color: brand.white }}
            />
          </div>
          <div>
            <label className="text-sm" style={{ color: brand.gold }}>
              Message
            </label>
            <textarea
              rows={5}
              className="w-full mt-1 rounded-xl px-3 py-2 bg-transparent border"
              style={{ borderColor: brand.gold, color: brand.white }}
            />
          </div>
          <button
            type="button"
            className="px-5 py-2 rounded-xl border font-medium hover:opacity-90"
            style={{ borderColor: brand.gold, color: brand.gold }}
          >
            Submit
          </button>
        </form>
      </div>
    </Section>
  </main>
);

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
      <Header onNavigate={navigate} current={path} />
      {page}
      <Footer />
    </div>
  );
}
