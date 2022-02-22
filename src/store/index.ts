import Vue from 'vue'
import Vuex from 'vuex'

import floors from './modules/floors'
import cookie from './modules/cookie'
import modal from './modules/modal'
import menu from './modules/menu'
import app from './modules/app'
import gtm from './modules/gtm'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    floors,
    cookie,
    modal,
    menu,
    app,
    gtm,
  }
})
