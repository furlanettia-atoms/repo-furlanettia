import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class FloorsModule extends VuexModule {
  current = -1
  snapped = false

  @MutationAction({ mutate: ['current'] })
  async changeFloor (current: number) {
    return {
      current,
    }
  }

  @MutationAction({ mutate: ['snapped'] })
  async changeSnap (snapped: boolean) {
    return {
      snapped,
    }
  }
}