<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
        <router-link class="navbar-brand" :to="{ name: 'root'}">Web project</router-link>
        <div id="navb" class="navbar-collapse collapse hide">
            <ul class="navbar-nav">
                <li v-if="$store.state.isUserLoggedIn" class="nav-item active">
                    <router-link class="nav-link" :to="{ name: 'root' }">Front page</router-link>
                </li>
                <!-- <li v-if="$store.state.isUserLoggedIn" class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'createPost'}">Create post</router-link>
                </li> -->
            </ul>

            <ul class="nav navbar-nav ml-auto">
                <li v-if="!$store.state.isUserLoggedIn" class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'register'}">Register</router-link>
                </li>
                <li v-if="!$store.state.isUserLoggedIn" class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'login'}">Log in</router-link>
                </li>
                <li v-if="$store.state.isUserLoggedIn" class="nav-item">
                     <b-avatar></b-avatar>
                </li>
                <li v-if="$store.state.isUserLoggedIn" class="nav-item">
                     <div class="nav-link disabled">{{$store.state.user.username}} | Type : {{$store.state.user.tipKorisnika}}</div>
                </li>
                <li v-if="$store.state.isUserLoggedIn && $store.state.user.tipKorisnika === 'USER'" class="nav-item">
                    <div class="nav-link" :to="logout" >Reservations : {{$store.state.user.rezervacije.length}}</div>
                </li>
                <li v-if="$store.state.isUserLoggedIn" @click="logout"  class="nav-item">
                    <div class="nav-link" :to="logout" >Log out</div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'root'
            })
        }
    }
}
</script>

<style>
  .nav-link{
    cursor: pointer;
  }
</style>