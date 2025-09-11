import type { NewsArticle, Regulation, Admission } from './types';

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'pendaftaran-mahasiswa-baru-dibuka',
    title: 'Pendaftaran Mahasiswa Baru 2024 Telah Dibuka',
    excerpt: 'Universitas ternama di seluruh Indonesia secara resmi membuka jalur pendaftaran untuk calon mahasiswa baru tahun ajaran 2024/2025.',
    content: `
      <h2>Pembukaan Jalur Pendaftaran Nasional</h2>
      <p>Pendaftaran Seleksi Nasional Berdasarkan Prestasi (SNBP) dan Seleksi Nasional Berdasarkan Tes (SNBT) telah dibuka serentak. Calon mahasiswa dihimbau untuk segera mempersiapkan dokumen dan persyaratan yang diperlukan. Pastikan untuk memeriksa jadwal penting agar tidak terlewat.</p>
      <h2>Persyaratan Umum</h2>
      <p>Beberapa persyaratan umum yang harus dipenuhi antara lain:</p>
      <ul>
        <li>Lulusan SMA/SMK/MA atau sederajat tahun 2022, 2023, dan 2024.</li>
        <li>Memiliki akun SNPMB yang sudah permanen.</li>
        <li>Nilai rapor semester 1-5 yang telah diisikan di PDSS.</li>
      </ul>
      <blockquote>Penting bagi siswa untuk memverifikasi data mereka di portal SNPMB sebelum melakukan finalisasi pendaftaran.</blockquote>
      <p>Untuk informasi lebih lanjut mengenai persyaratan khusus setiap program studi, kunjungi situs resmi universitas tujuan.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/news1/600/400',
    imageHint: 'students lecture',
    publicationDate: '2024-07-15T09:00:00Z',
    category: 'Higher Education',
    source: 'Kemdikbudristek',
    sourceUrl: 'https://www.kemdikbud.go.id/',
  },
  {
    id: '2',
    slug: 'beasiswa-lpdp-tahap-2',
    title: 'LPDP Buka Pendaftaran Beasiswa Tahap 2',
    excerpt: 'Lembaga Pengelola Dana Pendidikan (LPDP) kembali membuka kesempatan bagi putra-putri terbaik bangsa untuk melanjutkan studi S2 dan S3.',
    content: `
      <h2>Peluang Studi di Luar Negeri</h2>
      <p>LPDP membuka pendaftaran beasiswa tahap 2 yang mencakup berbagai universitas terkemuka di dunia. Program ini bertujuan untuk meningkatkan kualitas sumber daya manusia Indonesia. Beasiswa mencakup biaya pendidikan, biaya hidup, dan tunjangan lainnya.</p>
      <h3>Jadwal Penting</h3>
      <ul>
        <li>Pendaftaran: 19 Juni - 18 Juli 2024</li>
        <li>Seleksi Administrasi: 22 Juli - 7 Agustus 2024</li>
        <li>Pengumuman Hasil Seleksi Administrasi: 9 Agustus 2024</li>
      </ul>
      <p>Para pendaftar diharapkan untuk membaca buku panduan secara saksama dan mempersiapkan esai serta dokumen pendukung lainnya dengan baik. Persaingan diperkirakan akan sangat ketat.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/news2/600/400',
    imageHint: 'graduation cap',
    publicationDate: '2024-06-20T14:30:00Z',
    category: 'Scholarships',
    source: 'LPDP Kemenkeu',
    sourceUrl: 'https://lpdp.kemenkeu.go.id/',
  },
  {
    id: '3',
    slug: 'permendikbud-pencegahan-kekerasan',
    title: 'Aturan Baru Permendikbudristek No. 46 Tahun 2023',
    excerpt: 'Pemerintah menerbitkan peraturan baru untuk pencegahan dan penanganan kekerasan di lingkungan satuan pendidikan.',
    content: `
      <h2>Lingkungan Belajar yang Aman</h2>
      <p>Permendikbudristek Nomor 46 Tahun 2023 menjadi payung hukum untuk menciptakan lingkungan pendidikan yang aman, nyaman, dan bebas dari kekerasan. Peraturan ini mencakup pencegahan dan penanganan kekerasan, termasuk perundungan, kekerasan seksual, dan intoleransi.</p>
      <p>Setiap sekolah diwajibkan untuk membentuk Tim Pencegahan dan Penanganan Kekerasan (TPPK) sebagai garda terdepan dalam menangani laporan kasus. Peraturan ini juga menekankan pentingnya pendidikan karakter dan empati kepada siswa.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/news3/600/400',
    imageHint: 'government building',
    publicationDate: '2024-07-01T11:00:00Z',
    category: 'Government Regulations',
    source: 'JDIH Kemdikbud',
    sourceUrl: 'https://jdih.kemdikbud.go.id/',
  },
  {
    id: '4',
    slug: 'kurikulum-merdeka-di-sekolah-dasar',
    title: 'Implementasi Kurikulum Merdeka di Sekolah Dasar',
    excerpt: 'Kurikulum Merdeka kini menjadi fokus utama dalam transformasi pendidikan dasar, memberikan fleksibilitas lebih bagi guru dan siswa.',
    content: `
      <h2>Fokus pada Pembelajaran Esensial</h2>
      <p>Kurikulum Merdeka dirancang untuk memberikan keleluasaan kepada guru untuk memilih materi ajar yang sesuai dengan kebutuhan dan minat siswa. Ini memungkinkan pembelajaran yang lebih mendalam dan tidak terburu-buru.</p>
      <h3>Projek Penguatan Profil Pelajar Pancasila (P5)</h3>
      <p>Salah satu elemen kunci dari Kurikulum Merdeka adalah P5, di mana siswa belajar melalui proyek-proyek yang relevan dengan kehidupan sehari-hari dan mengembangkan karakter sesuai Profil Pelajar Pancasila. Ini membantu siswa menjadi lebih kreatif, kritis, dan kolaboratif.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/news5/600/400',
    imageHint: 'children classroom',
    publicationDate: '2024-07-22T08:00:00Z',
    category: 'Primary Education',
    source: 'Pusat Kurikulum',
    sourceUrl: 'https://kurikulum.kemdikbud.go.id/',
  },
  {
    id: '5',
    slug: 'program-magang-bersertifikat-kampus-merdeka',
    title: 'Ribuan Mahasiswa Ikuti Program Magang Bersertifikat',
    excerpt: 'Program Magang dan Studi Independen Bersertifikat (MSIB) angkatan terbaru telah dimulai, memberikan pengalaman kerja nyata bagi mahasiswa.',
    content: `
      <h2>Pengalaman Dunia Kerja</h2>
      <p>MSIB adalah bagian dari kebijakan Kampus Merdeka yang memungkinkan mahasiswa untuk belajar di luar program studi mereka. Melalui magang di perusahaan terkemuka, mahasiswa dapat mengasah keterampilan teknis dan soft skills yang dibutuhkan di dunia kerja.</p>
      <p>Program ini memberikan konversi hingga 20 SKS, memungkinkan mahasiswa untuk lulus tepat waktu sambil mendapatkan pengalaman berharga. Mitra industri yang terlibat mencakup perusahaan teknologi, BUMN, dan startup ternama.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/news4/600/400',
    imageHint: 'student library',
    publicationDate: '2024-07-18T10:00:00Z',
    category: 'Higher Education',
    source: 'Kampus Merdeka',
    sourceUrl: 'https://kampusmerdeka.kemdikbud.go.id/',
  },
  {
    id: '6',
    slug: 'ppdb-zonasi-2024',
    title: 'Evaluasi Pelaksanaan PPDB Sistem Zonasi 2024',
    excerpt: 'Pelaksanaan Penerimaan Peserta Didik Baru (PPDB) dengan sistem zonasi tahun 2024 menuai berbagai tanggapan dari masyarakat dan pengamat pendidikan.',
    content: `
      <h2>Tujuan Pemerataan Akses</h2>
      <p>Sistem zonasi bertujuan untuk menghilangkan 'sekolah favorit' dan memastikan pemerataan akses serta kualitas pendidikan di seluruh wilayah. Namun, dalam pelaksanaannya, masih ditemukan beberapa kendala seperti manipulasi data domisili dan kapasitas sekolah yang tidak merata.</p>
      <p>Pemerintah daerah dan pusat terus berkoordinasi untuk mengevaluasi dan memperbaiki sistem ini di tahun-tahun mendatang. Masukan dari orang tua dan masyarakat menjadi bahan pertimbangan penting untuk penyempurnaan kebijakan.</p>
    `,
    imageUrl: 'https://picsum.photos/seed/news6/600/400',
    imageHint: 'signing document',
    publicationDate: '2024-07-25T15:00:00Z',
    category: 'Government Regulations',
    source: 'Itjen Kemdikbud',
    sourceUrl: 'https://itjen.kemdikbud.go.id/',
  },
];

export const regulations: Regulation[] = [
  {
    id: 'reg-1',
    title: 'Permendikbudristek No. 46 Tahun 2023',
    summary: 'Peraturan Menteri tentang Pencegahan dan Penanganan Kekerasan di Lingkungan Satuan Pendidikan (PPKSP).',
    documentUrl: 'https://jdih.kemdikbud.go.id/detail_peraturan?main=3037',
    issuedBy: 'Kemdikbudristek',
    effectiveDate: '2023-08-03T00:00:00Z',
  },
  {
    id: 'reg-2',
    title: 'Permendikbud No. 1 Tahun 2021',
    summary: 'Peraturan Menteri tentang Penerimaan Peserta Didik Baru (PPDB) pada TK, SD, SMP, SMA, dan SMK.',
    documentUrl: 'https://jdih.kemdikbud.go.id/detail_peraturan?main=2324',
    issuedBy: 'Kemdikbud',
    effectiveDate: '2021-01-07T00:00:00Z',
  },
  {
    id: 'reg-3',
    title: 'UU No. 20 Tahun 2003',
    summary: 'Undang-Undang tentang Sistem Pendidikan Nasional (Sisdiknas). Merupakan landasan hukum utama penyelenggaraan pendidikan di Indonesia.',
    documentUrl: 'https://peraturan.bpk.go.id/Details/43920/uu-no-20-tahun-2003',
    issuedBy: 'Pemerintah RI',
    effectiveDate: '2003-07-08T00:00:00Z',
  },
];

export const admissions: Admission[] = [
  {
    id: 'adm-1',
    university: 'Universitas Indonesia (UI)',
    logoUrl: 'https://picsum.photos/seed/ui-logo/100/100',
    logoHint: 'university logo',
    deadline: '28 Juli 2024 (Jalur Mandiri)',
    documents: ['Ijazah Legalisir', 'SKHUN', 'Rapor Semester 1-6', 'Pas Foto'],
    portalUrl: 'https://penerimaan.ui.ac.id/',
  },
  {
    id: 'adm-2',
    university: 'Universitas Gadjah Mada (UGM)',
    logoUrl: 'https://picsum.photos/seed/ugm-logo/100/100',
    logoHint: 'university logo',
    deadline: '25 Juli 2024 (CBT-UM)',
    documents: ['Sertifikat UTBK', 'Ijazah/SKL', 'Surat Pernyataan'],
    portalUrl: 'https://um.ugm.ac.id/',
  },
  {
    id: 'adm-3',
    university: 'Institut Teknologi Bandung (ITB)',
    logoUrl: 'https://picsum.photos/seed/itb-logo/100/100',
    logoHint: 'university logo',
    deadline: '22 Juli 2024 (Seleksi Mandiri)',
    documents: ['Nilai UTBK', 'Nilai Rapor', 'Sertifikat Prestasi (jika ada)'],
    portalUrl: 'https://admission.itb.ac.id/',
  },
  {
    id: 'adm-4',
    university: 'IPB University',
    logoUrl: 'https://picsum.photos/seed/ipb-logo/100/100',
    logoHint: 'university logo',
    deadline: '19 Juli 2024 (SM-IPB)',
    documents: ['Skor UTBK', 'Rapor', 'Esai'],
    portalUrl: 'https://admisi.ipb.ac.id/',
  },
];
