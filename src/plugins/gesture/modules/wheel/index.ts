/* eslint-disable */
import { passive } from '@/plugins/polyfills'
import * as fn from '@/plugins/functions'
import * as device from '@/plugins/device'
import WheelGestureVue from './vue'

const hasWheelEvent = 'onwheel' in document
const hasMouseWheelEvent = 'onmousewheel' in document

export interface WheelGestureOptions {
  debounce: number
}

export default class WheelGesture extends WheelGestureVue {
  onMouseWheelHandler = this.onMouseWheel.bind(this)
  onWheelHandler = this.onWheel.bind(this)

  options!: WheelGestureOptions

  constructor (options?: Partial<WheelGestureOptions>) { 
    super()

    if (device.mobile) return

    if (hasWheelEvent) document.addEventListener('wheel', this.onWheelHandler, passive)
    if (hasMouseWheelEvent) document.addEventListener('mousewheel', this.onMouseWheelHandler, passive)

    this.options = {
      debounce: 300,
      ...options,
    }
  }

  onMouseWheel (event: any) {
    this.delta.x = event.wheelDeltaX || event.deltaX * -1
    this.delta.y = event.wheelDeltaY || event.deltaY * -1
    this.wheel(event)
  }
  
  onWheel (event: any) {
    this.delta.x = (event.wheelDeltaX) ? event.wheelDeltaX : 0
    this.delta.y = (event.wheelDeltaY) ? event.wheelDeltaY : event.wheelDelta
    this.wheel(event)
  }
  
  wheel (event: any) {
    this.swipe(event)
    this.adjustDelta(event)
    const delta = this.delta
    const direction = delta.y > 0 ? -1 : 1
    this.direction.prev = this.direction.next
    this.direction.next = direction
    this.dispatchEvent('wheel', {
      direction,
      event,
      delta,
    })
  }

  swipe (event: any) {
    /* this.enable = true
    this.time.now = Date.now()
    if (this.count < 10 && (this.time.now - this.time.last) < this.options.debounce) {
      this.count++
    } else {
      if ((this.time.now - this.time.last) > this.options.debounce)
        this.count = 0
      else this.enable = false
    }
    this.time.last = Date.now()
    if (this.enable) { */
      this.adjustDelta(event)
      const delta = this.delta
      const direction = delta.y > 0 ? -1 : 1
      this.direction.prev = this.direction.next
      this.direction.next = direction
      const changed = this.direction.prev != this.direction.next
      this.dispatchEvent('swipe', {
        input: 'wheel',
        direction,
        changed,
        delta,
        event,
      })
    //}
  }

  adjustDelta (event: any) {
    const { os, browser } = device.system

    if ('mac' == os) {
      if ('firefox' == browser)
        this.delta.y *= 40
      if (fn.enhancedIncludes(browser, ['chrome', 'safari']))
        this.delta.y *= .5
    }

    if ('windows' == os) {
      if ('firefox' == browser && 1 === event.deltaMode)
        this.delta.y *= 50
      if (fn.enhancedIncludes(browser, ['chrome']))
        this.delta.y *= .6
    }
  }

  dispose () {
    if (hasWheelEvent) document.removeEventListener('wheel', this.onWheelHandler)
    if (hasMouseWheelEvent) document.removeEventListener('mousewheel', this.onMouseWheelHandler)
  }
}