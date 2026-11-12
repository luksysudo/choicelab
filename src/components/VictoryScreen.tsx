import React from 'react';
import { Award, Star, CheckCircle2, RotateCcw, Compass, BookOpen, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface VictoryScreenProps {
  score: number;
  stars: number;
  completedMissions: number[];
  onRestart: () => void;
  onNavigateToMap: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  score,
  stars,
  completedMissions,
  onRestart,
  onNavigateToMap
}) => {
  // Mastery scores and badges
  const isMaster = score >= 700;

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-indigo-100 via-purple-50 to-amber-50 p-6 md:p-10 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xl relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-amber-400 via-indigo-500 to-pink-500" />

        {/* Header Ribbon & Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 shadow-xl shadow-amber-200/60 border-4 border-white mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>SERTIFIKAT KELULUSAN MISI</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight">
            Selamat, Choice Explorer Master!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
            Kamu telah berhasil menyelesaikan seluruh 4 misi petualangan dan menuntaskan misteri Kaidah Pencacahan kelas XII SMA!
          </p>
        </div>

        {/* Score & Star Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
            <span className="text-xs text-amber-800 font-semibold block mb-0.5">Total Bintang</span>
            <div className="flex items-center justify-center gap-1 text-2xl font-black text-amber-600 font-mono">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <span>{stars} / 8</span>
            </div>
            <span className="text-[10px] text-amber-700">Tantangan Tuntas</span>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-center">
            <span className="text-xs text-indigo-800 font-semibold block mb-0.5">Skor Akhir</span>
            <span className="text-2xl font-black text-indigo-700 font-mono block">
              {score} PTS
            </span>
            <span className="text-[10px] text-indigo-600">Akurasi Sangat Tinggi</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center">
            <span className="text-xs text-emerald-800 font-semibold block mb-0.5">Predikat Penguasaan</span>
            <span className="text-lg font-black text-emerald-700 block mt-1">
              {isMaster ? 'Ahli Kombinatorika' : 'Penjelajah Terampil'}
            </span>
            <span className="text-[10px] text-emerald-600">Fase F SMA</span>
          </div>
        </div>

        {/* Diagnostic Rubric / Mastery Evaluation */}
        <div className="space-y-3 mb-8">
          <h3 className="font-display font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Rapor Pemahaman Konseptual Kaidah Pencacahan:
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">1. Aturan Penjumlahan: Menguasai Sempurna</span>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  Mampu mengenali situasi memilih 1 pilihan dari kelompok alternatif yang saling lepas (terpisah), tanpa tertipu kata penghubung semata.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">2. Aturan Perkalian: Menguasai Sempurna</span>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  Memahami prinsip kegiatan bertahap dan pemasangan elemen pada setiap tahap secara berantai.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">3. Batasan & Syarat Pasangan: Sangat Tajam</span>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  Tidak terburu-buru mengalikan angka mentah ketika terdapat aturan khusus atau pasangan terlarang.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">4. Representasi Diagram Pohon & Tabel: Mahir</span>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  Mampu melacak cabang-cabang kemungkinan yang dinamis dan menyesuaikan perhitungan saat kondisi nyata berubah.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation Callout */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 mb-8 text-xs text-amber-950">
          <span className="font-bold text-amber-900 block mb-1">Rekomendasi Lanjutan untuk Kelas XII SMA:</span>
          <p className="leading-relaxed">
            Pertahankan intuisi membedakan kegiatan bertahap vs alternatif terpisah. Konsep ini merupakan fondasi utama sebelum mempelajari materi <strong>Permutasi, Kombinasi, dan Peluang Kejadian Majemuk</strong> berikutnya!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              playSound('click');
              onRestart();
            }}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Ulang Petualangan</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              onNavigateToMap();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Kembali ke Peta Dunia</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
