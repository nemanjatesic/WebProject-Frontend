import Api from '@/services/Api'

export default {
    createKorisnik(korisnik) {
        return Api().post('createKorisnik', korisnik, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
              },
        })
    }
}