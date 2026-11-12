import React, { useEffect, useState, useCallback } from 'react';
import { Trophy, RefreshCw, Clock, Crown, Award, Medal, Wifi, WifiOff, Settings, CheckCircle2, User } from 'lucide-react';
import { fetchLeaderboardEntries, formatRelativeTime, LeaderboardEntry } from '../services/leaderboardService.ts';
import { getActiveWebhookUrl } from '../config/leaderboardConfig.ts';
import { GoogleSheetsConfigModal } from './GoogleSheetsConfigModal.tsx';
import { playSound } from '../utils/audio.ts';

interface LiveLeaderboardProps {
  currentStudentName?: string;
  autoRefreshIntervalSeconds?: number;
  onOpenSettings?: () => void;
  className?: string;
}

export const LiveLeaderboard: React.FC<LiveLeaderboardProps> = ({
  currentStudentName = '',
  autoRefreshIntervalSeconds = 12,
  className = ''
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState<number>(autoRefreshIntervalSeconds);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const loadData = useCallback(async (showSpin = true) => {
    if (showSpin) setIsRefreshing(true);
    try {
      const result = await fetchLeaderboardEntries();
      setEntries(result.entries);
      setIsOnline(result.isOnline);
      setLastUpdated(new Date());
      setCountdown(autoRefreshIntervalSeconds);
    } catch (err) {
      console.warn('Gagal memuat papan peringkat:', err);
    } finally {
      setIsLoading(false);
      if (showSpin) {
        setTimeout(() => setIsRefreshing(false), 400);
      }
    }
  }, [autoRefreshIntervalSeconds]);

  // Initial load
  useEffect(() => {
    loadData(false);
  }, [loadData]);

  // Auto-refresh countdown & interval (10-15 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          loadData(true);
          return autoRefreshIntervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loadData, autoRefreshIntervalSeconds]);

  const handleManualRefresh = () => {
    playSound('click');
    loadData(true);
  };

  const hasConfiguredWebhook = !!getActiveWebhookUrl();

  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xl space-y-4 ${className}`}>
      {/* Top Header of Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-lg shadow-amber-200/80">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-lg text-slate-900 tracking-tight">
                Top 5 Peringkat Kelas (Live)
              </h3>
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Sinkronisasi real-time lintas perangkat HP & Laptop siswa
            </p>
          </div>
        </div>

        {/* Sync Controls & Info */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Status badge */}
          <div
            title={
              hasConfiguredWebhook
                ? 'Terhubung dengan Webhook Google Sheets'
                : 'Mode lokal (Belum tersambung Webhook Google Sheets)'
            }
            className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-xl border ${
              hasConfiguredWebhook
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {hasConfiguredWebhook ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">Sheets Sync</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden md:inline">Mode Lokal</span>
              </>
            )}
          </div>

          {/* Refresh button with countdown */}
          <button
            type="button"
            onClick={handleManualRefresh}
            title="Perbarui daftar peringkat sekarang"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-mono text-slate-500">{countdown}s</span>
          </button>

          {/* Webhook Config Trigger */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              setIsSettingsOpen(true);
            }}
            title="Pengaturan Google Sheets Kelas"
            className="p-1.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 90-Minute Notice Banner */}
      <div className="flex items-center justify-between bg-indigo-50/70 border border-indigo-100 rounded-2xl px-3.5 py-2 text-[11px] text-indigo-900">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>
            <strong>Filter Sesi Kelas (90 Menit):</strong> Hanya data pengerjaan dalam 1 jam 30 menit terakhir yang dihitung.
          </span>
        </div>
        <span className="text-[10px] font-mono text-indigo-600 shrink-0 hidden sm:inline">
          Update: {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>

      {/* Top 5 Rankings List */}
      <div className="space-y-2.5">
        {isLoading ? (
          <div className="py-8 text-center text-xs text-slate-400 animate-pulse space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
            <p>Memuat papan peringkat kelas...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-1">
            <Trophy className="w-8 h-8 text-slate-300 mx-auto mb-1" />
            <p className="font-semibold text-slate-700">Belum ada siswa yang menyelesaikan kuis dalam 90 menit terakhir.</p>
            <p className="text-[11px] text-slate-400">Jadilah yang pertama menduduki posisi puncak kelas!</p>
          </div>
        ) : (
          entries.map((item, index) => {
            const rank = index + 1;
            const isFirst = rank === 1;
            const isSecond = rank === 2;
            const isThird = rank === 3;
            const isCurrentStudent =
              currentStudentName &&
              item.nama_siswa.toLowerCase().includes(currentStudentName.toLowerCase());

            let rankBadgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
            let cardBgClass = 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50';

            if (isFirst) {
              rankBadgeClass = 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 border-amber-300 shadow-md shadow-amber-200';
              cardBgClass = 'bg-gradient-to-r from-amber-50/90 via-yellow-50/60 to-white border-amber-300 shadow-md ring-1 ring-amber-300/60';
            } else if (isSecond) {
              rankBadgeClass = 'bg-gradient-to-tr from-slate-200 to-slate-300 text-slate-800 border-slate-300 shadow-sm';
              cardBgClass = 'bg-gradient-to-r from-slate-100/80 via-slate-50/50 to-white border-slate-300';
            } else if (isThird) {
              rankBadgeClass = 'bg-gradient-to-tr from-amber-600/30 to-orange-200 text-amber-900 border-amber-400/60 shadow-sm';
              cardBgClass = 'bg-gradient-to-r from-orange-50/60 via-amber-50/30 to-white border-amber-200';
            }

            return (
              <div
                key={item.id || `${item.nama_siswa}_${index}`}
                className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${cardBgClass} ${
                  isCurrentStudent ? 'ring-2 ring-indigo-500/80 border-indigo-400' : ''
                }`}
              >
                {/* Left: Rank & Student Identity */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Badge */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-display font-black text-sm shrink-0 border ${rankBadgeClass}`}
                  >
                    {isFirst ? (
                      <Crown className="w-5 h-5 text-amber-900" />
                    ) : isSecond ? (
                      <Medal className="w-5 h-5 text-slate-700" />
                    ) : isThird ? (
                      <Award className="w-5 h-5 text-amber-800" />
                    ) : (
                      <span>{rank}</span>
                    )}
                  </div>

                  {/* Student Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {item.nama_siswa}
                      </span>
                      {item.kelas && (
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md shrink-0">
                          {item.kelas}
                        </span>
                      )}
                      {isCurrentStudent && (
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-full shrink-0">
                          Kamu
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-slate-600">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Durasi: {item.durasi_pengerjaan || `${item.durasi_detik}s`}</span>
                      </span>
                      <span>•</span>
                      <span>{formatRelativeTime(item.waktu_selesai)}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Score */}
                <div className="text-right shrink-0">
                  <span
                    className={`font-display font-black text-base sm:text-lg font-mono ${
                      isFirst
                        ? 'text-amber-600'
                        : isSecond
                        ? 'text-slate-700'
                        : isThird
                        ? 'text-orange-700'
                        : 'text-indigo-600'
                    }`}
                  >
                    {item.skor}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-medium">Nilai</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Information Link */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <span className="text-[10px]">
          Urutan: <strong>Skor Tertinggi</strong> &gt; <strong>Waktu Tercepat</strong> (Maksimal 5 Besar).
        </span>
        <button
          type="button"
          onClick={() => {
            playSound('click');
            setIsSettingsOpen(true);
          }}
          className="text-indigo-600 hover:text-indigo-800 font-semibold underline cursor-pointer text-[11px]"
        >
          {hasConfiguredWebhook ? '⚙️ Atur URL Google Sheets' : '🔗 Hubungkan Google Sheets Kelas'}
        </button>
      </div>

      {/* Config Modal */}
      <GoogleSheetsConfigModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={() => {
          loadData(true);
        }}
      />
    </div>
  );
};
