<template>
    <div>
        <b-container class="bv-example-row" id="glavni">
            <b-row v-if="comapny.name" class="justify-content-md-center" id="prviRed">
                <h1>
                    {{comapny.name}}
                </h1>
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col col lg="6">
                    <b-form>
                        <b-form-group id="input-group-1" label="Comapny name:" label-for="input-1">
                            <b-form-input
                                id="input-1"
                                v-model="form.name"
                                required
                                placeholder="Enter new comapny name"
                            ></b-form-input>
                        </b-form-group>
                        <b-button variant="primary" @click="change()">Change</b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import AirlinesService from '@/services/AirlinesService'
import CardService from '@/services/CardService'
import ReservationService from '@/services/ReservationService'

export default {
    data () {
        return {
            comapny: '',
            form: {
                name: ''
            }
        }
    },
    async mounted(){
        const companyID = this.$router.history.current.params.comapnyId
        const companyResponse = await AirlinesService.kompanijaById(companyID)

        this.comapny = companyResponse.data
        console.log(this.comapny);
        
    },
    methods: {
        async change() {
            try {
                const response = await AirlinesService.changeCompanyName(this.comapny, this.form.name)
                alert('You have successfully changed name of the company')
                this.$router.go(0)
            }catch(error) {
                alert('There was an error')
                this.$router.go(0)
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
