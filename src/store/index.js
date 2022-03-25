import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

const TokenKey = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem(TokenKey))
    user: getItem(TokenKey)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // window.localStorage.setItem(TokenKey, JSON.stringify(state.user))
      setItem(TokenKey, state.user)
    }
  },
  actions: {},
  modules: {}
})
