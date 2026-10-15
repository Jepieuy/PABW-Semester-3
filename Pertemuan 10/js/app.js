// js/app.js: perakit. Mengambil data lewat api.js, menggambar lewat dom.js.
// (Isi Pertemuan 8 tetap di sini; data bacaan kini datang dari data/proyek.json.)
import { ambilProyek } from "./api.js";
import { render, tampilkanGalat, aturMemuat, aturSumber, saring } from "./dom.js";

// ---------- Pertemuan 8: data profil dan fungsi ----------
const profil = {
  nama: "Javier Khiar Athallah Dirgantara Putra",
  nim: "25523248",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

// ?. mencegah TypeError bila alamat belum ada, ?? memberi nilai bawaan
const kota = profil.alamat?.kota ?? "belum diisi";

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

// nilai dari kolom isian selalu teks, ubah dulu menjadi angka
const ubahKeAngka = (teks) => {
  if (teks.trim() === "") return null;
  const angka = Number(teks);
  return Number.isNaN(angka) ? null : angka;
};

// querySelector bisa mengembalikan null bila elemen tidak ditemukan
const kolomJudul = document.querySelector("#judul");
if (kolomJudul === null) {
  console.error("Elemen #judul tidak ditemukan, periksa id di HTML");
}

// ---------- Pertemuan 8: array methods, dijalankan setelah data tiba ----------
function ringkasDiConsole(daftarBacaan) {
  const jumlahBacaan = daftarBacaan.length;
  const daftarJudul = daftarBacaan.map((bacaan) => bacaan.judul);
  const bacaanSelesai = daftarBacaan.filter((bacaan) => bacaan.selesai);
  const sedangDibaca = daftarBacaan.filter((bacaan) => bacaan.status === "sedang-dibaca");
  const soloLeveling = daftarBacaan.find((bacaan) => bacaan.judul === "Solo Leveling");
  // sort mengubah array aslinya, jadi urutkan salinannya
  const urutJudul = [...daftarBacaan].sort((a, b) => a.judul.localeCompare(b.judul));

  let statusAktif = "semua"; // let dipakai karena nilainya memang berubah
  const semuaBacaan = saring(daftarBacaan, statusAktif);
  statusAktif = "selesai";
  const hanyaSelesai = saring(daftarBacaan, statusAktif);

  console.log(`Nama saya ${profil.nama}, dan saya membaca ${jumlahBacaan} judul.`);
  console.log(buatPerkenalan(profil));
  console.log(formatKeahlian(profil.keahlian));
  console.log("kota:", kota);
  console.table(profil.keahlian);
  console.table(daftarBacaan);
  console.table(bacaanSelesai);
  console.table(sedangDibaca);
  console.log("find:", soloLeveling);
  console.log("map:", daftarJudul);
  console.log("sort (salinan):", urutJudul.map((b) => b.judul));
  console.log("saring semua / selesai:", semuaBacaan.length, hanyaSelesai.length);
  console.log("ubahKeAngka('10') + 1 =", ubahKeAngka("10") + 1);
}

// ---------- Pertemuan 10: merakit api.js dan dom.js ----------
async function muat() {
  aturMemuat(true);
  try {
    const data = await ambilProyek(); // respons.ok sudah diperiksa di api.js
    aturSumber(data);
    render(data); // larik hasil parse, bukan HTML
    ringkasDiConsole(data);
  } catch (galat) {
    tampilkanGalat("Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.");
    console.error(galat.message); // untuk pengembang, bukan untuk pengguna
  } finally {
    aturMemuat(false);
  }
}

muat();

// Hanya untuk pemeriksaan di Console (lembar F.1): modul tidak otomatis terlihat dari Console
window.muat = muat;
window.render = render;