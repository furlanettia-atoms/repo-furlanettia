import { Component, Vue } from 'vue-property-decorator'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'

@Component
export default class FloorBoxTween extends Vue {
  mounted () {
    const selector = gsap.utils.selector(this.$el)
    new SplitText(selector('[data-gsap-text]'), { type: 'lines', linesClass: "line__inner" })
    new SplitText(selector('[data-gsap-text]'), { type: 'words,lines', linesClass: "line" })
  }
}