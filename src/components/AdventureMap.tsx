import React, { useState } from 'react';
import { Lock, CheckCircle2, Star, Play, ChevronRight, Award, Compass, Sparkles, Trophy } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

export interface MissionMeta {
  id: number;
  viewKey: string;
  title: string;
  subtitle: string;
  difficulty: 'Mudah' | 'Menengah' | 'Tinggi' | 'Master';
  description: string;
  concepts: string[];
  image: string;
  icon: string;
  bgGradient: string;
  accentColor: string;
  totalChallenges: number;
}

export const MISSIONS_DATA: MissionMeta[] = [
  {
    id: 1,
    viewKey: 'misi-1',
    title: 'Kafe Pilihan',
    subtitle: 'Mengenali Perbedaan Aturan Penjumlahan & Perkalian',
    difficulty: 'Mudah',
    description: 'Bantu pengunjung kafe memesan hidangan tunggal vs paket kombinasi lengkap makanan, minuman, dan penutup.',
    concepts: ['Pilihan Alternatif Terpisah (Penjumlahan)', 'Pilihan Bertahap (Perkalian)', 'Nampan Pesanan Interaktif'],
    image: '/src/assets/images/mission_cafe_delight_1794313917919.jpg',
    icon: '☕',
    bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accentColor: 'amber',
    totalChallenges: 2
  },
  {
    id: 2,
    viewKey: 'misi-2',
    title: 'Studio Gaya',
    subtitle: 'Kombinasi Outfit dengan Syarat & Batasan Khusus',
    difficulty: 'Menengah',
    description: 'Padukan atasan, bawahan, dan sepatu pada manekin. Waspadai aturan khusus di mana pakaian tertentu tidak boleh dipasangkan!',
    concepts: ['Kombinasi Bebas Bertahap', 'Eliminasi Pasangan Terlarang', 'Tabel Matriks Pasangan Valid'],
    image: '/src/assets/images/mission_fashion_studio_1794313904771.jpg',
    icon: '👗',
    bgGradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    accentColor: 'pink',
    totalChallenges: 2
  },
  {
    id: 3,
    viewKey: 'misi-3',
    title: 'Rencana Akhir Pekan',
    subtitle: 'Menggabungkan Aturan Penjumlahan & Perkalian Kontekstual',
    difficulty: 'Tinggi',
    description: 'Susun agenda akhir pekan Nadia antara jalan-jalan atau workshop seni, lalu amati perubahan kemungkinan saat kondisi kota dinamis berubah.',
    concepts: ['Penggabungan Perkalian & Penjumlahan', 'Diagram Pohon Bercabang', 'Dampak Perubahan Kondisi Nyata'],
    image: '/src/assets/images/mission_city_adventure_1794313906412.jpg',
    icon: '🏙️',
    bgGradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    accentColor: 'teal',
    totalChallenges: 2
  },
  {
    id: 4,
    viewKey: 'misi-4',
    title: 'Laboratorium Kemungkinan',
    subtitle: 'Analisis Masalah Kompleks Sistem FoodGo',
    difficulty: 'Master',
    description: 'Tantangan puncak! Telusuri paket Hemat, Sehat, dan Spesial pada konsol digital holografis dengan batasan berantai.',
    concepts: ['Analisis 3 Kategori Paket', 'Penyesuaian Batasan Berantai', 'Konsol Analisis Konseptual'],
    image: '/src/assets/images/mission_futuristic_lab_1794313905721.jpg',
    icon: '🔬',
    bgGradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    accentColor: 'indigo',
    totalChallenges: 2
  }
];

