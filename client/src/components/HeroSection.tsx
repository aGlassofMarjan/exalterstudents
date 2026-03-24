interface HeroSectionProps {
  title: string;
  subtitle: string;
}

/*
 * Bento column layout — two columns scrolling at different speeds.
 * Images are assigned based on their aspect ratios (from filenames).
 * Column A: taller / portrait-ish images
 * Column B: wider / landscape-ish images + square-ish
 */
const colA = [
  { src: '/images/achievement-400x524.png', alt: 'Achievement' },
  { src: '/images/achievement-2-400x581.png', alt: 'Achievement 2' },
  { src: '/images/event-1-295x319.png', alt: 'Event' },
  { src: '/images/hero-2-image-505x445.png', alt: 'Platform' },
];

const colB = [
  { src: '/images/hero-1-image-820x283.png', alt: 'Community' },
  { src: '/images/achievement-3-2560x2050.png', alt: 'Achievement 3' },
  { src: '/images/achievement-4-1920x1024.jpg', alt: 'Achievement 4' },
];

// Duplicate for seamless loop
const colALoop = [...colA, ...colA];
const colBLoop = [...colB, ...colB];

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <>
      <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-primary">
        {/* Left — text content */}
        <div className="relative z-10 flex flex-col justify-center w-full md:w-1/2 px-8 md:px-12 lg:px-16 py-20 md:py-0">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-primary-foreground/70 leading-relaxed max-w-md">
            {subtitle}
          </p>
          {/* Stacked member avatars + count */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[
                '/images/testimony-andi-wijaya.png',
                '/images/testimony-lilis-kusuma.png',
                '/images/testimony-rina-sari.png',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-primary bg-cta flex items-center justify-center text-cta-foreground text-xs font-bold">
                +
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary-foreground leading-tight">175+</div>
              <div className="text-sm text-primary-foreground/60">Students yang berdedikasi</div>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-block px-8 py-3 rounded-lg font-semibold text-cta-foreground bg-cta transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta"
            >
              Lihat Lebih
            </a>
          </div>
        </div>

        {/* Right — bento image grid scrolling vertically */}
        <div
          className="relative w-full md:w-1/2 h-[60vh] md:h-screen overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex gap-3 p-3">
            {/* Column A — scrolls up */}
            <div className="flex-1 overflow-hidden">
              <div className="hero-col-a flex flex-col gap-3">
                {colALoop.map((img, i) => (
                  <img
                    key={`a-${i}`}
                    src={img.src}
                    alt={img.alt}
                    className="w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Column B — scrolls up at different speed */}
            <div className="flex-1 overflow-hidden">
              <div className="hero-col-b flex flex-col gap-3">
                {colBLoop.map((img, i) => (
                  <img
                    key={`b-${i}`}
                    src={img.src}
                    alt={img.alt}
                    className="w-full rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes hero-scroll-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .hero-col-a {
          animation: hero-scroll-up 40s linear infinite;
          will-change: transform;
        }
        .hero-col-b {
          animation: hero-scroll-up 55s linear infinite;
          will-change: transform;
        }
      `}</style>
    </>
  );
}
