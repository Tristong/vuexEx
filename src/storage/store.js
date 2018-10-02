import Vue from 'vue'
import Vuex from 'vuex';
import Axios from 'axios'

import Colony from './modules/colony'
import Rate from './modules/rate'

Vue.use(Vuex, Axios);

export default new Vuex.Store({
  modules: {
    Colony,
    Rate
  }
})
