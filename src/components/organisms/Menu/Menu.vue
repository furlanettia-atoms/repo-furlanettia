<template>
  <div class="menu">
    <CloseIcon
      @click="onClose"
    />
    <div class="menu__container">
      <div class="menu__head">
        <span class="icon" />
        <div class="title">
          <h2>{{ $t('shared.emporio') }}</h2>
        </div>
        <div class="subtitle">
          <p>{{ $t('shared.floors') }}</p>
        </div>
      </div>
      <div class="menu__body">
        <ul>
          <li
            v-for="(item, index) of $t('menu')"
            :key="`floor-${index}`"
          >
            <span>{{ item.floor }}</span>
            <a 
              :href="`#floor-${index}`"
              :class="{ 'active': index === currentFloor }"
              @click.prevent="onClick(index)"
            >
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import CloseIcon from '@/components/atoms/CloseIcon/CloseIcon.vue'

@Component({
  components: {
    CloseIcon,
  }
})
export default class Menu extends Vue {
  @Prop({ default: -1 })
  currentFloor!: number
  
  @Emit('click')
  onClick (index: number) {
    this.onClose()
    return index
  }

  @Emit('close')
  onClose () {
    return
  }
}
</script>

<style lang="scss" scoped>
.menu {
  @include size(100%);
  position: relative;
  background-color: $dark-blue1F-color;
  cursor: default;

  .close-icon {
    @include position(absolute, 0 0 null null);
    transform: translate(-10px, 25px);
    z-index: 2;
    
    @include media ($md-breakpoint) { 
      transform: translate(-20px, 25px);
    }
  }

  &__container {
    @include size(auto, 100%);
    position: relative;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    overflow: auto;
    padding: 80px 0 40px;
    -webkit-overflow-scrolling: touch;

    @include media ($md-breakpoint) {
      justify-content: center;
      padding: 40px 0;
    }
  }

  &__head {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 2rem;
    flex-shrink: 0;

    .icon {
      @include size(10px);
      border: 1px solid $lightB7-color;
      transform: rotate(45deg);
      display: block;
    }

    .title {
      @include acta-display-book;
      text-transform: uppercase;
      letter-spacing: .1em;
      margin: 1rem 0 1.2rem;
      font-size: 3rem;

      @include media ($md-breakpoint) { 
        
      }
    }

    .subtitle {
      @include aktiv-grotesk-regular;
      letter-spacing: $letter-spacing;
      text-transform: uppercase;
      font-size: .9rem;
      color: $lightB7-color;
      align-items: center;
      display: flex;

      @include media ($md-breakpoint) { 
        font-size: 1.2rem;
      }

      &::before,
      &::after {
        @include size(5px, 1px);
        background-color: $lightB7-color;
        display: inline-block;
        content: '';
      }

      &::before {
        margin: 0 8px 0 0;
      }

      &::after {
        margin: 0 0 0 8px;
      }
    }
  }

  &__body {
    ul {
      @include size(100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      li {
        @include acta-display-book;
        letter-spacing: $letter-spacing;
        flex-direction: column;
        align-items: center;
        display: flex;
        margin: 1rem 0;

        > span {
          color: $lightB7-color;
          font-size: 2.1rem;

          @include media ($md-breakpoint) { 
            font-size: 1.6rem;
          }
        }

        > a {
          color: $white-color;
          text-decoration: none;
          font-size: 2.1rem;

          @include media ($md-breakpoint) { 
            font-size: 2.1rem;
          }

          &.active {
            color: $lightB7-color;
            cursor: default;
            pointer-events: none;
          }
        }
      }
    }
  }

  &.drawer-enter-active,
  &.drawer-leave-active {
    transition: transform .8s $ease-in-out-cubic, opacity .8s $ease-in-out-cubic, visibility (1s + .08s * 6);

    @include media ($md-breakpoint) {
      transition: transform 1s $ease-in-out-cubic, opacity 1s $ease-in-out-cubic, visibility (1s + .08s * 6);

      .menu {
        &__body {
          ul {
            li {
              transition: transform 1s $ease-in-out-cubic, opacity 1s $ease-in-out-cubic;
              @for $i from 0 through 7 {
                &:nth-child(#{$i+1}) {
                  transition-delay: $i * .06s;
                }
              }
            }
          }
        }
      }
    }
  }

  &.drawer-enter, 
  &.drawer-leave-to {
    transform: translate3d(100%, 0, 0);

    @include media ($md-breakpoint) {
      transform: translate3d(0, 0, 0) scale(1.075);
      opacity: 0;

      .menu {
        &__body {
          ul {
            li {
              transform: translate3d(0, 60px, 0);
              opacity: 0;
              @for $i from 0 through 7 {
                &:nth-child(#{$i+1}) {
                  transition-delay: (8 - $i) * .06s;
                }
              }
              
            }
          }
        }
      }
    }
  }
}
</style>