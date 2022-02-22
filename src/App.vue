<template>
  <main id="app" 
    v-if="app.fetched"
    :class="{ 'app--landing': app.landing }"
  >
    <Stage />
    <Header />
    <transition name="reveal" mode="out-in" appear>
      <router-view />
    </transition>
    <Footer 
      v-if="!app.landing"
    />
    <Cookie
      v-if="!cookie.accepted"
      @accept="acceptCookie"
    />
  </main>
</template>

<script lang="ts">
import { Action, State } from 'vuex-class'
import { AppState } from '@/store/modules/app/types'
import { CookieState } from '@/store/modules/cookie/types'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/organisms/Header/Header.vue'
import Footer from '@/components/organisms/Footer/Footer.vue'
import Cookie from '@/components/organisms/Cookie/Cookie.vue'
import Stage from '@/components/organisms/Stage/Stage.vue'

@Component({
  components: {
    Header,
    Footer,
    Cookie,
    Stage,
  }
})
export default class App extends Vue {
  @State(({ app }) => app)
  app!: AppState

  @State(({ cookie }) => cookie)
  cookie!: CookieState

  @Action('app/fetch')
  fetch!: () => void

  @Action('cookie/accept')
  acceptCookie!: () => void
  
  @Watch('$route')
  onRouteChange () {
    this.$resizeObserver.update()
  }

  async mounted () {
    await this.fetch()
  }
}
</script>

<style lang="scss" scoped>
#app {
  @include size(100%, auto);
  min-height: 100%;
  min-height: 100vh;
  position: static;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dark-blue20-color;

  &.app {
    &--landing {
      @include size(100%);
      @include position(fixed, 0 null null 0);
    }
  }
}
</style>