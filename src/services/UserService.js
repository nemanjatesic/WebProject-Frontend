import Api from '@/services/Api'

export default {
    createKorisnik(jwt, korisnik) {
        return Api().post('createKorisnik', korisnik, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
              },
        })
    }
}