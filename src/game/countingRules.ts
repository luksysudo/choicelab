/**
 * Core mathematical rules and verification logic for CHOICE LAB: Misi Menemukan Semua Kemungkinan.
 * Materi: Kaidah Pencacahan (Aturan Penjumlahan & Aturan Perkalian) Kelas XII SMA.
 */

export interface ValidationResult {
  isCorrect: boolean;
  scoreGained: number;
  feedbackTitle: string;
  feedbackMessage: string;
  ruleExplanation: string;
  formula: string;
  conceptTip?: string;
}

// ---------------------------------------------------------
// MISI 1: Kafe Pilihan
// ---------------------------------------------------------

export function validateMission1Challenge1(userAnswer: number, selectedRule: string): ValidationResult {
  const isAnswerCorrect = Number(userAnswer) === 9;
  const isRuleCorrect = selectedRule === 'penjumlahan';

  if (isAnswerCorrect && isRuleCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'Luar Biasa! Jawaban & Aturan Tepat!',
      feedbackMessage: 'Kamu memilih 1 hidangan dari kelompok yang saling terpisah (kue ATAU es krim ATAU puding). Maka banyak kemungkinan dijumlahkan.',
      formula: '4 + 3 + 2 = 9 pilihan hidangan',
      ruleExplanation: 'Aturan Penjumlahan digunakan saat kita memilih SATU alternatif dari beberapa kelompok yang saling lepas/terpisah.'
    };
  }

  if (isAnswerCorrect && !isRuleCorrect) {
    return {
      isCorrect: false,
      scoreGained: 40,
      feedbackTitle: '💡 Petunjuk Aturan Pemilihan',
      feedbackMessage: 'Angkamu sudah mendekati, tetapi periksa kembali jenis kegiatannya: Apakah kamu memilih satu hidangan saja dari beberapa kelompok alternatif terpisah, atau mengambil semuanya sekaligus?',
      formula: '',
      ruleExplanation: 'Jika kegiatan hanya memilih SATU dari beberapa alternatif pilihan terpisah yang tidak dilakukan bersamaan, gunakan Aturan Penjumlahan.',
      conceptTip: 'Coba periksa kembali: Apakah kegiatan ini menggunakan Aturan Perkalian (karena berpasangan/bertahap) atau Penjumlahan (karena pilihan alternatif)?'
    };
  }

  if (Number(userAnswer) === 24) {
    return {
      isCorrect: false,
      scoreGained: 20,
      feedbackTitle: '💡 Petunjuk: Bedakan Penjumlahan & Perkalian',
      feedbackMessage: 'Perhitungan perkalian 4 × 3 × 2 berlaku jika kamu memesan ketiganya sekaligus (kue DAN es krim DAN puding). Di sini kamu hanya ingin memilih SATU hidangan saja!',
      formula: '',
      ruleExplanation: 'Gunakan Aturan Penjumlahan ketika memilih satu opsi dari kelompok-kelompok yang saling lepas.',
      conceptTip: 'Hitung kembali dengan menjumlahkan banyak pilihan kue (4), es krim (3), dan puding (2).'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 0,
    feedbackTitle: '💡 Petunjuk Bertahap (Scaffolding Hint)',
    feedbackMessage: 'Terdapat 4 kue, 3 es krim, dan 2 puding. Kamu hanya boleh memilih SATU hidangan saja. Gunakan Aturan Penjumlahan untuk menggabungkan kelompok-kelompok alternatif tersebut.',
    formula: '',
    ruleExplanation: 'Aturan Penjumlahan digunakan saat memilih satu opsi dari beberapa kelompok yang saling lepas/terpisah.',
    conceptTip: 'Coba periksa kembali: Apakah kegiatan ini menggunakan Aturan Perkalian (karena berpasangan) atau Penjumlahan (karena alternatif)? Hitung kembali hasil penjumlahan 4 + 3 + 2.'
  };
}

