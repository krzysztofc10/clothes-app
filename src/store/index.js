import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      user: {
          userId: null,
          name: '',
          surname: '',
          email: '',
          avatar: ''
      }
  },
  getters: {
      getUserId: (state) => state.user.userId,
      getUserAvatar: (state) => state.user.avatar
  }, 
  mutations: {
      setName: (state, payload) => state.user.name = payload,
      setSurname: (state, payload) => state.user.surname = payload,
      setUserId: (state, payload) => state.user.userId = payload,
      setEmail: (state, payload) => state.user.email = payload,
      setAvatar: (state, payload) => state.user.avatar = payload
  },
  actions: {
  },
  modules: {
  }
})
