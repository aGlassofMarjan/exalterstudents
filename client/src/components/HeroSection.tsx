interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const bgImages = [
  { src: '/images/hero-2-image-505x445.png', alt: 'Exalter Students platform' },
  { src: '/images/achievement-400x524.png', alt: 'Exalter Students achievement' },
  { src: '/images/event-1-295x319.png', alt: 'Exalter Students event' },
  { src: '/images/achievement-2-400x581.png', alt: 'Exalter Students achievement 2' },
  { src: '/images/hero-1-image-820x283.png', alt: 'Exalter Students community' },
  { src: '/images/achievement-3-2560x2050.png', alt: 'Exalter Students achievement 3' },
  { src: '/images/achievement-4-1920x1024.jpg', alt: 'Exalter Students achievement 4' },
];

// Duplicate for seamless loop
const doubled = [...bgImages, ...bgImages];

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
        {/* Scrolling background image marquee */}
        <div className="absolute inset-0 flex items-center overflow-hidden" aria-hidden="true">
          <div className="hero-bg-track flex gap-6 items-center">
            {doubled.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="h-[70vh] w-auto object-cover rounded-xl shrink-0 opacity-30"
              />
            ))}
          </div>
        </div>

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0 hero-overlay"
          aria-hidden="true"
        />

        {/* Foreground text */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            {title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
          <a
            href="/program"
            className="mt-10 inline-block px-10 py-4 rounded-lg font-semibold text-cta-foreground bg-cta transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta"
          >
            Mulai Sekarang
          </a>
        </div>
      </section>

      <style>{`
        @keyframes hero-bg-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-bg-track {
          animation: hero-bg-scroll 60s linear infinite;
          will-change: transform;
        }
        .hero-bg-track:hover {
          animation-play-state: paused;
        }
        .hero-overlay {
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.70) 100%);
        }
      `}</style>
    </>
  );
}
