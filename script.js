const daftarMataKuliah = [
  { no: 1,  kode: "14823393", nama: "Interaksi Manusia Komputer",                     semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 2,  kode: "14823153", nama: "Teknologi Informasi dan Aplikasi Bisnis Berkembang", semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 3,  kode: "14823192", nama: "Arsitektur dan Organisasi Komputer",              semester: 2, sks: 2, nilai: "AB", bobot: 3.5 },
  { no: 4,  kode: "14823333", nama: "Algoritma dan Struktur Data",                     semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 5,  kode: "14823313", nama: "Sistem Basis Data",                              semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 6,  kode: "14823372", nama: "Statistika dan Probabilitas",                    semester: 2, sks: 2, nilai: "B",  bobot: 3.0 },
  { no: 7,  kode: "14823274", nama: "Pemrograman Berorientasi Objek",                 semester: 2, sks: 4, nilai: "A",  bobot: 4.0 },
  { no: 8,  kode: "14823532", nama: "Bahasa Inggris",                                 semester: 1, sks: 2, nilai: "A",  bobot: 4.0 },
  { no: 9,  kode: "14823012", nama: "Etika Pengembangan Teknologi Siber",             semester: 1, sks: 2, nilai: "A",  bobot: 4.0 },
  { no: 10, kode: "14823323", nama: "Dasar Pemrograman",                              semester: 1, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 11, kode: "14823202", nama: "Sistem Operasi",                                 semester: 1, sks: 2, nilai: "AB", bobot: 3.5 },
  { no: 12, kode: "14823352", nama: "Matematika Diskrit",                             semester: 1, sks: 2, nilai: "AB", bobot: 3.5 },
  { no: 13, kode: "14823342", nama: "Aljabar Linier",                                 semester: 1, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 14, kode: "14823103", nama: "Konsep dan Fondasi Sistem Informasi",            semester: 1, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 15, kode: "14823362", nama: "Kalkulus",                                       semester: 1, sks: 2, nilai: "B",  bobot: 3.0 },
];

function hitungTotalSKS(data) {
  let totalSKS = 0;
  for (const mk of data) {
    totalSKS += mk.sks;
  }
  return totalSKS;
}

function hitungIPK(data) {
  let totalNilaiMutu = 0;
  let totalSKS = 0;

  for (const mk of data) {
    totalNilaiMutu += mk.sks * mk.bobot;
    totalSKS += mk.sks;
  }

  const ipk = totalNilaiMutu / totalSKS;
  return ipk.toFixed(2);
}

function cariMataKuliahUnggulan(data, semesterDicari) {
  const hasil = [];

  for (const mk of data) {
    if (mk.semester === semesterDicari && (mk.nilai === "A" || mk.nilai === "AB")) {
      hasil.push(mk);
    }
  }

  return hasil;
}

function cekMataKuliahPerluDitingkatkan(data) {
  return data.filter(mk => mk.nilai === "B" && mk.sks >= 2);
}

console.log("======================================");
console.log(" REKAP DATA AKADEMIK - ZAKY ASKA KAFA BILLAH");
console.log("======================================");
console.log("Total Mata Kuliah :", daftarMataKuliah.length);
console.log("Total SKS         :", hitungTotalSKS(daftarMataKuliah));
console.log("IPK               :", hitungIPK(daftarMataKuliah));

console.log("\n--- Daftar Seluruh Mata Kuliah (forEach) ---");
daftarMataKuliah.forEach((mk) => {
  console.log(`${mk.no}. ${mk.nama} | Semester ${mk.semester} | ${mk.sks} SKS | Nilai: ${mk.nilai}`);
});

console.log("\n--- Mata Kuliah Unggulan Semester 1 (Nilai A/AB) ---");
const unggulanSemester1 = cariMataKuliahUnggulan(daftarMataKuliah, 1);
unggulanSemester1.forEach((mk) => {
  console.log(`- ${mk.nama} (${mk.nilai})`);
});

console.log("\n--- Mata Kuliah Unggulan Semester 2 (Nilai A/AB) ---");
const unggulanSemester2 = cariMataKuliahUnggulan(daftarMataKuliah, 2);
unggulanSemester2.forEach((mk) => {
  console.log(`- ${mk.nama} (${mk.nilai})`);
});

console.log("\n--- Mata Kuliah Perlu Ditingkatkan (Nilai B) ---");
const perluDitingkatkan = cekMataKuliahPerluDitingkatkan(daftarMataKuliah);
perluDitingkatkan.forEach((mk) => {
  console.log(`- ${mk.nama} (${mk.sks} SKS)`);
});
