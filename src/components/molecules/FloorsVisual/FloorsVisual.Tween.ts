import { Component, Vue } from 'vue-property-decorator'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'

@Component
export default class FloorsVisualTween extends Vue {
  splits = {} as { [key: string]: SplitText }

  enter (el: HTMLElement, done: () => void) {
    const selector = gsap.utils.selector(el)
    
    this.splits.title && this.splits.title.revert()
    this.splits.title = new SplitText(selector('[data-gsap-title]'), { type: 'chars,words', wordsClass: 'word', charsClass: 'char' })

    this.splits.text && this.splits.text.revert()
    this.splits.inner && this.splits.inner.revert()
    
    this.splits.inner = new SplitText(selector('[data-gsap-text]'), { type: 'lines', linesClass: "line__inner" })
    this.splits.text = new SplitText(selector('[data-gsap-text]'), { type: 'words,lines', linesClass: "line" })

    return gsap
      .timeline({ onComplete: () => {
        //this.splits.text.revert()
        //this.splits.inner.revert()
        done()
      } })
        .from(this.splits.title.chars, { yPercent: 120, duration: 1.2, stagger: .06, ease: 'power2.inOut', force3D: true }, '<')
        .from(this.splits.inner.lines, { yPercent: 120, duration: 1.2, stagger: .08, ease: 'power2.inOut', force3D: true }, '<')
  }
  
  leave (el: HTMLElement, done: () => void) {
    done()
  }
}