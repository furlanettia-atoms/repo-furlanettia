import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ModalModule extends VuexModule {
  open = false
  content = ''

  @MutationAction({ mutate: ['open', 'content'] })
  async openModal (content: string) {
    document.documentElement.setAttribute('data-modal-open', '')
    return {
      open: true,
      content,
    }
  }

  @MutationAction({ mutate: ['open'] })
  async closeModal () {
    document.documentElement.removeAttribute('data-modal-open')
    return {
      open: false,
    }
  }
}