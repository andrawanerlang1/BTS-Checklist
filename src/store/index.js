import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import checklist from './modules/checklist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { Auth, checklist },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
