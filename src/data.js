
export const projectsData = [
  {
    id: 1,
    title: "Alpan Agro Jaya",
    category: "Website Company Profile",
    description: "Company profile website untuk perusahaan agribisnis dengan desain modern dan informasi lengkap tentang produk dan layanan.",
    image: "/assets/proyek/alpanagro.png",
    techStack: ["Next.js", "CSS", "JavaScript"],
    link: "https://alpan-agro-jaya.vercel.app/",
    reverse: false
  },
  {
    id: 2,
    title: "H2O Pure Bali",
    category: "Layout Company Profile",
    description: "Desain UI/UX layout company profile untuk perusahaan air minum dengan konsep clean dan modern.",
    image: "/assets/proyek/H2Opurebali.jpeg",
    techStack: ["Figma", "UI/UX Design"],
    link: "https://www.figma.com/design/XFhqjrIOSDc46SRi68lLXt/H2OPURE-Layout-Company-Profile?node-id=0-1&t=GMLgkYsmFXmG3jbX-1",
    reverse: true
  },
  {
    id: 3,
    title: "Buku Tahunan Siswa SMKN 1 Lumajang",
    category: "Website Online Book",
    description: "Platform digital untuk buku tahunan siswa dengan fitur galeri foto, profil siswa, dan kenangan sekolah.",
    image: "/assets/proyek/bukutahunansiswa.png",
    techStack: ["HTML", "CSS", "JavaScript", "PHP"],
    link: "https://jurnalistik.smkn1lmj.sch.id/bts-smk/",
    reverse: false
  },
  {
    id: 4,
    title: "Seblak Sultan Bleesing Store",
    category: "Website Company Profile",
    description: "Website company profile untuk bisnis kuliner dengan tampilan menarik dan informasi menu lengkap.",
    image: "/assets/proyek/blessingstore.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://praktikum-sizie.vercel.app/",
    reverse: true
  },
  {
    id: 5,
    title: "Management BarangKu",
    category: "Website Management Stok Barang",
    description: "Aplikasi web untuk mengelola inventori dan stok barang dengan fitur CRUD lengkap dan dashboard analytics.",
    image: "/assets/proyek/barangku.png",
    techStack: ["HTML", "CSS", "JavaScript", "PHP"],
    link: "https://projek-barangku.netlify.app/",
    reverse: false
  },
  {
    id: 6,
    title: "Krunchi Melt Profile",
    category: "Website Company Profile",
    description: "Website katalog produk untuk bisnis makanan dengan tampilan gallery yang menarik dan user-friendly.",
    image: "/assets/proyek/krunchimelt.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://renn6508.github.io/html_catalog/",
    reverse: true
  }
];

// Skills Data (Bonus - bisa juga di-extract)
export const skillsData = {
  languages: [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "PHP",
    "Next.js",
    "Lua 5.1",
    "Flutter",
    "Git"
  ],
  tools: [
    "GitHub",
    "VS Code",
    "Figma",
    "Composer",
    "Node Js",
    "Postman"
  ]
};

// --- TAMBAHAN DATA SERTIFIKAT ---
export const certificatesData = [
  {
    id: 1,
    title: "Sertifikat Pelatihan Keterampilan Kewirausahaan SMK",
    issuer: "Dinas Pendidikan Provinsi Jatim dengan Institut Teknologi Sepuluh Nopember",
    date: "2026",
    image: "/assets/sertifikat/sertifikat-pervekt.png", // Ganti dengan path gambar sertifikatmu
    pdf: "/assets/sertifikat-pervekt"    // Ganti dengan path file PDFmu
  },
  {
    id: 2,
    title: "Dicoding: Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2023",
    image: "/assets/sertifikat/cert-dicoding.jpg",
    pdf: "/assets/sertifikat/cert-dicoding.pdf"
  },
  {
    id: 3,
    title: "Lomba Kompetensi Siswa (LKS) Web Tech",
    issuer: "Dinas Pendidikan Prov. Jatim",
    date: "2025",
    image: "/assets/sertifikat/cert-lks.jpg",
    pdf: "/assets/sertifikat/cert-lks.pdf"
  }
];