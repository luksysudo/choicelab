import React from 'react';
import { X, CheckCircle2, HelpCircle, Compass, Gamepad2, Award, MousePointer, Volume2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Buku Panduan Penggunaan Media</h3>
              <p className="text-xs text-slate-500">Petunjuk Navigasi, Fungsi Tombol & Alur Permainan Choice Lab</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Buku Panduan"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-slate-600 leading-relaxed">
          {/* Card 1: Alur Prasyarat Permainan */}
          <section className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
            <h4 className="font-display font-bold text-amber-950 text-xs sm:text-sm mb-1.5 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-amber-700" />
              Alur Permainan: "Materi First"
            </h4>
            <p className="text-slate-700">
              Sebelum memulai misi petualangan, siswa <strong>wajib membaca Materi Pembelajaran</strong> terlebih dahulu. Setelah menekan tombol <em>"Saya Sudah Memahami Materi"</em>, tombol misi akan otomatis terbuka (*unlocked*).
            </p>
          </section>

          {/* Card 2: Penjelasan Fungsi Tombol Media */}
          <section className="space-y-3">
            <h4 className="font-display font-bold text-slate-900 text-sm">
              Fungsi Tombol & Navigasi Media
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-0.5">📖 Materi Pembelajaran</span>
                <p className="text-slate-500">Membuka modul formal Aturan Penjumlahan, Aturan Perkalian, dan Tabel Komparasi.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-0.5">🧭 Peta Dunia</span>
                <p className="text-slate-500">Kembali ke peta petualangan 3D untuk memilih misi yang sudah terbuka.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-0.5">🔊 Tombol Audio (Speaker)</span>
                <p className="text-slate-500">Menyalakan atau mematikan efek suara sintetis (*chime, success, click*).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-indigo-700 block mb-0.5">★ Bintang & Skor PTS</span>
                <p className="text-slate-500">Menghitung akumulasi bintang tantangan dan skor ketepatan konsep matematika.</p>
              </div>
            </div>
          </section>

          {/* Card 3: Cara Mengerjakan Tantangan Misi */}
          <section className="space-y-3">
            <h4 className="font-display font-bold text-slate-900 text-sm">
              Cara Mengerjakan Tantangan di Setiap Lokasi
            </h4>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <MousePointer className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-950 block">1. Interaksi Langsung Objek:</strong>
                  <span>Klik makanan untuk mengisi piring/nampan pesanan di Kafe, klik pakaian untuk mendandani manekin di Studio, atau klik peta di Kota.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-950 block">2. Analisis Aturan & Hitung Kemungkinan:</strong>
                  <span>Tentukan apakah situasi memakai Aturan Penjumlahan (+) atau Perkalian (×), lalu masukkan angka hasil perhitungan.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-950 block">3. Umpan Balik Bertahap & Reflektif:</strong>
                  <span>Jika jawaban belum tepat, sistem tidak langsung memberi jawaban akhir, melainkan memandu pemikiranmu melalui petunjuk konsep.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-950 block">4. Progresi Level:</strong>
                  <span>Selesaikan 2 tantangan pada setiap misi untuk membuka misi berikutnya hingga Final Challenge di Laboratorium.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Mengerti & Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
