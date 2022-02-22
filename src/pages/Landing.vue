<template>
  <section class="landing">
    <LandingIntro 
      @start="startExperience"
      @leave="hideLandingIntro"
    />
    <transition name="reveal" appear>
      <div 
        class="landing__tooltip"
        :class="{ 'landing__tooltip--shop': app.shopping }"
        v-if="needsTooltip"
        ref="tooltip"
      >
        <div class="tooltip-wrapper">
          <Tooltip @click="onShopping" />
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { Routes } from '@/router/keys'
import { Action, State } from 'vuex-class'
import { AppState } from '@/store/modules/app/types'
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import LandingIntro from '@/components/organisms/Intro/Intro.vue'
import Tooltip from '@/components/atoms/Tooltip/Tooltip.vue'

@Component({
  components: {
    LandingIntro,
    Tooltip,
  }
})
export default class Landing extends Vue {
  @State(({ app }) => app)
  app?: AppState

  @Action('app/start')
  startExperience!: () => void

  @Action('app/hideLanding')
  hideLandingIntro!: () => void

  @Action('app/shop')
  startShopping!: () => void

  @Ref('tooltip')
  $tooltip!: HTMLElement

  @Watch('app.landing')
  onIntroLeave (landing: boolean) {
    if (!landing) {
      this.removeListeners()
    }
  }

  get needsTooltip () {
    return this.app?.explore
  }

  async onShopping () {
    this.$store.dispatch('gtm/push', {
      eventID: '72',
      eventAction: 'banner',
      eventLabel: 'perfect_gift',
    })

    await this.startShopping()
    
    this.$router.push({ name: Routes.FLOORS })
  }

  onTick (time: number) {
    const { mobile } = this.$device
    const { pointer } = this.$gesture

    const winWidth = window.innerWidth
    const winHeight = window.innerHeight

    const boundWidth = winWidth * 1.1
    const boundHeight = winHeight * 1.1

    const swingX = Math.cos(time * .5) * 10
    const swingY = Math.sin(time) * 10

    const offsetX = (winWidth - boundWidth) * .5
    const offsetY = (winHeight - boundHeight) * .5

    const distance = this.$fn.distance({ x: winWidth * .5, y: winHeight * .5 - window.scrollY }, { x: pointer.client.x, y: pointer.client.y })
    
    const x = mobile ? swingX : distance > 130 ? swingX + pointer.normalized.x * offsetX * .5 : pointer.normalized.x * 200
    const y = mobile ? swingY : distance > 130 ? swingY + pointer.normalized.y * offsetY * .5 : pointer.normalized.y * 200 + window.scrollY

    gsap.set(this.$tooltip, { x, y, force3D: true })
  }

  onDrag ([{ event, direction }]: any) { // eslint-disable-line
    if (direction.y < 0) return
    event.preventDefault()
  }

  onSwipe ([{ event, direction }]: any) { // eslint-disable-line
    event.preventDefault()
    
    const dir = direction.y || direction

    if (dir > 0 && !this.app?.explore) {
      this.startExperience()
    }
  }

  addListeners () {
    this.$gesture.addEventListener('drag', this.onDrag)
    this.$gesture.addEventListener('swipe', this.onSwipe)
  }

  removeListeners () {
    this.$gesture.removeEventListener('swipe', this.onSwipe)
    this.$gesture.removeEventListener('drag', this.onDrag)
  }

  mounted () {
    gsap.ticker.add(this.onTick)

    if (!this.app?.explore) {  
      this.addListeners()
    }
  }

  destroyed () {
    gsap.ticker.remove(this.onTick)
    
    this.removeListeners()
  }
}
</script>

<style lang="scss" scoped>
.landing {
  position: relative;
  min-height: 100vh;
  //min-height: var(--vh);
  flex-direction: column;
  //padding: calc(100vh * .05) 20px;
  //padding: calc(var(--vh) * .05) 20px;
  display: flex;
  z-index: 2;

  &__tooltip {
    //@include position(absolute, var(--tp) null null 50%);
    @include position(absolute, 56% null null 50%);
    transition: transform 1.2s $ease-out-cubic;
    
    .tooltip {
      @include position(absolute, 0 null null 0);
      transform: translate3d(-50%, -100%, 0);
    }

    &.reveal-enter-active, &.reveal-leave-active {
      transition-duration: 3s;

      .tooltip-wrapper {
        transition: transform 1.2s $ease-out-cubic 1s, opacity 1.2s $ease-out-cubic 1s;
        transform: translate(0, 0) scale(1);
      }
    }

    &.reveal-enter, &.reveal-leave-to {
      .tooltip-wrapper {
        transform: translate(0, -30px) scale(1.1);
        opacity: 0;
      }
    }

    &--shop {
      &.reveal-enter-active, &.reveal-leave-active {
        transition-duration: 2s;

        .tooltip-wrapper {
          transition: transform 1.2s $ease-out-cubic, opacity 1.2s $ease-out-cubic;
          transform: translate(0, 0) scale(1);
        }
      }
    }
  }

  &.reveal-enter-active, &.reveal-leave-active {
    transition: opacity 1s $ease-in-out-cubic;
  }

  &.reveal-enter, &.reveal-leave-to {
    opacity: 0;
  }
}
</style>