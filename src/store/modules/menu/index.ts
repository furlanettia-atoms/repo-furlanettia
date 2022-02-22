import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class MenuModule extends VuexModule {
  open = false

  @MutationAction({ mutate: ['open'] })
  async openMenu () {
    document.documentElement.setAttribute('data-menu-open', '')
    return {
      open: true,
    }
  }

  @MutationAction({ mutate: ['open'] })
  async closeMenu () {
    document.documentElement.removeAttribute('data-menu-open')
    return {
      open: false,
    }
  }
}