export function validateMission1Challenge2(userAnswer: number, selectedRule: string): ValidationResult {
  const isAnswerCorrect = Number(userAnswer) === 24;
  const isRuleCorrect = selectedRule === 'perkalian';

  if (isAnswerCorrect && isRuleCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'Sempurna! Paket Kafe Terbentuk!',
      feedbackMessage: 'Pembuatan paket terdiri atas 3 tahap bertahap: memilih makanan utama (3 pilihan), minuman (4 pilihan), dan penutup (2 pilihan).',
      formula: '3 × 4 × 2 = 24 variasi paket pesanan',
      ruleExplanation: 'Aturan Perkalian digunakan saat kegiatan terdiri atas beberapa tahap berturut-turut di mana setiap pilihan pada suatu tahap dapat dipasangkan dengan tahap berikutnya.'
    };
  }

  if (Number(userAnswer) === 9) {
    return {
      isCorrect: false,
      scoreGained: 20,
      feedbackTitle: '💡 Petunjuk: Kegiatan Bertahap',
      feedbackMessage: 'Angka 9 didapat jika kamu hanya memilih 1 makanan ATAU 1 minuman ATAU 1 penutup. Namun satu paket pesanan harus berisi ketiganya secara berpasangan (Makanan DAN Minuman DAN Penutup).',
      formula: '',
      ruleExplanation: 'Karena kegiatan dilakukan secara bertahap dan berpasangan, gunakan Aturan Perkalian.',
      conceptTip: 'Coba periksa kembali: Kalikan banyak pilihan pada tiap tahap: 3 makanan × 4 minuman × 2 penutup.'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 0,
    feedbackTitle: '💡 Petunjuk Bertahap (Scaffolding Hint)',
    feedbackMessage: 'Tahap 1: 3 makanan utama. Tahap 2: 4 minuman. Tahap 3: 2 hidangan penutup. Satu paket lengkap mewajibkan memilih satu dari setiap tahap secara berpasangan.',
    formula: '',
    ruleExplanation: 'Gunakan Aturan Perkalian untuk kegiatan bertahap di mana setiap tahap berpasangan dengan tahap berikutnya.',
    conceptTip: 'Coba periksa kembali: Hitung hasil kali dari pilihan makanan (3) × minuman (4) × penutup (2).'
  };
}

// ---------------------------------------------------------
// MISI 2: Studio Gaya
// ---------------------------------------------------------

export function validateMission2Challenge1(userAnswer: number, selectedRule: string): ValidationResult {
  const isAnswerCorrect = Number(userAnswer) === 24;
  const isRuleCorrect = selectedRule === 'perkalian';

  if (isAnswerCorrect && isRuleCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'Kombinasi Outfit Modis & Tepat!',
      feedbackMessage: 'Untuk menyusun outfit lengkap: 4 atasan × 3 bawahan × 2 sepatu = 24 kombinasi bebas tanpa batasan.',
      formula: '4 × 3 × 2 = 24 kombinasi outfit',
      ruleExplanation: 'Setiap atasan dapat dipasangkan dengan seluruh 3 bawahan dan setiap pasangan dapat dipasangkan dengan 2 jenis sepatu.'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 20,
    feedbackTitle: '💡 Petunjuk Bertahap (Scaffolding Hint)',
    feedbackMessage: 'Untuk memakai satu set pakaian lengkap, kamu memerlukan 1 atasan DAN 1 bawahan DAN 1 pasang sepatu yang dipakai bersamaan secara berpasangan. Jika kegiatan dilakukan bertahap dan saling berpasangan, aturan apa yang digunakan? Coba kalikan banyak pilihan pada tiap tahap.',
    formula: '',
    ruleExplanation: 'Karena kegiatan dilakukan bertahap dan setiap pilihan saling berpasangan, gunakan Aturan Perkalian.',
    conceptTip: 'Coba periksa kembali: Kalikan pilihan atasan (4) × bawahan (3) × sepatu (2).'
  };
}

