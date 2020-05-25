import Api from '@/services/Api'

export default {
    addRezervacija(rezervacija) {
        return Api().post('addRezervacija', rezervacija, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
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
    }
    ,
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
    }
}