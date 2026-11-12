import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions.ts';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldAlert, Award, Lock } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface EvaluationQuizProps {
  studentName: string;
  onFinishQuiz: (answers: Record<number, 'A' | 'B' | 'C' | 'D'>, durationSeconds: number) => void;
}

export const EvaluationQuiz: React.FC<EvaluationQuizProps> = ({ studentName, onFinishQuiz }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [startTime] = useState<number>(() => Date.now());

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === QUIZ_QUESTIONS.length - 1;
  const progressPercent = Math.round(((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100);

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    playSound('select');
    setSelectedOption(key);
  };

  const handleLockAndNext = () => {
    if (!selectedOption) {
      playSound('wrong');
      return;
    }

    playSound('click');
    const updatedAnswers = { ...answers, [currentQ.id]: selectedOption };
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Finished all 10 questions - calculate duration
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      playSound('victory');
      onFinishQuiz(updatedAnswers, durationSeconds);
    } else {
      // Proceed to next question
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-4 sm:p-8 text-white flex flex-col items-center justify-between">
      {/* Top Banner Notice: Strictly No Hints during evaluation */}
      <div className="w-full max-w-3xl mb-4">
        <div className="bg-amber-500/20 border border-amber-400/40 rounded-2xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Mode Uji Mandiri:</strong> Bantuan dan materi dinonaktifkan. Jawaban langsung terkunci saat dikirim.
            </span>
          </div>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-wider">
            10 Soal Evaluasi
          </span>
        </div>
      </div>

      {/* Main Quiz Box */}
      <div className="w-full max-w-3xl bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex-1 flex flex-col justify-between">
        {/* Progress bar and Question metadata */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span className="text-cyan-400 font-bold font-display uppercase tracking-wider">
              {currentQ.topic}
            </span>
            <span className="font-mono text-slate-300">
              Soal {currentIndex + 1} dari {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700 mb-6">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Stem */}
          <div className="mb-6">
            <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
              Pertanyaan #{currentQ.id}
            </span>
            <h2 className="font-display font-semibold text-base sm:text-lg text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelect(opt.key)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/30 border-cyan-400 text-white shadow-lg ring-2 ring-cyan-400/50'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl font-display font-bold text-xs flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-md scale-105'
                        : 'bg-slate-700/80 text-slate-300 border-slate-600'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-snug">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions & Warning */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Pilihan akan dikunci permanen dan tidak bisa diulang setelah menekan tombol.</span>
          </div>

          <button
            type="button"
            disabled={!selectedOption}
            onClick={handleLockAndNext}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl font-display font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              selectedOption
                ? 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/40 cursor-pointer game-btn'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <span>{isLastQuestion ? 'Kunci & Kumpulkan Jawaban' : 'Kunci Jawaban & Lanjut'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
