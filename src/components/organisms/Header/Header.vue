<template>
  <header class="header">
    <NavBar 
      v-if="needsNavBar"
      @hambClick="openMenu"
      @changeLang="changeLang"
    />
    <FloorsBar 
      v-if="needsFloorsBar"
      :currentFloor="floors.current"
      @click="updateFloor($event)"
    />
    <transition name="drawer">
      <Menu 
        v-if="menu.open"
        :currentFloor="floors.current"
        @click="updateFloor($event)"
        @close="closeMenu"
      />
    </transition>
  </header>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { Routes } from '@/router/keys'
import { Action, State } from 'vuex-class'
import { AppState } from '@/store/modules/app/types'
import { MenuState } from '@/store/modules/menu/types'
import { FloorsState } from '@/store/modules/floors/types'
import { Component, Vue } from 'vue-property-decorator'
import FloorsBar from '@/components/molecules/FloorsBar/FloorsBar.vue'
import NavBar from '@/components/molecules/NavBar/NavBar.vue'
import Menu from '@/components/organisms/Menu/Menu.vue'
import floorsData from '@/data/floors'

@Component({
  components: {
    Menu,
    NavBar,
    FloorsBar,
  }
})
export default class Header extends Vue {
  @State(({ app }) => app)
  app?: AppState

  @State(({ menu }) => menu)
  menu!: MenuState

  @State(({ floors }) => floors)
  floors!: FloorsState

  @Action('menu/openMenu')
  openMenu!: () => void

  @Action('menu/closeMenu')
  closeMenu!: () => void

  @Action('floors/changeFloor')
  changeFloor!: (floor: number) => void

  @Action('floors/changeSnap')
  changeSnap!: (snap: boolean) => void

  get needsNavBar () {
    return this.app?.explore
  }

  get needsFloorsBar () {
    return Routes.FLOORS === this.$route.name
  }

  async updateFloor (floor: number) {
    this.$store.dispatch('gtm/push', {
      eventID: '71',
      eventAction: 'menu',
      eventLabel: floorsData[floor].gtm,
    })

    if (Routes.FLOORS !== this.$route.name) {
      await this.$router.push({ name: Routes.FLOORS })
      await this.$timer.defer(2)
    }
    
    gsap.to(window, { 
      onStart: () => this.changeSnap(true),
      onComplete: () => this.changeSnap(false),
      scrollTo: {...this.$fn.scrollToFloor(floor, this.$matchMedia.queries)},
      ease: 'power2.inOut',
      duration: 1.2,
    })

    this.changeFloor(floor)
  }

  async changeLang (lang: string) {
    this.$store.dispatch('gtm/push', {
      eventID: '75',
      eventAction: 'language',
      eventLabel: lang.toUpperCase(),
    })

    location.href = location.href.replace(this.$i18n.locale, lang)
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: static;

  .nav-bar {
    @include position(fixed, 0 null null 0);
    z-index: 5;

    [data-menu-open] &,
    [data-modal-open] & {
      @include position(fixed, 0 var(--sw) null 0);
      width: auto;
    }
  }

  .floors-bar {
    @include position(fixed, $navbar-height-md null null 0);
    z-index: 4;

    @include media ($sm-breakpoint) {
      @include position(fixed, 50% 0 null auto);
      transform: translate(0, -50%);

      [data-menu-open] &,
      [data-modal-open] & {
        @include position(fixed, 50% var(--sw) null auto);
      }
    }
  }

  /deep/ .menu {
    @include position(fixed, 0 null null 0);
    z-index: 10;

    .close-icon {
      [data-menu-open] &,
      [data-modal-open] & {
        @include position(absolute, 0 var(--sw) null null);
      }
    }

    &__container {
      [data-menu-open] &,
      [data-modal-open] & {
        margin-right: var(--sw);
      }
    }
  }
}
</style>