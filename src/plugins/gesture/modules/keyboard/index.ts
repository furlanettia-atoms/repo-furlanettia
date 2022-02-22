/* eslint-disable */
import { passive } from '@/plugins/polyfills'
import * as device from '@/plugins/device'
import KeyboardGestureVue from './vue'

export type KeyboardGestureOptions = any

export default class KeyboardGesture extends KeyboardGestureVue {
  onKeyUpHandler = this.onKeyUp.bind(this)

  options!: KeyboardGestureOptions

  constructor (options?: Partial<KeyboardGestureOptions>) { 
    super()

    if (device.mobile) return

    window.addEventListener('keyup', this.onKeyUpHandler, passive)

    this.options = {
      threshold: 4,
      ...options,
    }
  }

  onKeyUp (event: KeyboardEvent) {
    const direction =  
      'ArrowUp'   === event.code ?-1 : 
      'ArrowDown' === event.code ? 1 : 0

    this.direction.prev = this.direction.next
    this.direction.next = direction
    const changed = this.direction.prev != this.direction.next

    this.dispatchEvent('swipe', { 
      input: 'keyboard', 
      direction,
      changed,
      event,
    })
  }

  dispose () {
    window.removeEventListener('keyup', this.onKeyUpHandler)
  }
}