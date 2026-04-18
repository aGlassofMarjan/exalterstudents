import { useEffect, useRef } from 'react';
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

/* ─── Scroll Reveal ─── */
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

const CheckIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const REGISTER_URL = 'https://bit.ly/IRIF_Registration';

export default function IRIFLanding() {
  const containerRef = useFadeIn();

  return (
    <div ref={containerRef} className="font-body bg-background text-foreground">

      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="w-full py-16 px-4 bg-primary pattern-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(61,138,199,0.3),transparent_60%)]" />
        <div className="w-full max-w-3xl mx-auto relative z-10">
          <div className="fade-in text-center mb-6">
            <Badge className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              Exalter Students Presents
            </Badge>
          </div>
          <div className="fade-in text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-4">
              International Research and Innovation Festival
              <span className="block text-cta">(IRIF) 2026</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl">
              Bootcamp &bull; International Competition &bull; Medal, Awards, &amp; Grand Prizes
            </p>
          </div>
          <div className="fade-in grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { qty: '4', desc: 'Online Course & 2x Mentoring' },
              { qty: '4', desc: 'Online Course & 2x Mentoring' },
              { qty: '100+', desc: 'Template Karya Ilmiah, Karya Para Juara' },
              { qty: '100%', desc: 'Funded Trip Opportunity for Best Participant' },
            ].map((h, i) => (
              <Card key={i} className="bg-primary-foreground/10 border-primary-foreground/10 backdrop-blur-sm text-center">
                <CardContent className="p-4">
                  <div className="text-2xl md:text-3xl font-bold text-cta">{h.qty}</div>
                  <p className="text-primary-foreground/70 text-xs mt-1 leading-snug">{h.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="fade-in text-center mb-8">
            <p className="text-primary-foreground/60 text-sm mb-6 italic">
              Program pelatihan riset dan inovasi + kompetisi internasional
            </p>
            <Button asChild className="bg-cta text-cta-foreground hover:bg-cta/90 px-10 py-4 rounded-xl text-lg font-bold shadow-lg">
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Daftar Sekarang</a>
            </Button>
          </div>
          <div className="fade-in flex flex-wrap justify-center gap-4 text-primary-foreground/60 text-sm">
            <a href="mailto:exalterstudents@gmail.com" className="hover:text-primary-foreground transition-colors">📧 exalterstudents@gmail.com</a>
            <a href="https://instagram.com/exalter_students" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">📸 @exalter_students</a>
            <span>📞 +62 895 1950 1456</span>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: ABOUT EXALTER STUDENTS ═══ */}
      <section className="w-full py-16 px-4 bg-card">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">Tentang Exalter Students</h2>
            <p className="text-muted-foreground text-lg">Platform pembelajar untuk berkarya, berprestasi, dan meraih beasiswa</p>
          </div>
          <div className="fade-in mb-8">
            <img src="https://exalterstudents.vercel.app/images/hero-1-image-820x283.png" alt="Exalter Students" className="w-full rounded-2xl shadow-lg" />
          </div>
          <p className="fade-in text-muted-foreground leading-relaxed text-center mb-10">
            Exalter Students telah memberdayakan ribuan siswa/mahasiswa guna mencapai potensi karya inovatif mereka. Kami menawarkan solusi pelatihan dan pengembangan inovasi secara komprehensif yang dirancang untuk meningkatkan keterampilan mereka, sehingga dapat berprestasi di kancah nasional &amp; internasional.
          </p>
          <div className="fade-in grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { qty: '1000+', desc: 'Students yang bergabung' },
              { qty: '750+', desc: 'Karya dan Prestasi' },
              { qty: '50+', desc: 'Mentor terbaik' },
              { qty: '30+', desc: 'Mitra Universitas & Lembaga' },
            ].map((s) => (
              <Card key={s.desc} className="text-center bg-primary/5 border-primary/10">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{s.qty}</div>
                  <p className="text-muted-foreground text-xs mt-1">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Partnership & Media */}
          {[
            { title: 'Partnership', logos: ['brin','kumparan','creatella-impact','inventify','insfre','apec'] },
            { title: 'Media Partners', logos: ['kompasiana','tribun-news','kabar-buana','glints','antara-news','suarabaru-id'] },
          ].map((group) => (
            <div key={group.title} className="fade-in mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider text-center mb-4">{group.title}</h3>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {group.logos.map((l) => (
                  <img key={l} src={`https://exalterstudents.vercel.app/images/marquee-partners/${l}.png`} alt={l} className="h-8 max-w-[80px] object-contain opacity-70" />
                ))}
              </div>
              <p className="text-center text-muted-foreground text-xs mt-2">dan lainnya</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 3: ABOUT IRIF ═══ */}
      <section className="w-full py-16 px-4 bg-muted">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Tentang International Research and Innovation Festival (IRIF)
            </h2>
          </div>
          <div className="space-y-6">
            <Card className="fade-in">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Pendahuluan</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Program internasional yang dirancang untuk membekali peserta dengan pelatihan intensif dalam bidang penyusunan paper guna keperluan kompetisi ilmiah. Program ini mempertemukan peserta dengan para jawara ilmiah, juri/reviewer berpengalaman, dan akademisi agar peserta dapat membuat paper terbaiknya. Program ini berpuncak pada graduation, webinar, dan networking stage secara hybrid (online dan offline) yang dapat menciptakan ruang untuk bersinergi bersama.
                </p>
              </CardContent>
            </Card>
            <Card className="fade-in">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">Tujuan</h3>
                <p className="text-muted-foreground text-sm mb-3">International Research and Innovation Festival (IRIF) 2025 bertujuan untuk mencapai tujuan berikut:</p>
                <ul className="space-y-2">
                  {[
                    'Membekali peserta dengan materi intensif untuk mengasah keterampilan pembuatan esai ilmiah',
                    'Membina inovasi dan kreativitas dengan developing project',
                    'Meningkatkan peluang prestasi nasional dan internasional',
                    'Mempromosikan kolaborasi dan jaringan global',
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <CheckIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: WHY JOIN ═══ */}
      <section className="w-full py-16 px-4 bg-card">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Why Should You Join IRIF?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="fade-in border-primary/20">
              <CardContent className="p-6">
                <Badge className="bg-primary text-white mb-4">Benefit</Badge>
                <ul className="space-y-2">
                  {[
                    '4 Course Materi + 2x Mentoring',
                    '2 Sertifikat Internasional untuk portofolio akademik',
                    'Medals & Awards di Kompetisi Internasional',
                    'Grand Prizes senilai 30 juta rupiah!',
                    'Global Exposure & Collaboration Opportunity',
                    'Puluhan Contoh karya Juara, baik esai, riset, hingga PPT Presentasi',
                    'Kesempatan Hadir Offline Awarding di Event Exalter Community',
                    'Grup WhatsApp Komunitas',
                    'Fasilitas Eksklusif Lainnya',
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <CheckIcon className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="fade-in border-accent/20">
              <CardContent className="p-6">
                <Badge className="bg-accent text-white mb-4">Keunggulan</Badge>
                <ul className="space-y-3">
                  {[
                    'Materi dari pembicara terbaik',
                    'Peserta belajar menulis esai ilmiah, critical thinking, dan cara menuangkan ide dengan sistematis.',
                    'Pelatihan + kompetisi sekaligus, tidak hanya dapat ilmu, tapi diberikan ajang kontestasi di hadapan juri negeri',
                    'Membuka peluang kolaborasi riset kecil antar peserta setelah event.',
                  ].map((k) => (
                    <li key={k} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <CheckIcon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: TERMS & CONDITIONS ═══ */}
      <section className="w-full py-16 px-4 bg-muted">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Terms &amp; Conditions</h2>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Persyaratan Umum Peserta', items: [
                'Peserta mendaftar secara individu',
                'Peserta merupakan pelajar (siswa/mahasiswa) dibuktikan dengan kartu pelajar/kartu tanda mahasiswa',
                'Peserta wajib menyelesaikan proses pendaftaran dan menyerahkan semua dokumen yang dipersyaratkan sebelum batas waktu yang ditentukan.',
                'Peserta wajib mengikuti seluruh sesi dan terlibat aktif dalam seluruh kegiatan dan tugas.',
              ]},
              { title: 'Peraturan dan Ketentuan Umum', items: [
                'Peserta wajib mematuhi pedoman dan kebijakan yang ditetapkan oleh Exalter Students selama program berlangsung.',
                'Segala bentuk plagiarisme, ketidakjujuran dokumen, dan pelanggaran ketentuan akan mengakibatkan diskualifikasi langsung',
                'Seluruh kegiatan dan jadwal dapat berubah apabila terjadi force majeure.',
              ]},
              { title: 'Project Idea Areas', items: [
                'Education & Empowerment', 'Science & Technology', 'Business & Entrepreneurship',
                'Entertainment & Lifestyle', 'Environment & Sustainability', 'Health & Wellness',
                'Aqua and Agriculture', 'Social, Culture, and Tourism',
              ]},
            ].map((seg) => (
              <Card key={seg.title} className="fade-in">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">{seg.title}</h3>
                  <ul className="space-y-2">
                    {seg.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: TIMELINE ═══ */}
      <section className="w-full py-16 px-4 bg-card">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Timeline Umum Program</h2>
          </div>
          <div className="fade-in relative mb-10">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
            {[
              { title: 'Registration', desc: 'Ditutup saat kuota telah memenuhi minimal 100 peserta' },
              { title: 'Materi, Mentoring, Submission', desc: 'Week 1 - Week 4' },
              { title: 'Final Presentation', desc: 'H+14 Pelatihan akhir' },
              { title: 'Summit & Awarding Session', desc: 'H+7 Final Presentation' },
            ].map((step, i) => (
              <div key={step.title} className={`relative pl-10 ${i < 3 ? 'pb-8' : ''}`}>
                <div className="absolute left-2 w-5 h-5 rounded-full border-4 border-white shadow bg-primary" />
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <Card className="fade-in bg-primary/5 border-primary/10">
            <CardContent className="p-5">
              <h4 className="font-semibold text-foreground mb-2">Materi, Mentoring, Final Presentation dilakukan secara online menggunakan:</h4>
              <div className="flex flex-wrap gap-2">
                {['Zoom Meeting', 'Google Classroom', 'WhatsApp Group'].map((t) => (
                  <Badge key={t} variant="secondary" className="bg-primary/10 text-primary">{t}</Badge>
                ))}
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Awarding dilaksanakan secara hybrid menggunakan Zoom Meeting, bersamaan dengan kesempatan hadir offline di gala dinner dan networking session bersama di event Exalter Community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ SECTION 7: COURSE MODULES ═══ */}
      <section className="w-full py-16 px-4 bg-muted">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Course Lengkap dari A-Z</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { mod: 'Module 1', title: 'Scientific Writing Fundamentals', points: [
                'Pengenalan karya ilmiah dalam mengikuti kompetisi dan publikasi',
                'Format dan struktur karya ilmiah',
                'Praktik benar menggunakan AI dalam membuat karya ilmiah',
                'Contoh-contoh praktik yang baik, dan kesalahan umum',
              ]},
              { mod: 'Module 2', title: 'Research and Literature', points: [
                'Menentukan masalah penelitian dan merumuskan pertanyaan penelitian',
                'Studi literatur: cara mencari sumber di jurnal, buku, dan database online',
                'Teknik menganalisis dan mensintesis literatur',
                'Praktik benar menggunakan AI untuk menulis tinjauan pustaka',
              ]},
              { mod: 'Module 3', title: 'Crafting Powerful Pitch Deck', points: [
                'Strategi membuat materi presentasi untuk kompetisi riset, inovasi, dan bisnis',
                'Elemen penting yang perlu ada di dalam pitch deck',
                'Prinsip-prinsip dalam mendesain pitch deck',
                'Cara menyusun pitch deck yang selaras dengan story telling',
              ]},
              { mod: 'Module 4', title: 'Deliver Outstanding Presentation', points: [
                'Strategi menyusun teks presentasi yang menarik perhatian audiens',
                'Teknik-teknik presentasi (Gestur, intonasi, dan cara pembawaan)',
                'Hal-hal penting saat presentasi di kompetisi',
                'Tips & trik saat melakukan presentasi dan tanya jawab',
              ]},
            ].map((m) => (
              <Card key={m.mod} className="fade-in">
                <CardContent className="p-5">
                  <Badge variant="secondary" className="bg-primary/10 text-primary mb-3">{m.mod}</Badge>
                  <h3 className="font-semibold text-foreground mb-3">{m.title}</h3>
                  <ul className="space-y-1.5">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-muted-foreground text-xs">
                        <CheckIcon className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="fade-in text-center">
            <Badge className="bg-accent text-white text-sm px-4 py-2">+2 Mentoring Modules</Badge>
            <p className="text-muted-foreground text-sm mt-2">Mentoring Setiap Sabtu &amp; Minggu. Waktu: 19.30 - 21.30 (WIB Time)</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: MENTORS ═══ */}
      <section className="w-full py-16 px-4 bg-card">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Our Beloved Mentors</h2>
            <p className="text-muted-foreground">From renowned universities across the globe</p>
          </div>
          <div className="fade-in mb-8">
            <img src="https://dummyimage.com/1280x720/f0f0f0/999&text=Mentor+Team+Photo" alt="Mentors" className="w-full rounded-2xl shadow-lg" />
          </div>
          <div className="fade-in flex flex-wrap justify-center gap-2">
            {[
              'University of Nebraska Lincoln', 'The University of Edinburgh', 'National University of Singapore',
              'BRIN', 'University of Oxford', 'MIT', 'ITB', 'Universitas Kebangsaan Malaysia',
              'Universitas Padjadjaran', 'University of Malaya', 'NTU Singapore', 'Inventify Center',
              'The University of Melbourne', 'Universiti Teknologi Mara', 'Delft University of Technology',
              'Monash University', 'Korea University', 'University of Canberra', 'University of Glasgow',
              'Northern Illinois University', 'New York University',
            ].map((u) => (
              <Badge key={u} variant="outline" className="text-xs text-muted-foreground border-primary/20">{u}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FINAL PRESENTATION ═══ */}
      <section className="w-full py-16 px-4 bg-muted">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Final Presentation (International)</h2>
          </div>
          <Card className="fade-in mb-6">
            <CardContent className="p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Dokumen yang diperlukan saat final</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📄 Paper Ilmiah</h4>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    <li>• Setiap peserta wajib mengumpulkan paper ilmiah dalam form esai setelah mendapatkan pelatihan dan mentoring.</li>
                    <li>• Template esai dapat diakses melalui: <a href="https://bit.ly/TemplateExalterStudents" target="_blank" rel="noopener noreferrer" className="text-primary underline">bit.ly/TemplateExalterStudents</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📊 Power Point</h4>
                  <ul className="space-y-1.5 text-muted-foreground text-sm">
                    <li>• Presentasi harus disampaikan dalam bahasa Inggris, beserta materi presentasi (dalam format PowerPoint).</li>
                    <li>• Setiap peserta memiliki waktu 7 menit untuk pemaparan dan 8 menit untuk umpan balik dari juri (total 15 menit).</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="fade-in">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Profil Juri Internasional</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="text-center">
                      <img src={`https://dummyimage.com/150x150/e0e0e0/999&text=Juri+${j}`} alt={`Juri ${j}`} className="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
                      <p className="text-xs text-muted-foreground font-medium">TO BE ANNOUNCED</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="fade-in">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">Kriteria Penilaian</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary/5">
                      <TableHead className="text-foreground font-semibold text-sm">Kriteria</TableHead>
                      <TableHead className="text-foreground font-semibold text-sm text-right">Bobot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Urgency', weight: '30%' },
                      { name: 'Innovation', weight: '30%' },
                      { name: 'Reliability', weight: '25%' },
                      { name: 'Presentation', weight: '15%' },
                    ].map((c) => (
                      <TableRow key={c.name}>
                        <TableCell className="text-sm text-muted-foreground">{c.name}</TableCell>
                        <TableCell className="text-sm font-semibold text-primary text-right">{c.weight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <p className="fade-in text-center text-muted-foreground text-sm mt-4 italic">
            All meetings will be held online via Zoom Meeting. Link announced soon.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 10: GRADUATION & AWARDING ═══ */}
      <section className="w-full py-16 px-4 bg-card">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Graduation, Networking, and Awarding Session</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="fade-in text-center">
              <CardContent className="p-5">
                <Badge className="bg-primary text-white mb-3">Hybrid</Badge>
                <p className="text-muted-foreground text-sm">Online meeting via Zoom untuk awarding session</p>
              </CardContent>
            </Card>
            <Card className="fade-in">
              <CardContent className="p-5">
                <img src="https://dummyimage.com/500x300/e0e0e0/999&text=Gala+Dinner" alt="Gala Dinner" className="w-full rounded-lg mb-3" />
                <p className="text-muted-foreground text-sm">Peserta dengan predikat terbaik akan mendapatkan kesempatan hadir pada gala dinner/networking session di Exalter Gathering Community</p>
              </CardContent>
            </Card>
            <Card className="fade-in text-center">
              <CardContent className="p-5">
                <Badge variant="secondary" className="bg-accent/10 text-accent mb-3">Offline Location</Badge>
                <h4 className="font-semibold text-foreground text-sm mb-1">SM Tower &amp; Convention, Yogyakarta</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">Jl. KH. Ahmad Dahlan No.107, Notoprajan, Ngampilan, Kota Yogyakarta, DIY 55262</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 11: PRIZE POOL ═══ */}
      <section className="w-full py-16 px-4 bg-gradient-to-b from-warm-gray to-cream pattern-bg">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Prize Pool</h2>
          </div>
          <Card className="fade-in mb-8 bg-gradient-to-r from-product-primary to-product-primary-dark text-white border-0">
            <CardContent className="p-6 text-center">
              <h3 className="font-display text-xl font-bold mb-2">Dapatkan Grand Prizes!</h3>
              <img src="https://dummyimage.com/400x200/003D6B/fff&text=Grand+Prizes" alt="Grand Prizes" className="w-full max-w-sm mx-auto rounded-xl my-4" />
            </CardContent>
          </Card>
          <div className="fade-in mb-8">
            <h3 className="font-display text-lg font-bold text-foreground text-center mb-4">Medals Award for All Participants</h3>
            <p className="text-muted-foreground text-sm text-center mb-6">Participants will be awarded medals based on their ranking</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: 'Gold Medal', desc: 'Top 30% of total participants', color: 'from-yellow-400 to-yellow-600' },
                { title: 'Silver Medal', desc: 'Mid 50% of total participants', color: 'from-gray-300 to-gray-500' },
                { title: 'Bronze Medal', desc: 'Bottom 20% of total participants', color: 'from-orange-400 to-orange-700' },
              ].map((medal) => (
                <Card key={medal.title} className="text-center">
                  <CardContent className="p-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-b ${medal.color} mb-3 flex items-center justify-center`}>
                      <span className="text-white text-2xl">🏅</span>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm">{medal.title}</h4>
                    <p className="text-muted-foreground text-xs mt-1">{medal.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card className="fade-in">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3 text-center">International Awards Lainnya</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Best Project Award', 'Promising Project Award', 'Presentation Award',
                  'Excellence Award', 'Impactful Project Award', 'Sustainable Project Award',
                  'Smart Project Award', 'Best Pitch Deck Award', 'Best Reliability Award', 'Most Urgency Award',
                ].map((award) => (
                  <div key={award} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-accent">🏆</span>
                    <span>The Winner of {award}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ═══ SECTION 12: BONUS (placeholder) ═══ */}
      <section className="w-full py-16 px-4 bg-card">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center">
            <Badge className="bg-accent text-white px-4 py-2 text-sm font-semibold mb-4">Coming Soon</Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">BONUS Produk Eksklusif !!!</h2>
            <p className="text-muted-foreground mt-2">Detail akan segera diumumkan</p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 13: TESTIMONIALS ═══ */}
      <section className="w-full py-16 px-4 bg-muted">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Testimoni Exalter Students</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'AdieAzzam', msg: 'Definisi kualitas melampaui harga. Selain kualitas, yang diincer itu koneksinya nanti after program. di Exalter Students, alhamdulillah koneksi orang2 yang ga pelit ilmu dan mudah diajak kolaborasi.' },
              { name: 'Achintya Garg', msg: 'It was a really fun experience, really knowledgeable. Exalter Students event allowed me to take my idea globally with different countries and people.' },
              { name: 'M. Nabil', msg: 'It has been such an exciting, challenging, and eye-opening experience. Not only give you short term benefits, but also long term where you can gain valuable network.' },
              { name: 'Julianna Sebastian', msg: 'It honestly has been a great experience to be part of the Exalter Students event. We have learned so much and also from all the amazing teams and ideas.' },
              { name: 'Salsabila', msg: 'From the moment we joined, we felt the event was a great platform where young people are truly listened to, to go beyond the classroom, to collab across disciplines.' },
              { name: 'Ellisa Priastiningtyas', msg: 'As someone who did not have any expertise before, i think is such a life changing experience! Not only gaining deep understanding but also building a strong and positive community.' },
              { name: 'Novita Sari', msg: 'Aku sangat bersyukur, Setelah join di Exalter Students dapet banyak ilmu dan pengalaman, aku juga jadi punya harapan untuk job hunting.' },
            ].map((t) => (
              <Card key={t.name} className="fade-in bg-gradient-to-br from-white to-cream border-white shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-foreground text-sm">{t.name}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.msg}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 14: FAQ ═══ */}
      <section className="w-full py-16 px-4 bg-card">
        <div className="w-full max-w-3xl mx-auto">
          <div className="fade-in text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: 'Siapa saja yang bisa ikut program ini?', a: 'Peserta adalah pelajar (siswa/mahasiswa) yang masih aktif dibuktikan dengan kartu pelajar/mahasiswa.' },
              { q: 'Apakah program ini berbayar?', a: 'Ya, terdapat biaya kontribusi yang akan diinformasikan pada saat registrasi resmi. Biaya ini sudah mencakup pelatihan, mentoring, e-sertifikat internasional, akses materi, dan keikutsertaan kompetisi internasional.' },
              { q: 'Apakah semua kegiatan dilakukan secara online?', a: 'Semua acara dilaksanakan full online (Zoom, Google Classroom, WhatsApp Group). Namun, peserta yang terpilih akan mendapat kesempatan hadir di event exalter community secara offline.' },
              { q: 'Apa bentuk kompetisinya?', a: 'Kompetisinya adalah kompetisi paper ilmiah. Peserta wajib mengumpulkan paper sesuai template yang diberikan setelah mengikuti pelatihan & mentoring. Peserta akan mempresentasikan karyanya dalam bentuk PowerPoint berbahasa Inggris di hadapan juri internasional.' },
              { q: 'Bagaimana cara mendaftarnya?', a: 'Pendaftaran dilakukan secara online melalui link resmi yang dibagikan oleh Exalter Students. Pastikan semua dokumen persyaratan diunggah sebelum batas waktu.' },
              { q: 'Bagaimana bila tidak bisa ikut Offline Gathering?', a: 'Exalter Gathering Community adalah acara komunitas Exalter Students. Bila tidak bisa mengikuti, maka bisa mengikuti seremonial awarding online khusus program IRIF saja.' },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-muted rounded-xl shadow-sm border-0">
                <AccordionTrigger className="px-4 py-4 text-left font-semibold text-foreground hover:no-underline text-sm">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-muted-foreground text-sm">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══ SECTION 15: CLOSING CTA ═══ */}
      <section className="w-full py-16 px-4 bg-primary pattern-bg">
        <div className="w-full max-w-lg mx-auto text-center">
          <div className="fade-in">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">REGISTER NOW!!</h2>
            <Button asChild className="bg-cta text-cta-foreground hover:bg-cta/90 px-10 py-4 rounded-xl text-lg font-bold shadow-lg mb-8">
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Daftar Sekarang</a>
            </Button>
            <p className="text-primary-foreground/70 text-sm mb-4">If you have any question, don't hesitate to contact us!</p>
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/60 text-sm">
              <a href="mailto:exalterstudents@gmail.com" className="hover:text-primary-foreground transition-colors flex items-center gap-1">📧 exalterstudents@gmail.com</a>
              <a href="https://instagram.com/exalter_students" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors flex items-center gap-1">📸 @exalter_students</a>
              <span className="flex items-center gap-1">📞 +62 895 1950 1456</span>
              <a href="https://linkedin.com/company/exalter-students" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors flex items-center gap-1">💼 Exalter Students</a>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
