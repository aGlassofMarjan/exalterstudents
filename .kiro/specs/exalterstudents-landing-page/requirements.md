# Requirements Document

## Introduction

Exalter Students adalah platform inovasi dan pendidikan pemuda Indonesia yang memberdayakan siswa dalam akademik, karier, kepemimpinan, dan pertumbuhan pribadi. Landing page ini dibangun dengan Astro 6, React 19, Tailwind CSS v4, shadcn/ui, dan Inter variable font. Situs terdiri dari tiga halaman: Beranda (Home), Program/Layanan, dan Berita & Acara. Semua konten bersumber dari `client/public/contents/Beranda-page.md`.

## Glossary

- **Site**: Keseluruhan aplikasi web Exalter Students landing page
- **Beranda**: Halaman utama (Home) yang menampilkan Hero, About, ringkasan layanan, metrik, marquee logo mitra, dan testimoni
- **Program_Page**: Halaman Program/Layanan yang menampilkan detail lengkap enam layanan
- **Berita_Page**: Halaman Berita & Acara yang menampilkan kartu berita dan daftar acara
- **Hero_Section**: Bagian paling atas Beranda dengan judul utama dan CTA
- **About_Section**: Bagian yang menjelaskan nilai-nilai dan ringkasan platform
- **Service_Brief_Section**: Ringkasan tiga pilar layanan di Beranda
- **Service_Full_Section**: Detail lengkap enam layanan di Program_Page
- **Metrics_Section**: Bagian yang menampilkan angka pencapaian platform
- **Marquee_Section**: Bagian animasi gulir logo mitra dan media
- **Testimonial_Section**: Bagian ulasan pengguna
- **News_Section**: Bagian kartu berita dengan tautan eksternal
- **Events_Section**: Bagian daftar acara dengan tautan eksternal
- **Navigation**: Komponen navigasi global yang muncul di semua halaman
- **Footer**: Komponen footer global yang muncul di semua halaman
- **CTA**: Call-to-action, tombol atau tautan yang mendorong interaksi pengguna
- **Renderer**: Komponen Astro/React yang merender konten ke halaman

---

## Requirements

### Requirement 1: Struktur Halaman dan Navigasi Global

**User Story:** Sebagai pengunjung, saya ingin dapat berpindah antar halaman dengan mudah, sehingga saya dapat menjelajahi semua konten platform.

#### Acceptance Criteria

1. THE Site SHALL menyediakan tiga halaman yang dapat diakses: Beranda (`/`), Program/Layanan (`/program`), dan Berita & Acara (`/berita`).
2. THE Navigation SHALL menampilkan logo Exalter Students dan tautan ke ketiga halaman di setiap halaman.
3. WHEN pengguna berada di halaman aktif, THE Navigation SHALL menandai tautan halaman tersebut sebagai aktif secara visual.
4. THE Navigation SHALL bersifat responsif dan dapat digunakan pada lebar layar mulai dari 320px hingga 1920px.
5. WHEN lebar layar kurang dari 768px, THE Navigation SHALL menampilkan menu hamburger yang dapat dibuka dan ditutup.
6. THE Footer SHALL menampilkan informasi kontak, tautan media sosial, dan hak cipta di setiap halaman.
7. THE Site SHALL menggunakan Inter variable font sebagai tipografi utama di seluruh halaman.
8. THE Site SHALL menerapkan palet warna: biru tua `#1E3A8A` sebagai warna primer, `#3B82F6` sebagai aksen biru, `#0F172A` sebagai warna teks utama, putih/off-white sebagai latar belakang, dan `#F59E0B` sebagai aksen amber untuk CTA dan sorotan.

---

### Requirement 2: Hero Section (Beranda)

**User Story:** Sebagai pengunjung baru, saya ingin melihat pesan utama platform secara langsung, sehingga saya memahami nilai yang ditawarkan Exalter Students.

#### Acceptance Criteria

1. THE Hero_Section SHALL menampilkan judul: "Exalter Students, platform pembelajar untuk berkarya, berprestasi, dan meraih beasiswa".
2. THE Hero_Section SHALL menampilkan subjudul: "Exalter Students memberdayakan siswa dalam akademik, karier, kepemimpinan, dan pertumbuhan pribadi dengan sumber daya dan dukungan untuk sukses."
3. THE Hero_Section SHALL menampilkan minimal satu tombol CTA dengan warna aksen amber `#F59E0B`.
4. THE Hero_Section SHALL menampilkan elemen visual (ilustrasi atau gambar latar) yang mendukung kesan modern dan aspirasional.
5. WHEN pengguna mengakses Beranda, THE Hero_Section SHALL menjadi bagian pertama yang terlihat tanpa perlu menggulir (above the fold).

---

### Requirement 3: About Section (Beranda)

