/* eslint-disable */
import _Vue from 'vue'
import Dispatcher from '../Dispatcher'
import UseIntersectionObserver, { useIntersectionDirective } from './Hook'
import 'intersection-observer'

declare module 'vue/types/vue' {
  interface Vue {
    $intersectionObserver: IntersectionObserverProvider
  }
}

class IntersectionObserverProvider extends Dispatcher {
  instance!: IntersectionObserver

  _vm = new _Vue({
    data: () => ({
      intersections: [],
    })
  })

  constructor (options: IntersectionObserverInit) {
    super()

    this.instance = new IntersectionObserver(this.onIntersection.bind(this), options)
  }

  get intersections () {
    return this._vm.$data.intersections
  }

  onIntersection (entries: any /* observer: IntersectionObserver */) {
    entries.forEach(({ target, isIntersecting, intersectionRatio  }: any) => {
      const { component } = target._observer
      const key = target.getAttribute('data-intersect-key')
      if (isIntersecting) {
        target.setAttribute('data-intersect-active', '')
        //if (intersectionRatio < .5) {
          if (component.onIntersectionEnter)
            component.onIntersectionEnter()
        //} else {
          if (component.onIntersection)
            component.onIntersection()
        //}
        this.addIntersection(key)
        //this.unobserve(target)
      } else {
        target.removeAttribute('data-intersect-active')
        if (component.onIntersectionLeave)
          component.onIntersectionLeave()
        this.removeIntersection(key)
      }
    })

    this._vm.$emit('intersection', this._vm.$data.intersections)
  }

  addIntersection (key: string) {
    this._vm.$data.intersections.push(key)
  }

  removeIntersection (key: string) {
    const indexOf = this._vm.$data.intersections.indexOf(key)
    if (indexOf > -1) this._vm.$data.intersections.splice(indexOf, 1)
  }

  observe (el: HTMLElement, key: string) {
    el.setAttribute('data-intersect-key', key)
    this.instance.observe(el)
  }

  unobserve (el: HTMLElement) {
    const key = el.getAttribute('data-intersect-key') as string
    el.removeAttribute('data-intersect-key')
    this.instance.unobserve(el)
    this.removeIntersection(key)
  }

  disconnect () {
    this.instance.disconnect()
  }
}

export default {
  install <IntersectionObserverInit>(Vue: typeof _Vue, options: IntersectionObserverInit) {
    Vue.prototype.$intersectionObserver = new IntersectionObserverProvider(options)
    Vue.component('use-intersection-observer', UseIntersectionObserver)
    Vue.directive('intersect', useIntersectionDirective)
  }
}