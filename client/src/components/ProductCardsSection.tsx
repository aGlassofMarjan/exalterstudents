import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const products = [
  {
    title: 'Paket Super Lengkap IELTS 2026',
    desc: 'Kumpulan lengkap soal latihan, prediksi, dan materi IELTS untuk persiapan Study Abroad, Beasiswa, atau Migrasi.',
    img: 'https://cdn.scalev.id/uploads/1772550301/FxReNOoWqTpyslo2Zz0dbQ/1772550301253-Display-Produk.webp',
    href: '/product',
    badge: 'IELTS',
  },
  {
    title: 'International Research and Innovation Festival 2026',
    desc: 'Program pelatihan riset dan inovasi + kompetisi internasional. Bootcamp, International Competition, Medal, Awards, & Grand Prizes.',
    img: 'https://www.exalterstudents.com/images/irif-content/irif-instagram-post.png',
    href: '/irif',
    badge: 'IRIF',
  },
  {
    title: '100+ Contoh Esai, Karya Ilmiah, & Business Plan',
    desc: 'Koleksi eksklusif contoh karya para juara tingkat nasional hingga internasional. File asli + Video Course + 500+ Ide Judul.',
    img: 'https://ik.imagekit.io/kdedpftqp/karya-juara.webp',
    href: '/karya-juara',
    badge: 'Karya Juara',
  },
];

export default function ProductCardsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">Produk Kami</h2>
          <p className="text-muted-foreground text-lg">Program dan materi eksklusif dari Exalter Students</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <Card key={p.badge} className="overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all p-0">
              <div className="relative">
                <img src={p.img} alt={p.title} className="w-full h-[220px] object-cover" />
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-sm">
                  {p.badge}
                </Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground text-lg mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{p.desc}</p>
                <Button asChild className="w-full">
                  <a href={p.href}>Lihat Selengkapnya</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
