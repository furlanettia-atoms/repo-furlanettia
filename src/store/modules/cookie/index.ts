import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Cookies from 'js-cookie'

const Cookie = { NAME: process.env.VUE_APP_COOKIE_NAME as string }

@Module({ namespaced: true })
export default class CookieModule extends VuexModule {
  accepted = Cookies.get(Cookie.NAME) !== undefined

  @Action({ commit: 'setAccepted' })
  async accept () {
    Cookies.set(Cookie.NAME, '1') // { expires: 30 }
  }

  @Mutation
  setAccepted () {
    this.accepted = true
  }
}