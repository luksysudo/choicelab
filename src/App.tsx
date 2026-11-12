/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeaderHUD } from './components/HeaderHUD.tsx';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { TitleScreen } from './components/TitleScreen.tsx';
import { AdventureMap } from './components/AdventureMap.tsx';
import { Mission1Cafe } from './components/Mission1Cafe.tsx';
import { Mission2Fashion } from './components/Mission2Fashion.tsx';
import { Mission3City } from './components/Mission3City.tsx';
import { Mission4Lab } from './components/Mission4Lab.tsx';
import { VictoryScreen } from './components/VictoryScreen.tsx';
import { EvaluationQuiz } from './components/EvaluationQuiz.tsx';
import { QuizResultView } from './components/QuizResultView.tsx';
import { GuideModal } from './components/GuideModal.tsx';
import { LearningMaterialModal } from './components/LearningMaterialModal.tsx';
import { LiveLeaderboard } from './components/LiveLeaderboard.tsx';
import { submitScoreToLeaderboard } from './services/leaderboardService.ts';
import { QUIZ_QUESTIONS } from './data/quizQuestions.ts';
import { toggleMute, getMuteState, playSound } from './utils/audio.ts';

export default function App() {
  // Check if testing autostart / unlockall is active
  const isAutoUnlocked = (() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('unlockall') === '1' || params.get('autostart') === '1';
    }
    return false;
  })();

  // Student Identity State (Nama & Kelas)
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || params.get('unlockall') === '1') {
        return 'Siswa Explorer';
      }
      const saved = localStorage.getItem('choicelab_student_name');
      if (saved) return saved;
    }
    return '';
  });

  const [studentClass, setStudentClass] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || params.get('unlockall') === '1') {
        return 'XII MIPA 1';
      }
      const saved = localStorage.getItem('choicelab_student_class');
      if (saved) return saved;
    }
    return '';
  });

  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view')) {
        return params.get('view')!;
      }
      if (params.get('autostart') === '1') {
        return 'map';
      }
      const savedName = localStorage.getItem('choicelab_student_name');
      const savedClass = localStorage.getItem('choicelab_student_class');
      if (savedName && savedClass) {
        return 'home';
      }
    }
    return 'welcome';
  });

  // Prerequisite: Siswa wajib membaca materi terlebih dahulu sebelum misi aktif
  const [isMaterialCompleted, setIsMaterialCompleted] = useState<boolean>(() => {
    if (isAutoUnlocked) return true;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('choicelab_material_completed') === 'true';
    }
    return false;
  });

  const [unlockedMissions, setUnlockedMissions] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('unlockall') === '1') {
        return [1, 2, 3, 4];
      }
    }
    return [1];
  });

  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizDurationSeconds, setQuizDurationSeconds] = useState<number>(0);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);

  // Complete Welcome / Name & Class entry handler
  const handleWelcomeStart = (name: string, sClass: string) => {
    setStudentName(name);
    setStudentClass(sClass);
    if (typeof window !== 'undefined') {
      localStorage.setItem('choicelab_student_name', name);
      localStorage.setItem('choicelab_student_class', sClass);
    }
    setCurrentView('home');
  };

  // Complete Material handler
  const handleCompleteMaterial = () => {
    setIsMaterialCompleted(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('choicelab_material_completed', 'true');
    }
    setIsMaterialOpen(false);
    playSound('unlock');
  };

  // Challenge completion handler
  const handleCompleteChallenge = (missionId: number, challengeIndex: number, points: number) => {
    const challengeKey = `${missionId}_${challengeIndex}`;
    if (!completedChallenges.includes(challengeKey)) {
      setCompletedChallenges((prev) => [...prev, challengeKey]);
      setScore((prev) => prev + points);
      setStars((prev) => prev + 1);
    }

    // If challenge 2 of a mission is completed, mark mission completed and unlock next
    if (challengeIndex === 2) {
      if (!completedMissions.includes(missionId)) {
        setCompletedMissions((prev) => [...prev, missionId]);
      }
      const nextMissionId = missionId + 1;
      if (nextMissionId <= 4 && !unlockedMissions.includes(nextMissionId)) {
        setUnlockedMissions((prev) => [...prev, nextMissionId]);
        playSound('unlock');
      }
    }
  };

  // Quiz finish handler with duration & leaderboard submission
  const handleFinishQuiz = (answers: Record<number, 'A' | 'B' | 'C' | 'D'>, durationSeconds: number) => {
    setQuizAnswers(answers);
    setQuizDurationSeconds(durationSeconds);
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const quizPoints = correctCount * 10;
    setScore((prev) => prev + quizPoints);

    // Kirim data hasil kuis ke Webhook Google Apps Script / Local storage
    submitScoreToLeaderboard({
      nama_siswa: studentName || 'Choice Explorer',
      kelas: studentClass || undefined,
      skor: quizPoints,
      durasi_detik: durationSeconds,
      waktu_selesai: new Date().toISOString()
    }).catch((err) => console.warn('Leaderboard submit:', err));

    setCurrentView('quiz-result');
  };

  const handleToggleSound = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  const handleRestart = () => {
    setUnlockedMissions([1]);
    setCompletedMissions([]);
    setCompletedChallenges([]);
    setScore(0);
    setStars(0);
    setQuizAnswers({});
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Universal Top HUD Navigation (shows student identity & suppresses help during quiz) */}
      <HeaderHUD
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        unlockedMissions={unlockedMissions}
        score={score}
        stars={stars}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenMaterial={() => setIsMaterialOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        isMaterialCompleted={isMaterialCompleted}
        studentName={studentName}
        studentClass={studentClass}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {currentView === 'welcome' && (
          <WelcomeScreen
            onStart={handleWelcomeStart}
            initialName={studentName}
            initialClass={studentClass}
          />
        )}

        {currentView === 'home' && (
          <TitleScreen
            onStartAdventure={() => setCurrentView('map')}
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenMaterial={() => setIsMaterialOpen(true)}
            isMaterialCompleted={isMaterialCompleted}
          />
        )}

        {currentView === 'map' && (
          <AdventureMap
            unlockedMissions={unlockedMissions}
            completedMissions={completedMissions}
            hasCompletedQuiz={Object.keys(quizAnswers).length > 0}
            onSelectMission={(viewKey) => setCurrentView(viewKey)}
            onStartQuiz={() => setCurrentView('quiz')}
            onViewQuizResult={() => setCurrentView('quiz-result')}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
            onViewFinalResults={() => setCurrentView('victory')}
          />
        )}

        {currentView === 'misi-1' && (
          <Mission1Cafe
            onCompleteChallenge={handleCompleteChallenge}
            onNavigateToNext={() => setCurrentView('map')}
            onBackToMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'misi-2' && (
          <Mission2Fashion
            onCompleteChallenge={handleCompleteChallenge}
            onNavigateToNext={() => {
              if (unlockedMissions.includes(3)) {
                setCurrentView('misi-3');
              } else {
                setCurrentView('map');
              }
            }}
            onBackToMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'misi-3' && (
          <Mission3City
            onCompleteChallenge={handleCompleteChallenge}
            onNavigateToNext={() => {
              if (unlockedMissions.includes(4)) {
                setCurrentView('misi-4');
              } else {
                setCurrentView('map');
              }
            }}
            onBackToMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'misi-4' && (
          <Mission4Lab
            onCompleteChallenge={handleCompleteChallenge}
            onNavigateToVictory={() => setCurrentView('quiz')}
            onBackToMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'quiz' && (
          <EvaluationQuiz
            studentName={studentName || 'Choice Explorer'}
            onFinishQuiz={handleFinishQuiz}
          />
        )}

        {currentView === 'quiz-result' && (
          <QuizResultView
            studentName={studentName || 'Choice Explorer'}
            studentClass={studentClass}
            answers={quizAnswers}
            durationSeconds={quizDurationSeconds}
            onNavigateToMap={() => setCurrentView('map')}
            onReviewMaterial={() => setIsMaterialOpen(true)}
          />
        )}

        {currentView === 'victory' && (
          <VictoryScreen
            score={score}
            stars={stars}
            completedMissions={completedMissions}
            onRestart={handleRestart}
            onNavigateToMap={() => setCurrentView('map')}
          />
        )}
      </main>

      {/* Tombol 1 Modal: Buku Panduan Penggunaan Media & Aturan Game */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Tombol 2 Modal: Materi Pembelajaran Komprehensif (Asmar Achmad 2020) */}
      <LearningMaterialModal
        isOpen={isMaterialOpen}
        onClose={() => setIsMaterialOpen(false)}
        isCompleted={isMaterialCompleted}
        onCompleteMaterial={handleCompleteMaterial}
      />

      {/* Modal Papan Peringkat Live Kelas (Top 5) */}
      {isLeaderboardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setIsLeaderboardOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
            >
              ✕
            </button>
            <LiveLeaderboard currentStudentName={studentName} />
          </div>
        </div>
      )}
    </div>
  );
}
