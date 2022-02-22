import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UseResizeObserver extends Vue {
  get viewport () {
    return this.$resizeObserver.viewport.size
  }

  render () {
    return (
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        ...this.viewport,
      })
    )
  }
}