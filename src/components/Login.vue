<template>
  <div>
    <b-container class="bv-example-row" id="glavni">
        <b-row class="justify-content-md-center">
            <h1>
                Login
            </h1>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col col lg="5">
                <b-form>
                    <b-form-group id="input-group-1" label="Your Username:" label-for="input-1">
                        <b-form-input
                            id="input-1"
                            v-model="form.username"
                            required
                            placeholder="Enter username"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                    <b-form-input
                        name="pass1"
                        type="password"
                        id="input-2"
                        v-model="form.password"
                        required
                        placeholder="Enter password"
                    ></b-form-input>
                    </b-form-group>
                    <br>
                    <b-button variant="primary" @click="login">Login</b-button>
                    <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
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
            form: {
                username: '',
                password: '',
                error: null
            }
        }
    },
    methods: {
        async login () {
            try {
                const response = await AuthenticationService.login({
                    username: this.form.username,
                    password: this.form.password
                })
                console.log(response);
                
                this.$store.dispatch('setToken', response.data.JWTToken)
                this.$store.dispatch('setUser', response.data)

                console.log(this.$store.state.token);
                
                if (response.data.tipKorisnika === 'USER')
                    this.$router.push({name: 'userView'})
                else
                    this.$router.push({name: 'adminPanel'})
            } catch (error) {
                this.error = error.response.data.error
                alert('Pogresno ste ukucali email ili password');
            }
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
    margin-top: 100px;
}
</style>