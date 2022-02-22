<template>
  <div class="tooltip">
    <div class="tooltip__wrapper" @click="onClick">
      <div class="tooltip__container">
        <div class="tooltip__intro">
          <span>{{ $t('home.tooltip.intro') }}</span>
        </div>
        <div class="tooltip__title">
          <span>{{ $t('shared.emporio') }}</span>
        </div>
        <div class="tooltip__cta">
          <span>{{ $t('home.tooltip.cta') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class Tooltip extends Vue {
  @Emit('click')
  onClick () {
    return
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-flex;

  &__wrapper {
    background-color: $dark-blue19-color;
    padding: 6px 6px 8px;
    cursor: pointer;
  }

  &__container {
    border: .5px solid rgba($white-color, .5);
    padding: 30px 25px 45px;
    justify-content: center;
    flex-direction: column;
    display: inline-flex;
    align-items: center;
    text-align: center;
    padding: 25px 20px;
  }

  &__intro {
    @include aktiv-grotesk-regular;
    letter-spacing: $letter-spacing;
    text-transform: uppercase;
    color: $lightB7-color;
    font-size: .9rem;
    margin: 0 0 6px;

    @include media ($md-breakpoint) { 
      font-size: 1rem;
    }
  }

  &__title {
    @include acta-display-book;
    text-transform: uppercase;
    letter-spacing: $letter-spacing;
    white-space: nowrap;
    font-size: 2.4rem;

    @include media ($md-breakpoint) { 
      font-size: 2.8rem;
    }
  }

  &__cta {
    @include aktiv-grotesk-regular;
    letter-spacing: $letter-spacing;
    text-transform: uppercase;
    color: $lightB7-color;
    white-space: nowrap;
    position: relative;
    font-size: .9rem;
    margin: 2px 0 0;
    padding: 4px 0;

    @include media ($md-breakpoint) { 
      font-size: 1rem;
    }

    &::after {
      @include size(auto, 1px);
      @include position(absolute, null 0 0 0);
      background-color: $lightB7-color;
      content: '';
    }
  }

  &::after {
    @include triangle('down', 34px, 17px, $dark-blue19-color);
    @include position(absolute, null null 0 50%);
    transform: translate(-50%, 16px);
    content: '';
  }
}
</style>