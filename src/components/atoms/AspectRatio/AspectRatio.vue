<template>
  <span class="ratio"
    :style="style"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Ratio extends Vue {
  @Prop({ default: '16x9' })
  value!: string

  get style (): Partial<CSSStyleDeclaration> {
    const values = this.value.split('x')
    const width = parseInt(values[0])
    const height = parseInt(values[1])
    return {
      padding: `${height / width * 100}% 0 0`
    }
  }
}
</script>

<style lang="scss" scoped>
.ratio {
  @include size(100%, 0);
  position: relative;
  display: block;

  * {
    @include size(100%);
    @include position(absolute, 0 null null 0);
    display: block;
  }
}
</style>