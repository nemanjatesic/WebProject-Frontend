<template>
    <h1>KARTE</h1>
</template>

<script>
import CardService from '@/services/CardService'
import axios from 'axios'

export default {
    data () {
        return {
            data: null
        }
    },
    async mounted(){
        const response = await CardService.sve()
        console.log(response.data);
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
