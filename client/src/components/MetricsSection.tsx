import type { MetricsContent } from '@/lib/content-loader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MetricsSectionProps {
  metrics: MetricsContent;
}

const achievementImages = [
  '/images/achievement-400x524.png',
  '/images/achievement-2-400x581.png',
];

export default function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section className="py-20 bg-[linear-gradient(135deg,oklch(0.327_0.115_264),oklch(0.623_0.214_259))] dark:bg-[linear-gradient(135deg,oklch(0.220_0.090_264),oklch(0.420_0.170_259))]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title + description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{metrics.title}</h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">{metrics.description}</p>
        </div>

        {/* Metrics grid: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.metrics.map((item) => (
            <div key={item.label} className="text-center">
              <Badge variant="outline" className="text-5xl font-bold text-cta border-transparent h-auto px-0 py-0 mb-2">
                {item.value}
              </Badge>
              <div className="text-primary-foreground/70 text-base">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Achievement cards: 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.achievementCards.map((card, i) => (
            <Card key={card.title} className="overflow-hidden flex flex-col">
              <img
                src={achievementImages[i] ?? achievementImages[0]}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
