import Vue from 'vue'

export type ListenerCallback = (...args: any[]) => void // eslint-disable-line

export default class Dispatcher {
  _vm!: Vue

  dispatchEvent (event: string, ...args: any[]) { // eslint-disable-line
    this._vm.$emit(event, args)
  }

  addEventListener (event: string, callback: ListenerCallback) {
    this._vm.$on(event, callback)
  }

  removeEventListener (event: string, callback: ListenerCallback) {
    this._vm.$off(event, callback)
  }
}