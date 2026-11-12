import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertOctagon, Terminal, Cpu, Database, Award, MapPin, Compass } from 'lucide-react';
import { validateMission4Challenge1, validateMission4Challenge2, ValidationResult } from '../game/countingRules.ts';
import { TableMatrix } from './TableMatrix.tsx';
import { TreeDiagram, TreeNode } from './TreeDiagram.tsx';
import { InteractiveTreeBuilder } from './InteractiveTreeBuilder.tsx';
import { playSound } from '../utils/audio.ts';

interface Mission4LabProps {
  onCompleteChallenge: (missionId: number, challengeIndex: number, score: number) => void;
  onNavigateToVictory: () => void;
  onBackToMap: () => void;
}

export const Mission4Lab: React.FC<Mission4LabProps> = ({
  onCompleteChallenge,
  onNavigateToVictory,
  onBackToMap
}) => {
  const [currentChallenge, setCurrentChallenge] = useState<1 | 2>(1);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Active viewing tab in lab
  const [activeTab, setActiveTab] = useState<'hemat' | 'sehat' | 'spesial'>('hemat');

  // Challenge 1 inputs
  const [detailHemat, setDetailHemat] = useState<string>('');
  const [detailSehat, setDetailSehat] = useState<string>('');
  const [detailSpesial, setDetailSpesial] = useState<string>('');
  const [totalC1, setTotalC1] = useState<string>('');
  const [c1Result, setC1Result] = useState<ValidationResult | null>(null);

  // Challenge 2 inputs
  const [totalC2, setTotalC2] = useState<string>('');
  const [c2Result, setC2Result] = useState<ValidationResult | null>(null);

  // Handle Challenge 1 Check
  const handleCheckC1 = () => {
    if (!totalC1) {
      playSound('wrong');
      return;
    }
    const val = validateMission4Challenge1(
      Number(totalC1),
      Number(detailHemat || 0),
      Number(detailSehat || 0),
      Number(detailSpesial || 0)
    );
    setC1Result(val);
    if (val.isCorrect) {
      playSound('correct');
      onCompleteChallenge(4, 1, val.scoreGained);
    } else {
      playSound('wrong');
    }
  };

  // Handle Challenge 2 Check
  const handleCheckC2 = () => {
    if (!totalC2) {
      playSound('wrong');
      return;
    }
    const val = validateMission4Challenge2(Number(totalC2));
    setC2Result(val);
    if (val.isCorrect) {
      playSound('victory');
      onCompleteChallenge(4, 2, val.scoreGained);
    } else {
      playSound('wrong');
    }
  };

  // Tree nodes for FoodGo system (Challenge 1)
  const labTreeData: TreeNode[] = [
    {
      id: 'pkg_hemat',
      label: '1. Paket Hemat',
      category: '3 Makanan × 2 Minuman (-1 Terlarang)',
      icon: '🍱',
      children: [
        {
          id: 'h_rice',
          label: 'Rice Bowl Teriyaki',
          children: [
            { id: 'h_rice_tea', label: 'Green Tea 🍵' },
            { id: 'h_rice_lemon', label: 'Lemon Fizz 🍋' }
          ]
        },
        {
          id: 'h_burger',
          label: 'Beef Burger',
          children: [
            { id: 'h_burg_tea', label: 'Green Tea 🍵' },
            { id: 'h_burg_lemon', label: 'Lemon Fizz 🍋', isInvalid: true }
          ]
        },
        {
          id: 'h_wrap',
          label: 'Chicken Wrap',
          children: [
            { id: 'h_wrap_tea', label: 'Green Tea 🍵' },
            { id: 'h_wrap_lemon', label: 'Lemon Fizz 🍋' }
          ]
        }
      ]
    },
    {
      id: 'pkg_sehat',
      label: '2. Paket Sehat',
      category: '2 Makanan × 3 Minuman (Bebas)',
      icon: '🥗',
      children: [
        {
          id: 's_salad',
          label: 'Salad Caesar',
          children: [
            { id: 's_sal_juice', label: 'Cold Press Juice 🧃' },
            { id: 's_sal_coco', label: 'Coconut Water 🥥' },
            { id: 's_sal_herb', label: 'Herbal Tea 🌿' }
          ]
        },
        {
          id: 's_salmon',
          label: 'Salmon Poke',
          children: [
            { id: 's_salm_juice', label: 'Cold Press Juice 🧃' },
            { id: 's_salm_coco', label: 'Coconut Water 🥥' },
            { id: 's_salm_herb', label: 'Herbal Tea 🌿' }
          ]
        }
      ]
    },
    {
      id: 'pkg_spesial',
      label: '3. Paket Spesial',
      category: '2 Makanan (2 Opsi + 1 Opsi)',
      icon: '🥩',
      children: [
        {
          id: 'sp_wagyu',
          label: 'Wagyu Cut (2 Minuman)',
          children: [
            { id: 'sp_wag_spark', label: 'Sparkling Grape 🍇' },
            { id: 'sp_wag_coffee', label: 'Artisan Coffee ☕' }
          ]
        },
        {
          id: 'sp_risotto',
          label: 'Truffle Risotto (1 Minuman)',
          children: [
            { id: 'sp_ris_spark', label: 'Sparkling Grape 🍇' },
            { id: 'sp_ris_coffee', label: 'Artisan Coffee ☕', isInvalid: true }
          ]
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-4 md:p-8 text-white">
      {/* Top Banner / Mission Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 backdrop-blur-md p-5 rounded-3xl border border-indigo-500/40 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-2xl shadow-inner text-indigo-300">
              🔬
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>MISI 4 · LABORATORIUM KEMUNGKINAN</span>
                <span className="text-slate-600">·</span>
                <span className="text-amber-400 font-bold uppercase tracking-wider">FINAL CHALLENGE</span>
              </div>
              <h2 className="font-display font-bold text-xl text-white">
                {currentChallenge === 1 ? 'Tantangan 1: Analisis Sistem Paket FoodGo' : 'Tantangan 2: Simulasi Perubahan Data Sistem'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  playSound('select');
                  setCurrentChallenge(1);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentChallenge === 1 ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Analisis 3 Paket
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('select');
                  setCurrentChallenge(2);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentChallenge === 2 ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Perubahan Data
              </button>
            </div>

            <button
              type="button"
              onClick={onBackToMap}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Peta Petualangan
            </button>
          </div>
        </div>
      </div>

      {/* Main Lab Workspace */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hologram Analysis Console (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Futuristic Lab Graphic Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-indigo-950 border border-indigo-500/40 shadow-xl">
            <img
              src="/src/assets/images/mission_futuristic_lab_1794313905721.jpg"
              alt="Laboratorium Hologram Futuristik"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover object-center filter brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  KONSOL DATA ALGORITMA FOODGO
                </span>
                <p className="text-xs text-slate-200 mt-1 max-w-lg leading-relaxed">
                  "FoodGo menyediakan 3 kategori paket. Pelanggan hanya boleh memilih <strong>satu kategori paket</strong> (Hemat, Sehat, atau Spesial). Analisis pasangan valid pada setiap paket!"
                </p>
              </div>
            </div>
          </div>

          {/* 3 Package Spec Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Paket Hemat */}
            <div
              onClick={() => {
                playSound('select');
                setActiveTab('hemat');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'hemat'
                  ? 'bg-indigo-900/60 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-display font-bold text-xs text-cyan-300">🍱 Paket Hemat</span>
                <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800">
                  {currentChallenge === 1 ? '5 Valid' : 'Kini: 6 Valid'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                3 Makanan × 2 Minuman.
                {currentChallenge === 1 ? (
                  <span className="text-rose-400 block mt-1">⚠️ 1 Pasangan dilarang: (Burger + Lemon)</span>
                ) : (
                  <span className="text-emerald-400 block mt-1">✓ Pasangan dilarang dibuka (+1 jadi 6)</span>
                )}
              </p>
            </div>

            {/* Paket Sehat */}
            <div
              onClick={() => {
                playSound('select');
                setActiveTab('sehat');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'sehat'
                  ? 'bg-indigo-900/60 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-display font-bold text-xs text-emerald-300">🥗 Paket Sehat</span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800">
                  {currentChallenge === 1 ? '6 Valid' : 'Kini: 4 Valid'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                {currentChallenge === 1 ? (
                  <>2 Makanan × 3 Minuman (Semua pasangan sah)</>
                ) : (
                  <span className="text-amber-300 block">
                    ⚠️ 1 Minuman habis, sisa 2 minuman (2 makanan × 2 minuman = 4 pasangan)
                  </span>
                )}
              </p>
            </div>

            {/* Paket Spesial */}
            <div
              onClick={() => {
                playSound('select');
                setActiveTab('spesial');
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'spesial'
                  ? 'bg-indigo-900/60 border-purple-400 ring-2 ring-purple-500/40 shadow-lg'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-display font-bold text-xs text-purple-300">🥩 Paket Spesial</span>
                <span className="text-[10px] font-mono bg-purple-950 text-purple-400 px-1.5 py-0.5 rounded border border-purple-800">
                  3 Valid
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                2 Makanan: Makanan 1 dengan 2 minuman, Makanan 2 hanya dengan 1 minuman (2 + 1 = 3 pasangan).
              </p>
            </div>
          </div>

          {/* Interactive Lab Tree Diagram Skeleton with Click-to-Place Card Tray */}
          <InteractiveTreeBuilder
            packageType={activeTab}
            onChangePackageType={(tab) => {
              playSound('select');
              setActiveTab(tab);
            }}
          />
        </div>

        {/* Right Analytical Console Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* CHALLENGE 1: HITUNG 3 PAKET FOODGO */}
          {currentChallenge === 1 && (
            <div className="bg-slate-900/95 rounded-3xl p-6 border border-indigo-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Konsol Analisis Paket FoodGo
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  Step-by-Step
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Pelanggan hanya boleh memilih <strong>satu kategori paket</strong>. Hitung banyak pasangan yang sah di setiap kategori terlebih dahulu:
              </p>

              {/* Package 1: Hemat */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex justify-between text-xs font-semibold text-cyan-300">
                  <span>1. Banyak Pasangan Sah Paket Hemat:</span>
                  <span className="text-[10px] text-slate-400 font-normal">Pasangan terlarang dieliminasi</span>
                </div>
                <input
                  type="number"
                  value={detailHemat}
                  onChange={(e) => setDetailHemat(e.target.value)}
                  placeholder="Masukkan angka..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Package 2: Sehat */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex justify-between text-xs font-semibold text-emerald-300">
                  <span>2. Banyak Pasangan Sah Paket Sehat:</span>
                  <span className="text-[10px] text-slate-400 font-normal">Pasangan bebas tanpa batasan</span>
                </div>
                <input
                  type="number"
                  value={detailSehat}
                  onChange={(e) => setDetailSehat(e.target.value)}
                  placeholder="Masukkan angka..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Package 3: Spesial */}
              <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
                <div className="flex justify-between text-xs font-semibold text-purple-300">
                  <span>3. Banyak Pasangan Sah Paket Spesial:</span>
                  <span className="text-[10px] text-slate-400 font-normal">Pilihan hidangan alternatif</span>
                </div>
                <input
                  type="number"
                  value={detailSpesial}
                  onChange={(e) => setDetailSpesial(e.target.value)}
                  placeholder="Masukkan angka..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Total Question */}
              <div className="p-3.5 bg-indigo-950/70 rounded-2xl border border-indigo-500/50 space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  Berapa TOTAL seluruh kemungkinan paket yang dapat dipesan?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={totalC1}
                    onChange={(e) => setTotalC1(e.target.value)}
                    placeholder="Masukkan total kemungkinan..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-indigo-400/60 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <span className="text-xs text-slate-300 font-medium">kemungkinan</span>
                </div>
                <p className="text-[11px] text-indigo-300">
                  Karena memilih salah satu kategori, jumlahkan kemungkinan dari ketiga paket (Hemat + Sehat + Spesial).
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckC1}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-display font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Validasi Hasil Analisis</span>
              </button>

              {/* Feedback Box */}
              {c1Result && (
                <div
                  className={`mt-4 p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                    c1Result.isCorrect
                      ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-100 shadow-md'
                      : 'bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-md'
                  }`}
                >
                  <div className="font-bold font-display text-sm mb-1 flex items-center gap-1.5">
                    {c1Result.isCorrect ? '✨' : '💡'} {c1Result.feedbackTitle}
                  </div>
                  <p className="mb-2 leading-relaxed">{c1Result.feedbackMessage}</p>

                  {c1Result.isCorrect && c1Result.formula && (
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700 font-mono text-[11px] mb-2 text-cyan-300">
                      <strong>Perhitungan:</strong> {c1Result.formula}
                    </div>
                  )}

                  <p className="text-[11px] opacity-90">{c1Result.ruleExplanation}</p>

                  {!c1Result.isCorrect && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-[11px]">
                      <span className="font-bold block mb-0.5">🔄 Masih Belum Pas:</span>
                      <span>{c1Result.conceptTip || 'Silakan hitung kembali dan perbaiki angka pada kolom rincian paket di atas!'}</span>
                    </div>
                  )}

                  {c1Result.isCorrect && (
                    <div className="mt-4 pt-3 border-t border-emerald-700/60 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          playSound('unlock');
                          setCurrentChallenge(2);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span>Lanjut ke Tantangan Perubahan Data</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CHALLENGE 2: PERUBAHAN DATA DINAMIS SISTEM */}
          {currentChallenge === 2 && (
            <div className="bg-slate-900/95 rounded-3xl p-6 border border-indigo-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  Simulasi Perubahan Data Sistem
                </h3>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  Data Mutation
                </span>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-amber-400 block">Kondisi Perubahan Sistem:</span>
                <p>• <strong>Paket Sehat:</strong> Dari 2 makanan dan 3 minuman, 1 jenis minuman tidak tersedia (habis). Sehingga sisa minuman adalah 2 (2 makanan × 2 minuman = 4 pasangan).</p>
                <p>• <strong>Paket Hemat:</strong> Dari 3 makanan dan 2 minuman, pasangan yang sebelumnya dilarang kini dibuka kembali secara penuh (3 makanan × 2 minuman = 6 pasangan).</p>
                <p>• <strong>Paket Spesial:</strong> Makanan 1 dapat dipasangkan dengan 2 jenis minuman (2 pasang), dan Makanan 2 dipasangkan dengan 1 jenis minuman (1 pasang). Total = 2 + 1 = 3 pasangan.</p>
              </div>

              {/* Total Question */}
              <div className="p-3.5 bg-indigo-950/70 rounded-2xl border border-indigo-500/50 space-y-1.5">
                <label className="block text-xs font-bold text-white">
                  Setelah perubahan tersebut, berapa banyak kemungkinan paket yang tersedia?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={totalC2}
                    onChange={(e) => setTotalC2(e.target.value)}
                    placeholder="Masukkan angka total..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-indigo-400/60 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <span className="text-xs text-slate-300 font-medium">kemungkinan</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckC2}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-display font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kirim Jawaban Akhir</span>
              </button>

              {/* Feedback Box */}
              {c2Result && (
                <div
                  className={`mt-4 p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                    c2Result.isCorrect
                      ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-100 shadow-md'
                      : 'bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-md'
                  }`}
                >
                  <div className="font-bold font-display text-sm mb-1 flex items-center gap-1.5">
                    {c2Result.isCorrect ? '🎉' : '💡'} {c2Result.feedbackTitle}
                  </div>
                  <p className="mb-2 leading-relaxed">{c2Result.feedbackMessage}</p>

                  {c2Result.isCorrect && c2Result.formula && (
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700 font-mono text-[11px] mb-2 text-cyan-300">
                      <strong>Perhitungan Rinci:</strong> {c2Result.formula}
                    </div>
                  )}

                  <p className="text-[11px] opacity-90">{c2Result.ruleExplanation}</p>

                  {!c2Result.isCorrect && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-950 text-[11px]">
                      <span className="font-bold block mb-0.5">🔄 Masih Belum Pas:</span>
                      <span>{c2Result.conceptTip || 'Silakan hitung kembali dan perbaiki angka pada kolom input di atas!'}</span>
                    </div>
                  )}

                  {c2Result.isCorrect && (
                    <div className="mt-4 pt-3 border-t border-emerald-700/60 flex flex-col gap-2">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          id="btn-m4-celebrate"
                          onClick={() => {
                            playSound('victory');
                            setShowCompletionModal(true);
                          }}
                          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-display font-bold text-xs rounded-xl shadow-xl transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                        >
                          <Award className="w-4 h-4" />
                          <span>Lihat Rapor Misi 4 & Buka Kuis Evaluasi</span>
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

      {/* Pop-up Modal Ucapan Selamat Misi 4 Selesai */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn text-slate-900">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-amber-400 animate-scaleUp text-center p-6 sm:p-7 relative">
            <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-900 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-amber-200 border-2 border-white">
              <span className="text-4xl animate-bounce">🏆</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Semua 4 Misi Utama Tuntas!</span>
            </div>

            <h3 className="font-display font-black text-2xl text-slate-900 mb-1">
              Selamat, Master of Combinatorics!
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Kamu telah menyelesaikan seluruh petualangan di Kafe Pilihan, Studio Gaya, Rencana Akhir Pekan, dan Laboratorium Kemungkinan. Sekarang saatnya membuktikan kemampuanmu dalam <strong>Kuis Evaluasi Akhir (10 Soal)</strong>!
            </p>

            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 mb-5 text-left text-xs text-amber-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-xs text-amber-900 border-b border-amber-100 pb-1">
                <span>Pencapaian Petualangan</span>
                <span className="text-emerald-700 font-mono">100 Poin (★ 8)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-snug">
                ⭐ Kuis Evaluasi berisi 10 soal pilihan ganda tanpa petunjuk untuk menguji pemahaman murni seputar Aturan Penjumlahan & Perkalian. Hasil kuis akan langsung disinkronkan ke Spreadsheet kelas!
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                id="btn-modal-start-quiz"
                onClick={() => {
                  playSound('click');
                  setShowCompletionModal(false);
                  onNavigateToVictory();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-display font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-amber-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>MULAI KUIS EVALUASI (10 SOAL)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setShowCompletionModal(false);
                  onBackToMap();
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Kembali ke Peta Dunia Dulu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
