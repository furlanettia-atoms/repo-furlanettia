<template>
  <a 
    class="link"
    :class="[`size-${fontSize}`]"
    :rel="relationship"
    :target="target"
    :href="href"
    @click="onClick"
  >
    <slot />
  </a>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseLink extends Vue {
  @Prop({ default: '#' })
  href?: boolean

  @Prop({ default: 'sm' })
  fontSize!: 'sm' | 'md' | 'lg'

  @Prop()
  target?: '_self' | '_blank'

  @Prop()
  rel?: string

  @Emit('click')
  onClick () {
    return
  }
  
  get relationship  (): string | undefined {
    return '_blank' === this.target
      ? this.rel || 'noopener'
      : undefined
  }
}
</script>

<style lang="scss" scoped>
.link {
  @include aktiv-grotesk-regular;
  letter-spacing: $letter-spacing;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  font-size: 1.2rem;
  appearance: none;
  background: none;
  padding: 0 0 6px;

  color: $dark-blue1F-color;

  &.size {
    &-sm {
      font-size: 1.2rem;
    }

    &-md {
      font-size: 1.4rem;
    }

    &-lg {
      font-size: 1.6rem;
    }
  }

  &::after {
    content: '';
    @include size(auto, 1px);
    @include position(absolute, null -5px 0 -5px);
    background-color: $dark-blue1F-color;
  }

  &:hover {
    font-weight: 700;
  }
}
</style>