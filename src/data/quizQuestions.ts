/**
 * 10 Soal Evaluasi Akhir Kaidah Pencacahan (Aturan Penjumlahan & Aturan Perkalian)
 * Kelas XII SMA - Berdasarkan Kurikulum & Modul Asmar Achmad (2020)
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  topic: 'Aturan Penjumlahan' | 'Aturan Perkalian' | 'Gabungan & Batasan Khusus';
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Di sebuah garasi terdapat 3 unit sepeda motor berbeda merk, 2 unit mobil berbeda tipe, dan 4 unit sepeda listrik. Jika Pak Rahmat ingin mengendarai SALAH SATU kendaraan yang ada di garasi untuk pergi ke pasar, berapa banyak pilihan kendaraan yang dapat ia gunakan?',
    options: [
      { key: 'A', text: '9 pilihan' },
      { key: 'B', text: '24 pilihan' },
      { key: 'C', text: '14 pilihan' },
      { key: 'D', text: '12 pilihan' }
    ],
    correctAnswer: 'A',
    topic: 'Aturan Penjumlahan',
    explanation: 'Pak Rahmat hanya memilih SATU kendaraan dari beberapa kelompok alternatif yang saling lepas (motor ATAU mobil ATAU sepeda). Sesuai Aturan Penjumlahan: 3 + 2 + 4 = 9 pilihan.'
  },
  {
    id: 2,
    question: 'Seorang siswa memiliki 4 kemeja warna berbeda, 3 celana panjang warna berbeda, dan 2 pasang sepatu model berbeda. Jika ia ingin mengenakan setelan lengkap yang terdiri atas satu kemeja, satu celana, dan satu pasang sepatu, banyak variasi setelan yang dapat dibentuk adalah...',
    options: [
      { key: 'A', text: '9 variasi' },
      { key: 'B', text: '18 variasi' },
      { key: 'C', text: '24 variasi' },
      { key: 'D', text: '32 variasi' }
    ],
    correctAnswer: 'C',
    topic: 'Aturan Perkalian',
    explanation: 'Pemilihan setelan pakaian merupakan kegiatan bertahap yang harus dilakukan berurutan secara bersamaan (Kemeja DAN Celana DAN Sepatu). Berdasarkan Aturan Perkalian: 4 × 3 × 2 = 24 variasi setelan.'
  },
  {
    id: 3,
    question: 'Perhatikan pernyataan berikut: "Aturan Penjumlahan digunakan ketika kegiatan terdiri dari kejadian-kejadian yang bersifat saling lepas, sedangkan Aturan Perkalian digunakan ketika kegiatan terdiri dari tahapan-tahapan yang terjadi berurutan/berpasangan." Pernyataan tersebut adalah...',
    options: [
      { key: 'A', text: 'Benar, karena saling lepas berarti memilih salah satu, sedangkan bertahap berarti berpasangan' },
      { key: 'B', text: 'Salah, karena Aturan Penjumlahan hanya untuk menghitung frekuensi kejadian peluang' },
      { key: 'C', text: 'Salah, karena Aturan Perkalian hanya berlaku jika jumlah pilihannya sama' },
      { key: 'D', text: 'Kurang tepat, karena Aturan Penjumlahan selalu melibatkan kata penghubung "dan"' }
    ],
    correctAnswer: 'A',
    topic: 'Aturan Penjumlahan',
    explanation: 'Pernyataan tersebut benar seutuhnya. Inti Aturan Penjumlahan adalah kejadian saling lepas (memilih 1 alternatif saja), sedangkan Aturan Perkalian adalah kegiatan bertahap yang berpasangan.'
  },
  {
    id: 4,
    question: 'Dari kota A ke kota B dapat dilalui oleh 4 jalan berbeda, dan dari kota B ke kota C dapat dilalui oleh 3 jalan berbeda. Budi bepergian dari kota A ke kota C melalui B, kemudian kembali lagi ke kota A melalui B. Jika saat perjalanan pulang Budi TIDAK BOLEH melewati jalan yang sudah dilewati saat berangkat, berapa banyak variasi rute perjalanan pulang-pergi yang dapat dipilih?',
    options: [
      { key: 'A', text: '144 rute' },
      { key: 'B', text: '72 rute' },
      { key: 'C', text: '36 rute' },
      { key: 'D', text: '24 rute' }
    ],
    correctAnswer: 'B',
    topic: 'Aturan Perkalian',
    explanation: 'Perjalanan terdiri dari 4 tahap bertahap: (1) A ke B = 4 jalan, (2) B ke C = 3 jalan, (3) Pulang C ke B (tersisa 2 jalan karena 1 sudah dilewati), (4) Pulang B ke A (tersisa 3 jalan). Total variasi rute = 4 × 3 × 2 × 3 = 72 rute.'
  },
  {
    id: 5,
    question: 'Disediakan angka-angka 1, 2, 3, 4, 5, dan 6. Dari angka-angka tersebut akan dibentuk bilangan ratusan (terdiri dari 3 angka) yang bernilai GANJIL dan TIDAK MEMILIKI ANGKA BERULANG. Berapa banyak bilangan yang dapat dibentuk?',
    options: [
      { key: 'A', text: '60 bilangan' },
      { key: 'B', text: '72 bilangan' },
      { key: 'C', text: '90 bilangan' },
      { key: 'D', text: '120 bilangan' }
    ],
    correctAnswer: 'A',
    topic: 'Gabungan & Batasan Khusus',
    explanation: 'Bilangan ganjil mensyaratkan angka satuan (posisi terakhir) harus ganjil: {1, 3, 5} -> ada 3 pilihan. Posisi ratusan (posisi pertama): dari 6 angka, 1 sudah dipakai satuan, tersisa 5 pilihan. Posisi puluhan (posisi tengah): tersisa 4 pilihan. Total bilangan = 5 × 4 × 3 = 60 bilangan.'
  },
  {
    id: 6,
    question: 'Dina ingin berangkat kuliah dari rumahnya ke kampus. Ia dapat memilih salah satu dari dua jalur utama: Jalur Barat (tersedia 3 pilihan angkutan umum yang masing-masing memiliki 2 jadwal keberangkatan) ATAU Jalur Timur (tersedia 2 pilihan bus kampus yang masing-masing memiliki 3 jadwal keberangkatan). Banyak pilihan rute dan jadwal yang dapat dipilih Dina adalah...',
    options: [
      { key: 'A', text: '12 pilihan' },
      { key: 'B', text: '36 pilihan' },
      { key: 'C', text: '10 pilihan' },
      { key: 'D', text: '18 pilihan' }
    ],
    correctAnswer: 'A',
    topic: 'Gabungan & Batasan Khusus',
    explanation: 'Jalur Barat = 3 angkutan × 2 jadwal = 6 pilihan. Jalur Timur = 2 bus × 3 jadwal = 6 pilihan. Karena Dina hanya memilih SALAH SATU jalur (Jalur Barat ATAU Jalur Timur), gunakan Aturan Penjumlahan: 6 + 6 = 12 pilihan.'
  },
  {
    id: 7,
    question: 'Ada 4 siswa putra (A, B, C, D) dan 3 siswa putri (X, Y, Z) yang akan dipasangkan untuk regu ganda campuran bulu tangkis (1 putra dan 1 putri). Namun, siswa A dan siswa X TIDAK BOLEH dipasangkan karena alasan teknis pelatih. Berapa banyak pasangan ganda campuran yang memenuhi syarat?',
    options: [
      { key: 'A', text: '12 pasangan' },
      { key: 'B', text: '11 pasangan' },
      { key: 'C', text: '10 pasangan' },
      { key: 'D', text: '7 pasangan' }
    ],
    correctAnswer: 'B',
    topic: 'Gabungan & Batasan Khusus',
    explanation: 'Total kombinasi tanpa syarat = 4 putra × 3 putri = 12 pasangan. Karena ada 1 pasangan terlarang (A + X), maka pasangan yang sah = 12 - 1 = 11 pasangan. (Atau: A punya 2 pilihan {Y, Z}, B, C, D masing-masing 3 pilihan -> 2 + 3 + 3 + 3 = 11).'
  },
  {
    id: 8,
    question: 'Suatu panitia lomba menyusun nomor peserta yang terdiri dari 1 huruf vokal pada posisi awal (A, I, U, E, O) diikuti oleh 2 angka berbeda dari {1, 2, 3, 4, 5}. Berapa banyak nomor peserta berbeda yang dapat dibuat?',
    options: [
      { key: 'A', text: '100 nomor' },
      { key: 'B', text: '125 nomor' },
      { key: 'C', text: '25 nomor' },
      { key: 'D', text: '50 nomor' }
    ],
    correctAnswer: 'A',
    topic: 'Aturan Perkalian',
    explanation: 'Tahap 1 (Huruf vokal): 5 pilihan. Tahap 2 (Angka pertama): 5 pilihan. Tahap 3 (Angka kedua, berbeda): 4 pilihan. Total nomor = 5 × 5 × 4 = 100 nomor peserta.'
  },
  {
    id: 9,
    question: 'Sebuah kafe menyediakan dua jenis promo paket makan siang. Paket Reguler terdiri atas pilihan 4 makanan utama dan 2 minuman. Paket Komplit terdiri atas pilihan 3 makanan utama, 3 minuman, dan 2 hidangan penutup. Jika seorang pelanggan hanya memesan SATU paket promo (Paket Reguler ATAU Paket Komplit), banyak kemungkinan paket berbeda yang dapat ia nikmati adalah...',
    options: [
      { key: 'A', text: '14 kemungkinan' },
      { key: 'B', text: '26 kemungkinan' },
      { key: 'C', text: '144 kemungkinan' },
      { key: 'D', text: '24 kemungkinan' }
    ],
    correctAnswer: 'B',
    topic: 'Gabungan & Batasan Khusus',
    explanation: 'Banyak variasi Paket Reguler = 4 × 2 = 8 variasi. Banyak variasi Paket Komplit = 3 × 3 × 2 = 18 variasi. Pelanggan hanya memilih salah satu paket, maka gunakan Aturan Penjumlahan: 8 + 18 = 26 kemungkinan.'
  },
  {
    id: 10,
    question: 'Pada diagram pohon kemungkinan, jika titik awal bercabang ke 3 kelompok utama, kemudian masing-masing cabang pertama terbagi lagi menjadi 4 ranting, maka banyak hasil akhir yang terbentuk pada ujung ranting diagram pohon tersebut dapat dihitung dengan...',
    options: [
      { key: 'A', text: 'Aturan Penjumlahan, yaitu 3 + 4 = 7 ujung' },
      { key: 'B', text: 'Aturan Perkalian, yaitu 3 × 4 = 12 ujung' },
      { key: 'C', text: 'Aturan Pengurangan, yaitu 4 - 3 = 1 ujung' },
      { key: 'D', text: 'Aturan Pembagian, yaitu 4 / 3 ujung' }
    ],
    correctAnswer: 'B',
    topic: 'Aturan Perkalian',
    explanation: 'Setiap cabang dari 3 cabang utama dipasangkan dengan 4 ranting berikutnya secara beruntun. Perkalian cabang 3 × 4 = 12 ujung kemungkinan menggambarkan penerapan fundamental dari Aturan Perkalian.'
  }
];
