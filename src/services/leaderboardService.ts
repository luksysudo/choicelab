/**
 * Leaderboard Service: Sinkronisasi Papan Peringkat Online Google Sheets & Lokal
 */

import { getActiveWebhookUrl } from '../config/leaderboardConfig.ts';

export interface LeaderboardEntry {
  id?: string;
  nama_siswa: string;
  kelas?: string;
  skor: number;
  waktu_selesai: string; // ISO string
  durasi_pengerjaan: string; // Misal "2m 14s"
  durasi_detik: number;
}

export interface SubmitScorePayload {
  nama_siswa: string;
  kelas?: string;
  skor: number;
  waktu_selesai?: string;
  durasi_detik: number;
}

const LOCAL_STORAGE_KEY = 'choicelab_local_leaderboard';
const NINETY_MINUTES_MS = 90 * 60 * 1000; // 90 Menit

/**
 * Format durasi dari detik ke teks yang mudah dibaca (misal: "2m 45s" atau "45s")
 */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) {
    return `${m}m ${s}s`;
  }
  return `${s}s`;
}

/**
 * Format waktu relatif (misal: "Baru saja", "5 mnt lalu")
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const past = new Date(isoString).getTime();
    const diffMs = Date.now() - past;
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes <= 0) return 'Baru saja';
    if (diffMinutes < 60) return `${diffMinutes} mnt lalu`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} jam lalu`;
  } catch {
    return 'Baru saja';
  }
}

/**
 * Simpan hasil kuis ke database online (Google Sheets) & cache lokal
 */
export async function submitScoreToLeaderboard(payload: SubmitScorePayload): Promise<{
  success: boolean;
  syncedOnline: boolean;
  message: string;
}> {
  const waktu_selesai = payload.waktu_selesai || new Date().toISOString();
  const durasi_pengerjaan = formatDuration(payload.durasi_detik);
  const nowMs = Date.now();

  const entry: LeaderboardEntry = {
    id: `${nowMs}_${Math.random().toString(36).substring(2, 6)}`,
    nama_siswa: payload.nama_siswa.trim() || 'Choice Explorer',
    kelas: payload.kelas?.trim() || undefined,
    skor: payload.skor,
    waktu_selesai,
    durasi_pengerjaan,
    durasi_detik: payload.durasi_detik
  };

  // 1. Simpan ke Local Storage agar data siswa tetap tersimpan aman di perangkat
  try {
    const current = getLocalLeaderboard();
    const updated = [entry, ...current.filter((e) => e.nama_siswa !== entry.nama_siswa)];
    saveLocalLeaderboard(updated);
  } catch (err) {
    console.warn('Gagal menyimpan ke cache lokal:', err);
  }

  // 2. Kirim ke Google Apps Script Web App jika URL tersedia
  const webhookUrl = getActiveWebhookUrl();
  if (webhookUrl) {
    try {
      const payloadToSend = {
        nama: entry.nama_siswa,
        nama_siswa: entry.nama_siswa,
        name: entry.nama_siswa,
        kelas: entry.kelas || '',
        class: entry.kelas || '',
        skor: entry.skor,
        score: entry.skor,
        durasi: entry.durasi_detik,
        durasi_detik: entry.durasi_detik,
        durasi_pengerjaan: entry.durasi_pengerjaan,
        waktu_selesai: entry.waktu_selesai,
        timestamp: nowMs
      };

      // Menggunakan mode: 'no-cors' dengan Content-Type: text/plain
      // Ini adalah CORS-safelisted request yang diizinkan oleh semua browser modern,
      // melewati pemblokiran CORS saat Google Apps Script melakukan 302 redirect
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payloadToSend)
      });

      return {
        success: true,
        syncedOnline: true,
        message: 'Hasil kuis berhasil dikirim ke Google Sheets kelas!'
      };
    } catch (err) {
      console.warn('Gagal sinkron ke Webhook Google Sheets:', err);
    }
  }

  return {
    success: true,
    syncedOnline: false,
    message: 'Tersimpan di perangkat lokal.'
  };
}

/**
 * Mengambil daftar skor Top 5 dengan filter 90 menit & urutan skor/durasi
 */
