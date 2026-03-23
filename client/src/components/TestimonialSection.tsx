import type { TestimonialCard } from '@/lib/content-loader';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialSectionProps {
  testimonials: TestimonialCard[];
}

const portraits: Record<string, string> = {
  'Rina Sari': '/images/testimony-rina-sari.png',
  'Andi Wijaya': '/images/testimony-andi-wijaya.png',
  'Lilis Kusuma': '/images/testimony-lilis-kusuma.png',
};

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Apa Kata Mereka</h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((card) => (
            <Card key={card.name} className="flex flex-col p-6">
              {/* Quote icon */}
              <span className="text-5xl leading-none text-accent font-serif mb-4" aria-hidden="true">&ldquo;</span>
              {/* Quote text */}
              <CardContent className="flex-1 p-0 mb-6">
                <p className="italic text-muted-foreground">{card.quote}</p>
              </CardContent>
              {/* Author */}
              <div className="flex items-center gap-3">
                {portraits[card.name] && (
                  <img
                    src={portraits[card.name]}
                    alt={card.name}
                    width="44"
                    height="44"
                    className="rounded-full object-cover w-11 h-11 border-2 border-border"
                  />
                )}
                <div>
                  <h3 className="font-bold text-card-foreground">{card.name}</h3>
                  <p className="text-muted-foreground text-sm">{card.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
