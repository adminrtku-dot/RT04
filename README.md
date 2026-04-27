Panduan Pemasangan Sistem Tata Kelola RT
​Berikut adalah langkah-langkah mudah untuk menghubungkan User Interface (Frontend) dan Code Backend ke Google Spreadsheet Anda:
​Langkah 1: Siapkan Google Spreadsheet
​Buka Google Sheets dan buat dokumen kosong baru.
​Beri nama file tersebut, misalnya: Database Sistem RT.
​Buatlah 4 Sheet (Tab di bagian bawah) dengan nama tepat seperti berikut:
​Users
​Warga
​Kas
​Pengumuman
​Isi Header (Baris Pertama) untuk masing-masing Sheet:
​Sheet Users: Kolom A (Username), Kolom B (Password), Kolom C (Role), Kolom D (Nama Lengkap).
(Contoh baris 2: admin | admin123 | Admin | Bapak Budi Ketua RT)
​Sheet Warga: Kolom A (NIK), Kolom B (Nama), Kolom C (Alamat), Kolom D (Status).
​Sheet Kas: Kolom A (Tanggal), Kolom B (Keterangan), Kolom C (Pemasukan), Kolom D (Pengeluaran).
​Sheet Pengumuman: Kolom A (Tanggal), Kolom B (Isi Pengumuman).
​Langkah 2: Masukkan Kode Apps Script (Backend)
​Pada menu Spreadsheet Anda di atas, klik Extensions (Ekstensi) > Apps Script.
​Akan terbuka tab baru. Di sebelah kiri, Anda akan melihat file bernama Code.gs.
​Hapus semua kode bawaan di Code.gs, lalu copy & paste seluruh kode dari file Code.gs yang telah saya berikan di atas.
​Langkah 3: Masukkan Kode HTML (Frontend)
​Di jendela Apps Script yang sama, klik icon Tambah (+) atau menu File > New > HTML file.
​Beri nama file tepatnya: Index (huruf I besar, tanpa .html).
​Hapus kode bawaannya, lalu copy & paste seluruh kode dari file Index.html yang telah saya berikan di atas.
​Klik tombol Save (Icon disket) untuk menyimpan proyek.
​Langkah 4: Publikasikan (Deploy) Menjadi Web App
​Di pojok kanan atas layar Apps Script, klik tombol biru bertuliskan Deploy > New deployment.
​Pada bagian Select type (ikon roda gigi), pilih Web app.
​Isi deskripsi (misal: "Versi 1.0").
​Pada opsi Execute as, pilih Me (Email Anda).
​Pada opsi Who has access, pilih Anyone (Siapa saja).
​Klik Deploy.
(Jika muncul peringatan otorisasi/Akses, klik "Review Permissions", pilih akun Google Anda, klik "Advanced", dan pilih "Go to Untitled project (unsafe)" lalu Allow).
​Anda akan mendapatkan Web App URL. Salin link tersebut dan buka di browser baru. Selamat! Sistem Tata Kelola RT Anda sudah siap digunakan.
