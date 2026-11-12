import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Link2, Sparkles, AlertCircle, Database } from 'lucide-react';
import { getActiveWebhookUrl, setActiveWebhookUrl, GOOGLE_APPS_SCRIPT_TEMPLATE } from '../config/leaderboardConfig.ts';
import { playSound } from '../utils/audio.ts';

interface GoogleSheetsConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const GoogleSheetsConfigModal: React.FC<GoogleSheetsConfigModalProps> = ({
  isOpen,
  onClose,
  onSaved
}) => {
  const [webhookUrl, setWebhookUrl] = useState<string>(() => getActiveWebhookUrl());
  const [copied, setCopied] = useState<boolean>(false);
  const [testing, setTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
      setCopied(true);
      playSound('click');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSave = () => {
    setActiveWebhookUrl(webhookUrl);
    playSound('unlock');
    onSaved();
    onClose();
  };

  const handleTestConnection = async () => {
    if (!webhookUrl.trim()) {
      setTestResult({ success: false, message: 'Masukkan URL Web App terlebih dahulu.' });
      playSound('wrong');
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(webhookUrl.trim(), {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setTestResult({
          success: true,
          message: 'Berhasil terhubung ke Google Apps Script Web App! Data siap disinkronkan.'
        });
        playSound('unlock');
      } else {
        setTestResult({
          success: false,
          message: `Server merespons dengan status ${res.status}. Pastikan URL Web App benar dan di-deploy dengan akses 'Anyone'.`
        });
        playSound('wrong');
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Tidak dapat menjangkau Webhook. Pastikan URL benar, koneksi internet aktif, dan hak akses di Google Apps Script telah disetel ke "Anyone".'
      });
      playSound('wrong');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Integrasi Database Google Sheets Kelas
              </h3>
              <p className="text-xs text-slate-500">
                Sinkronkan nilai kuis dan papan peringkat live antar HP & Laptop siswa
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Step 1: Input Webhook URL */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              URL Web App Google Apps Script (Webhook):
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => {
                    setWebhookUrl(e.target.value);
                    if (testResult) setTestResult(null);
                  }}
                  placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                  className="w-full pl-3 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>
              <button
                type="button"
                disabled={testing}
                onClick={handleTestConnection}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl border border-slate-300 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {testing ? 'Menguji...' : 'Uji Koneksi'}
              </button>
            </div>
            {testResult && (
              <p
                className={`text-[11px] font-medium p-2.5 rounded-xl border animate-fadeIn ${
                  testResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {testResult.success ? '✅' : '⚠️'} {testResult.message}
              </p>
            )}
            <p className="text-[11px] text-slate-500">
              Biarkan kosong jika ingin menggunakan mode penyimpanan lokal sementara di peramban ini.
            </p>
          </div>

          {/* Step-by-Step Tutorial */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <h4 className="font-bold font-display text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <span>📋</span>
              <span>Panduan 4 Langkah Pasang Google Sheets Kelas (Gratis):</span>
            </h4>
            <ol className="space-y-2 text-[11px] text-slate-600 pl-4 list-decimal leading-relaxed">
              <li>
                Buka Google Sheets baru di{' '}
                <a
                  href="https://sheets.new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-0.5"
                >
                  sheets.new <ExternalLink className="w-3 h-3" />
                </a>
                .
              </li>
              <li>
                Di menu atas Google Sheets, klik <strong>Ekstensi (Extensions)</strong> &gt;{' '}
                <strong>Apps Script</strong>.
              </li>
              <li>
                Hapus teks di editor, lalu salin dan tempel kode skrip di bawah ini:
                <div className="mt-1.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Kode Google Apps Script'}</span>
                  </button>
                </div>
              </li>
              <li>
                Klik tombol biru <strong>Terapkan (Deploy)</strong> &gt; <strong>Penerapan baru (New deployment)</strong>:
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  <li>Pilih jenis: <strong>Aplikasi Web (Web App)</strong></li>
                  <li>Eksekusi sebagai: <strong>Saya (Me)</strong></li>
                  <li>Yang memiliki akses: <strong>Siapa saja (Anyone)</strong> <em>(Wajib agar HP/Laptop siswa bisa kirim nilai)</em></li>
                </ul>
              </li>
              <li>Salin URL Web App yang dihasilkan, lalu tempelkan ke kolom URL di atas dan klik <strong>Simpan</strong>.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Simpan Konfigurasi
          </button>
        </div>
      </div>
    </div>
  );
};
