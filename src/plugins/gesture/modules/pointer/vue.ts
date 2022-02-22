/* eslint-disable */
import Vue from 'vue'
import Dispatcher from '@/plugins/Dispatcher'

export default class PointerGestureVue extends Dispatcher {
  _vm = new Vue({
    data: () => ({
      dist: { x: 0, y: 0 },
      mouse: { x: 0, y: 0 },
      client: { x: 0, y: 0 },
      normalized: { x: 0, y: 0 },
      dragging: false,
    })
  })

  get client () {
    return this._vm.$data.client
  }

  set client ({ x, y }: any) {
    Vue.set(this._vm.$data.client, 'x', x)
    Vue.set(this._vm.$data.client, 'y', y)
  }

  get mouse () {
    return this._vm.$data.mouse
  }

  set mouse ({ x, y }: any) {
    Vue.set(this._vm.$data.mouse, 'x', x)
    Vue.set(this._vm.$data.mouse, 'y', y)
  }

  get dist () {
    return this._vm.$data.dist
  }

  set dist ({ x, y }: any) {
    Vue.set(this._vm.$data.dist, 'x', x)
    Vue.set(this._vm.$data.dist, 'y', y)
  }

  get normalized () {
    return this._vm.$data.normalized
  }

  set normalized ({ x, y }: any) {
    Vue.set(this._vm.$data.normalized, 'x', x)
    Vue.set(this._vm.$data.normalized, 'y', y)
  }

  get dragging () {
    return this._vm.$data.dragging
  }

  set dragging (dragging: boolean) {
    Vue.set(this._vm.$data, 'dragging', dragging)
  }
}