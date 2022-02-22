import _Vue from 'vue'
//import UseGesture from './Hook'
import Dispatcher, { ListenerCallback } from '../Dispatcher'
import { WheelGesture, PointerGesture, KeyboardGesture } from './modules'
import { KeyboardGestureOptions } from './modules/keyboard'
import { PointerGestureOptions } from './modules/pointer'
import { WheelGestureOptions } from './modules/wheel'

declare module 'vue/types/vue' {
  interface Vue {
    $gesture: GestureProvider
  }
}

interface GestureOptions {
  wheel?: Partial<WheelGestureOptions>
  pointer?: Partial<PointerGestureOptions>
  keyboard?: Partial<KeyboardGestureOptions>
}

class GestureProvider extends Dispatcher {
  wheel: WheelGesture
  pointer: PointerGesture
  keyboard: KeyboardGesture

  _vm = new _Vue({
    data: () => ({
      lastInput: undefined,
    })
  })

  constructor (options?: Partial<GestureOptions>) {
    super()

    this.wheel = new WheelGesture(options?.wheel)
    this.pointer = new PointerGesture(options?.pointer)
    this.keyboard = new KeyboardGesture(options?.keyboard)
  }

  get lastInput () {
    return this._vm.$data.lastInput
  }

  set lastInput (input: string) {
    _Vue.set(this._vm.$data, 'lastInput', input)
  }

  addEventListener (event: string, callback: ListenerCallback) {
    this.wheel.addEventListener(event, callback)
    this.pointer.addEventListener(event, callback)
    this.keyboard.addEventListener(event, callback)
  }
  
  removeEventListener (event: string, callback: ListenerCallback) {
    this.keyboard.removeEventListener(event, callback)
    this.pointer.removeEventListener(event, callback)
    this.wheel.removeEventListener(event, callback)
  }

  dispose () {
    this.keyboard?.dispose()
    this.pointer?.dispose()
    this.wheel?.dispose()
  }
}

export default {
  install (Vue: typeof _Vue, options?: Partial<GestureOptions>) {
    Vue.prototype.$gesture = new GestureProvider(options)
    //Vue.component('use-gesture', UseGesture)
  }
}