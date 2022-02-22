<template>
  <transition name="reveal" appear>
    <div class="city">
      <div class="city__container">
        <div class="city__wrapper" ref="wrapper">
          <!-- <img src="@/assets/img/city-map.jpg" alt=""> -->
          <picture :class="{ 'lazy': !loaded }">
            <source srcset="@/assets/img/city-map.webp" type="image/webp">
            <source srcset="@/assets/img/city-map.jpg" type="image/jpeg"> 
            <img src="@/assets/img/city-map.jpg" alt="" @load="loaded=true">
          </picture>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import { gsap } from 'gsap'

@Component
export default class City extends Vue {
  @Ref('wrapper')
  $wrapper!: HTMLElement

  loaded = false

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
    
    const x = mobile ? swingX : swingX + pointer.normalized.x * offsetX * .5
    const y = mobile ? swingY : swingY + pointer.normalized.y * offsetY * .5

    gsap.set(this.$wrapper, { x, y, force3D: true })
  }

  mounted () {
    gsap.ticker.add(this.onTick)
  }

  destroyed () {
    gsap.ticker.remove(this.onTick)
  }
}
</script>

<style lang="scss" scoped>
.city {
  @include size(100%, 100vh);
  //@include size(100%, var(--vh));
  @include position(absolute, 0 null null 0);
  overflow: hidden;
  z-index: 0;

  &__container {
    @include size(100%);
    @include position(absolute, 0 null null 0);
  }

  &__wrapper {
    @include size(100%);
    @include position(absolute, 0 null null 0);
    transition: transform 1.2s $ease-out-cubic;
  }

  picture {
    transition: opacity 1s $ease-in-out-cubic;
    opacity: 1;

    &.lazy {
      opacity: 0;
    }
  }

  img {
    @include size(110%);
    @include position(absolute, 55% null null 50%);
    transform: translate(-50%, -50%);
    object-fit: cover;
    display: block;
  }

  &.reveal-enter-active, &.reveal-leave-active {
    transition: transform 2s $ease-in-out-cubic 0s, opacity 2s $ease-in-out-cubic 0s;
    transform: translate(0, 0) scale(1);
  }

  &.reveal-enter {
    transform: translate(0, 50%) scale(1.1);
    opacity: 0;
  }

  &.reveal-leave-to {
    transform: scale(1.1);
    opacity: 0;
  }
}
</style>