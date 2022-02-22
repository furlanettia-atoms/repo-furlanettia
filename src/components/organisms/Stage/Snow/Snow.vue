<template>
  <div class="snow" />
</template>

<script lang="ts">
/* eslint-disable */
import { Component, Vue } from 'vue-property-decorator'
import vertex from 'raw-loader!glslify-loader!./shaders/vertex.glsl'
import fragment from 'raw-loader!glslify-loader!./shaders/fragment.glsl'
import ShaderProgram from './ShaderProgram'

const snowflake = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQUU2RDVCMzNDNEIxMUVDOTQzN0RCMDQxRjFFNEQ2OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQUU2RDVCNDNDNEIxMUVDOTQzN0RCMDQxRjFFNEQ2OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVBRTZENUIxM0M0QjExRUM5NDM3REIwNDFGMUU0RDY4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVBRTZENUIyM0M0QjExRUM5NDM3REIwNDFGMUU0RDY4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UGD3/QAAAPpJREFUeNrslo0NwiAQhYtxgG5gR2AUNtARuoGu4gQ6Ak4gI7CBOsF5ZzBpKlD+UhLDS14aaLkvNHeXYwDQ1dCmq6QGXk1b2yZj7GcPk3DAxx7NjWkt0YqMZ862WM7kpRdzW745wbLuaB4S/8PwgSmQCRijYwmwgjSJZHDg73Xpge6jwZRIkK+LD+wqp0OBihEpdcxL1Koty1cB++K4wLtC4CEWfCsElrFgVQisa4Bf2L+1L/NcDURl1vGY2rl4BvSa26tT2ubz2y6TweagMMGCbjqFZoHN4R4tF245huYQmdlAtglk1ganE4j2Za9rAmFtrm7gvwO/BRgAaRWnkgCiXDoAAAAASUVORK5CYII='

@Component
export default class Snow extends Vue {
  mounted () {
    const count = 3000

    const wind = {
      current: 0,
      force: 0.002,
      target: 0.1,
      min: 0.001,
      max: 0.1,
      easing: 0.005
    }

    new ShaderProgram(this.$el, {
      depthTest: false,
      
      texture: snowflake,
      
      uniforms: {
        worldSize: { type: 'vec3', value: [ 0, 0, 0 ] },
        gravity: { type: 'float', value: 30 },
        wind:{ type: 'float', value: 0 },
      },
      
      buffers: {
        size: { size: 1, data: [] },
        rotation: { size: 3, data: [] },
        speed: { size: 3, data: [] },
      },
      
      fragment,
      
      vertex,
      
      onResize (w: number, h: number, dpi: number) {
        const position = [] as any[]
            , rotation = [] as any[]
            , color = [] as any[]
            , size = [] as any[]
            , speed = [] as any[]

        const height = 80
        const width = w / h * height
        const depth = 40

        Array.from({ length: w / h * count }, snowflake =>  {

          position.push(
            -width + Math.random() * width * 2,
            -height + Math.random() * height * 2,
            Math.random() * depth * 2
          )

          speed.push(// 0, 0, 0 )
            1 + Math.random(),
            1 + Math.random(),
            Math.random() * 10
          ) // x, y, sinusoid

          rotation.push(
            Math.random() * 2 * Math.PI,
            Math.random() * 20,
            Math.random() * 5
          ) // angle, speed, sinusoid

          color.push(
            1,
            1,
            1,
            0.1 + Math.random() * 0.6
          )

          size.push(
            4 * Math.random() * 5 * ( h * dpi / 1000 )
          )

        })

        const scope = this as any

        scope.uniforms.worldSize = [ width, height, depth ]

        scope.buffers.position = position
        scope.buffers.color = color
        scope.buffers.rotation = rotation
        scope.buffers.size = size
        scope.buffers.speed = speed
      },
      
      onUpdate (delta: number) {
        const scope = this as any

        wind.force += ( wind.target - wind.force ) * wind.easing
        wind.current += wind.force * ( delta * 0.001 )
        scope.uniforms.wind = wind.current

        if ( Math.random() > 0.995 ) {
          wind.target = ( wind.min + Math.random() * ( wind.max - wind.min ) ) * ( Math.random() > 0.5 ? -1 : 1 )
        }
      },
    })
  }
}
</script>

<style lang="scss" scoped>
.snow {
  @include size(100%, 100vh);
  //@include size(100%, var(--vh));
  @include position(absolute, 0 nul null 0);
  z-index: 1;
}
</style>