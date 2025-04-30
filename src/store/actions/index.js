import axios from 'axios';
import { toast } from 'react-toastify'; // toast'ı import et

export const NOT_EKLE = 'NOT_EKLE';
export const NOT_SIL = 'NOT_SIL';
export const NOTLARI_AL = 'NOTLARI_AL';

// Action Creators
export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export function notlariAl(notlar) {
  return { type: NOTLARI_AL, payload: notlar };
}

// Thunk Functions
export const notEkleAPI = (yeniNot) => (dispatch) => {
  axios
    .post('https://nextgen-project.onrender.com/api/s10d5/gratitudes', yeniNot)
    .then((res) => {
      // status code 201 kontrolü yapılıyor, API genellikle 201 döner.
      if (res.status === 201) {
        dispatch(notEkle(res.data));
        // Başarı toast mesajı
        toast.success(
          'Notun başarıyla kaydedildi. Güzelliklerle dolu bir gün dileğiyle...',
          {
            position: 'top-right',
            autoClose: 2000, // 2 saniye sonra kapanacak
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    })
    .catch((error) => {
      console.error('Not ekleme hatası:', error);
      // Hata toast mesajı (isteğe bağlı, spec'te belirtilmemişti ama ekleyebiliriz)
      // toast.error('Not eklenirken bir hata oluştu!');
    });
};

export const notlariAlAPI = () => (dispatch) => {
  axios
    .get('https://nextgen-project.onrender.com/api/s10d5/gratitudes')
    .then((res) => {
      if (res.status === 200) {
        dispatch(notlariAl(res.data));
      }
    })
    .catch((error) => {
      console.error('Notları alma hatası:', error);
    });
};

export const notSilAPI = (notId) => (dispatch) => {
  axios
    .delete(
      `https://nextgen-project.onrender.com/api/s10d5/gratitudes/${notId}`
    )
    .then((res) => {
      if (res.status === 200) {
        dispatch(notSil(notId));
        // Silme başarı toast mesajı
        toast.success('Notunuz silindi...', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })
    .catch((error) => {
      console.error('Not silme hatası:', error);
      // Silme hata toast mesajı (warning olarak belirtilmişti)
      toast.warning('Bir hata oluştu!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};