export function validateMission2Challenge2(userAnswer: number, explanationChoice: string): ValidationResult {
  // Atasan A: 2 pasangan (Bawahan 1 atau 2). Bawahan 3 dilarang.
  // Atasan B, C, D: masing-masing 3 pasangan = 3 + 3 + 3 = 9.
  // Total pasangan atasan-bawahan = 2 + 9 = 11 pasangan.
  // Setiap pasangan ada 2 sepatu -> 11 * 2 = 22 kombinasi.
  const isAnswerCorrect = Number(userAnswer) === 22;
  const isReasonCorrect = explanationChoice === 'syarat_khusus';

  if (isAnswerCorrect && isReasonCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'Brilian! Analisis Batasan Sangat Tajam!',
      feedbackMessage: 'Karena Atasan A hanya boleh dengan 2 bawahan, total pasangan atasan-bawahan adalah 2 + 3 + 3 + 3 = 11. Lalu dikali 2 sepatu = 22 outfit valid.',
      formula: '(2 + 3 + 3 + 3) × 2 = 11 × 2 = 22 kombinasi',
      ruleExplanation: 'Kaidah Pencacahan harus menghitung pasangan yang benar-benar memenuhi syarat. Rumus awal 4 × 3 × 2 = 24 tidak dapat langsung dipakai karena ada 1 pasang atasan-bawahan yang dilarang (1 × 2 sepatu = 2 kombinasi berkurang).'
    };
  }

  if (Number(userAnswer) === 24) {
    return {
      isCorrect: false,
      scoreGained: 20,
      feedbackTitle: '💡 Petunjuk Batasan Khusus (Scaffolding Hint)',
      feedbackMessage: 'Perhatikan Special Rule studio: Atasan A TIDAK BOLEH dipasangkan dengan Bawahan 3! Artinya, rumus perkalian bebas 4 × 3 × 2 tidak bisa langsung digunakan karena ada pasangan terlarang yang harus dieliminasi.',
      formula: '',
      ruleExplanation: 'Jangan langsung mengalikan semua pilihan jika terdapat batasan atau pasangan terlarang.',
      conceptTip: 'Coba hitung: berapa pasangan bawahan yang diperbolehkan untuk Atasan A? Dan berapa untuk atasan lainnya?'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 30,
    feedbackTitle: '💡 Petunjuk Bertahap (Scaffolding Hint)',
    feedbackMessage: 'Langkah 1: Hitung pasangan atasan-bawahan yang sah. Atasan A hanya boleh dengan 2 bawahan. Atasan B, C, dan D masing-masing dengan 3 bawahan. Langkah 2: Setelah mendapat total pasangan baju yang sah, kalikan dengan 2 pilihan sepatu.',
    formula: '',
    ruleExplanation: 'Hitung dulu banyak pasangan atasan-bawahan yang sah, baru kalikan dengan pilihan sepatu.',
    conceptTip: 'Coba jumlahkan pasangan baju (2 + 3 + 3 + 3) terlebih dahulu, kemudian kalikan dengan 2 pilihan sepatu.'
  };
}

// ---------------------------------------------------------
// MISI 3: Rencana Akhir Pekan
// ---------------------------------------------------------

export function validateMission3Challenge1(userAnswer: number, selectedRule: string): ValidationResult {
  // Rencana A (Jalan-jalan): 3 tempat wisata * 2 transportasi = 6
  // Rencana B (Workshop): 2 workshop * 3 waktu = 6
  // Nadia memilih salah satu: 6 + 6 = 12 kemungkinan.
  const isAnswerCorrect = Number(userAnswer) === 12;
  const isRuleCorrect = selectedRule === 'gabungan';

  if (isAnswerCorrect && isRuleCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'Hebat! Penggabungan Aturan Berhasil!',
      feedbackMessage: 'Rencana A = 3 × 2 = 6 kemungkinan. Rencana B = 2 × 3 = 6 kemungkinan. Karena Nadia memilih salah satu rencana alternatif, kita gunakan penjumlahan: 6 + 6 = 12.',
      formula: '(3 × 2) + (2 × 3) = 6 + 6 = 12 kemungkinan',
      ruleExplanation: 'Aturan perkalian digunakan di dalam tiap rencana (tahapan wisata & transportasi), sedangkan aturan penjumlahan digunakan untuk menggabungkan dua rencana alternatif yang terpisah.'
    };
  }

  if (Number(userAnswer) === 36) {
    return {
      isCorrect: false,
      scoreGained: 20,
      feedbackTitle: '💡 Petunjuk: Alternatif Rencana',
      feedbackMessage: 'Hasil kali 6 × 6 mengasumsikan Nadia melakukan Rencana A DAN Rencana B sekaligus pada saat yang sama. Padahal, Nadia hanya memilih SATU rencana: Rencana Jalan-jalan ATAU Rencana Workshop.',
      formula: '',
      ruleExplanation: 'Nadia hanya memilih SATU rencana alternatif, sehingga hasil dari kedua rencana harus digabungkan dengan Aturan Penjumlahan.',
      conceptTip: 'Hitung hasil Rencana A dan Rencana B secara terpisah, lalu jumlahkan keduanya.'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 20,
    feedbackTitle: '💡 Petunjuk Bertahap (Scaffolding Hint)',
    feedbackMessage: 'Langkah 1: Hitung variasi Rencana Jalan-jalan (3 tempat wisata dipasangkan dengan 2 transportasi). Langkah 2: Hitung variasi Rencana Workshop (2 workshop dipasangkan dengan 3 sesi waktu). Langkah 3: Karena kedua rencana merupakan pilihan alternatif yang terpisah, jumlahkan hasil dari kedua rencana.',
    formula: '',
    ruleExplanation: 'Selesaikan tahapan dalam tiap rencana dengan perkalian, lalu gabungkan kedua rencana dengan penjumlahan.',
    conceptTip: 'Coba hitung: (3 × 2) untuk Rencana A, dan (2 × 3) untuk Rencana B. Berapakah hasil penjumlahannya?'
  };
}

