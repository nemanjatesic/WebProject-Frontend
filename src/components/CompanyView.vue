<template>
    <div>
        <b-container class="bv-example-row" id="glavni">
            <b-row class="justify-content-md-center" id="prviRed">
                <h1>
                    {{company.name}}
                </h1>
            </b-row>
            <b-row v-if="$store.state.user.tipKorisnika === 'ADMIN'" class="justify-content-md-center" id="dugmeRow">
                <b-col col>
                    <b-button class="mr-1" variant="info">Change company name</b-button>
                </b-col>
                <b-col col>
                    <b-button class="mr-1" variant="danger" @click="deleteCompany()">Delete company</b-button>
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col col lg="20">
                    <b-table bordered dark id="tabela" striped hover :items="table.items" :fields="table.fields">
                        <template v-slot:cell(Dugme)="data">
                            <b-button v-if="userType === 'ADMIN'" size="sm" @click="doStuff(data.item)" class="mr-1" variant="danger">
                                Delete
                            </b-button>

                            <b-button v-if="userType === 'USER'" size="sm" @click="doStuff(data.item)" class="mr-1" variant="success">
                                Reserve
                            </b-button>
                        </template>

                        <template v-if="userType === 'ADMIN'" v-slot:cell(Change)="data">
                            <b-button size="sm" @click="change(data.item)" class="mr-1" variant="info">
                                Change
                            </b-button>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import AirlinesService from '@/services/AirlinesService'
import CardService from '@/services/CardService'

export default {
    data () {
        return {
            company: '',
            userType : '',
            table: {
                fields: [
                    {key: 'One_way', label: 'One Way'}, 
                    {key: 'Origin', label: 'Origin'}, 
                    {key: 'Destination',label: 'Destination'}, 
                    {key: 'Depart',label: 'Depart'}, 
                    {key: 'Return',label: 'Return'}, 
                    {key: 'Company', label: 'Company'}, 
                    {key: 'Count', label: 'Count'}, 
                    {key: 'Dugme', label: ''}
                ],
                items: []
            },
        }
    },
    async mounted(){
        try {
            const companyID = this.$router.history.current.params.comapnyId
            const kompanijaResponse = await AirlinesService.kompanijaById(companyID)
            const karteResponse = await CardService.getCardsForCompanyId(companyID)

            this.company = kompanijaResponse.data
            console.log(kompanijaResponse);
            
            this.userType = this.$store.state.user.tipKorisnika

            karteResponse.data.forEach(karta => {
                let returnDatee = '/'
                if (!karta.one_way && karta.return_date) {
                    returnDatee = karta.return_date.substring(0,10)
                }
                let item = {One_way:karta.one_way, Company:karta.avionskaKompanija.name
                , Count:karta.available_count, Depart:karta.depart_date.substring(0,10), Return:returnDatee
                , Origin:karta.flight.grad_origin.name, Destination:karta.flight.grad_destination.name, realValue:karta}
                
                this.table.items.push(item)
            })
        }catch(error) {
            console.log(error);
            if (error.response.status === 404) {
                alert('Company you are searching for doesn\'t exist')
                this.$router.push({
                    name: 'root'
                })
            }
        }

        if (this.userType === 'ADMIN') {
            this.table.fields.push({key: 'Change', label: ''})
        }
    },
    methods: {
        async change(data) {
        
        },
        async doStuff(data) {
        
        },
        async deleteCompany() {
            if (confirm('Are you sure you want to delete this company ?') === true) {
                const response = await AirlinesService.deleteCompanyByID(this.company.id)
                console.log(response);
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
    }
    #dugmeRow {
        margin: 10px;
        margin-bottom: 20px;
    }
</style>
