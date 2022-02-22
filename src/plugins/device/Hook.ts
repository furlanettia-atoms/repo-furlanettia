import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UseDevice extends Vue {
  get device () {
    return this.$device
  }

  render () {
    return (
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        ...this.device,
      })
    )
  }
}