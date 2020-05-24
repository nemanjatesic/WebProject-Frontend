import Api from '@/services/Api'

export default {
    sve(jwt) {
        return Api().get('letovi', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
              },
          })
    }
}