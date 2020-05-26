import Api from '@/services/Api'

export default {
    sve() {
        return Api().get('karte', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
            },
        })
    },
    dodajKartu(jwt, karta) {
        return Api().post('addKarta', karta, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
        })
    },
    filterKarte(filter) {
        return Api().post('filterKarte', filter, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
              },
        })
    },
    getKartaByID(id) {
        return Api().get('kartaID', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
            },
            params: {
                kartaID:id
            }
        })
    },
    deleteKartaByID(jwt, id) {
        return Api().delete('deleteKarta', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            params: {
                kartaID:id
            }
        })
    },
    modifyKarta(jwt, karta) {
        return Api().patch('modifyKarta', karta, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        })
    },
    getCardsForCompanyId(id) {
        return Api().get('getCardsForCompanyId', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
            },
            params: {
                kompanijaID:id
            }
        })
    }
}