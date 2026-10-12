// ===============================
// 1. DATA AWAL
// ===============================
const daftarMataKuliah = [
  { no: 1,  kode: "14823393", nama: "Interaksi Manusia Komputer", semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 2,  kode: "14823153", nama: "Teknologi Informasi dan Aplikasi Bisnis Berkembang", semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 3,  kode: "14823192", nama: "Arsitektur dan Organisasi Komputer", semester: 2, sks: 2, nilai: "AB", bobot: 3.5 },
  { no: 4,  kode: "14823333", nama: "Algoritma dan Struktur Data", semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 5,  kode: "14823313", nama: "Sistem Basis Data", semester: 2, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 6,  kode: "14823372", nama: "Statistika dan Probabilitas", semester: 2, sks: 2, nilai: "B", bobot: 3.0 },
  { no: 7,  kode: "14823274", nama: "Pemrograman Berorientasi Objek", semester: 2, sks: 4, nilai: "A", bobot: 4.0 },
  { no: 8,  kode: "14823532", nama: "Bahasa Inggris", semester: 1, sks: 2, nilai: "A", bobot: 4.0 },
  { no: 9,  kode: "14823012", nama: "Etika Pengembangan Teknologi Siber", semester: 1, sks: 2, nilai: "A", bobot: 4.0 },
  { no: 10, kode: "14823323", nama: "Dasar Pemrograman", semester: 1, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 11, kode: "14823202", nama: "Sistem Operasi", semester: 1, sks: 2, nilai: "AB", bobot: 3.5 },
  { no: 12, kode: "14823352", nama: "Matematika Diskrit", semester: 1, sks: 2, nilai: "AB", bobot: 3.5 },
  { no: 13, kode: "14823342", nama: "Aljabar Linier", semester: 1, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 14, kode: "14823103", nama: "Konsep dan Fondasi Sistem Informasi", semester: 1, sks: 3, nilai: "AB", bobot: 3.5 },
  { no: 15, kode: "14823362", nama: "Kalkulus", semester: 1, sks: 2, nilai: "B", bobot: 3.0 },
];

// ===============================
// 2. FUNGSI PERHITUNGAN
// ===============================
function hitungTotalSKS(data) {
  let totalSKS = 0;

  for (const mk of data) {
    totalSKS += mk.sks;
  }

  return totalSKS;
}

function hitungTotalNilaiMutu(data) {
  let totalNilaiMutu = 0;

  for (const mk of data) {
    totalNilaiMutu += mk.sks * mk.bobot;
  }

  return totalNilaiMutu;
}

function hitungIPK(data) {
  const totalSKS = hitungTotalSKS(data);
  const totalNilaiMutu = hitungTotalNilaiMutu(data);

  if (totalSKS === 0) {
    return "0.00";
  }

  return (totalNilaiMutu / totalSKS).toFixed(2);
}

function cariMataKuliahUnggulan(data, semesterDicari) {
  return data.filter((mk) => {
    return mk.semester === semesterDicari &&
           (mk.nilai === "A" || mk.nilai === "AB");
  });
}

function cekMataKuliahPerluDitingkatkan(data) {
  return data.filter((mk) => mk.nilai === "B" && mk.sks >= 2);
}

function getBobot(nilai) {
  const bobot = {
    A: 4.0,
    AB: 3.5,
    B: 3.0,
  };

  return bobot[nilai];
}

// ===============================
// 3. DOM ELEMENT
// ===============================
const tabelMataKuliah = document.querySelector("#tabelMataKuliah");
const inputPencarian = document.querySelector("#inputPencarian");
const filterSemester = document.querySelector("#filterSemester");
const tombolTabel = document.querySelector("#tombolTabel");
const wadahTabel = document.querySelector("#wadahTabel");

const tombolForm = document.querySelector("#tombolForm");
const wadahForm = document.querySelector("#wadahForm");
const formMataKuliah = document.querySelector("#formMataKuliah");
const pesanForm = document.querySelector("#pesanForm");

