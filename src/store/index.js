import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) 
export default new Vuex.Store({
  state: {
    userId: localStorage.getItem('userId') || 0
  },
  mutations: {
  	setUserId(state, userId) {
  		state.userId = userId
  		localStorage.setItem("userId",userId)
  	}
  }
})