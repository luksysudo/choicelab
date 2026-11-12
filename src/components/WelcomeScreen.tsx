import React, { useState } from 'react';
import { Sparkles, User, ArrowRight, Compass, ShieldCheck, GraduationCap } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface WelcomeScreenProps {
  onStart: (name: string, studentClass: string) => void;
  initialName?: string;
  initialClass?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  initialName = '',
  initialClass = ''
}) => {
  const [name, setName] = useState<string>(initialName);
  const [studentClass, setStudentClass] = useState<string>(initialClass);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const classPresets = [
    'XII MIPA 1',
    'XII MIPA 2',
    'XII MIPA 3',
    'XII MIPA 4',
    'XII IPS 1',
    'XII IPS 2',
    'XII Bahasa'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedClass = studentClass.trim();

    if (!trimmedName) {
      playSound('wrong');
      setErrorMsg('Silakan masukkan nama lengkapmu terlebih dahulu.');
      return;
    }
    if (!trimmedClass) {
      playSound('wrong');
      setErrorMsg('Silakan pilih atau masukkan kelasmu.');
      return;
    }

    playSound('unlock');
    onStart(trimmedName, trimmedClass);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-sky-100 via-indigo-50/70 to-purple-100 overflow-hidden">
      {/* Background Graphic Backdrop */}
      <div className="absolute inset-0 z-0 opacity-35 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/hero_choice_lab_world_1794313903358.jpg"
          alt="Choice Lab World"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-sky-100/40" />
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl animate-scaleUp">
        {/* Header Avatar & Welcoming Greeting */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-300/50 border-4 border-white mb-3">
            <span className="text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
              🧑‍🎓
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Matematika Kelas XII SMA · Fase F</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Selamat Datang di <span className="text-indigo-600">Choice Lab!</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            Media Pembelajaran Interaktif Kaidah Pencacahan: Misi Menemukan Semua Kemungkinan.
          </p>
        </div>

        {/* Identity Input Form (Nama & Kelas) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Nama Lengkap */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="student-name-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Nama Lengkap Siswa:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4 text-indigo-500" />
              </div>
              <input
                id="student-name-input"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Tuliskan nama lengkapmu di sini..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          {/* 2. Kelas */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label htmlFor="student-class-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Kelas / Rombel:
              </label>
              <span className="text-[10px] text-slate-400">Pilih cepat atau ketik</span>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
              </div>
              <input
                id="student-class-input"
                type="text"
                value={studentClass}
                onChange={(e) => {
                  setStudentClass(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Misal: XII MIPA 1..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Quick preset chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {classPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    playSound('select');
                    setStudentClass(preset);
                    if (errorMsg) setErrorMsg('');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                    studentClass === preset
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <p className="text-[11px] font-semibold text-rose-600 animate-fadeIn pl-1">
              ⚠️ {errorMsg}
            </p>
          )}

          {/* Start Learning CTA Button */}
          <button
            type="submit"
            id="btn-start-learning"
            disabled={!name.trim() || !studentClass.trim()}
            className={`w-full py-3.5 rounded-2xl font-display font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
              name.trim() && studentClass.trim()
                ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-300/50 transform hover:-translate-y-0.5 cursor-pointer game-btn'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
            }`}
          >
            <span>Mulai Pembelajaran</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Feature Highlights */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 font-medium">
          <div className="p-2 rounded-xl bg-slate-50">
            <span className="block text-base mb-0.5">🎮</span>
            <span>4 Misi 3D Game</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50">
            <span className="block text-base mb-0.5">📖</span>
            <span>Modul Resmi XII</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50">
            <span className="block text-base mb-0.5">📝</span>
            <span>Kuis 10 Soal</span>
          </div>
        </div>

        {/* Footer Curriculum Note */}
        <div className="mt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sesuai Capaian Pembelajaran Matematika SMA (Asmar Achmad, 2020)</span>
        </div>
      </div>
    </div>
  );
};
