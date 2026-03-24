import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollToTop from './ScrollToTop';

/* ─── SVG icon helpers ─── */
const CheckIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const XIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const LockIcon = () => (
  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const BoltIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CHECKOUT_URL = '#checkout-placeholder';

const slides = [
  { src: 'https://cdn.scalev.id/uploads/1772932987/Y-9gBfazL7Zna5JGa_6DZw/1772932987237-Frame-13.webp', alt: 'Testimoni 1' },
  { src: 'https://cdn.scalev.id/uploads/1772932993/sBVwjK1tcLHhq0hINF6LlQ/1772932993033-Frame-14.webp', alt: 'Testimoni 2' },
  { src: 'https://cdn.scalev.id/uploads/1772932998/egh1nmTijj2dY2Aw6pFV-A/1772932998525-Frame-15.webp', alt: 'Testimoni 3' },
];

/* ─── Countdown Hook ─── */
function useCountdown() {
  const [time, setTime] = useState({ h: 2, m: 37, s: 45 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        else { h = 2; m = 37; s = 45; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ─── Slider Hook ─── */
function useSlider(total: number, interval = 4000) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), interval);
    return () => clearInterval(id);
  }, [total, interval]);
  return { current, goTo: setCurrent };
}

/* ─── Scroll Reveal Hook ─── */
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

