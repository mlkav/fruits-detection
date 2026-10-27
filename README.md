# Fruit Detection

Aplikasi web statis untuk mengklasifikasikan gambar buah-buahan menggunakan model TensorFlow.js yang dijalankan langsung di browser.

## Deskripsi Proyek

Proyek ini menyediakan antarmuka untuk mengunggah atau menarik gambar buah, lalu menampilkan kelas prediksi dan nilai confidence. Tujuannya adalah membantu mengenali jenis buah dari gambar tanpa layanan backend: model dan seluruh inferensi dijalankan di browser pengguna.

Aplikasi memetakan prediksi ke empat label yang didefinisikan: Fresh Apples, Fresh Banana, Rotten Apples, dan Rotten Banana.

## Fitur Utama

- Memilih gambar melalui dialog unggah atau menarik dan melepaskannya ke area input.
- Menampilkan pratinjau gambar sebelum prediksi.
- Menyediakan gambar contoh yang dapat ditarik ke area input.
- Memuat model GraphModel TensorFlow.js lokal dan melakukan inferensi di browser.
- Menampilkan label kelas dan confidence prediksi.

## Teknologi

- **HTML, CSS, dan JavaScript** untuk antarmuka dan logika aplikasi.
- **TensorFlow.js** untuk memuat model dan menjalankan inferensi di browser, melalui jsDelivr CDN.
- **Bootstrap 5.3.0** untuk sebagian antarmuka, juga melalui jsDelivr CDN.
- **Google Fonts (Rubik)** untuk tipografi.

## Struktur Direktori

```text
.
├── index.html              # Halaman aplikasi dan pemuatan library eksternal
├── script.js               # Pemuatan model, input gambar, dan prediksi
├── style.css               # Gaya dan animasi antarmuka
├── model_tfjs/
│   ├── model.json          # Arsitektur, metadata, dan referensi bobot model
│   └── group1-shard*.bin   # Berkas bobot model
├── samples/                # Gambar contoh untuk antarmuka
├── requirements.txt        # Dependensi Python yang tercatat di proyek
└── .gitignore              # Aturan berkas yang diabaikan Git
```

## Prasyarat dan Instalasi

Untuk menggunakan aplikasi, siapkan:

- Browser modern yang mendukung JavaScript.
- Server web statis. Python 3 diperlukan jika menggunakan perintah server di bawah; jika tidak, gunakan server statis lain, misalnya ekstensi Live Preview di VS Code.
- Koneksi internet agar browser dapat memuat TensorFlow.js, Bootstrap, dan font Rubik dari CDN.

Dependensi di `requirements.txt` tidak perlu dipasang untuk menjalankan aplikasi web.

## Cara Menjalankan

Dari direktori utama proyek, jika [Python 3](https://www.python.org/downloads/) jalankan server berkas statis:

```bash
python -m http.server 8000
```

Alternatifnya, gunakan ekstensi **Live Preview** di VS Code, lalu klik kanan `index.html` dan pilih **Show Preview**.

Buka <http://localhost:8000> di browser. Jalankan aplikasi melalui HTTP, bukan dengan membuka `index.html` langsung, agar browser dapat memuat berkas model dan shard bobot dengan benar.

## Penggunaan

1. Buka aplikasi melalui alamat server lokal.
2. Tunggu model selesai dimuat di browser.
3. Klik area unggah untuk memilih gambar, atau tarik gambar dari komputer maupun galeri contoh ke area tersebut.
4. Pastikan pratinjau gambar muncul, lalu klik **Prediksi**.
5. Baca label prediksi dan confidence yang ditampilkan.

Aplikasi mengubah gambar menjadi tensor RGBA berukuran 100 × 100 piksel, lalu menormalisasi nilai piksel ke rentang 0–1 sebelum menjalankan prediksi. Aplikasi ini hanya memiliki antarmuka browser; tidak ada endpoint API yang dapat dipanggil.

## Informasi Tambahan

### Troubleshooting

- **Model belum siap:** tunggu pemuatan model selesai, lalu coba kembali. Pastikan server menyajikan direktori `model_tfjs/` beserta berkas model dan seluruh shard-nya.
- **Halaman atau dependensi eksternal tidak termuat:** pastikan server lokal berjalan dan browser memiliki akses internet untuk mengambil library dari CDN.
- **Prediksi tidak menampilkan jenis buah yang diharapkan:** hasil bergantung pada gambar masukan dan keluaran model.
