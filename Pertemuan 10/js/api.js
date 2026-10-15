
const ALAMAT = "https://raw.githubusercontent.com/Jepieuy/PABW-Semester-3/refs/heads/main/Pertemuan%2010/data/proyek.json";


export async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);
    console.log("status", respons.status, "ok", respons.ok);
    if (!respons.ok) throw new Error("status " + respons.status);

    const data = await respons.json(); 
    if (!Array.isArray(data)) throw new Error("bentuk data bukan larik");
    return data;
  } catch (galat) {
    console.error("gagal memuat", galat.message);
    throw galat; 
  }
}