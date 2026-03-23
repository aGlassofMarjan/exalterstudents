import type { AboutContent } from '@/lib/content-loader';
import { Card, CardContent } from '@/components/ui/card';

interface AboutSectionProps {
  about: AboutContent;
}

// Lucide-equivalent SVG paths (Lightbulb, Users, Zap)
const icons: Record<string, string> = {
  Innovation: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  Collaboration: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  Acceleration: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
};

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* Title tile — wide horizontal span */}
          <Card className="md:col-span-2 lg:col-span-2 flex flex-col justify-center p-8 bg-primary text-primary-foreground">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold mb-3">{about.title}</h2>
              <p className="text-primary-foreground/70 text-lg leading-relaxed">{about.subtitle}</p>
            </CardContent>
          </Card>

          {/* Image tile — tall vertical block spanning title + value card rows */}
          <Card className="md:col-span-1 lg:col-span-2 lg:row-span-3 overflow-hidden p-0">
            <img
              src="/images/achievement-3-2560x2050.png"
              alt="Exalter Students community"
              className="w-full h-full min-h-[240px] object-cover"
            />
          </Card>

          {/* Value cards row — 3 value cards + Prestasi stats card, all in 2 cols under title */}
          {about.valueCards.slice(0, 3).map((card) => (
            <Card key={card.name} className="flex flex-col items-center text-center p-6">
              <CardContent className="p-0 flex flex-col items-center">
                <div
                  className="text-primary mb-3"
                  dangerouslySetInnerHTML={{ __html: icons[card.name] ?? icons['Innovation'] }}
                />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{card.name}</h3>
                <p className="text-muted-foreground text-sm">{card.description}</p>
              </CardContent>
            </Card>
          ))}

          {/* Prestasi stats card — same size as value cards */}
          <Card className="flex flex-col items-center justify-center text-center p-6 bg-cta text-cta-foreground">
            <CardContent className="p-0">
              <span className="text-5xl font-extrabold leading-none">500+</span>
              <h3 className="text-lg font-semibold mt-2">Prestasi</h3>
              <p className="text-cta-foreground/80 text-sm mt-1">Menyoroti keunggulan siswa dalam akademik, kepemimpinan, dan komunitas.</p>
            </CardContent>
          </Card>

          {/* Summary tile — shares row with Prestasi on tablet, full width on desktop */}
          <Card className="md:col-span-2 lg:col-span-4 flex flex-col justify-center p-8 bg-accent text-accent-foreground">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-2">{about.summaryTitle}</h3>
              <p className="text-accent-foreground/80 text-lg leading-relaxed">{about.summaryDescription}</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}
