import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const GAP_PX = 24;           // must match `gap-6`
const VISIBLE_SLOTS = 5;     // 3 big in the middle, 2 small peeking

const defaultBooks = [
  // Fantasy
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    image: "/images/hobbit.jpg",
    summary: "Bilbo Baggins, a respectable, well-to-do hobbit, lives a comfortable life..."
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    year: 1968,
    image: "/images/earthsea.webp",
    summary: "The island of Gont is a land of wizards. A boy, Sparrowhawk, is born..."
  },
  {
    title: "Good Omens",
    author: "Terry Pratchett and Neil Gaiman",
    year: 1990,
    image: "/images/omens.jpg",
    summary: "According to the Nice and Accurate Prophecies of Agnes Nutter..."
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    year: 1996,
    image: "/images/thrones.jpg",
    summary: "In a land where summers can last for decades and winters a lifetime..."
  },
  // Science Fiction
  {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    image: "/images/dune.png",
    summary:
      "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides..."
  },
  {
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    year: 1949,
    image: "/images/1984.png",
    summary:
      "The year is 1984. The world is divided into three totalitarian superstates..."
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    year: 1979,
    image: "/images/hitchhiker.jpg",
    summary:
      "Arthur Dent's day goes from bad to worse when his home is demolished..."
  },
  {
    title: "Do Androids Dream of Electric Sheep?",
    author: "Philip K. Dick",
    year: 1968,
    image: "/images/android.jpg",
    summary:
      "In a post-apocalyptic San Francisco, bounty hunter Rick Deckard is tasked..."
  },
  // Romance
  {
    title: "It Ends With Us",
    author: "Colleen Hoover",
    year: 2016,
    image: "/images/EndsWithUs.png",
    summary:
      "Lily Bloom has always admired her parents' enduring love..."
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    year: 2017,
    image: "/images/SevenHusbands.jpg",
    summary:
      "Reclusive Hollywood icon Evelyn Hugo is finally ready to tell her story..."
  },
  {
    title: "Me Before You",
    author: "Jojo Moyes",
    year: 2012,
    image: "/images/MeBeforeYou.jpg",
    summary:
      "Louisa Clark is hired to care for Will Traynor, a wealthy young man..."
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    year: 2012,
    image: "/images/FaultInStars.jpg",
    summary:
      "Hazel Grace Lancaster meets Augustus Waters at a cancer support group..."
  },
  // Crime
  {
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    year: 2020,
    image: "/images/ThursdayMurder.jpg",
    summary:
      "In a peaceful retirement community, four friends meet weekly to discuss cold cases..."
  },
  {
    title: "The Silence of the Lambs",
    author: "Thomas Harris",
    year: 1988,
    image: "/images/SilenceLambs.png",
    summary:
      "FBI trainee Clarice Starling seeks help from Dr. Hannibal Lecter..."
  },
  {
    title: "The Maltese Falcon",
    author: "Dashiell Hammett",
    year: 1930,
    image: "/images/MalteseFalcon.webp",
    summary:
      "This hard-boiled classic introduces the cynical private detective Sam Spade..."
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    year: 2012,
    image: "/images/GoneGirl.jpg",
    summary:
      "On their fifth wedding anniversary, Nick Dunne's wife, Amy, disappears..."
  }
];

const Carousel = ({ items = [] }) => {
  const books = items.length ? items : defaultBooks;

  // Build a longer list so we can loop smoothly
  const extended = useMemo(() => [...books, ...books, ...books], [books]);

  // Start in the middle chunk so you can go left/right immediately
  const [index, setIndex] = useState(books.length);

  // Measurement for perfect sliding distance
  const slotRef = useRef(null);
  const [slotWidth, setSlotWidth] = useState(0);

  // Hover pause
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (slotRef.current) {
        const w = slotRef.current.getBoundingClientRect().width;
        setSlotWidth(w);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => {
      if (!isHoveredRef.current) setIndex((i) => i + 1);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  // Keep index in a safe middle range (so numbers don't grow forever)
  useEffect(() => {
    const chunk = books.length;
    if (index >= chunk * 2) setIndex((i) => i - chunk);
    if (index < chunk) setIndex((i) => i + chunk);
  }, [index, books.length]);

  // leftmost visible slot for a 5-slot viewport
  const leftMost = index - Math.floor(VISIBLE_SLOTS / 2);
  const step = slotWidth + GAP_PX;
  const offsetX = Math.max(0, leftMost * step);

  // Helper: scale/opacity based on distance from center
  const scaleClass = (i) => {
    const d = Math.abs(i - index);
    if (d <= 1) return "scale-100 opacity-100 z-30"; // 3 big (center +/-1)
    if (d === 2) return "scale-90 opacity-70 z-20";   // peeking
    if (d === 3) return "scale-85 opacity-40 z-10";
    return "scale-80 opacity-0 pointer-events-none";  // far items hidden
  };

  const handleEnter = () => (isHoveredRef.current = true);
  const handleLeave = () => (isHoveredRef.current = false);

  // Compute viewport width to exactly fit 5 slots (so peeking is clean)
  const viewportWidth =
    slotWidth > 0
      ? VISIBLE_SLOTS * slotWidth + (VISIBLE_SLOTS - 1) * GAP_PX
      : "100%";

  return (
    <div
      className="relative w-[95%] mx-auto my-14 overflow-hidden rounded-[28px] py-14"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background:
          "radial-gradient(1200px 500px at 50% 15%, rgba(70,120,255,.25), transparent 60%), radial-gradient(800px 800px at 90% 120%, rgba(167,95,255,.22), transparent 60%), linear-gradient(135deg, #0b1537 0%, #061030 100%)"
      }}
    >
      {/* Soft grid overlay for uniqueness */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* Viewport */}
      <div
        className="relative z-10 mx-auto"
        style={{ width: typeof viewportWidth === "number" ? `${viewportWidth}px` : "100%" }}
      >
        {/* Track */}
        <div
          className="flex items-end gap-6 will-change-transform"
          style={{
            transform: `translateX(-${offsetX}px)`,
            transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          {extended.map((book, i) => {
            const scale = scaleClass(i);
            return (
              <div
                // fixed slot width; first one used for measurement
                ref={i === 0 ? slotRef : null}
                key={`${i}-${book.title}`}
                className="w-[220px] sm:w-[240px] md:w-[280px] flex-shrink-0"
              >
                <div
                  className={`origin-bottom transition-all duration-500 ${scale}`}
                >
                  <div className="relative rounded-2xl shadow-lg overflow-hidden bg-[#0a0f2e]/80 backdrop-blur-sm">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-[360px] object-cover"
                    />
                    {/* Fixed caption height so bottoms align perfectly */}
                    <div className="px-4 py-3 text-center font-semibold text-base md:text-lg h-[68px] flex items-center justify-center">
                      {book.title}
                    </div>
                    {/* CTA reveal on hover */}
                    <div className="absolute left-0 right-0 bottom-3 flex justify-center opacity-0 translate-y-3 transition-all duration-300 hover:opacity-100 hover:translate-y-0">
                      <Link
                        to={`/book/${i % books.length}`}
                        className="bg-white text-black font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full shadow-lg transition"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full shadow-lg transition"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
