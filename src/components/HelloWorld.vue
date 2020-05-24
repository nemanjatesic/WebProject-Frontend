<template>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }, async mounted(){
    if (!this.$store.state.isUserLoggedIn){
      alert('Please Log In')
      this.$router.push({
          name: 'login'
      })
    }

    if (this.$store.state.user.tipKorisnika === 'ADMIN'){
      this.$router.push({
          name: 'admin'
      })
    }

    if (this.$store.state.user.tipKorisnika === 'USER'){
      this.$router.push({
          name: 'userView'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
