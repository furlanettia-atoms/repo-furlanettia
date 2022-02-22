<template>
  <button class="hamb-icon" @click="onClick">
    <span class="icon" />
  </button>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

@Component
export default class HambIcon extends Vue {
  @Emit('click')
  onClick () {
    return
  }
}
</script>

<style lang="scss" scoped>
.hamb-icon {
  @include size(45px);
  appearance: none;
  background: none;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  display: flex;
  border: 0;
  transform: translate(10px, 0);

  @include media ($md-breakpoint) {
    @include size(35px);
    transform: translate(5px, 0);
  }

  &::before,
  &::after,
  .icon {
    @include size(25px, 1px);
    background-color: $white-color;
    display: block;
  }

  &::before,
  &::after {
    content: '';
  }

  &::before {
    transform: translate(0, -5px);
  }

  &::after {
    transform: translate(0, 5px);
  }
}
</style>