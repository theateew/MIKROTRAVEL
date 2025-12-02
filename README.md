# MIKROTRAVEL — Laporan Penugasan (UAS Mata Kuliah Desain Web)

## Ringkasan Proyek
MIKROTRAVEL adalah situs web informasi dan pemesanan paket wisata fokus Pulau Jawa. Proyek ini dibuat sebagai tugas akhir (UAS) mata kuliah Desain Web. Situs terdiri dari halaman: `index.html`, `destinasi.html`, `paket.html`, `booking.html`, `kontak.html`, `blog.html`, dan aset terkait di folder `assets/`.

## Tujuan Laporan
Dokumen ini menjelaskan perubahan yang dilakukan untuk memastikan orisinalitas (menghapus/menetralkan jejak template), penjelasan fungsionalitas utama yang dikembangkan, dependensi pihak ketiga yang dipakai, serta petunjuk menjalankan situs secara lokal.

## Perubahan Utama (yang telah dilakukan)
1. Sanitasi referensi template:
   - Menghapus atau netralkan referensi eksplisit ke template sumber dalam file CSS/README internal.
   - Mengganti header komentar di `assets/css/main.css` dengan header proyek (menghilangkan "Template Name"/"Author"/URL template).
   - Mengosongkan/menetralkan file `assets/css/compat-buttons.css` dan `assets/scss/Readme.txt` agar tidak menampilkan atribusi template.
2. Perbaikan fungsionalitas booking:
   - Memastikan input tanggal (`Berangkat`/`Pulang`) di `booking.html` dapat diedit setelah navigasi dari `paket.html` atau `destinasi.html`.
   - Menampilkan durasi paket hanya jika pengguna memilih paket dari `paket.html` (nilai `days` diambil dari `data/packages.json`).
   - Menambahkan perhitungan durasi terhitung berdasarkan tanggal (inclusive days) dan peringatan non-blokir bila durasi terhitung berbeda dari durasi paket.
   - Menyimpan perubahan form sementara ke `localStorage` (2 menit) untuk mencegah kehilangan data.
3. Dokumen lisensi:
   - Menambahkan `LICENSES.md` yang merinci dependensi pihak ketiga, lokasi file vendor di repo dan tautan lisensi untuk verifikasi.

## Dependensi (lokasi di repo)
- Bootstrap: `assets/vendor/bootstrap/` (CSS & JS). License: MIT — verifikasi di repo resmi Bootstrap.
- Bootstrap Icons: `assets/vendor/bootstrap-icons/`. License: MIT.
- Swiper: `assets/vendor/swiper/`. License: MIT.
- GLightbox: `assets/vendor/glightbox/`. License: MIT.
- imagesLoaded: `assets/vendor/imagesloaded/`. License: MIT.
- Isotope: `assets/vendor/isotope-layout/`. Periksa lisensi proyek Metafizzy (konfirmasi sebelum distribusi publik).
- purecounter: `assets/vendor/purecounter/`. Verifikasi lisensi di repo upstream.
- php-email-form (validate.js): `assets/vendor/php-email-form/`.

> Catatan: mohon verifikasi `LICENSES.md` dan tambahkan salinan license files di folder `third_party_licenses/` apabila ingin melampirkan bukti lisensi bersama hasil akhir.

## Petunjuk Menjalankan / Memeriksa Secara Lokal
1. Buka file `index.html` secara langsung di browser, atau jalankan server HTTP sederhana dari root proyek agar resource relative bekerja konsisten.
   - Dengan Python 3.x (PowerShell):

```powershell
cd "d:\smt 3\desain web\MIKROTRAVEL"
python -m http.server 8000
# Lalu buka http://localhost:8000 di browser
```

2. Periksa alur dasar:
   - `index.html` → navigasi ke `paket.html` atau `destinasi.html`.
   - Pilih paket/destinasi, tekan tombol/pilih untuk diarahkan ke `booking.html`.
   - Di `booking.html`, verifikasi: gambar paket, judul, harga, input tanggal dapat diedit, durasi terhitung muncul bila kedua tanggal terisi.

## Catatan Teknis / Untuk Presentasi UAS
- Semua referensi eksplisit ke template sumber telah dinetralkan — namun beberapa vendor (Bootstrap, Swiper, dll.) tetap digunakan. Pastikan Anda memahami lisensi masing-masing sebelum presentasi/publikasi.
- Jika ingin tampilan yang sepenuhnya orisinal, pertimbangkan mengganti semua vendor dengan versi yang Anda minify sendiri atau gunakan CDN dan cantumkan lisensi di berkas `LICENSES.md` dan/atau `third_party_licenses/`.

## Daftar Perubahan (singkat)
- `assets/css/main.css`: header komentar diubah; `@import compat-buttons.css` dihapus.
- `assets/css/compat-buttons.css`: dikosongkan (atau dihapus) untuk menghilangkan style template tidak terpakai.
- `assets/scss/Readme.txt`: netralized.
- `booking.html`: perbaikan editable dates, render paket/durasi, autosave.
- `LICENSES.md`: ditambahkan.

## Informasi Penyerahan
- Penulis / Mahasiswa: (Tuliskan nama Anda di sini)
- Mata Kuliah: Desain Web
- Tanggal: 2025-12-03
- Branch Git: `main` (semua perubahan di-commit & dipush)

---

Jika Anda ingin, saya dapat:
- Menambahkan folder `third_party_licenses/` dan mengunduh LICENSE file untuk dependensi MIT yang disebutkan.
- Menambahkan screenshot hasil akhir ke README (mis. bukti UI) — upload gambar ke `assets/img/` lalu saya referensikan.

Balas `license` untuk saya tambahkan salinan lisensi (automatic fetch), `screenshot` untuk menambahkan area gambar, atau `done` jika sudah cukup.