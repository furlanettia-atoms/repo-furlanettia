/* eslint-disable */
import _Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $timer: TimerProvider 
  }
}

interface TimerProvider {
  defer: (delay: number) => Promise<any>
}

export const defer = (delay = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay * 1000)
  })
}

export default {
  install (Vue: typeof _Vue) {
    Vue.prototype.$timer = {  
      defer,
    }
  }
}