**User Story:** Sebagai pengunjung, saya ingin memahami nilai-nilai inti platform, sehingga saya dapat menilai apakah platform ini sesuai dengan kebutuhan saya.

#### Acceptance Criteria

1. THE About_Section SHALL menampilkan judul: "Membangun Masa Depan dengan Kolaborasi, Akselerasi dan Inovasi".
2. THE About_Section SHALL menampilkan subjudul: "Nilai-nilai kami adalah dasar dari setiap keputusan dan tindakan, membimbing kami untuk bertindak dengan integritas, kolaborasi, inovasi, dan komitmen terhadap keunggulan."
3. THE About_Section SHALL menampilkan tiga kartu nilai: Innovation, Collaboration, dan Acceleration, masing-masing dengan ikon relevan dan deskripsinya.
4. THE About_Section SHALL menampilkan ringkasan singkat dengan judul "Exalter Students: Mendorong Inovasi Siswa" dan deskripsi yang sesuai.
5. THE About_Section SHALL menampilkan kartu-kartu nilai dalam tata letak grid yang responsif: satu kolom pada layar kecil, tiga kolom pada layar besar (≥1024px).

---

### Requirement 4: Service Brief Section (Beranda)

**User Story:** Sebagai pengunjung, saya ingin melihat gambaran singkat layanan yang tersedia, sehingga saya tertarik untuk menjelajahi lebih lanjut.

#### Acceptance Criteria

1. THE Service_Brief_Section SHALL menampilkan judul: "Kami menyelenggarakan program yang memfasilitasi pertumbuhan, pembelajaran, dan inovasi, menginspirasi perubahan positif dalam proyek inovasi."
2. THE Service_Brief_Section SHALL menampilkan tiga kartu layanan: Innovative Program, Accessible Service, dan Endless Support, masing-masing dengan ikon dan deskripsinya.
3. THE Service_Brief_Section SHALL menampilkan tautan atau tombol CTA yang mengarahkan pengguna ke halaman Program/Layanan (`/program`).
4. THE Service_Brief_Section SHALL menampilkan kartu dalam tata letak grid responsif: satu kolom pada layar kecil, tiga kolom pada layar besar (≥1024px).

---

### Requirement 5: Metrics Section (Beranda)

**User Story:** Sebagai pengunjung, saya ingin melihat pencapaian platform secara kuantitatif, sehingga saya dapat menilai kredibilitas Exalter Students.

#### Acceptance Criteria

1. THE Metrics_Section SHALL menampilkan tiga metrik pencapaian: "15+ Program inspiratif dan inovatif", "35+ Pembicara dan mentor berpengalaman", dan "30+ Universitas dan lembaga terkemuka".
2. THE Metrics_Section SHALL menampilkan judul bagian: "Memberdayakan Generasi Inovatif" dan deskripsi: "Mendukung dan mengembangkan potensi anak muda untuk menjadi pemimpin inovasi masa depan."
3. THE Metrics_Section SHALL menampilkan dua kartu berita pencapaian dengan judul dan deskripsi sesuai konten yang telah ditentukan.
4. THE Metrics_Section SHALL menampilkan angka metrik dengan tipografi besar dan mencolok menggunakan warna primer atau aksen.

---

### Requirement 6: Marquee Section — Logo Mitra (Beranda)

**User Story:** Sebagai pengunjung, saya ingin melihat daftar mitra dan media yang bekerja sama dengan platform, sehingga saya dapat menilai kepercayaan dan jangkauan Exalter Students.

#### Acceptance Criteria

1. THE Marquee_Section SHALL menampilkan judul: "Dipercaya Oleh Lebih Dari 30+ Mitra dan Media" dan deskripsinya.
2. THE Marquee_Section SHALL menampilkan animasi gulir horizontal (marquee) yang berjalan secara otomatis dan terus-menerus untuk logo mitra dan media.
3. WHILE animasi marquee berjalan, THE Marquee_Section SHALL menampilkan logo dalam urutan berulang tanpa jeda yang terlihat (seamless loop).
4. WHEN pengguna mengarahkan kursor ke area marquee, THE Marquee_Section SHALL menghentikan animasi sementara (pause on hover).
5. THE Marquee_Section SHALL menampilkan minimal tiga ulasan pengguna (testimonial) di bawah atau di sekitar area marquee, sesuai konten yang telah ditentukan.

---

### Requirement 7: Testimonial Section (Beranda)

**User Story:** Sebagai pengunjung, saya ingin membaca pengalaman peserta sebelumnya, sehingga saya merasa yakin untuk bergabung dengan platform.

#### Acceptance Criteria

