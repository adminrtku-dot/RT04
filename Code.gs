/**
 * BACKEND - SISTEM TATA KELOLA RT
 * Copy paste kode ini ke Google Apps Script Editor (Code.gs)
 */

// Fungsi untuk menyajikan file HTML sebagai Web App
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Sistem Tata Kelola RT')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Fungsi untuk mengecek kredensial login
function checkLogin(username, password) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetUsers = ss.getSheetByName("Users");
    
    if(!sheetUsers) {
      return {success: false, message: "Sheet 'Users' tidak ditemukan. Cek pengaturan Spreadsheet Anda."};
    }

    const data = sheetUsers.getDataRange().getValues();
    
    // Mulai dari i=1 untuk melewati header
    for(let i = 1; i < data.length; i++) {
      let dbUser = data[i][0]; // Kolom A: Username
      let dbPass = data[i][1]; // Kolom B: Password
      let dbRole = data[i][2]; // Kolom C: Role
      let dbNama = data[i][3]; // Kolom D: Nama Lengkap
      
      if(dbUser == username && dbPass == password) {
        return {
          success: true,
          role: dbRole,
          nama: dbNama
        };
      }
    }
    
    return {success: false, message: "Username atau password salah!"};
  } catch (error) {
    return {success: false, message: "Terjadi kesalahan server: " + error.toString()};
  }
}

// Fungsi untuk mengambil data statistik di Dashboard
function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Ambil Total Warga
  let totalWarga = 0;
  const sheetWarga = ss.getSheetByName("Warga");
  if(sheetWarga) {
    let lastRow = sheetWarga.getLastRow();
    totalWarga = lastRow > 1 ? lastRow - 1 : 0; // Kurangi 1 untuk header
  }
  
  // 2. Ambil Data Kas & Hitung Saldo
  let saldo = 0;
  let mutasi = [];
  const sheetKas = ss.getSheetByName("Kas");
  
  if(sheetKas) {
    const dataKas = sheetKas.getDataRange().getValues();
    
    // Hitung Saldo dari semua baris (kecuali header)
    for(let i = 1; i < dataKas.length; i++) {
      let masuk = Number(dataKas[i][2]) || 0;  // Kolom C: Pemasukan
      let keluar = Number(dataKas[i][3]) || 0; // Kolom D: Pengeluaran
      saldo += (masuk - keluar);
    }
    
    // Ambil 4 mutasi terakhir untuk tabel (Asumsi data urut dari atas ke bawah)
    let startIndex = dataKas.length - 1;
    let limit = 4;
    
    while(startIndex > 0 && limit > 0) {
      let row = dataKas[startIndex];
      
      // Format Tanggal
      let tgl = row[0];
      if(tgl instanceof Date) {
        tgl = Utilities.formatDate(tgl, Session.getScriptTimeZone(), "dd MMM yyyy");
      }
      
      let keterangan = row[1];
      let masuk = Number(row[2]) || 0;
      let keluar = Number(row[3]) || 0;
      
      if(masuk > 0 || keluar > 0) {
        mutasi.push({
          tgl: tgl,
          ket: keterangan,
          jenis: masuk > 0 ? "Masuk" : "Keluar",
          nom: masuk > 0 ? masuk : keluar
        });
        limit--;
      }
      startIndex--;
    }
  }
  
  // 3. Ambil Pengumuman
  let pengumumanText = "Belum ada pengumuman terbaru.";
  const sheetPengumuman = ss.getSheetByName("Pengumuman");
  if(sheetPengumuman && sheetPengumuman.getLastRow() > 1) {
    // Ambil baris terakhir di kolom B (Asumsi Kolom A Tanggal, Kolom B Isi Pengumuman)
    pengumumanText = sheetPengumuman.getRange(sheetPengumuman.getLastRow(), 2).getValue();
  }

  return {
    totalWarga: totalWarga,
    saldoKas: saldo,
    pengumuman: pengumumanText,
    mutasi: mutasi
  };
}
