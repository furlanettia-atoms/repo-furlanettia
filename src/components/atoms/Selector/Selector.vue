<template>
  <div class="selector" :class="[{ active: focus }]">
    <div class="selection" ref="selection" @click.stop="onSelect">
      <span>{{ selected }}</span>
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 15.88" fill="currentColor" focusable="false">
        <path d="M14.94 15.87a.9.9 0 0 1-.66-.26l-14-14A.94.94 0 0 1 .27.28.94.94 0 0 1 1.6.27L15 13.67 28.4.27a.94.94 0 0 1 1.33 1.33l-14 14a.93.93 0 0 1-.79.27z"/>
      </svg>
    </div>

    <transition name="slide">
      <div class="select" :class="dir" v-if="focus && !$device.mobile">
        <div class="option" 
          v-for="(value, index) of options" 
          :class="{ selected: selected === value }"
          :key="`select-option-${index}`" 
          @click="onChangeCustom(value)"
        >
          <span>{{ value }}</span>
        </div>
      </div>
    </transition>

    <select 
      v-model="value" 
      v-if="$device.mobile"
      @change="onChange"
    >
      <option 
        v-for="(value, index) of options" 
        :key="`select-option-${index}`" 
        :value="value"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Selector extends Vue {
  @Prop({ default: () => [] })
  options!: string[]

  @Prop()
  selected!: string

  @Prop({ default: 'rtl' })
  dir!: string

  focus = false

  value = ''

  onSelect () {
    this.focus = !this.focus
  }

  clear () {
    this.focus = false
  }

  mounted () {
    document.body.addEventListener('click', this.clear)
  }

  destroyed () {
    document.body.removeEventListener('click', this.clear)
  }

  @Emit('change')
  onChangeCustom (value: string) {
    return value
  }

  @Emit('change')
  onChange () {
    return this.value
  }
}
</script>

<style lang="scss" scoped>
.selector {
  position: relative;
  user-select: none;

  /deep/ .selection {
    @include aktiv-grotesk-regular;
    text-transform: uppercase;
    color: $lightE5-color;
    font-size: 1.2rem;
    padding: 10px 5px;
    cursor: pointer;

    svg {
      @include size(10px, auto);
      transition: transform .3s $ease-out-cubic;
      margin: 0 0 1px 8px;

      .rtl & {
        margin: 0 8px 0 0;
      }

      path {
        fill: $white-color;
      }
    }

    &.slide-enter-active, &.slide-leave-active {
      transition: opacity .5s;
    }

    &.slide-enter, &.slide-leave-to {
      opacity: 0;
    }
  }

  /deep/ .select {
    background-color: $lightE5-color;
    box-shadow: 0 10px 30px rgba($dark-blue20-color, .2);
    text-transform: uppercase;
    border-radius: 0px;
    text-align: center;
    cursor: pointer;
    padding: 8px 0;

    .option {
      @include aktiv-grotesk-regular;
      background-color: $lightE5-color;
      white-space: nowrap;
      color: $black-color;
      font-size: 1.2rem;
      cursor: default;

      &.selected {
        background-color: rgba($black-color, .1);
      }

      //.no-touch & {
        &:hover {
          background-color: $dark-blue19-color;
          color: $white-color;
        }
      //}
    }

    &.ltr {
      @include position(absolute, 40px null null 2px);

      .rtl & {
        @include position(absolute, 40px 2px null auto);
      }

      .option {
        padding: 7px 20px;
      }
    }

    &.rtl {
      @include position(absolute, 40px 2px null null);

      .rtl & {
        @include position(absolute, 40px auto null 2px);
      }

      .option {
        padding: 7px 20px;
      }
    }
  }

  /deep/ select {
    @include size(100%);
    @include position(absolute, 0 0 null null);
    text-transform: uppercase;
    text-align: center;
    opacity: 0;

    option {
      text-transform: uppercase;
      text-align: center;
    }
  }

  &.active {
    /deep/ .selection {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>