<template>
  <div>
    <b-container class="bv-example-row" id="glavni">
        <b-row class="justify-content-md-center" id="prviRed">
            <h1>
                Tickets
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

                    <div>
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
                    </div>
                    <b-button variant="primary" @click="filterTickets">Filter</b-button>
                    <b-button variant="danger" @click="clearAll">Clear</b-button>
                </b-form>
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

                    <template v-slot:cell(Company)="data">
                        <a class="mojaAKlasa" @click="goToCompany(data.item)">{{data.item.Company}}</a>
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
            filterForm: {
                one_way: 'null',
                grad_destination: '',
                grad_origin: '',
                departDate: null,
                returnDate: null,
                error: null
            },
            lastSelectedFilterForm: {
                one_way: 'null',
                grad_destination: '',
                grad_origin: '',
                departDate: null,
                returnDate: null,
                error: null
            },
            userType : ''
        }
    }
    , async mounted() {
        if (!this.$store.state.isUserLoggedIn){
            alert('Please Log In first')
            this.$router.push({
                name: 'login'
            })
        }

        this.userType = this.$store.state.user.tipKorisnika

        try {
            const karteResponse = await CardService.sve()

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
        }

        if (this.userType === 'ADMIN') {
            this.table.fields.push({key: 'Change', label: ''})
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

                const karteResponse = await CardService.filterKarte(
                    {mestoPolaska:this.filterForm.grad_origin, destinacija:this.filterForm.grad_destination
                    ,datumPolaska:datumPolaska, datumPovratka:datumPovratka, oneWay:oneWay})

                this.table.items = []

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

                this.lastSelectedFilterForm.one_way = this.filterForm.one_way
                this.lastSelectedFilterForm.grad_destination = this.filterForm.grad_destination
                this.lastSelectedFilterForm.grad_origin = this.filterForm.grad_origin
                this.lastSelectedFilterForm.departDate = this.filterForm.departDate
                this.lastSelectedFilterForm.returnDate = this.filterForm.returnDate
            }catch(error) {
                console.log(error);
            }
        },
        async clearAll() {
            this.filterForm.grad_destination = ''
            this.filterForm.grad_origin = ''
            this.filterForm.departDate = null
            this.filterForm.returnDate = null
            this.filterForm.one_way = 'null'
        },
        async doStuff(data) {
            console.log(data);
            if (this.userType === 'ADMIN') {
                if (confirm('Are you sure you want to delete this card ?') === true) {
                    const responseDelete = await CardService.deleteKartaByID(this.$store.state.token, data.realValue.id)
                    
                    if (responseDelete.data === true){
                        try {
                            let datumPolaska = this.lastSelectedFilterForm.departDate
                            if (datumPolaska) 
                                datumPolaska = new Date(datumPolaska.toString())

                            let datumPovratka = this.lastSelectedFilterForm.returnDate
                            if (datumPovratka) 
                                datumPovratka = new Date(datumPovratka.toString())
                                
                            let oneWay = this.lastSelectedFilterForm.one_way
                            if (oneWay === 'null') oneWay = null
                            else if (oneWay === 'true') oneWay = true
                            else oneWay = false

                            const karteResponse = await CardService.filterKarte(
                                {mestoPolaska:this.lastSelectedFilterForm.grad_origin, destinacija:this.lastSelectedFilterForm.grad_destination
                                ,datumPolaska:datumPolaska, datumPovratka:datumPovratka, oneWay:oneWay})

                            this.table.items = []
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
                            alert('You have successfully delete the card')
                        }catch(error) {
                            console.log(error);
                        }
                    }else {
                        alert('An error occurred')
                    }
                }
            }
            else if (this.userType === 'USER') {     
                try {
                    let rezervacija = {available:true, flight:data.realValue.flight, avionskaKarta:data.realValue, korisnik:this.$store.state.user}
                    const reservationResponse = await ReservationService.addRezervacija(this.$store.state.token, rezervacija)
                    console.log(reservationResponse);
                    
                    if (reservationResponse.status === 200) {
                        const allReservationsForUser = await ReservationService.rezervacijeByUsername(this.$store.state.token, this.$store.state.user.username)
                        this.$store.dispatch('setUserReservations', allReservationsForUser.data)
                        console.log(allReservationsForUser);

                        let datumPolaska = this.lastSelectedFilterForm.departDate
                        if (datumPolaska) 
                            datumPolaska = new Date(datumPolaska.toString())

                        let datumPovratka = this.lastSelectedFilterForm.returnDate
                        if (datumPovratka) 
                            datumPovratka = new Date(datumPovratka.toString())
                            
                        let oneWay = this.lastSelectedFilterForm.one_way
                        if (oneWay === 'null') oneWay = null
                        else if (oneWay === 'true') oneWay = true
                        else oneWay = false

                        const karteResponse = await CardService.filterKarte(
                                {mestoPolaska:this.lastSelectedFilterForm.grad_origin, destinacija:this.lastSelectedFilterForm.grad_destination
                                ,datumPolaska:datumPolaska, datumPovratka:datumPovratka, oneWay:oneWay})

                        this.table.items = []
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
                        alert('You have successfully reserved card')
                    } 
                }catch(error) {
                    if (error.response.status === 409)
                        alert('You have already reserved that ticket')
                    else if (error.response.status === 410)
                        alert('Ticket you are trying to reserve has been changed, please reload page')
                    else
                        alert('An error occurred with status code : ' + error.response.status)
                }
            }
        },
        async change(data) {
            console.log(data);
            console.log(data.realValue.id);
            
            this.$router.push({
                //path: `/admin/editTicket/${data.realValue.id}`
                name: 'changeTicket',
                params: {
                    ticketId: data.realValue.id
                }
            })
        },
        async goToCompany(data) {
            console.log(data);
            let kompanijaID = data.realValue.avionskaKompanija.id
            this.$router.push({
                name: 'viewCompany',
                params: {
                    comapnyId: kompanijaID
                }
            })
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
    .mojaAKlasa {
        color: rgb(66, 135, 245);
        cursor: pointer;
    }
</style>