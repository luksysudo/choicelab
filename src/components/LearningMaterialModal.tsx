import React, { useState } from 'react';
import { X, BookOpen, CheckCircle, ArrowRight, Table, Layers, Sparkles, CheckCheck } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface LearningMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  onCompleteMaterial: () => void;
}

export const LearningMaterialModal: React.FC<LearningMaterialModalProps> = ({
  isOpen,
  onClose,
  isCompleted,
  onCompleteMaterial
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'penjumlahan' | 'perkalian' | 'komparasi'>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 text-white px-6 py-4 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/20">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">
                  Modul Resmi Kelas XII SMA
                </span>
                <span className="text-xs text-indigo-200">Kaidah Pencacahan (Asmar Achmad, 2020)</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white">Materi Pembelajaran: Aturan Penjumlahan & Perkalian</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Materi Pembelajaran"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filter Nav */}
        <div className="bg-slate-100/90 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActiveTab('all');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-indigo-700 shadow-sm font-bold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Bagian
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActiveTab('penjumlahan');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'penjumlahan'
                  ? 'bg-amber-50 text-amber-900 shadow-sm font-bold border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A. Aturan Penjumlahan
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActiveTab('perkalian');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'perkalian'
                  ? 'bg-teal-50 text-teal-900 shadow-sm font-bold border border-teal-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              B. Aturan Perkalian
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActiveTab('komparasi');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'komparasi'
                  ? 'bg-purple-50 text-purple-900 shadow-sm font-bold border border-purple-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              C. Tabel Komparasi
            </button>
          </div>

          <div className="text-[11px] font-medium text-slate-500">
            Prasyarat Wajib untuk Membuka Misi Petualangan
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-1 text-slate-700 text-sm leading-relaxed">
          {/* BAGIAN A: ATURAN PENJUMLAHAN */}
          {(activeTab === 'all' || activeTab === 'penjumlahan') && (
            <section className="bg-amber-50/50 rounded-3xl p-6 border border-amber-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-display font-bold flex items-center justify-center text-sm shadow">
                    A
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-base text-amber-950">
                      Aturan Penjumlahan (Addition Rule)
                    </h4>
                    <span className="text-xs text-amber-800">
                      Konsep Peristiwa Saling Lepas & Alternatif Terpisah
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg">
                  Kata Kunci: "ATAU"
                </span>
              </div>

              {/* Pengertian Formal */}
              <div className="bg-white/90 p-4 rounded-2xl border border-amber-200/80 space-y-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  1. Pengertian Formal (Asmar Achmad, 2020):
                </span>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed italic">
                  "Jika suatu kejadian pertama dapat terjadi dalam <span className="font-mono font-bold text-amber-800">n₁</span> cara yang berbeda, kejadian kedua dalam <span className="font-mono font-bold text-amber-800">n₂</span> cara yang berbeda, dan seterusnya hingga kejadian ke-<span className="font-mono font-bold text-amber-800">k</span> dalam <span className="font-mono font-bold text-amber-800">nₖ</span> cara yang berbeda, serta kejadian-kejadian tersebut <strong>saling lepas</strong> (tidak dapat terjadi secara bersamaan/sekaligus), maka banyaknya cara terjadinya salah satu kejadian tersebut adalah:"
                </p>
                <div className="bg-amber-100/70 p-3 rounded-xl border border-amber-300 text-center font-mono font-bold text-sm text-amber-950 shadow-inner">
                  Total Cara = n₁ + n₂ + n₃ + ... + nₖ
                </div>
              </div>

              {/* Ciri Khas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-1">Ciri Khas Situasi:</span>
                  <p className="text-slate-600">
                    Digunakan ketika seseorang memilih <strong>SATU alternatif pilihan</strong> dari beberapa opsi kelompok yang saling terpisah. Kejadian yang satu meniadakan kejadian lainnya (bersifat eksklusif).
                  </p>
                </div>

                <div className="bg-white/80 p-3.5 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-1">Ciri Soal Cerita:</span>
                  <p className="text-slate-600">
                    Pertanyaan biasanya menanyakan: "Berapa banyak pilihan untuk memilih satu...", atau menghubungkan kelompok alternatif dengan kata penghubung <strong>"ATAU"</strong>.
                  </p>
                </div>
              </div>

              {/* Contoh Kontekstual */}
              <div className="bg-white/95 p-4 rounded-2xl border border-amber-200/90 text-xs space-y-1.5">
                <span className="font-bold text-slate-800 block">💡 Contoh Kontekstual Modul:</span>
                <p className="text-slate-600">
                  Seorang siswa hendak membeli satu minuman di kantin sekolah. Tersedia <strong>3 jenis jus buah</strong>, <strong>4 jenis susu kemasan</strong>, dan <strong>2 jenis teh dingin</strong>. Berapa banyak pilihan minuman yang dapat dipilih oleh siswa tersebut?
                </p>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-slate-800 text-[11px]">
                  <strong>Penyelesaian:</strong> Karena siswa hanya memilih <em>satu minuman saja</em> (jus ATAU susu ATAU teh), maka gunakan Aturan Penjumlahan:
                  <div className="text-amber-800 font-bold mt-1">Total Pilihan = 3 + 4 + 2 = 9 cara pilihan minuman.</div>
                </div>
              </div>
            </section>
          )}

          {/* BAGIAN B: ATURAN PERKALIAN */}
          {(activeTab === 'all' || activeTab === 'perkalian') && (
            <section className="bg-teal-50/50 rounded-3xl p-6 border border-teal-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-teal-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-display font-bold flex items-center justify-center text-sm shadow">
                    B
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-base text-teal-950">
                      Aturan Perkalian (Multiplication Rule)
                    </h4>
                    <span className="text-xs text-teal-800">
                      Konsep Kegiatan Bertahap Berurutan (Sequential Stages)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-teal-100 text-teal-900 border border-teal-300 px-2.5 py-1 rounded-lg">
                  Kata Kunci: "DAN"
                </span>
              </div>

              {/* Pengertian Formal */}
              <div className="bg-white/90 p-4 rounded-2xl border border-teal-200/80 space-y-2">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
                  1. Pengertian Formal (Asmar Achmad, 2020):
                </span>
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed italic">
                  "Jika suatu kegiatan terdiri dari <span className="font-mono font-bold text-teal-800">k</span> tahapan berurutan, di mana tahap pertama dapat terjadi dalam <span className="font-mono font-bold text-teal-800">n₁</span> cara, tahap kedua dapat terjadi dalam <span className="font-mono font-bold text-teal-800">n₂</span> cara setelah tahap pertama terjadi, dan seterusnya hingga tahap ke-<span className="font-mono font-bold text-teal-800">k</span> terjadi dalam <span className="font-mono font-bold text-teal-800">nₖ</span> cara, maka banyaknya cara keseluruhan kegiatan tersebut terjadi secara berurutan/bersamaan adalah:"
                </p>
                <div className="bg-teal-100/70 p-3 rounded-xl border border-teal-300 text-center font-mono font-bold text-sm text-teal-950 shadow-inner">
                  Total Cara = n₁ × n₂ × n₃ × ... × nₖ
                </div>
              </div>

              {/* Ciri Khas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white/80 p-3.5 rounded-xl border border-teal-200">
                  <span className="font-bold text-teal-900 block mb-1">Ciri Khas Situasi:</span>
                  <p className="text-slate-600">
                    Digunakan untuk susunan atau pasangan <strong>BERTAHAP</strong> yang harus diselesaikan dari tahap awal hingga akhir. Setiap opsi di tahap satu dapat dipasangkan dengan opsi di tahap berikutnya.
                  </p>
                </div>

                <div className="bg-white/80 p-3.5 rounded-xl border border-teal-200">
                  <span className="font-bold text-teal-900 block mb-1">Ciri Soal Cerita:</span>
                  <p className="text-slate-600">
                    Menghubungkan tahapan pemilihan yang harus terjadi bersama-sama, dengan kata penghubung <strong>"DAN"</strong> atau konsep pasangan kombinasi (misal: pakaian, rute, kode plat nomor).
                  </p>
                </div>
              </div>

              {/* Contoh Kontekstual */}
              <div className="bg-white/95 p-4 rounded-2xl border border-teal-200/90 text-xs space-y-1.5">
                <span className="font-bold text-slate-800 block">💡 Contoh Kontekstual Modul:</span>
                <p className="text-slate-600">
                  Dari kota A ke kota B ada <strong>3 rute bus</strong> yang berbeda, dan dari kota B ke kota C ada <strong>4 rute kereta</strong> yang berbeda. Jika seseorang berangkat dari kota A menuju kota C melalui kota B, berapa banyak variasi rute perjalanan yang dapat ditempuh?
                </p>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-slate-800 text-[11px]">
                  <strong>Penyelesaian:</strong> Karena kegiatan terdiri dari 2 tahap berurutan (dari A ke B <em>DAN</em> dari B ke C), maka gunakan Aturan Perkalian:
                  <div className="text-teal-800 font-bold mt-1">Total Rute Perjalanan = 3 × 4 = 12 variasi rute.</div>
                </div>
              </div>
            </section>
          )}

          {/* BAGIAN C: TABEL KOMPARASI PERBEDAAN */}
          {(activeTab === 'all' || activeTab === 'komparasi') && (
            <section className="bg-purple-50/50 rounded-3xl p-6 border border-purple-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-purple-200">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-display font-bold flex items-center justify-center text-sm shadow">
                  C
                </span>
                <div>
                  <h4 className="font-display font-bold text-base text-purple-950">
                    Ringkasan Perbedaan: Tabel Komparasi
                  </h4>
                  <span className="text-xs text-purple-800">
                    Panduan Cepat Membedakan Saling Lepas vs Rangkaian Bertahap
                  </span>
                </div>
              </div>

              {/* Comprehensive Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="p-3 font-bold w-1/4">Aspek Pembeda</th>
                      <th className="p-3 font-bold text-amber-900 bg-amber-50/70 border-l border-slate-200 w-3/8">
                        ➕ Aturan Penjumlahan
                      </th>
                      <th className="p-3 font-bold text-teal-900 bg-teal-50/70 border-l border-slate-200 w-3/8">
                        ✖️ Aturan Perkalian
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">Karakteristik Kegiatan</td>
                      <td className="p-3 text-slate-700 bg-amber-50/30 border-l border-slate-200">
                        Memilih <strong>SATU pilihan</strong> dari beberapa kelompok pilihan yang terpisah.
                      </td>
                      <td className="p-3 text-slate-700 bg-teal-50/30 border-l border-slate-200">
                        Menyusun paket/rangkaian <strong>BERTAHAP</strong> dari awal hingga akhir.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">Kondisi Kejadian</td>
                      <td className="p-3 text-slate-700 bg-amber-50/30 border-l border-slate-200">
                        <strong>Saling Lepas</strong> (tidak mungkin terjadi bersamaan / saling meniadakan).
                      </td>
                      <td className="p-3 text-slate-700 bg-teal-50/30 border-l border-slate-200">
                        <strong>Berpasangan / Beruntun</strong> (setiap pilihan tahap 1 berpasangan dengan tahap 2, dst).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">Kata Kunci Umum Soal</td>
                      <td className="p-3 text-slate-700 bg-amber-50/30 border-l border-slate-200 font-bold text-amber-800">
                        "ATAU"
                      </td>
                      <td className="p-3 text-slate-700 bg-teal-50/30 border-l border-slate-200 font-bold text-teal-800">
                        "DAN"
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">Operasi Hitung</td>
                      <td className="p-3 font-mono font-bold text-amber-800 bg-amber-50/30 border-l border-slate-200">
                        n₁ + n₂ + ... + nₖ
                      </td>
                      <td className="p-3 font-mono font-bold text-teal-800 bg-teal-50/30 border-l border-slate-200">
                        n₁ × n₂ × ... × nₖ
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">Contoh Nyata Game</td>
                      <td className="p-3 text-slate-700 bg-amber-50/30 border-l border-slate-200">
                        Misi 1: Memilih 1 hidangan (Kue ATAU Es Krim ATAU Puding).
                      </td>
                      <td className="p-3 text-slate-700 bg-teal-50/30 border-l border-slate-200">
                        Misi 2: Membuat set outfit (Atasan DAN Bawahan DAN Sepatu).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-700 bg-slate-50/40">Jika Ada Syarat Khusus</td>
                      <td className="p-3 text-slate-700 bg-amber-50/30 border-l border-slate-200">
                        Hanya menjumlahkan kelompok alternatif yang memenuhi kriteria.
                      </td>
                      <td className="p-3 text-slate-700 bg-teal-50/30 border-l border-slate-200">
                        Eliminasi pasangan terlarang / hitung cabang sah secara terpisah (jangan asal kali).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Peringatan Konsep Pengingat */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-indigo-900 block mb-0.5">Catatan Penting Guru Pembimbing:</span>
              <p className="leading-relaxed">
                Kata hubung "dan" atau "atau" tidak boleh dijadikan satu-satunya patokan buta! Fokuslah selalu pada <strong>struktur kegiatan</strong>: apakah kamu hanya memilih salah satu alternatif independen, ataukah kamu merakit kombinasi bertahap.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Area */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600 flex items-center gap-2">
            {isCompleted ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                Materi telah dipahami · Misi Petualangan Terbuka!
              </span>
            ) : (
              <span className="text-amber-800 font-medium">
                Klik tombol di samping setelah selesai membaca untuk membuka misi.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Tutup Sementara
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('unlock');
                onCompleteMaterial();
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Saya Sudah Memahami Materi (Buka Misi)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
