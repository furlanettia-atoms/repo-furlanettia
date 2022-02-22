<template>
  <button class="close-icon" @click="onClick" :aria-label="$t('shared.close')" />
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class CloseIcon extends Vue {
  @Emit('click')
  onClick () {
    return
  }
}
</script>

<style lang="scss" scoped>
.close-icon {
  @include size(44px);
  position: relative;
  appearance: none;
  background: none;
  cursor: pointer;
  display: block;
  padding: 0;
  border: 0;
  margin: 0;


  &::before,
  &::after {
    @include size(32px, 1px);
    @include position(absolute, 50% null null 50%);
    transform: translate(-50%, -50%);
    background-color: $white-color;
    content: '';

    @include media ($md-breakpoint) { 
      @include size(40px, 1px);
    }
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>