/* eslint-disable */
import Vue from 'vue'
import Dispatcher from '@/plugins/Dispatcher'

export default class KeyboardGestureVue extends Dispatcher {
  _vm = new Vue({
    data: () => ({
      direction: { prev: 0, next: 0 },
    })
  })

  get direction () {
    return this._vm.$data.direction
  }

  set direction ({ prev, next }: any) {
    Vue.set(this._vm.$data.direction, 'prev', prev)
    Vue.set(this._vm.$data.direction, 'next', next)
  }
}