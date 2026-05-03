import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Rocket, FileText, Video, Lightbulb, Gift, Users } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    el.querySelectorAll('.fade-in').forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}

const CHECKOUT_URL = 'https://lynk.id/exalterstudents/exv3q088kd81';

const categories = [
  'Pendidikan & Pemberdayaan',
  'AI & Solusi Digital',
  'Sains & Teknologi',
  'Ekonomi, Bisnis, & Kewirausahaan',
  'Kesehatan & Kesejahteraan',
  'Lingkungan & Energi (Net Zero Emissions)',
  'Pertanian, Peternakan, & Pangan',
  'Kelautan & Perikanan',
  'Entertainment & Lifestyle',
  'Sosial, Kebudayaan, dan Turisme',
];

export default function KaryaJuaraLanding() {
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef} className="font-body bg-cream text-text-dark">

      {/* ═══ HERO ═══ */}
      <section className="w-full py-10 px-4 bg-gradient-to-b from-cream to-warm-gray pattern-bg">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-6">
            <Badge variant="secondary" className="bg-product-primary/10 text-product-primary px-4 py-2 text-sm font-semibold">
              Exalter Students
            </Badge>
          </div>
          <div className="fade-in text-center mb-6">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-dark leading-tight mb-3">
              100+ Contoh Esai, Karya Ilmiah, &amp; Business Plan untuk Lomba
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-product-primary font-bold text-2xl">IDR 249,000</span>
              <span className="price-strike text-text-muted-warm text-lg">IDR 1,449,000</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              {[1,2,3,4,5].map((i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="text-text-muted-warm text-sm ml-1">5.0 | 2,3rb terjual</span>
            </div>
          </div>

          <div className="fade-in relative mb-6">
            <div className="absolute inset-0 bg-product-primary/20 rounded-2xl blur-xl scale-95" />
            <img
              src="/images/karya-juara.webp"
              alt="Karya Juara Product"
              className="relative w-full rounded-2xl shadow-xl float-animation"
            />
            <Badge className="absolute -top-3 -right-3 bg-product-accent text-white px-4 py-2 text-sm font-bold shadow-lg">
              Hemat 83%
            </Badge>
          </div>

          <div className="fade-in text-center mb-6">
            <Button asChild className="btn-product w-full py-4 rounded-xl text-lg font-bold shadow-lg">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">Beli Sekarang — Rp 249.000</a>
            </Button>
            <p className="text-text-muted-warm text-xs mt-3">
              *Setelah payment silahkan cek e-mail untuk dapat akses link WA lalu klaim panduan dan bonus lain-nya!
            </p>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Kamu pernah ngerasain ini?
            </h2>
            <p className="text-text-muted-warm">Siswa dan mahasiswa yang ambis banget buat juara esai, karya tulis ilmiah, dan business plan</p>
          </div>
          <div className="space-y-4">
            {[
              'Ide mentok, sudah riset tapi buntu, dan minim referensi',
              'Bingung cara menulis esai, KTI, dan business plan yang bikin juara nasional/internasional',
              'Sering kalah lomba karena kurang inovatif dibanding peserta lain',
            ].map((pain) => (
              <div key={pain} className="fade-in flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-text-muted-warm text-sm">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-warm-gray">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Rocket className="w-6 h-6 text-product-primary" />
              <span className="font-semibold text-product-primary">Jangan cuma kerja keras, kamu butuh shortcut!</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Toolkit Paling Lengkap untuk Para Pejuang Kompetisi
            </h2>
            <p className="text-text-muted-warm leading-relaxed">
              Dapatkan 100+ Koleksi Eksklusif Contoh Esai, Karya Ilmiah, &amp; Business Plan Para Juara tingkat Nasional hingga Internasional. Di sini kamu nggak cuma dapet file, tapi juga belajar polanya!
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="w-full py-12 px-4 bg-warm-gray pattern-bg">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <Badge variant="secondary" className="bg-product-primary/10 text-product-primary px-4 py-2 text-sm font-semibold mb-4">
              Konten Premium
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Apa yang akan kamu dapatkan?
            </h2>
          </div>
          <div className="space-y-3">
            {[
              { icon: FileText, text: 'File asli dalam bentuk Word, PPT, & Excel (Siap dipelajari!)' },
              { icon: Video, text: 'Video Course eksklusif cara nulis Esai, KTI, & Business Plan' },
              { icon: Lightbulb, text: 'Trik rahasia nemuin ide yang "mahal"' },
              { icon: Gift, text: 'BONUS: 500+ Ide Judul buat kamu yang buntu!' },
            ].map((item) => (
              <Card key={item.text} className="fade-in">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 bg-product-primary/10 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-product-primary" />
                  </div>
                  <p className="text-text-dark text-sm font-medium">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              500+ Ide Judul Berdasarkan Kategori Terpanas
            </h2>
          </div>
          <div className="fade-in grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-product-primary text-lg">🔹</span>
                <span className="text-text-muted-warm text-xs">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY BONUS ═══ */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-cream">
        <div className="w-full max-w-lg mx-auto">
          <Card className="fade-in bg-gradient-to-r from-product-primary to-product-primary-dark text-white border-0">
            <CardContent className="p-6 flex items-center gap-4">
              <Users className="w-10 h-10 shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Gratis Grup Komunitas!</h3>
                <p className="text-white/80 text-sm">Networking dengan sesama pejuang lomba dari seluruh penjuru negeri di Exalter Students Community.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ PRICING CTA ═══ */}
      <section className="w-full py-12 px-4 bg-cream pattern-bg">
        <div className="w-full max-w-lg mx-auto">
          <Card className="fade-in overflow-hidden border-2 border-product-primary/20 shadow-xl">
            <div className="bg-gradient-to-r from-product-primary to-product-primary-dark p-6 text-center text-white">
              <Badge className="bg-white/20 text-white border-white/20 mb-2">Promo Terbatas !!</Badge>
              <h3 className="font-display text-xl font-bold">Karya Juara — Toolkit Lengkap</h3>
            </div>
            <CardContent className="p-0">
              <div className="p-6 text-center border-b border-gray-100">
                <div className="mb-2">
                  <span className="text-text-muted-warm text-sm">Harga Normal</span>
                  <span className="price-strike ml-2 text-xl text-text-muted-warm">Rp 1.449.000</span>
                </div>
                <div className="font-display text-5xl font-bold text-product-primary mb-2">Rp 249.000</div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm font-semibold">
                  Hemat Rp 1.200.000
                </Badge>
              </div>
              <div className="p-6">
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="btn-product block w-full py-4 rounded-xl text-lg font-bold shadow-lg mb-4 text-center">
                  Beli Sekarang
                </a>
                <p className="text-center text-xs text-text-muted-warm">
                  *Setelah payment silahkan cek e-mail untuk dapat akses link WA lalu klaim panduan dan bonus lain-nya!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Copyright */}
      <div className="w-full py-6 px-4 bg-text-dark text-center">
        <p className="text-gray-400 text-sm">© 2025 Exalter Students. All rights reserved.</p>
      </div>

      <ScrollToTop />
    </div>
  );
}
