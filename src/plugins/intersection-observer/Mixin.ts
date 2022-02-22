import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class IntersectionObserverMixin extends Vue {
  @Prop()
  intersect?: boolean

  intersected = false

  @Watch('intersect', { immediate: true })
  async onIntersectUpdate (intersect: boolean) {
    this.onIntersect(intersect)

    await this.$nextTick()

    if (!intersect || this.intersected) return
    
    this.onIntersectReveal()
    
    this.intersected = true
  }

  async onIntersect (intersect: boolean) { // eslint-disable-line
    return
  }

  onIntersectReveal () {
    return
  }
}