import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state () {
      return {
        token: '',
        is_login_manager: true
      }
    },
    getters: {
      getIsLoginManager (state) {
        return state.is_login_manager
      }
    },
    mutations: {
    //   increment (state) {
    //     state.count++
    //   }
    }
  })

export default store