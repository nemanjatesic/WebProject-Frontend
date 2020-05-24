import Api from '@/services/Api'

export default {
    sve() {
        return Api().get('kompanije', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
            },
        })
    }
}