export default function ProductLanding() {
  const countdown = useCountdown();
  const slider = useSlider(slides.length);
  const containerRef = useFadeIn();
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div ref={containerRef} className="font-body bg-cream text-text-dark">

      {/* ═══ HERO ═══ */}
      <section className="w-full py-10 px-4 bg-gradient-to-b from-cream to-warm-gray pattern-bg">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-6">
            <Badge variant="secondary" className="bg-product-primary/10 text-product-primary px-4 py-2 text-sm font-semibold">
              Paket Super Lengkap IELTS 2026
            </Badge>
          </div>
          <div className="fade-in text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-dark leading-tight mb-4">
              Ingin Raih IELTS Band 6.5+<br />
              <span className="text-product-primary">Tapi Bingung Mulai Dari Mana?</span>
            </h1>
            <p className="text-text-muted-warm text-lg leading-relaxed">
              Kumpulan lengkap soal latihan, prediksi, dan materi IELTS untuk persiapan Study Abroad, Beasiswa, atau Migrasi.
            </p>
          </div>
          <div className="fade-in relative mb-8">
            <div className="absolute inset-0 bg-product-primary/20 rounded-2xl blur-xl scale-95" />
            <img
              src="https://cdn.scalev.id/uploads/1772550301/FxReNOoWqTpyslo2Zz0dbQ/1772550301253-Display-Produk.webp"
              alt="Paket Materi IELTS Lengkap"
              className="relative w-full rounded-2xl shadow-xl float-animation"
            />
            <Badge className="absolute -top-3 -right-3 bg-product-accent text-white px-4 py-2 text-sm font-bold shadow-lg">
              Hemat 90%
            </Badge>
          </div>
          <div className="fade-in flex justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-product-primary">Cambridge</div>
              <div className="text-sm text-text-muted-warm">Books 1-21</div>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-product-primary">Audio</div>
              <div className="text-sm text-text-muted-warm">MP3 Files</div>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-product-primary">500+</div>
              <div className="text-sm text-text-muted-warm">Soal Latihan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-6 text-center">
              Apakah Ini yang Kamu Rasakan?
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Bingung Mulai Belajar', desc: 'Banyak materi di internet, tapi gak tau mana yang efektif. Akhirnya belajar nggak terarah dan waktu terbuang sia-sia.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { title: 'Biaya Kursus Mahal', desc: 'Kursus IELTS persiapan bisa mencapai jutaan rupiah. Belum lagi beli buku latihan asli yang harganya selangit.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: 'Takut Gagal Target Skor', desc: 'Butuh skor minimal untuk beasiswa atau visa, tapi ragu dengan kemampuan sendiri. Nggak ada panduan strategi jitunya.', icon: 'M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((item) => (
              <div key={item.title} className="fade-in flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="shrink-0 w-10 h-10 bg-product-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-product-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-text-dark mb-1">{item.title}</h3>
                  <p className="text-text-muted-warm text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AGITATE ═══ */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-warm-gray">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Bayangkan Kalau Kamu Terus Menunda...
            </h2>
            <p className="text-text-muted-warm leading-relaxed">
              Waktu pendaftaran beasiswa atau universitas semakin dekat. Tanpa skor IELTS yang memadai, peluangmu untuk study abroad, karir internasional, atau migrasi akan tertunda bahkan gagal total.
            </p>
          </div>
          <Card className="fade-in bg-gradient-to-r from-product-primary to-product-primary-dark text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-semibold text-lg">Fakta Penting IELTS</span>
              </div>
              <div className="space-y-3">
                {[
                  'IELTS adalah syarat utama beasiswa LPDP, Chevening, dan universitas top dunia.',
                  'Perusahaan multinasional mensyaratkan IELTS untuk posisi strategis dengan gaji tinggi.',
                  'Untuk migrasi ke Australia, Kanada, atau UK, skor IELTS adalah kunci utama visa.',
                ].map((fact) => (
                  <div key={fact} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-white text-sm leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ SOLUTION ═══ */}
      <section className="w-full py-12 px-4 bg-warm-gray pattern-bg">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <Badge variant="secondary" className="bg-product-primary/10 text-product-primary px-4 py-2 text-sm font-semibold mb-4">
              Solusi Tepat Untukmu
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Kumpulan Materi IELTS Super Lengkap
            </h2>
            <p className="text-text-muted-warm leading-relaxed mb-6">
              Semua yang kamu butuhkan untuk menguasai IELTS: Latihan soal, audio listening, contoh writing, dan prediksi soal terbaru. Semua dalam satu paket.
            </p>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-product-primary/10 rounded-2xl blur-2xl scale-105" />
              <img
                src="https://cdn.scalev.id/uploads/1772550317/tuEgztr72zWCnEdEYFSP0Q/1772550317533-Frame-10.webp"
                alt="Konten Paket IELTS"
                className="relative w-full max-w-md rounded-2xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <Badge variant="secondary" className="bg-product-primary/10 text-product-primary px-4 py-2 text-sm font-semibold mb-4">
              Konten Premium
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Apa yang Kamu Dapatkan?
            </h2>
            <p className="text-text-muted-warm leading-relaxed">
              Materi lengkap mencakup 4 skill utama IELTS: Listening, Reading, Writing, dan Speaking.
            </p>
          </div>
          <div className="space-y-4 mb-8">
            {[
              { img: 'https://cdn.scalev.id/uploads/1772551185/4nzneRlbrldI8o6NSsTQtQ/1772551184374-Cambridge-Series-(1).webp', badge: 'Books 1-21', title: 'Cambridge IELTS Series 1-21', desc: 'Kumpulan buku resmi latihan soal IELTS dari Cambridge. Wajib punya untuk semua peserta IELTS.' },
              { img: 'https://cdn.scalev.id/uploads/1772315622/OwXMNQ4ogCNwgKsoL1v6eQ/1772315622664-image-1-(5).webp', badge: 'Audio MP3', title: 'Audio Listening & Scripts', desc: 'File audio lengkap untuk latihan listening beserta transkrip soal untuk belajar efektif.' },
              { img: 'https://cdn.scalev.id/uploads/1772551756/XrK0-Fr5dDd1YD5yxQoNcA/1772551756655-Cambridge-Series-(2).webp', badge: 'Band 9 Samples', title: 'Contoh Writing Band 6.5 - 9.0', desc: 'Ratusan contoh jawaban Task 1 & Task 2 dengan skor tinggi untuk panduan penulisanmu.' },
              { img: 'https://cdn.scalev.id/uploads/1772550350/ghEoFDVAO6hRctN83sahJw/1772550350656-Prediction-Test.webp', badge: 'Update 2026', title: 'Prediksi Soal & Tips Trik', desc: 'Kumpulan prediksi soal terbaru dan strategi mengerjakan soal IELTS secara efisien.' },
            ].map((item) => (
              <Card key={item.title} className="fade-in overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="relative">
                  <img src={item.img} alt={item.title} className="w-full h-[180px] object-cover bg-gradient-to-br from-gray-100 to-gray-200" />
                  <Badge className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-product-primary shadow-sm">
                    {item.badge}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-text-dark mb-2">{item.title}</h3>
                  <p className="text-text-muted-warm text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF SLIDER ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Dipercaya Ribuan Pelajar Indonesia
            </h2>
          </div>
          <div className="fade-in relative mb-8">
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-black">
              <div
                className="slider-track-product"
                style={{ transform: `translateX(-${slider.current * 100}%)` }}
              >
                {slides.map((s, i) => (
                  <div key={i} className="min-w-full flex justify-center items-start bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]">
                    <img src={s.src} alt={s.alt} className="w-full h-[650px] object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`slider-dot-product ${i === slider.current ? 'active' : ''}`}
                  onClick={() => slider.goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="fade-in flex justify-center gap-8">
            {[
              { num: '5,000+', label: 'Pembeli Puas' },
              { num: '4.9', label: 'Rating Rata-rata' },
              { num: '99%', label: 'Rekomendasi' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-product-primary">{s.num}</div>
                <div className="text-sm text-text-muted-warm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="w-full py-12 px-4 bg-warm-gray">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">Kisah Sukses Mereka</h2>
            <p className="text-text-muted-warm text-sm">Testimoni dari pengguna yang berhasil meraih skor IELTS impian</p>
          </div>
          <div className="space-y-4">
            {[
              {
                img: 'https://cdn.scalev.id/uploads/1772553905/qqiwZl8XkqbRo0S7eyoSBA/1772553904890-Testi-IELTS-3.webp',
                name: 'Sarah Putri', role: 'Mahasiswi S2 Imperial College London',
                badge: 'Penerima LPDP', badgeColor: 'bg-yellow-100 text-yellow-700',
                text: '"Berkat latihan soal dari paket ini, saya berhasil naik skor dari 6.0 ke 7.5 dalam 2 bulan! Materinya sangat mirip dengan soal asli ujian. Sekarang saya sudah mulai kuliah S2 dan semua proses seleksi terasa jauh lebih siap."',
              },
              {
                img: 'https://cdn.scalev.id/uploads/1772553913/4iX_Mnqx4yXVeQZoxtTBOw/1772553913366-Testi-IELTS-4.webp',
                name: 'Rizky Mahendra', role: 'Joint Master Student Sorbonne University',
                badge: 'Awardee Erasmus Mundus', badgeColor: 'bg-blue-100 text-blue-700',
                text: '"Saya perlu skor IELTS tinggi untuk program multi-country di Eropa. Latihan dari ebook ini sangat membantu memahami pola soal dan manajemen waktu. Hasilnya saya lolos seleksi dan sekarang kuliah lintas negara."',
              },
            ].map((t) => (
              <Card key={t.name} className="fade-in bg-gradient-to-br from-white to-cream border-white shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-text-dark">{t.name}</div>
                      <div className="text-sm text-text-muted-warm">{t.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className={`${t.badgeColor} text-xs font-semibold`}>{t.badge}</Badge>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-text-muted-warm text-sm leading-relaxed">{t.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OBJECTION HANDLING ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">Masih Ada Keraguan?</h2>
            <p className="text-text-muted-warm">Jawaban untuk kekhawatiran kamu</p>
          </div>
          <div className="space-y-4">
            {[
              { q: '"Apakah materinya update?"', a: 'Ya, paket ini berisi seri Cambridge terbaru hingga 2026 dan prediksi soal yang relevan dengan format ujian IELTS saat ini (Academic & General Training).', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { q: '"Format file apa? Ribet gak?"', a: 'Semua file dalam format PDF dan MP3 yang bisa dibuka di HP atau laptop. Tinggal download atau baca online, praktis banget!', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { q: '"Cocok untuk pemula?"', a: 'Sangat cocok. Selain soal latihan, ada tips & trik serta contoh writing dari nol sampai mahir. Cocok untuk yang baru mulai belajar IELTS.', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
            ].map((item) => (
              <div key={item.q} className="fade-in bg-warm-gray p-5 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 bg-product-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark mb-2">{item.q}</h3>
                    <p className="text-text-muted-warm text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BONUS ═══ */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-cream pattern-bg">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <Badge variant="secondary" className="bg-product-accent/20 text-product-accent px-4 py-2 text-sm font-semibold mb-4">
              Bonus Spesial
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Bonus Eksklusif untuk Pembeli Hari Ini
            </h2>
          </div>
          <Card className="fade-in bg-gradient-to-br from-white to-[#FFF9F0] border-2 border-product-accent overflow-hidden shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-product-accent via-[#E8C4A0] to-product-accent" />
            <CardContent className="p-6">
              <div className="text-center mb-5">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-product-accent/30 bg-gradient-to-br from-product-accent/15 to-product-accent/5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-product-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-text-dark mb-2">Essential Vocabulary for IELTS</h3>
                <Badge className="bg-gradient-to-r from-product-accent to-[#B8956A] text-white text-xs font-semibold shadow-sm">
                  Nilai: Rp 150.000
                </Badge>
              </div>
              <p className="text-text-muted-warm text-sm leading-relaxed text-center mb-5">
                Ebook kosakata akademik penting yang sering muncul di ujian IELTS. Lengkap dengan definisi dan contoh penggunaan dalam kalimat.
              </p>
              <div className="bg-white/60 rounded-xl p-4">
                {['2000+ Kosakata Akademik', 'Contoh Kalimat Lengkap', 'Kategori per Topik IELTS'].map((f) => (
                  <div key={f} className="flex items-start gap-2.5 py-2 border-b border-dashed border-product-accent/20 last:border-b-0">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-product-accent/20 flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-product-accent" />
                    </div>
                    <span className="text-sm text-text-dark">{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section className="w-full py-12 px-4 bg-cream">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">Perbandingan dengan Lainnya</h2>
          </div>
          <div className="fade-in overflow-x-auto">
            <Table className="bg-white rounded-xl shadow-sm overflow-hidden">
              <TableHeader>
                <TableRow className="bg-product-primary hover:bg-product-primary">
                  <TableHead className="text-white font-semibold text-sm">Fitur</TableHead>
                  <TableHead className="text-white font-semibold text-sm text-center">Paket Kami</TableHead>
                  <TableHead className="text-white font-semibold text-sm text-center">Kursus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { feature: 'Cambridge Books 1-21', us: 'check', them: 'Terpisah' },
                  { feature: 'Harga', us: 'Rp 99.000', them: '3-7 Juta' },
                  { feature: 'Audio Listening MP3', us: 'check', them: 'check' },
                  { feature: 'Akses Selamanya', us: 'check', them: 'x' },
                  { feature: 'Belajar Mandiri', us: 'check', them: 'x' },
                ].map((row, i) => (
                  <TableRow key={row.feature} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <TableCell className="text-sm text-text-muted-warm">{row.feature}</TableCell>
                    <TableCell className="text-center">
                      {row.us === 'check' ? (
                        <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-sm font-semibold text-product-primary">{row.us}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {row.them === 'check' ? (
                        <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                      ) : row.them === 'x' ? (
                        <XIcon className="w-5 h-5 text-red-400 mx-auto" />
                      ) : (
                        <span className="text-sm text-text-muted-warm">{row.them}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">Perjalanan Persiapan IELTS-mu</h2>
            <p className="text-text-muted-warm">Tahapan mencapai skor target dengan panduan ebook ini</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-product-primary/20" />
            {[
              { time: 'Minggu 1-2', title: 'Fase Diagnosis & Dasar', desc: 'Kenali format ujian IELTS, ukur kemampuan awal dengan diagnostic test, dan mulai bangun fondasi kosakata dasar.', accent: false },
              { time: 'Bulan 1', title: 'Fase Skill Building', desc: 'Fokus penguatan Listening & Reading. Latihan intensif grammar dan pemahaman teks akademik menggunakan Cambridge Books.', accent: false },
              { time: 'Bulan 2', title: 'Fase Writing & Speaking', desc: 'Kuasai struktur Writing Task 1 & 2. Latih fluency speaking dengan contoh audio native speaker dan template jawaban.', accent: false },
              { time: 'Bulan 3', title: 'Fase Practice Test', desc: 'Mengerjakan full test Cambridge Books secara bertahap. Melatih manajemen waktu dan akurasi menjawab soal.', accent: false },
              { time: 'Bulan 4+', title: 'Fase Exam Ready', desc: 'Tryout penuh (Full Test) berkali-kali. Evaluasi skor akhir dan perbaiki weak spot. Siap tempur raih Band 6.5+!', accent: true },
            ].map((step, i) => (
              <div key={step.time} className={`fade-in relative pl-10 ${i < 4 ? 'pb-8' : ''}`}>
                <div className={`absolute left-2 w-5 h-5 rounded-full border-4 border-white shadow ${step.accent ? 'bg-product-accent' : 'bg-product-primary'}`} />
                <div className={`p-4 rounded-xl ${step.accent ? 'bg-product-accent/10 border border-product-accent/30' : 'bg-warm-gray'}`}>
                  <div className={`text-xs font-semibold mb-1 ${step.accent ? 'text-product-accent' : 'text-product-primary'}`}>{step.time}</div>
                  <h3 className="font-semibold text-text-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-text-muted-warm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCARCITY & PRICING ═══ */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-white to-product-primary/5">
        <div className="w-full max-w-lg mx-auto">
          {/* Countdown */}
          <div className="fade-in text-center mb-8">
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Badge className="bg-gradient-to-r from-product-primary to-product-primary-light text-white text-xs font-semibold tracking-wide uppercase mb-4">
                Penawaran Berakhir Dalam
              </Badge>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {[
                  { val: pad(countdown.h), unit: 'Jam' },
                  { val: pad(countdown.m), unit: 'Menit' },
                  { val: pad(countdown.s), unit: 'Detik' },
                ].map((box, i) => (
                  <div key={box.unit} className="flex items-center gap-2 sm:gap-3">
                    {i > 0 && <span className="text-product-primary text-3xl font-bold" style={{ animation: 'pulse-separator 1s ease-in-out infinite' }}>:</span>}
                    <div className="bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] border border-white/[0.08] rounded-xl px-3 py-4 min-w-[65px] sm:min-w-[80px] text-center shadow-lg relative">
                      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5" />
                      <div className="text-3xl sm:text-4xl font-bold text-white leading-none relative z-10" style={{ textShadow: '0 2px 10px rgba(0,89,154,0.3)' }}>
                        {box.val}
                      </div>
                      <div className="text-[11px] text-white/50 uppercase tracking-wider mt-2 font-medium">{box.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-white/[0.08]">
                <div className="w-2 h-2 bg-product-primary rounded-full" style={{ animation: 'blink-dot 1s ease-in-out infinite' }} />
                <span className="text-white/70 text-[13px] font-medium">Harga akan kembali normal setelah timer habis</span>
              </div>
            </div>
          </div>

          {/* Pricing card */}
          <Card className="fade-in overflow-hidden border-2 border-product-primary/20 shadow-xl">
            <div className="bg-gradient-to-r from-product-primary to-product-primary-dark p-6 text-center text-white">
              <h3 className="font-display text-xl font-bold mb-2">Paket Super Lengkap IELTS</h3>
              <p className="text-white/80 text-sm">Akses Selamanya + Semua Bonus</p>
            </div>
            <CardContent className="p-0">
              <div className="p-6 text-center border-b border-gray-100">
                <div className="mb-2">
                  <span className="text-text-muted-warm text-sm">Harga Normal</span>
                  <span className="price-strike ml-2 text-xl text-text-muted-warm">Rp 1.850.000</span>
                </div>
                <div className="font-display text-5xl font-bold text-product-primary mb-2">Rp 99.000</div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-sm font-semibold">
                  Hemat Rp 1.751.000
                </Badge>
              </div>
              <div className="p-6 bg-warm-gray">
                <h4 className="font-semibold text-text-dark mb-4 text-center">Total Value yang Kamu Dapat:</h4>
                <div className="space-y-2 mb-4">
                  {[
                    { item: 'Cambridge IELTS Series 1-21', price: 'Rp 1.500.000' },
                    { item: 'Audio Listening & Scripts', price: 'Rp 200.000' },
                    { item: 'Bonus: Essential Vocabulary', price: 'Rp 150.000' },
                  ].map((v) => (
                    <div key={v.item} className="flex justify-between text-sm">
                      <span className="text-text-muted-warm">{v.item}</span>
                      <span className="text-text-dark font-medium">{v.price}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-text-dark">Total Value</span>
                      <span className="font-semibold text-text-dark">Rp 1.850.000</span>
                    </div>
                  </div>
                </div>
                <div className="bg-product-primary/10 p-3 rounded-lg text-center">
                  <div className="text-sm text-text-muted-warm">Kamu Bayar Hanya</div>
                  <div className="font-display text-2xl font-bold text-product-primary">Rp 99.000</div>
                </div>
              </div>
              <div className="p-6">
                <a href={CHECKOUT_URL} className="btn-product block w-full py-4 rounded-xl text-lg font-bold shadow-lg mb-4 text-center">
                  Beli Sekarang
                </a>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-xs text-text-muted-warm">
                    <ShieldIcon /><span>Pembayaran Aman</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted-warm">
                    <LockIcon /><span>Akses Instant</span>
                  </div>
                </div>
                <p className="text-center text-xs text-text-muted-warm">
                  Sudah dipercaya 5,000+ pejuang IELTS di seluruh Indonesia.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ GUARANTEE ═══ */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-text-dark mb-2">Jaminan Kepuasan</h3>
                <p className="text-text-muted-warm text-sm leading-relaxed">
                  Kami yakin paket ini akan membantu persiapan IELTS kamu. Jika ada kendala akses atau pertanyaan, tim support kami siap membantu kapan saja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="w-full py-12 px-4 bg-warm-gray">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">Pertanyaan yang Sering Ditanyakan</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: 'Format file apa saja yang akan saya dapatkan?', a: 'Kamu akan mendapatkan file dalam format PDF untuk buku dan dokumen, serta MP3 untuk audio listening. Semua bisa diakses via HP atau Laptop.' },
              { q: 'Apakah cocok untuk IELTS General Training?', a: 'Ya, paket ini mencakup materi untuk Academic dan General Training. Ada konten spesifik yang berbeda untuk kedua tipe test tersebut.' },
              { q: 'Berapa lama aksesnya berlaku?', a: 'Akses berlaku selamanya (lifetime). Sekali beli, kamu bisa mengakses kapan saja dan mendapatkan update materi jika ada.' },
              { q: 'Metode pembayaran apa saja?', a: 'Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), E-Wallet (GoPay, OVO, Dana, ShopeePay), dan QRIS. Proses instan otomatis.' },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl shadow-sm border-0">
                <AccordionTrigger className="px-4 py-4 text-left font-semibold text-text-dark hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-text-muted-warm text-sm">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="w-full py-12 px-4 bg-gradient-to-b from-warm-gray to-cream pattern-bg">
        <div className="w-full max-w-lg mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark mb-4">
              Raih Skor IELTS Impianmu Sekarang
            </h2>
            <p className="text-text-muted-warm leading-relaxed">
              Jangan biarkan skor IELTS menghalangi masa depanmu. Mulai persiapan terbaik dengan harga terjangkau hari ini.
            </p>
          </div>
          <Card className="fade-in shadow-xl">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <span className="price-strike text-lg text-text-muted-warm mb-2 inline-block">Rp 1.850.000</span>
                <div className="font-display text-4xl font-bold text-product-primary">Rp 99.000</div>
              </div>
              <a href={CHECKOUT_URL} className="btn-product block w-full py-4 rounded-xl text-lg font-bold shadow-lg mb-4 text-center">
                Beli Sekarang
              </a>
              <div className="flex justify-center items-center gap-4 text-xs text-text-muted-warm">
                <div className="flex items-center gap-1"><LockIcon /><span>Pembayaran Aman</span></div>
                <span>|</span>
                <div className="flex items-center gap-1"><BoltIcon /><span>Akses Instant</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ COPYRIGHT ═══ */}
      <div className="w-full py-6 px-4 bg-text-dark text-center">
        <p className="text-gray-400 text-sm">© 2025 Kumpulan Materi IELTS. All rights reserved.</p>
      </div>

      {/* ScrollToTop */}
      <ScrollToTop />
    </div>
  );
}
