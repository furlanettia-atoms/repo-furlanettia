import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import { fetchWebFont } from '@/services'

@Module({ namespaced: true })
export default class AppModule extends VuexModule {
  fetched = false
  landing = true
  explore = false
  shopping = false

  @MutationAction({ mutate: ['explore'] })
  async start () {
    return {
      explore: true,
    }
  }

  @MutationAction({ mutate: ['landing'] })
  async hideLanding () {
    return {
      landing: false,
    }
  }

  @MutationAction({ mutate: ['shopping'] })
  async shop () {
    return {
      shopping: true,
    }
  }

  @Action({ commit: 'complete' })
  async fetch () {
    await fetchWebFont()
  }

  @Mutation
  complete () {
    this.fetched = true
  }
}