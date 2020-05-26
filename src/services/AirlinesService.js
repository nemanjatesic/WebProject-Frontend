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
    },
    createCompany(company) {
        return Api().post('createCompany', company,  {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
            }
        })
    },
    changeCompanyName(company, newName) {
        return Api().post('changeCompanyName', company,  {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.jwt
            },
            params: {
                name:newName
            }
        })
    }
}