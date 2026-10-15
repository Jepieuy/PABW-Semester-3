// Pertemuan 9: memasang data dari app.js ke halaman dan menanggapi pengguna.
import { daftarBacaan, saring } from "./app.js";

// ---------- Lembar A: memilih elemen ----------
const wadah = document.querySelector("#daftar");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong");
const isiTabel = document.querySelector("#isi-tabel");
const formTambah = document.querySelector("#form-tambah");
const inputJudul = document.querySelector("#judul");
const inputStatus = document.querySelector("#status");
const inputPenulis = document.querySelector("#penulis");
const galatJudul = document.querySelector("#galat-judul");
const galatStatus = document.querySelector("#galat-status");
const galatPenulis = document.querySelector("#galat-penulis");
const tombolSimpan = document.querySelector("#tombol-simpan");

const labelStatus = {
  selesai: "Selesai",
  "sedang-dibaca": "Sedang Dibaca",
  "belum-dibaca": "Belum Dibaca",
};

let filterAktif = "semua";

// ---------- Lembar B: menyusun elemen dari data ----------
function buatKartu(bacaan) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = bacaan.judul;

  const isi = document.createElement("div");
  isi.className = "kartu__isi";
  if (bacaan.gambar) {
    const figur = document.createElement("figure");
    const gambar = document.createElement("img");
    gambar.src = bacaan.gambar;
    gambar.alt = `Sampul ${bacaan.judul}`;
    gambar.loading = "lazy";
    const keterangan = document.createElement("figcaption");
    keterangan.textContent = bacaan.sinopsis ?? "";
    figur.append(gambar, keterangan);
    isi.append(figur);
  }

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";
  const penulis = document.createElement("span");
  penulis.textContent = bacaan.penulis;
  const lencana = document.createElement("span");
  lencana.className = "lencana";
  lencana.textContent = labelStatus[bacaan.status] ?? bacaan.status;
  kaki.append(penulis, lencana);

  kartu.append(judul, isi, kaki);
  return kartu;
}

// ---------- Lembar D.1: satu fungsi render untuk daftar ----------
function render(daftar) {
  wadah.textContent = ""; // 1. kosongkan lebih dulu

  if (daftar.length === 0) {
    // 2. keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment(); // 3. isi ulang, digambar sekali
  daftar.forEach((bacaan) => fragmen.append(buatKartu(bacaan)));
  wadah.append(fragmen);
}

// Satu fungsi render untuk tabel ringkasan (selalu memuat seluruh data)
function renderTabel(daftar) {
  isiTabel.textContent = "";
  const fragmen = document.createDocumentFragment();
  daftar.forEach((bacaan) => {
    const baris = document.createElement("tr");
    const judul = document.createElement("th");
    judul.scope = "row";
    judul.textContent = bacaan.judul;
    const status = document.createElement("td");
    status.textContent = labelStatus[bacaan.status] ?? bacaan.status;
    const penulis = document.createElement("td");
    penulis.textContent = bacaan.penulis;
    baris.append(judul, status, penulis);
    fragmen.append(baris);
  });
  isiTabel.append(fragmen);
}

// ---------- Lembar C: satu pendengar di induk untuk semua tombol ----------
function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return; // klik di luar tombol, abaikan

  filterAktif = tombol.dataset.kategori;
  tandaiTombolAktif(tombol);
  render(saring(daftarBacaan, filterAktif));
});

// ---------- Lembar D.2: validasi form per kolom ----------
const aturan = [
  {
    input: inputJudul,
    galat: galatJudul,
    pesan: "Judul belum diisi. Ketik judul manhwa atau komik.",
    sah: (nilai) => nilai.trim() !== "",
  },
  {
    input: inputStatus,
    galat: galatStatus,
    pesan: "Status belum dipilih. Pilih salah satu status bacaan.",
    sah: (nilai) => nilai !== "",
  },
  {
    input: inputPenulis,
    galat: galatPenulis,
    pesan: "Penulis belum diisi. Ketik nama penulisnya.",
    sah: (nilai) => nilai.trim() !== "",
  },
];

let sudahDicoba = false;

function periksaKolom(kolom) {
  const sah = kolom.sah(kolom.input.value);
  kolom.galat.hidden = sah;
  kolom.galat.textContent = sah ? "" : kolom.pesan;
  if (sah) {
    kolom.input.removeAttribute("aria-invalid");
  } else {
    kolom.input.setAttribute("aria-invalid", "true");
  }
  return sah;
}

function perbaruiTombol() {
  const semuaSah = aturan.every((kolom) => kolom.sah(kolom.input.value));
  tombolSimpan.disabled = sudahDicoba && !semuaSah;
}

function bersihkanGalat() {
  aturan.forEach((kolom) => {
    kolom.galat.hidden = true;
    kolom.galat.textContent = "";
    kolom.input.removeAttribute("aria-invalid");
  });
}

formTambah.addEventListener("input", (event) => {
  const kolom = aturan.find((item) => item.input === event.target);
  if (!kolom) return;
  sudahDicoba = true;
  periksaKolom(kolom);
  perbaruiTombol();
});

formTambah.addEventListener("submit", (event) => {
  event.preventDefault(); // halaman tidak dimuat ulang
  sudahDicoba = true;

  const hasil = aturan.map(periksaKolom); // periksa semua kolom, bukan berhenti di yang pertama
  perbaruiTombol();

  const kolomSalah = aturan.find((kolom, urutan) => !hasil[urutan]);
  if (kolomSalah) {
    kolomSalah.input.focus();
    return;
  }

  daftarBacaan.push({
    judul: inputJudul.value.trim(),
    penulis: inputPenulis.value.trim(),
    status: inputStatus.value,
    selesai: inputStatus.value === "selesai",
  });

  formTambah.reset();
  bersihkanGalat();
  sudahDicoba = false;
  perbaruiTombol();

  render(saring(daftarBacaan, filterAktif));
  renderTabel(daftarBacaan);
});

// ---------- Tampilan awal ----------
render(daftarBacaan);
renderTabel(daftarBacaan);