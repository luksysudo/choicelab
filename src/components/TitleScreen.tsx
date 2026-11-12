import React, { useState } from 'react';
import { Sparkles, Play, BookOpen, Compass, ChevronRight, ShieldCheck, Lock, CheckCircle2, HelpCircle } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface TitleScreenProps {
  onStartAdventure: () => void;
  onOpenGuide: () => void;
  onOpenMaterial: () => void;
  isMaterialCompleted: boolean;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartAdventure,
  onOpenGuide,
  onOpenMaterial,
  isMaterialCompleted
}) => {
  const [showLockedWarning, setShowLockedWarning] = useState<boolean>(false);

  const handleStartClick = () => {
    if (!isMaterialCompleted) {
      playSound('wrong');
      setShowLockedWarning(true);
      setTimeout(() => setShowLockedWarning(false), 4000);
      onOpenMaterial();
    } else {
      playSound('unlock');
      onStartAdventure();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-sky-100 via-indigo-50/60 to-purple-100 p-6 md:p-10">
      {/* Background World Graphic Container */}
      <div className="absolute inset-0 z-0 opacity-40 md:opacity-50 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/hero_choice_lab_world_1794313903358.jpg"
          alt="Choice Lab 3D World"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter blur-[0.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-sky-200/30" />
      </div>

      {/* Floating 3D Island Badges (Preview of the 4 worlds) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-3">
        {/* Subtitle kicker */}
        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-indigo-800 uppercase tracking-widest mb-3 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-indigo-200 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Matematika Kelas XII SMA · Kaidah Pencacahan</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-slate-900 tracking-tight leading-none drop-shadow-sm">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">
            CHOICE LAB
          </span>
        </h1>

        <p className="mt-2.5 font-display font-bold text-lg sm:text-2xl text-slate-900 max-w-2xl text-balance drop-shadow-sm">
          Misi Menemukan Semua Kemungkinan
        </p>

        {/* High-Contrast Description Badge / Overlay */}
        <div className="mt-3 max-w-xl bg-slate-950/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/25 shadow-xl">
          <p className="text-xs sm:text-sm text-white font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-relaxed text-balance">
            Jelajahi 4 dunia interaktif untuk menguasai Aturan Penjumlahan, Aturan Perkalian, Diagram Pohon, dan Pemecahan Masalah dengan Batasan Khusus.
          </p>
        </div>
      </div>

      {/* Center 3D Showcase: Student Explorer Avatar & 4 Distant World Portals */}
      <div className="relative z-10 w-full max-w-4xl my-5 flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Explorer Student Avatar Card */}
        <div className="relative bg-white/85 backdrop-blur-md p-5 rounded-3xl border border-white/80 shadow-xl flex items-center gap-4 max-w-md isometric-card">
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center shadow-inner overflow-hidden shrink-0 border-2 border-white">
            <span className="text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
              🧑‍🎓
            </span>
            <div className="absolute bottom-0 inset-x-0 bg-indigo-900/70 text-[9px] text-white text-center py-0.5 font-bold">
              LEVEL 1
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
              <Compass className="w-3.5 h-3.5" />
              <span>Choice Explorer</span>
            </div>
            <h3 className="font-display font-bold text-slate-800 text-sm mt-0.5">Penjelajah Kemungkinan</h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              {isMaterialCompleted
                ? 'Materi telah kamu kuasai! Semua tantangan petualangan siap untuk dipecahkan.'
                : 'Materi pembelajaran adalah kunci membuka gerbang petualangan. Pelajari dulu teorinya!'}
            </p>
          </div>
        </div>

        {/* 4 Distant Missions Micro-Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
          <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-amber-200/80 shadow-sm text-center">
            <span className="text-2xl block mb-1">☕</span>
            <span className="text-[11px] font-bold text-amber-900 block">1. Kafe Pilihan</span>
            <span className="text-[9px] text-amber-700">Penjumlahan & Perkalian</span>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-pink-200/80 shadow-sm text-center">
            <span className="text-2xl block mb-1">👗</span>
            <span className="text-[11px] font-bold text-pink-900 block">2. Studio Gaya</span>
            <span className="text-[9px] text-pink-700">Batasan & Syarat Khusus</span>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-teal-200/80 shadow-sm text-center">
            <span className="text-2xl block mb-1">🏙️</span>
            <span className="text-[11px] font-bold text-teal-900 block">3. Rencana Kota</span>
            <span className="text-[9px] text-teal-700">Masalah Kontekstual</span>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-indigo-200/80 shadow-sm text-center">
            <span className="text-2xl block mb-1">🔬</span>
            <span className="text-[11px] font-bold text-indigo-900 block">4. Laboratorium</span>
            <span className="text-[9px] text-indigo-700">Tantangan Final FoodGo</span>
          </div>
        </div>
      </div>

      {/* Main Action Area with Independent Buttons */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center gap-3">
        {/* Warning notification when clicked while locked */}
        {showLockedWarning && (
          <div className="w-full bg-amber-500 text-white text-xs px-4 py-2.5 rounded-2xl shadow-lg border border-amber-400 flex items-center justify-between gap-2 animate-bounce">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" />
              <span><strong>Akses Misi Terkunci!</strong> Silakan baca seluruh Materi Pembelajaran terlebih dahulu.</span>
            </div>
            <button
              type="button"
              onClick={() => setShowLockedWarning(false)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Primary Start Mission Button (Locked vs Unlocked) */}
        <div className="w-full">
          {isMaterialCompleted ? (
            <button
              type="button"
              onClick={handleStartClick}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-display font-bold text-base rounded-2xl shadow-xl shadow-indigo-300/40 hover:shadow-indigo-400/60 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 game-btn cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>MULAI PETUALANGAN</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStartClick}
              className="w-full py-4 bg-slate-300 hover:bg-slate-300/90 text-slate-600 font-display font-bold text-sm sm:text-base rounded-2xl border-2 border-slate-300 shadow-sm transition-all flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>MULAI PETUALANGAN (TERKUNCI)</span>
              </div>
              <span className="text-[11px] text-amber-800 font-medium bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                Wajib Pelajari Materi Dulu
              </span>
            </button>
          )}
        </div>

        {/* Two Independent Support Buttons: Tombol 1 (Buku Panduan) & Tombol 2 (Materi Pembelajaran) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Tombol 2: Materi Pembelajaran */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              onOpenMaterial();
            }}
            className={`px-4 py-3.5 rounded-2xl border shadow-md transition-all flex items-center justify-between gap-2.5 cursor-pointer text-left ${
              !isMaterialCompleted
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 ring-2 ring-amber-300/70 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${!isMaterialCompleted ? 'bg-white/20' : 'bg-amber-100 text-amber-800'}`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-xs block leading-tight">
                  Materi Pembelajaran
                </span>
                <span className={`text-[10px] block ${!isMaterialCompleted ? 'text-amber-100' : 'text-slate-500'}`}>
                  Aturan Penjumlahan & Perkalian
                </span>
              </div>
            </div>

            {isMaterialCompleted ? (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                Selesai
              </span>
            ) : (
              <span className="text-[10px] font-bold text-white bg-black/20 px-2 py-0.5 rounded-full shrink-0">
                Wajib Dibaca
              </span>
            )}
          </button>

          {/* Tombol 1: Buku Panduan */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              onOpenGuide();
            }}
            className="px-4 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-display font-semibold text-xs rounded-2xl border border-slate-200 shadow-md transition-all flex items-center justify-between gap-2.5 cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-bold text-xs block leading-tight">
                  Buku Panduan
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Cara Main & Fungsi Tombol
                </span>
              </div>
            </div>
            <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full shrink-0">
              Petunjuk
            </span>
          </button>
        </div>
      </div>

      {/* Curriculum Trust Badge */}
      <div className="relative z-10 text-center text-xs text-slate-500 flex items-center justify-center gap-2 mt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Berdasarkan Modul Pembelajaran Matematika SMA (Asmar Achmad, 2020)</span>
      </div>
    </div>
  );
};
