<template>
    <div>
        <b-container class="bv-example-row" id="glavni">
            <b-row class="justify-content-md-center" id="prviRed">
                <h1>
                    Create new company
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
                        <b-button variant="primary" @click="create()">Create</b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import AirlinesService from '@/services/AirlinesService'

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
        
    },
    methods: {
        async create() {
            try {
                let name = this.form.name
                if (!name) {
                    alert('Please enter name')
                    return
                }
                const response = await AirlinesService.createCompany(this.$store.state.token, {name:name})
                alert('You have created a new company')
            }catch(error) {
                if (error.response.status === 409) {
                    alert('Company with that name already exists')
                }else {
                    alert('An error occurred with status code ' + error.response.status)
                }
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
