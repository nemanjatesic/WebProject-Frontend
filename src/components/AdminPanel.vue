<template>
  <div>
    <b-container id="glavni">
        <b-row class="justify-content-md-center">
            <h1>
                Welcome to admin panel
            </h1>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col col lg="10">
                <b-form>
                    <br><br><br><br><br>
                    <h2>If you want to add new user click here</h2>
                    <b-button variant="primary" @click="registerUser">Register new User</b-button>
                    <br><br><br><br><br>
                    <h2>If you want to create new ticket click here</h2>
                    <b-button variant="primary" @click="createTicket">Create new ticket</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data() {
        return {
            userForm: {
                username: '',
                password: '',
                tipKorisnika: 'USER',
                error: null
            }
        }
    }, async mounted(){
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
    },
    methods: {
        async registerUser () {
            this.$router.push({
                name: 'createUser'
            })
        },
        async createTicket () {
            this.$router.push({
                name: 'createTicket'
            })
        }
    }
};
</script>

<style scoped>
#glavni{
    margin-top: 50px;
}
</style>