1. THE Testimonial_Section SHALL menampilkan tiga kartu ulasan: Rina Sari (Desainer Grafis), Andi Wijaya (Pengusaha), dan Lilis Kusuma (Mahasiswa Teknik), beserta kutipan masing-masing.
2. THE Testimonial_Section SHALL menampilkan nama, peran, dan teks ulasan pada setiap kartu.
3. THE Testimonial_Section SHALL menampilkan kartu dalam tata letak yang responsif: satu kolom pada layar kecil, tiga kolom pada layar besar (≥1024px).

---

### Requirement 8: Halaman Program/Layanan

**User Story:** Sebagai pengunjung yang tertarik, saya ingin melihat detail lengkap semua program yang tersedia, sehingga saya dapat memilih program yang sesuai dengan kebutuhan saya.

#### Acceptance Criteria

1. THE Program_Page SHALL dapat diakses melalui rute `/program`.
2. THE Program_Page SHALL menampilkan judul bagian: "Mendorong Pertumbuhan dan Pembelajaran lewat Program Transformatif" dan subjudulnya.
3. THE Program_Page SHALL menampilkan enam kartu layanan: Incubation, Mentorship, Competition, Conference, Summit, dan Community, masing-masing dengan nama, ikon relevan, dan deskripsi lengkap.
4. THE Program_Page SHALL menampilkan kartu layanan dalam tata letak grid responsif: satu kolom pada layar kecil, dua kolom pada layar sedang (≥768px), tiga kolom pada layar besar (≥1024px).
5. THE Program_Page SHALL menampilkan Metrics_Section yang sama dengan yang ada di Beranda (metrik pencapaian platform).

---

### Requirement 9: Halaman Berita & Acara

**User Story:** Sebagai pengunjung, saya ingin melihat berita terbaru dan acara mendatang, sehingga saya dapat mengikuti perkembangan dan berpartisipasi dalam kegiatan platform.

#### Acceptance Criteria

1. THE Berita_Page SHALL dapat diakses melalui rute `/berita`.
2. THE News_Section SHALL menampilkan lima kartu berita sesuai konten yang telah ditentukan, masing-masing dengan tanggal, judul, dan tombol "Baca Selengkapnya".
3. WHEN pengguna mengklik tombol "Baca Selengkapnya" pada kartu berita, THE News_Section SHALL membuka tautan berita di tab baru.
4. THE Events_Section SHALL menampilkan daftar dua belas acara sesuai konten yang telah ditentukan, masing-masing dengan nama acara, tanggal, dan tautan ke pengumuman.
5. WHEN pengguna mengklik tautan acara, THE Events_Section SHALL membuka tautan tersebut di tab baru.
6. THE Berita_Page SHALL menampilkan kartu berita dalam tata letak grid responsif: satu kolom pada layar kecil, dua kolom pada layar sedang (≥768px), tiga kolom pada layar besar (≥1024px).
7. THE Events_Section SHALL menampilkan acara dalam urutan kronologis terbaru ke terlama.

---

### Requirement 10: Performa dan Aksesibilitas

**User Story:** Sebagai pengunjung, saya ingin halaman dimuat dengan cepat dan dapat diakses dengan baik, sehingga pengalaman saya tidak terganggu oleh masalah teknis.

#### Acceptance Criteria

1. THE Site SHALL menghasilkan halaman statis (static HTML) melalui Astro build untuk memaksimalkan performa pemuatan awal.
2. THE Site SHALL menetapkan atribut `lang="id"` pada elemen `<html>` di setiap halaman.
3. THE Site SHALL menyertakan meta tag `description` yang relevan pada setiap halaman.
4. THE Site SHALL menyertakan atribut `alt` yang deskriptif pada setiap elemen `<img>`.
5. THE Navigation SHALL dapat dioperasikan menggunakan keyboard (tab navigation dan enter/space untuk aktivasi).
6. WHEN gambar belum dimuat, THE Renderer SHALL menampilkan teks alternatif yang bermakna sebagai pengganti.
7. THE Site SHALL menggunakan kontras warna yang memenuhi rasio minimum 4.5:1 antara teks dan latar belakang untuk teks berukuran normal.

---

### Requirement 11: Konten Bersumber dari File Markdown

**User Story:** Sebagai developer, saya ingin semua konten halaman bersumber dari file `Beranda-page.md`, sehingga pembaruan konten dapat dilakukan tanpa mengubah kode komponen.

#### Acceptance Criteria

1. THE Renderer SHALL membaca dan menggunakan konten dari `client/public/contents/Beranda-page.md` sebagai sumber data untuk semua teks, judul, dan deskripsi halaman.
2. WHEN konten di file markdown diperbarui, THE Renderer SHALL mencerminkan perubahan tersebut setelah proses build dijalankan ulang.
3. THE Renderer SHALL memetakan setiap bagian konten markdown ke komponen halaman yang sesuai tanpa duplikasi data secara manual di dalam kode komponen.