export function validateMission3Challenge2(userAnswer: number): ValidationResult {
  // Kondisi baru:
  // 1 wisata ditutup.
  // Wisata 1 yang buka: 1 transportasi.
  // Wisata 2 yang buka: 2 transportasi.
  // Rencana A = 1 + 2 = 3 kemungkinan.
  // Workshop 1: 1 waktu.
  // Workshop 2: 3 waktu.
  // Rencana B = 1 + 3 = 4 kemungkinan.
  // Total = 3 + 4 = 7 kemungkinan.
  const isAnswerCorrect = Number(userAnswer) === 7;

  if (isAnswerCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'Tepat Sekali! Analisis Diagram Pohon Sempurna!',
      feedbackMessage: 'Rencana A (Wisata): Wisata 1 (1 opsi) + Wisata 2 (2 opsi) = 3 kemungkinan. Rencana B (Workshop): WS 1 (1 opsi) + WS 2 (3 opsi) = 4 kemungkinan. Total = 3 + 4 = 7 kemungkinan.',
      formula: '(1 + 2) + (1 + 3) = 3 + 4 = 7 kemungkinan',
      ruleExplanation: 'Ketika kondisi tidak simetris (setiap tempat memiliki jumlah cabang yang berbeda), kita menghitung cabang per cabang lalu menjumlahkannya.'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 30,
    feedbackTitle: '💡 Petunjuk Cabang Diagram Pohon',
    feedbackMessage: 'Perhatikan cabang diagram pohon yang tidak lagi seragam: Rencana A: Wisata 1 hanya memiliki 1 rute transportasi yang buka, Wisata 2 memiliki 2 rute. Rencana B: Workshop 1 memiliki 1 jadwal, Workshop 2 memiliki 3 jadwal. Hitung banyak cabang di Rencana A dan Rencana B, lalu jumlahkan.',
    formula: '',
    ruleExplanation: 'Karena cabang tiap destinasi berbeda, hitung dan jumlahkan cabang-cabang yang aktif.',
    conceptTip: 'Coba hitung: Rencana A memiliki (1 + 2) cabang, Rencana B memiliki (1 + 3) cabang. Berapa total cabang aktif keduanya?'
  };
}

// ---------------------------------------------------------
// MISI 4: Laboratorium Kemungkinan (Final Challenge)
// ---------------------------------------------------------

export function validateMission4Challenge1(userAnswer: number, detailHemat: number, detailSehat: number, detailSpesial: number): ValidationResult {
  // Hemat: 3 * 2 = 6, minus 1 = 5
  // Sehat: 2 * 3 = 6
  // Spesial: 2 + 1 = 3
  // Total: 5 + 6 + 3 = 14
  const isTotalCorrect = Number(userAnswer) === 14;
  const isDetailsCorrect = Number(detailHemat) === 5 && Number(detailSehat) === 6 && Number(detailSpesial) === 3;

  if (isTotalCorrect && isDetailsCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'MASTER OF COMBINATORICS! Analisis Sempurna!',
      feedbackMessage: 'Paket Hemat: 5 valid (6 - 1 terlarang). Paket Sehat: 6 valid (2 × 3). Paket Spesial: 3 valid (2 + 1). Total kemungkinan = 5 + 6 + 3 = 14 paket.',
      formula: 'Hemat (5) + Sehat (6) + Spesial (3) = 14 kemungkinan',
      ruleExplanation: 'Di dalam tiap paket kita menganalisis pasangan yang sah, lalu menggabungkan ketiga paket alternatif dengan Aturan Penjumlahan.'
    };
  }

  if (isTotalCorrect && !isDetailsCorrect) {
    return {
      isCorrect: false,
      scoreGained: 60,
      feedbackTitle: '💡 Petunjuk: Rincian Paket Belum Pas',
      feedbackMessage: 'Angka total 14 sudah kamu dapatkan, namun rincian kemungkinan pada kolom Paket Hemat, Sehat, atau Spesial masih perlu diperiksa. Cermati diagram cabang tiap paket di atas konsol!',
      formula: '',
      ruleExplanation: 'Setiap kolom rincian paket harus diisi dengan banyak pasangan sah pada paket tersebut.',
      conceptTip: 'Periksa kembali: Paket Hemat ada 1 pasangan terlarang. Paket Sehat 2 makanan × 3 minuman. Paket Spesial ada cabang terpisah (2 + 1).'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 30,
    feedbackTitle: '💡 Petunjuk Konsol Analisis Paket',
    feedbackMessage: 'Mari analisis per paket: Paket Hemat (3 makanan × 2 minuman, dikurangi 1 pasangan yang dilarang sistem). Paket Sehat (2 makanan dipasangkan dengan 3 minuman). Paket Spesial (makanan A ada 2 minuman, makanan B ada 1 minuman). Isi rincian tiap paket lalu jumlahkan.',
    formula: '',
    ruleExplanation: 'Kurangkan pasangan yang dilarang pada Paket Hemat, hitung perkalian pada Paket Sehat, dan jumlahkan cabang pada Paket Spesial.',
    conceptTip: 'Coba hitung: Hemat = (3 × 2 - 1), Sehat = (2 × 3), Spesial = (2 + 1). Lalu jumlahkan ketiga hasil tersebut!'
  };
}

