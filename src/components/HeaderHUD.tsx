import React from 'react';
import { Volume2, VolumeX, BookOpen, Compass, HelpCircle, Lock, Award, Trophy } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface HeaderHUDProps {
  currentView: string;
  onNavigate: (view: string) => void;
  unlockedMissions: number[];
  score: number;
  stars: number;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
  onOpenMaterial: () => void;
  isMaterialCompleted: boolean;
  studentName?: string;
  studentClass?: string;
  onOpenLeaderboard?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentView,
  onNavigate,
  unlockedMissions,
  score,
  stars,
  isMuted,
  onToggleSound,
  onOpenGuide,
  onOpenMaterial,
  isMaterialCompleted,
  studentName,
  studentClass,
  onOpenLeaderboard
}) => {
  const isQuizMode = currentView === 'quiz';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3 flex items-center justify-between gap-4 md:gap-8 transition-all print:hidden no-print">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <button
        type="button"
        disabled={isQuizMode}
        onClick={() => {
          if (isQuizMode) return;
          playSound('click');
          onNavigate('home');
        }}
        className={`text-left font-display text-lg font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 transition-colors ${
          isQuizMode ? 'cursor-not-allowed opacity-90' : 'hover:text-indigo-600 cursor-pointer'
        }`}
      >
        <span className="text-indigo-600">CHOICE</span> LAB
      </button>

      {/* Zone 2: 4-5 single-line nav links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          type="button"
          disabled={isQuizMode}
          onClick={() => {
            if (isQuizMode) return;
            if (isMaterialCompleted) {
              playSound('click');
              onNavigate('map');
            } else {
              playSound('wrong');
              onOpenMaterial();
            }
          }}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            isQuizMode
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : currentView === 'map'
              ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5 cursor-pointer'
              : 'hover:text-indigo-600 cursor-pointer'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Peta Dunia</span>
        </button>

        <button
          type="button"
          disabled={isQuizMode}
          onClick={() => {
            if (isQuizMode) return;
            if (unlockedMissions.includes(1) && isMaterialCompleted) {
              playSound('click');
              onNavigate('misi-1');
            } else if (!isMaterialCompleted) {
              playSound('wrong');
              onOpenMaterial();
            }
          }}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            isQuizMode
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : currentView === 'misi-1'
              ? 'text-amber-600 font-semibold border-b-2 border-amber-600 pb-0.5 cursor-pointer'
              : unlockedMissions.includes(1) && isMaterialCompleted
              ? 'hover:text-amber-600 text-slate-600 cursor-pointer'
              : 'text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          1. Kafe Pilihan
        </button>

        <button
          type="button"
          disabled={isQuizMode}
          onClick={() => {
            if (isQuizMode) return;
            if (unlockedMissions.includes(2) && isMaterialCompleted) {
              playSound('click');
              onNavigate('misi-2');
            } else if (!isMaterialCompleted) {
              playSound('wrong');
              onOpenMaterial();
            }
          }}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            isQuizMode
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : currentView === 'misi-2'
              ? 'text-pink-600 font-semibold border-b-2 border-pink-600 pb-0.5 cursor-pointer'
              : unlockedMissions.includes(2) && isMaterialCompleted
              ? 'hover:text-pink-600 text-slate-600 cursor-pointer'
              : 'text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          2. Studio Gaya
        </button>

        <button
          type="button"
          disabled={isQuizMode}
          onClick={() => {
            if (isQuizMode) return;
            if (unlockedMissions.includes(3) && isMaterialCompleted) {
              playSound('click');
              onNavigate('misi-3');
            } else if (!isMaterialCompleted) {
              playSound('wrong');
              onOpenMaterial();
            }
          }}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            isQuizMode
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : currentView === 'misi-3'
              ? 'text-teal-600 font-semibold border-b-2 border-teal-600 pb-0.5 cursor-pointer'
              : unlockedMissions.includes(3) && isMaterialCompleted
              ? 'hover:text-teal-600 text-slate-600 cursor-pointer'
              : 'text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          3. Rencana Kota
        </button>

        <button
          type="button"
          disabled={isQuizMode}
          onClick={() => {
            if (isQuizMode) return;
            if (unlockedMissions.includes(4) && isMaterialCompleted) {
              playSound('click');
              onNavigate('misi-4');
            } else if (!isMaterialCompleted) {
              playSound('wrong');
              onOpenMaterial();
            }
          }}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            isQuizMode
              ? 'opacity-40 cursor-not-allowed text-slate-400'
              : currentView === 'misi-4'
              ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-0.5 cursor-pointer'
              : unlockedMissions.includes(4) && isMaterialCompleted
              ? 'hover:text-indigo-600 text-slate-600 cursor-pointer'
              : 'text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          4. Laboratorium
        </button>

        {currentView === 'quiz-result' && (
          <span className="text-indigo-700 font-bold border-b-2 border-indigo-600 pb-0.5 flex items-center gap-1 text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Rapor Evaluasi</span>
          </span>
        )}
      </nav>

      {/* Zone 3: Student Identity Badge, HUD Score, and Independent Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Student Identity Display (Siswa: [Nama] | Kelas: [Kelas]) */}
        {studentName && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-indigo-50/90 px-2.5 sm:px-3 py-1.5 rounded-lg border border-indigo-200 shadow-2xs">
            <span className="text-indigo-600 font-medium">Siswa:</span>
            <span className="font-bold text-slate-900 max-w-[95px] sm:max-w-[140px] truncate" title={studentName}>
              {studentName}
            </span>
            {studentClass && (
              <>
                <span className="text-slate-300">|</span>
                <span className="text-indigo-600 font-medium">Kelas:</span>
                <span className="font-bold text-slate-900 whitespace-nowrap" title={studentClass}>
                  {studentClass}
                </span>
              </>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-700 bg-slate-100/90 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="text-amber-500">★ {stars}</span>
          <span className="text-slate-300">|</span>
          <span className="font-mono text-indigo-700">{score} PTS</span>
        </div>

        <button
          type="button"
          aria-label={isMuted ? 'Nyalakan Suara Game' : 'Matikan Suara Game'}
          onClick={() => {
            onToggleSound();
          }}
          className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* During Quiz: Strictly NO hints/help (Materi & Panduan are disabled/hidden) */}
        {isQuizMode ? (
          <div className="px-2.5 py-1.5 text-xs font-semibold text-amber-800 bg-amber-100/90 rounded-lg border border-amber-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Uji Mandiri</span>
            <span className="sm:hidden">Kuis</span>
          </div>
        ) : (
          <>
            {/* Independent Button: Materi Pembelajaran */}
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onOpenMaterial();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                !isMaterialCompleted
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm animate-pulse'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Materi</span>
            </button>

            {/* Independent Button: Buku Panduan */}
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onOpenGuide();
              }}
              className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Panduan</span>
            </button>

            {/* Independent Button: Papan Peringkat Live */}
            {onOpenLeaderboard && (
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onOpenLeaderboard();
                }}
                className="px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Peringkat</span>
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
