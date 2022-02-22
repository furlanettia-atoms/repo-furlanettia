<template>
  <div class="floor-box">
    <div class="floor-box__image">
      <a :href="floorsData[index].link" target="_blank">
        <AspectRatio :value="'1x1'">
          <!-- <img :src="floorsData[index].image" :alt="$t(`menu[${index}].label`)"> -->
          <picture :class="{ 'lazy': !loaded }">
            <source :srcset="floorsData[index].image.webp" type="image/webp">
            <source :srcset="floorsData[index].image.jpg" type="image/jpeg"> 
            <img :src="floorsData[index].image.jpg" :alt="$t(`menu[${index}].label`)" @load="loaded=true">
          </picture>
        </AspectRatio>
      </a>
    </div>
    <div class="floor-box__panel">
      <div class="floor-box__container">
        <div class="background" />
        <div class="floor">
          <h3>{{ `${index === 0 ? '' : $t('shared.floor')} ${$t(`menu[${index}].floor`)}` }}</h3>
        </div>
        <div class="title">
          <h2>{{ $t(`menu[${index}].label`) }}</h2>
        </div>
        <div class="text">
          <p data-gsap-text>{{ $t(`floors.boxes[${index}].text`) }}</p>
        </div>
        <div class="cta">
          <PrimaryButton
            :label="$t(`floors.boxes[${index}].cta`) || $t('shared.selection')"
            :href="floorsData[index].link"
            :target="'_blank'"
            :withIcon="true"
            :asLink="true"
            @click="onClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Emit, Prop } from 'vue-property-decorator'
import AspectRatio from '@/components/atoms/AspectRatio/AspectRatio.vue'
import PrimaryButton from '@/components/atoms/PrimaryButton/PrimaryButton.vue'
import Tween from './FloorBox.Tween'
import floorsData from '@/data/floors'

@Component({
  components: {
    AspectRatio,
    PrimaryButton,
  }
})
export default class FloorBox extends mixins(Tween) {
  @Prop()
  index!: number

  loaded = false

  get floorsData () {
    return floorsData
  }

  @Emit('intersect')
  onIntersection () {
    return this.index
  }

  @Emit('click')
  onClick () {
    return this.index
  }
}
</script>

<style lang="scss" scoped>
.floor-box {
  margin: 0 0 40px;

  @include media ($md-breakpoint) {
    justify-content: center;
    align-items: center;
    cursor: default;
    display: flex;
    margin: 0 0 5vh;
  }

  &:nth-child(odd) {
    flex-direction: row;

    .floor-box {
      &__panel {
        @include media ($lg-breakpoint) {
          padding: 0 0 0 60px;
        }
      }
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    .floor-box {
      &__panel {
        @include media ($lg-breakpoint) {
          padding: 0 60px 0 0;
        }
      }
    }
  }

  &__image {
    @include size(100%, auto);
    position: relative;
    margin: 0 0 -50px;
    z-index: 1;

    @include media ($md-breakpoint) {
      @include size(50%, auto);
      margin: 0;
    }

    a {
      position: relative;
      display: block;
    }

    picture {
      transition: opacity 1s $ease-in-out-cubic;
      opacity: 1;

      &.lazy {
        opacity: 0;
      }
    } 
  }

  &__container {
    @include size(100%, auto);
    padding: 30px 0px 40px;
    position: relative;

    @include media ($md-breakpoint) {
      padding: 60px 0px 80px;
    }
  }

  &__panel {
    @include size(100%, auto);
    position: relative;
    text-align: center;
    z-index: 2;

    @include media ($md-breakpoint) {
      @include size(50%, auto);
    }

    .background {
      @include size(100%);
      @include position(absolute, 0 null null 0);
      background-color: $dark-blue20-color;
    }

    .floor {
      @include acta-display-book;
      font-size: 2.2rem;
      color: $lightB7-color;
      overflow: hidden;

      @include media ($md-breakpoint) {
        font-size: 2.4rem;
      }
    }

    .title {
      @include acta-display-book;
      font-size: 3.8rem;
      line-height: 1.1;
      overflow: hidden;
      margin: 20px 0;

      @include media ($md-breakpoint) {
        
      }
    }

    .text {
      @include acta-display-book;
      margin: 20px 20px 30px;
      font-size: 1.4rem;
      line-height: 1.6;
      overflow: hidden;

      @include media ($md-breakpoint) {
        margin: 30px 40px 40px;
        font-size: 1.5rem;
      }
      
      @include media ($lg-breakpoint) {
        margin: 50px 70px 50px;
      }

      /deep/ .line {
        overflow: hidden;
      }
    }

    .cta {
      overflow: hidden;
    }
  }

  ::selection {
    background-color: $lightE5-color;
    color: $dark-blue20-color;
  }

  &[data-intersect-key*="floor-box"] {
    .floor-box {
      &__image {
        img {
          transition: transform 1.2s $ease-in-out-cubic, opacity 1.2s $ease-in-out-cubic, filter 1.2s $ease-in-out-cubic;
          transform: scale(1.15);
          //filter: blur(5px);
          opacity: 0;
        }
      } 

      &__panel {
        .background {
          transition: transform 1s $ease-in-out-cubic;
          transform-origin: center top;
          transform: scale(1, 0);
        }

        .floor h3 {
          transition: transform .8s $ease-in-out-cubic;
          transform: translate(0, 120%);
        }

        .title h2 {
          transition: transform .8s $ease-in-out-cubic;
          transform: translate(0, 120%);
        }

        .text {
          /deep/ .line {
            @for $i from 1 through 20 {
              &:nth-child(#{$i}) {
                .line__inner {
                  transition: transform .8s $ease-in-out-cubic;
                  transform: translate(0, 120%);
                }
              }
            }
          }
        }

        .cta a {
          transition: transform .8s $ease-in-out-cubic;
          transform: translate(0, 120%);
        }
      }
    }
  }

  &[data-intersect-active] {
    .floor-box {
      &__image {
        img {
          transition-timing-function: $ease-out-cubic;
          transform: scale(1);
          //filter: blur(0);
          opacity: 1;
        }
      }

      &__panel {
        .background {
          transition-timing-function: $ease-out-cubic;
          transform: scale(1, 1);
        }

        .floor h3 {
          transition-timing-function: $ease-out-cubic;
          transform: translate(0, 0);
        }
        
        .title h2 {
          transition-delay: .12s;
          transition-timing-function: $ease-out-cubic;
          transform: translate(0, 0);
        }

        .text {
          /deep/ .line {
            @for $i from 1 through 20 {
              &:nth-child(#{$i}) {
                .line__inner {
                  transition-delay: .12s + .08s * $i;
                  transition-timing-function: $ease-out-cubic;
                  transform: translate(0, 0);
                }
              }
            }
          }
        }

        .cta a {
          transition-delay: .2s;
          transition-timing-function: $ease-out-cubic;
          transform: translate(0, 0);
        }
      }
    }
  }
}
</style>