// ===============================
// 4. MENAMPILKAN DATA KE HALAMAN
// ===============================
function tampilkanData(data) {
  tabelMataKuliah.innerHTML = "";

  if (data.length === 0) {
    const barisKosong = document.createElement("tr");
    barisKosong.innerHTML = `
      <td colspan="7" class="status-kosong">
        Data mata kuliah tidak ditemukan.
      </td>
    `;
    tabelMataKuliah.appendChild(barisKosong);
    return;
  }

  data.forEach((mk, index) => {
    const baris = document.createElement("tr");
    baris.classList.add("baris-hasil");

    let kelasBadge = "badge-b";

    if (mk.nilai === "A") {
      kelasBadge = "badge-a";
    } else if (mk.nilai === "AB") {
      kelasBadge = "badge-ab";
    }

    baris.innerHTML = `
      <td>${index + 1}</td>
      <td>${mk.kode}</td>
      <td>${mk.nama}</td>
      <td>${mk.semester}</td>
      <td>${mk.sks}</td>
      <td><span class="badge ${kelasBadge}">${mk.nilai}</span></td>
      <td>${(mk.sks * mk.bobot).toFixed(2)}</td>
    `;

    tabelMataKuliah.appendChild(baris);
  });
}

// ===============================
// 5. MEMPERBARUI RINGKASAN
// ===============================
function perbaruiRingkasan() {
  const totalSKS = hitungTotalSKS(daftarMataKuliah);
  const totalNilaiMutu = hitungTotalNilaiMutu(daftarMataKuliah);
  const ipk = hitungIPK(daftarMataKuliah);

  document.querySelector("#totalMataKuliah").textContent = daftarMataKuliah.length;
  document.querySelector("#totalSKS").textContent = totalSKS;
  document.querySelector("#nilaiIPK").textContent = ipk;

  document.querySelector("#jumlahSKSTabel").textContent = totalSKS;
  document.querySelector("#rekapMataKuliah").textContent =
    `${daftarMataKuliah.length} Mata Kuliah`;
  document.querySelector("#rekapSKS").textContent = `${totalSKS} SKS`;
  document.querySelector("#rekapNilaiMutu").textContent = totalNilaiMutu.toFixed(2);
  document.querySelector("#rekapIPK").textContent = ipk;

  document.querySelector("#ipkBesar").textContent = ipk;
  document.querySelector("#deskripsiIPK").textContent =
    `Berdasarkan total ${totalSKS} SKS dan total nilai mutu ${totalNilaiMutu.toFixed(2)}.`;
}

// ===============================
// 6. FITUR PENCARIAN + FILTER
// ===============================
function filterData() {
  const kataKunci = inputPencarian.value.toLowerCase().trim();
  const semesterDipilih = filterSemester.value;

  const hasilFilter = daftarMataKuliah.filter((mk) => {
    const cocokNama =
      mk.nama.toLowerCase().includes(kataKunci) ||
      mk.kode.toLowerCase().includes(kataKunci);

    const cocokSemester =
      semesterDipilih === "semua" ||
      mk.semester === Number(semesterDipilih);

    return cocokNama && cocokSemester;
  });

  tampilkanData(hasilFilter);
}

// EventListener #1: pencarian
inputPencarian.addEventListener("input", filterData);

// EventListener #2: filter semester
filterSemester.addEventListener("change", filterData);

// ===============================
// 7. ANIMASI TABEL MENGGUNAKAN jQuery
// ===============================
// slideToggle membuka atau menutup tabel dengan animasi 400 ms.
$("#tombolTabel").on("click", function () {
  const sedangTerlihat = $("#wadahTabel").is(":visible");
  $("#wadahTabel").stop(true, true).slideToggle(400);
  $(this)
    .text(sedangTerlihat ? "Tampilkan Tabel" : "Sembunyikan Tabel")
    .toggleClass("btn-primary", sedangTerlihat)
    .toggleClass("btn-danger", !sedangTerlihat);
});

