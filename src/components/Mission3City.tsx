import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Compass, MapPin, Bus, Bike, Clock, Calendar } from 'lucide-react';
import { validateMission3Challenge1, validateMission3Challenge2, ValidationResult } from '../game/countingRules.ts';
import { TreeDiagram, TreeNode } from './TreeDiagram.tsx';
import { playSound } from '../utils/audio.ts';

interface Mission3CityProps {
  onCompleteChallenge: (missionId: number, challengeIndex: number, score: number) => void;
  onNavigateToNext: () => void;
  onBackToMap: () => void;
}

export const Mission3City: React.FC<Mission3CityProps> = ({
  onCompleteChallenge,
  onNavigateToNext,
  onBackToMap
}) => {
  const [currentChallenge, setCurrentChallenge] = useState<1 | 2>(1);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Active highlighted activity in city
  const [activePlan, setActivePlan] = useState<'plan_a' | 'plan_b'>('plan_a');
  const [selectedCitySpot, setSelectedCitySpot] = useState<string>('taman');

  // Challenge 1 inputs & result
  const [c1Rule, setC1Rule] = useState<'penjumlahan' | 'perkalian' | 'gabungan' | ''>('');
  const [c1Answer, setC1Answer] = useState<string>('');
  const [c1Result, setC1Result] = useState<ValidationResult | null>(null);

  // Challenge 2 inputs & result
  const [c2Answer, setC2Answer] = useState<string>('');
  const [c2Result, setC2Result] = useState<ValidationResult | null>(null);

  // Submit Challenge 1
  const handleCheckC1 = () => {
    if (!c1Answer || !c1Rule) {
      playSound('wrong');
      return;
    }
    const val = validateMission3Challenge1(Number(c1Answer), c1Rule);
    setC1Result(val);
    if (val.isCorrect) {
      playSound('correct');
      onCompleteChallenge(3, 1, val.scoreGained);
    } else {
      playSound('wrong');
    }
  };

  // Submit Challenge 2
  const handleCheckC2 = () => {
    if (!c2Answer) {
      playSound('wrong');
      return;
    }
    const val = validateMission3Challenge2(Number(c2Answer));
    setC2Result(val);
    if (val.isCorrect) {
      playSound('correct');
      onCompleteChallenge(3, 2, val.scoreGained);
    } else {
      playSound('wrong');
    }
  };

  // Tree data for Challenge 1 (Normal symmetric condition)
  const treeDataC1: TreeNode[] = [
    {
      id: 'plan_a_node',
      label: 'Rencana A: Wisata',
      category: '3 Tempat × 2 Transport',
      icon: '🌳',
      children: [
        {
          id: 'taman_node',
          label: 'Taman Kota',
          children: [
            { id: 'taman_bus', label: 'Bus Kota 🚌' },
            { id: 'taman_bike', label: 'Sepeda 🚲' }
          ]
        },
        {
          id: 'bioskop_node',
          label: 'Bioskop Cineplex',
          children: [
            { id: 'bioskop_bus', label: 'Bus Kota 🚌' },
            { id: 'bioskop_bike', label: 'Sepeda 🚲' }
          ]
        },
        {
          id: 'galeri_node',
          label: 'Galeri Seni',
          children: [
            { id: 'galeri_bus', label: 'Bus Kota 🚌' },
            { id: 'galeri_bike', label: 'Sepeda 🚲' }
          ]
        }
      ]
    },
    {
      id: 'plan_b_node',
      label: 'Rencana B: Workshop',
      category: '2 Workshop × 3 Waktu',
      icon: '🎨',
      children: [
        {
          id: 'ws_robot',
          label: 'Workshop Robotika',
          children: [
            { id: 'ws_rob_pagi', label: 'Pagi (09.00)' },
            { id: 'ws_rob_siang', label: 'Siang (13.00)' },
            { id: 'ws_rob_sore', label: 'Sore (16.00)' }
          ]
        },
        {
          id: 'ws_lukis',
          label: 'Workshop Melukis',
          children: [
            { id: 'ws_luk_pagi', label: 'Pagi (09.00)' },
            { id: 'ws_luk_siang', label: 'Siang (13.00)' },
            { id: 'ws_luk_sore', label: 'Sore (16.00)' }
          ]
        }
      ]
    }
  ];

  // Tree data for Challenge 2 (Dynamic changed condition)
  const treeDataC2: TreeNode[] = [
    {
      id: 'c2_plan_a',
      label: 'Rencana A: Wisata',
      category: 'Kondisi Berubah: 1 + 2 = 3',
      icon: '🌳',
      children: [
        {
          id: 'c2_taman',
          label: 'Taman Kota (Buka)',
          children: [
            { id: 'c2_taman_bus', label: 'Bus Kota 🚌', isInvalid: true },
            { id: 'c2_taman_bike', label: 'Sepeda 🚲 (1 Opsi Saja)' }
          ]
        },
        {
          id: 'c2_bioskop',
          label: 'Bioskop (Buka)',
          children: [
            { id: 'c2_bio_bus', label: 'Bus Kota 🚌' },
            { id: 'c2_bio_bike', label: 'Sepeda 🚲' }
          ]
        },
        {
          id: 'c2_galeri',
          label: 'Galeri Seni (TUTUP)',
          isInvalid: true,
          children: []
        }
      ]
    },
    {
      id: 'c2_plan_b',
      label: 'Rencana B: Workshop',
      category: 'Kondisi Berubah: 1 + 3 = 4',
      icon: '🎨',
      children: [
        {
          id: 'c2_ws_robot',
          label: 'Workshop Robotika',
          children: [
            { id: 'c2_rob_pagi', label: 'Pagi 09.00 (Tersedia)' },
            { id: 'c2_rob_siang', label: 'Siang 13.00', isInvalid: true },
            { id: 'c2_rob_sore', label: 'Sore 16.00', isInvalid: true }
          ]
        },
        {
          id: 'c2_ws_lukis',
          label: 'Workshop Melukis',
          children: [
            { id: 'c2_luk_pagi', label: 'Pagi 09.00' },
            { id: 'c2_luk_siang', label: 'Siang 13.00' },
            { id: 'c2_luk_sore', label: 'Sore 16.00' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-teal-50/60 via-emerald-50/40 to-slate-50 p-4 md:p-8">
      {/* Top Banner / Mission Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-teal-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-2xl shadow-inner">
              🏙️
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>MISI 3 · RENCANA AKHIR PEKAN</span>
                <span className="text-slate-300">·</span>
                <span>Tantangan {currentChallenge} dari 2</span>
              </div>
              <h2 className="font-display font-bold text-xl text-slate-900">
                {currentChallenge === 1 ? 'Tantangan 1: Memilih Satu Rencana Alternatif' : 'Tantangan 2: Perubahan Kondisi Dinamis Kota'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  playSound('select');
                  setCurrentChallenge(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentChallenge === 1 ? 'bg-white text-teal-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Rencana A vs B
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('select');
                  setCurrentChallenge(2);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentChallenge === 2 ? 'bg-white text-teal-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Perubahan Kondisi
              </button>
            </div>

            <button
              type="button"
              onClick={onBackToMap}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Kembali ke Peta
            </button>
          </div>
        </div>
      </div>

      {/* Main City Workspace */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left City Map & Plan Explorer (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 3D City Isometric Overview */}
          <div className="relative rounded-3xl overflow-hidden bg-teal-900/10 border border-teal-200/80 shadow-md">
            <img
              src="/src/assets/images/mission_city_adventure_1794313906412.jpg"
              alt="Peta Kota Pilihan"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover object-center filter brightness-[0.98]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-5">
              <div className="text-white">
                <span className="text-xs font-semibold text-teal-300 uppercase tracking-wide">
                  Peta Aktivitas Akhir Pekan Nadia
                </span>
                <p className="text-xs text-slate-200 mt-1 max-w-lg leading-relaxed">
                  "Nadia memiliki waktu luang pada akhir pekan. Ia ingin memilih <strong>satu dari dua rencana kegiatan</strong>: Rencana A (Jalan-jalan) atau Rencana B (Workshop)."
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Plan Selector Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Plan A Card */}
            <div
              onClick={() => {
                playSound('select');
                setActivePlan('plan_a');
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activePlan === 'plan_a'
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                  <span>🌳</span>
                  <span>Rencana A: Jalan-jalan</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {currentChallenge === 1 ? '3 × 2 = 6 Opsi' : 'Kini: 1 + 2 = 3 Opsi'}
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• 3 Tempat Wisata: Taman Kota, Bioskop, Galeri Seni</li>
                <li>• 2 Transportasi: Bus Kota 🚌 & Sepeda Santai 🚲</li>
              </ul>
              {currentChallenge === 2 && (
                <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  ⚠️ Perubahan: Galeri Seni TUTUP. Taman Kota hanya ada 1 transport (sepeda). Bioskop ada 2 transport.
                </div>
              )}
            </div>

            {/* Plan B Card */}
            <div
              onClick={() => {
                playSound('select');
                setActivePlan('plan_b');
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activePlan === 'plan_b'
                  ? 'bg-teal-50 border-teal-400 ring-2 ring-teal-200 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-xs text-teal-900 flex items-center gap-1.5">
                  <span>🎨</span>
                  <span>Rencana B: Workshop</span>
                </span>
                <span className="text-[10px] font-mono text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  {currentChallenge === 1 ? '2 × 3 = 6 Opsi' : 'Kini: 1 + 3 = 4 Opsi'}
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• 2 Workshop: Robotika & Melukis Kanvas</li>
                <li>• 3 Pilihan Waktu: Pagi (09.00), Siang (13.00), Sore (16.00)</li>
              </ul>
              {currentChallenge === 2 && (
                <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  ⚠️ Perubahan: Workshop Robotika hanya ada 1 jadwal (Pagi). Workshop Melukis tetap 3 jadwal.
                </div>
              )}
            </div>
          </div>

          {/* Interactive Decision Tree Diagram for the active challenge */}
          <TreeDiagram
            rootLabel="Agenda Nadia"
            data={currentChallenge === 1 ? treeDataC1 : treeDataC2}
            title={
              currentChallenge === 1
                ? 'Diagram Pohon: Semua Kemungkinan Agenda Akhir Pekan'
                : 'Diagram Pohon: Kemungkinan Setelah Perubahan Kondisi Kota'
            }
          />
        </div>

        {/* Right Question & Concept Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* CHALLENGE 1 QUESTION */}
          {currentChallenge === 1 && (
            <div className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                Tantangan 1: Rencana Akhir Pekan Nadia
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Nadia hanya akan memilih <strong>salah satu rencana</strong> (Rencana A ATAU Rencana B).
              </p>

              {/* Step 1: Rule Selector */}
              <div className="space-y-2 mb-4">
                <label className="block text-xs font-semibold text-slate-700">
                  1. Bagaimana struktur operasi yang benar untuk menggabungkan kemungkinan tersebut?
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSound('select');
                      setC1Rule('gabungan');
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      c1Rule === 'gabungan'
                        ? 'bg-teal-50 border-teal-400 text-teal-900 font-semibold ring-2 ring-teal-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-bold block mb-0.5">Gabungan Perkalian & Penjumlahan</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Perkalian di dalam setiap rencana bertahap, lalu dijumlahkan karena kedua rencana adalah alternatif terpisah: (3×2) + (2×3).
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSound('select');
                      setC1Rule('perkalian');
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      c1Rule === 'perkalian'
                        ? 'bg-teal-50 border-teal-400 text-teal-900 font-semibold ring-2 ring-teal-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-bold block mb-0.5">Hanya Perkalian (6 × 6 = 36)</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Mengalikan hasil Rencana A dengan Rencana B seolah Nadia menjalankan keduanya.
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2: Number Input */}
              <div className="space-y-2 mb-5">
                <label htmlFor="m3c1-input" className="block text-xs font-semibold text-slate-700">
                  2. Berapa total kemungkinan rencana akhir pekan yang dapat dipilih Nadia?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="m3c1-input"
                    type="number"
                    value={c1Answer}
                    onChange={(e) => setC1Answer(e.target.value)}
                    placeholder="Masukkan angka..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">kemungkinan</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckC1}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Periksa Jawaban</span>
              </button>

              {/* Feedback Box */}
              {c1Result && (
                <div
                  className={`mt-5 p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                    c1Result.isCorrect
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-sm'
                      : 'bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-sm'
                  }`}
                >
                  <div className="font-bold font-display text-sm mb-1 flex items-center gap-1.5">
                    {c1Result.isCorrect ? '✨' : '💡'} {c1Result.feedbackTitle}
                  </div>
                  <p className="mb-2 leading-relaxed">{c1Result.feedbackMessage}</p>

                  {c1Result.isCorrect && c1Result.formula && (
                    <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200 font-mono text-[11px] mb-2 text-emerald-900 shadow-2xs">
                      <strong>Perhitungan:</strong> {c1Result.formula}
                    </div>
                  )}

                  <p className="text-[11px] opacity-90">{c1Result.ruleExplanation}</p>

                  {!c1Result.isCorrect && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-900 text-[11px]">
                      <span className="font-bold block mb-0.5">🔄 Masih Belum Pas:</span>
                      <span>{c1Result.conceptTip || 'Silakan hitung kembali dan perbaiki angka pada kolom input di atas!'}</span>
                    </div>
                  )}

                  {c1Result.isCorrect && (
                    <div className="mt-4 pt-3 border-t border-emerald-200 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          playSound('unlock');
                          setCurrentChallenge(2);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Lanjut ke Tantangan 2 (Kondisi Dinamis)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CHALLENGE 2 QUESTION (DYNAMIC CONDITIONS) */}
          {currentChallenge === 2 && (
            <div className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="inline-block px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                Simulasi Perubahan Kondisi Kota
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                Tantangan 2: Perubahan Kondisi Nyata
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Kondisi kota berubah secara nyata:
              </p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5 mb-4 text-slate-700">
                <div className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>1 tempat wisata ditutup (Galeri Seni).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Wisata 1 (Taman Kota): hanya ada 1 pilihan transport (sepeda).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>Wisata 2 (Bioskop): tersedia 2 pilihan transport (bus & sepeda).</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Workshop 1 (Robotika): hanya tersedia pada 1 waktu.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Workshop 2 (Melukis): tersedia pada 3 waktu.</span>
                </div>
              </div>

              {/* Step 2: Number Input */}
              <div className="space-y-2 mb-5">
                <label htmlFor="m3c2-input" className="block text-xs font-semibold text-slate-700">
                  Berapa banyak kemungkinan rencana akhir pekan yang masih dapat dipilih Nadia?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="m3c2-input"
                    type="number"
                    value={c2Answer}
                    onChange={(e) => setC2Answer(e.target.value)}
                    placeholder="Masukkan angka..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">kemungkinan</span>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Petunjuk: Hitung cabang yang sah pada Rencana A, hitung cabang pada Rencana B, lalu jumlahkan.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckC2}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Periksa Jawaban</span>
              </button>

              {/* Feedback Box */}
              {c2Result && (
                <div
                  className={`mt-5 p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                    c2Result.isCorrect
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-sm'
                      : 'bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-sm'
                  }`}
                >
                  <div className="font-bold font-display text-sm mb-1 flex items-center gap-1.5">
                    {c2Result.isCorrect ? '✨' : '💡'} {c2Result.feedbackTitle}
                  </div>
                  <p className="mb-2 leading-relaxed">{c2Result.feedbackMessage}</p>

                  {c2Result.isCorrect && c2Result.formula && (
                    <div className="bg-white/90 p-2.5 rounded-xl border border-emerald-200 font-mono text-[11px] mb-2 text-emerald-900 shadow-2xs">
                      <strong>Perhitungan Rinci:</strong> {c2Result.formula}
                    </div>
                  )}

                  <p className="text-[11px] opacity-90">{c2Result.ruleExplanation}</p>

                  {!c2Result.isCorrect && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-[11px]">
                      <span className="font-bold block mb-0.5">🔄 Masih Belum Pas:</span>
                      <span>{c2Result.conceptTip || 'Silakan hitung kembali dan perbaiki jawabanmu di kolom input di atas!'}</span>
                    </div>
                  )}

                  {c2Result.isCorrect && (
                    <div className="mt-4 pt-3 border-t border-emerald-200 flex flex-col gap-2">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          id="btn-m3-back-to-map"
                          onClick={() => {
                            playSound('click');
                            setShowCompletionModal(true);
                          }}
                          className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Compass className="w-4 h-4" />
                          <span>Kembali ke Peta Dunia (Misi 4 Terbuka 🔓)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pop-up Modal Ucapan Selamat Misi 3 Selesai */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-teal-300 animate-scaleUp text-center p-6 sm:p-7 relative">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-400 to-emerald-400 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-teal-200 border-2 border-white">
              <span className="text-3xl animate-bounce">🏙️</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Misi 3 Berhasil Diselesaikan!</span>
            </div>

            <h3 className="font-display font-black text-2xl text-slate-900 mb-1">
              Hebat, Urban Navigator!
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Kamu telah sukses menggabungkan <strong>Aturan Perkalian</strong> dan <strong>Aturan Penjumlahan</strong>, serta membaca diagram pohon dengan cabang yang asimetris.
            </p>

            <div className="bg-teal-50/80 border border-teal-200 rounded-2xl p-3.5 mb-5 text-left text-xs text-teal-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-xs text-teal-900 border-b border-teal-100 pb-1">
                <span>Pencapaian Misi 3</span>
                <span className="text-emerald-600 font-mono">+25 Poin (★ 2)</span>
              </div>
              <p className="text-[11px] text-teal-700 leading-snug">
                🔓 <strong>Misi 4: Laboratorium Kemungkinan</strong> kini telah terbuka di Peta Dunia. Ini adalah Misi Puncak sebelum kuis evaluasi!
              </p>
            </div>

            <button
              type="button"
              id="btn-modal-m3-back-to-map"
              onClick={() => {
                playSound('click');
                setShowCompletionModal(false);
                onBackToMap();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-display font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-teal-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>KEMBALI KE PETA DUNIA</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
