import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, HelpCircle, Utensils, Coffee, MapPin, Compass, Award } from 'lucide-react';
import { validateMission1Challenge1, validateMission1Challenge2, ValidationResult } from '../game/countingRules.ts';
import { playSound } from '../utils/audio.ts';

interface Mission1CafeProps {
  onCompleteChallenge: (missionId: number, challengeIndex: number, score: number) => void;
  onNavigateToNext: () => void;
  onBackToMap: () => void;
}

export const Mission1Cafe: React.FC<Mission1CafeProps> = ({
  onCompleteChallenge,
  onNavigateToNext,
  onBackToMap
}) => {
  const [currentChallenge, setCurrentChallenge] = useState<1 | 2>(1);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Challenge 1 state
  const [c1SelectedDish, setC1SelectedDish] = useState<{ name: string; icon: string; category: string } | null>(null);
  const [c1Rule, setC1Rule] = useState<'penjumlahan' | 'perkalian' | ''>('');
  const [c1Answer, setC1Answer] = useState<string>('');
  const [c1Result, setC1Result] = useState<ValidationResult | null>(null);

  // Challenge 2 state
  const [selectedMain, setSelectedMain] = useState<{ id: string; name: string; icon: string } | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<{ id: string; name: string; icon: string } | null>(null);
  const [selectedDessert, setSelectedDessert] = useState<{ id: string; name: string; icon: string } | null>(null);
  const [c2Rule, setC2Rule] = useState<'penjumlahan' | 'perkalian' | ''>('');
  const [c2Answer, setC2Answer] = useState<string>('');
  const [c2Result, setC2Result] = useState<ValidationResult | null>(null);

  // Data Tantangan 1
  const cakes = [
    { name: 'Kue Tart Stroberi', icon: '🍰' },
    { name: 'Kue Cokelat Fudge', icon: '🍫' },
    { name: 'Bolu Gulung Pandan', icon: '🥮' },
    { name: 'Cupcake Velvet', icon: '🧁' }
  ];
  const iceCreams = [
    { name: 'Es Krim Vanilla Sundae', icon: '🍨' },
    { name: 'Es Krim Matcha Cone', icon: '🍦' },
    { name: 'Es Krim Berry Parfait', icon: '🍧' }
  ];
  const puddings = [
    { name: 'Puding Karamel Flan', icon: '🍮' },
    { name: 'Puding Silky Mangga', icon: '🥭' }
  ];

  // Data Tantangan 2
  const mainCourses = [
    { id: 'm1', name: 'Nasi Bento Crispy', icon: '🍱' },
    { id: 'm2', name: 'Spaghetti Bolognese', icon: '🍝' },
    { id: 'm3', name: 'Burger Keju Artisan', icon: '🍔' }
  ];
  const drinks = [
    { id: 'd1', name: 'Iced Matcha Latte', icon: '🍵' },
    { id: 'd2', name: 'Fresh Lemonade', icon: '🍋' },
    { id: 'd3', name: 'Boba Milk Tea', icon: '🧋' },
    { id: 'd4', name: 'Hot Marshmallow Choco', icon: '☕' }
  ];
  const desserts = [
    { id: 'ds1', name: 'Basque Cheesecake', icon: '🧀' },
    { id: 'ds2', name: 'Choco Lava Brownie', icon: '🍪' }
  ];

  // Submit Handler Challenge 1
  const handleCheckC1 = () => {
    if (!c1Answer || !c1Rule) {
      playSound('wrong');
      return;
    }
    const val = validateMission1Challenge1(Number(c1Answer), c1Rule);
    setC1Result(val);
    if (val.isCorrect) {
      playSound('correct');
      onCompleteChallenge(1, 1, val.scoreGained);
    } else {
      playSound('wrong');
    }
  };

  // Submit Handler Challenge 2
  const handleCheckC2 = () => {
    if (!c2Answer || !c2Rule) {
      playSound('wrong');
      return;
    }
    const val = validateMission1Challenge2(Number(c2Answer), c2Rule);
    setC2Result(val);
    if (val.isCorrect) {
      playSound('correct');
      onCompleteChallenge(1, 2, val.scoreGained);
      setShowCompletionModal(true);
    } else {
      playSound('wrong');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-amber-50/60 via-orange-50/40 to-slate-50 p-4 md:p-8">
      {/* Top Banner / Mission Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-amber-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl shadow-inner">
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>MISI 1 · KAFE PILIHAN</span>
                <span className="text-slate-300">·</span>
                <span>Tantangan {currentChallenge} dari 2</span>
              </div>
              <h2 className="font-display font-bold text-xl text-slate-900">
                {currentChallenge === 1 ? 'Tantangan 1: Memilih Satu Hidangan' : 'Tantangan 2: Membuat Paket Pesanan'}
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
                  currentChallenge === 1 ? 'bg-white text-amber-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Satu Hidangan
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('select');
                  setCurrentChallenge(2);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentChallenge === 2 ? 'bg-white text-amber-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Paket Pesanan
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

      {/* Main Mission Workspace */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================================== */}
        {/* CHALLENGE 1: MEMILIH SATU HIDANGAN (ATURAN PENJUMLAHAN)         */}
        {/* ============================================================== */}
        {currentChallenge === 1 && (
          <>
            {/* Left 3D Interactive Cafe Showcase (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-3xl overflow-hidden bg-amber-900/10 border border-amber-200/80 shadow-md">
                <img
                  src="/src/assets/images/mission_cafe_delight_1794313917919.jpg"
                  alt="Interior Kafe Pilihan"
                  referrerPolicy="no-referrer"
                  className="w-full h-52 object-cover object-center filter brightness-[0.98]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex items-end p-5">
                  <div className="text-white w-full">
                    {/* Dark pill badge with high-contrast text */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-amber-400/60 shadow-lg mb-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-black text-amber-300 uppercase tracking-wider drop-shadow-sm">
                        ETALASE HIDANGAN KAFE
                      </span>
                    </div>
                    <div className="bg-black/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 max-w-xl shadow-xl">
                      <p className="text-xs text-white font-medium leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        "Di Kafe Pilihan, kamu ingin menikmati <strong>satu hidangan saja</strong>. Kamu bebas memilih satu jenis kue, satu jenis es krim, atau satu jenis puding. Berapa banyak pilihan hidangan yang tersedia?"
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Food Groups Interactive Shelves */}
              <div className="space-y-3">
                {/* Cakes Shelf (4 items) */}
                <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-semibold text-xs text-amber-900 flex items-center gap-1.5">
                      <span>🍰</span>
                      <span>Kelompok 1: Pilihan Aneka Kue (4 Jenis)</span>
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">n₁ = 4</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cakes.map((cake, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          playSound('select');
                          setC1SelectedDish({ name: cake.name, icon: cake.icon, category: 'Kue' });
                        }}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          c1SelectedDish?.name === cake.name
                            ? 'bg-amber-100/90 border-amber-400 shadow-sm scale-102 ring-2 ring-amber-300'
                            : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{cake.icon}</span>
                        <span className="text-[11px] font-medium block leading-tight">{cake.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ice Creams Shelf (3 items) */}
                <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-semibold text-xs text-cyan-900 flex items-center gap-1.5">
                      <span>🍨</span>
                      <span>Kelompok 2: Pilihan Es Krim (3 Jenis)</span>
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">n₂ = 3</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {iceCreams.map((ice, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          playSound('select');
                          setC1SelectedDish({ name: ice.name, icon: ice.icon, category: 'Es Krim' });
                        }}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          c1SelectedDish?.name === ice.name
                            ? 'bg-cyan-100/90 border-cyan-400 shadow-sm scale-102 ring-2 ring-cyan-300'
                            : 'bg-slate-50 hover:bg-cyan-50/50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{ice.icon}</span>
                        <span className="text-[11px] font-medium block leading-tight">{ice.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Puddings Shelf (2 items) */}
                <div className="bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-display font-semibold text-xs text-rose-900 flex items-center gap-1.5">
                      <span>🍮</span>
                      <span>Kelompok 3: Pilihan Puding (2 Jenis)</span>
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">n₃ = 2</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {puddings.map((pudding, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          playSound('select');
                          setC1SelectedDish({ name: pudding.name, icon: pudding.icon, category: 'Puding' });
                        }}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          c1SelectedDish?.name === pudding.name
                            ? 'bg-rose-100/90 border-rose-400 shadow-sm scale-102 ring-2 ring-rose-300'
                            : 'bg-slate-50 hover:bg-rose-50/50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{pudding.icon}</span>
                        <span className="text-[11px] font-medium block leading-tight">{pudding.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Dish Plate Simulation */}
              <div className="bg-gradient-to-r from-amber-100/70 to-orange-100/70 rounded-2xl p-4 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-amber-300 shadow-inner flex items-center justify-center text-3xl">
                    {c1SelectedDish ? c1SelectedDish.icon : '🍽️'}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      Piring Pilihanmu
                    </span>
                    <span className="font-display font-bold text-sm text-slate-800">
                      {c1SelectedDish ? `${c1SelectedDish.name} (${c1SelectedDish.category})` : 'Klik salah satu hidangan di atas'}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Kamu hanya mengambil 1 hidangan untuk dinikmati sendiri.
                    </p>
                  </div>
                </div>
                {c1SelectedDish && (
                  <button
                    type="button"
                    onClick={() => setC1SelectedDish(null)}
                    className="text-xs text-amber-700 hover:text-amber-900 font-medium underline cursor-pointer"
                  >
                    Ganti Pilihan
                  </button>
                )}
              </div>
            </div>

            {/* Right Question & Concept Deck (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                  Analisis Pilihan Hidangan
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Selesaikan pertanyaan analisis di bawah ini untuk membuktikan pemahamanmu.
                </p>

                {/* Step 1: Rule Selector */}
                <div className="space-y-2 mb-4">
                  <label className="block text-xs font-semibold text-slate-700">
                    1. Operasi apa yang tepat untuk menghitung seluruh pilihan hidangan yang dapat dipilih?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playSound('select');
                        setC1Rule('penjumlahan');
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        c1Rule === 'penjumlahan'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold ring-2 ring-indigo-200'
                          : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="font-bold block text-sm mb-0.5">+ Penjumlahan</span>
                      <span className="text-[10px] text-slate-500 leading-tight block">
                        Memilih satu dari kelompok alternatif
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSound('select');
                        setC1Rule('perkalian');
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        c1Rule === 'perkalian'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold ring-2 ring-indigo-200'
                          : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="font-bold block text-sm mb-0.5">× Perkalian</span>
                      <span className="text-[10px] text-slate-500 leading-tight block">
                        Memilih berpasangan secara bertahap
                      </span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Number Input */}
                <div className="space-y-2 mb-5">
                  <label htmlFor="c1-input" className="block text-xs font-semibold text-slate-700">
                    2. Berapa total banyak kemungkinan hidangan yang tersedia?
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="c1-input"
                      type="number"
                      value={c1Answer}
                      onChange={(e) => setC1Answer(e.target.value)}
                      placeholder="Masukkan angka..."
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                    />
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">pilihan</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleCheckC1}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                        <strong>Rumus:</strong> {c1Result.formula}
                      </div>
                    )}

                    <p className="text-[11px] opacity-90">{c1Result.ruleExplanation}</p>

                    {!c1Result.isCorrect && (
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-900 text-[11px]">
                        <span className="font-bold block mb-0.5">🔄 Masih Belum Pas:</span>
                        <span>{c1Result.conceptTip || 'Silakan hitung kembali dan ganti angka pada kolom input di atas!'}</span>
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
                          <span>Lanjut ke Tantangan 2</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* CHALLENGE 2: MEMBUAT PAKET PESANAN (ATURAN PERKALIAN)           */}
        {/* ============================================================== */}
        {currentChallenge === 2 && (
          <>
            {/* Left Order Assembly Tray (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white/95 rounded-3xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-800">
                      Rakit Nampan Paket Pesanan
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pilih 1 Makanan Utama + 1 Minuman + 1 Makanan Penutup untuk mengisi nampan pesanan
                    </p>
                  </div>
                  <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                    Kegiatan Bertahap
                  </span>
                </div>

                {/* 3 Steps Selectors */}
                <div className="space-y-4">
                  {/* Step 1: Main Course */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                      Tahap 1: Makanan Utama (3 Opsi)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {mainCourses.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            playSound('select');
                            setSelectedMain(m);
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedMain?.id === m.id
                              ? 'bg-amber-100 border-amber-400 font-bold ring-2 ring-amber-300 scale-102'
                              : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="text-xl block">{m.icon}</span>
                          <span className="text-[11px] block mt-0.5 leading-tight">{m.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Drinks */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                      Tahap 2: Minuman Segar (4 Opsi)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {drinks.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            playSound('select');
                            setSelectedDrink(d);
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedDrink?.id === d.id
                              ? 'bg-cyan-100 border-cyan-400 font-bold ring-2 ring-cyan-300 scale-102'
                              : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="text-xl block">{d.icon}</span>
                          <span className="text-[11px] block mt-0.5 leading-tight">{d.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Desserts */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                      Tahap 3: Hidangan Penutup (2 Opsi)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {desserts.map((ds) => (
                        <button
                          key={ds.id}
                          type="button"
                          onClick={() => {
                            playSound('select');
                            setSelectedDessert(ds);
                          }}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedDessert?.id === ds.id
                              ? 'bg-rose-100 border-rose-400 font-bold ring-2 ring-rose-300 scale-102'
                              : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="text-xl block">{ds.icon}</span>
                          <span className="text-[11px] block mt-0.5 leading-tight">{ds.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Realistic Wooden Order Tray Simulation */}
                <div className="mt-5 p-5 bg-gradient-to-br from-amber-800 to-amber-950 rounded-2xl shadow-xl border-4 border-amber-900 text-white">
                  <div className="flex items-center justify-between mb-3 border-b border-amber-700/60 pb-2">
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      Nampan Paket Pesanan Aktif
                    </span>
                    <span className="text-[11px] text-amber-300">
                      {selectedMain && selectedDrink && selectedDessert ? '✓ Paket Lengkap' : 'Pilih semua 3 tahap'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {/* Main Course slot */}
                    <div className="bg-amber-900/60 p-3 rounded-xl border border-amber-700/50 flex flex-col items-center justify-center min-h-[90px]">
                      {selectedMain ? (
                        <>
                          <span className="text-3xl animate-bounce">{selectedMain.icon}</span>
                          <span className="text-xs font-semibold text-amber-100 mt-1">{selectedMain.name}</span>
                          <span className="text-[9px] text-amber-400">Makanan Utama</span>
                        </>
                      ) : (
                        <span className="text-xs text-amber-500 italic">Pilih Makanan</span>
                      )}
                    </div>

                    {/* Drink slot */}
                    <div className="bg-amber-900/60 p-3 rounded-xl border border-amber-700/50 flex flex-col items-center justify-center min-h-[90px]">
                      {selectedDrink ? (
                        <>
                          <span className="text-3xl animate-bounce">{selectedDrink.icon}</span>
                          <span className="text-xs font-semibold text-cyan-200 mt-1">{selectedDrink.name}</span>
                          <span className="text-[9px] text-cyan-400">Minuman</span>
                        </>
                      ) : (
                        <span className="text-xs text-amber-500 italic">Pilih Minuman</span>
                      )}
                    </div>

                    {/* Dessert slot */}
                    <div className="bg-amber-900/60 p-3 rounded-xl border border-amber-700/50 flex flex-col items-center justify-center min-h-[90px]">
                      {selectedDessert ? (
                        <>
                          <span className="text-3xl animate-bounce">{selectedDessert.icon}</span>
                          <span className="text-xs font-semibold text-rose-200 mt-1">{selectedDessert.name}</span>
                          <span className="text-[9px] text-rose-400">Penutup</span>
                        </>
                      ) : (
                        <span className="text-xs text-amber-500 italic">Pilih Penutup</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Question & Concept Deck (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                  Analisis Paket Pesanan Berpasangan
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Satu paket terdiri atas 1 makanan utama (3 pilihan), 1 minuman (4 pilihan), dan 1 penutup (2 pilihan).
                </p>

                {/* Step 1: Rule Selector */}
                <div className="space-y-2 mb-4">
                  <label className="block text-xs font-semibold text-slate-700">
                    1. Operasi apa yang tepat untuk menghitung seluruh kemungkinan paket berbeda?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playSound('select');
                        setC2Rule('penjumlahan');
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        c2Rule === 'penjumlahan'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold ring-2 ring-indigo-200'
                          : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="font-bold block text-sm mb-0.5">+ Penjumlahan</span>
                      <span className="text-[10px] text-slate-500 leading-tight block">
                        Hanya memilih 1 alternatif
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playSound('select');
                        setC2Rule('perkalian');
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        c2Rule === 'perkalian'
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold ring-2 ring-indigo-200'
                          : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="font-bold block text-sm mb-0.5">× Perkalian</span>
                      <span className="text-[10px] text-slate-500 leading-tight block">
                        Setiap tahap berpasangan berturut-turut
                      </span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Number Input */}
                <div className="space-y-2 mb-5">
                  <label htmlFor="c2-input" className="block text-xs font-semibold text-slate-700">
                    2. Berapa banyak paket pesanan berbeda yang dapat dibuat?
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="c2-input"
                      type="number"
                      value={c2Answer}
                      onChange={(e) => setC2Answer(e.target.value)}
                      placeholder="Masukkan angka..."
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                    />
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">paket</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleCheckC2}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                        <strong>Rumus:</strong> {c2Result.formula}
                      </div>
                    )}

                    <p className="text-[11px] opacity-90">{c2Result.ruleExplanation}</p>

                    {!c2Result.isCorrect && (
                      <div className="mt-3 p-2.5 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-900 text-[11px]">
                        <span className="font-bold block mb-0.5">🔄 Masih Belum Pas:</span>
                        <span>{c2Result.conceptTip || 'Silakan hitung kembali dan ganti angka pada kolom input di atas!'}</span>
                      </div>
                    )}

                    {c2Result.isCorrect && (
                      <div className="mt-4 pt-3 border-t border-emerald-200 flex flex-col gap-2">
                        {/* Summary of concepts */}
                        <div className="bg-emerald-100/70 p-3 rounded-xl text-[11px] space-y-1">
                          <span className="font-bold block text-emerald-900">Ringkasan Materi Misi 1:</span>
                          <p>• Memilih satu dari beberapa kelompok alternatif → <strong>Aturan Penjumlahan</strong>.</p>
                          <p>• Memilih satu pilihan pada setiap tahap berturut-turut → <strong>Aturan Perkalian</strong>.</p>
                        </div>

                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              playSound('click');
                              onBackToMap();
                            }}
                            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Compass className="w-4 h-4" />
                            <span>Kembali ke Peta Dunia (Misi 2 Terbuka 🔓)</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Pop-up Modal Ucapan Selamat Misi 1 Selesai */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-amber-300 animate-scaleUp text-center p-6 sm:p-7 relative">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-200 border-2 border-white">
              <span className="text-3xl animate-bounce">🎉</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Misi 1 Berhasil Diselesaikan!</span>
            </div>

            <h3 className="font-display font-black text-2xl text-slate-900 mb-1">
              Selamat, Choice Explorer!
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Kamu telah berhasil menuntaskan seluruh tantangan Kafe Pilihan serta memahami perbedaan <strong>Aturan Penjumlahan</strong> dan <strong>Aturan Perkalian</strong>.
            </p>

            <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-3.5 mb-5 text-left text-xs text-indigo-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-xs text-indigo-900 border-b border-indigo-100 pb-1">
                <span>Pencapaian Misi 1</span>
                <span className="text-emerald-600 font-mono">+25 Poin (★ 2)</span>
              </div>
              <p className="text-[11px] text-indigo-700 leading-snug">
                🔓 <strong>Misi 2: Studio Gaya</strong> kini telah terbuka di Peta Dunia. Silakan klik kartu Misi 2 di Peta Dunia untuk memilih dan memulainya!
              </p>
            </div>

            <button
              type="button"
              id="btn-modal-back-to-map"
              onClick={() => {
                playSound('click');
                setShowCompletionModal(false);
                onBackToMap();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-display font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
