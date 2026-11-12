import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Shirt, Lock, MapPin, Eye, Compass } from 'lucide-react';
import { validateMission2Challenge1, validateMission2Challenge2, ValidationResult } from '../game/countingRules.ts';
import { TableMatrix } from './TableMatrix.tsx';
import { playSound } from '../utils/audio.ts';

interface Mission2FashionProps {
  onCompleteChallenge: (missionId: number, challengeIndex: number, score: number) => void;
  onNavigateToNext: () => void;
  onBackToMap: () => void;
}

export const Mission2Fashion: React.FC<Mission2FashionProps> = ({
  onCompleteChallenge,
  onNavigateToNext,
  onBackToMap
}) => {
  const [currentChallenge, setCurrentChallenge] = useState<1 | 2>(1);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Clothing item definitions
  const tops = [
    { id: 'top_a', name: 'Atasan A: Kemeja Pastel', icon: '👔', color: '#c4b5fd' },
    { id: 'top_b', name: 'Atasan B: Kaos Oversize', icon: '👕', color: '#fed7aa' },
    { id: 'top_c', name: 'Atasan C: Cardigan Rajut', icon: '🧶', color: '#a7f3d0' },
    { id: 'top_d', name: 'Atasan D: Jaket Denim', icon: '🧥', color: '#bae6fd' }
  ];

  const bottoms = [
    { id: 'bot_1', name: 'Bawahan 1: Celana Chino Beige', icon: '👖', color: '#f5d0fe' },
    { id: 'bot_2', name: 'Bawahan 2: Rok Plisket Putih', icon: '👗', color: '#fef08a' },
    { id: 'bot_3', name: 'Bawahan 3: Kulot Linen Sage', icon: '🩳', color: '#bbf7d0' }
  ];

  const shoes = [
    { id: 'shoe_1', name: 'Sneakers Putih', icon: '👟' },
    { id: 'shoe_2', name: 'Loafers Elegan', icon: '👞' }
  ];

  // Selected for Mannequin
  const [selectedTop, setSelectedTop] = useState(tops[0]);
  const [selectedBottom, setSelectedBottom] = useState(bottoms[0]);
  const [selectedShoe, setSelectedShoe] = useState(shoes[0]);

  // Challenge 1 inputs & result
  const [c1Rule, setC1Rule] = useState<'penjumlahan' | 'perkalian' | ''>('');
  const [c1Answer, setC1Answer] = useState<string>('');
  const [c1Result, setC1Result] = useState<ValidationResult | null>(null);

  // Challenge 2 inputs & result
  const [c2Answer, setC2Answer] = useState<string>('');
  const [c2Reason, setC2Reason] = useState<string>('');
  const [c2Result, setC2Result] = useState<ValidationResult | null>(null);

  // Check if current combination in mannequin is valid under Special Rule (Challenge 2)
  const isMannequinValidUnderSpecialRule = !(selectedTop.id === 'top_a' && selectedBottom.id === 'bot_3');

  // Submit Challenge 1
  const handleCheckC1 = () => {
    if (!c1Answer || !c1Rule) {
      playSound('wrong');
      return;
    }
    const val = validateMission2Challenge1(Number(c1Answer), c1Rule);
    setC1Result(val);
    if (val.isCorrect) {
      playSound('correct');
      onCompleteChallenge(2, 1, val.scoreGained);
    } else {
      playSound('wrong');
    }
  };

  // Submit Challenge 2
  const handleCheckC2 = () => {
    if (!c2Answer || !c2Reason) {
      playSound('wrong');
      return;
    }
    const val = validateMission2Challenge2(Number(c2Answer), c2Reason);
    setC2Result(val);
    if (val.isCorrect) {
      playSound('correct');
      onCompleteChallenge(2, 2, val.scoreGained);
    } else {
      playSound('wrong');
    }
  };

  // Matrix rows and cols for visualization
  const matrixRows = tops.map((t) => ({ id: t.id, label: t.name }));
  const matrixCols = bottoms.map((b) => ({ id: b.id, label: b.name }));

  const isCellValidSpecial = (topId: string, botId: string) => {
    if (topId === 'top_a' && botId === 'bot_3') return false;
    return true;
  };

  const getInvalidReason = (topId: string, botId: string) => {
    if (topId === 'top_a' && botId === 'bot_3') {
      return 'DILARANG: Atasan A tidak boleh dipasangkan dengan Bawahan 3';
    }
    return undefined;
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-pink-50/60 via-purple-50/40 to-slate-50 p-4 md:p-8">
      {/* Top Banner / Mission Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-pink-200/80 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-2xl shadow-inner">
              👗
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-pink-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>MISI 2 · STUDIO GAYA</span>
                <span className="text-slate-300">·</span>
                <span>Tantangan {currentChallenge} dari 2</span>
              </div>
              <h2 className="font-display font-bold text-xl text-slate-900">
                {currentChallenge === 1 ? 'Tantangan 1: Membuat Outfit Dasar' : 'Tantangan 2: Aturan Kombinasi Khusus (Special Rule)'}
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
                  currentChallenge === 1 ? 'bg-white text-pink-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Outfit Bebas
              </button>
              <button
                type="button"
                onClick={() => {
                  playSound('select');
                  setCurrentChallenge(2);
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  currentChallenge === 2 ? 'bg-white text-pink-800 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Special Rule
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

      {/* Main Studio Workspace */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Mannequin & Wardrobe Interactive Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mannequin Live Dressing Center */}
          <div className="bg-white/95 rounded-3xl p-5 border border-pink-200/80 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-pink-600" />
                <h3 className="font-display font-bold text-sm text-slate-800">
                  Manekin Pakaian Studio
                </h3>
              </div>

              {currentChallenge === 2 && (
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    isMannequinValidUnderSpecialRule
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  }`}
                >
                  {isMannequinValidUnderSpecialRule ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Kombinasi Memenuhi Syarat</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>DILARANG ATURAN KHUSUS!</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mannequin & Modern Pastel Info Card Grid */}
            <div className="relative bg-gradient-to-b from-slate-50 via-pink-50/40 to-purple-50/30 rounded-2xl p-5 border border-slate-200/80">
              {/* Special Rule Alert Banner if Challenge 2 */}
              {currentChallenge === 2 && (
                <div className="w-full mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2 shadow-2xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">SPECIAL RULE: </span>
                    <span>Atasan A (Kemeja) <strong>HANYA</strong> boleh dipasangkan dengan Bawahan 1 atau 2. Atasan B, C, D bebas dipasangkan dengan seluruh 3 bawahan. Sepatu ada 2 pilihan bebas.</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Visual Dress-Up Mannequin Avatar (6 cols) */}
                <div className="md:col-span-6 flex flex-col items-center justify-center py-2">
                  <div className="relative flex flex-col items-center">
                    {/* SVG Stylized Mannequin Character */}
                    <svg
                      viewBox="0 0 200 340"
                      className="w-48 sm:w-56 h-auto drop-shadow-md select-none transition-all duration-300"
                    >
                      {/* Wooden Stand & Pedestal Base */}
                      <ellipse cx="100" cy="325" rx="46" ry="10" fill="#b07d62" />
                      <ellipse cx="100" cy="323" rx="42" ry="8" fill="#d4a373" />
                      <rect x="97" y="160" width="6" height="162" fill="#8d5b4c" rx="2" />
                      <ellipse cx="100" cy="180" rx="6" ry="3" fill="#b07d62" />

                      {/* Head & Neck */}
                      <ellipse cx="100" cy="16" rx="5" ry="5" fill="#8d5b4c" />
                      <ellipse cx="100" cy="38" rx="18" ry="22" fill="#fed7aa" stroke="#fcd34d" strokeWidth="1" />
                      {/* Stylized hair / facial subtle contour */}
                      <path d="M85 30 Q100 18 115 30 Q118 40 115 45 Q100 24 85 45 Z" fill="#78350f" opacity="0.3" />
                      <rect x="95" y="56" width="10" height="12" fill="#fed7aa" rx="2" />

                      {/* Shoulders / Neck base */}
                      <path d="M80 68 L100 64 L120 68 L100 70 Z" fill="#fcd34d" />

                      {/* DRESS-UP TOP GARMENT (Attached to mannequin torso) */}
                      <g className="transition-all duration-300">
                        {/* Garment Base Body & Sleeves */}
                        <path
                          d="M60 76 L84 68 L116 68 L140 76 L144 116 L130 118 L126 148 L74 148 L70 118 L56 116 Z"
                          fill={selectedTop.color}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        {/* Dynamic Collar & Garment Details */}
                        {selectedTop.id === 'top_a' && (
                          /* Kemeja Pastel: Sharp collar + button placket */
                          <g>
                            <path d="M88 68 L100 86 L112 68 L105 68 L100 78 L95 68 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                            <line x1="100" y1="86" x2="100" y2="148" stroke="#ffffff" strokeWidth="2" strokeDasharray="1,4" />
                            <circle cx="100" cy="95" r="2" fill="#ffffff" />
                            <circle cx="100" cy="112" r="2" fill="#ffffff" />
                            <circle cx="100" cy="129" r="2" fill="#ffffff" />
                            {/* Breast pocket */}
                            <rect x="110" y="94" width="10" height="12" rx="2" fill="#ffffff" opacity="0.4" />
                          </g>
                        )}

                        {selectedTop.id === 'top_b' && (
                          /* Kaos Oversize: Crew neck band + relaxed hem + cool badge */
                          <g>
                            <path d="M90 68 Q100 76 110 68" stroke="#ffffff" strokeWidth="3" fill="none" />
                            <circle cx="100" cy="104" r="8" fill="#ffffff" opacity="0.6" />
                            <text x="100" y="108" textAnchor="middle" fontSize="10" fill="#ea580c" fontWeight="bold">★</text>
                            <line x1="74" y1="145" x2="126" y2="145" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
                          </g>
                        )}

                        {selectedTop.id === 'top_c' && (
                          /* Cardigan Rajut: V-Neck + knit ribs + big buttons */
                          <g>
                            <path d="M86 68 L100 98 L114 68" stroke="#ffffff" strokeWidth="3" fill="none" />
                            <path d="M96 70 L100 78 L104 70" fill="#ffffff" />
                            <line x1="100" y1="98" x2="100" y2="148" stroke="#047857" strokeWidth="2" opacity="0.4" />
                            <circle cx="100" cy="106" r="3" fill="#047857" opacity="0.6" />
                            <circle cx="100" cy="122" r="3" fill="#047857" opacity="0.6" />
                            <circle cx="100" cy="138" r="3" fill="#047857" opacity="0.6" />
                          </g>
                        )}

                        {selectedTop.id === 'top_d' && (
                          /* Jaket Denim: Sturdy collar + flap pockets + stitching */
                          <g>
                            <path d="M84 68 L98 82 L102 82 L116 68" stroke="#0284c7" strokeWidth="2" fill="#ffffff" opacity="0.7" />
                            <line x1="100" y1="82" x2="100" y2="148" stroke="#0284c7" strokeWidth="2" />
                            {/* Flap pockets */}
                            <rect x="76" y="90" width="12" height="10" rx="1" fill="#0284c7" opacity="0.4" />
                            <rect x="112" y="90" width="12" height="10" rx="1" fill="#0284c7" opacity="0.4" />
                            <line x1="72" y1="144" x2="128" y2="144" stroke="#0284c7" strokeWidth="2" opacity="0.5" />
                          </g>
                        )}
                      </g>

                      {/* DRESS-UP BOTTOM GARMENT (Attached to lower mannequin body) */}
                      <g className="transition-all duration-300">
                        {selectedBottom.id === 'bot_1' && (
                          /* Bawahan 1: Celana Chino Beige (Tapered trousers) */
                          <g>
                            <path
                              d="M74 148 L126 148 L124 186 L118 266 L104 266 L100 196 L96 266 L82 266 L76 186 Z"
                              fill={selectedBottom.color}
                              stroke="#ffffff"
                              strokeWidth="2"
                            />
                            {/* Front crease seam */}
                            <line x1="89" y1="168" x2="89" y2="260" stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />
                            <line x1="111" y1="168" x2="111" y2="260" stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />
                            {/* Waistband belt detail */}
                            <rect x="74" y="148" width="52" height="6" fill="#ffffff" opacity="0.4" />
                          </g>
                        )}

                        {selectedBottom.id === 'bot_2' && (
                          /* Bawahan 2: Rok Plisket Putih (Pleated flared A-line skirt) */
                          <g>
                            {/* Bare mannequin legs visible below skirt */}
                            <rect x="85" y="228" width="8" height="38" fill="#fed7aa" rx="2" />
                            <rect x="107" y="228" width="8" height="38" fill="#fed7aa" rx="2" />

                            <path
                              d="M76 148 L124 148 L142 228 L58 228 Z"
                              fill={selectedBottom.color}
                              stroke="#ffffff"
                              strokeWidth="2"
                            />
                            {/* Accordion pleat lines */}
                            <line x1="70" y1="156" x2="68" y2="228" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
                            <line x1="82" y1="152" x2="82" y2="228" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
                            <line x1="94" y1="150" x2="95" y2="228" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
                            <line x1="106" y1="150" x2="105" y2="228" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
                            <line x1="118" y1="152" x2="118" y2="228" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
                            <line x1="130" y1="156" x2="132" y2="228" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
                            {/* Scalloped hem detail */}
                            <path d="M58 228 Q100 234 142 228" stroke="#ca8a04" strokeWidth="1.5" fill="none" opacity="0.6" />
                          </g>
                        )}

                        {selectedBottom.id === 'bot_3' && (
                          /* Bawahan 3: Kulot Linen Sage (Wide leg culottes) */
                          <g>
                            {/* Ankle visibility */}
                            <rect x="85" y="250" width="8" height="16" fill="#fed7aa" rx="2" />
                            <rect x="107" y="250" width="8" height="16" fill="#fed7aa" rx="2" />

                            <path
                              d="M74 148 L126 148 L134 252 L108 252 L100 190 L92 252 L66 252 Z"
                              fill={selectedBottom.color}
                              stroke="#ffffff"
                              strokeWidth="2"
                            />
                            {/* Soft drape lines */}
                            <path d="M80 160 Q84 210 78 250" stroke="#16a34a" strokeWidth="1.2" fill="none" opacity="0.4" />
                            <path d="M120 160 Q116 210 122 250" stroke="#16a34a" strokeWidth="1.2" fill="none" opacity="0.4" />
                          </g>
                        )}

                        {/* Special Rule Forbidden visual glow & badge */}
                        {currentChallenge === 2 && !isMannequinValidUnderSpecialRule && (
                          <g>
                            <rect
                              x="54"
                              y="144"
                              width="92"
                              height="124"
                              rx="16"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="3"
                              strokeDasharray="6,4"
                              className="animate-pulse"
                            />
                            <rect x="65" y="195" width="70" height="22" rx="6" fill="#ef4444" />
                            <text x="100" y="210" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                              DILARANG!
                            </text>
                          </g>
                        )}
                      </g>

                      {/* DRESS-UP SHOES (Attached to feet) */}
                      <g className="transition-all duration-300">
                        {selectedShoe.id === 'shoe_1' ? (
                          /* Sneakers Putih */
                          <g>
                            {/* Left sneaker */}
                            <path d="M78 266 L92 266 L98 282 L72 282 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="70" y="280" width="30" height="5" rx="2" fill="#64748b" />
                            <line x1="82" y1="272" x2="88" y2="272" stroke="#94a3b8" strokeWidth="1.5" />

                            {/* Right sneaker */}
                            <path d="M108 266 L122 266 L128 282 L102 282 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="100" y="280" width="30" height="5" rx="2" fill="#64748b" />
                            <line x1="112" y1="272" x2="118" y2="272" stroke="#94a3b8" strokeWidth="1.5" />
                          </g>
                        ) : (
                          /* Loafers Elegan */
                          <g>
                            {/* Left loafer */}
                            <path d="M78 266 L92 266 L98 282 L74 282 Z" fill="#1e293b" />
                            <rect x="72" y="280" width="28" height="5" rx="1.5" fill="#0f172a" />
                            <rect x="80" y="271" width="10" height="3" fill="#cbd5e1" rx="1" />

                            {/* Right loafer */}
                            <path d="M108 266 L122 266 L126 282 L102 282 Z" fill="#1e293b" />
                            <rect x="100" y="280" width="28" height="5" rx="1.5" fill="#0f172a" />
                            <rect x="110" y="271" width="10" height="3" fill="#cbd5e1" rx="1" />
                          </g>
                        )}
                      </g>
                    </svg>

                    <span className="text-[10px] font-semibold text-slate-400 mt-1">
                      Manekin Fitting 3D Studio
                    </span>
                  </div>
                </div>

                {/* Modern Pastel Explanatory Card (6 cols) */}
                <div className="md:col-span-6 bg-gradient-to-br from-violet-50/90 via-pink-50/70 to-amber-50/50 border border-violet-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-violet-100 pb-2.5">
                    <span className="text-xs font-bold text-violet-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                      Detail Outfit Aktif
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        currentChallenge === 2 && !isMannequinValidUnderSpecialRule
                          ? 'bg-rose-100 text-rose-700 border-rose-300'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      {currentChallenge === 2 && !isMannequinValidUnderSpecialRule ? '⚠️ Tidak Valid' : '✓ Kombinasi Harmonis'}
                    </span>
                  </div>

                  {/* Garment details list */}
                  <div className="space-y-2">
                    {/* Top Row */}
                    <div className="flex items-center justify-between p-2.5 bg-white/80 rounded-xl border border-violet-100/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{selectedTop.icon}</span>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Atasan (1 dari 4)</span>
                          <span className="text-xs font-bold text-slate-800">{selectedTop.name}</span>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: selectedTop.color }} />
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between p-2.5 bg-white/80 rounded-xl border border-violet-100/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{selectedBottom.icon}</span>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Bawahan (1 dari 3)</span>
                          <span className="text-xs font-bold text-slate-800">{selectedBottom.name}</span>
                        </div>
                      </div>
                      <span className="w-4 h-4 rounded-full border border-slate-300 shadow-inner" style={{ backgroundColor: selectedBottom.color }} />
                    </div>

                    {/* Shoes Row */}
                    <div className="flex items-center justify-between p-2.5 bg-white/80 rounded-xl border border-violet-100/80 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{selectedShoe.icon}</span>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Sepatu (1 dari 2)</span>
                          <span className="text-xs font-bold text-slate-800">{selectedShoe.name}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-violet-600 bg-violet-100/80 px-2 py-0.5 rounded-md">
                        2 Opsi
                      </span>
                    </div>
                  </div>

                  {/* Math concept guidance card */}
                  <div className="p-2.5 rounded-xl bg-purple-100/60 border border-purple-200/70 text-[11px] text-purple-900 leading-snug">
                    <span className="font-bold block mb-0.5">Konsep Kaidah Pencacahan:</span>
                    <span>
                      Setiap outfit lengkap tersusun atas <strong>Atasan</strong> dipasangkan dengan <strong>Bawahan</strong>, lalu dipadukan dengan <strong>Sepatu</strong> secara serentak berpasangan.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wardrobe Racks Selectors */}
            <div className="mt-5 space-y-4">
              {/* Tops selector */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                  Pilih Atasan (4 Opsi):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {tops.map((top) => (
                    <button
                      key={top.id}
                      type="button"
                      onClick={() => {
                        playSound('select');
                        setSelectedTop(top);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedTop.id === top.id
                          ? 'border-pink-500 bg-pink-50/80 font-bold ring-2 ring-pink-300 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xl block">{top.icon}</span>
                      <span className="text-[11px] block mt-0.5 leading-tight">{top.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottoms selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-700">
                    Pilih Bawahan (3 Opsi):
                  </span>
                  {currentChallenge === 2 && selectedTop.id === 'top_a' && (
                    <span className="text-[10px] text-rose-600 font-bold">
                      Atasan A: Bawahan 3 Dilarang!
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {bottoms.map((bot) => {
                    const isForbiddenWithTopA = currentChallenge === 2 && selectedTop.id === 'top_a' && bot.id === 'bot_3';
                    return (
                      <button
                        key={bot.id}
                        type="button"
                        onClick={() => {
                          playSound('select');
                          setSelectedBottom(bot);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedBottom.id === bot.id
                            ? isForbiddenWithTopA
                              ? 'border-rose-400 bg-rose-50 font-bold ring-2 ring-rose-300 text-rose-800'
                              : 'border-pink-500 bg-pink-50/80 font-bold ring-2 ring-pink-300 shadow-sm'
                            : isForbiddenWithTopA
                            ? 'border-rose-200 bg-rose-50/50 text-rose-400 opacity-60'
                            : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                        }`}
                      >
                        <span className="text-xl block">{bot.icon}</span>
                        <span className="text-[11px] block mt-0.5 leading-tight">{bot.name}</span>
                        {isForbiddenWithTopA && (
                          <span className="text-[9px] text-rose-600 font-bold block mt-0.5">
                            ✗ Terkunci
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shoes selector */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                  Pilih Sepatu (2 Opsi):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {shoes.map((shoe) => (
                    <button
                      key={shoe.id}
                      type="button"
                      onClick={() => {
                        playSound('select');
                        setSelectedShoe(shoe);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedShoe.id === shoe.id
                          ? 'border-pink-500 bg-pink-50/80 font-bold ring-2 ring-pink-300 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                      }`}
                    >
                      <span className="text-xl block">{shoe.icon}</span>
                      <span className="text-[11px] block mt-0.5 leading-tight">{shoe.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Special Rule Table Matrix Visualizer (Shown in Challenge 2) */}
          {currentChallenge === 2 && (
            <TableMatrix
              title="Matriks Pasangan Atasan & Bawahan (Special Rule)"
              rowHeader="Atasan"
              colHeader="Bawahan"
              rows={matrixRows}
              cols={matrixCols}
              isCellValid={isCellValidSpecial}
              invalidReason={getInvalidReason}
              selectedPair={[selectedTop.id, selectedBottom.id]}
              multiplierText="Setiap Pasang × 2 Sepatu"
            />
          )}
        </div>

        {/* Right Question & Concept Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* CHALLENGE 1 QUESTION */}
          {currentChallenge === 1 && (
            <div className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                Tantangan 1: Kombinasi Outfit Dasar
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Tersedia 4 pilihan atasan, 3 pilihan bawahan, dan 2 pilihan sepatu tanpa ada batasan pasangan.
              </p>

              {/* Step 1: Rule Selector */}
              <div className="space-y-2 mb-4">
                <label className="block text-xs font-semibold text-slate-700">
                  1. Operasi apa yang tepat untuk menentukan banyak kombinasi outfit lengkap?
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
                        ? 'bg-pink-50 border-pink-400 text-pink-900 font-semibold ring-2 ring-pink-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-bold block text-sm mb-0.5">+ Penjumlahan</span>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Hanya memilih salah satu potong
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
                        ? 'bg-pink-50 border-pink-400 text-pink-900 font-semibold ring-2 ring-pink-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-bold block text-sm mb-0.5">× Perkalian</span>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Memilih bertahap & berpasangan
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2: Number Input */}
              <div className="space-y-2 mb-5">
                <label htmlFor="m2c1-input" className="block text-xs font-semibold text-slate-700">
                  2. Berapa total kombinasi outfit yang dapat dibuat?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="m2c1-input"
                    type="number"
                    value={c1Answer}
                    onChange={(e) => setC1Answer(e.target.value)}
                    placeholder="Masukkan angka..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">kombinasi</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckC1}
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                      <span>{c1Result.conceptTip || 'Silakan hitung kembali dan masukkan kembali jawabanmu di kolom input di atas!'}</span>
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
                        <span>Lanjut ke Tantangan 2 (Special Rule)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CHALLENGE 2 QUESTION (SPECIAL RULE) */}
          {currentChallenge === 2 && (
            <div className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="inline-block px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                Special Rule Mode
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                Tantangan 2: Aturan Kombinasi Khusus
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Atasan A hanya boleh dengan Bawahan 1 atau 2. Atasan B, C, D boleh dengan seluruh 3 bawahan. Semua pasangan valid boleh dipadukan dengan 2 sepatu.
              </p>

              {/* Step 1: Reason Selector */}
              <div className="space-y-2 mb-4">
                <label className="block text-xs font-semibold text-slate-700">
                  1. Mengapa rumus 4 × 3 × 2 = 24 tidak dapat langsung digunakan?
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      playSound('select');
                      setC2Reason('syarat_khusus');
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      c2Reason === 'syarat_khusus'
                        ? 'bg-pink-50 border-pink-400 text-pink-900 font-semibold ring-2 ring-pink-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-bold block mb-0.5">Ada pasangan yang tidak diperbolehkan</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Pasangan Atasan A + Bawahan 3 dilarang, sehingga harus dihitung pasangan yang benar-benar memenuhi syarat.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSound('select');
                      setC2Reason('hanya_tambah');
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      c2Reason === 'hanya_tambah'
                        ? 'bg-pink-50 border-pink-400 text-pink-900 font-semibold ring-2 ring-pink-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-bold block mb-0.5">Harus menggunakan penjumlahan saja</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      Karena ada batasan, tidak boleh ada perkalian sama sekali.
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 2: Number Input */}
              <div className="space-y-2 mb-5">
                <label htmlFor="m2c2-input" className="block text-xs font-semibold text-slate-700">
                  2. Berapa banyak kombinasi outfit valid yang dapat dibuat?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="m2c2-input"
                    type="number"
                    value={c2Answer}
                    onChange={(e) => setC2Answer(e.target.value)}
                    placeholder="Masukkan angka..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all"
                  />
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">kombinasi</span>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  Petunjuk: Hitung pasangan atasan-bawahan yang sah, lalu kalikan dengan 2 pilihan sepatu.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckC2}
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                      <strong>Perhitungan:</strong> {c2Result.formula}
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
                          id="btn-m2-back-to-map"
                          onClick={() => {
                            playSound('click');
                            setShowCompletionModal(true);
                          }}
                          className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Compass className="w-4 h-4" />
                          <span>Kembali ke Peta Dunia (Misi 3 Terbuka 🔓)</span>
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

      {/* Pop-up Modal Ucapan Selamat Misi 2 Selesai */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-pink-300 animate-scaleUp text-center p-6 sm:p-7 relative">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-pink-200 border-2 border-white">
              <span className="text-3xl animate-bounce">👗</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Misi 2 Berhasil Diselesaikan!</span>
            </div>

            <h3 className="font-display font-black text-2xl text-slate-900 mb-1">
              Hebat, Fashion Stylist!
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Kamu telah menguasai kombinasi outfit bertahap dan mampu menganalisis <strong>Special Rule (Batasan Khusus)</strong> dengan sangat cermat.
            </p>

            <div className="bg-pink-50/80 border border-pink-200 rounded-2xl p-3.5 mb-5 text-left text-xs text-pink-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-xs text-pink-900 border-b border-pink-100 pb-1">
                <span>Pencapaian Misi 2</span>
                <span className="text-emerald-600 font-mono">+25 Poin (★ 2)</span>
              </div>
              <p className="text-[11px] text-pink-700 leading-snug">
                🔓 <strong>Misi 3: Rencana Akhir Pekan</strong> kini telah terbuka di Peta Dunia. Silakan klik kartu Misi 3 di Peta Dunia untuk memilih dan memulainya!
              </p>
            </div>

            <button
              type="button"
              id="btn-modal-m2-back-to-map"
              onClick={() => {
                playSound('click');
                setShowCompletionModal(false);
                onBackToMap();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-display font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-pink-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