interface AdventureMapProps {
  unlockedMissions: number[];
  completedMissions: number[];
  onSelectMission: (viewKey: string) => void;
  onViewFinalResults: () => void;
  hasCompletedQuiz?: boolean;
  onStartQuiz?: () => void;
  onViewQuizResult?: () => void;
  onOpenLeaderboard?: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  unlockedMissions,
  completedMissions,
  onSelectMission,
  onViewFinalResults,
  hasCompletedQuiz = false,
  onStartQuiz,
  onViewQuizResult,
  onOpenLeaderboard
}) => {
  const [activeModalMission, setActiveModalMission] = useState<MissionMeta | null>(null);

  const totalProgress = Math.round((completedMissions.length / MISSIONS_DATA.length) * 100);

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-sky-50 via-slate-50 to-indigo-50/60 p-4 md:p-8">
      {/* Map Header & Progress */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <Compass className="w-4 h-4" />
              <span>PETA PETUALANGAN 3D</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-slate-900 mt-0.5">Dunia Pilihan Kaidah Pencacahan</h2>
            <p className="text-xs text-slate-500 mt-1">
              Pilih lokasi misi aktif untuk memecahkan tantangan bertingkat. Selesaikan misi secara berurutan.
            </p>
          </div>

          {/* Progress bar and Quiz / Victory Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-[260px]">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700">
                <span>Progres Petualangan</span>
                <span className="font-mono text-indigo-600">{totalProgress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>

            {completedMissions.length === MISSIONS_DATA.length && (
              <div className="flex items-center gap-2 shrink-0">
                {!hasCompletedQuiz && onStartQuiz ? (
                  <button
                    type="button"
                    onClick={() => {
                      playSound('unlock');
                      onStartQuiz();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 animate-bounce shrink-0 cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Mulai Kuis Evaluasi (10 Soal)</span>
                  </button>
                ) : (
                  <>
                    {onViewQuizResult && (
                      <button
                        type="button"
                        onClick={() => {
                          playSound('click');
                          onViewQuizResult();
                        }}
                        className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-indigo-600" />
                        <span>Lihat Rapor Kuis</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        playSound('victory');
                        onViewFinalResults();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Rekap Petualangan</span>
                    </button>
                  </>
                )}
              </div>
            )}
            {onOpenLeaderboard && (
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onOpenLeaderboard();
                }}
                className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Peringkat Live</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Semi-Isometric Visual Map Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MISSIONS_DATA.map((mission, index) => {
          const isUnlocked = unlockedMissions.includes(mission.id);
          const isCompleted = completedMissions.includes(mission.id);
          const isCurrentTarget = isUnlocked && !isCompleted;

          return (
            <div
              key={mission.id}
              onClick={() => {
                if (isUnlocked) {
                  playSound('select');
                  setActiveModalMission(mission);
                } else {
                  playSound('wrong');
                }
              }}
              className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer isometric-card ${
                isCurrentTarget
                  ? 'bg-white border-indigo-400 ring-4 ring-indigo-200/60 shadow-xl'
                  : isCompleted
                  ? 'bg-white border-emerald-300 shadow-md'
                  : 'bg-slate-100/90 border-slate-200 opacity-70 grayscale-[30%] cursor-not-allowed'
              }`}
            >
              {/* Mission Image Backdrop */}
              <div className="relative h-44 overflow-hidden bg-slate-200">
                <img
                  src={mission.image}
                  alt={mission.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${mission.bgGradient} to-transparent`} />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center font-bold text-slate-800 text-xs shadow-md border border-white">
                    {mission.id}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-[10px] font-semibold text-white">
                    {mission.difficulty}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : !isUnlocked ? (
                    <div className="w-8 h-8 rounded-full bg-slate-800/80 text-white flex items-center justify-center shadow-md">
                      <Lock className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg animate-pulse">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Level icon float */}
                <div className="absolute bottom-3 left-3 text-3xl filter drop-shadow">
                  {mission.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                  {mission.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {mission.description}
                </p>

                {/* Key Concepts Preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {mission.concepts.slice(0, 2).map((c, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* Card Action Link */}
                <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                  {isCompleted ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      Misi Selesai (Ulangi)
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-indigo-600 flex items-center gap-1 group-hover:underline">
                      Misi Aktif · Masuk
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Selesaikan Misi {mission.id - 1}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mission Briefing Modal */}
      {activeModalMission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp">
            {/* Modal Image Header */}
            <div className="relative h-48 bg-slate-800">
              <img
                src={activeModalMission.image}
                alt={activeModalMission.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Level {activeModalMission.id} · Tingkat {activeModalMission.difficulty}
                </span>
                <h3 className="font-display font-black text-2xl mt-0.5 flex items-center gap-2">
                  <span>{activeModalMission.icon}</span>
                  <span>{activeModalMission.title}</span>
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeModalMission.description}
              </p>

              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Materi & Tantangan Kunci:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeModalMission.concepts.map((concept, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalMission(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playSound('unlock');
                    const target = activeModalMission.viewKey;
                    setActiveModalMission(null);
                    onSelectMission(target);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-display font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>MASUK KE MISI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
