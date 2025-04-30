import { NOTLARI_AL, NOT_EKLE, NOT_SIL } from '../actions';

const s10chLocalStorageKey = 's10d5';

// Başlangıç değerleri için localStorage'ı okuma veya varsayılanı ayarlama fonksiyonları
function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorageStateOku(key);

  if (eskiNotlar !== null) {
    return eskiNotlar;
  } else {
    const baslangicDegerleri = { notlar: [] };
    localStorageStateYaz(key, baslangicDegerleri);
    return baslangicDegerleri;
  }
}

const initialState = baslangicNotlariniGetir(s10chLocalStorageKey);

// Reducer fonksiyonu (default export)
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NOTLARI_AL:
      // API'den gelen notları state'e ata ve localStorage'a yaz
      const notlar = action.payload;
      localStorageStateYaz(s10chLocalStorageKey, { notlar }); // notları direkt payload'dan alıp yaz
      return {
        ...state,
        notlar: notlar, // API'den gelen notlar
      };

    case NOT_EKLE:
      // Yeni notu mevcut notlara ekle ve localStorage'ı güncelle
      const yeniNot = action.payload;
      const guncelNotlarEkle = [...state.notlar, yeniNot];
      localStorageStateYaz(s10chLocalStorageKey, { notlar: guncelNotlarEkle });
      return {
        ...state,
        notlar: guncelNotlarEkle,
      };

    case NOT_SIL:
      // Silinecek notu filtrele ve localStorage'ı güncelle
      const silinecekNotId = action.payload;
      const guncelNotlarSil = state.notlar.filter(
        (not) => not.id !== silinecekNotId
      );
      localStorageStateYaz(s10chLocalStorageKey, { notlar: guncelNotlarSil });
      return {
        ...state,
        notlar: guncelNotlarSil,
      };

    default:
      return state;
  }
}
