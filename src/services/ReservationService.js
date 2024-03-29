import Api from '@/services/Api'

export default {
    addRezervacija(jwt, rezervacija) {
        return Api().post('addRezervacija', rezervacija, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
              },
          })
    },
    rezervacijeByUsername(jwt, username) {
        return Api().get('rezervacijeByUsername', {
            headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                params: {
                    username:username
                }
          })
    },
    filterRezervacijeForUsername(jwt, username, filter) {
        return Api().post('filterRezervacijeForUsername', filter, {
            headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                params: {
                    username:username
                }
            })
    },
    deleteRezervacija(jwt, rezervacijaID) {
        return Api().delete('deleteRezervacija', {
            headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt
                },
                params: {
                    rezervacijaID:rezervacijaID
                }
            })
    }
}