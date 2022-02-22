<template>
  <component
    :is="asLink ? 'a' : 'button'"
    :class="[`size-${fontSize}`, { 'with-icon': withIcon }]"
    class="btn-secondary upperc"
    @click="onClick"
  >
    <span 
      class="text"
    >
      <span 
        :data-label="label"
      >
        {{ label }}
      </span>
    </span>
    <span 
      class="icon"
      aria-hidden="true"
      v-if="withIcon"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20.47" fill="currentColor" focusable="false">
        <g transform="translate(30 20.47) rotate(180)">
          <path d="M29.24 9.49H2.6l8.18-8.2a.77.77 0 0 0 0-1.08.77.77 0 0 0-1.06 0l-9.5 9.5a1.43 1.43 0 0 0-.16.29.78.78 0 0 0 0 .6c.05.08.1.16.16.24l9.5 9.46a.76.76 0 0 0 1.28-.61.8.8 0 0 0-.23-.52L2.6 11h26.64a.76.76 0 0 0 0-1.52z"/>
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20.47" fill="currentColor" focusable="false">
        <g transform="translate(30 20.47) rotate(180)">
          <path d="M29.24 9.49H2.6l8.18-8.2a.77.77 0 0 0 0-1.08.77.77 0 0 0-1.06 0l-9.5 9.5a1.43 1.43 0 0 0-.16.29.78.78 0 0 0 0 .6c.05.08.1.16.16.24l9.5 9.46a.76.76 0 0 0 1.28-.61.8.8 0 0 0-.23-.52L2.6 11h26.64a.76.76 0 0 0 0-1.52z"/>
        </g>
      </svg>
    </span>
  </component>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PrimaryButton extends Vue {
  @Prop({ default: 'button' })
  label!: string

  @Prop({ default: false })
  withIcon!: boolean

  @Prop({ default: false })
  asLink!: boolean

  @Prop({ default: 'md' })
  fontSize!: 'sm' | 'md' | 'lg'

  @Emit('click')
  onClick () {
    return
  }
}
</script>

<style lang="scss" scoped>
button, a {
  appearance: none;
  background: none;
  background-color: transparent;
  border: none;
  color: inherit;
  display: block;
  overflow: hidden;
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  margin: 0;
  min-width: auto;
  padding: 0;
  text-decoration: none;
  width: auto;

  &.btn-secondary {
    @include aktiv-grotesk-regular;
    transition: background-color .2s ease, color .2s ease;
    border: 0 solid transparent;
    background-color: $lightE5-color;
    color: $dark-blue1F-color;
    letter-spacing: $letter-spacing;
    white-space: nowrap;
    border-radius: 0;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    margin-left: auto;
    margin-right: auto;
    outline: none;
    padding: 15px 30px;
    text-decoration: none;
    touch-action: manipulation;
    transform: translateZ(0);
    user-select: none;

    @include media ($md-breakpoint) {
      padding: 12px 30px;
      margin: 0 auto;
      width: auto
    }

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

    &.with-icon {
      align-items: center;
      display: inline-flex;
      justify-content: center;
      text-align: center;
      text-transform: none;
      padding: 15px 20px 15px 30px;

      @include media ($md-breakpoint) {
        padding: 12px 20px 12px 30px;
      }
    }

    &:disabled {
      opacity: .3;
    }

    &::after {
      content: '';
      @include size(100%);
      @include position(absolute, 0 null null 0);
      background-color: $black-color;
      transform: translate(0, 100%);
      transition: transform .8s $ease-out-expo;
      z-index: 0;
    }

    .text {
      display: inline-block;
      position: relative;
      overflow: hidden;
      z-index: 1;

      > span {
        padding: 5px;
        position: relative;
        display: inline-block;
        transition: transform .6s $ease-out-expo .08s;

        &::after {
          @include size(100%);
          @include position(absolute, 5px null null 0);
          content: attr(data-label);
          transform: translate(0, 100%);
          color: $lightE5-color;
        }
      }
    }

    .icon {
      position: relative;
      align-items: center;
      display: inline-flex;
      overflow: hidden;
      height: 1em;
      padding: 5px;
      margin-left: 0.75em;
      transition: transform .2s ease;
      transform: translate(0, 0);
      z-index: 1;

      svg {
        transition: transform .8s $ease-out-expo .06s;
        fill: $dark-blue1F-color;
        display: block;
        height: 1.5em;
        width: 1.5em;

        &:nth-child(2) {
          @include size(100%);
          @include position(absolute, 0 null null 0);
          transform: translate(-100%, 0);
          fill: $lightE5-color;
        }
      }
    }

    &:hover {
      &::after {
        transform: translate(0, 0);
      }

      .text {
        > span {
          transform: translate(0, -100%);
        } 
      }

      .icon {
        svg { 
          transform: translate(125%, 0);
          
          &:nth-child(2) {
            transform: translate(0%, 0);
          }
        }
      }
    }

    /* &:hover {
      background-color: $black-color;
      color: $lightE5-color;

      .icon {
        transform: translate(5px, 0);

        svg {
          fill: $lightE5-color;
        }
      }
    } */
  }
}
</style>