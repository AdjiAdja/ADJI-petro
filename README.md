# ADJI project — portfolio

Situs statis tanpa build step.

## Struktur
- `index.html` – markup
- `style.css` – gaya
- `app.js` – hero panah piksel, marquee, manifesto (halftone + voxel 3D), PCB 3D, arcade, lab, filter dan halaman detail proyek
- `assets/` – logo, header, og.png

## Pasang di GitHub Pages
1. Buat repo, unggah semua isi folder ini.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Ganti `assets/og.png` pada tag `og:image` di `index.html` dengan URL penuh, misalnya `https://domain-anda.com/assets/og.png`.

## Mengisi proyek
Edit array `P` di `app.js`. Tiap proyek punya `k` (kategori filter: IoT, Embedded, atau Web). Tiap proyek mendukung `r` (teks hasil) dan `im` (path foto, mis. `assets/rack.jpg`). Keduanya tampil otomatis di halaman detail bila diisi.
