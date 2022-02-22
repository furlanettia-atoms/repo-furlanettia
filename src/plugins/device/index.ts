/* eslint-disable */
import _Vue from 'vue'
import { enhancedIncludes } from '../functions'
import UseDevice from './Hook'

declare module 'vue/types/vue' {
  interface Vue {
    $device: DeviceProvider
  }
}

interface System<T = any> { 
  [key: string]: T 
}

interface DeviceProvider {
  detect: (...arg: any[]) => any
  agent: string
  touchCapable: boolean
  pixelRatio: number
  system: System
  graphics: any
  mobile: any
  media: any
}

class DeviceProvider {
  detect: (...arg: any[]) => any
  agent: string
  touchCapable: boolean
  pixelRatio: number
  system: System
  graphics: any
  mobile: any
  media: any

  constructor () {
    let vid
    this.agent = navigator.userAgent.toLowerCase(),
    this.detect = (match) => {
      return enhancedIncludes(this.agent, match)
    }
    ,
    this.touchCapable = !!navigator.maxTouchPoints,
    this.pixelRatio = window.devicePixelRatio,
    this.system = {},
    this.system.retina = window.devicePixelRatio > 1,
    this.system.webworker = void 0 !== window.Worker,
    this.system.webcam = !!((<any>navigator).getUserMedia || (<any>navigator).webkitGetUserMedia || (<any>navigator).mozGetUserMedia || (<any>navigator).msGetUserMedia),
    this.system.language = (() => {
      const language =
        (navigator.languages !== undefined
          ? navigator.languages[0] 
          : navigator.language)
          || (<any>navigator).browserLanguage
      return language.trim().split(/-|_/)[0]
    })()
    this.system.webaudio = void 0 !== window.AudioContext,
    this.system.xr = (<any>navigator).getVRDisplays || (<any>navigator).xr,
    this.system.exokit = this.detect('exokit');
    try {
      this.system.localStorage = void 0 !== window.localStorage
    } catch (e) {
      this.system.localStorage = false
    }
    this.system.fullscreen = document.fullscreenEnabled || (<any>document).webkitFullscreenEnabled || (<any>document).mozFullScreenEnabled || (<any>document).msFullscreenEnabled,
    this.system.os = this.detect(['exokit']) && 'linux' == navigator.platform ? 'magicleap' : this.detect(['ipad', 'iphone', 'ios']) || this.detect('mac') && this.touchCapable && Math.max(screen.width, screen.height) < 1370 ? 'ios' : this.detect(['android', 'kindle']) ? 'android' : this.detect(['blackberry']) ? 'blackberry' : this.detect(['mac os']) ? 'mac' : this.detect(['windows', 'iemobile']) ? 'windows' : this.detect(['linux']) ? 'linux' : 'unknown',
    this.system.version = (() => {
      try {
        if ('ios' == this.system.os) {
          if (enhancedIncludes(this.agent, 'intel mac')) {
              let split = this.agent.split('version/')[1].split(' ')[0].split('.');
              return Number(split[0] + '.' + split[1])
          }
          let num = this.agent.split('os ')[1].split('_')
            , main = num[0]
            , sub = num[1].split(' ')[0];
          return Number(main + '.' + sub)
        }
        if ('android' == this.system.os) {
          let version = this.agent.split('android ')[1].split(';')[0];
          return version.length > 3 && (version = version.slice(0, -2)),
          '.' == version.charAt(version.length - 1) && (version = version.slice(0, -1)),
          Number(version)
        }
        if ('windows' == this.system.os)
          return enhancedIncludes(this.agent, 'rv:11') ? 11 : Number(this.agent.split('windows phone ')[1].split(';')[0])
      } catch (e) {}
      return -1
    })(),
    this.system.browser = 'ios' == this.system.os ? this.detect(['twitter', 'fbios']) ? 'social' : this.detect(['crios']) ? 'chrome' : this.detect(['safari']) ? 'safari' : 'unknown' : 'android' == this.system.os ? this.detect(['twitter', 'fb', 'facebook']) ? 'social' : this.detect(['chrome']) ? 'chrome' : this.detect(['firefox']) ? 'firefox' : 'browser' : this.detect(['msie']) || this.detect(['trident']) && this.detect(['rv:']) || this.detect(['windows']) && this.detect(['edge']) ? 'ie' : this.detect(['chrome']) ? 'chrome' : this.detect(['safari']) ? 'safari' : this.detect(['firefox']) ? 'firefox' : 'unknown',
    this.system.browserVersion = (() => {
      try {
        if ('chrome' == this.system.browser)
          return Number(this.agent.split('chrome/')[1].split('.')[0]);
        if ('firefox' == this.system.browser)
          return Number(this.agent.split('firefox/')[1].split('.')[0]);
        if ('safari' == this.system.browser)
          return Number(this.agent.split('version/')[1].split('.')[0].split('.')[0]);
        if ('ie' == this.system.browser)
          return this.detect(['msie']) ? Number(this.agent.split('msie ')[1].split('.')[0]) : this.detect(['rv:']) ? Number(this.agent.split('rv:')[1].split('.')[0]) : Number(this.agent.split('edge/')[1].split('.')[0])
      } catch (e) {
        return -1
      }
    })()
    ,
    this.mobile = !((<any>window)._NODE_ || !('ontouchstart'in window) && !('onpointerdown'in window) || !enhancedIncludes(this.system.os, ['ios', 'android', 'magicleap'])) && {},
    this.mobile && this.detect(['windows']) && !this.detect(['touch']) && (this.mobile = false),
    this.mobile && (this.mobile.tablet = Math.max(window.screen ? screen.width : window.innerWidth, window.screen ? screen.height : window.innerHeight) > 1e3,
    this.mobile.phone = !this.mobile.tablet,
    this.mobile.pwa = !(!window.matchMedia || !window.matchMedia('(display-mode: standalone)').matches) || !!(<any>navigator).standalone)
    ,
    this.media = {},
    this.media.audio = !!document.createElement('audio').canPlayType && (this.detect(['firefox', 'opera']) ? 'ogg' : 'mp3'),
    this.media.video = !!(vid = document.createElement('video')).canPlayType && (vid.canPlayType('video/webm;') ? 'webm' : 'mp4')
    ,
    this.graphics = {},
    this.graphics.webgl = (() => {
      let DISABLED = false
      Object.defineProperty(this.graphics, 'webgl', {
        get: ()=>{
          if (DISABLED)
            return false;
          if (this.graphics._webglContext)
            return this.graphics._webglContext;
          try {
            const names = ['webgl2', 'webgl', 'experimental-webgl']
                , canvas = document.createElement('canvas');
            let gl: any;
            for (let i = 0; i < names.length && (gl = canvas.getContext(names[i]),
            !gl); i++)
                ;
            let info = gl.getExtension('WEBGL_debug_renderer_info')
              , output: any = {};
            if (info) {
              let gpu = info.UNMASKED_RENDERER_WEBGL;
              output.gpu = gl.getParameter(gpu).toLowerCase()
            }
            return output.renderer = gl.getParameter(gl.RENDERER).toLowerCase(),
            output.version = gl.getParameter(gl.VERSION).toLowerCase(),
            output.glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION).toLowerCase(),
            output.extensions = gl.getSupportedExtensions(),
            output.webgl2 = enhancedIncludes(output.version, ['webgl 2', 'webgl2']),
            output.canvas = canvas,
            output.context = gl,
            output.detect = (matches: string | string[]) => {
              if (output.gpu && enhancedIncludes(output.gpu.toLowerCase(), matches))
                return true;
              if (output.version && enhancedIncludes(output.version.toLowerCase(), matches))
                return true;
              for (let i = 0; i < output.extensions.length; i++)
                if (enhancedIncludes(output.extensions[i].toLowerCase(), matches))
                  return true;
              return false
            }
            ,
            output.webgl2 || output.detect('instance') || (<any>window).AURA || (DISABLED = true),
            this.graphics._webglContext = output,
            output
          } catch (e) {
            return false
          }
        }
        ,
        set: v=>{
          false === v && (DISABLED = true)
        }
      })
    })()
    ,
    this.graphics.metal = (() => {
      if (!(<any>window).Metal)
        return false;
      let output: any = {};
      return output.gpu = (<any>window).Metal.device.getName().toLowerCase(),
      output.detect = (matches: string | string[]) => {
        return enhancedIncludes(output.gpu, matches)
      }
      ,
      output
    })()
    ,
    this.graphics.gpu = (() => {
      if (!this.graphics.webgl && !this.graphics.metal)
        return false;
      let output: any = {};
      return ['metal', 'webgl'].forEach(name=>{
        this.graphics[name] && !output.identifier && (output.detect = this.graphics[name].detect,
        output.identifier = this.graphics[name].gpu)
      }
      ),
      output
    })()
    ,
    this.graphics.canvas = !!document.createElement('canvas').getContext;
  }
}

export const {
  touchCapable: touch,
  pixelRatio: dpr,
  graphics,
  system,
  mobile,
  media,
  agent,
  detect,
} = new DeviceProvider()

export default {
  install (Vue: typeof _Vue) {
    Vue.prototype.$device = {
      pixelRatio: dpr,
      graphics,
      system,
      mobile,
      media,
      agent,
      touch,
      detect,
    }
    Vue.component('use-device', UseDevice)
  }
}