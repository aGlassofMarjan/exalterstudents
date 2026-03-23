import type { EventCard } from '@/lib/content-loader';
import { Card, CardContent } from '@/components/ui/card';

interface EventsSectionProps {
  events: EventCard[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src="/images/event-1-295x319.png"
            alt="Exalter Students events"
            width={295}
            height={319}
            className="rounded-2xl shadow-md object-cover w-48 md:w-56 shrink-0"
          />
          <div>
            <h2 className="text-3xl font-bold text-primary mb-3">Acara &amp; Kegiatan</h2>
            <p className="text-muted-foreground">Ikuti berbagai acara dan kegiatan inspiratif dari Exalter Students.</p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.name} className="flex flex-col p-6 hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col flex-1 p-0">
                <h3 className="font-semibold text-card-foreground mb-2">{event.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{event.date}</p>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-sm mt-auto w-fit"
                >
                  Lihat Detail →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
