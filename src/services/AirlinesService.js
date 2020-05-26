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
    deleteCompanyByID(jwt, id) {
        return Api().delete('deleteCompany', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            params: {
                kompanijaID:id
            }
        })
    },
    createCompany(jwt, company) {
        return Api().post('createCompany', company,  {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            }
        })
    },
    changeCompanyName(jwt, company, newName) {
        return Api().post('changeCompanyName', company,  {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            params: {
                name:newName
            }
        })
    }
}