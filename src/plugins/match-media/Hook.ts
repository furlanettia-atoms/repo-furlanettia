import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UseMatchMedia extends Vue {
  get queries () {
    return this.$matchMedia.queries
  }

  render () {
    return (
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        queries: this.queries,
      })
    )
  }
}