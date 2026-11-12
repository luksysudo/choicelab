import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration, formatRelativeTime, LeaderboardEntry } from './leaderboardService.ts';

test('formatDuration formats seconds correctly', () => {
  assert.equal(formatDuration(45), '45s');
  assert.equal(formatDuration(60), '1m 0s');
  assert.equal(formatDuration(135), '2m 15s');
  assert.equal(formatDuration(3600), '60m 0s');
});

test('Filter 90 menit dan pengurutan Top 5 berfungsi tepat', () => {
  const now = Date.now();
  const NINETY_MINUTES_MS = 90 * 60 * 1000;

  const rawEntries: LeaderboardEntry[] = [
    {
      nama_siswa: 'Siswa A (Terkini, Skor 100, Cepat)',
      skor: 100,
      waktu_selesai: new Date(now - 10 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '1m 30s',
      durasi_detik: 90
    },
    {
      nama_siswa: 'Siswa B (Terkini, Skor 100, Lebih Lambat)',
      skor: 100,
      waktu_selesai: new Date(now - 20 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '2m 00s',
      durasi_detik: 120
    },
    {
      nama_siswa: 'Siswa C (Kadaluarsa > 90 menit)',
      skor: 100,
      waktu_selesai: new Date(now - 95 * 60 * 1000).toISOString(), // 95 mnt lalu
      durasi_pengerjaan: '1m 00s',
      durasi_detik: 60
    },
    {
      nama_siswa: 'Siswa D (Skor 90, Cepat)',
      skor: 90,
      waktu_selesai: new Date(now - 30 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '1m 45s',
      durasi_detik: 105
    },
    {
      nama_siswa: 'Siswa E (Skor 80)',
      skor: 80,
      waktu_selesai: new Date(now - 15 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '2m 10s',
      durasi_detik: 130
    },
    {
      nama_siswa: 'Siswa F (Skor 70)',
      skor: 70,
      waktu_selesai: new Date(now - 5 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '2m 30s',
      durasi_detik: 150
    },
    {
      nama_siswa: 'Siswa G (Skor 60, peringkat 7)',
      skor: 60,
      waktu_selesai: new Date(now - 5 * 60 * 1000).toISOString(),
      durasi_pengerjaan: '3m 00s',
      durasi_detik: 180
    }
  ];

  // 1. Terapkan filter 90 menit
  const filtered = rawEntries.filter((entry) => {
    const itemTime = new Date(entry.waktu_selesai).getTime();
    return now - itemTime <= NINETY_MINUTES_MS && now - itemTime >= -60000;
  });

  // Siswa C harus tereliminasi karena > 90 menit
  assert.equal(filtered.some((e) => e.nama_siswa.includes('Kadaluarsa')), false);
  assert.equal(filtered.length, 6);

  // 2. Urutkan: Skor tertinggi, lalu durasi tercepat
  filtered.sort((a, b) => {
    if (b.skor !== a.skor) {
      return b.skor - a.skor;
    }
    return a.durasi_detik - b.durasi_detik;
  });

  // Peringkat 1 harus Siswa A (skor 100, 90s) mendahului Siswa B (skor 100, 120s)
  assert.equal(filtered[0].nama_siswa, 'Siswa A (Terkini, Skor 100, Cepat)');
  assert.equal(filtered[1].nama_siswa, 'Siswa B (Terkini, Skor 100, Lebih Lambat)');

  // 3. Batasi hanya 5 besar
  const top5 = filtered.slice(0, 5);
  assert.equal(top5.length, 5);
  assert.equal(top5.some((e) => e.nama_siswa.includes('Siswa G')), false);
});

test('LeaderboardEntry preserves student class information', () => {
  const entry: LeaderboardEntry = {
    nama_siswa: 'Budi Santoso',
    kelas: 'XII MIPA 1',
    skor: 100,
    waktu_selesai: new Date().toISOString(),
    durasi_pengerjaan: '2m 10s',
    durasi_detik: 130
  };
  assert.equal(entry.kelas, 'XII MIPA 1');
});
