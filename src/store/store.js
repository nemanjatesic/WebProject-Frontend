import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = (token) ? true : false;
    },
    setUser (state, user) {
      state.user = user
      state.isUserLoggedIn = (user) ? true : false;
    },
    setUserReservations (state, reservations) {
      state.user.rezervacije = reservations
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setUserReservations ({commit}, reservations) {
      commit('setUserReservations', reservations)
    }
  }
})