// ===============================
// 8. ANIMASI FORM MENGGUNAKAN jQuery
// ===============================
$("#tombolForm").on("click", function () {
  const sedangTerlihat = $("#wadahForm").is(":visible");
  $("#wadahForm").stop(true, true).slideToggle(400);
  $(this).text(sedangTerlihat ? "+ Tambah Mata Kuliah" : "− Tutup Form");
});

// Pesan validasi dan keberhasilan tampil menggunakan efek fade.
function tampilkanPesanForm(teks, berhasil) {
  $("#pesanForm")
    .stop(true, true)
    .hide()
    .text(teks)
    .toggleClass("text-success", berhasil)
    .toggleClass("text-danger", !berhasil)
    .fadeIn(300);
}

// ===============================
// 9. FORM + VALIDASI + preventDefault()
// ===============================
formMataKuliah.addEventListener("submit", (event) => {
  event.preventDefault();

  const kode = document.querySelector("#kode");
  const nama = document.querySelector("#nama");
  const semester = document.querySelector("#semester");
  const sks = document.querySelector("#sks");
  const nilai = document.querySelector("#nilai");

  // Reset tampilan validasi
  [kode, nama, semester, sks, nilai].forEach((input) => {
    input.classList.remove("is-invalid");
  });

  const sksNumber = Number(sks.value);
  let valid = true;

  if (kode.value.trim() === "") {
    kode.classList.add("is-invalid");
    valid = false;
  }

  if (nama.value.trim() === "") {
    nama.classList.add("is-invalid");
    valid = false;
  }

  if (semester.value === "") {
    semester.classList.add("is-invalid");
    valid = false;
  }

  if (sksNumber < 1 || sksNumber > 6 || sks.value === "") {
    sks.classList.add("is-invalid");
    valid = false;
  }

  if (nilai.value === "") {
    nilai.classList.add("is-invalid");
    valid = false;
  }

  if (!valid) {
    tampilkanPesanForm("Mohon lengkapi data dengan benar.", false);
    return;
  }

  const dataBaru = {
    no: daftarMataKuliah.length + 1,
    kode: kode.value.trim(),
    nama: nama.value.trim(),
    semester: Number(semester.value),
    sks: sksNumber,
    nilai: nilai.value,
    bobot: getBobot(nilai.value),
  };

  daftarMataKuliah.push(dataBaru);

  // Tampilkan semua data setelah data baru ditambahkan
  inputPencarian.value = "";
  filterSemester.value = "semua";

  tampilkanData(daftarMataKuliah);
  perbaruiRingkasan();

  tampilkanPesanForm("Data mata kuliah berhasil ditambahkan!", true);

  formMataKuliah.reset();
});

// ===============================
// 10. TAMPILAN AWAL
// ===============================
tampilkanData(daftarMataKuliah);
perbaruiRingkasan();

// Tetap menampilkan hasil analisis di Console
console.log("======================================");
console.log(" REKAP DATA AKADEMIK - ZAKY AKSA KAFA BILLAH");
console.log("======================================");
console.log("Total Mata Kuliah :", daftarMataKuliah.length);
console.log("Total SKS         :", hitungTotalSKS(daftarMataKuliah));
console.log("IPK               :", hitungIPK(daftarMataKuliah));

console.log("\n--- Mata Kuliah Unggulan Semester 1 ---");
cariMataKuliahUnggulan(daftarMataKuliah, 1).forEach((mk) => {
  console.log(`- ${mk.nama} (${mk.nilai})`);
});

console.log("\n--- Mata Kuliah Unggulan Semester 2 ---");
cariMataKuliahUnggulan(daftarMataKuliah, 2).forEach((mk) => {
  console.log(`- ${mk.nama} (${mk.nilai})`);
});

console.log("\n--- Mata Kuliah Perlu Ditingkatkan ---");
cekMataKuliahPerluDitingkatkan(daftarMataKuliah).forEach((mk) => {
  console.log(`- ${mk.nama} (${mk.sks} SKS)`);
});