export function validateMission4Challenge2(userAnswer: number): ValidationResult {
  // Kondisi Perubahan Sistem:
  // Paket Sehat: Dari 2 makanan dan 3 minuman, 1 jenis minuman tidak tersedia (habis). Sehingga sisa minuman adalah 2 (2 makanan × 2 minuman = 4 pasangan).
  // Paket Hemat: Dari 3 makanan dan 2 minuman, pasangan yang sebelumnya dilarang kini dibuka kembali secara penuh (3 makanan × 2 minuman = 6 pasangan).
  // Paket Spesial: Makanan 1 dapat dipasangkan dengan 2 jenis minuman (2 pasang), dan Makanan 2 dipasangkan dengan 1 jenis minuman (1 pasang). Total = 2 + 1 = 3 pasangan.
  // Total kemungkinan baru = 6 + 4 + 3 = 13 kemungkinan paket
  const isAnswerCorrect = Number(userAnswer) === 13;

  if (isAnswerCorrect) {
    return {
      isCorrect: true,
      scoreGained: 100,
      feedbackTitle: 'LUAR BIASA! Simulasi Data Berhasil!',
      feedbackMessage: 'Paket Sehat: 2 makanan × 2 minuman = 4 pasangan. Paket Hemat: 3 makanan × 2 minuman = 6 pasangan. Paket Spesial: Makanan 1 (2 pasang) + Makanan 2 (1 pasang) = 3 pasangan. Total seluruh kemungkinan paket baru = 6 + 4 + 3 = 13 kemungkinan paket.',
      formula: 'Hemat (6) + Sehat (4) + Spesial (3) = 13 kemungkinan',
      ruleExplanation: 'Saat kondisi sistem disimulasikan ulang, kita menghitung banyak pasangan sah tiap paket (Perkalian pada Paket Hemat dan Sehat, serta kombinasi cabang pada Paket Spesial), lalu menggabungkan seluruh paket alternatif dengan Aturan Penjumlahan.'
    };
  }

  return {
    isCorrect: false,
    scoreGained: 30,
    feedbackTitle: '💡 Petunjuk Simulasi Perubahan Sistem',
    feedbackMessage: 'Perhatikan 3 rincian perubahan data: 1. Paket Sehat: Dari 2 makanan dan 3 minuman, 1 jenis minuman tidak tersedia (habis). Sehingga sisa minuman adalah 2 (2 makanan × 2 minuman). 2. Paket Hemat: Pasangan yang sebelumnya dilarang kini dibuka kembali secara penuh (3 makanan × 2 minuman). 3. Paket Spesial: Makanan 1 (2 pasang) + Makanan 2 (1 pasang) = 3 pasangan. Hitung kembali total kemungkinan baru dengan menjumlahkan ketiganya.',
    formula: '',
    ruleExplanation: 'Hitung kembali kapasitas masing-masing paket setelah data disimulasikan ulang, lalu jumlahkan ketiganya.',
    conceptTip: 'Coba hitung: Paket Sehat (2 makanan × 2 minuman = 4), Paket Hemat (3 makanan × 2 minuman = 6), dan Paket Spesial (2 + 1 = 3). Berapakah jumlah total ketiganya?'
  };
}