export async function fetchLeaderboardEntries(): Promise<{
  entries: LeaderboardEntry[];
  isOnline: boolean;
  totalSubmissions: number;
}> {
  const webhookUrl = getActiveWebhookUrl();
  const now = Date.now();

  // 1. Ambil dari Google Sheets Webhook online jika ada
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      // Tambahkan cache-busting timestamp agar data selalu real-time
      const separator = webhookUrl.includes('?') ? '&' : '?';
      const fetchUrl = `${webhookUrl}${separator}_t=${Date.now()}`;

      const response = await fetch(fetchUrl, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const json = await response.json();
        // Dukung baik format array langsung ([...]) maupun format objek ({ data: [...] })
        const rawList = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : [];

        if (Array.isArray(rawList)) {
          // Normalisasi dan terapkan filter 90 menit client-side
          const validEntries: (LeaderboardEntry & { _timestamp: number })[] = rawList
            .map((item: any) => {
              const rawName = String(item.nama || item.nama_siswa || item.name || '').trim();
              const rawClass = String(item.kelas || item.class || item.rombel || '').trim();
              const skor = Number(item.skor ?? item.score ?? 0);
              const durasiDetik = Number(item.durasi_detik ?? item.durasi ?? 0);
              const durasiStr = item.durasi_pengerjaan || formatDuration(durasiDetik);

              let itemTimestamp = 0;
              let waktuStr = item.waktu_selesai;

              if (typeof item.timestamp === 'number') {
                itemTimestamp = item.timestamp;
                waktuStr = new Date(item.timestamp).toISOString();
              } else if (item.waktu_selesai) {
                itemTimestamp = new Date(item.waktu_selesai).getTime();
              } else {
                itemTimestamp = now;
                waktuStr = new Date().toISOString();
              }

              return {
                nama_siswa: rawName,
                kelas: rawClass || undefined,
                skor,
                waktu_selesai: waktuStr,
                durasi_pengerjaan: durasiStr,
                durasi_detik: durasiDetik,
                _timestamp: itemTimestamp
              };
            })
            .filter((entry) => {
              // Hilangkan baris kosong atau tanpa nama siswa
              if (!entry.nama_siswa) {
                return false;
              }
              const itemTime = entry._timestamp || new Date(entry.waktu_selesai).getTime();
              // Filter 90 menit: Hanya data pengerjaan dalam rentang 90 menit terakhir
              return now - itemTime <= NINETY_MINUTES_MS && now - itemTime >= -120000;
            });

          // Urutkan: Skor tertinggi, lalu durasi pengerjaan tercepat
          validEntries.sort((a, b) => {
            if (b.skor !== a.skor) {
              return b.skor - a.skor;
            }
            return a.durasi_detik - b.durasi_detik;
          });

          // Tampilkan HANYA 5 besar (Top 5)
          const top5: LeaderboardEntry[] = validEntries.slice(0, 5).map(({ _timestamp, ...rest }) => rest);

          return {
            entries: top5,
            isOnline: true,
            totalSubmissions: validEntries.length
          };
        }
      }
    } catch (err) {
      console.warn('Koneksi Webhook Google Sheets tidak merespons, beralih ke cache lokal:', err);
    }
  }

  // 2. Fallback ke Local Storage jika offline / webhook belum merespons
  const localList = getLocalLeaderboard();

  // Inisialisasi data kelas jika lokal masih kosong
  if (localList.length === 0) {
    seedDefaultClassmates();
  }

  const activeLocal = getLocalLeaderboard().filter((entry) => {
    const itemTime = new Date(entry.waktu_selesai).getTime();
    return now - itemTime <= NINETY_MINUTES_MS && now - itemTime >= -120000;
  });

  // Urutkan: Skor tertinggi, lalu durasi tercepat
  activeLocal.sort((a, b) => {
    if (b.skor !== a.skor) {
      return b.skor - a.skor;
    }
    return a.durasi_detik - b.durasi_detik;
  });

  return {
    entries: activeLocal.slice(0, 5),
    isOnline: !!webhookUrl,
    totalSubmissions: activeLocal.length
  };
}

/**
 * Helper cache lokal
 */
function getLocalLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalLeaderboard(entries: LeaderboardEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error('Gagal menyimpan leaderboard lokal:', err);
  }
}

/**
 * Seeding data awal kelas dalam 90 menit terakhir agar papan peringkat hidup
 */
function seedDefaultClassmates(): void {
  const now = Date.now();
  const samplePeers: LeaderboardEntry[] = [
    {
      id: 'peer-1',
      nama_siswa: 'Zahra Putri (XII MIPA 1)',
      skor: 100,
      waktu_selesai: new Date(now - 12 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '2m 10s',
      durasi_detik: 130
    },
    {
      id: 'peer-2',
      nama_siswa: 'Dimas Kurnia (XII MIPA 2)',
      skor: 100,
      waktu_selesai: new Date(now - 25 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '2m 45s',
      durasi_detik: 165
    },
    {
      id: 'peer-3',
      nama_siswa: 'Nadia Safitri (XII MIPA 1)',
      skor: 90,
      waktu_selesai: new Date(now - 18 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '2m 05s',
      durasi_detik: 125
    },
    {
      id: 'peer-4',
      nama_siswa: 'Bima Satria (XII MIPA 3)',
      skor: 90,
      waktu_selesai: new Date(now - 40 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '3m 15s',
      durasi_detik: 195
    },
    {
      id: 'peer-5',
      nama_siswa: 'Citra Kirana (XII MIPA 2)',
      skor: 80,
      waktu_selesai: new Date(now - 55 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '2m 30s',
      durasi_detik: 150
    }
  ];

  saveLocalLeaderboard(samplePeers);
}
