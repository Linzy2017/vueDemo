/**
 * Created by LQZ on 2017/8/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  modules: {
  }
})
