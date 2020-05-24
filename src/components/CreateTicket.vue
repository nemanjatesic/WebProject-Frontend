<template>
  <div>
    <b-container class="bv-example-row" id="glavni">
        <b-row class="justify-content-md-center" id="prviRed">
            <h1>
                Create new Ticket
            </h1>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col col lg="5">
                <b-form>
                    <b-form-group label="Card type:">
                        <b-form-radio v-model="ticketForm.oneWay" name="some-radios" value='true'>One way</b-form-radio>
                        <b-form-radio v-model="ticketForm.oneWay" name="some-radios" value='false'>Two way</b-form-radio>
                    </b-form-group>
                    
                    <label for="departDate">Choose a depart date</label>
                    <b-form-datepicker id="departDate" v-model="ticketForm.departDate" class="mb-2"></b-form-datepicker>
                    
                    <label v-if="ticketForm.oneWay === 'false'" for="returnDate">Choose a return date</label>
                    <b-form-datepicker v-if="ticketForm.oneWay === 'false'" id="returnDate" v-model="ticketForm.returnDate" class="mb-2"></b-form-datepicker>
 
                    <label for="availableCount">Enter amount of tickets possible to sell</label>
                    <b-form-input id="availableCount" type="number" v-model.number="ticketForm.availableCount"/>

                    <br>
                    <b-dropdown id="ddCommodity"
                                name="ddCommodity"
                                v-model="ticketForm.airlineCompanyData.selected"
                                text="Select Airline company"
                                variant="primary"
                                class="m-md-2">
                        <b-dropdown-item v-for="option in ticketForm.airlineCompanyData.options" 
                                        :key="option.value" 
                                        :value="option.value"
                                        @click="ticketForm.airlineCompanyData.selected = option">
                            {{option.text}}
                        </b-dropdown-item>           
                    </b-dropdown> 
                    <br>
                    <span v-if="ticketForm.airlineCompanyData.selected" class="mojTekst"> Selected: {{ ticketForm.airlineCompanyData.selected.text }}</span>
                    
                    <br>
                    <b-dropdown id="ddCommodity1"
                                name="ddCommodity1"
                                v-model="ticketForm.flightData.selected"
                                text="Select Flight"
                                variant="primary"
                                class="m-md-2">
                        <b-dropdown-item v-for="option in ticketForm.flightData.options" 
                                        :key="option.value" 
                                        :value="option.value"
                                        @click="ticketForm.flightData.selected = option">
                            {{option.text}}
                        </b-dropdown-item>           
                    </b-dropdown> 
                    <br>
                    <span v-if="ticketForm.flightData.selected" class="mojTekst"> Selected: {{ ticketForm.flightData.selected.text }}</span>
                    
                    
                    <br><br>
                    <b-button variant="primary" @click="createTicket">Create</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import FlightsService from '@/services/FlightsService'
import AirlinesService from '@/services/AirlinesService'
import CardService from '@/services/CardService'

export default {
    data() {
        return {
            ticketForm: {
                oneWay: 'true',
                departDate: null,
                returnDate: null,
                availableCount: 0,
                flightData: {
                    selected: null,
                    options: []
                },
                airlineCompanyData: {
                    selected: null,
                    options: []
                },
                error: null
            }
        }
    }, async mounted() {
        if (!this.$store.state.isUserLoggedIn){
            alert('Please Log In first')
            this.$router.push({
                name: 'login'
            })
        }

        if (this.$store.state.user.tipKorisnika !== 'ADMIN'){
            alert('Please Log In with admin account')
            this.$router.push({
                name: 'login'
            })
        }
        try {
            const airlinesResponse = await AirlinesService.sve()
        
            airlinesResponse.data.forEach(airline => {
                let o = {value:airline.id, text:airline.name, celo:airline};
                this.ticketForm.airlineCompanyData.options.push(o);
            })

            const flightsResponse = await FlightsService.sve(this.$store.state.token)
            
            flightsResponse.data.forEach(flight => {
                let o = {value:flight.id, text: flight.grad_origin.name + ' - ' + flight.grad_destination.name, celo:flight};
                this.ticketForm.flightData.options.push(o);
            })  
        }catch(error) {
            console.log(error);
        }
          
    },
    methods: {
        async createTicket () {
            try {
                let one_way = this.ticketForm.oneWay === 'true'
                let depart_date = new Date(this.ticketForm.departDate.toString())
                let return_date = null
                if (one_way === false)
                    return_date = new Date(this.ticketForm.returnDate.toString())
                let available_count = this.ticketForm.availableCount
                let avionskaKompanija = JSON.parse(JSON.stringify(this.ticketForm.airlineCompanyData.selected.celo))
                let flight = JSON.parse(JSON.stringify(this.ticketForm.flightData.selected.celo))

                const resp = await CardService.dodajKartu({one_way: one_way, depart_date:depart_date, return_date:return_date, avionskaKompanija: avionskaKompanija, flight:flight, available_count:available_count})
                alert('Karta je uspesno dodata')
            } catch (error) {
                this.error = error
                console.log(error);
                alert(error);
            }
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
</style>