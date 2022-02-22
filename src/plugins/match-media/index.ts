import _Vue from 'vue'
import Dispatcher from '../Dispatcher'
import UseMatchMedia from './Hook'

declare module 'vue/types/vue' {
  interface Vue {
    $matchMedia: MatchMediaProvider
  }
}

interface MatchMediaOptions {
  queries?: {
    [key: string]: string
  }
}

interface MatcherHandler {
  matcher: MediaQueryList
  handler: (event: MediaQueryListEvent) => void
}

class MatchMediaProvider extends Dispatcher {
  listeners = [] as MatcherHandler[]

  _vm = new _Vue({
    data: () => ({
      queries: {},
    })
  })

  constructor ({ queries }: MatchMediaOptions) {
    super()

    for (const key in queries) {
      const query = queries[key]
      const matcher = window.matchMedia(query)

      _Vue.set(this._vm.$data.queries, key, matcher.matches)
      
      const handler = (event: MediaQueryListEvent) => {
        _Vue.set(this._vm.$data.queries, key, event.matches)
        this.onChange()
      }
      
      this.listeners.push({matcher, handler})

      if (matcher.addEventListener !== undefined)
        matcher.addEventListener('change', handler)
      else matcher.addListener(handler)
    }

    this.onChange()
  }

  get queries () {
    return this._vm.$data.queries
  }

  onChange () {
    this._vm.$emit('change', this._vm.$data.queries)
  }

  dispose () {
    for (const {matcher, handler} of this.listeners) {
      if (matcher.addEventListener !== undefined)
        matcher.removeEventListener('change', handler)
      else matcher.removeListener(handler)
    }
  }
}

export default {
  install <MatchMediaOptions>(Vue: typeof _Vue, options: MatchMediaOptions) {
    Vue.prototype.$matchMedia = new MatchMediaProvider(options)
    Vue.component('use-match-media', UseMatchMedia)
  }
}