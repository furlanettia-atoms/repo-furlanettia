import { VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

interface HTMLElementObserved extends HTMLElement {
  _observer?: {
    instance: IntersectionObserver,
    component: Vue | undefined,
  } 
}

export const useIntersectionDirective = {
  bind (el: HTMLElementObserved, binding: any, vnode: VNode) { // eslint-disable-line
    const { observer, key } = binding.value
    observer.observe(el, key)
    el._observer = { 
      instance: observer, 
      component: vnode.componentInstance,
    }
  },

  unbind (el: HTMLElementObserved) {
    if (!el._observer) return
    el._observer.instance.unobserve(el)
    delete el._observer
  }
}

@Component
export default class UseIntersectionObserver extends Vue {
  get intersections () {
    return this.$intersectionObserver.intersections
  }

  isIntersecting (key: string) {
    return this.intersections.indexOf(key) > -1 ? '' : undefined
  }

  render () {
    return (
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        observer: this.$intersectionObserver,
        isIntersecting: this.isIntersecting,
      })
    )
  }
}