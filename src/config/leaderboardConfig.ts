/**
 * KONFIGURASI WEBHOOK GOOGLE SHEETS / APPS SCRIPT
 * Papan Peringkat Live Kelas (Leaderboard Top 5)
 * 
 * Guru / Pengajar dapat memasukkan URL Web App Google Apps Script di variabel di bawah ini,
 * atau melalui tombol "Pengaturan Webhook" langsung di antarmuka aplikasi.
 */

// Ganti nilai string ini dengan URL Web App hasil deploy Apps Script Anda:
export const DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxZSiZybUQgJ-C27pTbmbw4Efj9OQypSdOSW4UpsbgtdiRdRsf31QOqFEQ1MdNI4UI/exec";

/**
 * Mengambil URL Webhook aktif (memprioritaskan yang disimpan di localStorage atau variabel default)
 */
export function getActiveWebhookUrl(): string {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('choicelab_sheets_webhook_url');
    if (customUrl && customUrl.trim()) {
      return customUrl.trim();
    }
  }
  return DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL.trim();
}

/**
 * Menyimpan URL Webhook khusus ke localStorage
 */
export function setActiveWebhookUrl(url: string): void {
  if (typeof window !== 'undefined') {
    if (url.trim()) {
      localStorage.setItem('choicelab_sheets_webhook_url', url.trim());
    } else {
      localStorage.removeItem('choicelab_sheets_webhook_url');
    }
  }
}

/**
 * Template Kode Google Apps Script (Code.gs) siap salin
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `/**
 * ==============================================================
 * KODE GOOGLE APPS SCRIPT - CHOICE LAB LIVE LEADERBOARD (TOP 5)
 * ==============================================================
 * Cara Pasang:
 * 1. Buka Google Sheets baru di https://sheets.new
 * 2. Klik menu 'Ekstensi' (Extensions) > 'Apps Script'
 * 3. Hapus kode default, lalu tempel (paste) seluruh kode di bawah ini
 * 4. Klik tombol 'Terapkan' (Deploy) > 'Penerapan baru' (New deployment)
 * 5. Pilih jenis: 'Aplikasi Web' (Web app)
 * 6. Setelan:
 *    - Eksekusi sebagai: 'Saya' (Me)
 *    - Yang memiliki akses: 'Siapa saja' (Anyone)  <-- PENTING!
 * 7. Klik 'Terapkan', izinkan akses akun Google, lalu salin 'URL Aplikasi Web'
 * 8. Tempelkan URL tersebut ke dalam Choice Lab!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Buat header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Nama Siswa", "Skor", "Waktu Selesai", "Durasi Pengerjaan", "Durasi Detik", "Timestamp"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#e0e7ff");
    }
    
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var nama = data.nama_siswa || "Siswa";
    var skor = Number(data.skor) || 0;
    var waktu = data.waktu_selesai || new Date().toISOString();
    var durasiStr = data.durasi_pengerjaan || "";
    var durasiDetik = Number(data.durasi_detik) || 0;
    var timestampMs = new Date(waktu).getTime();
    
    // Simpan baris baru ke Google Sheet
    sheet.appendRow([nama, skor, waktu, durasiStr, durasiDetik, timestampMs]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data kuis berhasil disimpan ke Google Sheets"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var list = [];
    
    if (rows.length > 1) {
      var now = new Date().getTime();
      var NINETY_MINUTES = 90 * 60 * 1000; // 90 menit dalam milidetik
      
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var waktu = row[2];
        var timestamp = new Date(waktu).getTime();
        
        // Filter 90 menit: Hanya data pengerjaan dalam 90 menit terakhir
        if ((now - timestamp) <= NINETY_MINUTES && (now - timestamp) >= -60000) {
          list.push({
            nama_siswa: String(row[0]),
            skor: Number(row[1]),
            waktu_selesai: String(row[2]),
            durasi_pengerjaan: String(row[3]),
            durasi_detik: Number(row[4]) || 0
          });
        }
      }
      
      // Urutkan: Skor tertinggi, lalu durasi tercepat jika skor sama
      list.sort(function(a, b) {
        if (b.skor !== a.skor) {
          return b.skor - a.skor;
        }
        return a.durasi_detik - b.durasi_detik;
      });
    }
    
    // Ambil hanya 5 besar (Top 5)
    var top5 = list.slice(0, 5);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      total_aktif: list.length,
      data: top5
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString(),
      data: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;
