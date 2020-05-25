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
    },
    kompanijaById(id) {
        return Api().get('kompanijaById', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
            },
            params: {
                kompanijaID:id
            }
        })
    },
    deleteCompanyByID(id) {
        return Api().delete('deleteCompany', {
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