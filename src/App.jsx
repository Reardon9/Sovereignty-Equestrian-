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
  className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
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
      <video controls className="w-full aspect-video rounded-2xl">
        <source src="/video/facility-tour.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
              A former endurance competitor and broodmare, Mel now shines as our calm,
              steady teacher — a gentle partner for beginners and a queenly presence
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
              <em> Priority for clients choosing full board.</em>
            </p>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-2.jpg" imgAlt="Semi-board" objPos="center 40%">
          <div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
              Semi-Board — Shared Care, Full Support
            </h4>
            <p>
              Hands-on owners with professional backup. Includes stall/paddock, 24/7 hay, and full facility access;
              you manage grooming, exercise, and selected care tasks.
            </p>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-3.jpg" imgAlt="Self board" objPos="center 50%">
          <div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
              Self Board — Independent, On Your Terms
            </h4>
            <p>
              Ideal for experienced owners who prefer to manage daily care themselves while enjoying
              access to arenas, pens, and property amenities.
            </p>
          </div>
        </TextWithPhotoRight>

        <TextWithPhotoRight imgSrc="/images/services/boarding-4.jpg" imgAlt="Pasture board" objPos="center 45%">
          <div>
            <h4 className="text-xl font-semibold mb-2" style={{ color: brand.white }}>
              Pasture Board — Outdoor Living, Horse-Approved
            </h4>
            <p>
              Temperament-matched groups, shelter, daily health/safety checks, and optional supplement/grain add-ons.
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
      <TextWithPhotoRight imgSrc="/images/services/lessons.jpg" imgAlt="Riding lessons" objPos="center 35%">
        <div>
          <p>
            Personalized lessons building strong foundations, confidence, and a deep rider–horse connection.
            From first ride to advanced, with the option to choose your mount and grow together.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>Discover Riding — 45-minute intro for first-timers & kids</li>
            <li>Weekly Riding Lessons — consistent 45-minute sessions (billed monthly)</li>
            <li>Private Booked Lesson — focused 60-minute one-on-one coaching</li>
          </ul>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const CampsClinics = () => (
  <main>
    <Section title="Camps & Clinics">
      <TextWithPhotoRight imgSrc="/images/services/camps-clinics.jpg" imgAlt="Camps and clinics" objPos="center 40%">
        <div>
          <p>
            Seasonal camps for younger riders focus on hands-on horse care and confidence.
            Clinics target specific skills like groundwork, technique, or wellness — led by our team and guests.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const TrailRides = () => (
  <main>
    <Section title="Guided Trail Rides & Women’s Wine Night" kicker="Explore Southeast Kelowna">
      <TextWithPhotoRight imgSrc="/images/services/trail-rides.jpg" imgAlt="Guided trail rides" objPos="center 45%">
        <div>
          <p>
            Ride through orchards, vineyards, rolling hills, and along Mission Creek/Gallagher’s Canyon.
            Calm, well-trained horses and friendly guides make it beginner-friendly and unforgettable.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>Scenic routes and small groups</li>
            <li>Photo stops and relaxed pacing</li>
            <li>Beginner-friendly with guidance</li>
          </ul>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const Therapy = () => (
  <main>
    <Section title="Equine-Assisted Therapy" kicker="Healing through connection, one horse at a time">
      <TextWithPhotoRight imgSrc="/images/services/therapy.jpg" imgAlt="Equine therapy" objPos="center 40%">
        <div>
          <p>
            Ground-based sessions fostering mindfulness, trust, and self-awareness in a calm, supportive setting.
            Ideal for those navigating stress, anxiety, grief, trauma, or transition. No riding required.
          </p>
          <p className="text-sm mt-4" style={{ color: brand.gold }}>
            *Non-clinical program; ask about referrals if you require licensed clinical services.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const BirthdayParties = () => (
  <main>
    <Section title="Birthday Parties">
      <TextWithPhotoRight imgSrc="/images/services/parties.jpg" imgAlt="Birthday parties" objPos="center 45%">
        <div>
          <p>
            Celebrate barn-side with horse meet-and-greets, grooming demos, photo moments, and optional
            leadline/pony rides (age-appropriate). Reserved picnic area available.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const LayoverStays = () => (
  <main>
    <Section title="Layover Stays" kicker="Rest, recharge, and ride on">
      <TextWithPhotoRight imgSrc="/images/services/layover.jpg" imgAlt="Layover stays" objPos="center 50%">
        <div>
          <p>
            Safe, comfortable overnights for travelers with horses: stalls or turnout, fresh water & hay,
            secure facilities, and options for trailer parking or a cozy onsite suite.
          </p>
        </div>
      </TextWithPhotoRight>
    </Section>
  </main>
);

const HorsePurchasing = () => (
  <main>
    <Section title="Horse Purchasing Program">
      <TextWithPhotoRight imgSrc="/images/services/purchasing.jpg" imgAlt="Horse purchasing program" objPos="center 40%">
        <div>
          <p>
            In partnership with Gone with the Wind Arabians (Fort St. John, BC) — 25+ years producing
            Egyptian-influenced purebred Arabians known for elegance, athleticism, and temperament.
          </p>
          <p className="mt-4">
            Access world-class prospects — from competitive partners to breeding-quality mares to lifelong companions.
            Ask about available horses, photos, pedigrees, and viewing.
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
