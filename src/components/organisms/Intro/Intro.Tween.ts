import { Component, Vue } from 'vue-property-decorator'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'

@Component
export default class IntroTween extends Vue {
  splits = {} as { [key: string]: SplitText }

  /**
   * logo tween
   */
  logoEnter (el: HTMLElement) {
    const selector = gsap.utils.selector(el)

    const $logo = selector('[data-gsap-logo]')

    return gsap.timeline()
        .fromTo($logo, { yPercent: 130 }, { yPercent: 0, duration: 1.2, ease: 'power2.inOut', force3D: true })
  }

  logoLeave (el: HTMLElement) {
    const selector = gsap.utils.selector(el)

    const $logo = selector('[data-gsap-logo]')

    return gsap
      .timeline()
        .to($logo, { yPercent: -130, duration: 1.2, ease: 'power2.inOut', force3D: true })
  }
  
  /**
   * title tween
   */
  nameEnter (el: HTMLElement) {
    const selector = gsap.utils.selector(el)

    this.splits.name && this.splits.name.revert()
    this.splits.name = new SplitText(selector('[data-gsap-title]'), { type: 'chars,words', wordsClass: 'word', charsClass: 'char' })

    return gsap
      .timeline()
        .from(this.splits.name.chars, { yPercent: 120, stagger: .04, duration: 1.2, ease: 'power2.inOut', force3D: true })
  }

  nameLeave (el: HTMLElement) {
    const selector = gsap.utils.selector(el)

    this.splits.name && this.splits.name.revert()
    this.splits.name = new SplitText(selector('[data-gsap-title]'), { type: 'chars,words', wordsClass: 'word', charsClass: 'char' })

    const $title = selector('[data-gsap-title-wrap]')
    const bbox = $title[0].getBoundingClientRect()
    
    return this.$matchMedia.queries.md
      ? gsap.timeline()
            .to($title, { scale: .8, y: 100 - bbox.top, duration: 1.6, delay: .3, ease: 'power2.inOut' })
      : gsap.timeline()
            .to(this.splits.name.chars, { yPercent: -120, stagger: .04, duration: 1.2, ease: 'power2.inOut', force3D: true })
  }

  async nameReset (el: HTMLElement) {
    await this.$timer.defer(0)
    
    const selector = gsap.utils.selector(el)
    const $title = selector('[data-gsap-title-wrap]')
    
    const bbox = $title[0].getBoundingClientRect()
    
    gsap.set($title, { scale: .8, y: 100 - bbox.top })
  }

  /**
   * xmas tween
   */
  xmasEnter (el: HTMLElement) {
    const selector = gsap.utils.selector(el)
    
    this.splits.xmas && this.splits.xmas.revert()
    this.splits.xmas = new SplitText(selector('[data-gsap-xmas]'), { type: 'words' })
    
    return gsap
      .timeline({ onComplete: () => this.splits.xmas.revert() })
        .from(this.splits.xmas.words, { yPercent: 100, duration: 1.2, stagger: .1, ease: 'power2.inOut', force3D: true })
  }

  xmasLeave (el: HTMLElement) {
    const selector = gsap.utils.selector(el)
    
    this.splits.xmas && this.splits.xmas.revert()
    this.splits.xmas = new SplitText(selector('[data-gsap-xmas]'), { type: 'words' })
    
    return gsap
      .timeline()
        .to(this.splits.xmas.words, { yPercent: -100, duration: 1.2, stagger: 0, ease: 'power2.inOut', force3D: true })
  }

  /**
   * text tween
   */
  textEnter (el: HTMLElement) {
    const selector = gsap.utils.selector(el)
    
    this.splits.text && this.splits.text.revert()
    this.splits.inner && this.splits.inner.revert()
    
    this.splits.inner = new SplitText(selector('[data-gsap-text]'), { type: 'lines', linesClass: "line__inner" })
    this.splits.text = new SplitText(selector('[data-gsap-text]'), { type: 'words,lines', linesClass: "line" })

    return gsap
      .timeline({ onComplete: () => {
        //this.splits.text.revert()
        //this.splits.inner.revert()
      } })
        .from(this.splits.inner.lines, { yPercent: 110, duration: 1.2, stagger: .06, ease: 'power2.inOut', force3D: true })
  }

  textLeave (el: HTMLElement) {
    const selector = gsap.utils.selector(el)
    
    this.splits.text && this.splits.text.revert()
    this.splits.inner && this.splits.inner.revert()
    
    this.splits.inner = new SplitText(selector('[data-gsap-text]'), { type: 'lines', linesClass: "line__inner" })
    this.splits.text = new SplitText(selector('[data-gsap-text]'), { type: 'words,lines', linesClass: "line" })

    return gsap
      .timeline()
        .to(this.splits.inner.lines, { yPercent: -110, duration: 1.2, stagger: .03, ease: 'power2.inOut', force3D: true })
  }

  /**
   * cta tween
   */
  ctaEnter (el: HTMLElement) {
    const selector = gsap.utils.selector(el)

    //const $loop = selector('[data-gsap-loop]')
    const $text = selector('[data-gsap-btn-text]')
    const $icon = selector('[data-gsap-btn-icon]')
    
    return gsap
      .timeline()
        //.fromTo($loop, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.inOut', force3D: true }, '<')
        .from($text, { yPercent: 100, duration: 1.2, ease: 'power2.inOut', force3D: true }, '<')
        .from($icon, { y: 20, opacity: 0, duration: 1.2, ease: 'power2.inOut', force3D: true }, '<')
  }

  ctaLeave (el: HTMLElement) {
    const selector = gsap.utils.selector(el)

    const $button = selector('[data-gsap-btn]')
    const $text = selector('[data-gsap-btn-text]')
    const $icon = selector('[data-gsap-btn-icon]')

    $button[0].setAttribute('data-hidden', '')

    return gsap
      .timeline()
        .to($text, { yPercent: -100, duration: 1.2, ease: 'power2.inOut', force3D: true }, '<')
        .to($icon, { yPercent: -100, opacity: 0, duration: 1.2, ease: 'power2.inOut', force3D: true }, '<')
  }
}