<template>
  <use-intersection-observer v-slot="{ observer }">
    <transition name="reveal" appear>
      <section class="floors">
        <div class="floors__visual">
          <FloorsVisual 
            v-intersect="{ observer, key: `floor-visual` }"
            @intersect="onIntersection"
          />
        </div>
        <div class="floors__container">
          <div class="floors__find">
            <button @click="scrollToFirst">
              <span class="text">{{ $t('home.tooltip.intro') }}</span>
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 15.88" fill="currentColor" focusable="false">
                <path d="M14.94 15.87a.9.9 0 0 1-.66-.26l-14-14A.94.94 0 0 1 .27.28.94.94 0 0 1 1.6.27L15 13.67 28.4.27a.94.94 0 0 1 1.33 1.33l-14 14a.93.93 0 0 1-.79.27z"/>
              </svg>
            </button>
          </div>
          <div class="floors__grid">
            <FloorBox 
              v-for="(box, index) of $t('floors.boxes')"
              v-intersect="{ observer, key: `floor-box-${index}` }"
              @click="gtmPush('73', floorsData[$event].gtm)"
              @intersect="onIntersection"
              :key="`floor-box-${index}`"
              :id="`floor-${index}`"
              :index="index"
            />
          </div>
          <div class="floors__more">
            <BaseLink :href="linksData.armani" :target="'_blank'" @click="gtmPush('74', 'armani_com')">
              {{ $t('shared.discover') }}
            </BaseLink>
          </div>
        </div>
      </section>
    </transition>
  </use-intersection-observer>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { Action, State } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { FloorsState } from '@/store/modules/floors/types'
import BaseLink from '@/components/atoms/BaseLink/BaseLink.vue'
import FloorBox from '@/components/molecules/FloorBox/FloorBox.vue'
import FloorsVisual from '@/components/molecules/FloorsVisual/FloorsVisual.vue'
import floorsData from '@/data/floors'
import linksData from '@/data/links'

@Component({
  components: {
    FloorsVisual,
    FloorBox,
    BaseLink,
  }
})
export default class Floors extends Vue {
  @State(({ floors }) => floors)
  floors!: FloorsState

  get floorsData () {
    return floorsData
  }

  get linksData () {
    return linksData
  }
  
  @Action('floors/changeFloor')
  changeFloor!: (floor: number) => void
  
  onIntersection (floor: number) {
    if (this.floors.snapped) return
    this.changeFloor(floor)
  }

  scrollToFirst () {
    gsap.to(window, { 
      scrollTo: {...this.$fn.scrollToFloor(0, this.$matchMedia.queries)},
      ease: 'power2.inOut',
      duration: 1,
    })
  }

  gtmPush (id: string, selection: string) {
    this.$store.dispatch('gtm/push', {
      eventID: id,
      eventAction: 'external_link',
      eventLabel: selection,
    })
  }
}
</script>

<style lang="scss" scoped>
.floors {
  position: relative;
  z-index: 2;

  &__visual {
    @include size(100%, auto);
    //@include size(100%);
    min-height: calc(100vh - 90px);
    min-height: calc(var(--vh) - 90px);
    padding: ($navbar-height-md + 50px) 20px 0;
    flex-direction: column;
    display: flex;

    @include media ($sm-breakpoint) {
      min-height: calc(100vh - 110px);
      min-height: calc(var(--vh) - 110px);
      padding: $navbar-height-sm 20px 0;
    }

    /* @include size(100%, calc(100vh - 110px));
    @include size(100%, calc(var(--vh) - 110px));
    padding: ($navbar-height-md + 50px) 0 0;

    @include media ($sm-breakpoint) {
      padding: $navbar-height-sm 0 0;
    } */
  }

  &__container {
    background-color: $lightE5-color;
  }

  &__find {
    @include size(100%, 90px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;

    @include media ($sm-breakpoint) {
      @include size(100%, 110px);
    }

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

      .text {
        @include aktiv-grotesk-regular;
        letter-spacing: $letter-spacing;
        text-transform: uppercase;
        font-size: 1.2rem;
        color: $dark-blue1F-color;
        margin: 0 0 2px;
      }

      .icon {
        @include size(20px, auto);
        fill: $dark-blue1F-color;
      }
    }
  }

  &__grid {
    @include size(100%, auto);
    padding: 0 20px 40px;
    max-width: 1100px;
    margin: 0 auto;
  }

  &__more {
    @include size(100%, auto);
    padding: 0 20px 60px;
    text-align: center;
    position: relative;

    @include media ($md-breakpoint) {
      padding: 0 20px 80px;
    }
  }

  &.reveal-enter-active, &.reveal-leave-active {
    transition: 2s;
    
    .floors__visual {
      transition: opacity 1s $ease-in-out-cubic;
    }

    /deep/ .visual__emporio {
      transition: transform 2s $ease-out-cubic;
      transform-origin: 50% 100%;
      transform: scale(1);
    }

    .floors__container {
      transition: transform 1s $ease-in-out-cubic;
      transform: translate(0, 0);
    }
  }

  &.reveal-enter, &.reveal-leave-to {
    .floors__visual {
      opacity: 0;
    }

    /deep/ .visual__emporio {
      transform: scale(.9);
    }

    .floors__container {
      transform: translate(0, 90px);

      @include media ($sm-breakpoint) {
        transform: translate(0, 110px);
      }
    }
  }
}
</style>