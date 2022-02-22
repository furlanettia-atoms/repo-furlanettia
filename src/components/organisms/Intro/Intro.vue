<template>
  <use-match-media v-slot="media">
    <div 
      class="landing__intro"
      :class="[
        { 'landing__intro--hide': !app.landing },
        { 'landing__intro--shop': app.shopping },
      ]"
    >
      <div class="landing__logo">
        <LogoIcon ref="logo" data-gsap-logo />
      </div>
      <div class="landing__title" data-gsap-title-wrap>
        <h1 v-if="media.queries.md" data-gsap-title>{{ $t('name') }}</h1>
        <h1 v-else data-gsap-title>{{ $t('name').replace(' ', '') }}</h1>
      </div>
      <div class="landing__xmas">
        <h2 data-gsap-xmas>{{ $t('landing.xmas') }}</h2>
      </div>
      <div class="landing__text">
        <p v-html="$t('landing.text')" data-gsap-text />
      </div>
      <div class="landing__start">
        <button @click="onClick" tabindex="-1" data-gsap-btn>
          <span class="text">
            <span data-gsap-btn-text>{{ $t('landing.cta') }}</span>
          </span>
          <span class="icon" data-gsap-btn-icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 15.88" fill="currentColor" focusable="false">
              <path d="M14.94 15.87a.9.9 0 0 1-.66-.26l-14-14A.94.94 0 0 1 .27.28.94.94 0 0 1 1.6.27L15 13.67 28.4.27a.94.94 0 0 1 1.33 1.33l-14 14a.93.93 0 0 1-.79.27z"/>
            </svg>
          </span>
        </button>
        <!-- <div class="landing__loop">
          <LoopIcon data-gsap-loop />
        </div> -->
      </div>
    </div>
  </use-match-media>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { State } from 'vuex-class'
import { mixins } from 'vue-class-component'
import { AppState } from '@/store/modules/app/types'
import { Component, Emit, Watch } from 'vue-property-decorator'
import LogoIcon from '@/components/atoms/LogoIcon/LogoIcon.vue'
import LoopIcon from '@/components/atoms/LoopIcon/LoopIcon.vue'
import Tween from './Intro.Tween'

@Component({
  components: {
    LogoIcon,
    LoopIcon,
  }
})
export default class Intro extends mixins(Tween) {
  @State(({ app }) => app)
  app?: AppState
  
  $el!: HTMLElement

  @Watch('app.explore', { immediate: true })
  async onExplore (explore: boolean) {
    await this.$nextTick()

    !explore 
      ? gsap.timeline({ delay: .3, onComplete: this.onReady })
            .add(this.nameEnter(this.$el), '<')
            .add(this.logoEnter(this.$el), '<+.1')
            .add(this.xmasEnter(this.$el), '<+.1')
            .add(this.textEnter(this.$el), '<+.1')
            .add(this.ctaEnter(this.$el), '<+.4')
      : !this.app?.shopping
        ? gsap.timeline({ onComplete: this.onLeave })
              .add(this.logoLeave(this.$el), '<')
              .add(this.nameLeave(this.$el), '<')
              .add(this.xmasLeave(this.$el), '<')
              .add(this.textLeave(this.$el), '<')
              .add(this.ctaLeave(this.$el), '<')
        : this.nameReset(this.$el)
  }
  
  @Emit('ready')
  onReady () {
    return
  }

  @Emit('start')
  onClick () {
    return
  }

  @Emit('leave')
  onLeave () {
    return
  }
}
</script>

