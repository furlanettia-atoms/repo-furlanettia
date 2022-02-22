import Vue from 'vue'
import PolyfillsPlugin from './polyfills'
import FunctionsPlugin from './functions'
import DevicePlugin from './device'
import TimerPlugin from './timer'
import GesturePlugin from './gesture'
import MatchMediaPlugin from './match-media'
import ResizeObserverPlugin from './resize-observer'
import IntersectionObserverPlugin from './intersection-observer'

Vue.use(PolyfillsPlugin)
Vue.use(FunctionsPlugin)
Vue.use(DevicePlugin)
Vue.use(TimerPlugin)
Vue.use(GesturePlugin)
Vue.use(ResizeObserverPlugin)

Vue.use(MatchMediaPlugin, {
  queries: {
    xs: `(max-width: ${360-1}px)`,
    sm: `(max-width: ${576-1}px)`,
    md: `(max-width: ${768-1}px)`,
    lg: `(max-width: ${992-1}px)`,
    xl: `(max-width: ${1200-1}px)`,
  }
})

Vue.use(IntersectionObserverPlugin, {
  threshold: window.matchMedia(`(max-width: ${576-1}px)`).matches ? .5 : .5,
})