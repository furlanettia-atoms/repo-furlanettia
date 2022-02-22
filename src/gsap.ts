import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { gsap } from 'gsap'

gsap.config({
  nullTargetWarn: false,
})

gsap.registerPlugin(
  ScrollToPlugin,
)