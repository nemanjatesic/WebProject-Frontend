<template>
  <div>
    <b-container class="bv-example-row" id="glavni">
        <b-row class="justify-content-md-center" id="prviRed">
            <h1>
                Filter Tickets
            </h1>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col col lg="6">
                <b-form id="forma">
                    <b-form-group label="Ticket type:">
                        <b-form-radio v-model="filterForm.one_way" name="some-radios" value="true">One way</b-form-radio>
                        <b-form-radio v-model="filterForm.one_way" name="some-radios" value="false">Two way</b-form-radio>
                        <b-form-radio v-model="filterForm.one_way" name="some-radios" value="null">Any</b-form-radio>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="Place of department :" label-for="input-1">
                        <b-form-input
                            id="input-1"
                            v-model="filterForm.grad_origin"
                            placeholder="Enter place of department"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Place of destination :" label-for="input-2">
                        <b-form-input
                            id="input-2"
                            v-model="filterForm.grad_destination"
                            placeholder="Enter place of destination"
                        ></b-form-input>
                    </b-form-group>


                    <label for="departDate">Choose a depart date</label>
                    <b-form-datepicker id="departDate" v-model="filterForm.departDate" class="mb-3"></b-form-datepicker>

                    <label for="returnDate">Choose a return date</label>
                    <b-form-datepicker id="returnDate" v-model="filterForm.returnDate" class="mb-3"></b-form-datepicker>

                    <b-button variant="primary" @click="filterTickets">Filter</b-button>
                    <b-button variant="danger" @click="clearAll">Clear</b-button>
                </b-form>
            </b-col>
                <br><br><br>
                <b-col col lg="10">
                    <b-table bordered dark id="tabela" striped hover :items="table.items" :fields="table.fields">
                        <template v-slot:cell(Dugme)="data">
                            <b-button size="sm" @click="deleteReservation(data.item)" class="mr-1" variant="danger">
                                Delete
                            </b-button>
                        </template>
                    </b-table>
                </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import CardService from '@/services/CardService'
import ReservationService from '@/services/ReservationService'

export default {
    data() {
        return {
            filterForm: {
                one_way: 'null',
                grad_destination: '',
                grad_origin: '',
                departDate: null,
                returnDate: null,
                error: null
            },
            table: {
                fields: [
                    {key: 'One_way', label: 'One Way'}, 
                    {key: 'Origin', label: 'Origin'}, 
                    {key: 'Destination',label: 'Destination'}, 
                    {key: 'Depart',label: 'Depart'}, 
                    {key: 'Return',label: 'Return'}, 
                    {key: 'Company', label: 'Company'}, 
                    {key: 'Count', label: 'Count'}, 
                    {key: 'Valid', label: 'Valid'}, 
                    {key: 'Dugme', label: ''}],
                items: []
            }
        }
    }, async mounted() {
        if (!this.$store.state.isUserLoggedIn){
            alert('Please Log In first')
            this.$router.push({
                name: 'login'
            })
        }

        if (this.$store.state.user.tipKorisnika !== 'USER'){
            alert('Please Log In with user account')
            this.$router.push({
                name: 'login'
            })
        }
        try {
            const karteResponse = await ReservationService.rezervacijeByUsername(this.$store.state.token, this.$store.state.user.username)

            karteResponse.data.forEach(rezervacija => {
                let karta = rezervacija.avionskaKarta
                let returnDatee = '/'
                if (!karta.one_way && karta.return_date) {
                    returnDatee = karta.return_date.substring(0,10)
                }
                let item = {One_way:karta.one_way, Company:karta.avionskaKompanija.name
                , Count:karta.available_count, Depart:karta.depart_date.substring(0,10), Return:returnDatee
                , Origin:karta.flight.grad_origin.name, Destination:karta.flight.grad_destination.name, Valid:rezervacija.available}
                this.table.items.push(item)
            })

        }catch(error) {
            console.log(error);
        }
          
    },
    methods: {
        async filterTickets () {
            try {
                let datumPolaska = this.filterForm.departDate
                if (datumPolaska) 
                    datumPolaska = new Date(datumPolaska.toString())

                let datumPovratka = this.filterForm.returnDate
                if (datumPovratka) 
                    datumPovratka = new Date(datumPovratka.toString())
                    
                let oneWay = this.filterForm.one_way
                if (oneWay === 'null') oneWay = null
                else if (oneWay === 'true') oneWay = true
                else oneWay = false

                const karteResponse = await ReservationService.filterRezervacijeForUsername(
                    this.$store.state.token, this.$store.state.user.username,
                    {mestoPolaska:this.filterForm.grad_origin, destinacija:this.filterForm.grad_destination
                    ,datumPolaska:datumPolaska, datumPovratka:datumPovratka, oneWay:oneWay})


                this.table.items = []

                karteResponse.data.forEach(rezervacija => {
                    let karta = rezervacija.avionskaKarta
                    let returnDatee = '/'
                    if (!karta.one_way && karta.return_date) {
                        returnDatee = karta.return_date.substring(0,10)
                    }
                    let item = {One_way:karta.one_way, Company:karta.avionskaKompanija.name
                    , Count:karta.available_count, Depart:karta.depart_date.substring(0,10), Return:returnDatee
                    , Origin:karta.flight.grad_origin.name, Destination:karta.flight.grad_destination.name}
                    this.table.items.push(item)
                })

            }catch(error) {
                console.log(error);
            }
        },
        async deleteReservation(data) {

        },
        async clearAll() {
            this.filterForm.grad_destination = ''
            this.filterForm.grad_origin = ''
            this.filterForm.departDate = null
            this.filterForm.returnDate = null
            this.filterForm.one_way = 'null'
        }
    }
};
</script>

<style scoped>
    #glavni {
        margin-top: 50px;
    }
    #prviRed {
        padding-bottom: 30px;
    }
    .mojTekst {
        padding-bottom: 10px;
        padding-top: 10px;
    }
    #tabela {
        padding-top: 10px;
    }
    #forma {
        padding-bottom: 50px;
    }
</style>