<style lang="scss" scoped>
.landing {
  &__intro {
    @include size(100%, 100vh);
    @include size(100%, var(--vh));
    padding: calc(100vh * .05) 20px;
    padding: calc(var(--vh) * .05) 20px;
    position: relative;
    text-align: center;
    max-width: 760px;
    margin: 0 auto;
    //flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include media ($sm-breakpoint) {
      justify-content: center;
    }

    &--shop,
    &--hide {
      .landing {
        &__logo,
        &__xmas,
        &__text,
        &__start {
          visibility: hidden;
        }

        &__title {
          @include media ($md-breakpoint) {
            visibility: hidden;
          }
        }
      }
    }
  }

  &__logo {
    display: flex;
    overflow: hidden;
    flex-direction: row;
    justify-content: center;
    margin: 0 0 10px;

    @include media ($sm-breakpoint) {
      margin: 0 0 6vh;
    }
  }

  &__title {
    @include acta-display-book;
    text-transform: uppercase;
    letter-spacing: .075em;
    font-size: calc(100vh * .1);
    font-size: calc(var(--vh) * .1);
    color: $lightE5-color;
    line-height: 1;

    @include media ($sm-breakpoint) {
      font-size: 6rem;
      margin: 0 0 3vh;
    }

    h1 {
      display: flex;
      flex-direction: column;
    }

    /deep/ .word {
      overflow: hidden;
      white-space: nowrap;

      .char {
        animation: {
          duration: 5s;
          name: glow-loop;
          timing-function: linear;
          iteration-count: infinite;
        }

        @for $i from 1 through 8 {
          &:nth-child(#{$i}) {
            animation-delay: .12s * $i;
          }
        }
      }
    }
  }

  &__xmas {
    @include acta-display-book;
    overflow: hidden;
    margin: 0 0 10px;
    font-size: 3rem;

    @include media ($sm-breakpoint) {
      margin: 0 0 5vh;
    }
  }

  &__text {
    @include acta-display-book;
    color: $white-color;
    font-size: 1.4rem;
    line-height: 1.5;
    margin: 0 0 10px;
    
    @include media ($xs-breakpoint) {
      padding: 0 30px;
    }

    @include media ($sm-breakpoint) {
      font-size: 1.5rem;
      margin: 0 0 8vh;
    }

    /deep/ .line {
      overflow: hidden;
      //white-space: nowrap;
    }
  }

  &__start {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    display: flex;

    button {
      appearance: none;
      background: none;
      padding: 0;
      margin: 0;
      border: 0;
      display: flex;
      cursor: pointer;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      transition: transform .6s $ease-in-out-cubic .5s, opacity .6s $ease-in-out-cubic .5s;

      &[data-hidden] {
        pointer-events: none;
        cursor: default;
      }

      .text {
        @include aktiv-grotesk-regular;
        letter-spacing: $letter-spacing;
        text-transform: uppercase;
        color: $white-color;
        font-size: 1.3rem;
        overflow: hidden;
        margin: 0 0 8px;

        @include media ($md-breakpoint) {
          font-size: 1.4rem;
        }

        > span {
          display: inline-block;
        }
      }

      .icon {
        @include size(20px, auto);
        margin: 0 auto;

        svg {
          @include size(100%);
          fill: $white-color;
          animation: {
            duration: 4s;
            name: arrow-loop;
            timing-function: linear;
            iteration-count: infinite;
          }
        }
      }
    }

    .landing__loop {
      @include size(70px, auto);
      @include position(absolute, 0 null null 50%);
      transition: transform .6s $ease-in-out-cubic, opacity .6s $ease-in-out-cubic, visibility .6s $ease-in-out-cubic;
      transform: translate(-50%, 0);
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
      z-index: 1;

      .loop-icon {
        @include size(100%);
      }
    }

    &--pending {
      button {
        opacity: 0;
      }

      .landing__loop {
        pointer-events: auto;
        visibility: visible;
        opacity: 1;
      }
    }
  } 
}

@keyframes glow-loop {
  0%, 20% {
    text-shadow: 0 0 0 $white-color;
  }

  10% {
    text-shadow: 0 0 10px $white-color;
  }
}

@keyframes arrow-loop {
  0%, 10%, 20%  {
    transform: translate(0, 0);
  }

  5%, 15%  {
    transform: translate(0, 8px);
  }
}
</style>