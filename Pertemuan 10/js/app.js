

const profil = {
  nama: "Javier Khiar Athallah Dirgantara Putra",
  nim: "25523248",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

const daftarBacaan = [
  {
    judul: "Solo Leveling",
    penulis: "Chugong",
    status: "selesai",
    selesai: true,
    gambar: "solev.jpeg",
    sinopsis: "Seorang hunter terlemah mendapatkan kemampuan untuk berkembang menjadi semakin kuat.",
  },
  {
    judul: "The Beginning After the End",
    penulis: "TurtleMe",
    status: "sedang-dibaca",
    selesai: false,
    gambar: "Tebete.jpeg",
    sinopsis: "Seorang raja bereinkarnasi ke dunia lain dan menjalani kehidupan baru dengan kekuatan sihir.",
  },
  {
    judul: "Omniscient Reader",
    penulis: "Sing Shong",
    status: "belum-dibaca",
    selesai: false,
    gambar: "orv.jpeg",
    sinopsis: "Seorang pembaca novel yang menjadi satu-satunya orang yang mengetahui akhir dari dunia.",
  },
];

const jumlahBacaan = daftarBacaan.length;

const kota = profil.alamat?.kota ?? "belum diisi";

const kalimat = `Nama saya ${profil.nama}, dan saya membaca ${jumlahBacaan} judul.`;


function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");


const daftarJudul = daftarBacaan.map((bacaan) => bacaan.judul);
const bacaanSelesai = daftarBacaan.filter((bacaan) => bacaan.selesai);
const sedangDibaca = daftarBacaan.filter((bacaan) => bacaan.status === "sedang-dibaca");
const soloLeveling = daftarBacaan.find((bacaan) => bacaan.judul === "Solo Leveling");

const urutJudul = [...daftarBacaan].sort((a, b) => a.judul.localeCompare(b.judul));

const saring = (daftar, status) =>
  status === "semua" ? daftar : daftar.filter((bacaan) => bacaan.status === status);
let statusAktif = "semua";
const semuaBacaan = saring(daftarBacaan, statusAktif);
statusAktif = "selesai";
const hanyaSelesai = saring(daftarBacaan, statusAktif);

const penulisPertama = daftarBacaan[0].penulis ?? "tidak diketahui";

const kolomJudul = document.querySelector("#judul");
if (kolomJudul === null) {
  console.error("Elemen #judul tidak ditemukan, periksa id di HTML");
}

const ubahKeAngka = (teks) => {
  if (teks.trim() === "") return null;
  const angka = Number(teks);
  return Number.isNaN(angka) ? null : angka;
};

console.log(kalimat);
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
console.log("data asli:", daftarBacaan.map((b) => b.judul));
console.log("penulis pertama:", penulisPertama);
console.log("ubahKeAngka('10') + 1 =", ubahKeAngka("10") + 1);

export { daftarBacaan, saring };