interface MarqueeSectionProps {
  title: string;
  description: string;
}

const partners = [
  { name: 'Antara News', src: '/images/marquee-partners/antara-news.png' },
  { name: 'APEC', src: '/images/marquee-partners/apec.png' },
  { name: 'Assyifa Essence', src: '/images/marquee-partners/assyifa-essence.png' },
  { name: 'Astra Startup', src: '/images/marquee-partners/astra-startup.png' },
  { name: 'Bina Insani', src: '/images/marquee-partners/bina-insani.png' },
  { name: 'BRIN', src: '/images/marquee-partners/brin.png' },
  { name: 'Catalyzon', src: '/images/marquee-partners/catalyzon.png' },
  { name: 'Creatella Impact', src: '/images/marquee-partners/creatella-impact.png' },
  { name: 'Djarum', src: '/images/marquee-partners/djarum.png' },
  { name: 'Eco Trift', src: '/images/marquee-partners/eco-trift.png' },
  { name: 'GIZ German Cooperation', src: '/images/marquee-partners/giz-german-cooperation.png' },
  { name: 'Glints', src: '/images/marquee-partners/glints.png' },
  { name: 'GSMA', src: '/images/marquee-partners/gsma.png' },
  { name: 'INSFRE', src: '/images/marquee-partners/insfre.png' },
  { name: 'Inventify', src: '/images/marquee-partners/inventify.png' },
  { name: 'IPKANI', src: '/images/marquee-partners/ipkani.png' },
  { name: 'ITB', src: '/images/marquee-partners/itb-1920.png' },
  { name: 'Kabar Buana', src: '/images/marquee-partners/kabar-buana.png' },
  { name: 'Kementrian Perindustrian', src: '/images/marquee-partners/kementrian-perindustrian.png' },
  { name: 'Kompasiana', src: '/images/marquee-partners/kompasiana.png' },
  { name: 'Kumparan', src: '/images/marquee-partners/kumparan.png' },
  { name: 'Pemkot Semarang', src: '/images/marquee-partners/pemkot-semarang.png' },
  { name: 'Pertamina', src: '/images/marquee-partners/pertamina.png' },
  { name: 'Pesantren Al-Muhtada', src: '/images/marquee-partners/pesantren-almuhtada.png' },
  { name: 'Saraseblak', src: '/images/marquee-partners/saraseblak.png' },
  { name: 'Sejuta Cita', src: '/images/marquee-partners/sejuta-cita.png' },
  { name: 'She Disrupts', src: '/images/marquee-partners/she-disrupts.png' },
  { name: 'SRE', src: '/images/marquee-partners/sre.png' },
  { name: 'Suarabaru.id', src: '/images/marquee-partners/suarabaru-id.png' },
  { name: 'Tanimarem', src: '/images/marquee-partners/tanimarem.png' },
  { name: 'Tribun News', src: '/images/marquee-partners/tribun-news.png' },
  { name: 'Unilever', src: '/images/marquee-partners/unilever.png' },
];

const row1 = partners.slice(0, 16);
const row2 = partners.slice(16);

const row1Loop = [...row1, ...row1];
const row2Loop = [...row2, ...row2];

export default function MarqueeSection({ title, description }: MarqueeSectionProps) {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden">
        <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
          {row1Loop.map((partner, i) => (
            <img
              key={`r1-${i}`}
              src={partner.src}
              alt={partner.name}
              className="h-10 max-w-[100px] object-contain opacity-70 hover:opacity-100 transition-opacity shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden mt-8">
        <div className="marquee-track-reverse flex items-center gap-12 whitespace-nowrap">
          {row2Loop.map((partner, i) => (
            <img
              key={`r2-${i}`}
              src={partner.src}
              alt={partner.name}
              className="h-10 max-w-[100px] object-contain opacity-70 hover:opacity-100 transition-opacity shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
