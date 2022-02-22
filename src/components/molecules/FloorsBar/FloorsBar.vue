<template>
  <use-match-media v-slot="media">
    <transition name="reveal" appear>
      <div class="floors-bar">
        <div class="floors-bar__container" ref="container">
          <ul>
            <li ref="floors"
              v-for="(item, index) of $t('menu')"
              :key="`floor-${index}`"
            >
              <button
                :class="{ 'active': index === currentFloor }"
                @click="onClick(index)"
              >
                <span class="circle" />
                <span class="text">
                  {{ 
                    !media.queries.sm && item.alias 
                      ? item.alias 
                      : item.floor
                  }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </use-match-media>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import { Component, Emit, Prop, Ref, Vue, Watch } from 'vue-property-decorator'

@Component
export default class FloorsBar extends Vue {
  @Prop({ default: -1 })
  currentFloor!: number

  @Ref('container')
  $container!: HTMLElement

  @Ref('floors')
  $floors!: HTMLElement[]

  @Watch('currentFloor')
  onFloorUpdate (floor: number) {
    gsap.to(this.$container, { 
      scrollTo: this.$floors[floor],
      ease: 'power2.inOut',
      duration: .6,
    })
  }

  @Emit('click')
  onClick (index: number) {
    return index
  }
}
</script>

<style lang="scss" scoped>
.floors-bar {
  @include size(100%, 50px);
  overflow: hidden;
  
  @include media ($sm-breakpoint) {
    @include size(54px, auto);
  }

  &__container {
    @include size(auto, 100%);
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: $lightB7-color;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @include media ($sm-breakpoint) {
      justify-content: center;
      overflow: hidden;
    }
  }

  ul {
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;

    @include media ($sm-breakpoint) {
      flex-direction: column;
      align-items: center;
      padding: 5px 0;
      margin: 0;
    }

    li {
      padding: 0 10px;

      @include media ($sm-breakpoint) {
        padding: 2px 0;
      }

      button {
        @include size(36px);
        @include acta-display-book;
        transition: color .4s $ease-in-out-cubic;
        white-space: nowrap;
        position: relative;
        appearance: none;
        background: none;
        cursor: pointer;
        font-size: 1.8rem;
        color: $dark-blue1F-color;
        padding: 0;
        border: 0;

        @include media ($sm-breakpoint) {
          font-size: 1.4rem;
        }

        .circle {
          @include size(100%);
          @include position(absolute, 0 null null 0);
          transition: transform .4s $ease-in-out-cubic, opacity .4s $ease-in-out-cubic;
          background-color: $dark-blue20-color;
          transform: scale(0);
          border-radius: 50%;
          display: block;
          z-index: 0;
          opacity: 0;
        }

        .text {
          position: relative;
          z-index: 1;
        }

        &.active {
          color: $lightE5-color;

          .circle {
            opacity: 1;
            transform: scale(1);
          }
        }
      }

      &:first-child {
        padding: 0 10px 0 15px;

        @include media ($sm-breakpoint) {
          padding: 2px 0;
        }

        button {
          @include size(auto, 36px);
          padding: 0 10px;

          @include media ($sm-breakpoint) {
            @include size(36px);
            padding: 0;
          }

          .circle {
            //background-color: transparent;
            border-radius: 999px;

            @include media ($sm-breakpoint) {
              background-color: $dark-blue20-color;
            }
          }
        }
      }

      &:last-child {
        padding: 0 20px 0 10px;

        @include media ($sm-breakpoint) {
          padding: 2px 0;
        }
      }
    }
  }

  &.reveal-enter-active, &.reveal-leave-active {
    transition: 2s;

    .floors-bar__container {
      transition: transform 1s $ease-in-out-cubic 1s;
      transform: translate(0, 0);
    }
  }

  &.reveal-enter, &.reveal-leave-to {
    .floors-bar__container {
      transform: translate(0, -100%);

      @include media ($sm-breakpoint) {
        transform: translate(100%, 0);
      }
    }
  }
}
</style>