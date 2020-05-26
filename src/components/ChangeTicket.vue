<template>
  <div>
    <b-container class="bv-example-row" id="glavni">
        <b-row class="justify-content-md-center" id="prviRed">
            <h1>
                Change Ticket
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
                    <b-button variant="primary" @click="changeTicket">Change</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import CardService from '@/services/CardService'
import FlightsService from '@/services/FlightsService'
import AirlinesService from '@/services/AirlinesService'

export default {
    data () {
        return {
            ticketForm: {
                oneWay: '',
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
            },
            ticket : null
        }
    },
    async mounted() {
        try {
            const karteResponse = await CardService.getKartaByID(this.$router.history.current.params.ticketId)
            const karta = karteResponse.data
            this.ticket = karta
            this.ticketForm.availableCount = karta.available_count
            this.ticketForm.oneWay = (karta.one_way ? 'true' : 'false')
            this.ticketForm.departDate = karta.depart_date.toString().substring(0,10)
            if (!karta.one_way) this.ticketForm.returnDate = karta.return_date.toString().substring(0,10)

            const airlinesResponse = await AirlinesService.sve()
        
            airlinesResponse.data.forEach(airline => {
                let o = {value:airline.id, text:airline.name, celo:airline};
                if (airline.id === karta.avionskaKompanija.id) this.ticketForm.airlineCompanyData.selected = o
                this.ticketForm.airlineCompanyData.options.push(o);
            })

            const flightsResponse = await FlightsService.sve(this.$store.state.token)
            
            flightsResponse.data.forEach(flight => {
                let o = {value:flight.id, text: flight.grad_origin.name + ' - ' + flight.grad_destination.name, celo:flight};
                if (flight.id === karta.flight.id) this.ticketForm.flightData.selected = o
                this.ticketForm.flightData.options.push(o);
            })  
        }catch(error) {
            console.log(error);
            alert('Card you are trying to edit does no longer exist')
            this.$router.push({
                name: 'LandingPage'
            })
        }
    },
    methods: {
        async changeTicket() {
            let one_way = this.ticketForm.oneWay === 'true'
            let depart_date = new Date(this.ticketForm.departDate.toString())
            let return_date = null
            if (one_way === false)
                return_date = new Date(this.ticketForm.returnDate.toString())
            let available_count = this.ticketForm.availableCount
            let avionskaKompanija = JSON.parse(JSON.stringify(this.ticketForm.airlineCompanyData.selected.celo))
            let flight = JSON.parse(JSON.stringify(this.ticketForm.flightData.selected.celo))

            try {
                const resp = await CardService.modifyKarta(this.$store.state.token, {id:this.ticket.id, version:this.ticket.version, one_way: one_way, depart_date:depart_date, return_date:return_date, avionskaKompanija: avionskaKompanija, flight:flight, available_count:available_count})
                this.$router.go(0)
                alert('You have changed ticket successfully')
                console.log(resp);
            }catch(error) {
                console.log(error);
                
                alert('An error occurred ')
            }
            
        }
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
</style>
