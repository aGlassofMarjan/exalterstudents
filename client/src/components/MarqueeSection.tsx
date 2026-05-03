interface MarqueeSectionProps {
  title: string;
  description: string;
}

const partners = [
  { name: 'Antara News', src: 'https://ik.imagekit.io/kdedpftqp/antara-news.png' },
  { name: 'APEC', src: 'https://ik.imagekit.io/kdedpftqp/apec.png' },
  { name: 'Assyifa Essence', src: 'https://ik.imagekit.io/kdedpftqp/assyifa-essence.png' },
  { name: 'Astra Startup', src: 'https://ik.imagekit.io/kdedpftqp/astra-startup.png' },
  { name: 'Bina Insani', src: 'https://ik.imagekit.io/kdedpftqp/bina-insani.png' },
  { name: 'BRIN', src: 'https://ik.imagekit.io/kdedpftqp/brin.png' },
  { name: 'Catalyzon', src: 'https://ik.imagekit.io/kdedpftqp/catalyzon.png' },
  { name: 'Creatella Impact', src: 'https://ik.imagekit.io/kdedpftqp/creatella-impact.png' },
  { name: 'Djarum', src: 'https://ik.imagekit.io/kdedpftqp/djarum.png' },
  { name: 'Eco Trift', src: 'https://ik.imagekit.io/kdedpftqp/eco-trift.png' },
  { name: 'GIZ German Cooperation', src: 'https://ik.imagekit.io/kdedpftqp/giz-german-cooperation.png' },
  { name: 'Glints', src: 'https://ik.imagekit.io/kdedpftqp/glints.png' },
  { name: 'GSMA', src: 'https://ik.imagekit.io/kdedpftqp/gsma.png' },
  { name: 'INSFRE', src: 'https://ik.imagekit.io/kdedpftqp/insfre.png' },
  { name: 'Inventify', src: 'https://ik.imagekit.io/kdedpftqp/inventify.png' },
  { name: 'IPKANI', src: 'https://ik.imagekit.io/kdedpftqp/ipkani.png' },
  { name: 'ITB', src: 'https://ik.imagekit.io/kdedpftqp/itb-1920.png' },
  { name: 'Kabar Buana', src: 'https://ik.imagekit.io/kdedpftqp/kabar-buana.png' },
  { name: 'Kementrian Perindustrian', src: 'https://ik.imagekit.io/kdedpftqp/kementrian-perindustrian.png' },
  { name: 'Kompasiana', src: 'https://ik.imagekit.io/kdedpftqp/kompasiana.png' },
  { name: 'Kumparan', src: 'https://ik.imagekit.io/kdedpftqp/kumparan.png' },
  { name: 'Pemkot Semarang', src: 'https://ik.imagekit.io/kdedpftqp/pemkot-semarang.png' },
  { name: 'Pertamina', src: 'https://ik.imagekit.io/kdedpftqp/pertamina.png' },
  { name: 'Pesantren Al-Muhtada', src: 'https://ik.imagekit.io/kdedpftqp/pesantren-almuhtada.png' },
  { name: 'Saraseblak', src: 'https://ik.imagekit.io/kdedpftqp/saraseblak.png' },
  { name: 'Sejuta Cita', src: 'https://ik.imagekit.io/kdedpftqp/sejuta-cita.png' },
  { name: 'She Disrupts', src: 'https://ik.imagekit.io/kdedpftqp/she-disrupts.png' },
  { name: 'SRE', src: 'https://ik.imagekit.io/kdedpftqp/sre.png' },
  { name: 'Suarabaru.id', src: 'https://ik.imagekit.io/kdedpftqp/suarabaru-id.png' },
  { name: 'Tanimarem', src: 'https://ik.imagekit.io/kdedpftqp/tanimarem.png' },
  { name: 'Tribun News', src: 'https://ik.imagekit.io/kdedpftqp/tribun-news.png' },
  { name: 'Unilever', src: 'https://ik.imagekit.io/kdedpftqp/unilever.png' },
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
