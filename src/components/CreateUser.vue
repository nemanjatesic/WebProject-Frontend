<template>
  <div>
    <b-container class="bv-example-row" id="glavni">
        <b-row class="justify-content-md-center" id="prviRed">
            <h1>
                Create new User
            </h1>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col col lg="5">
                <b-form>
                    <b-form-group id="input-group-1" label="Username:" label-for="input-1">
                        <b-form-input
                            id="input-1"
                            v-model="userForm.username"
                            required
                            placeholder="Enter username"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                    <b-form-input
                        name="pass1"
                        type="password"
                        id="input-2"
                        v-model="userForm.password"
                        required
                        placeholder="Enter password"
                    ></b-form-input>
                    </b-form-group>
                    <b-form-group label="User type:">
                        <b-form-radio v-model="userForm.tipKorisnika" name="some-radios" value="USER" >User</b-form-radio>
                        <b-form-radio v-model="userForm.tipKorisnika" name="some-radios" value="ADMIN">Admin</b-form-radio>
                    </b-form-group>
                    <br>
                    <b-button variant="primary" @click="register">Register</b-button>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

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
        async register () {
            if (!this.validateForm()) return
            try {
                const response = await UserService.createKorisnik(this.$store.state.token, {
                    username: this.userForm.username,
                    password: this.userForm.password,
                    tipKorisnika: this.userForm.tipKorisnika
                })
                console.log(response.data);
                alert('You have secsesfully created new user')
                this.$router.go(0)
                /*
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({
                  name: 'posts'
                })*/
            } catch (error) {
                if (error.response.status === 409){
                    alert('User with that username already exists')
                }else {
                    alert('An error occurred with status code ' + error.response.status)
                }
            }
        },
        validateForm() {
            if (!this.userForm.username) {
                alert('Please enter username')
                return false
            }
            if (!this.userForm.password) {
                alert('Please enter password')
                return false
            }
            return true
        },
        onReset(evt) {
            evt.preventDefault();
            this.form.username = "";
            this.form.password = "";
        }
    }
};
</script>

<style scoped>
    #glavni{
        margin-top: 50px;
    }
    #prviRed {
        padding-bottom: 30px;
    }
</style>