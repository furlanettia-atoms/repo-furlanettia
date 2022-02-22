/* eslint-disable */
import _Vue from 'vue'

interface PolyfillsProvider {
  [key: string]: (...args: any[]) => any
}

declare module 'vue/types/vue' {
  interface Vue {
    $polyfills: PolyfillsProvider 
  }
}

export const passiveSupport = (): boolean => {
  let support = false
  try {
    const opts = Object.defineProperty({}, 'passive', { get: () => support = true })
    window.addEventListener('test', () => {}, opts) 
  } catch (e) { console.log(e) }
  return support
}

export const passive = passiveSupport() ? { passive: false } : false

export default {
  install (Vue: typeof _Vue) {
    Vue.prototype.$polyfills = {  
      passiveSupport,
      passive,
    }
  }
}