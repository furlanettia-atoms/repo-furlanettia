import _Vue from 'vue'
import { mobile } from '../device'
import { passive } from '../polyfills'
import Dispatcher from '../Dispatcher'
import UseResizeObserver from './Hook'
import debounce from 'debounce'

declare module 'vue/types/vue' {
  interface Vue {
    $resizeObserver: ResizeObserverProvider
  }
}

class ResizeObserverProvider extends Dispatcher {
  $dummy!: HTMLElement

  _vm = new _Vue({
    data: () => ({
      viewport: {
        size: { x: 0, y: 0 },
        last: { x: 0, y: 0 },
      }
    })
  })

  resizeHandler = debounce(this.onResize.bind(this))

  constructor () {
    super()

    this.$dummy = document.createElement('div')
    this.$dummy.className = 'dummy'
    document.documentElement.appendChild(this.$dummy)

    window.addEventListener('resize', this.resizeHandler, passive)

    this._vm.$nextTick().then(() => this.onResize())
  }

  get viewport () {
    return this._vm.$data.viewport
  }

  get viewportNeedUpdates () {
    return (!mobile)
         || (mobile && this._vm.$data.viewport.size.x !== this._vm.$data.viewport.last.x)
  }

  get scrollbarCompensation () {
    const { offsetWidth, clientWidth } = this.$dummy
    return offsetWidth - clientWidth
  }

  onResize () {
    const { innerWidth: x, innerHeight: y } = window
    
    this._vm.$data.viewport.last = { ...this._vm.$data.viewport.size }
    this._vm.$data.viewport.size = { x, y }
    
    this.update(false)
  }

  update (force = true) {
    if (this.viewportNeedUpdates || force) {
      document.documentElement.style.setProperty('--vh', `${this._vm.$data.viewport.size.y}px`)
      document.documentElement.style.setProperty('--tp', `${this._vm.$data.viewport.size.y * .6}px`)
    }
    document.documentElement.style.setProperty('--sw', `${this.scrollbarCompensation}px`)

    this.dispatchEvent('resize', this._vm.$data.viewport.size)
  }
  
  dispose () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}

export default {
  install (Vue: typeof _Vue) {
    Vue.prototype.$resizeObserver = new ResizeObserverProvider()
    Vue.component('use-resize-observer', UseResizeObserver)
  }
}