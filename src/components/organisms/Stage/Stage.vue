<template>
  <section class="stage">
    <City v-if="needsCity" />
    <Snow />
  </section>
</template>

<script lang="ts">
import { State } from 'vuex-class'
import { Routes } from '@/router/keys'
import { AppState } from '@/store/modules/app/types'
import { Component, Vue } from 'vue-property-decorator'
import City from '@/components/organisms/Stage/City/City.vue'
import Snow from '@/components/organisms/Stage/Snow/Snow.vue'

@Component({
  components: {
    City,
    Snow,
  }
})
export default class Stage extends Vue {
  @State(({ app }) => app)
  app?: AppState

  get needsCity () {
    return Routes.LANDING === this.$route.name && this.app?.explore
  }
}
</script>

<style lang="scss" scoped>
.stage {
  position: static;
}
</style>