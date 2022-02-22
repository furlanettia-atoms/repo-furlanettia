<template>
  <div class="loop-icon" :style="style">
    <svg viewBox="25 25 50 50">
      <circle class="path" ref="path" cx="50" cy="50" r="20" fill="none" :stroke-width="width" stroke-miterlimit="10" />
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Loop extends Vue {
  @Prop({ default: 44 }) 
  radius!: number
  
  @Prop({ default: 2 }) 
  width!: number

  get size () {
    return this.radius - this.width
  }

  get style () {
    return {
      width: `${this.radius}px`,
      height: `${this.radius}px`,
    }
  }

  get viewBox () {
    const x = this.radius / 2
    const y = this.radius / 2
    const r = this.radius
    return `${x} ${y} ${r} ${r}`
  }
}
</script>

<style lang="scss" scoped>
@keyframes svg-loop {
  100%  {
    transform: rotate(360deg);
  }
}

@keyframes circle-loop {
  0%  {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  100%  {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

.loop-icon {
  display: inline-block;

  svg {
    transform-origin: center center;
    animation: {
      duration: 2s;
      name: svg-loop;
      timing-function: linear;
      iteration-count: infinite;
    }

    circle {
      stroke-linecap: round;
      animation: {
        duration: 2s;
        name: circle-loop;
        timing-function: linear; // $ease-in-out-cubic;
        iteration-count: infinite;
      }

      &:nth-child(1) {
        stroke: rgba($lightB7-color, 1);
      }
    }
  }
}
</style>