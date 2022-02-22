/* eslint-disable */
import _Vue from 'vue'
import gsap from 'gsap'

declare module 'vue/types/vue' {
  interface Vue {
    $fn: FunctionsProvider 
  }
}

interface FunctionsProvider {
  [key: string]: (...args: any[]) => any
}

export const enhancedIncludes = (source: string, match: string | string[]) => {
  if (!Array.isArray(match))
    return !!~source.indexOf(match)
  for (let i = match.length - 1; i >= 0; i--)
    if (~source.indexOf(match[i]))
      return true
  return false
}

export const capitalizeFirstLetter = (source: string | undefined) => {
  source && source.charAt(0).toUpperCase() + source.slice(1)
}

export const distance = (p0: { x: number, y: number }, p1: { x: number, y: number }) => {
  const a = p0.x - p1.x
  const b = p0.y - p1.y

  return Math.sqrt( a*a + b*b )
}

export const scrollToFloor = (floor: number, queries: any) => { // eselint-disable-line 
  const target = `#floor-${floor}`
  const selector = gsap.utils.selector(document.body)
  const targetHeight = selector(target)[0].getBoundingClientRect().height
  const offsetY = queries.sm ? 60 : Math.round((window.innerHeight - targetHeight) / 2)
  return {
    y: target,
    offsetY,
  }
}

export default {
  install (Vue: typeof _Vue) {
    Vue.prototype.$fn = {
      distance,
      scrollToFloor,
      enhancedIncludes,
      capitalizeFirstLetter,
    }
  }
}