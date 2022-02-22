<template>
  <transition
    :css="false"
    :appear="true"
    @enter="enter"
    @leave="leave"
  >
    <div class="visual">
      <div class="visual__display">
        <div class="visual__title">
          <h2 data-gsap-title>{{ $t('shared.emporio') }}</h2>
        </div>
        <div class="visual__text">
          <p v-html="$t('floors.landing.text')" data-gsap-text />
        </div>
      </div>
      <div class="visual__emporio" :class="{ 'lazy': !loaded }">
        <img src="@/assets/img/emporio.svg" :alt="$t('shared.emporio')" @load="loaded=true">
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Emit } from 'vue-property-decorator'
import Tween from './FloorsVisual.Tween'

@Component
export default class FloorsVisual extends mixins(Tween) {
  loaded = false

  @Emit('intersect')
  onIntersection () {
    return -1
  }
}
</script>

<style lang="scss" scoped>
.visual {
  @include size(100%);
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-grow: 1;

  &__display {
    @include size(100%, auto);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    margin: 4vh 0 3vh;
  }

  &__title {
    text-align: center;
    line-height: 1;
    padding: 0 20px;
    margin: 0 0 3vh;
    overflow: hidden;
    
    h2 {
      @include acta-display-book;
      text-transform: uppercase;
      letter-spacing: .1em;
      font-size: 4rem;

      @include media ($md-breakpoint) { 
        font-size: 5rem;
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
  }

  &__text {
    max-width: 580px;
    text-align: center;
    line-height: 1.6;
    padding: 0;
    
    @include media ($xs-breakpoint) { 
      //padding: 0 20px;
    }

    p {
      @include acta-display-book;
      letter-spacing: .025em;
      color: $white-color;
      font-size: 1.4rem;

      @include media ($md-breakpoint) { 
        font-size: 1.5rem;
      }
    }

    /deep/ .line {
      overflow: hidden;
      //white-space: nowrap;
    }
  }

  &__emporio {
    @include size(100%, auto);
    flex-grow: 0;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    img {
      @include size(100%, auto);
      transition: opacity 1s $ease-in-out-cubic;
      max-width: 100%;
      display: block;
      opacity: 1;

      @include media ($sm-breakpoint) {
        max-width: 600px
      }

      @include media ($md-breakpoint) {
        max-width: 600px;
      }

      @include media ($xl-breakpoint) { 
        max-width: 700px;
      }
    }

    &.lazy {
      img {
        opacity: 0;
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
</style>