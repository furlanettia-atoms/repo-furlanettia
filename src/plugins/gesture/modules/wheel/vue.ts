/* eslint-disable */
import Vue from 'vue'
import Dispatcher from '@/plugins/Dispatcher'

export default class WheelGestureVue extends Dispatcher {
  _vm = new Vue({
    data: () => ({
      count: 0,
      enable: false,
      delta: { x: 0, y: 0 },
      time: { now: 0, last: 0 },
      direction: { prev: 0, next: 0 },
    })
  })

  get count () {
    return this._vm.$data.count
  }

  set count (count: number) {
    Vue.set(this._vm.$data, 'count', count)
  }

  get enable () {
    return this._vm.$data.enable
  }

  set enable (enable: boolean) {
    Vue.set(this._vm.$data, 'enable', enable)
  }

  get delta () {
    return this._vm.$data.delta
  }

  set delta ({ x, y }: any) {
    Vue.set(this._vm.$data.delta, 'x', x)
    Vue.set(this._vm.$data.delta, 'y', y)
  }

  get time () {
    return this._vm.$data.time
  }

  set time ({ now, last }: any) {
    Vue.set(this._vm.$data.time, 'now', now)
    Vue.set(this._vm.$data.time, 'last', last)
  }

  get direction () {
    return this._vm.$data.direction
  }

  set direction ({ prev, next }: any) {
    Vue.set(this._vm.$data.direction, 'prev', prev)
    Vue.set(this._vm.$data.direction, 'next', next)
  }
}