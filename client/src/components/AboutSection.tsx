import type { AboutContent } from '@/lib/content-loader';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{about.title}</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{about.subtitle}</p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {about.valueCards.map((card) => (
            <Card key={card.name} className="flex flex-col items-center text-center">
              <CardHeader className="items-center justify-items-center text-center pb-0">
                <div
                  className="text-primary mb-4"
                  dangerouslySetInnerHTML={{ __html: icons[card.name] ?? icons['Innovation'] }}
                />
                <h3 className="text-xl font-semibold text-card-foreground">{card.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Brief Summary */}
        <Card className="text-center">
          <CardHeader className="items-center">
            <h3 className="text-2xl font-bold text-primary">{about.summaryTitle}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{about.summaryDescription}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
