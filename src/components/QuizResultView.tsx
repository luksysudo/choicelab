import React from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions.ts';
import { Award, CheckCircle2, XCircle, Compass, Sparkles, BookOpen, User, Clock } from 'lucide-react';
import { playSound } from '../utils/audio.ts';
import { LiveLeaderboard } from './LiveLeaderboard.tsx';
import { formatDuration } from '../services/leaderboardService.ts';
interface QuizResultViewProps {
  studentName: string;
  studentClass?: string;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  durationSeconds?: number;
  onNavigateToMap: () => void;
  onReviewMaterial: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  studentName,
  studentClass,
  answers,
  durationSeconds,
  onNavigateToMap,
  onReviewMaterial
}) => {
  // Calculate correct count
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  // Motivational message logic
  let motivationMsg = '';
  let badgeColor = '';
  if (scorePercent >= 80) {
    motivationMsg = `Luar biasa ${studentName}, kamu sudah sangat menguasai Kaidah Pencacahan (Aturan Penjumlahan dan Perkalian)!`;
    badgeColor = 'from-emerald-500 to-teal-600 text-white';
  } else if (scorePercent >= 60) {
    motivationMsg = `Kerja bagus ${studentName}, pemahamanmu sudah cukup baik! Pelajari kembali pembahasan soal yang belum tepat di bawah ini.`;
    badgeColor = 'from-amber-500 to-orange-500 text-white';
  } else {
    motivationMsg = `Tetap semangat ${studentName}! Jangan berkecil hati, cermati pembahasan setiap nomor di bawah untuk memperdalam pemahaman konsepmu.`;
    badgeColor = 'from-rose-500 to-pink-600 text-white';
  }

  const currentDateStr = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-sky-50 via-slate-50 to-indigo-50/50 p-4 sm:p-8 flex flex-col items-center print:bg-white print:p-2 print:min-h-0">
      <div className="max-w-4xl w-full space-y-6 print:space-y-4">
        {/* Official School Print Header (Only visible when printed) */}
        <div className="hidden print:block border-b-2 border-slate-800 pb-3 mb-4 text-center">
          <h2 className="font-display font-black text-lg text-slate-900 uppercase tracking-wide">
            LEMBAR HASIL EVALUASI PEMBELAJARAN MATEMATIKA
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Materi: Kaidah Pencacahan (Aturan Penjumlahan & Aturan Perkalian) · Kelas XII SMA (Fase F)
          </p>
          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 pt-1 border-t border-slate-200">
            <span>Media Pembelajaran Interaktif: <strong>CHOICE LAB</strong></span>
            <span>Tanggal Cetak: {currentDateStr}</span>
          </div>
        </div>

        {/* Certificate Card & Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl text-center relative overflow-hidden print:shadow-none print:border print:border-slate-300 print:rounded-2xl print:p-5">
          <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-amber-400 via-indigo-600 to-purple-600 print:hidden" />

          {/* Badge Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 shadow-xl shadow-amber-200/60 border-4 border-white mb-4 animate-bounce print:animate-none print:shadow-none print:w-12 print:h-12 print:mb-2">
            <Award className="w-10 h-10 print:w-6 print:h-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-2 print:border-slate-300 print:bg-slate-100 print:text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 print:hidden" />
            <span>RAPOR EVALUASI AKHIR SISWA</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 print:text-xl">
            Hasil Kuis Evaluasi Kaidah Pencacahan
          </h1>

          {/* Student Name & Completion Details Display */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 bg-indigo-50/80 px-4 py-1.5 rounded-2xl border border-indigo-200 text-sm font-bold text-indigo-950 print:bg-slate-50 print:border-slate-300 print:text-slate-900">
              <User className="w-4 h-4 text-indigo-600 print:text-slate-700" />
              <span>Nama: <span className="text-indigo-700 print:text-slate-950 font-black">{studentName}</span></span>
              {studentClass && (
                <>
                  <span className="text-slate-300">|</span>
                  <span>Kelas: <span className="text-indigo-700 print:text-slate-950 font-black">{studentClass}</span></span>
                </>
              )}
            </div>

            {durationSeconds ? (
              <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 print:hidden">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Waktu Pengerjaan: <strong className="font-mono text-slate-900">{formatDuration(durationSeconds)}</strong></span>
              </div>
            ) : null}
          </div>

          {/* Score summary grid */}
          <div className={`grid grid-cols-1 ${durationSeconds ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'} gap-3 my-6 max-w-3xl mx-auto print:my-3`}>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center print:p-2.5 print:border-slate-300">
              <span className="text-xs text-slate-500 font-semibold block mb-0.5 print:text-[10px]">Skor Akhir</span>
              <span className="text-3xl font-black text-indigo-700 font-mono block print:text-2xl print:text-slate-900">
                {scorePercent} / 100
              </span>
              <span className="text-[10px] text-slate-400">Skala 100</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center print:p-2.5 print:border-slate-300">
              <span className="text-xs text-emerald-800 font-semibold block mb-0.5 print:text-[10px] print:text-slate-700">Jawaban Benar</span>
              <div className="flex items-center justify-center gap-1 text-3xl font-black text-emerald-600 font-mono print:text-2xl print:text-slate-900">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 print:w-4 print:h-4" />
                <span>{correctCount}</span>
                <span className="text-sm font-normal text-emerald-700 print:text-xs">/ 10</span>
              </div>
              <span className="text-[10px] text-emerald-600 print:text-slate-600">{correctCount * 10}% Ketepatan</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center print:p-2.5 print:border-slate-300">
              <span className="text-xs text-rose-800 font-semibold block mb-0.5 print:text-[10px] print:text-slate-700">Jawaban Salah</span>
              <div className="flex items-center justify-center gap-1 text-3xl font-black text-rose-600 font-mono print:text-2xl print:text-slate-900">
                <XCircle className="w-6 h-6 text-rose-500 print:w-4 print:h-4" />
                <span>{totalQuestions - correctCount}</span>
                <span className="text-sm font-normal text-rose-700 print:text-xs">/ 10</span>
              </div>
              <span className="text-[10px] text-rose-600 print:text-slate-600">{totalQuestions - correctCount} Soal Perlu Ulang</span>
            </div>

            {durationSeconds ? (
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center print:p-2.5 print:border-slate-300">
                <span className="text-xs text-indigo-800 font-semibold block mb-0.5 print:text-[10px] print:text-slate-700">Durasi Pengerjaan</span>
                <div className="flex items-center justify-center gap-1 text-2xl font-black text-indigo-700 font-mono print:text-xl print:text-slate-900">
                  <Clock className="w-5 h-5 text-indigo-500 print:hidden" />
                  <span>{formatDuration(durationSeconds)}</span>
                </div>
                <span className="text-[10px] text-indigo-600 print:text-slate-600">Kecepatan Pengerjaan</span>
              </div>
            ) : null}
          </div>

          {/* Motivational message banner */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${badgeColor} text-xs sm:text-sm font-medium shadow-md max-w-2xl mx-auto leading-relaxed print:shadow-none print:border print:border-slate-300 print:bg-slate-50 print:text-slate-800 print:p-2.5`}>
            {motivationMsg}
          </div>

          {/* Action Toolbar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onReviewMaterial();
              }}
              className="px-5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Buka Materi Kaidah Pencacahan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                onNavigateToMap();
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Kembali ke Peta Petualangan</span>
            </button>
          </div>
        </div>

        {/* Live Top 5 Class Leaderboard (Online Google Sheets / Auto-refresh) */}
        <div className="print:hidden no-print">
          <LiveLeaderboard currentStudentName={studentName} />
        </div>

        {/* Detailed Review of All 10 Questions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6 print:shadow-none print:border print:border-slate-300 print:rounded-2xl print:p-5 print:space-y-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between print:pb-2">
            <div>
              <h2 className="font-display font-bold text-lg text-slate-900 print:text-base">
                Pembahasan & Analisis Detail 10 Soal Evaluasi
              </h2>
              <p className="text-xs text-slate-500 print:text-[10px]">
                Status nilai telah terkunci permanen. Cermati pembahasan tiap butir soal berikut:
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl border border-slate-200 print:text-[10px] print:px-2 print:py-0.5">
              10 Soal Terkunci
            </span>
          </div>

          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const studentAnswerKey = answers[q.id];
              const isCorrect = studentAnswerKey === q.correctAnswer;
              const studentChosenOption = q.options.find((o) => o.key === studentAnswerKey);
              const correctOption = q.options.find((o) => o.key === q.correctAnswer);

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all text-xs space-y-3 break-inside-avoid print:break-inside-avoid print:shadow-none print:border-slate-300 print:p-3.5 print:rounded-xl ${
                    isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200 print:bg-emerald-50/20'
                      : 'bg-rose-50/40 border-rose-200 print:bg-rose-50/20'
                  }`}
                >
                  {/* Question header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 print:border print:border-slate-400 ${
                          isCorrect ? 'bg-emerald-600 text-white print:bg-emerald-700' : 'bg-rose-600 text-white print:bg-rose-700'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-800 text-xs print:text-[11px]">
                        Topik: {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCorrect ? (
                        <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 print:border print:border-emerald-300 print:text-[10px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Benar (+10 Poin)
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold bg-rose-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 print:border print:border-rose-300 print:text-[10px]">
                          <XCircle className="w-3.5 h-3.5" />
                          Kurang Tepat (0 Poin)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question text */}
                  <p className="font-medium text-slate-800 leading-relaxed text-[13px] print:text-xs">
                    {q.question}
                  </p>

                  {/* Answer Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs print:gap-1.5">
                    <div className={`p-3 rounded-xl border print:p-2 print:rounded-lg ${
                      isCorrect ? 'bg-white border-emerald-200 text-emerald-950 print:border-slate-300' : 'bg-white border-rose-200 text-rose-950 print:border-slate-300'
                    }`}>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 print:text-[9px]">
                        Jawaban Pilihanmu:
                      </span>
                      <span className="font-bold print:text-xs">
                        {studentAnswerKey ? `(${studentAnswerKey}) ${studentChosenOption?.text}` : 'Tidak dijawab'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border bg-white border-slate-200 text-slate-800 print:p-2 print:border-slate-300 print:rounded-lg">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 print:text-[9px]">
                        Kunci Jawaban Benar:
                      </span>
                      <span className="font-bold text-indigo-700 print:text-slate-900 print:text-xs">
                        ({q.correctAnswer}) {correctOption?.text}
                      </span>
                    </div>
                  </div>

                  {/* Detailed explanation */}
                  <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200/80 space-y-1 text-slate-700 print:p-2.5 print:border-slate-300 print:rounded-lg">
                    <span className="font-bold text-indigo-900 block flex items-center gap-1.5 print:text-slate-900 print:text-[11px]">
                      <span>💡</span>
                      <span>Pembahasan Konseptual:</span>
                    </span>
                    <p className="leading-relaxed text-[11px] text-slate-600 print:text-[10px] print:text-slate-700">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Validation & Signature Block (Only visible when printed) */}
        <div className="hidden print:grid grid-cols-2 gap-8 pt-8 mt-6 border-t-2 border-slate-400 text-xs text-slate-800 break-inside-avoid">
          <div className="text-center">
            <p className="font-semibold text-slate-600 mb-16">Peserta Didik,</p>
            <p className="font-bold border-b border-slate-400 pb-1 inline-block min-w-[200px]">{studentName}</p>
            <p className="text-[10px] text-slate-500 mt-1">Siswa Kelas XII SMA</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-600 mb-16">Guru Mata Pelajaran Matematika,</p>
            <p className="font-bold border-b border-slate-400 pb-1 inline-block min-w-[200px]">( .................................................... )</p>
            <p className="text-[10px] text-slate-500 mt-1">NIP. ....................................................</p>
          </div>
        </div>
      </div>
    </div>
  );
};
