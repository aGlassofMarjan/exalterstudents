import type { NewsCard } from '@/lib/content-loader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsSectionProps {
  news: NewsCard[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Berita Terbaru</h2>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((card) => (
            <Card key={card.title} className="flex flex-col p-6">
              <CardContent className="flex flex-col flex-1 p-0">
                <p className="text-muted-foreground text-sm mb-2">{card.date}</p>
                <h3 className="font-semibold text-card-foreground flex-1 mb-4">{card.title}</h3>
                <div className="mt-auto">
                  <Button
                    asChild
                    className="bg-cta hover:bg-cta/80 text-cta-foreground text-sm font-medium rounded-lg transition-colors w-fit"
                  >
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Baca Selengkapnya
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
